# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Start Astro dev server |
| `npm run build` | Static build → `dist/` |
| `npm run preview` | Preview the built `dist/` locally |

## Architecture

This is an **Astro static site** — a personal homepage + blog deployed to GitHub Pages at `https://omgca.github.io`.

### Dual-mode persona system

The site has two "modes" controlled by a `data-mode` attribute on `<html>`: `"online"` (casual/gaming persona) and `"offline"` (professional persona). A capsule toggle in the header (`ModeToggle.tsx`, a React island with `client:load`) switches between them and persists the choice to `localStorage`.

**Everything** is driven by this CSS attribute:

- **Theming**: `src/styles/global.css` defines all colours as CSS custom properties on `:root[data-mode="online"]` (dark theme, vermillion accent) and `:root[data-mode="offline"]` (warm paper, navy accent). There is no Tailwind theme config — all tokens are CSS variables.
- **Section visibility**: The inactive mode's content sections get `display: none !important` + `content-visibility: hidden` via CSS, completely skipping layout/paint. Both sections are always rendered in the DOM for fast switching.

### Technology stack

- **Astro** (`^7.0.0`) — static site generation, `.astro` components by default
- **React** (`^19.2.7`) — used sparingly as interactive islands (`ModeToggle.tsx`, `SteamStats.tsx`); everything else is server-rendered `.astro`
- **Tailwind CSS v4** (`^4.3.1`) — via `@tailwindcss/vite` Vite plugin (not PostCSS). The CSS file uses `@import "tailwindcss"` directly
- **`motion`** (`^12.40.0`, formerly framer-motion) — used only in `SteamStats.tsx` for staggered entry and completion-bar fill animations
- **Sharp** — auto-detected by Astro's image service for `getImage()` / `<Image />` optimization

### Content

- **Blog posts** use Astro Content Collections with a `glob` loader from `src/content/blog/*.md`. Schema: `title` (string), `date` (date), `category` (string, default "General"), `excerpt` (optional string), `draft` (boolean, default false), `tags` (string[]). Drafts are filtered at build time.
- **Static data**: `public/steam-data.json` — manually maintained Steam stats, fetched client-side by `SteamStats.tsx`.

### Key patterns

- **Build-time image optimization**: `PhotographyGrid.astro` and `PortfolioCard.astro` use Astro's `getImage()` to generate WebP thumbnails with responsive srcsets at build time. Portfolio cards also generate tiny (60px) blur-backdrop images for a CSS `filter: blur(20px)` background effect.
- **Vanilla JS carousel**: `PortfolioCard.astro` implements its own touch/mouse-drag carousel — no third-party library.
- **Page routing**: `src/pages/index.astro` (homepage), `src/pages/blog/index.astro` (listing with category filters), `src/pages/blog/[...slug].astro` (individual post with static path generation via `getStaticPaths()`).
- **Layout**: `BaseLayout.astro` provides the shell (`<html>`, `<head>`, Google Fonts via CDN, header, footer). Google Fonts: DM Sans (body), Google Sans (headings).

### CI/CD

`.github/workflows/deploy.yml` deploys on push to `master`: checkout → Node 22 → `npm ci` → `npm run build` → deploy to GitHub Pages. Concurrency group `pages` ensures single deployments.
