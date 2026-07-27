# Sean Canlas — Personal Website

> **Full-Stack Software Engineer** — PHP/Symfony, TypeScript/React, PostgreSQL. Builder of [MapleLineCards.ca](https://maplelinecards.ca).

## 🚀 Tech Stack

- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS v4 (CSS-first config)
- **3D/Graphics**: Three.js + @react-three/fiber + @react-three/drei
- **Animation**: Framer Motion + GSAP
- **Forms**: React Hook Form + Zod
- **UI Primitives**: Radix UI + Lucide React
- **Deployment**: GitHub Actions → GitHub Pages
- **Package Manager**: pnpm

## 🎨 Features

- **Interactive Hero**: Three.js particle field with mouse parallax
- **Timeline Journey**: MySpace (2006) → Robotics (2011) → Dawson (2013) → Concordia (2016) → Professional (2020+)
- **3D Tech Stack Constellation**: 30+ orbiting skill orbs, filterable by category
- **Portfolio**: MapleLineCards featured + 2 other projects with detailed case study modals
- **Contact Form**: Formspree-ready with honeypot spam protection
- **Accessibility**: WCAG AA compliant, reduced motion support, semantic HTML
- **Performance**: Code splitting, lazy loading, optimized Three.js instancing

## 📦 Quick Start

```bash
# Install pnpm if needed
corepack enable pnpm

# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Type check
pnpm typecheck

# Lint
pnpm lint

# Production build
pnpm build

# Preview production build
pnpm preview
```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── ui/           # Primitive components (Button, Card, Dialog, etc.)
│   ├── layout/       # Layout primitives (Section, Container, Grid)
│   ├── hero/         # Hero section with Three.js background
│   ├── about/        # Timeline journey component
│   ├── stack/        # 3D tech stack visualization
│   ├── portfolio/    # Project cards & modals
│   └── contact/      # Contact form
├── hooks/            # Custom React hooks
├── lib/
│   ├── constants.ts  # All content data (milestones, tech, projects)
│   ├── utils.ts      # Utility functions (cn, etc.)
│   └── three/        # Three.js shaders & utilities
├── styles/
│   └── globals.css   # Tailwind v4 + design tokens
├── types/            # TypeScript types
├── App.tsx           # Main app component
└── main.tsx          # Entry point
```

## 🎯 Design System

**Colors** (OKLCH): Midnight dark theme with brand accents
- `--color-brand-ts`: TypeScript blue
- `--color-brand-react`: React cyan  
- `--color-brand-php`: PHP violet
- `--color-brand-symfony`: Symfony red
- `--color-brand-pg`: PostgreSQL blue
- `--color-brand-maple`: Maple orange

**Typography**: Geist Variable (sans) + Geist Mono Variable (mono)

**Spacing**: Fluid clamp-based scale

## 🚀 Deployment

Automatic deployment to GitHub Pages on push to `main`:

1. Push to `main` branch
2. GitHub Actions runs: install → typecheck → lint → build
3. Artifact uploaded to GitHub Pages
4. Live at `https://seancanlas.com`

Custom domain configured via `CNAME` file.

## 📝 Content Management

All content lives in `src/lib/constants.ts`:
- `milestones` — Career timeline
- `techStack` — Skills with proficiency & categories
- `projects` — Portfolio projects (MapleLineCards featured)
- `socialLinks` — GitHub, LinkedIn, Twitter, Email

## ♿ Accessibility

- Semantic HTML5 structure
- Proper heading hierarchy
- Focus-visible states
- ARIA labels on icon-only buttons
- `prefers-reduced-motion` respected
- Color contrast WCAG AA minimum
- Keyboard navigation support

## 📄 License

MIT License — feel free to use as inspiration for your own portfolio!

---

Built with ☕ and lots of `console.log()` by [Sean Canlas](https://seancanlas.com)