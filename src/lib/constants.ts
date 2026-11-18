import type { Project, SocialLink } from '@/types'

export const projects: Project[] = [
  {
    id: 'maplelinecards',
    title: 'MapleLineCards',
    tagline: 'Canadian TCG single aggregator and search interface',
    description:
      'A search engine for trading card game singles across Canadian stores. It aggregates live inventory and pricing, normalizes listings, and serves a dense filter interface. The API and workers run on Rust with Axum and SQLx; the client is React 19 and TypeScript.',
    image: '/images/maplelinecards-dark-1.webp',
    images: [
      '/images/maplelinecards-dark-1.webp',
      '/images/maplelinecards-dark-3.webp',
      '/images/maplelinecards-dark-2.webp',
      '/images/tradingcardgames-dark-1.webp',
    ],
    imageLight: '/images/maplelinecards-light-1.webp',
    imagesLight: [
      '/images/maplelinecards-light-1.webp',
      '/images/maplelinecards-light-3.webp',
      '/images/maplelinecards-light-2.webp',
      '/images/tradingcardgames-light-1.webp',
    ],
    url: 'https://maplelinecards.ca',
    relatedSite: { name: 'TradingCardGames.ca', url: 'https://tradingcardgames.ca' },
    repo: undefined,
    featured: true,
    status: 'live',
    category: 'Featured project',
    stack: [
      { name: 'Rust', brand: 'brand-rust' },
      { name: 'Axum', brand: 'brand-rust' },
      { name: 'SQLx', brand: 'brand-rust' },
      { name: 'Tokio', brand: 'brand-rust' },
      { name: 'PostgreSQL 15', brand: 'brand-pg' },
      { name: 'Redis 8', brand: 'brand-redis' },
      { name: 'React 19', brand: 'brand-react' },
      { name: 'TypeScript 7', brand: 'brand-ts' },
      { name: 'Vite 8', brand: 'brand-ts' },
      { name: 'Tailwind CSS 4', brand: 'brand-tailwind' },
      { name: 'React Router 7', brand: 'brand-react' },
      { name: 'Motion 14', brand: 'brand-react' },
      { name: 'Vitest', brand: 'brand-vitest' },
      { name: 'Playwright', brand: 'brand-node' },
      { name: 'Docker Compose', brand: 'brand-docker' },
      { name: 'nginx', brand: 'brand-nginx' },
    ],
    architecture: `graph TD
    A[React 19 / TypeScript SPA] --> B[nginx]
    B --> C[Rust API - Axum + SQLx]
    C --> D[(PostgreSQL 15)]
    C --> E[(Redis 8)]
    F[Rust scraper workers] --> D
    G[Canadian retailer inventory] --> F`,
    metrics: {
      'Live Products Index': '42,000+ Active Listings',
      'Supported TCGs': 'One Piece, Riftbound, Pokémon, MTG, Lorcana, Yu-Gi-Oh',
      'Canadian Stores': '20+ Integrated Retailers',
      'Response Latency': '< 100ms Query Time',
    },
    challenges: [
      'Engineered normalized catalog deduplication across dozens of store inventory formats',
      'Optimized PostgreSQL trigram and join indexes for sub-100ms faceted fuzzy search across 40,000+ live products',
      'Designed a dense, fast, touch-friendly filter UX inspired by modern search interfaces',
    ],
    highlights: [
      'Rust API with Axum and SQLx, served behind nginx, with Redis 8 for caching and sessions',
      'Async Rust workers for continuous background inventory sync',
      'React 19 and Vite 8 client with Tailwind CSS 4',
    ],
    timeline: '2023–Present',
    role: 'Founder & Full-Stack Engineer',
    mainColour: {
      bg: 'red-500',
      text: 'white',
      border: 'red-500',
      shadow: 'red-500',
    },
  },
  {
    id: 'craveitmakeit',
    title: 'Crave It Make It',
    tagline: 'Ingredient-based recipe aggregator and search platform',
    description:
      'A recipe discovery platform built around what is already in your kitchen: tell it your ingredients and it surfaces matching recipes aggregated from around the web, with full source attribution back to the original authors.',
    image: '/images/craveitmakeit-dark-1.webp',
    images: [
      '/images/craveitmakeit-dark-1.webp',
      '/images/craveitmakeit-dark-2.webp',
      '/images/craveitmakeit-dark-3.webp',
    ],
    imageLight: '/images/craveitmakeit-light-1.webp',
    imagesLight: [
      '/images/craveitmakeit-light-1.webp',
      '/images/craveitmakeit-light-2.webp',
      '/images/craveitmakeit-light-3.webp',
    ],
    url: 'https://craveitmakeit.com',
    repo: undefined,
    featured: false,
    status: 'live',
    category: 'Active build',
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
      Status: 'Live',
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
    mainColour: {
      bg: 'brand-craveit',
      text: 'white',
      border: 'brand-craveit',
      shadow: 'brand-craveit',
    },
  },
]

export const socialLinks: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/seancanlas', external: true },
  { label: 'LinkedIn', href: 'https://ca.linkedin.com/in/seancanlas', external: true },
]
