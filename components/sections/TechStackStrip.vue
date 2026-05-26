<script setup lang="ts">
const stack = [
  'HTML', 'CSS', 'JavaScript', 'TypeScript', 'Vue', 'Nuxt.js',
  'Git', 'GitHub', 'Figma', 'Python', 'GSAP', 'Three.js', 'AI Tools'
]
// Duplicate for seamless loop
const doubled = [...stack, ...stack]
</script>

<template>
  <section
    class="relative z-[2] border-y border-hairline bg-base/80 py-8 overflow-hidden"
  >
    <div class="flex w-max animate-marquee gap-16 whitespace-nowrap">
      <span
        v-for="(item, i) in doubled"
        :key="i"
        class="font-display text-4xl uppercase tracking-[0.05em] text-ink-muted
               transition-colors duration-300 hover:text-accent"
      >
        {{ item }}
        <span class="ml-16 text-accent">•</span>
      </span>
    </div>

    <!-- Edge fades -->
    <div class="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-base to-transparent" />
    <div class="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-base to-transparent" />
  </section>
</template>
