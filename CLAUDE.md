# CLAUDE.md — Project Context

Personal portfolio site for **Obinna Nnaochin** (IT Specialist & Digital Consultant — full-stack web, AI prompt engineering, IT support & training). Brand handle: **Habitualist**.
Cinematic, premium-SaaS aesthetic: dark backgrounds, neon green accent, heavy motion.

## Stack (do not change without reason)

- **Nuxt 4** (App Router-style) + **Vue 3** Composition API + **TypeScript** (strict)
- **TailwindCSS 3** — NOT v4. `@nuxtjs/tailwindcss@6` requires Tailwind v3; upgrading breaks `tailwind.config.ts`.
- **GSAP** (+ ScrollTrigger) for animation
- **Lenis** for smooth scroll (initialized in `plugins/lenis.client.ts`, synced to GSAP ticker)
- **TresJS v5** (Three.js for Vue) for 3D backgrounds
- **VueUse**, **@nuxt/image**
- `@nuxtjs/seo` is optional and commented out in `nuxt.config.ts`

## Critical gotchas (already solved — don't reintroduce)

1. **Component resolution**: components live in subfolders (`components/sections/`, `components/layout/`, `components/ui/`, `components/animations/`, `components/3d/`). They resolve by **filename only** because `nuxt.config.ts` sets:
   ```ts
   components: [{ path: '~/components', pathPrefix: false }]
   ```
   So `components/sections/HeroSection.vue` is `<HeroSection>`, not `<SectionsHeroSection>`. Without this, the page renders BLACK with "Failed to resolve component" warnings.

2. **TresJS v5 API**: use `useLoop().onBeforeRender(({ delta, elapsed }) => {})`. The old v4 `useRenderLoop().onLoop` does NOT exist in v5. Buffer geometries use explicit `<TresBufferAttribute attach="attributes-position" :args="[array, 3]" />`.

3. **Verification**: `nuxt prepare` and `nuxt build` PASS even when the page renders black, because component-resolution failures happen at **render time**. Always verify by running `npm run dev` and actually loading the page / checking the terminal for "Failed to resolve component" warnings.

4. 3D components (globe, particles) are wrapped in `<ClientOnly>` — they render client-side only. Keep new 3D work client-only to avoid hydration mismatches.

## Theme system

- Source of truth: CSS variables in `assets/css/main.css` (`:root` block).
- Mirrored as Tailwind tokens in `tailwind.config.ts` (`base`, `elevated`, `accent`, `ink`, etc.).
- Key tokens: `--bg-base #05060A`, `--accent #00FF88`, fonts `--font-display` (Bebas Neue), `--font-sans` (Space Grotesk), `--font-mono` (JetBrains Mono).
- Mouse position is written to `--mx` / `--my` (-1..1) by `useMouse` for cheap CSS parallax.
- Cursor spotlight uses `--cursor-x` / `--cursor-y` via `useCursorGlow`.

## Folder structure

```
components/
  ui/         primitives (AppButton, AppBadge, GridOverlay, GlowOrb, SectionLabel)
  animations/ FadeUp, SplitTextReveal, TiltCard
  3d/         WireframeGlobe, ParticleField (TresJS)
  layout/     AppNavbar, AppFooter, CursorGlow
  sections/   one component per page section
composables/  useMouse, useParallax, useScrollReveal, useCursorGlow, useTilt, useSplitText
utils/        easings, motion (GSAP helpers)
plugins/      lenis.client.ts
assets/css/   main.css (theme vars + utilities)
```

## Conventions

- Reveal animations: wrap elements in `<FadeUp>` or add `data-reveal` — handled by the global `useScrollReveal` observer.
- Respect `prefers-reduced-motion` (handled globally in main.css; honor it in new JS-driven motion too).
- Mobile-first; desktop should feel cinematic, mobile should stack cleanly.
- Placeholder content (name, projects, stats, contact) is intentional — the owner will swap real details later. Don't "fix" placeholder copy unless asked.

## Commands

```bash
npm install
npm run dev      # http://localhost:3000 — first build is slow (~15s), globe fades in after
npm run build    # run after big changes to confirm production bundle compiles
```
