import test from 'node:test';
import assert from 'node:assert/strict';
import {
  sanitizeInput,
  validateContactPayload,
  SlidingWindowRateLimiter,
  isValidWebhookUrl,
} from './contactService';

test('sanitizeInput removes HTML tags and collapses whitespace', () => {
  assert.equal(sanitizeInput('  Hello <b>World</b>!  '), 'Hello World!');
  assert.equal(sanitizeInput('<script>alert(1)</script>Subham'), 'alert(1)Subham');
  assert.equal(sanitizeInput('Line 1\n\n\nLine 2', true), 'Line 1\n\nLine 2');
});

test('validateContactPayload validates required fields and email format', () => {
  const emptyResult = validateContactPayload({});
  assert.equal(emptyResult.valid, false);
  assert.ok(emptyResult.errors.name);
  assert.ok(emptyResult.errors.email);
  assert.ok(emptyResult.errors.subject);
  assert.ok(emptyResult.errors.message);

  const invalidEmail = validateContactPayload({
    name: 'Alex',
    email: 'not-an-email',
    subject: 'Project inquiry',
    message: 'Hello Subham, let us collaborate on a React app.',
  });
  assert.equal(invalidEmail.valid, false);
  assert.ok(invalidEmail.errors.email);

  const validResult = validateContactPayload({
    name: '  Alex Rivera ',
    email: 'ALEX@EXAMPLE.COM',
    subject: 'Internship Opportunity',
    message: 'Hi Subham, I reviewed your portfolio and would like to connect.',
  });
  assert.equal(validResult.valid, true);
  assert.equal(validResult.sanitized?.name, 'Alex Rivera');
  assert.equal(validResult.sanitized?.email, 'alex@example.com');
});

test('validateContactPayload detects honeypot spam submissions', () => {
  const spamResult = validateContactPayload({
    name: 'Bot',
    email: 'bot@example.com',
    subject: 'Buy links',
    message: 'Spam message content here.',
    website: 'https://spam.example.com',
  });
  assert.equal(spamResult.valid, false);
  assert.equal(spamResult.isSpam, true);
});

test('SlidingWindowRateLimiter enforces request limits and expires old entries', () => {
  const limiter = new SlidingWindowRateLimiter({ windowMs: 60_000, maxRequests: 2 });
  const now = 1_000_000;

  assert.equal(limiter.check('1.2.3.4', now).allowed, true);
  assert.equal(limiter.check('1.2.3.4', now + 1000).allowed, true);
  const third = limiter.check('1.2.3.4', now + 2000);
  assert.equal(third.allowed, false);
  assert.ok(third.retryAfterSeconds > 0);

  // After window expires, requests are allowed again
  assert.equal(limiter.check('1.2.3.4', now + 61_000).allowed, true);
});

test('isValidWebhookUrl blocks insecure and private network targets', () => {
  assert.equal(isValidWebhookUrl('https://hooks.example.com/contact'), true);
  assert.equal(isValidWebhookUrl('http://hooks.example.com/contact'), false);
  assert.equal(isValidWebhookUrl('https://localhost:3000/hook'), false);
  assert.equal(isValidWebhookUrl('https://127.0.0.1/hook'), false);
  assert.equal(isValidWebhookUrl('https://169.254.169.254/latest'), false);
});
