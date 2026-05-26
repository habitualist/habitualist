<script setup lang="ts">
import { onMounted, onBeforeUnmount, shallowRef } from 'vue'
import gsap from 'gsap'

const projects = [
  {
    n: '01',
    title: 'Spatrack Architecture',
    desc: 'Professional website for a Lagos architecture and construction company — presenting design, construction, and engineering services with a clean, responsive layout.',
    tech: ['Responsive Web', 'Figma-to-Dev', 'Nuxt', 'Tailwind'],
    image: '/images/projects/spatrack.png',
    accent: 'rgba(0, 255, 136, 0.5)',
    href: 'https://spatrack.netlify.app'
  },
  {
    n: '02',
    title: 'Developer Portfolio',
    desc: 'A cinematic portfolio with a 3D wireframe globe, smooth scrolling, and a custom animated nav — built on Nuxt 4 with reusable components.',
    tech: ['Nuxt 4', 'Vue 3', 'TypeScript', 'GSAP', 'TresJS'],
    image: null,
    accent: 'rgba(80, 160, 255, 0.5)',
    href: null
  },
  {
    n: '03',
    title: 'Freelance Web Projects',
    desc: 'Websites and landing pages for individuals and businesses — combining clean UI, responsive layouts, and AI-assisted workflow automation.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Vue', 'Figma'],
    image: null,
    accent: 'rgba(255, 180, 60, 0.45)',
    href: null
  }
]

const trackRef = shallowRef<HTMLElement | null>(null)
const cardRefs: (HTMLElement | null)[] = []

function setCardRef(el: Element | object | null, i: number) {
  if (el instanceof HTMLElement) cardRefs[i] = el
}

let removeListener: (() => void) | null = null

onMounted(() => {
  const track = trackRef.value
  if (!track) return

  const updateParallax = () => {
    const scrollLeft = track.scrollLeft
    const trackWidth = track.clientWidth
    cardRefs.forEach((card) => {
      if (!card) return
      const cardCenter = card.offsetLeft + card.offsetWidth / 2
      const viewCenter = scrollLeft + trackWidth / 2
      const norm = Math.max(-1, Math.min(1, (cardCenter - viewCenter) / trackWidth))
      gsap.set(card, { x: norm * 28 })
    })
  }

  track.addEventListener('scroll', updateParallax, { passive: true })
  updateParallax()
  removeListener = () => track.removeEventListener('scroll', updateParallax)
})

onBeforeUnmount(() => {
  removeListener?.()
  cardRefs.forEach((card) => {
    if (card) gsap.set(card, { clearProps: 'transform' })
  })
})
</script>

<template>
  <section id="projects" class="relative isolate overflow-hidden py-32 md:py-48 bg-base">
    <GridOverlay :size="80" :opacity="0.03" />

    <!-- Header -->
    <div class="container-x relative z-[10]">
      <FadeUp variant="fade-up" class="mb-16 flex items-end justify-between gap-6 flex-wrap">
        <div>
          <SectionLabel num="04" label="Selected Work" />
          <h2 class="mt-6 font-display text-display-sm uppercase leading-[0.9] text-ink text-balance max-w-3xl">
            Things I've <span class="text-accent">built</span>.
          </h2>
        </div>
        <p class="max-w-sm text-ink-muted text-sm">
          Real projects, shipped to real clients. Click any card to see it live.
        </p>
      </FadeUp>
    </div>

    <!-- Carousel -->
    <div class="relative z-[10]">
      <div
        class="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-base to-transparent"
        aria-hidden="true"
      />

      <div
        ref="trackRef"
        class="projects-track flex gap-6 overflow-x-scroll pl-6 md:pl-10 lg:pl-16 pb-6 pt-1"
        tabindex="0"
        role="region"
        aria-label="Projects carousel — scroll to explore"
        data-lenis-prevent
      >
        <div
          v-for="(p, i) in projects"
          :key="p.title"
          :ref="(el) => setCardRef(el, i)"
          class="projects-card flex-shrink-0 w-[82vw] sm:w-[60vw] lg:w-[38vw] max-w-[500px] will-change-transform"
        >
          <TiltCard :max="4" class="h-full">
            <FadeUp
              variant="fade-up"
              :delay="0.05 * i"
              class="group glass glass-hover relative h-full overflow-hidden rounded-3xl p-1"
            >
              <!-- Preview area: screenshot if available, gradient fallback otherwise -->
              <div class="relative aspect-[16/10] overflow-hidden rounded-[20px]">

                <!-- Screenshot image -->
                <NuxtImg
                  v-if="p.image"
                  :src="p.image"
                  :alt="p.title + ' screenshot'"
                  class="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                  loading="lazy"
                  width="500"
                  height="313"
                />

                <!-- Gradient fallback when no screenshot yet -->
                <div
                  v-else
                  class="absolute inset-0"
                  :style="{ background: `radial-gradient(circle at 30% 20%, ${p.accent}, rgba(11,13,20,0.9) 60%, #0B0D14 100%)` }"
                >
                  <div class="absolute inset-0 grid-overlay opacity-40" />
                  <div class="absolute inset-0 flex items-center justify-center">
                    <span class="font-display text-5xl uppercase text-ink/20">{{ p.title }}</span>
                  </div>
                </div>

                <!-- Overlay on screenshot: number badge + live link button -->
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div class="absolute left-4 top-4">
                  <span class="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted bg-base/60 backdrop-blur-sm px-2 py-1 rounded">
                    / {{ p.n }}
                  </span>
                </div>
                <div v-if="p.href" class="absolute right-4 top-4">
                  <a
                    :href="p.href"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-ink bg-accent/90 hover:bg-accent px-3 py-1.5 rounded transition-colors"
                    @click.stop
                  >
                    View Live
                    <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                      <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                    </svg>
                  </a>
                </div>
              </div>

              <!-- Body -->
              <div class="relative px-5 py-5">
                <h3 class="font-display text-2xl uppercase leading-tight text-ink">{{ p.title }}</h3>
                <p class="mt-2 text-sm leading-relaxed text-ink-muted">{{ p.desc }}</p>
                <div class="mt-4 flex flex-wrap gap-2">
                  <span
                    v-for="t in p.tech"
                    :key="t"
                    class="rounded-full border border-hairline px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted"
                  >
                    {{ t }}
                  </span>
                </div>
              </div>
            </FadeUp>
          </TiltCard>
        </div>

        <div class="flex-shrink-0 w-6 md:w-10 lg:w-16" aria-hidden="true" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.projects-track {
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.projects-track::-webkit-scrollbar {
  display: none;
}

.projects-card {
  scroll-snap-align: start;
}
</style>
