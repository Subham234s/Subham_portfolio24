import {
  ArrowRight,
  Cpu,
  Database,
  Download,
  Github,
  Layers,
  Linkedin,
  Server,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SectionHeading } from '../components/common/SectionHeading';
import { CodeEditorVisual } from '../components/home/CodeEditorVisual';
import { PageLayout } from '../components/layout/PageLayout';
import { ProjectCard } from '../components/projects/ProjectCard';
import { profileData } from '../data/profile';
import { projectsData } from '../data/projects';

const TECH_GROUPS = [
  {
    title: 'Frontend',
    icon: Layers,
    items: 'HTML5 · CSS3 · JavaScript · React.js',
    summary: 'Building responsive, accessible interfaces with component architecture and clean design systems.',
  },
  {
    title: 'Backend',
    icon: Server,
    items: 'Node.js · Express · REST APIs',
    summary: 'Designing structured API routes, server-side input validation, and reliable client-server workflows.',
  },
  {
    title: 'Database',
    icon: Database,
    items: 'DBMS Fundamentals · SQL',
    summary: 'Modeling relational entities, primary/foreign keys, normalization, and structured SQL queries.',
  },
  {
    title: 'Artificial Intelligence',
    icon: Cpu,
    items: 'AI Concepts · Emerging Web Tech',
    summary: 'Exploring foundational AI workflows, practical model integration, and thoughtful user experiences.',
  },
];

