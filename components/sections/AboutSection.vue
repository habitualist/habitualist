<script setup lang="ts">
const stats = [
  { value: '2–3', label: 'Years Exp.' },
  { value: '14',  label: 'Projects'   },
  { value: '5',   label: 'Clients'    },
  { value: 'All', label: 'Disciplines'},
]
</script>

<template>
  <section id="about" class="relative isolate overflow-hidden py-32 md:py-48">
    <GridOverlay :size="80" :opacity="0.04" />
    <GlowOrb class="left-[-15%] top-[20%]" size="500px" :blur="120" />

    <div class="container-x relative z-[10]">
      <FadeUp variant="fade-up" class="mb-12">
        <SectionLabel num="02" label="About" />
      </FadeUp>

      <div class="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-10">

        <!-- LEFT: Headline + bio (+ portrait on mobile) -->
        <div class="lg:col-span-7 flex flex-col justify-center">
          <FadeUp variant="fade-up" :delay="0.1">
            <h2 class="font-display text-display-sm uppercase leading-[0.9] text-ink text-balance">
              Building with<br />
              <span class="text-accent">precision</span>, purpose<br />
              &amp; motion.
            </h2>
          </FadeUp>

          <FadeUp variant="fade-up" :delay="0.25" class="mt-10 max-w-xl">
            <p class="text-lg leading-relaxed text-ink-muted">
              Obinna Nnaochin is an IT Specialist and Digital Consultant based in
              Lagos, Nigeria, with 2–3 years across full-stack web development,
              AI prompt engineering, and IT consulting. He builds and maintains
              web applications, automates workflows, and provides hands-on
              technical support and training — working inside real codebases with
              Git/GitHub and Figma-to-development workflows.
            </p>
          </FadeUp>

          <!-- Portrait: mobile only (shown below bio, hidden on desktop) -->
          <FadeUp variant="fade-up" :delay="0.35" class="mt-10 flex justify-center lg:hidden">
            <div
              class="relative overflow-hidden rounded-2xl glass border border-hairline"
              style="width: 200px; aspect-ratio: 3/4;"
            >
              <span
                aria-hidden="true"
                class="pointer-events-none absolute top-0 left-0 h-6 w-6 border-t-2 border-l-2 border-accent/50 rounded-tl-2xl z-[2]"
              />
              <span
                aria-hidden="true"
                class="pointer-events-none absolute bottom-0 right-0 h-6 w-6 border-b-2 border-r-2 border-accent/50 rounded-br-2xl z-[2]"
              />
              <NuxtImg
                src="/images/obi2.jpeg"
                alt="Obinna Nnaochin"
                class="absolute inset-0 h-full w-full object-cover object-top z-[1]"
                loading="lazy"
                width="200"
                height="267"
              />
            </div>
          </FadeUp>
        </div>

        <!-- RIGHT: Portrait (desktop) + stat cards -->
        <div class="lg:col-span-5 flex flex-col gap-6">

          <!-- Portrait: desktop only -->
          <FadeUp variant="fade-up" :delay="0.15" class="hidden lg:flex justify-center">
            <div
              class="relative overflow-hidden rounded-2xl glass border border-hairline"
              style="width: 100%; max-width: 220px; aspect-ratio: 3/4;"
            >
              <span
                aria-hidden="true"
                class="pointer-events-none absolute top-0 left-0 h-7 w-7 border-t-2 border-l-2 border-accent/50 rounded-tl-2xl z-[2]"
              />
              <span
                aria-hidden="true"
                class="pointer-events-none absolute bottom-0 right-0 h-7 w-7 border-b-2 border-r-2 border-accent/50 rounded-br-2xl z-[2]"
              />
              <NuxtImg
                src="/images/obi2.jpeg"
                alt="Obinna Nnaochin"
                class="absolute inset-0 h-full w-full object-cover object-top z-[1]"
                loading="lazy"
                width="220"
                height="293"
              />
            </div>
          </FadeUp>

          <!-- Stat cards -->
          <div class="grid grid-cols-2 gap-4">
            <TiltCard v-for="(s, i) in stats" :key="s.label" :max="6">
              <FadeUp
                variant="fade-up"
                :delay="0.15 + i * 0.08"
                class="glass glass-hover h-full rounded-2xl p-6"
              >
                <div class="font-display text-5xl text-ink">{{ s.value }}</div>
                <div class="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
                  {{ s.label }}
                </div>
              </FadeUp>
            </TiltCard>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>
