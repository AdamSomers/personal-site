# Personal Site

## Project Context
- Project content and biographical context lives in `site-context/`
- Read files there before making content decisions

## Stack
- **Astro 5** with React islands, MDX content collections, Tailwind v4
- **Framer Motion** for UI animations in React components
- **Content collections** in `src/content/projects/` — MDX files with Zod-validated frontmatter
- Deploy target: Vercel (static)

## Dev Server
- Frontend port: 5177 (per global registry)
- Run: `npm run dev` (binds to `0.0.0.0:5177`)
- Build: `npm run build`

## Conventions
- Astro components for static content, React `.tsx` for interactive islands
- Use `client:idle` directive for React islands
- Colors defined as CSS custom properties in `src/styles/global.css`
- Dark mode: `.dark` class on `<html>`, use `dark:` Tailwind variants
- Typography: Source Serif 4 (headings), Inter (body), JetBrains Mono (code)

## Content Collections
- Schema: `src/content/config.ts`
- Projects: `src/content/projects/*.mdx`
  - Frontmatter: title, hook, status, lastUpdated, techStack, github, demo, order
  - Agent-updatable: edit MDX file → commit → Vercel auto-deploys

## Key Directories
- `src/layouts/` — BaseLayout.astro, ProjectLayout.astro
- `src/components/` — Astro + React components
- `src/pages/` — File-based routing
- `public/images/` — Static images (illustrations)
- `public/audio/` — Music tracks (future)
- `site-context/` — Biographical source-of-truth (not shipped to client)
