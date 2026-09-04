import { Milestone, TechItem, Project } from '@/types'

export type { Milestone, TechItem, Project } from '@/types'

export const milestones: Milestone[] = [
  {
    year: '2001–2004',
    era: 'Early Spark',
    title: 'Custom HTML/CSS & Web Exploration',
    subtitle: 'AsianAvenue & MySpace layout tinkering — first realization that text creates software',
    icon: 'myspace',
    tech: ['HTML', 'CSS', 'Inline Styles', 'Table Layouts'],
    story: 'Fascinated by how typing raw text in a document translated to customized web pages. Spent hours tweaking hex codes and layout tables. Took a break during teenager years to explore gaming and high school life.',
  },
  {
    year: '2009–2010',
    era: 'High School (Grade 11)',
    title: 'Personal Capstone & Robotics Web Lead',
    subtitle: 'Built the school robotics team website and personal project',
    icon: 'robot',
    tech: ['HTML', 'CSS', 'JavaScript', 'PHP'],
    story: 'Re-ignited the coding passion during Grade 11. Designed and deployed the official website for the robotics team while completing a custom web portal for the year-end capstone personal project.',
  },
  {
    year: '2010–2014',
    era: 'Dawson College',
    title: 'Diploma in Computer Science (CEGEP)',
    subtitle: 'Algorithms, data structures, Object-Oriented Programming, and systems fundamentals',
    icon: 'dawson',
    tech: ['C++', 'Java', 'Assembly', 'SQL', 'Data Structures'],
    story: 'Diploma in Computer Science (CEGEP) completed 2010–2014. This foundational program provided rigorous training in algorithms, data structures, object-oriented programming, and systems fundamentals, with an additional semester to accommodate a core course requirement.',
  },
  {
    year: '2014–2018',
    era: 'Concordia University',
    title: 'Bachelor of Computer Science (B.Comp.Sc)',
    subtitle: 'Software development, distributed systems, web architectures, and compilers',
    icon: 'concordia',
    tech: ['Data Structures and Algorithms', 'Java', 'PHP'],
    story: 'Deepened theoretical and practical knowledge in distributed computing, database design, operating systems, and modern web application architecture.',
  },
  {
    year: 'Oct 2018–Present',
    era: 'Professional Career',
    title: 'Full-Stack Software Developer',
    subtitle: 'PHP/Symfony, Twig, React, TypeScript, PostgreSQL, Laravel, and Node.js',
    icon: 'code',
    tech: ['PHP', 'Symfony', 'Twig', 'Laravel', 'Node.js', 'TypeScript', 'React', 'PostgreSQL', 'Docker'],
    story: 'Developing robust enterprise backend APIs and rich React/TypeScript interfaces. Proud creator of MapleLineCards.ca — a high-traffic Canadian TCG marketplace.',
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
    image: '/images/maplelinecards-1.webp',
    images: ['/images/maplelinecards-1.webp', '/images/maplelinecards-3.webp', '/images/maplelinecards-2.webp'],
    url: 'https://maplelinecards.ca',
    repo: undefined,
    featured: true,
    status: 'live',
    category: 'Featured Passion Project',
    stack: [
      { name: 'PHP 8.4', brand: 'brand-php' },
      { name: 'Symfony 8', brand: 'brand-symfony' },
      { name: 'Twig 3', brand: 'brand-php' },
      { name: 'Doctrine ORM', brand: 'brand-php' },
      { name: 'Node.js 26', brand: 'brand-node' },
      { name: 'React 19', brand: 'brand-react' },
      { name: 'TypeScript 6', brand: 'brand-ts' },
      { name: 'Vite 8', brand: 'brand-ts' },
      { name: 'Tailwind CSS 4', brand: 'brand-ts' },
      { name: 'PostgreSQL 15', brand: 'brand-pg' },
      { name: 'Redis 7', brand: 'brand-redis' },
      { name: 'Playwright', brand: 'brand-node' },
      { name: 'Docker', brand: 'brand-docker' },
      { name: 'nginx', brand: 'brand-docker' },
    ],
    architecture: `graph TD
    A[React 19 / TypeScript 6 SPA] --> B[Symfony 8 PHP API]
    B --> C[(PostgreSQL 15 Engine)]
    B --> D[Node.js 26 Playwright Scrapers]
    B --> E[Mercure SSE Push Updates]
    B --> F[(Redis 7 Cache)]
    D --> B`,
    metrics: {
      'Live Products Index': '42,000+ Active Listings',
      'Supported TCGs': 'One Piece, Riftbound, Pokémon, MTG, Lorcana, Yu-Gi-Oh',
      'Canadian Stores': '20+ Integrated Retailers',
      'Response Latency': '< 100ms Query Time',
    },
    challenges: [
      'Engineered normalized catalog deduplication across dozens of store inventory formats',
      'Optimized PostgreSQL index strategies for sub-100ms multi-faceted fuzzy text search across 40,000+ live products',
      'Designed a dense, fast, touch-friendly filter UX inspired by modern search interfaces',
    ],
    highlights: [
      'Symfony 8 API with Doctrine ORM, served behind nginx and pushed live via Mercure SSE',
      'Node.js 26 + Playwright asynchronous workers for continuous background inventory sync',
      'React 19 + Vite 8 SPA with Tailwind CSS 4 and dense, touch-friendly filter components',
    ],
    timeline: '2023–Present',
    role: 'Founder & Full-Stack Engineer',
  },
  {
    id: 'craveitmakeit',
    title: 'Crave It Make It',
    tagline: 'Ingredient-Based Recipe Aggregator & Search Platform',
    description: 'A recipe discovery platform built around what is already in your kitchen: tell it your ingredients and it surfaces matching recipes aggregated from around the web, with full source attribution back to the original authors.',
    image: '/images/craveitmakeit-1.png',
    images: ['/images/craveitmakeit-1.png', '/images/craveitmakeit-2.webp', '/images/craveitmakeit-3.webp'],
    url: 'https://craveitmakeit.com',
    repo: undefined,
    featured: false,
    status: 'live',
    category: 'Active Build',
    stack: [
      { name: 'Python 3.12', brand: 'brand-python' },
      { name: 'FastAPI', brand: 'brand-fastapi' },
      { name: 'React 19', brand: 'brand-react' },
      { name: 'TypeScript', brand: 'brand-ts' },
      { name: 'PostgreSQL 16', brand: 'brand-pg' },
      { name: 'Redis', brand: 'brand-redis' },
      { name: 'Docker', brand: 'brand-docker' },
    ],
    architecture: `graph TD
    A[React 19 SPA] --> F[nginx Reverse Proxy]
    F --> B[FastAPI Backend]
    B --> C[(PostgreSQL 16)]
    B --> D[(Redis Cache)]
    E[Python Scraper Service] --> C
    G[Cloudflare Tunnel] --> F`,
    metrics: {
      'Status': 'Live',
      'Core Services': '7 Containerized Services',
      'CI Gates': '6 Automated Pipeline Checks',
      'Recipe Count': 'Over 300K Recipes',
    },
    challenges: [
      'Enforced version parity for the shared ingredient-parser-nlp dependency between backend and scraper via a dedicated CI job',
      'Built a fully offline-testable scraping pipeline — mock transport and HTML fixtures replace live network calls in CI',
      'Automated placeholder-secret verification and health-checked deploys on a self-hosted runner behind a Cloudflare Tunnel',
    ],
    highlights: [
      'FastAPI backend that runs Alembic migrations automatically before Uvicorn accepts traffic',
      'React 19 SPA for ingredient/pantry-based recipe search, with dish, recipe, and franchise browsing',
      'Python scraper service with a fixture-based offline test mode, decoupled from live scraping in CI',
    ],
    timeline: 'Aug 2026–Present',
    role: 'Founder & Full-Stack Engineer',
  },
]

export const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/seancanlas', icon: 'github', external: true },
  { label: 'LinkedIn', href: 'https://ca.linkedin.com/in/seancanlas', icon: 'linkedin', external: true },
]

export const navLinks = [
  { label: 'Career Journey', href: '#about' },
  { label: 'Tech Stack', href: '#stack' },
  { label: 'Featured Projects', href: '#portfolio' },
  { label: 'Get in Touch', href: '#contact' },
]