import { Milestone, TechItem, Project } from '@/types'

export type { Milestone, TechItem, Project } from '@/types'

export const milestones: Milestone[] = [
  {
    year: '2001–2004',
    era: 'Early Spark',
    title: 'Custom HTML/CSS & Web Exploration',
    subtitle: 'AsianAvenue & MySpace layout tinkering — first realization that text creates software',
    icon: 'myspace',
    tech: ['HTML4', 'CSS2', 'Inline Styles', 'Table Layouts'],
    story: 'Fascinated by how typing raw text in a document translated to customized web pages. Spent hours tweaking hex codes and layout tables. Took a break during teenager years to explore gaming and high school life.',
  },
  {
    year: '2009–2010',
    era: 'High School (Grade 11)',
    title: 'Personal Capstone & Robotics Web Lead',
    subtitle: 'Built the school robotics team website and personal project',
    icon: 'robot',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'PHP'],
    story: 'Re-ignited the coding passion during Grade 11. Designed and deployed the official website for the robotics team while completing a custom web portal for the year-end capstone personal project.',
  },
  {
    year: '2010–2014',
    era: 'Dawson College',
    title: 'Diploma in Computer Science (CEGEP)',
    subtitle: 'Algorithms, data structures, Object-Oriented Programming, and systems fundamentals',
    icon: 'dawson',
    tech: ['C++', 'Java', 'Assembly', 'SQL', 'Data Structures'],
    story: 'Rigorous 3-year applied Computer Science program. Mastered core software engineering principles, low-level memory management, object-oriented design, and database systems.',
  },
  {
    year: '2014–2018',
    era: 'Concordia University',
    title: 'Bachelor of Computer Science (B.Comp.Sc)',
    subtitle: 'Software engineering, distributed systems, web architectures, and compilers',
    icon: 'concordia',
    tech: ['Data Structures and Algorithms', 'Java', 'PHP'],
    story: 'Deepened theoretical and practical knowledge in distributed computing, database design, operating systems, and modern web application architecture.',
  },
  {
    year: 'Oct 2018–Present',
    era: 'Professional Career',
    title: 'Full-Stack Software Engineer',
    subtitle: 'PHP/Symfony, Twig, React, TypeScript, PostgreSQL, and NodeJS',
    icon: 'code',
    tech: ['PHP 8.3', 'Symfony 7', 'Twig 3', 'NodeJS', 'TypeScript', 'React 18', 'PostgreSQL', 'Docker'],
    story: 'Engineering robust enterprise backend APIs and rich React/TypeScript interfaces. Proud creator of MapleLineCards.ca — a high-traffic Canadian TCG marketplace.',
  },
]

export const techStack: TechItem[] = [
  // OpenCode — primary AI-assisted coding tool
  { name: 'OpenCode', category: 'tool', brand: 'brand-ts', proficiency: 95, icon: 'sparkles' },

  // Primary Stack
  { name: 'PHP 8.3', category: 'language', brand: 'brand-php', proficiency: 98, icon: 'php' },
  { name: 'Symfony 7', category: 'framework', brand: 'brand-symfony', proficiency: 95, icon: 'symfony' },
  { name: 'Twig 3', category: 'framework', brand: 'brand-php', proficiency: 95, icon: 'twig' },
  { name: 'TypeScript 5', category: 'language', brand: 'brand-ts', proficiency: 95, icon: 'typescript' },
  { name: 'React 18', category: 'framework', brand: 'brand-react', proficiency: 92, icon: 'react' },
  { name: 'NodeJS', category: 'framework', brand: 'brand-node', proficiency: 90, icon: 'node' },
  { name: 'PostgreSQL 16', category: 'database', brand: 'brand-pg', proficiency: 92, icon: 'postgresql' },

  // Secondary & Supporting
  { name: 'JavaScript (ES2024)', category: 'language', brand: 'brand-js', proficiency: 95, icon: 'javascript' },
  { name: 'Laravel 11', category: 'framework', brand: 'brand-php', proficiency: 85, icon: 'laravel' },
  { name: 'Vue.js 3', category: 'framework', brand: 'brand-vue', proficiency: 80, icon: 'vue' },
  { name: 'MySQL 8', category: 'database', brand: 'brand-mysql', proficiency: 88, icon: 'mysql' },
  { name: 'Redis', category: 'database', brand: 'brand-redis', proficiency: 85, icon: 'redis' },
  { name: 'Docker', category: 'tool', brand: 'brand-docker', proficiency: 90, icon: 'docker' },
  { name: 'GitLab CI/CD', category: 'tool', brand: 'brand-gitlab', proficiency: 88, icon: 'gitlab' },
  { name: 'GitHub Actions', category: 'tool', brand: 'brand-github', proficiency: 88, icon: 'github' },
  { name: 'Linux / Nginx', category: 'tool', brand: 'brand-linux', proficiency: 85, icon: 'linux' },
  { name: 'Tailwind CSS', category: 'framework', brand: 'brand-ts', proficiency: 95, icon: 'tailwind' },
]

