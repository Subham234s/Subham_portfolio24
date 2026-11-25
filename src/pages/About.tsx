import { ArrowRight, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SectionHeading } from '../components/common/SectionHeading';
import { PageLayout } from '../components/layout/PageLayout';
import { profileData } from '../data/profile';

export default function About() {
  return (
    <PageLayout title="About">
      <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 lg:px-8">
        {/* Editorial Intro */}
        <div className="max-w-3xl">
          <p className="text-xs font-semibold tracking-wider text-[#0789A7] dark:text-[#38D6F2]">
            About Me
          </p>
          <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-[#111827] sm:text-5xl dark:text-[#F8FAFC]">
            First-year student crafting modern web applications with curiosity and discipline.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-[#64748B] dark:text-[#A1AEC0]">
            {profileData.introduction}
          </p>
        </div>

        {/* Structured Editorial Details */}
        <div className="mt-14 grid gap-10 border-t border-[#E2E8F0] pt-12 lg:grid-cols-12 dark:border-[#263247]">
          <div className="space-y-8 lg:col-span-7">
            <section>
              <h2 className="font-display text-xl font-bold text-[#111827] dark:text-[#F8FAFC]">
                My Coding Journey
              </h2>
              <p className="mt-3 text-base leading-relaxed text-[#64748B] dark:text-[#A1AEC0]">
                My interest in software development started with curiosity about how websites work behind the scenes. Beginning with HTML and CSS, I learned how structure and layout come together in the browser. From there, JavaScript and React opened up component-based thinking and interactive user interfaces.
              </p>
              <p className="mt-3 text-base leading-relaxed text-[#64748B] dark:text-[#A1AEC0]">
                As I built larger projects, I wanted to understand how data persists and how applications communicate across networks. That led me to Node.js, REST API development, DBMS fundamentals, and SQL.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-[#111827] dark:text-[#F8FAFC]">
                Why Full-Stack Development &amp; AI
              </h2>
              <p className="mt-3 text-base leading-relaxed text-[#64748B] dark:text-[#A1AEC0]">
                Full-stack development appeals to me because it connects every layer of a product—from accessible typography and responsive layouts on the frontend to clean validation, APIs, and relational schemas on the backend.
              </p>
              <p className="mt-3 text-base leading-relaxed text-[#64748B] dark:text-[#A1AEC0]">
                Alongside web engineering, I am actively exploring Artificial Intelligence concepts to understand how intelligent workflows can make software more useful, structured, and human-friendly without adding unnecessary complexity.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-[#111827] dark:text-[#F8FAFC]">
                Personal Goals &amp; Future Ambitions
              </h2>
              <ul className="mt-4 space-y-3 text-base text-[#64748B] dark:text-[#A1AEC0]">
                <li>
                  <strong className="font-semibold text-[#111827] dark:text-[#F8FAFC]">
                    Strengthen Core Engineering:
                  </strong>{' '}
                  Write clean, testable JavaScript/TypeScript, understand data structures, and design well-normalized databases.
                </li>
                <li>
                  <strong className="font-semibold text-[#111827] dark:text-[#F8FAFC]">
                    Ship Real Projects:
                  </strong>{' '}
                  Turn study concepts into deployed, end-to-end applications with thoughtful user experiences.
                </li>
                <li>
                  <strong className="font-semibold text-[#111827] dark:text-[#F8FAFC]">
                    Collaborate &amp; Grow:
                  </strong>{' '}
                  Contribute to student teams, open-source initiatives, and internship opportunities where I can learn from experienced builders.
                </li>
              </ul>
            </section>
          </div>

          {/* Right Summary Rail */}
          <aside className="lg:col-span-5">
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 sm:p-8 dark:border-[#263247] dark:bg-[#111827]">
              <h2 className="font-display text-lg font-bold text-[#111827] dark:text-[#F8FAFC]">
                Profile Summary
              </h2>

              <dl className="mt-6 divide-y divide-[#E2E8F0] text-sm dark:divide-[#263247]">
                <div className="flex items-center justify-between gap-4 py-3.5 first:pt-0">
                  <dt className="text-[#64748B] dark:text-[#A1AEC0]">Name</dt>
                  <dd className="font-medium text-[#111827] dark:text-[#F8FAFC]">{profileData.name}</dd>
                </div>
                <div className="flex items-center justify-between gap-4 py-3.5">
                  <dt className="text-[#64748B] dark:text-[#A1AEC0]">Education</dt>
                  <dd className="font-medium text-[#111827] dark:text-[#F8FAFC]">{profileData.educationStatus}</dd>
                </div>
                <div className="flex items-center justify-between gap-4 py-3.5">
                  <dt className="text-[#64748B] dark:text-[#A1AEC0]">Primary Focus</dt>
                  <dd className="font-medium text-[#111827] dark:text-[#F8FAFC]">Full-Stack Web</dd>
                </div>
                <div className="flex items-center justify-between gap-4 py-3.5">
                  <dt className="text-[#64748B] dark:text-[#A1AEC0]">Exploring</dt>
                  <dd className="font-medium text-[#111827] dark:text-[#F8FAFC]">Artificial Intelligence</dd>
                </div>
                <div className="flex items-center justify-between gap-4 py-3.5 last:pb-0">
                  <dt className="text-[#64748B] dark:text-[#A1AEC0]">Core Stack</dt>
                  <dd className="font-mono text-xs font-medium text-[#0789A7] dark:text-[#38D6F2]">
                    React · Node.js · SQL
                  </dd>
                </div>
              </dl>

              <div className="mt-8 flex flex-col gap-3">
                <a
                  href={profileData.resumeUrl}
                  download="Subham_Singh_Resume.pdf"
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-[#E2E8F0] bg-[#F5F7FB] px-5 py-2.5 text-sm font-semibold text-[#111827] transition-colors hover:border-[#0789A7] hover:text-[#0789A7] dark:border-[#263247] dark:bg-[#182235] dark:text-[#F8FAFC] dark:hover:border-[#38D6F2] dark:hover:text-[#38D6F2]"
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  <span>Download Resume (PDF)</span>
                </a>
                <Link
                  to="/contact"
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#0789A7] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#06728b] dark:bg-[#38D6F2] dark:text-[#080B14] dark:hover:bg-[#5ce0f7]"
                >
                  <span>Get in Touch</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </aside>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 rounded-2xl border border-[#E2E8F0] bg-[#EEF2F8] p-8 sm:flex sm:items-center sm:justify-between dark:border-[#263247] dark:bg-[#0D1321]">
          <div>
            <SectionHeading
              title="Want to see what I have been building?"
              description="Browse my concept builds, technical breakdowns, or reach out directly."
            />
          </div>
          <div className="mt-6 flex flex-wrap gap-3 sm:mt-0 sm:shrink-0">
            <Link
              to="/projects"
              className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-[#0789A7] px-5 py-2.5 text-sm font-semibold text-white whitespace-nowrap shrink-0 transition-colors hover:bg-[#06728b] dark:bg-[#38D6F2] dark:text-[#080B14] dark:hover:bg-[#5ce0f7]"
            >
              View Projects
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
