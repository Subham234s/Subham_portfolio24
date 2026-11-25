import 'dotenv/config';
import crypto from 'node:crypto';
import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer as createViteServer } from 'vite';
import {
  SlidingWindowRateLimiter,
  isValidWebhookUrl,
  validateContactPayload,
} from './server/contactService';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === 'production';

const contactLimiter = new SlidingWindowRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 5,
});

const submissionTimestamps = new Map<string, string>();

// Minimal valid single-page PDF generator for Subham Singh's honest student resume
function buildResumePdfBuffer(): Buffer {
  const lines = [
    'SUBHAM SINGH',
    'Aspiring Full-Stack Developer | First-Year College Student',
    'Interests: Full-Stack Web Development & Artificial Intelligence',
    '',
    'TECHNICAL SKILLS',
    'Frontend: HTML, CSS, JavaScript, React.js (Currently Using)',
    'Backend: Node.js, API Development & Integration (Currently Using / Learning)',
    'Database: DBMS Fundamentals, SQL (Familiar With / Learning)',
    'Emerging Tech: Artificial Intelligence Concepts, Problem Solving (Exploring)',
    '',
    'EDUCATION',
    'First-Year Undergraduate Student - Computer & Software Foundations',
    '',
    'FEATURED CONCEPTS & PROJECTS',
    '- TaskFlow Workspace: Full-stack Kanban & task organizer (React, Node.js, SQL)',
    '- Atmos Telemetry: Responsive weather & API analytics dashboard (React, REST APIs)',
    '- SchemaSculpt: Visual DBMS & SQL query explorer (JavaScript, SQL, DBMS)',
    '- StudySynth: Structured markdown notes & AI concept organizer (React, Node.js)',
    '',
    'NOTE: Portfolio showcase resume. Contact via the portfolio Contact page.',
  ];

  const escapePdfText = (text: string) =>
    text.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');

  let contentStream = 'BT\n/F1 11 Tf\n54 740 Td\n16 TL\n';
  lines.forEach((line, idx) => {
    if (idx === 0) {
      contentStream += `/F2 18 Tf\n(${escapePdfText(line)}) Tj\nT*\n/F1 11 Tf\n`;
    } else if (
      line === 'TECHNICAL SKILLS' ||
      line === 'EDUCATION' ||
      line === 'FEATURED CONCEPTS & PROJECTS'
    ) {
      contentStream += `/F2 12 Tf\n(${escapePdfText(line)}) Tj\nT*\n/F1 11 Tf\n`;
    } else {
      contentStream += `(${escapePdfText(line)}) Tj\nT*\n`;
    }
  });
  contentStream += 'ET';

  const objects: string[] = [
    '1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n',
    '2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n',
    '3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> >>\nendobj\n',
    `4 0 obj\n<< /Length ${Buffer.byteLength(contentStream, 'utf8')} >>\nstream\n${contentStream}\nendstream\nendobj\n`,
    '5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n',
    '6 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj\n',
  ];

  let pdf = '%PDF-1.4\n';
  const offsets: number[] = [0];
  for (const obj of objects) {
    offsets.push(Buffer.byteLength(pdf, 'utf8'));
    pdf += obj;
  }
  const xrefOffset = Buffer.byteLength(pdf, 'utf8');
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (let i = 1; i <= objects.length; i++) {
    pdf += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;
  return Buffer.from(pdf, 'utf8');
}

async function startServer() {
  const app = express();
  app.set('trust proxy', true);
  app.use(express.json({ limit: '32kb' }));

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  app.get('/api/resume', (_req, res) => {
    const pdfBuffer = buildResumePdfBuffer();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="Subham_Singh_Resume.pdf"');
    res.setHeader('Content-Length', String(pdfBuffer.length));
    res.send(pdfBuffer);
  });

  app.post('/api/contact', async (req, res) => {
    const clientIp = req.ip || req.socket.remoteAddress || 'unknown';
    const rateCheck = contactLimiter.check(clientIp);
    if (!rateCheck.allowed) {
      res.setHeader('Retry-After', String(rateCheck.retryAfterSeconds));
      return res.status(429).json({
        ok: false,
        message: `Too many messages sent recently. Please wait ${Math.ceil(
          rateCheck.retryAfterSeconds / 60
        )} minute(s) before trying again.`,
      });
    }

    const validation = validateContactPayload(req.body);
    if (validation.isSpam) {
      return res.status(200).json({
        ok: true,
        referenceId: crypto.randomUUID().slice(0, 8),
        message: 'Thank you for reaching out. Your message has been received.',
      });
    }

    if (!validation.valid || !validation.sanitized) {
      return res.status(400).json({
        ok: false,
        message: 'Please correct the highlighted fields and try again.',
        errors: validation.errors,
      });
    }

    // Prevent rapid duplicate identical submissions from the same IP
    const digest = crypto
      .createHash('sha256')
      .update(`${clientIp}:${validation.sanitized.email}:${validation.sanitized.subject}:${validation.sanitized.message}`)
      .digest('hex');

    if (submissionTimestamps.has(digest)) {
      return res.status(409).json({
        ok: false,
        message: 'This message was already submitted. Thank you for reaching out.',
      });
    }

    const referenceId = crypto.randomUUID().slice(0, 8).toUpperCase();
    submissionTimestamps.set(digest, new Date().toISOString());
    if (submissionTimestamps.size > 200) {
      const oldestKey = submissionTimestamps.keys().next().value;
      if (oldestKey) submissionTimestamps.delete(oldestKey);
    }

    const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
    if (isValidWebhookUrl(webhookUrl)) {
      try {
        await fetch(webhookUrl as string, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            referenceId,
            ...validation.sanitized,
            submittedAt: new Date().toISOString(),
          }),
          signal: AbortSignal.timeout(5000),
        });
      } catch {
        // Non-fatal in preview if external webhook is unreachable
      }
    }

    return res.status(200).json({
      ok: true,
      referenceId,
      message: `Thank you, ${validation.sanitized.name}. Your message has been received (Ref: ${referenceId}).`,
    });
  });

  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
}

startServer();
