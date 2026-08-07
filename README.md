# Ahmed Elbakly — Portfolio

Portfolio and case-study site for a senior full-stack engineer. Bilingual
(English / Arabic) with full RTL support, light and dark themes, and a case
study page per flagship project.

**Live:** https://ahmedelbakly.github.io/portfolio2/

---

## Stack

| Concern    | Choice                                                        |
| ---------- | ------------------------------------------------------------- |
| Build      | Vite 6                                                        |
| Language   | TypeScript (strict)                                           |
| UI         | React 19, React Router 7                                      |
| Styling    | Tailwind CSS v4 — theme tokens via `@theme inline`            |
| Motion     | Framer Motion                                                  |
| Fonts      | Inter, JetBrains Mono, Cairo — self-hosted via Fontsource      |
| Mail       | EmailJS                                                        |
| Deploy     | GitHub Pages                                                   |

## Getting started

```bash
npm install
cp .env.example .env   # fill in the EmailJS ids
npm run dev
```

| Script              | Does                                                  |
| ------------------- | ----------------------------------------------------- |
| `npm run dev`       | Dev server on http://localhost:5173/portfolio2/        |
| `npm run build`     | Typecheck, bundle to `dist/`, write the SPA fallback  |
| `npm run preview`   | Serve the production bundle locally                   |
| `npm run typecheck` | Types only                                            |
| `npm run lint`      | ESLint                                                |
| `npm run deploy`    | Build and publish `dist/` to the `gh-pages` branch    |

## Architecture

```
src/
├── content/     Typed, bilingual content — the CV as data
├── i18n/        Locale engine; ar.ts is typed against en.ts
├── theme/       Light/dark provider, resolved pre-paint
├── components/
│   ├── ui/        Primitives (Button, Tag, Metric, Reveal, …)
│   ├── layout/    Nav, Footer, ScrollManager
│   └── sections/  Home page sections
├── pages/       Home, CaseStudy, NotFound
└── styles/      tokens.css (palettes) + app.css (Tailwind theme + base)
```

### Content is data, not markup

Everything a recruiter reads lives in `src/content/` as typed objects. A
project is a `Project`; a bilingual string is a `Localized<T>`. Adding a case
study means adding an object to `projects.ts` — no new components, and the
route, the footer list and the prev/next navigation pick it up automatically.

### Localisation

`ar.ts` is declared as `Dictionary`, the type derived from `en.ts`. A key that
is renamed, removed or misspelled in one locale fails `npm run build` rather
than rendering `undefined` in production.

Direction is a document attribute, not a per-component branch. Layout uses CSS
logical properties throughout (`ps-*`, `border-s`, `-end-*`), so the Arabic
locale mirrors without direction-specific overrides. Identifiers — technology
names, figures, email addresses — are pinned `dir="ltr"` so they never reorder.

### Theming

Palettes are plain CSS variables in `tokens.css`, keyed off `data-theme` on the
root element. `app.css` maps them into Tailwind's colour namespace with
`@theme inline`, so `bg-canvas` and `text-fg` resolve to the live variable and
the whole page re-colours on toggle without a rebuild. An inline script in
`index.html` resolves the stored theme before first paint, so there is no flash.

### Deep links on GitHub Pages

GitHub Pages has no SPA rewrite. `scripts/spa-fallback.mjs` copies the built
`index.html` to `404.html` at the end of every build, so a direct hit on
`/portfolio2/work/coonex` boots the app on the correct route.

## Licence

Content and design © Ahmed Elbakly. Code is available for reference.
