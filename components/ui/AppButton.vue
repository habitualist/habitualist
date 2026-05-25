<script setup lang="ts">
import { ref } from 'vue'
import gsap from 'gsap'

interface Props {
  variant?: 'primary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  magnetic?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  magnetic: true
})

const btn = ref<HTMLElement | null>(null)
const radius = 80

const onMove = (e: MouseEvent) => {
  if (!props.magnetic || !btn.value) return
  const r = btn.value.getBoundingClientRect()
  const cx = r.left + r.width / 2
  const cy = r.top + r.height / 2
  const dx = e.clientX - cx
  const dy = e.clientY - cy
  const dist = Math.hypot(dx, dy)
  if (dist > radius) return
  const strength = (1 - dist / radius) * 16
  gsap.to(btn.value, {
    x: (dx / radius) * strength,
    y: (dy / radius) * strength,
    duration: 0.5,
    ease: 'expo.out'
  })
}

const onLeave = () => {
  if (!btn.value) return
  gsap.to(btn.value, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.4)' })
}
</script>

<template>
  <component
    :is="href ? 'a' : 'button'"
    ref="btn"
    :href="href"
    class="group relative inline-flex items-center gap-3 overflow-hidden rounded-full
           font-mono uppercase tracking-[0.18em] transition-colors duration-500
           ease-out-expo"
    :class="[
      // size
      size === 'sm' ? 'h-10 px-5 text-[11px]' :
      size === 'lg' ? 'h-14 px-9 text-sm' :
                      'h-12 px-7 text-xs',
      // variant
      variant === 'primary'
        ? 'bg-accent text-base hover:shadow-glow'
        : 'border border-hairline text-ink hover:border-hairline-glow hover:text-accent'
    ]"
    @mousemove="onMove"
    @mouseleave="onLeave"
  >
    <!-- Sheen overlay -->
    <span
      v-if="variant === 'primary'"
      aria-hidden="true"
      class="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r
             from-transparent via-white/30 to-transparent transition-transform
             duration-1000 ease-out-expo group-hover:translate-x-full"
    />
    <span class="relative z-10 inline-flex items-center gap-3">
      <slot />
      <svg
        width="14" height="14" viewBox="0 0 14 14" fill="none"
        class="transition-transform duration-500 ease-out-expo group-hover:translate-x-1"
      >
        <path
          d="M2 7h10M8 3l4 4-4 4"
          stroke="currentColor" stroke-width="1.5"
          stroke-linecap="round" stroke-linejoin="round"
        />
      </svg>
    </span>
  </component>
</template>
