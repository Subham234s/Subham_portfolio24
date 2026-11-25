import test from 'node:test';
import assert from 'node:assert/strict';
import {
  filterProjects,
  getProjectBySlug,
  getRelatedProjects,
  filterSkillsByCategory,
  type ProjectItem,
  type SkillItem,
} from './portfolioLogic';

const sampleProjects: ProjectItem[] = [
  {
    id: '1',
    title: 'TaskFlow Workspace',
    slug: 'task-manager',
    description: 'Full-stack task board with Node.js REST API and SQL persistence.',
    longDescription: 'Long description',
    category: 'Full-Stack',
    technologies: ['React', 'Node.js', 'SQL'],
    image: '/img1.jpg',
    imageAlt: 'TaskFlow UI',
    problemStatement: 'Problem',
    objectives: ['Obj'],
    features: ['Feat'],
    developmentProcess: ['Step 1'],
    architecture: 'Arch',
    challenges: ['Chal'],
    solutions: ['Sol'],
    learnings: ['Learn'],
    featured: true,
    completionStatus: 'Prototype',
  },
  {
    id: '2',
    title: 'Atmos Weather Dashboard',
    slug: 'weather-dashboard',
    description: 'Clean responsive weather telemetry interface built with React.',
    longDescription: 'Long description',
    category: 'Frontend',
    technologies: ['React', 'HTML', 'CSS', 'JavaScript'],
    image: '/img2.jpg',
    imageAlt: 'Weather UI',
    problemStatement: 'Problem',
    objectives: ['Obj'],
    features: ['Feat'],
    developmentProcess: ['Step 1'],
    architecture: 'Arch',
    challenges: ['Chal'],
    solutions: ['Sol'],
    learnings: ['Learn'],
    featured: true,
    completionStatus: 'Completed Concept',
  },
  {
    id: '3',
    title: 'SchemaSculpt SQL Playground',
    slug: 'sql-playground',
    description: 'Relational schema visualizer and query learning tool.',
    longDescription: 'Long description',
    category: 'Backend',
    technologies: ['Node.js', 'DBMS', 'SQL'],
    image: '/img3.jpg',
    imageAlt: 'SQL UI',
    problemStatement: 'Problem',
    objectives: ['Obj'],
    features: ['Feat'],
    developmentProcess: ['Step 1'],
    architecture: 'Arch',
    challenges: ['Chal'],
    solutions: ['Sol'],
    learnings: ['Learn'],
    featured: false,
    completionStatus: 'In Development',
  },
];

const sampleSkills: SkillItem[] = [
  {
    id: 'react',
    name: 'React.js',
    category: 'Frontend Development',
    description: 'Component architecture and hooks.',
    learningStatus: 'Currently Using',
    focusArea: 'UI Systems',
  },
  {
    id: 'sql',
    name: 'SQL',
    category: 'Database',
    description: 'Relational queries and joins.',
    learningStatus: 'Currently Learning',
    focusArea: 'Query Design',
  },
];

test('filterProjects filters by category and search query', () => {
  assert.equal(filterProjects(sampleProjects, 'All').length, 3);
  assert.equal(filterProjects(sampleProjects, 'Frontend').length, 1);
  assert.equal(filterProjects(sampleProjects, 'AI Experiments').length, 0);
  assert.equal(filterProjects(sampleProjects, 'All', 'SQL').length, 2);
  assert.equal(filterProjects(sampleProjects, 'Backend', 'SQL').length, 1);
});

test('getProjectBySlug resolves valid slugs and returns undefined for invalid slugs', () => {
  assert.equal(getProjectBySlug(sampleProjects, 'task-manager')?.id, '1');
  assert.equal(getProjectBySlug(sampleProjects, 'nonexistent'), undefined);
  assert.equal(getProjectBySlug(sampleProjects, undefined), undefined);
});

test('getRelatedProjects excludes current project and respects limit', () => {
  const related = getRelatedProjects(sampleProjects, sampleProjects[0], 2);
  assert.equal(related.length, 2);
  assert.ok(related.every((p) => p.id !== '1'));
});

test('filterSkillsByCategory filters skills cleanly', () => {
  assert.equal(filterSkillsByCategory(sampleSkills, 'All').length, 2);
  assert.equal(filterSkillsByCategory(sampleSkills, 'Database').length, 1);
});
