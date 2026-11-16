# Astro migration plan — seancanlas.com

Status: proposed
Target: Astro 7 (current stable in Nov 2026) + `@astrojs/react`, static output, GitHub Pages.

## 1. Goal

Move the site from a client-only React SPA to a statically rendered Astro site:

- English and French are real URLs with fully rendered HTML (`/`, `/fr/`).
- JavaScript ships only for the two genuinely interactive sections: Portfolio and Contact.
- Visual design, copy, Tailwind tokens, Formspree, and the GitHub Pages deployment stay the same.

### Non-goals

- No redesign, new sections, CMS, or content collections.
- No SSR adapter or server runtime.
- No React or Tailwind major upgrade beyond what Astro requires.
- No view transitions, animation library replacement, or new test framework.
- No rewrite of Portfolio/Contact from scratch. Keep the working components, refactor their data sources.

## 2. Current state (verified)

- React 18 + TypeScript + Vite 5, single page, hash-based i18n (`#/en/`, `#/fr/`).
- `dist/index.html` contains an empty `#root`; all copy is rendered client-side.
- Shipped JS ~586 KB uncompressed: `index` 178 KB, `vendor-ui` 207 KB, `vendor-animation` 112 KB, `vendor-react` 27 KB, plus 62 KB CSS.
- All content is local: `src/lib/constants.ts` and `src/i18n/translations.ts`.
- Only runtime network calls: Formspree (`xwvgadkg`) and Google Fonts.
- Dead or unused: `three`, `@react-three/fiber`, `@react-three/drei`, `@types/three`, `gsap`, `vite-plugin-svgr`, `src/hooks/useThree.ts`, `src/types/three.d.ts`, `ui/card`, `ui/scroll-area`, `ui/separator`, `lib/three/`.
- Profile image is 1366×2049 / 93 KB, displayed at 160×160 and preloaded as the LCP candidate.
- GitHub Pages deploy via Actions. `CNAME` currently lives at the repo root, not in `dist`. Node 24 in CI. Local Node 26.12.1 / npm 11.20.

## 3. Target architecture

### Routes

| URL | File | Locale |
| --- | --- | --- |
| `/` | `src/pages/index.astro` | en |
| `/fr/` | `src/pages/fr/index.astro` | fr |
| `/404.html` | `src/pages/404.astro` | en, links to both |

`output` is static. No adapter. `trailingSlash: 'always'` so `/fr/` is canonical.

### Hydration map

| Component | Rendering | Directive | Why |
| --- | --- | --- | --- |
| Navigation, Hero, About, Stack, Footer | `.astro` | none | Static copy and links |
| Portfolio | React island | `client:idle` | Project switcher, carousel, dialog |
| Contact | React island | `client:visible` | Form state, validation, Formspree |

No `client:only`. React islands are still server-rendered, so their HTML exists before hydration and they do not shift layout.

### Data flow

- `translations.ts` stays the single source of truth.
- A plain `t(locale, key)` helper replaces `LanguageProvider` and `useLocale`.
- `.astro` sections call `t(locale, key)` in frontmatter at build time.
- React islands receive `locale` as a prop and call the same helper.
- No React context, no hash parsing, no `localStorage` locale.

## 4. Key decisions

| Decision | Rationale |
| --- | --- |
| Manual routes for two locales | Two pages do not justify an i18n integration or content collections. |
| Vanilla theme + nav scripts | Removes the always-loaded React header and `framer-motion`. The interactions are class toggles and one `IntersectionObserver`. |
| Plain anchors + `scroll-mt-20` | Native smooth scrolling already exists in CSS. Deletes `ScrollLink` and its runtime header measurement. |
| Keep Radix Dialog | It already handles focus trap, Escape, and ARIA correctly. Do not rewrite. |
| Drop Radix Toast | Contact already renders an inline success banner. Add an inline error banner and delete the toast stack. |
| Native `<label>` | The Radix Label wrapper adds a dependency for a plain element. |
| CSS reveals instead of Framer Motion | Content is visible by default; scroll-driven animation is progressive enhancement. |
| `lucide-static` + `Icon.astro` for static sections | `lucide-react` components cannot render inside `.astro`. Keep `lucide-react` for islands only. |
| Tailwind v4 stable via `@tailwindcss/vite` | The project currently pins `4.0.0-alpha.25`. Astro 7 uses Vite 8; use the current stable 4.x plugin. |
| Manual `sitemap.xml` | Two URLs. No need for `@astrojs/sitemap`. |

