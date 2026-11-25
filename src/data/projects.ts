import type { ProjectItem } from '../utils/portfolioLogic';

export const projectsData: ProjectItem[] = [
  {
    id: 'proj-taskflow',
    title: 'TaskFlow Workspace',
    slug: 'task-manager',
    description:
      'A full-stack student task and project tracker featuring column-based workflows, REST API persistence, and clean keyboard accessibility.',
    longDescription:
      'TaskFlow Workspace is a structured full-stack task management concept built to practice connecting a modular React frontend with a Node.js API and relational SQL data model. It focuses on clarity, fast state updates, and predictable CRUD workflows without visual clutter.',
    category: 'Full-Stack',
    technologies: ['React', 'Node.js', 'SQL', 'Tailwind CSS'],
    image: '/src/assets/images/project_task_manager_1795595758001.jpg',
    imageAlt: 'TaskFlow Workspace task board interface showing organized project columns',
    githubUrl: 'https://github.com',
    problemStatement:
      'Students balancing coursework and personal coding projects often rely on scattered notes, making it difficult to track tasks by priority and completion stage.',
    objectives: [
      'Design a clear column-based task board with low cognitive overhead.',
      'Build RESTful endpoints in Node.js for creating, updating, and filtering tasks.',
      'Practice structuring relational tables for users, projects, and task items.',
    ],
    features: [
      'Column workflow across Backlog, To Do, In Progress, and Done stages',
      'Instant filtering by priority and project category',
      'Input validation on both client forms and backend routes',
      'Responsive single-column stacking for mobile viewports',
    ],
    developmentProcess: [
      'Mapped entity relationships between projects and tasks using DBMS normalization principles.',
      'Implemented Express API routes with structured JSON responses and error codes.',
      'Built reusable React board and card components with clean light and dark themes.',
    ],
    architecture:
      'React SPA communicating via JSON REST endpoints to a Node.js/Express service layer backed by relational SQL tables.',
    challenges: [
      'Keeping UI column state synchronized cleanly after task status updates.',
      'Designing validation rules that catch malformed payloads before database writes.',
    ],
    solutions: [
      'Centralized state transitions in pure reducer helper functions with optimistic UI feedback and rollback on error.',
      'Added shared validation schemas so both frontend inputs and server routes enforce identical rules.',
    ],
    learnings: [
      'Separation of concerns between UI components and data-fetching hooks reduces bugs.',
      'Consistent API response shapes simplify loading and error states.',
    ],
    featured: true,
    completionStatus: 'Prototype',
  },
  {
    id: 'proj-atmos',
    title: 'Atmos Telemetry Dashboard',
    slug: 'weather-dashboard',
    description:
      'A responsive weather and atmospheric analytics interface demonstrating external API integration, unit toggling, and clean data visualization.',
    longDescription:
      'Atmos Telemetry Dashboard explores how to turn raw meteorological API responses into an intuitive, scannable web interface. Built with React and modern CSS layout techniques, it emphasizes readable typography, tabular numerals, and graceful handling of network errors.',
    category: 'Frontend',
    technologies: ['React', 'JavaScript', 'CSS', 'REST APIs'],
    image: '/src/assets/images/project_weather_api_1795595757225.jpg',
    imageAlt: 'Atmos Telemetry Dashboard showing hourly weather trends and atmospheric metrics',
    githubUrl: 'https://github.com',
    problemStatement:
      'Many beginner weather apps clutter the screen with redundant widgets and fail silently when location lookups or API calls time out.',
    objectives: [
      'Present current conditions and 24-hour trends with clear typographic hierarchy.',
      'Handle loading, invalid city queries, and offline errors gracefully.',
      'Ensure tabular alignment for temperatures, wind speeds, and timestamps.',
    ],
    features: [
      'City search with debounced query handling and clear empty states',
      'Hourly temperature and precipitation trend visualization',
      'Instant Celsius / Fahrenheit unit conversion across all metrics',
      'Accessible keyboard navigation and high-contrast dark and light themes',
    ],
    developmentProcess: [
      'Prototyped the grid layout using responsive CSS Grid and semantic HTML landmarks.',
      'Built an API adapter layer to normalize external JSON responses into typed view models.',
      'Tested edge cases including slow responses, empty search strings, and unknown locations.',
    ],
    architecture:
      'Client-side React architecture with a dedicated API normalization utility and pure unit-conversion helpers.',
    challenges: [
      'Preventing layout shifts while asynchronous weather data loads.',
      'Keeping numerical columns aligned across changing forecast values.',
    ],
    solutions: [
      'Introduced fixed-aspect-ratio skeleton containers matching final card dimensions.',
      'Applied tabular numerals and monospace formatting to hourly metrics.',
    ],
    learnings: [
      'Normalizing third-party API payloads at the boundary keeps UI components clean.',
      'Explicit loading and error states make frontend apps feel dependable.',
    ],
    featured: true,
    completionStatus: 'Completed Concept',
  },
  {
    id: 'proj-schemasculpt',
    title: 'SchemaSculpt SQL Playground',
    slug: 'sql-playground',
    description:
      'An educational DBMS schema viewer and SQL query practice workspace designed to visualize table relationships and query outputs.',
    longDescription:
      'SchemaSculpt grew directly out of studying DBMS fundamentals and SQL in college. It pairs visual entity-relationship diagrams with a clean SQL query editor and tabular result grid so learners can see how joins and filters map to underlying relational tables.',
    category: 'Backend',
    technologies: ['Node.js', 'DBMS', 'SQL', 'JavaScript'],
    image: '/src/assets/images/project_sql_explorer_1795595759024.jpg',
    imageAlt: 'SchemaSculpt relational database diagram and SQL query result view',
    githubUrl: 'https://github.com',
    problemStatement:
      'Understanding foreign keys, many-to-many join tables, and GROUP BY aggregations is harder when learning solely from static textbook diagrams.',
    objectives: [
      'Visualize primary keys, foreign keys, and table cardinality clearly.',
      'Provide a focused SQL query panel paired with instant tabular output.',
      'Enforce safe read-only query validation on the backend API.',
    ],
    features: [
      'Interactive entity-relationship preview for sample e-commerce schemas',
      'Syntax-highlighted SQL editor with curated practice queries',
      'Tabular results view with column types and row counts',
      'Safe backend query parser restricting execution to read-only SELECT statements',
    ],
    developmentProcess: [
      'Modeled sample relational tables (users, orders, order_items, products) in 3NF.',
      'Implemented backend query sanitization and read-only validation rules.',
      'Designed a split workspace pairing visual schema nodes with query output.',
    ],
    architecture:
      'Node.js backend query validator paired with a modular frontend schema canvas and tabular results renderer.',
    challenges: [
      'Ensuring arbitrary SQL inputs cannot perform destructive mutations.',
      'Keeping complex table relationships readable on smaller laptop screens.',
    ],
    solutions: [
      'Implemented strict statement allowlisting and parameterized query templates.',
      'Built a tabbed layout toggle on compact screens to switch smoothly between schema view and query results.',
    ],
    learnings: [
      'Visualizing foreign-key paths clarifies multi-table JOIN logic dramatically.',
      'Input validation and least-privilege constraints must be designed from day one.',
    ],
    featured: true,
    completionStatus: 'In Development',
  },
  {
    id: 'proj-studysynth',
    title: 'StudySynth AI Notes',
    slug: 'study-synth-ai',
    description:
      'An experimental study workspace exploring how structured markdown notes and AI summarization concepts can help organize technical coursework.',
    longDescription:
      'StudySynth is an early exploration into combining clean markdown note-taking with AI-assisted concept summaries. Designed as a calm two-pane workspace, it investigates how structured prompts can turn rough lecture notes into concise key takeaways and review questions.',
    category: 'AI Experiments',
    technologies: ['React', 'Node.js', 'AI Concepts', 'HTML/CSS'],
    image: '/src/assets/images/project_ai_notes_1795595758215.jpg',
    imageAlt: 'StudySynth structured markdown study notes and summary sidebar interface',
    githubUrl: 'https://github.com',
    problemStatement:
      'Technical lecture notes often grow long and unstructured, making quick revision before exams or coding labs time-consuming.',
    objectives: [
      'Build a distraction-free reading and note-organization layout.',
      'Experiment with prompt design for generating structured key takeaways.',
      'Keep server-side API integration cleanly separated from the client UI.',
    ],
    features: [
      'Two-pane editorial layout separating primary notes from summary takeaways',
      'Topic outline navigation for computer science study modules',
      'Structured takeaway formatting with concise concept definitions',
      'Server-side proxy pattern ready for secure AI model integration',
    ],
    developmentProcess: [
      'Designed an editorial reading typography scale optimized for long-form technical notes.',
      'Prototyped structured prompt templates for summarizing markdown sections.',
      'Drafted a server-side endpoint pattern to keep API credentials off the browser.',
    ],
    architecture:
      'React editorial workspace backed by a planned Node.js API proxy for structured AI summarization requests.',
    challenges: [
      'Avoiding cluttered AI chat sidebars that distract from primary study content.',
      'Ensuring generated summaries stay concise and accurate to source notes.',
    ],
    solutions: [
      'Anchored summaries in a quiet right-hand rail focused strictly on bulleted takeaways.',
      'Structured prompts to extract headings and definitions directly from the note text.',
    ],
    learnings: [
      'Good AI UX depends on restraint—helpful structure beats flashy widgets.',
      'Server-side secret isolation is essential whenever integrating external AI APIs.',
    ],
    featured: false,
    completionStatus: 'In Development',
  },
];
