export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
  website?: string;
}

export interface ContactValidationResult {
  valid: boolean;
  isSpam?: boolean;
  errors: Partial<Record<'name' | 'email' | 'subject' | 'message', string>>;
  sanitized?: {
    name: string;
    email: string;
    subject: string;
    message: string;
  };
}

export const CONTACT_LIMITS = {
  nameMin: 2,
  nameMax: 80,
  emailMax: 120,
  subjectMin: 3,
  subjectMax: 120,
  messageMin: 10,
  messageMax: 2000,
} as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function sanitizeInput(value: unknown, preserveNewlines = false): string {
  if (typeof value !== 'string') {
    return '';
  }
  const withoutTags = value.replace(/<[^>]*>/g, '');
  const withoutControlChars = withoutTags.replace(
    preserveNewlines ? /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g : /[\x00-\x1F\x7F]/g,
    ' '
  );
  if (preserveNewlines) {
    return withoutControlChars
      .split('\n')
      .map((line) => line.replace(/[ \t]+/g, ' ').trim())
      .join('\n')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  }
  return withoutControlChars.replace(/\s+/g, ' ').trim();
}

export function validateContactPayload(input: unknown): ContactValidationResult {
  if (!input || typeof input !== 'object') {
    return {
      valid: false,
      errors: {
        name: 'Name is required.',
        email: 'Email is required.',
        subject: 'Subject is required.',
        message: 'Message is required.',
      },
    };
  }

  const record = input as Record<string, unknown>;
  const honeypot = sanitizeInput(record.website);
  if (honeypot.length > 0) {
    return {
      valid: false,
      isSpam: true,
      errors: {},
    };
  }

  const name = sanitizeInput(record.name);
  const email = sanitizeInput(record.email).toLowerCase();
  const subject = sanitizeInput(record.subject);
  const message = sanitizeInput(record.message, true);

  const errors: Partial<Record<'name' | 'email' | 'subject' | 'message', string>> = {};

  if (!name) {
    errors.name = 'Please enter your name.';
  } else if (name.length < CONTACT_LIMITS.nameMin) {
    errors.name = `Name must be at least ${CONTACT_LIMITS.nameMin} characters.`;
  } else if (name.length > CONTACT_LIMITS.nameMax) {
    errors.name = `Name must be ${CONTACT_LIMITS.nameMax} characters or fewer.`;
  }

  if (!email) {
    errors.email = 'Please enter your email address.';
  } else if (email.length > CONTACT_LIMITS.emailMax || !EMAIL_PATTERN.test(email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!subject) {
    errors.subject = 'Please enter a subject.';
  } else if (subject.length < CONTACT_LIMITS.subjectMin) {
    errors.subject = `Subject must be at least ${CONTACT_LIMITS.subjectMin} characters.`;
  } else if (subject.length > CONTACT_LIMITS.subjectMax) {
    errors.subject = `Subject must be ${CONTACT_LIMITS.subjectMax} characters or fewer.`;
  }

  if (!message) {
    errors.message = 'Please enter a message.';
  } else if (message.length < CONTACT_LIMITS.messageMin) {
    errors.message = `Message must be at least ${CONTACT_LIMITS.messageMin} characters.`;
  } else if (message.length > CONTACT_LIMITS.messageMax) {
    errors.message = `Message must be ${CONTACT_LIMITS.messageMax} characters or fewer.`;
  }

  if (Object.keys(errors).length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    errors: {},
    sanitized: { name, email, subject, message },
  };
}

export interface RateLimitDecision {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
}

export class SlidingWindowRateLimiter {
  private readonly store = new Map<string, number[]>();
  private readonly windowMs: number;
  private readonly maxRequests: number;

  constructor(options: { windowMs: number; maxRequests: number }) {
    this.windowMs = options.windowMs;
    this.maxRequests = options.maxRequests;
  }

  check(key: string, now = Date.now()): RateLimitDecision {
    const timestamps = this.store.get(key) ?? [];
    const windowStart = now - this.windowMs;
    const active = timestamps.filter((t) => t > windowStart);

    if (active.length >= this.maxRequests) {
      const oldestInWindow = active[0];
      const retryAfterMs = Math.max(1000, oldestInWindow + this.windowMs - now);
      this.store.set(key, active);
      return {
        allowed: false,
        remaining: 0,
        retryAfterSeconds: Math.ceil(retryAfterMs / 1000),
      };
    }

    active.push(now);
    this.store.set(key, active);

    return {
      allowed: true,
      remaining: Math.max(0, this.maxRequests - active.length),
      retryAfterSeconds: 0,
    };
  }

  reset(key?: string): void {
    if (key) {
      this.store.delete(key);
    } else {
      this.store.clear();
    }
  }
}

export function isValidWebhookUrl(rawUrl: string | undefined): boolean {
  if (!rawUrl) return false;
  try {
    const parsed = new URL(rawUrl);
    if (parsed.protocol !== 'https:') return false;
    const host = parsed.hostname.toLowerCase();
    if (
      host === 'localhost' ||
      host === '127.0.0.1' ||
      host === '::1' ||
      host.startsWith('10.') ||
      host.startsWith('192.168.') ||
      host === '169.254.169.254' ||
      /^172\.(1[6-9]|2\d|3[0-1])\./.test(host)
    ) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}