## 5. Phases

### Phase 0 — Baseline and safety (0.5 day)

- Create branch `feat/astro-migration`.
- Capture before screenshots: EN/FR, light/dark, mobile/desktop. Record Lighthouse mobile scores and bundle sizes.
- Confirm the custom domain and HTTPS are configured in the GitHub Pages repo settings.
- Verify the Formspree form accepts submissions from the current origin.

Exit: a documented "before" baseline and a branch that can be reverted.

### Phase 1 — De-risk dependencies, mergeable alone (0.5 day)

Do this on the current Vite stack before adding Astro, so only one variable changes at a time.

- Upgrade `tailwindcss` and `@tailwindcss/vite` from `4.0.0-alpha.25` to the current stable 4.x.
- Build, run the screenshot comparison, and fix any visual regressions.
- Delete clearly dead code: `three`, all `@react-three/*`, `@types/three`, `gsap`, `vite-plugin-svgr`, `src/hooks/useThree.ts`, `src/types/three.d.ts`, `src/lib/three/`, unused `ui/card`, `ui/scroll-area`, `ui/separator`.
- Do not remove `framer-motion` yet; it is still used.

Exit: current site still builds and looks identical, with a smaller dependency tree. This can merge independently.

### Phase 2 — Astro scaffold and deploy checkpoint (0.5 day)

- Add `astro`, `@astrojs/react`, `@astrojs/check`, `lucide-static`.
- Add `astro.config.mjs`:

```js
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  site: 'https://seancanlas.com',
  trailingSlash: 'always',
  integrations: [react()],
  vite: { plugins: [tailwindcss()] },
})
```

- Replace `tsconfig.json` with an Astro config that extends `astro/tsconfigs/strict` and keeps the `@/*` aliases.
- Change scripts: `dev: astro dev`, `build: astro build`, `preview: astro preview`, `check: astro check`, `typecheck: astro check`.
- Move `CNAME` into `public/`.
- Move the `index.html` head (meta, JSON-LD, fonts, verification tags) into a temporary `BaseLayout.astro`.
- Temporary checkpoint only: render the existing `<App client:load />` from `src/pages/index.astro`. This proves Astro + Tailwind + React + GitHub Pages before any component rewrite.
- Update the workflow to run `npm run check`, `npm run lint`, `npm run build`, then upload `./dist`.

Exit: the deployed site is visually identical at `/`, the Pages workflow is green, and the custom domain works. This is the rollback point.

### Phase 3 — Layout, routes, and i18n (0.5–1 day)

- Add `src/i18n/index.ts`:

```ts
import { translations, type Locale } from './translations'

export const paths: Record<Locale, string> = { en: '/', fr: '/fr/' }

export function t(locale: Locale, key: string): string {
  // Same nested-key resolution and English fallback as today.
}
```

- Add `src/layouts/BaseLayout.astro`:
  - `lang={locale === 'fr' ? 'fr-CA' : 'en'}`
  - per-page title, description, canonical, OG/Twitter, `hreflang` to `/` and `/fr/`
  - existing JSON-LD `Person`, verification tags, font preconnect/load
  - inline theme init before first paint
  - inline legacy hash redirect
  - skip link
- Add `src/layouts/HomePage.astro` with Navigation, `<main id="main-content">`, Footer, and a `locale` prop.
- Add thin pages:

```astro
---
import HomePage from '@/layouts/HomePage.astro'
---
<HomePage locale="en" />
```

and `src/pages/fr/index.astro` with `locale="fr"`.
- Add `src/pages/404.astro` (and delete `public/404.html`).
- Add `src/components/layout/Section.astro` and `Container.astro`.
- Update `public/sitemap.xml` to `/` and `/fr/`.
- Add `seo.title` / `seo.description` keys to `translations.ts` for both locales.

