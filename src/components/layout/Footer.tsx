import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { profileData } from '../../data/profile';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#E2E8F0] bg-[#EEF2F8] dark:border-[#263247] dark:bg-[#0D1321]">
      <div className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Link
              to="/"
              className="font-display text-lg font-bold tracking-tight text-[#111827] dark:text-[#F8FAFC]"
            >
              {profileData.name}
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-[#64748B] dark:text-[#A1AEC0]">
              {profileData.positioning}
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold tracking-wider text-[#111827] dark:text-[#F8FAFC]">
              Navigation
            </h3>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm">
              <li>
                <Link
                  to="/"
                  className="text-[#64748B] transition-colors hover:text-[#0789A7] dark:text-[#A1AEC0] dark:hover:text-[#38D6F2]"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-[#64748B] transition-colors hover:text-[#0789A7] dark:text-[#A1AEC0] dark:hover:text-[#38D6F2]"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/skills"
                  className="text-[#64748B] transition-colors hover:text-[#0789A7] dark:text-[#A1AEC0] dark:hover:text-[#38D6F2]"
                >
                  Skills
                </Link>
              </li>
              <li>
                <Link
                  to="/projects"
                  className="text-[#64748B] transition-colors hover:text-[#0789A7] dark:text-[#A1AEC0] dark:hover:text-[#38D6F2]"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  to="/journey"
                  className="text-[#64748B] transition-colors hover:text-[#0789A7] dark:text-[#A1AEC0] dark:hover:text-[#38D6F2]"
                >
                  Journey
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-[#64748B] transition-colors hover:text-[#0789A7] dark:text-[#A1AEC0] dark:hover:text-[#38D6F2]"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col justify-between gap-6 md:items-end">
            <div>
              <h3 className="text-xs font-semibold tracking-wider text-[#111827] md:text-right dark:text-[#F8FAFC]">
                Connect
              </h3>
              <div className="mt-4 flex items-center gap-3">
                <a
                  href={profileData.links.github.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#E2E8F0] bg-white text-[#111827] transition-colors hover:border-[#0789A7] hover:text-[#0789A7] dark:border-[#263247] dark:bg-[#111827] dark:text-[#F8FAFC] dark:hover:border-[#38D6F2] dark:hover:text-[#38D6F2]"
                >
                  <Github className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href={profileData.links.linkedin.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#E2E8F0] bg-white text-[#111827] transition-colors hover:border-[#0789A7] hover:text-[#0789A7] dark:border-[#263247] dark:bg-[#111827] dark:text-[#F8FAFC] dark:hover:border-[#38D6F2] dark:hover:text-[#38D6F2]"
                >
                  <Linkedin className="h-4 w-4" aria-hidden="true" />
                </a>
                <Link
                  to="/contact"
                  aria-label="Send a message via contact form"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#E2E8F0] bg-white text-[#111827] transition-colors hover:border-[#0789A7] hover:text-[#0789A7] dark:border-[#263247] dark:bg-[#111827] dark:text-[#F8FAFC] dark:hover:border-[#38D6F2] dark:hover:text-[#38D6F2]"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex min-h-[40px] items-center gap-2 self-start rounded-lg border border-[#E2E8F0] bg-white px-4 py-2 text-xs font-semibold text-[#111827] transition-colors hover:border-[#0789A7] hover:text-[#0789A7] md:self-end dark:border-[#263247] dark:bg-[#111827] dark:text-[#F8FAFC] dark:hover:border-[#38D6F2] dark:hover:text-[#38D6F2]"
            >
              <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Back to top</span>
            </button>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-[#E2E8F0] pt-6 text-xs text-[#64748B] sm:flex-row sm:items-center sm:justify-between dark:border-[#263247] dark:text-[#A1AEC0]">
          <p>© {new Date().getFullYear()} {profileData.name}. Built with React & Tailwind CSS.</p>
          <p>First-Year College Student · Full-Stack Web & AI Learner</p>
        </div>
      </div>
    </footer>
  );
}
