export type ProjectCategory = 'All' | 'Frontend' | 'Full-Stack' | 'Backend' | 'AI Experiments';

export interface ProjectItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  category: Exclude<ProjectCategory, 'All'>;
  technologies: string[];
  image: string;
  imageAlt: string;
  liveUrl?: string;
  githubUrl?: string;
  problemStatement: string;
  objectives: string[];
  features: string[];
  developmentProcess: string[];
  architecture: string;
  challenges: string[];
  solutions: string[];
  learnings: string[];
  featured: boolean;
  completionStatus: 'Completed Concept' | 'Prototype' | 'In Development';
}

export type LearningStatus =
  | 'Currently Using'
  | 'Familiar With'
  | 'Currently Learning'
  | 'Exploring';

export type SkillCategory =
  | 'Frontend Development'
  | 'Backend Development'
  | 'Database'
  | 'AI and Emerging Technology';

export interface SkillItem {
  id: string;
  name: string;
  category: SkillCategory;
  description: string;
  learningStatus: LearningStatus;
  focusArea: string;
}

export function filterProjects(
  projects: ProjectItem[],
  category: ProjectCategory,
  searchQuery = ''
): ProjectItem[] {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  return projects.filter((project) => {
    const matchesCategory = category === 'All' || project.category === category;
    if (!matchesCategory) return false;

    if (!normalizedQuery) return true;

    const haystack = [
      project.title,
      project.description,
      project.category,
      ...project.technologies,
    ]
      .join(' ')
      .toLowerCase();

    return haystack.includes(normalizedQuery);
  });
}

export function getProjectBySlug(projects: ProjectItem[], slug: string | undefined): ProjectItem | undefined {
  if (!slug) return undefined;
  return projects.find((project) => project.slug === slug);
}

export function getRelatedProjects(
  projects: ProjectItem[],
  current: ProjectItem,
  limit = 2
): ProjectItem[] {
  const sameCategory = projects.filter(
    (p) => p.id !== current.id && p.category === current.category
  );
  const others = projects.filter(
    (p) => p.id !== current.id && p.category !== current.category
  );
  return [...sameCategory, ...others].slice(0, limit);
}

export function filterSkillsByCategory(
  skills: SkillItem[],
  category: 'All' | SkillCategory
): SkillItem[] {
  if (category === 'All') return skills;
  return skills.filter((skill) => skill.category === category);
}