Legacy hash redirect (inline, in `<head>`):

```html
<script is:inline>
  (() => {
    const m = location.hash.match(/^#\/(en|fr)(?:\/(.*))?$/)
    if (!m) return
    location.replace((m[1] === 'fr' ? '/fr/' : '/') + (m[2] ? '#' + m[2] : ''))
  })()
</script>
```

Theme init (inline, before the stylesheet):

```html
<script is:inline>
  (() => {
    try {
      const stored = localStorage.getItem('theme')
      const dark = stored ? stored === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches
      document.documentElement.classList.toggle('light', !dark)
      document.documentElement.classList.toggle('dark', dark)
      document.documentElement.style.colorScheme = dark ? 'dark' : 'light'
    } catch {}
  })()
</script>
```

Exit: `/` and `/fr/` return complete HTML with correct `lang`, canonical, and social metadata. Old `#/en/` and `#/fr/` links redirect.

### Phase 4 — Convert static sections (1–1.5 days)

Convert in this order, deleting each React file as its Astro replacement lands:

1. `Footer.astro`
2. `Hero.astro`
3. `About.astro`
4. `Stack.astro`
5. `Navigation.astro` + `src/scripts/nav.ts`
6. `LanguageSwitcher.astro`, `ThemeToggle.astro`
7. `Badge.astro`, `Button.astro`, `Icon.astro`
8. `Section.astro`, `Container.astro`

Implementation notes:

- Move pure variant maps out of `badge.tsx` / `button.tsx` into `badge-variants.ts` / `button-variants.ts`. Both the React and Astro versions import the same maps.
- `Icon.astro` imports raw SVGs from `lucide-static` and applies a scoped size class. Do not import `lucide-react` into `.astro`.
- Replace `ScrollLink` with `<a href="#section">` and add `scroll-mt-20` to each section. `html { scroll-behavior: smooth }` already exists and reduced motion is handled.
- Navigation behavior in `nav.ts`: toggle the mobile menu, set `aria-expanded`, toggle the scrolled header class, and use one `IntersectionObserver` for the active section. No smooth-scroll math.
- Replace Framer Motion reveals with a CSS `.reveal` utility using `animation-timeline: view()` inside `@supports` and `prefers-reduced-motion: no-preference`. Content is visible without support.
- Theme toggle: one `data-theme-toggle` handler that updates the class, `localStorage`, `colorScheme`, and dispatches a `themechange` custom event.
- Language switcher: plain links to `/` and `/fr/`. If preserving the current `#section`, add a small script that appends `location.hash` to the alternate link.

Exit: no React in Navigation, Hero, About, Stack, Footer, or Section. No visual regression at either locale or theme.

### Phase 5 — Convert the two islands (1 day)

**Portfolio**

- Accept `locale: Locale` as a prop; replace `useLocale()` with `t(locale, key)`.
- Keep the project switcher, screenshot carousel, theme-based image sets, metrics, stack badges, and Radix Dialog.
- Replace `AnimatePresence` / `motion.img` with a keyed `<img>` and the existing CSS fade. No behavior change.
- Replace `useTheme()` with a small island-safe hook: read `document.documentElement.classList` after mount and subscribe to `themechange`.
- Keep `Button`, `Badge`, and `Dialog` unchanged apart from imports.

**Contact**

- Accept `locale` as a prop; replace `useLocale()`.
- Keep React Hook Form + Zod + honeypot + Formspree.
- Remove `toast`; render success and error in an `aria-live` region. The success banner already exists; add the error banner.
- Replace the Framer success animation with the CSS `animate-in` utility.
- Use a native `<label>` and delete `ui/label.tsx`.

**Deletions after both islands work**

- `src/App.tsx`, `src/main.tsx`, `src/i18n/LanguageContext.tsx`, `src/components/layout/LanguageSwitcher.tsx`
- `src/components/ui/scroll-link.tsx`, `toast.tsx`, `toaster.tsx`, `src/hooks/use-toast.ts`
- `framer-motion`, `@radix-ui/react-toast`, `@radix-ui/react-label`
- unused `useMedia.ts` if nothing imports it

