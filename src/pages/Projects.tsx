import { FolderOpen, Search, X } from 'lucide-react';
import { useState } from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import { ProjectCard } from '../components/projects/ProjectCard';
import { projectsData } from '../data/projects';
import { filterProjects, type ProjectCategory } from '../utils/portfolioLogic';

const PROJECT_CATEGORIES: ProjectCategory[] = [
  'All',
  'Frontend',
  'Full-Stack',
  'Backend',
  'AI Experiments',
];

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = filterProjects(projectsData, selectedCategory, searchQuery);

  const resetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
  };

  return (
    <PageLayout title="Projects">
      <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-wider text-[#0789A7] dark:text-[#38D6F2]">
            Portfolio Work
          </p>
          <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-[#111827] sm:text-5xl dark:text-[#F8FAFC]">
            Projects &amp; Prototypes
          </h1>
          <p className="mt-4 text-base leading-relaxed text-[#64748B] dark:text-[#A1AEC0]">
            Structured web applications and learning concepts built to practice full-stack architecture, clean APIs, relational data modeling, and thoughtful interface design.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div
            role="tablist"
            aria-label="Filter projects by category"
            className="flex flex-wrap items-center gap-1.5 rounded-xl border border-[#E2E8F0] bg-[#EEF2F8] p-1.5 dark:border-[#263247] dark:bg-[#0D1321]"
          >
            {PROJECT_CATEGORIES.map((category) => {
              const isSelected = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedCategory(category)}
                  className={`min-h-[40px] rounded-lg px-4 py-2 text-xs font-semibold whitespace-nowrap shrink-0 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0789A7] dark:focus-visible:outline-[#38D6F2] ${
                    isSelected
                      ? 'bg-white text-[#111827] shadow-xs dark:bg-[#182235] dark:text-[#38D6F2]'
                      : 'text-[#64748B] hover:text-[#111827] dark:text-[#A1AEC0] dark:hover:text-[#F8FAFC]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <div className="relative w-full lg:w-72">
            <label htmlFor="project-search" className="sr-only">
              Search projects by title or technology
            </label>
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#64748B] dark:text-[#A1AEC0]"
              aria-hidden="true"
            />
            <input
              id="project-search"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search title or tech..."
              className="h-11 w-full rounded-xl border border-[#E2E8F0] bg-white pl-10 pr-10 text-sm text-[#111827] placeholder:text-[#64748B] focus:border-[#0789A7] focus:outline-none dark:border-[#263247] dark:bg-[#111827] dark:text-[#F8FAFC] dark:placeholder:text-[#A1AEC0] dark:focus:border-[#38D6F2]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search query"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-[#64748B] hover:text-[#111827] dark:text-[#A1AEC0] dark:hover:text-[#F8FAFC]"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>

        <p className="mt-5 text-xs font-medium text-[#64748B] tabular-nums dark:text-[#A1AEC0]">
          Showing {filteredProjects.length} of {projectsData.length} projects
        </p>

        {/* Project Grid or Empty State */}
        {filteredProjects.length > 0 ? (
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-[#E2E8F0] bg-white px-6 py-16 text-center dark:border-[#263247] dark:bg-[#111827]">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#EEF2F8] text-[#0789A7] dark:bg-[#182235] dark:text-[#38D6F2]">
              <FolderOpen className="h-6 w-6" aria-hidden="true" />
            </div>
            <h2 className="mt-4 font-display text-xl font-bold text-[#111827] dark:text-[#F8FAFC]">
              No matching projects found
            </h2>
            <p className="mt-2 max-w-md text-sm text-[#64748B] dark:text-[#A1AEC0]">
              No projects match the current category filter or search term. Try clearing your filters to view all projects.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-6 inline-flex min-h-[44px] items-center justify-center rounded-xl bg-[#0789A7] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#06728b] dark:bg-[#38D6F2] dark:text-[#080B14] dark:hover:bg-[#5ce0f7]"
            >
              Show All Projects
            </button>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
