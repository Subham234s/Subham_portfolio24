import { ArrowLeft, ArrowUpRight, FolderSearch, Github } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { ProjectImage } from '../components/common/ProjectImage';
import { PageLayout } from '../components/layout/PageLayout';
import { ProjectCard } from '../components/projects/ProjectCard';
import { projectsData } from '../data/projects';
import { getProjectBySlug, getRelatedProjects } from '../utils/portfolioLogic';

export default function ProjectDetails() {
  const { slug } = useParams<{ slug: string }>();
  const project = getProjectBySlug(projectsData, slug);

  if (!project) {
    return (
      <PageLayout title="Project Not Found">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-center px-4 py-24 text-center sm:px-6 lg:px-8">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EEF2F8] text-[#0789A7] dark:bg-[#182235] dark:text-[#38D6F2]">
            <FolderSearch className="h-7 w-7" aria-hidden="true" />
          </div>
          <h1 className="mt-6 font-display text-3xl font-bold text-[#111827] dark:text-[#F8FAFC]">
            Project Not Found
          </h1>
          <p className="mt-3 max-w-md text-base text-[#64748B] dark:text-[#A1AEC0]">
            The requested project could not be located. It may have been moved or the link may be incorrect.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/projects"
              className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-[#0789A7] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#06728b] dark:bg-[#38D6F2] dark:text-[#080B14] dark:hover:bg-[#5ce0f7]"
            >
              Browse All Projects
            </Link>
            <Link
              to="/"
              className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-[#E2E8F0] bg-white px-5 py-2.5 text-sm font-semibold text-[#111827] transition-colors hover:border-[#0789A7] dark:border-[#263247] dark:bg-[#111827] dark:text-[#F8FAFC] dark:hover:border-[#38D6F2]"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </PageLayout>
    );
  }

  const related = getRelatedProjects(projectsData, project, 2);

  return (
    <PageLayout title={project.title}>
      <article className="mx-auto max-w-[1200px] px-4 py-14 sm:px-6 lg:px-8">
        <Link
          to="/projects"
          className="inline-flex min-h-[40px] items-center gap-2 text-sm font-medium text-[#64748B] transition-colors hover:text-[#0789A7] dark:text-[#A1AEC0] dark:hover:text-[#38D6F2]"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>Back to Projects</span>
        </Link>

        {/* Header */}
        <header className="mt-6 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#64748B] dark:text-[#A1AEC0]">
            <span className="text-[#0789A7] dark:text-[#38D6F2]">{project.category}</span>
            <span aria-hidden="true">·</span>
            <span>{project.completionStatus}</span>
          </div>

          <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-[#111827] sm:text-5xl dark:text-[#F8FAFC]">
            {project.title}
          </h1>

          <p className="mt-4 text-lg leading-relaxed text-[#64748B] dark:text-[#A1AEC0]">
            {project.longDescription}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-[#0789A7] px-5 py-2.5 text-sm font-semibold text-white whitespace-nowrap shrink-0 transition-colors hover:bg-[#06728b] dark:bg-[#38D6F2] dark:text-[#080B14] dark:hover:bg-[#5ce0f7]"
              >
                <Github className="h-4 w-4" aria-hidden="true" />
                <span>View Repository</span>
              </a>
            )}
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-[#E2E8F0] bg-white px-5 py-2.5 text-sm font-semibold text-[#111827] whitespace-nowrap shrink-0 transition-colors hover:border-[#0789A7] dark:border-[#263247] dark:bg-[#111827] dark:text-[#F8FAFC] dark:hover:border-[#38D6F2]"
              >
                <span>Live Demo</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            ) : (
              <span className="text-xs font-medium text-[#64748B] dark:text-[#A1AEC0]">
                Live deployment link pending
              </span>
            )}
          </div>
        </header>

        {/* Hero Visual */}
        <div className="mt-10 overflow-hidden rounded-2xl border border-[#E2E8F0] dark:border-[#263247]">
          <ProjectImage
            src={project.image}
            alt={project.imageAlt}
            title={project.title}
            priority
          />
        </div>

        {/* Technical Breakdown */}
        <div className="mt-14 grid gap-12 lg:grid-cols-12">
          <div className="space-y-10 lg:col-span-8">
            <section>
              <h2 className="font-display text-2xl font-bold text-[#111827] dark:text-[#F8FAFC]">
                Problem Statement
              </h2>
              <p className="mt-3 text-base leading-relaxed text-[#64748B] dark:text-[#A1AEC0]">
                {project.problemStatement}
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-[#111827] dark:text-[#F8FAFC]">
                Project Objectives
              </h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-relaxed text-[#64748B] dark:text-[#A1AEC0]">
                {project.objectives.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-[#111827] dark:text-[#F8FAFC]">
                Main Features
              </h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-relaxed text-[#64748B] dark:text-[#A1AEC0]">
                {project.features.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-[#111827] dark:text-[#F8FAFC]">
                Development Process &amp; Architecture
              </h2>
              <p className="mt-3 text-base leading-relaxed text-[#111827] dark:text-[#F8FAFC]">
                {project.architecture}
              </p>
              <ol className="mt-4 space-y-3 text-base leading-relaxed text-[#64748B] dark:text-[#A1AEC0]">
                {project.developmentProcess.map((step, index) => (
                  <li key={step} className="flex gap-3">
                    <span className="font-mono text-sm font-semibold text-[#0789A7] tabular-nums dark:text-[#38D6F2]">
                      0{index + 1}.
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </section>

            <section className="grid gap-8 border-t border-[#E2E8F0] pt-8 sm:grid-cols-2 dark:border-[#263247]">
              <div>
                <h2 className="font-display text-xl font-bold text-[#111827] dark:text-[#F8FAFC]">
                  Challenges Faced
                </h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[#64748B] dark:text-[#A1AEC0]">
                  {project.challenges.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="font-display text-xl font-bold text-[#111827] dark:text-[#F8FAFC]">
                  Solutions Implemented
                </h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[#64748B] dark:text-[#A1AEC0]">
                  {project.solutions.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="border-t border-[#E2E8F0] pt-8 dark:border-[#263247]">
              <h2 className="font-display text-2xl font-bold text-[#111827] dark:text-[#F8FAFC]">
                Key Learnings
              </h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-relaxed text-[#64748B] dark:text-[#A1AEC0]">
                {project.learnings.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          </div>

          {/* Sidebar Specifications */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24 rounded-2xl border border-[#E2E8F0] bg-white p-6 dark:border-[#263247] dark:bg-[#111827]">
              <h2 className="font-display text-lg font-bold text-[#111827] dark:text-[#F8FAFC]">
                Technical Specs
              </h2>
              <dl className="mt-5 divide-y divide-[#E2E8F0] text-sm dark:divide-[#263247]">
                <div className="py-3.5 first:pt-0">
                  <dt className="text-xs text-[#64748B] dark:text-[#A1AEC0]">Category</dt>
                  <dd className="mt-1 font-medium text-[#111827] dark:text-[#F8FAFC]">
                    {project.category}
                  </dd>
                </div>
                <div className="py-3.5">
                  <dt className="text-xs text-[#64748B] dark:text-[#A1AEC0]">Status</dt>
                  <dd className="mt-1 font-medium text-[#0789A7] dark:text-[#38D6F2]">
                    {project.completionStatus}
                  </dd>
                </div>
                <div className="py-3.5 last:pb-0">
                  <dt className="text-xs text-[#64748B] dark:text-[#A1AEC0]">Technology Stack</dt>
                  <dd className="mt-2 font-mono text-xs leading-relaxed text-[#111827] dark:text-[#F8FAFC]">
                    {project.technologies.join(' · ')}
                  </dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>

        {/* Related Projects */}
        {related.length > 0 && (
          <section className="mt-20 border-t border-[#E2E8F0] pt-14 dark:border-[#263247]">
            <h2 className="font-display text-2xl font-bold text-[#111827] dark:text-[#F8FAFC]">
              Related Projects
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {related.map((item) => (
                <ProjectCard key={item.id} project={item} />
              ))}
            </div>
          </section>
        )}
      </article>
    </PageLayout>
  );
}