Mount them as:

```astro
<Portfolio client:idle locale={locale} />
<Contact client:visible locale={locale} />
```

Exit: only two React islands hydrate. No hydration warnings, no console errors, dialog and form work.

### Phase 6 — Assets, SEO, and performance (0.5 day)

- Move `public/images/profile.jpg` to `src/assets/profile.jpg`.
- Render it with `astro:assets`:

```astro
<Image
  src={profile}
  width={160}
  height={160}
  format="webp"
  loading="eager"
  fetchpriority="high"
  alt="Sean Canlas"
  class="w-full h-full object-cover object-top"
/>
```

- Add a preload only if Lighthouse still flags the LCP image; use `getImage` for the generated URL.
- Keep project screenshots in `public/` for this migration; add explicit `width`/`height` and `loading="lazy"` where missing. Moving them to `astro:assets` is a follow-up.
- Delete unused assets: `gastimate-*`, duplicate `maplelinecards-*.png`, `maplelinecards-logo.*` if unused, root `images/`, `app.css`, `style.css`, `style.scss`, `style.css.map`.
- Review `public/` output size. The current `dist` is 18 MB, mostly screenshots.
- Record Lighthouse before/after for `/` and `/fr/` mobile:
  - Performance ≥ 95
  - Accessibility ≥ 95
  - SEO 100
  - LCP < 2.0 s
  - CLS < 0.02
- Record the shipped JS total. Target: at least a 50% reduction from ~586 KB uncompressed.

### Phase 7 — Cleanup, CI, and final QA (0.5 day)

- Delete `vite.config.ts`, `vite.config.js`, `vite.config.d.ts`, `tsconfig.node.json`, `tsconfig.node.tsbuildinfo`, `tsconfig.tsbuildinfo`.
- Update `.gitignore` for `.astro/` and Astro caches.
- Remove remaining unused dependencies and update `package-lock.json`.
- Update `README.md`: Astro stack, scripts, structure, deploy.
- Update ESLint ignores for `dist`, `node_modules`, `.astro`, and config files. Keep lint on `.ts`/`.tsx`; `astro check` covers `.astro`.
- Run the full QA checklist below.
- Merge, deploy, verify the custom domain over HTTPS, then tag the release.

Total: roughly 3–5 focused days, with Phase 1 and Phase 2 mergeable checkpoints.

## 6. Final file tree

```text
astro.config.mjs
tsconfig.json
package.json
public/
  CNAME
  .nojekyll
  favicon.svg
  favicon.png
  og-image.png
  og-image.svg
  robots.txt
  sitemap.xml
  images/                 # project screenshots
src/
  assets/
    profile.jpg
  components/
    about/About.astro
    contact/Contact.tsx           # island
    hero/Hero.astro
    layout/
      Footer.astro
      LanguageSwitcher.astro
      Navigation.astro
      Section.astro
      ThemeToggle.astro
    portfolio/Portfolio.tsx       # island
    stack/Stack.astro
    ui/
      Badge.astro
      badge-variants.ts
      Button.astro
      button-variants.ts
      Button.tsx
      Badge.tsx
      Dialog.tsx
      Input.tsx
      Textarea.tsx
      Icon.astro
  i18n/
    index.ts
    translations.ts
  layouts/
    BaseLayout.astro
    HomePage.astro
  lib/
    constants.ts
    theme.ts
    utils.ts
  pages/
    index.astro
    fr/index.astro
    404.astro
  scripts/
    nav.ts
  styles/
    globals.css
  types/
    index.ts
```

## 7. Dependency changes

### Add

- `astro`
- `@astrojs/react`
- `@astrojs/check`
- `lucide-static` (static-section icons)

### Keep

