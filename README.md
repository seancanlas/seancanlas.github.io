# Sean Canlas — Personal Website

Personal site for Sean Canlas, a software engineer in Canada. Static Astro site with two React islands and a small design system.

## Stack

- **Framework**: Astro 7 (static output)
- **UI islands**: React 18, TypeScript
- **Styling**: Tailwind CSS 4 (CSS-first tokens in `src/styles/globals.css`)
- **Components**: Radix Dialog, React Hook Form, Zod, Lucide
- **Deployment**: GitHub Actions → GitHub Pages

## Development

```bash
npm install
npm run dev        # http://localhost:4321
npm run check      # Astro + TypeScript diagnostics
npm run lint
npm run build
npm run preview
```

## Structure

```
src/
├── assets/                 # Source images processed by astro:assets
├── components/
│   ├── contact/            # Contact form island
│   ├── layout/             # Header, footer, theme and language controls
│   ├── portfolio/          # Project showcase island
│   ├── sections/           # Hero and background sections
│   └── ui/                 # Buttons, badges, inputs, dialog, icons
├── i18n/                   # EN/FR copy and translation helpers
├── layouts/                # HTML shell and shared home page layout
├── lib/                    # Project data, theme store, utilities
├── pages/                  # /, /fr/, 404
├── scripts/                # Header, mobile menu, scroll spy
└── styles/                 # Tailwind entry and design tokens
```

## Content

- **Copy**: `src/i18n/translations.ts` (English and French).
- **Projects**: `src/lib/constants.ts` (cards, stack, screenshots, links).
- **Hero image**: `src/assets/profile.jpg` (optimized at build time).

## Routes

- `/` — English
- `/fr/` — French
- `/404.html` — not found page

Both locales share `src/layouts/HomePage.astro`. Language links point at real routes, not hash fragments.

## Deployment

Pushes to `main` run install, `astro check`, lint, and build, then publish `dist/` to GitHub Pages. The custom domain is set by `public/CNAME` (`seancanlas.com`). `public/robots.txt` and `public/sitemap.xml` are served as static files.
