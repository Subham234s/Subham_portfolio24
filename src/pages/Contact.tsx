import { AlertCircle, CheckCircle2, Github, Linkedin, Send } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import { profileData } from '../data/profile';

interface FormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
  website: string; // Honeypot field
}

type FieldErrors = Partial<Record<'name' | 'email' | 'subject' | 'message', string>>;

const LIMITS = {
  nameMin: 2,
  nameMax: 80,
  emailMax: 120,
  subjectMin: 3,
  subjectMax: 120,
  messageMin: 10,
  messageMax: 2000,
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validateClientForm(values: FormValues): FieldErrors {
  const errors: FieldErrors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const subject = values.subject.trim();
  const message = values.message.trim();

  if (!name) {
    errors.name = 'Please enter your name.';
  } else if (name.length < LIMITS.nameMin) {
    errors.name = `Name must be at least ${LIMITS.nameMin} characters.`;
  } else if (name.length > LIMITS.nameMax) {
    errors.name = `Name must be ${LIMITS.nameMax} characters or fewer.`;
  }

  if (!email) {
    errors.email = 'Please enter your email address.';
  } else if (email.length > LIMITS.emailMax || !EMAIL_PATTERN.test(email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!subject) {
    errors.subject = 'Please enter a subject.';
  } else if (subject.length < LIMITS.subjectMin) {
    errors.subject = `Subject must be at least ${LIMITS.subjectMin} characters.`;
  } else if (subject.length > LIMITS.subjectMax) {
    errors.subject = `Subject must be ${LIMITS.subjectMax} characters or fewer.`;
  }

  if (!message) {
    errors.message = 'Please enter a message.';
  } else if (message.length < LIMITS.messageMin) {
    errors.message = `Message must be at least ${LIMITS.messageMin} characters.`;
  } else if (message.length > LIMITS.messageMax) {
    errors.message = `Message must be ${LIMITS.messageMax} characters or fewer.`;
  }

  return errors;
}

export default function Contact() {
  const [values, setValues] = useState<FormValues>({
    name: '',
    email: '',
    subject: '',
    message: '',
    website: '',
  });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<{
    type: 'idle' | 'success' | 'error';
    message: string;
  }>({ type: 'idle', message: '' });

  const handleFieldChange = (field: keyof FormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (field !== 'website' && fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    const errors = validateClientForm(values);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setSubmitState({
        type: 'error',
        message: 'Please review the highlighted fields before sending.',
      });
      return;
    }

    setIsSubmitting(true);
    setFieldErrors({});
    setSubmitState({ type: 'idle', message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = (await response.json()) as {
        ok?: boolean;
        message?: string;
        errors?: FieldErrors;
      };

      if (!response.ok || !data.ok) {
        if (data.errors) {
          setFieldErrors(data.errors);
        }
        setSubmitState({
          type: 'error',
          message: data.message || 'Unable to send message right now. Please try again.',
        });
        return;
      }

      setSubmitState({
        type: 'success',
        message: data.message || 'Thank you for reaching out. Your message has been sent.',
      });
      setValues({
        name: '',
        email: '',
        subject: '',
        message: '',
        website: '',
      });
    } catch {
      setSubmitState({
        type: 'error',
        message: 'Network error while sending your message. Please check your connection and try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageLayout title="Contact">
      <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Left Column: Intro & Profile Links */}
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold tracking-wider text-[#0789A7] dark:text-[#38D6F2]">
              Get in Touch
            </p>
            <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-[#111827] sm:text-4xl dark:text-[#F8FAFC]">
              Let&apos;s connect and build something meaningful.
            </h1>
            <p className="mt-4 text-base leading-relaxed text-[#64748B] dark:text-[#A1AEC0]">
              Whether you are a recruiter, fellow student, or developer interested in collaborating on a web or AI project, feel free to send a note using the form.
            </p>

            <div className="mt-8 space-y-4 rounded-2xl border border-[#E2E8F0] bg-white p-6 dark:border-[#263247] dark:bg-[#111827]">
              <h2 className="font-display text-base font-bold text-[#111827] dark:text-[#F8FAFC]">
                Developer Profiles
              </h2>

              <div className="space-y-3 text-sm">
                <a
                  href={profileData.links.github.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl border border-[#E2E8F0] px-4 py-3 text-[#111827] transition-colors hover:border-[#0789A7] hover:text-[#0789A7] dark:border-[#263247] dark:text-[#F8FAFC] dark:hover:border-[#38D6F2] dark:hover:text-[#38D6F2]"
                >
                  <span className="inline-flex items-center gap-2.5 font-medium">
                    <Github className="h-4 w-4" aria-hidden="true" />
                    <span>GitHub</span>
                  </span>
                  <span className="text-xs text-[#64748B] dark:text-[#A1AEC0]">Open profile</span>
                </a>

                <a
                  href={profileData.links.linkedin.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl border border-[#E2E8F0] px-4 py-3 text-[#111827] transition-colors hover:border-[#0789A7] hover:text-[#0789A7] dark:border-[#263247] dark:text-[#F8FAFC] dark:hover:border-[#38D6F2] dark:hover:text-[#38D6F2]"
                >
                  <span className="inline-flex items-center gap-2.5 font-medium">
                    <Linkedin className="h-4 w-4" aria-hidden="true" />
                    <span>LinkedIn</span>
                  </span>
                  <span className="text-xs text-[#64748B] dark:text-[#A1AEC0]">Open profile</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <form
              noValidate
              onSubmit={handleSubmit}
              className="rounded-2xl border border-[#E2E8F0] bg-white p-6 sm:p-8 dark:border-[#263247] dark:bg-[#111827]"
            >
              {/* Status Notifications */}
              {submitState.type === 'success' && (
                <div
                  role="status"
                  className="mb-6 flex items-start gap-3 rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-sm text-emerald-800 dark:text-emerald-200"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                  <p>{submitState.message}</p>
                </div>
              )}

              {submitState.type === 'error' && (
                <div
                  role="alert"
                  className="mb-6 flex items-start gap-3 rounded-xl border border-rose-500/40 bg-rose-500/10 p-4 text-sm text-rose-800 dark:text-rose-200"
                >
                  <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-600 dark:text-rose-400" aria-hidden="true" />
                  <p>{submitState.message}</p>
                </div>
              )}

              {/* Honeypot field for spam protection */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="contact-website">Website</label>
                <input
                  id="contact-website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={values.website}
                  onChange={(e) => handleFieldChange('website', e.target.value)}
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-sm font-medium text-[#111827] dark:text-[#F8FAFC]"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    maxLength={LIMITS.nameMax}
                    value={values.name}
                    onChange={(e) => handleFieldChange('name', e.target.value)}
                    aria-invalid={Boolean(fieldErrors.name)}
                    aria-describedby={fieldErrors.name ? 'contact-name-error' : undefined}
                    placeholder="Your name"
                    className="mt-2 h-11 w-full rounded-xl border border-[#E2E8F0] bg-[#F5F7FB] px-4 text-sm text-[#111827] placeholder:text-[#64748B] focus:border-[#0789A7] focus:outline-none dark:border-[#263247] dark:bg-[#0D1321] dark:text-[#F8FAFC] dark:placeholder:text-[#A1AEC0] dark:focus:border-[#38D6F2]"
                  />
                  {fieldErrors.name && (
                    <p id="contact-name-error" className="mt-1.5 text-xs font-medium text-rose-600 dark:text-rose-400">
                      {fieldErrors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-sm font-medium text-[#111827] dark:text-[#F8FAFC]"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    maxLength={LIMITS.emailMax}
                    value={values.email}
                    onChange={(e) => handleFieldChange('email', e.target.value)}
                    aria-invalid={Boolean(fieldErrors.email)}
                    aria-describedby={fieldErrors.email ? 'contact-email-error' : undefined}
                    placeholder="you@example.com"
                    className="mt-2 h-11 w-full rounded-xl border border-[#E2E8F0] bg-[#F5F7FB] px-4 text-sm text-[#111827] placeholder:text-[#64748B] focus:border-[#0789A7] focus:outline-none dark:border-[#263247] dark:bg-[#0D1321] dark:text-[#F8FAFC] dark:placeholder:text-[#A1AEC0] dark:focus:border-[#38D6F2]"
                  />
                  {fieldErrors.email && (
                    <p id="contact-email-error" className="mt-1.5 text-xs font-medium text-rose-600 dark:text-rose-400">
                      {fieldErrors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-5">
                <label
                  htmlFor="contact-subject"
                  className="block text-sm font-medium text-[#111827] dark:text-[#F8FAFC]"
                >
                  Subject
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  required
                  maxLength={LIMITS.subjectMax}
                  value={values.subject}
                  onChange={(e) => handleFieldChange('subject', e.target.value)}
                  aria-invalid={Boolean(fieldErrors.subject)}
                  aria-describedby={fieldErrors.subject ? 'contact-subject-error' : undefined}
                  placeholder="Project collaboration, internship, or general inquiry"
                  className="mt-2 h-11 w-full rounded-xl border border-[#E2E8F0] bg-[#F5F7FB] px-4 text-sm text-[#111827] placeholder:text-[#64748B] focus:border-[#0789A7] focus:outline-none dark:border-[#263247] dark:bg-[#0D1321] dark:text-[#F8FAFC] dark:placeholder:text-[#A1AEC0] dark:focus:border-[#38D6F2]"
                />
                {fieldErrors.subject && (
                  <p id="contact-subject-error" className="mt-1.5 text-xs font-medium text-rose-600 dark:text-rose-400">
                    {fieldErrors.subject}
                  </p>
                )}
              </div>

              <div className="mt-5">
                <div className="flex items-center justify-between gap-2">
                  <label
                    htmlFor="contact-message"
                    className="block text-sm font-medium text-[#111827] dark:text-[#F8FAFC]"
                  >
                    Message
                  </label>
                  <span className="font-mono text-xs text-[#64748B] tabular-nums dark:text-[#A1AEC0]">
                    {values.message.length}/{LIMITS.messageMax}
                  </span>
                </div>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  required
                  maxLength={LIMITS.messageMax}
                  value={values.message}
                  onChange={(e) => handleFieldChange('message', e.target.value)}
                  aria-invalid={Boolean(fieldErrors.message)}
                  aria-describedby={fieldErrors.message ? 'contact-message-error' : undefined}
                  placeholder="Write your message here..."
                  className="mt-2 w-full rounded-xl border border-[#E2E8F0] bg-[#F5F7FB] p-4 text-sm text-[#111827] placeholder:text-[#64748B] focus:border-[#0789A7] focus:outline-none dark:border-[#263247] dark:bg-[#0D1321] dark:text-[#F8FAFC] dark:placeholder:text-[#A1AEC0] dark:focus:border-[#38D6F2]"
                />
                {fieldErrors.message && (
                  <p id="contact-message-error" className="mt-1.5 text-xs font-medium text-rose-600 dark:text-rose-400">
                    {fieldErrors.message}
                  </p>
                )}
              </div>

              <div className="mt-6 flex items-center justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#0789A7] px-6 py-3 text-sm font-semibold text-white whitespace-nowrap shrink-0 transition-colors hover:bg-[#06728b] disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0789A7] dark:bg-[#38D6F2] dark:text-[#080B14] dark:hover:bg-[#5ce0f7]"
                >
                  <Send className="h-4 w-4" aria-hidden="true" />
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
