<script setup lang="ts">
const skills = [
  { name: 'JavaScript / HTML / CSS', level: 88 },
  { name: 'Full-Stack Web Dev',      level: 85 },
  { name: 'Git & GitHub',            level: 80 },
  { name: 'AI Prompt Engineering',   level: 80 },
  { name: 'Workflow Automation',     level: 72 },
  { name: 'Nuxt.js / Vue',           level: 70 },
]
</script>

<template>
  <section id="skills" class="relative isolate overflow-hidden py-32 md:py-48">
    <GridOverlay :size="80" :opacity="0.04" />

    <div class="container-x relative z-[10]">
      <FadeUp variant="fade-up" class="mb-16">
        <SectionLabel num="06" label="Skills" />
        <h2 class="mt-6 font-display text-display-sm uppercase leading-[0.9] text-ink text-balance max-w-3xl">
          Tools of <span class="text-accent">the trade</span>.
        </h2>
      </FadeUp>

      <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
        <FadeUp
          v-for="(s, i) in skills"
          :key="s.name"
          variant="fade-up"
          :delay="0.04 * i"
          class="glass rounded-xl p-5"
        >
          <div class="mb-3 flex items-baseline justify-between">
            <span class="font-display text-2xl uppercase text-ink">{{ s.name }}</span>
            <span class="font-mono text-xs text-ink-muted">{{ s.level }}%</span>
          </div>
          <div class="h-1 w-full overflow-hidden rounded-full bg-hairline">
            <div
              class="h-full bg-accent shadow-glow-sm transition-all duration-1000 ease-out-expo"
              :style="{ width: `${s.level}%` }"
            />
          </div>
        </FadeUp>
      </div>
    </div>
  </section>
</template>
