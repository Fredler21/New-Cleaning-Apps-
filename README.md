# CleaningHax Premium

Luxury cleaning hacks website built with Next.js App Router, TypeScript, and TailwindCSS.

## Stack

- Next.js (App Router) + TypeScript
- TailwindCSS
- Local typed data layer (`src/data`)

## Run Locally

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Open:

```bash
http://localhost:3000
```

## Scripts

- `npm run dev` – development server
- `npm run build` – production build
- `npm run start` – run production server
- `npm run lint` – linting
- `npm run typecheck` – strict TypeScript check
- `npm run generate:images` – generate post images with Gemini API into `public/graphics/posts`

## Generate Subject Images with Gemini

1. Copy `.env.example` to `.env.local` and add your key:

```bash
cp .env.example .env.local
```

2. Export the key in your shell:

```bash
export GEMINI_API_KEY="your_api_key_here"
```

3. Generate images:

```bash
npm run generate:images
```

Prompts are stored in `scripts/gemini-image-prompts.json` and outputs are written to `public/graphics/posts`.

## Image Production Prompts

Place generated files in the exact paths below.

### `/public/graphics/hero-premium-kitchen.jpg`

Prompt: `Premium modern kitchen interior, cinematic soft morning light, polished stone countertops, brushed steel details, spotless surfaces, upscale lifestyle editorial style, depth of field, realistic photography, no text, no people, 4k.`

### `/public/graphics/hero-premium-bathroom.jpg`

Prompt: `Luxury minimal spa bathroom, matte stone textures, soft natural daylight, pristine glass shower, premium fixtures, calm high-end aesthetic, realistic photo, no text, no people, 4k.`

### `/public/graphics/texture-noise.png`

Prompt: `Very subtle monochrome film grain/noise texture, seamless tileable overlay, low contrast, transparent-friendly, minimalist premium UI background texture.`

### OpenGraph Prompts

- `/public/og/og-default.png`: `Dark premium gradient background navy to charcoal with subtle teal glow, elegant minimal composition, cleaning lifestyle theme, no text.`
- `/public/og/og-home.png`: `Premium cleaning brand mood board, modern kitchen and bathroom visual blend, dark luxury palette with teal accent, no text.`

## Accessibility and SEO

- Semantic landmarks and keyboard-accessible navigation
- OpenGraph/Twitter metadata in app layout and pages
- Static `robots.txt` and `sitemap.xml` in `public`

## Folder Overview

- `.github/workflows` — CI automation for lint, typecheck, and build on push/PR.
- `public` — Static assets served directly (favicon, sitemap, robots, OG images, graphics, generated post images).
- `scripts` — Utility scripts for Gemini image generation and prompt management.
- `src/app` — Next.js App Router pages, layout, global styles, and API routes.
- `src/components` — Reusable UI and feature components (navigation, cards, hero, SEO, form elements).
- `src/data` — Local TypeScript content data for categories, featured content, and posts.
- `src/lib` — Shared utility functions (formatting, filtering/search, slug helpers).
- `src/styles` — Design tokens and style primitives used across the app.
- `src/types` — Central TypeScript interfaces/types for posts and categories.
