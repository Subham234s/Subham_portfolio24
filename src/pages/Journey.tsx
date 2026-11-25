import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageLayout } from '../components/layout/PageLayout';
import { journeyData } from '../data/journey';

export default function Journey() {
  return (
    <PageLayout title="Journey">
      <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-wider text-[#0789A7] dark:text-[#38D6F2]">
            Developer Timeline
          </p>
          <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-[#111827] sm:text-5xl dark:text-[#F8FAFC]">
            Learning Journey
          </h1>
          <p className="mt-4 text-base leading-relaxed text-[#64748B] dark:text-[#A1AEC0]">
            A chronological record of how I started building on the web, the technologies I have explored during my first year of college, and what comes next.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative mt-14 max-w-3xl pl-8 sm:pl-10">
          <div
            aria-hidden="true"
            className="absolute bottom-2 left-3 top-2 w-px bg-[#E2E8F0] dark:bg-[#263247]"
          />

          <ol className="space-y-8">
            {journeyData.map((entry, index) => (
              <li key={entry.id} className="relative">
                {/* Timeline node */}
                <span
                  aria-hidden="true"
                  className="absolute -left-[29px] top-6 flex h-5 w-5 items-center justify-center rounded-full border border-[#0789A7] bg-[#F5F7FB] text-[10px] font-mono font-bold text-[#0789A7] dark:border-[#38D6F2] dark:bg-[#080B14] dark:text-[#38D6F2] sm:-left-[37px]"
                >
                  {index + 1}
                </span>

                <article className="rounded-2xl border border-[#E2E8F0] bg-white p-6 sm:p-8 dark:border-[#263247] dark:bg-[#111827]">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#64748B] dark:text-[#A1AEC0]">
                    <span className="text-[#0789A7] dark:text-[#38D6F2]">{entry.period}</span>
                    <span aria-hidden="true">·</span>
                    <span>{entry.type}</span>
                  </div>

                  <h2 className="mt-2 font-display text-xl font-bold text-[#111827] dark:text-[#F8FAFC]">
                    {entry.title}
                  </h2>

                  <p className="mt-3 text-sm leading-relaxed text-[#64748B] sm:text-base dark:text-[#A1AEC0]">
                    {entry.description}
                  </p>

                  <p className="mt-4 font-mono text-xs text-[#64748B] dark:text-[#A1AEC0]">
                    {entry.technologies.join(' · ')}
                  </p>
                </article>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-16 flex flex-wrap items-center gap-4">
          <Link
            to="/projects"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-[#0789A7] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#06728b] dark:bg-[#38D6F2] dark:text-[#080B14] dark:hover:bg-[#5ce0f7]"
          >
            <span>Explore Projects</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            to="/contact"
            className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-[#E2E8F0] bg-white px-5 py-2.5 text-sm font-semibold text-[#111827] transition-colors hover:border-[#0789A7] dark:border-[#263247] dark:bg-[#111827] dark:text-[#F8FAFC] dark:hover:border-[#38D6F2]"
          >
            Connect with Me
          </Link>
        </div>
      </div>
    </PageLayout>
  );
}
