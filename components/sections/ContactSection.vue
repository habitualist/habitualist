<script setup lang="ts">
const channels = [
  { label: 'EMAIL',    value: 'nnaochinobinna001@gmail.com',    href: 'mailto:nnaochinobinna001@gmail.com' },
  { label: 'LINKEDIN', value: 'obinna-nnaochin',                href: 'https://linkedin.com/in/obinna-nnaochin' },
  { label: 'GITHUB',   value: '@habitualist',                   href: 'https://github.com/habitualist' },
  { label: 'WHATSAPP', value: 'Available on request',           href: '#' }
]
</script>

<template>
  <section id="contact" class="relative isolate overflow-hidden py-32 md:py-48">
    <GridOverlay :size="120" :opacity="0.05" />
    <GlowOrb class="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" size="700px" :blur="120" />

    <div class="container-x relative z-[10] text-center">
      <FadeUp variant="fade-up">
        <SectionLabel num="07" label="Contact" />
      </FadeUp>

      <FadeUp variant="fade-up" :delay="0.15" class="mt-10">
        <h2 class="font-display text-display uppercase leading-[0.85] text-ink text-balance text-glow">
          Let's build <br/>
          something <span class="text-accent">premium</span>.
        </h2>
      </FadeUp>

      <FadeUp variant="fade-up" :delay="0.3" class="mt-12 inline-flex">
        <AppButton variant="primary" size="lg" href="mailto:nnaochinobinna001@gmail.com">
          nnaochinobinna001@gmail.com
        </AppButton>
      </FadeUp>

      <FadeUp
        variant="fade-up"
        :delay="0.45"
        class="mt-20 grid grid-cols-2 gap-4 max-w-3xl mx-auto md:grid-cols-4"
      >
        <a
          v-for="c in channels"
          :key="c.label"
          :href="c.href"
          class="glass glass-hover group rounded-xl p-5 text-left"
        >
          <div class="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
            {{ c.label }}
          </div>
          <div class="mt-3 font-display text-lg uppercase text-ink group-hover:text-accent transition-colors">
            {{ c.value }}
          </div>
        </a>
      </FadeUp>
    </div>
  </section>
</template>
