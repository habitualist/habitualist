# Promise Worth — Portfolio

Cinematic Nuxt 4 + Vue 3 portfolio. Phase 1 ships the foundation, Hero, and full section scaffolding.

## Stack

- **Nuxt 4** (App Router-style routing) + **Vue 3** Composition API
- **TypeScript** strict
- **TailwindCSS** with custom theme tokens
- **GSAP** + **Lenis** for motion + smooth scroll
- **TresJS** (Three.js for Vue) for the wireframe globe + particles
- **VueUse**, **@nuxt/image**, **@nuxtjs/seo**

## Setup

```bash
pnpm install      # or npm install / yarn / bun install
pnpm dev          # http://localhost:3000
```

> Fonts are loaded from Google Fonts for portability. For production, self-host into `/public/fonts` and update `nuxt.config.ts`.

## What's done (Phase 1)

- ✅ Theme system (CSS vars + Tailwind tokens)
- ✅ Lenis smooth scroll + GSAP ticker sync
- ✅ Composables: `useMouse`, `useParallax`, `useScrollReveal`, `useCursorGlow`, `useTilt`, `splitText`
- ✅ Cursor glow spotlight
- ✅ Sticky blur-on-scroll navbar with active-section tracking + mobile sheet
- ✅ Hero section: wireframe globe (TresJS), grid overlay, glow orbs, headline char-stagger reveal, magnetic CTAs, technical corner labels
- ✅ Tech stack auto-marquee
- ✅ All remaining sections scaffolded with consistent motion system

## What's coming (Phase 2)

- Project carousel with horizontal scroll-snap + parallax previews
- Custom SplitText with mask animation
- Section snap on scroll-end
- Real project imagery & video previews
- Scroll-linked globe scale (shrinks as you leave hero)
- Loader / preloader
- Theme switch (optional)

## Folder structure

```
components/
  ui/         primitives (button, badge, grid, glow, label)
  animations/ wrappers (FadeUp, SplitTextReveal, TiltCard)
  3d/         TresJS scenes (WireframeGlobe, ParticleField)
  layout/     navbar, footer, cursor glow
  sections/   one component per page section
composables/  reusable reactive logic
utils/        easings, gsap helpers
plugins/      lenis.client.ts
assets/css/   main.css with theme variables
```
