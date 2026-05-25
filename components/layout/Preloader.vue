<script setup lang="ts">
import { ref, onMounted } from 'vue'
import gsap from 'gsap'

const emit = defineEmits<{ done: [] }>()

const preloaderRef = ref<HTMLElement | null>(null)
const progressBarRef = ref<HTMLElement | null>(null)
const counterRef = ref<HTMLElement | null>(null)

onMounted(() => {
  const el = preloaderRef.value
  if (!el) { emit('done'); return }

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (reducedMotion) {
    // Honour the user preference: show briefly, then remove without animation.
    setTimeout(() => emit('done'), 500)
    return
  }

  const countObj = { n: 0 }
  const bar = progressBarRef.value
  const counter = counterRef.value

  const tl = gsap.timeline({
    defaults: { ease: 'power2.inOut' },
    onComplete() {
      // Slide the overlay upward off-screen, then signal the parent to unmount.
      gsap.to(el, {
        yPercent: -100,
        duration: 0.65,
        ease: 'expo.inOut',
        onComplete: () => emit('done'),
      })
    },
  })

  // Counter 000 → 100
  tl.to(countObj, {
    n: 100,
    duration: 1.6,
    onUpdate() {
      if (counter) counter.textContent = String(Math.round(countObj.n)).padStart(3, '0')
    },
  }, 0)

  // Progress bar scaleX 0 → 1, in sync with counter
  if (bar) {
    tl.to(bar, { scaleX: 1, duration: 1.6 }, 0)
  }

  // Brief hold at 100 before exit
  tl.to({}, { duration: 0.25 })
})
</script>

<template>
  <div
    ref="preloaderRef"
    class="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-base"
    aria-label="Loading"
    role="status"
  >
    <!-- Wordmark -->
    <div class="select-none text-center">
      <p class="mb-6 font-mono text-[10px] uppercase tracking-[0.32em] text-ink-dim">
        Loading experience
      </p>
      <div class="font-display uppercase leading-none text-ink" style="font-size: clamp(2.8rem, 9vw, 7.5rem)">
        HABITUALIST
      </div>
    </div>

    <!-- Counter -->
    <div class="mt-10 font-mono text-[11px] uppercase tracking-[0.3em] text-ink-muted">
      <span ref="counterRef">000</span>
    </div>

    <!-- Progress bar -->
    <div class="mt-3 h-px w-48 overflow-hidden bg-hairline">
      <div
        ref="progressBarRef"
        class="h-full w-full origin-left bg-accent"
        style="transform: scaleX(0)"
      />
    </div>
  </div>
</template>
