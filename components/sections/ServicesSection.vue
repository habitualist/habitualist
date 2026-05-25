<script setup lang="ts">
const items = [
  { title: 'Frontend Engineering',  desc: 'Modern, accessible interfaces built on React, Vue, and the web platform.', icon: 'M4 5h16M4 12h10M4 19h16' },
  { title: 'Backend APIs',          desc: 'Typed, scalable services and clean data contracts.',                       icon: 'M4 6h16M4 12h16M4 18h10' },
  { title: 'Responsive Web Design', desc: 'Fluid layouts that feel native on every screen size.',                    icon: 'M3 5h18M3 12h12M3 19h18' },
  { title: 'UI Engineering',        desc: 'Design-system thinking, motion, and pixel-grade polish.',                  icon: 'M6 3v18M18 3v18M3 12h18' },
  { title: 'Performance Optimization', desc: 'Lighthouse-grade speed, bundle hygiene, and Core Web Vitals.',         icon: 'M12 3v18M3 12h18' },
  { title: 'Motion Design',         desc: 'Choreographed transitions that guide attention and add character.',       icon: 'M5 12c3-6 11-6 14 0' }
]
</script>

<template>
  <section id="experience" class="relative isolate overflow-hidden py-32 md:py-48 bg-base">
    <GridOverlay :size="64" :opacity="0.04" />

    <div class="container-x relative z-[10]">
      <FadeUp variant="fade-up" class="mb-12 flex items-end justify-between gap-6 flex-wrap">
        <div>
          <SectionLabel num="03" label="Services" />
          <h2 class="mt-6 font-display text-display-sm uppercase leading-[0.9] text-ink text-balance max-w-3xl">
            What I do, <br/>at a <span class="text-accent">premium</span> level.
          </h2>
        </div>
      </FadeUp>

      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <TiltCard v-for="(it, i) in items" :key="it.title" :max="5">
          <FadeUp
            variant="fade-up"
            :delay="0.05 * i"
            class="group glass glass-hover relative h-full overflow-hidden rounded-2xl p-8"
          >
            <!-- Soft hover glow that follows the tilt highlight -->
            <span
              aria-hidden="true"
              class="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style="background: radial-gradient(400px circle at var(--tilt-x,50%) var(--tilt-y,50%), rgba(0,255,136,0.12), transparent 60%);"
            />
            <div class="relative z-10">
              <div class="mb-8 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-hairline bg-elevated/60">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path :d="it.icon" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" class="text-accent" />
                </svg>
              </div>
              <h3 class="font-display text-2xl uppercase leading-tight text-ink">
                {{ it.title }}
              </h3>
              <p class="mt-3 text-sm leading-relaxed text-ink-muted">{{ it.desc }}</p>
              <div class="mt-8 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-dim">
                / 0{{ i + 1 }}
              </div>
            </div>
          </FadeUp>
        </TiltCard>
      </div>
    </div>
  </section>
</template>
