<script setup lang="ts">
const values = [
  { title: 'Clean Architecture',    desc: 'Code that reads like prose. Boundaries that hold up under pressure.' },
  { title: 'Continuous Learning',   desc: 'Curiosity as a daily practice. Today\'s edge becomes tomorrow\'s baseline.' },
  { title: 'Performance',           desc: 'Speed is a feature. Every millisecond is a respect for the user\'s time.' },
  { title: 'User Experience',       desc: 'Interfaces that feel obvious — invisible until they delight.' },
  { title: 'Scalable Systems',      desc: 'Built for the user count we don\'t have yet.' }
]
</script>

<template>
  <section class="relative isolate overflow-hidden py-32 md:py-48 bg-elevated/40">
    <GridOverlay :size="100" :opacity="0.04" />

    <div class="container-x relative z-[10]">
      <FadeUp variant="fade-up" class="mb-16">
        <SectionLabel num="05" label="Principles" />
        <h2 class="mt-6 font-display text-display-sm uppercase leading-[0.9] text-ink text-balance max-w-3xl">
          What I <span class="text-accent">value</span>.
        </h2>
      </FadeUp>

      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <FadeUp
          v-for="(v, i) in values"
          :key="v.title"
          variant="fade-up"
          :delay="0.05 * i"
          class="glass glass-hover relative overflow-hidden rounded-2xl p-7 min-h-[200px]"
        >
          <div class="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
            / 0{{ i + 1 }}
          </div>
          <h3 class="mt-6 font-display text-xl uppercase leading-tight text-ink">
            {{ v.title }}
          </h3>
          <p class="mt-3 text-sm leading-relaxed text-ink-muted">{{ v.desc }}</p>
        </FadeUp>
      </div>
    </div>
  </section>
</template>