export const projects: Project[] = [
  {
    id: 'maplelinecards',
    title: 'MapleLineCards',
    tagline: 'Canadian Trading Card Game (TCG) Single Aggregator & Search Interface',
    description: 'A specialized search engine and aggregator built for Canadian TCG collectors. Aggregates live card availability and pricing from stores across Canada across One Piece, Pokémon, Magic: The Gathering, Lorcana, and Yu-Gi-Oh!',
    image: '/images/maplelinecards-1.png',
    images: ['/images/maplelinecards-1.png', '/images/maplelinecards-3.png', '/images/maplelinecards-2.png'],
    url: 'https://maplelinecards.ca',
    repo: undefined,
    featured: true,
    category: 'Featured Passion Project',
    stack: [
      { name: 'PHP 8.3', brand: 'brand-php' },
      { name: 'Symfony 7', brand: 'brand-symfony' },
      { name: 'Twig 3', brand: 'brand-php' },
      { name: 'NodeJS', brand: 'brand-node' },
      { name: 'React', brand: 'brand-react' },
      { name: 'TypeScript', brand: 'brand-ts' },
      { name: 'PostgreSQL 16', brand: 'brand-pg' },
      { name: 'Tailwind CSS', brand: 'brand-ts' },
      { name: 'Docker', brand: 'brand-docker' },
    ],
    architecture: `graph TD
    A[React/TS Aggregator Interface] --> B[Symfony PHP API Backend]
    B --> C[(PostgreSQL 16 Engine)]
    B --> D[NodeJS Background Scrapers & WebSockets]
    B --> E[External Pricing Feeds]`,
    metrics: {
      'Live Products Index': '42,000+ Active Listings',
      'Supported TCGs': 'One Piece, Pokémon, MTG, Lorcana, Yu-Gi-Oh',
      'Canadian Stores': '20+ Integrated Retailers',
      'Response Latency': '< 100ms Query Time',
    },
    challenges: [
      'Engineered normalized catalog deduplication across dozens of store inventory formats',
      'Optimized PostgreSQL index strategies for sub-100ms multi-faceted fuzzy text search across 40,000+ live products',
      'Designed a dense, fast, touch-friendly filter UX inspired by modern search interfaces',
    ],
    highlights: [
      'High-performance Symfony backend paired with server-rendered Twig for SEO-critical pages',
      'NodeJS asynchronous workers for continuous background inventory sync',
      'Custom React filter components with real-time feedback and dynamic category pills',
    ],
    timeline: '2023–Present',
    role: 'Founder & Full-Stack Engineer',
  },
]

export const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/seancanlas', icon: 'github', external: true },
  { label: 'LinkedIn', href: 'https://ca.linkedin.com/in/seancanlas', icon: 'linkedin', external: true },
]

export const navLinks = [
  { label: 'Featured Project', href: '#portfolio' },
  { label: 'Tech Stack', href: '#stack' },
  { label: 'Career Journey', href: '#about' },
  { label: 'Get in Touch', href: '#contact' },
]