export default function Home() {
  const featuredProjects = projectsData.filter((project) => project.featured);

  return (
    <PageLayout title="Home">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-[#E2E8F0] bg-subtle-grid dark:border-[#263247]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full bg-[#38D6F2]/10 blur-3xl dark:bg-[#38D6F2]/10"
        />
        <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="grid items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Left Column: Identity & Primary Actions */}
            <div className="flex min-w-0 flex-col justify-center lg:col-span-6">
              <p className="text-sm font-medium text-[#0789A7] dark:text-[#38D6F2]">
                {profileData.educationStatus} · {profileData.role}
              </p>

              <p className="mt-4 text-base font-medium text-[#64748B] dark:text-[#A1AEC0]">
                Hello, I&apos;m {profileData.name}.
              </p>

              <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight text-[#111827] sm:text-5xl dark:text-[#F8FAFC]">
                {profileData.tagline}
              </h1>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-[#64748B] sm:text-lg dark:text-[#A1AEC0]">
                {profileData.positioning}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  to="/projects"
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#0789A7] px-6 py-3 text-sm font-semibold text-white whitespace-nowrap shrink-0 transition-colors hover:bg-[#06728b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0789A7] dark:bg-[#38D6F2] dark:text-[#080B14] dark:hover:bg-[#5ce0f7] dark:focus-visible:outline-[#38D6F2]"
                >
                  <span>View Projects</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>

                <Link
                  to="/contact"
                  className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-[#E2E8F0] bg-white px-6 py-3 text-sm font-semibold text-[#111827] whitespace-nowrap shrink-0 transition-colors hover:border-[#0789A7] hover:text-[#0789A7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0789A7] dark:border-[#263247] dark:bg-[#111827] dark:text-[#F8FAFC] dark:hover:border-[#38D6F2] dark:hover:text-[#38D6F2]"
                >
                  Contact Me
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-6 border-t border-[#E2E8F0] pt-6 text-sm dark:border-[#263247]">
                <a
                  href={profileData.links.github.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-medium text-[#64748B] transition-colors hover:text-[#111827] dark:text-[#A1AEC0] dark:hover:text-[#F8FAFC]"
                >
                  <Github className="h-4 w-4" aria-hidden="true" />
                  <span>GitHub</span>
                </a>
                <a
                  href={profileData.links.linkedin.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-medium text-[#64748B] transition-colors hover:text-[#111827] dark:text-[#A1AEC0] dark:hover:text-[#F8FAFC]"
                >
                  <Linkedin className="h-4 w-4" aria-hidden="true" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={profileData.resumeUrl}
                  download="Subham_Singh_Resume.pdf"
                  className="inline-flex items-center gap-2 font-medium text-[#64748B] transition-colors hover:text-[#0789A7] dark:text-[#A1AEC0] dark:hover:text-[#38D6F2]"
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  <span>Resume (PDF)</span>
                </a>
              </div>
            </div>

            {/* Right Column: Interactive Code Editor Visual */}
            <div className="min-w-0 lg:col-span-6">
              <CodeEditorVisual />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="mx-auto max-w-[1200px] px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Selected Work"
            title="Featured Projects"
            description="Practical concept builds and student prototypes demonstrating frontend interfaces, REST APIs, and relational database design."
          />
          <Link
            to="/projects"
            className="inline-flex min-h-[40px] items-center gap-1.5 self-start text-sm font-semibold text-[#0789A7] whitespace-nowrap shrink-0 transition-colors hover:text-[#06728b] sm:self-auto dark:text-[#38D6F2] dark:hover:text-[#5ce0f7]"
          >
            <span>All Projects</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* Technology Overview */}
      <section className="border-y border-[#E2E8F0] bg-[#EEF2F8]/70 dark:border-[#263247] dark:bg-[#0D1321]/80">
        <div className="mx-auto max-w-[1200px] px-4 py-20 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Core Stack"
              title="Technology Overview"
              description="Foundational technologies across frontend engineering, backend APIs, relational databases, and emerging AI concepts."
            />
            <Link
              to="/skills"
              className="inline-flex min-h-[40px] items-center gap-1.5 self-start text-sm font-semibold text-[#0789A7] whitespace-nowrap shrink-0 transition-colors hover:text-[#06728b] sm:self-auto dark:text-[#38D6F2] dark:hover:text-[#5ce0f7]"
            >
              <span>Explore Skills</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TECH_GROUPS.map((group) => {
              const Icon = group.icon;
              return (
                <div
                  key={group.title}
                  className="flex flex-col rounded-2xl border border-[#E2E8F0] bg-white p-6 dark:border-[#263247] dark:bg-[#111827]"
                >
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF2F8] text-[#0789A7] dark:bg-[#182235] dark:text-[#38D6F2]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold text-[#111827] dark:text-[#F8FAFC]">
                    {group.title}
                  </h3>
                  <p className="mt-1.5 font-mono text-xs text-[#0789A7] dark:text-[#38D6F2]">
                    {group.items}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[#64748B] dark:text-[#A1AEC0]">
                    {group.summary}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Preview & Current Learning */}
      <section className="mx-auto max-w-[1200px] px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="min-w-0 lg:col-span-6">
            <SectionHeading
              eyebrow="Background"
              title="Learning in public and building step by step."
            />
            <p className="mt-5 text-base leading-relaxed text-[#64748B] dark:text-[#A1AEC0]">
              {profileData.introduction}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Link
                to="/about"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-[#E2E8F0] bg-white px-5 py-2.5 text-sm font-semibold text-[#111827] whitespace-nowrap shrink-0 transition-colors hover:border-[#0789A7] hover:text-[#0789A7] dark:border-[#263247] dark:bg-[#111827] dark:text-[#F8FAFC] dark:hover:border-[#38D6F2] dark:hover:text-[#38D6F2]"
              >
                <span>Read More</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                to="/journey"
                className="inline-flex min-h-[44px] items-center gap-1.5 px-2 text-sm font-semibold text-[#64748B] whitespace-nowrap shrink-0 transition-colors hover:text-[#111827] dark:text-[#A1AEC0] dark:hover:text-[#F8FAFC]"
              >
                <span>View Journey</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="min-w-0 lg:col-span-6">
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 sm:p-8 dark:border-[#263247] dark:bg-[#111827]">
              <p className="text-xs font-semibold tracking-wider text-[#0789A7] dark:text-[#38D6F2]">
                Currently Exploring
              </p>
              <h3 className="mt-2 font-display text-xl font-bold text-[#111827] dark:text-[#F8FAFC]">
                Active Learning Focus
              </h3>

              <ul className="mt-6 divide-y divide-[#E2E8F0] dark:divide-[#263247]">
                {profileData.currentLearning.map((item) => (
                  <li key={item.title} className="py-4 first:pt-0 last:pb-0">
                    <h4 className="text-sm font-semibold text-[#111827] dark:text-[#F8FAFC]">
                      {item.title}
                    </h4>
                    <p className="mt-1 text-sm leading-relaxed text-[#64748B] dark:text-[#A1AEC0]">
                      {item.detail}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="mx-auto max-w-[1200px] px-4 pb-20 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-[#E2E8F0] bg-[#EEF2F8] px-6 py-12 text-center sm:px-12 sm:py-16 dark:border-[#263247] dark:bg-[#0D1321]">
          <p className="text-xs font-semibold tracking-wider text-[#0789A7] dark:text-[#38D6F2]">
            Collaborate
          </p>
          <h2 className="mx-auto mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight text-[#111827] sm:text-4xl dark:text-[#F8FAFC]">
            Have an idea? Let&apos;s build something together.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-[#64748B] dark:text-[#A1AEC0]">
            {profileData.availabilityNote}
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              to="/contact"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#0789A7] px-6 py-3 text-sm font-semibold text-white whitespace-nowrap shrink-0 transition-colors hover:bg-[#06728b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0789A7] dark:bg-[#38D6F2] dark:text-[#080B14] dark:hover:bg-[#5ce0f7]"
            >
              <span>Contact Me</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
