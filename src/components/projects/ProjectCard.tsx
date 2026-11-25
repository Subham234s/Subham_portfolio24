import { ArrowUpRight, Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { ProjectItem } from '../../utils/portfolioLogic';
import { ProjectImage } from '../common/ProjectImage';

interface ProjectCardProps {
  project: ProjectItem;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0789A7]/60 dark:border-[#263247] dark:bg-[#111827] dark:hover:border-[#38D6F2]/60">
      <Link
        to={`/projects/${project.slug}`}
        aria-label={`View details for ${project.title}`}
        className="block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0789A7] dark:focus-visible:outline-[#38D6F2]"
      >
        <ProjectImage
          src={project.image}
          alt={project.imageAlt}
          title={project.title}
        />
      </Link>

      <div className="flex flex-1 flex-col p-6">
        {/* Zero-pill quiet metadata */}
        <div className="flex items-center gap-2 text-xs font-medium text-[#64748B] dark:text-[#A1AEC0]">
          <span className="text-[#0789A7] dark:text-[#38D6F2]">{project.category}</span>
          <span aria-hidden="true">·</span>
          <span>{project.completionStatus}</span>
        </div>

        <h3 className="mt-2 font-display text-xl font-bold tracking-tight text-[#111827] dark:text-[#F8FAFC]">
          <Link
            to={`/projects/${project.slug}`}
            className="transition-colors hover:text-[#0789A7] dark:hover:text-[#38D6F2]"
          >
            {project.title}
          </Link>
        </h3>

        <p className="mt-2.5 flex-1 text-sm leading-relaxed text-[#64748B] dark:text-[#A1AEC0]">
          {project.description}
        </p>

        {/* Unboxed tech stack list */}
        <p className="mt-4 font-mono text-xs text-[#64748B] dark:text-[#A1AEC0]">
          {project.technologies.join(' · ')}
        </p>

        <div className="mt-5 flex items-center justify-between gap-4 border-t border-[#E2E8F0] pt-4 dark:border-[#263247]">
          <Link
            to={`/projects/${project.slug}`}
            className="inline-flex min-h-[40px] items-center gap-1.5 text-sm font-semibold text-[#0789A7] whitespace-nowrap shrink-0 transition-colors hover:text-[#06728b] dark:text-[#38D6F2] dark:hover:text-[#5ce0f7]"
          >
            <span>View Project</span>
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>

          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} GitHub repository`}
                className="inline-flex min-h-[40px] items-center gap-1.5 text-xs font-medium text-[#64748B] whitespace-nowrap shrink-0 transition-colors hover:text-[#111827] dark:text-[#A1AEC0] dark:hover:text-[#F8FAFC]"
              >
                <Github className="h-4 w-4" aria-hidden="true" />
                <span>Code</span>
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} live demo`}
                className="inline-flex min-h-[40px] items-center gap-1 text-xs font-medium text-[#64748B] whitespace-nowrap shrink-0 transition-colors hover:text-[#111827] dark:text-[#A1AEC0] dark:hover:text-[#F8FAFC]"
              >
                <span>Live Demo</span>
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
