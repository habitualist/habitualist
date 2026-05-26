<script setup lang="ts">
const items = [
  { title: 'Frontend Engineering',    desc: 'Build and maintain user-facing web interfaces — responsive, production-ready components from Figma designs using Vue, Nuxt, and Git/GitHub workflows.', icon: 'M4 5h16M4 12h10M4 19h16' },
  { title: 'IT Support & Consulting', desc: 'Hands-on technical support, troubleshooting, and digital consulting — diagnosing issues, advising on tools, and delivering dependable outcomes for clients.', icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  { title: 'Tech Training & Education', desc: 'Teaching individuals IT skills — from basic computer literacy and digital tools through to intermediate tech, web, and software workflows.', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
  { title: 'AI Prompt Engineering',   desc: 'Apply AI tools to accelerate development, automate content tasks, and build smarter workflows — getting real results from modern AI systems.', icon: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z' },
  { title: 'Workflow Automation',     desc: 'Automate repetitive development and business processes — from deployment pipelines to content workflows, saving time and reducing errors.', icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' },
  { title: 'Digital Consulting',      desc: 'Strategy, social-media campaign concepts, written and video content creation, and targeted email marketing to boost lead generation and brand presence.', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
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
