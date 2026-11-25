export interface JourneyEntry {
  id: string;
  title: string;
  period: string;
  type: 'Education' | 'Milestone' | 'Current Focus' | 'Future Goal';
  description: string;
  technologies: string[];
}

export const journeyData: JourneyEntry[] = [
  {
    id: 'journey-start',
    title: 'Starting First-Year College & Web Foundations',
    period: 'First Year · Foundation',
    type: 'Education',
    description:
      'Began undergraduate studies and wrote my first structured web pages using semantic HTML and CSS. Focused on understanding how browsers parse markup, layout systems, and responsive design principles.',
    technologies: ['HTML5', 'CSS3', 'Responsive Design'],
  },
  {
    id: 'journey-js-react',
    title: 'Learning JavaScript & Modern React Interfaces',
    period: 'First Year · Frontend',
    type: 'Milestone',
    description:
      'Moved from static layouts to interactive client-side applications with JavaScript and React. Learned component-driven UI design, state hooks, client routing, and accessible form handling.',
    technologies: ['JavaScript', 'React.js', 'Tailwind CSS', 'React Router'],
  },
  {
    id: 'journey-backend-dbms',
    title: 'Exploring Node.js, APIs & DBMS Fundamentals',
    period: 'First Year · Backend & Data',
    type: 'Milestone',
    description:
      'Expanded beyond the browser into Node.js server fundamentals, REST API integration, and relational database concepts. Practiced structuring schemas, SQL queries, and server-side input validation.',
    technologies: ['Node.js', 'Express', 'REST APIs', 'DBMS', 'SQL'],
  },
  {
    id: 'journey-current',
    title: 'Building Full-Stack Projects & Exploring AI',
    period: 'Present · Active Learning',
    type: 'Current Focus',
    description:
      'Currently bringing frontend, backend, and database skills together into cohesive full-stack portfolio projects while exploring artificial intelligence concepts and how modern web apps integrate smart workflows.',
    technologies: ['Full-Stack Architecture', 'SQL Modeling', 'AI Concepts'],
  },
  {
    id: 'journey-future',
    title: 'Next Milestones: Production Engineering & Collaboration',
    period: 'Looking Ahead',
    type: 'Future Goal',
    description:
      'Aiming to contribute to open-source or student team builds, deepen backend testing and performance skills, and build practical full-stack applications that solve real problems.',
    technologies: ['Automated Testing', 'Cloud Deployment', 'Applied AI'],
  },
];
