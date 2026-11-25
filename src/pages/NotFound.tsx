import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageLayout } from '../components/layout/PageLayout';

export default function NotFound() {
  return (
    <PageLayout title="Page Not Found">
      <section className="mx-auto flex max-w-[1200px] flex-col items-center justify-center px-4 py-28 text-center sm:px-6 lg:px-8">
        <p className="font-mono text-7xl font-bold tracking-tight text-[#0789A7] tabular-nums sm:text-8xl dark:text-[#38D6F2]">
          404
        </p>
        <h1 className="mt-4 font-display text-2xl font-bold text-[#111827] sm:text-3xl dark:text-[#F8FAFC]">
          Page not found
        </h1>
        <p className="mt-3 max-w-md text-base text-[#64748B] dark:text-[#A1AEC0]">
          The page you are looking for does not exist or may have been moved.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            to="/"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-[#0789A7] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#06728b] dark:bg-[#38D6F2] dark:text-[#080B14] dark:hover:bg-[#5ce0f7]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>Back to Home</span>
          </Link>
          <Link
            to="/projects"
            className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-[#E2E8F0] bg-white px-6 py-3 text-sm font-semibold text-[#111827] transition-colors hover:border-[#0789A7] dark:border-[#263247] dark:bg-[#111827] dark:text-[#F8FAFC] dark:hover:border-[#38D6F2]"
          >
            View Projects
          </Link>
        </div>
      </section>
    </PageLayout>
  );
}
