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
- **Motion** (formerly Framer Motion) for animations
- **React Compiler** enabled (`reactCompiler: true` in next.config.ts)

## Architecture

- `src/app/` — Next.js App Router. Pages are `page.tsx`, layouts are `layout.tsx`.
- `@/*` path alias maps to `./src/*` (configured in tsconfig.json)
- Fonts: Geist Sans and Geist Mono loaded via `next/font/google`, exposed as CSS variables `--font-geist-sans` and `--font-geist-mono`
- Dark mode: CSS custom properties in `globals.css` with `prefers-color-scheme: dark`
- Theme colors (`--color-background`, `--color-foreground`) defined via Tailwind v4 `@theme inline` block in `globals.css`

## Code Style

- 2-space indentation (Biome config)
- Biome handles import organization automatically
- Follow existing Tailwind utility-class patterns for styling
