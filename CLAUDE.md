# CLAUDE.md

日本語でレスポンスすること。
This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server (Next.js with Turbopack)
npm run build      # Production build
npm run start      # Start production server
npm run lint       # Lint with Biome (biome check)
npm run format     # Auto-format with Biome (biome format --write)
```

No test framework is currently configured.

## Tech Stack

- **Next.js 16** (App Router) with **React 19** and **TypeScript 5**
- **Tailwind CSS v4** via PostCSS (`@import "tailwindcss"` syntax, not v3 `@tailwind` directives)
- **Biome 2** for linting and formatting (not ESLint/Prettier)
- **Motion** (`motion/react`, formerly Framer Motion) for animations
- **React Compiler** enabled (`reactCompiler: true` in next.config.ts)
- **Google Analytics 4** via `next/script` (measurement ID in env var)

## Architecture

- `src/app/` — Next.js App Router. Pages are `page.tsx`, layouts are `layout.tsx`.
- `@/*` path alias maps to `./src/*` (configured in tsconfig.json)
- Atomic Design: `atoms` → `molecules` → `organisms` → `sections` → `layouts`
- Font: **Inter** loaded via `next/font/google`
- Dark theme only (no light mode / no `prefers-color-scheme` toggle)
- Theme colors defined via Tailwind v4 `@theme inline` block in `globals.css`
- Devicon icons loaded via CDN (`cdn.jsdelivr.net`) in `layout.tsx` head
- OGP / Twitter Card metadata configured in `layout.tsx`
- `page.tsx` is a client component (`"use client"`) with a 2.5s page loader

### Directory Structure

```
src/
├── app/                  # Next.js App Router (layout, page, globals.css)
├── components/
│   ├── atoms/            # Button, Tag, IconLink, ScrollHint, SkillIcon, SectionHeading, GoogleAnalytics
│   ├── molecules/        # ContactItem, ExperienceItem, NavItem, PhilosophyText, SkillCategory, WorkCard
│   ├── organisms/        # MobileNav, PageLoader, Sidebar, WorkModal
│   ├── sections/         # HomeSection, WorksSection, AboutSection, ExperienceSection, ContactSection
│   └── layouts/          # MainLayout
├── data/                 # Static data (experience, navigation, site, skills, works)
├── hooks/                # useActiveSection, useMediaQuery, useMousePosition, useScrollBackground
├── lib/                  # Shared utilities (animations.ts)
└── types/                # TypeScript type definitions (index.ts)
```

### Color Palette

| Variable | Value | Usage |
|----------|-------|-------|
| `--background` | `#252525` | Page background |
| `--foreground` | `#e0e4bf` | Primary text |
| `--accent` | `#5898b9` | Links, highlights |
| `--accent-strong` | `#e61645` | Emphasis, CTA |
| `--muted` | `#999` | Secondary text |
| `--border` | `#3a3a3a` | Borders, dividers |

### Environment Variables

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics 4 measurement ID |
| `NEXT_PUBLIC_SITE_URL` | Site base URL (for OGP metadata) |

## Code Style

- 2-space indentation (Biome config)
- Biome handles import organization automatically (alphabetical sort)
- All decorative SVGs need `aria-hidden="true"` (Biome `noSvgWithoutTitle` rule)
- Follow existing Tailwind utility-class patterns for styling
- `motion/react` for imports (not `framer-motion`)

## Known Constraints

- `MainLayout` uses `filter: blur()` animation (`blurReveal`), which breaks `position: fixed` for child elements. Fixed-position elements (e.g., `ScrollHint`) must be placed outside `MainLayout`.
