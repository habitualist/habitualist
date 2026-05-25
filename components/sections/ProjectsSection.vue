<script setup lang="ts">
import { onMounted, onBeforeUnmount, shallowRef } from 'vue'
import gsap from 'gsap'

const projects = [
  {
    n: '01',
    title: 'SNL Spatrack Architecture',
    desc: 'A modern architecture and construction platform focused on premium design, responsive layouts, and client engagement.',
    tech: ['Next.js', 'Tailwind', 'Framer Motion'],
    accent: 'rgba(0, 255, 136, 0.6)'
  },
  {
    n: '02',
    title: 'Heart Interrupted Podcast',
    desc: 'A storytelling and podcast experience designed around emotional narratives, healing, and personal growth.',
    tech: ['React', 'Node.js', 'TypeScript'],
    accent: 'rgba(255, 120, 200, 0.6)'
  },
  {
    n: '03',
    title: 'Developer Portfolio',
    desc: 'A futuristic portfolio experience with cinematic interactions and motion-heavy design.',
    tech: ['Nuxt', 'GSAP', 'TresJS'],
    accent: 'rgba(80, 160, 255, 0.6)'
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
    <GridOverlay :size="80" :opacity="0.04" />
    <GlowOrb class="right-[-10%] top-[20%]" size="600px" :blur="120" />

    <!-- Header stays inside the normal container -->
    <div class="container-x relative z-[10]">
      <FadeUp variant="fade-up" class="mb-16 flex items-end justify-between gap-6 flex-wrap">
        <div>
          <SectionLabel num="04" label="Selected Work" />
          <h2 class="mt-6 font-display text-display-sm uppercase leading-[0.9] text-ink text-balance max-w-3xl">
            Recent <span class="text-accent">projects</span>.
          </h2>
        </div>
        <p class="max-w-md text-ink-muted">
          A selection of platforms, products, and experiences I've built recently.
        </p>
      </FadeUp>
    </div>

    <!-- Carousel: breaks out of container-x to bleed right -->
    <div class="relative z-[10]">
      <!-- Right-edge fade hint -->
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
          class="projects-card flex-shrink-0 w-[82vw] sm:w-[60vw] lg:w-[38vw] max-w-[480px] will-change-transform"
        >
          <TiltCard :max="4" class="h-full">
            <FadeUp
              variant="fade-up"
              :delay="0.05 * i"
              class="group glass glass-hover relative h-full overflow-hidden rounded-3xl p-1"
            >
              <!-- Preview area -->
              <div
                class="relative aspect-[4/5] overflow-hidden rounded-[20px]"
                :style="{ background: `radial-gradient(circle at 30% 20%, ${p.accent}, rgba(11,13,20,0.9) 60%, #0B0D14 100%)` }"
              >
                <div class="absolute inset-0 grid-overlay opacity-40" />
                <div class="absolute left-6 top-6 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
                  / {{ p.n }}
                </div>
                <div class="absolute inset-x-6 bottom-6">
                  <h3 class="font-display text-3xl uppercase leading-[0.95] text-ink text-balance">
                    {{ p.title }}
                  </h3>
                </div>
              </div>

              <!-- Body -->
              <div class="relative px-6 py-6">
                <p class="text-sm leading-relaxed text-ink-muted">{{ p.desc }}</p>
                <div class="mt-5 flex flex-wrap gap-2">
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

        <!-- Trailing spacer so the last card can snap to start and the right edge fade works -->
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