- `react`, `react-dom`, `@types/react`, `@types/react-dom`
- `@radix-ui/react-dialog`, `@radix-ui/react-slot`
- `class-variance-authority`, `clsx`, `tailwind-merge`
- `lucide-react` (islands only)
- `react-hook-form`, `@hookform/resolvers`, `zod`
- `tailwindcss`, `@tailwindcss/vite` (stable 4.x)
- `typescript`, `eslint`, `prettier`, `@types/node`

### Remove

- `vite`, `@vitejs/plugin-react`, `vite-plugin-svgr`
- `autoprefixer`, `postcss`
- `framer-motion`, `gsap`
- `three`, `@react-three/fiber`, `@react-three/drei`, `@types/three`
- `@radix-ui/react-toast`, `@radix-ui/react-label`, `@radix-ui/react-scroll-area`, `@radix-ui/react-separator`

## 8. Risks and mitigations

| Risk | Mitigation |
| --- | --- |
| Tailwind alpha → stable changes styles | Do it alone in Phase 1 with screenshot diff. |
| Astro 7 needs Node ≥ 22.22 | CI uses Node 24; local is 26.12. Keep Node 24 in the workflow. |
| `astro/tsconfigs/strict` surfaces existing type errors | Timebox fixes. Relax `noUnusedLocals` only if necessary; do not weaken `strict`. |
| GitHub Pages custom domain breaks | Move `CNAME` into `public/`, verify repo settings, test after deploy. |
| Old hash URLs shared/indexed | Inline head redirect to real routes; update sitemap and hreflang. |
| Theme flash on load | Inline class-setting script before CSS; default dark via `html:not(.light)`. |
| Portfolio light/dark image mismatch after hydration | Portfolio is below the fold and hydrates on idle; sync from `themechange` after mount. |
| Formspree CORS/origin change | Same origin and endpoint; test success and error before merge. |
| `lucide-static` dependency is unwanted | Replace with a small inline SVG map in `Icon.astro`; no other changes. |
| React 18 + Astro 7 compatibility | Supported. Do not upgrade React during this migration. |

## 9. QA checklist

- [ ] `npm run check` passes.
- [ ] `npm run lint` passes.
- [ ] `npm run build` succeeds.
- [ ] `dist/index.html` contains hero copy in the HTML source (JavaScript disabled).
- [ ] `dist/fr/index.html` contains French copy and `lang="fr-CA"`.
- [ ] No `#/en/` or `#/fr/` links in generated HTML.
- [ ] Visiting `/#/fr/` redirects to `/fr/`; `/#/en/contact` redirects to `/#contact`.
- [ ] Canonical, `hreflang`, OG, and Twitter tags are correct on both pages.
- [ ] Theme toggle works on both pages, persists across reload, and does not flash.
- [ ] Mobile menu opens/closes; `aria-expanded` updates; Escape closes it.
- [ ] Nav active section updates while scrolling.
- [ ] Anchor links land below the fixed header.
- [ ] Language switch keeps the current section (if implemented).
- [ ] Portfolio: project switch, previous/next, thumbnails, modal open/close, Escape, focus return, light/dark screenshots.
- [ ] Contact: invalid and valid submissions, honeypot, Formspree success/error, `aria-live` status.
- [ ] `/404.html` renders and links home.
- [ ] No console errors or hydration warnings.
- [ ] Lighthouse mobile targets met on `/` and `/fr/`.
- [ ] GitHub Pages deploy succeeds and the custom domain loads over HTTPS.

## 10. Definition of done

- Both locales are fully rendered static HTML at `/` and `/fr/`.
- Only Portfolio and Contact hydrate; no other React is shipped.
- Hash-based locale routing is gone, with legacy redirects in place.
- All copy, design, theme behavior, and form behavior are preserved.
- CI is green and the production deployment is verified.
- Before/after bundle and Lighthouse numbers are recorded in the PR.

## 11. Explicitly out of scope

- `@astrojs/tailwind` (deprecated; use the Vite plugin).
- SSR adapter, server islands, or API routes.
- Content collections for two projects.
- An i18n integration or automated translation pipeline.
- View transitions, GSAP, or a new animation system.
- Rewriting the Radix dialog or the React Hook Form/Zod setup.
- React 19 or Tailwind 5 upgrades.
