<script setup lang="ts">
interface Props {
  size?: string       // any CSS size
  color?: string      // rgba color
  blur?: number       // px
  className?: string
  parallaxStrength?: number   // multiplier for mouse parallax (px)
}
const props = withDefaults(defineProps<Props>(), {
  size: '500px',
  color: 'rgba(0, 255, 136, 0.18)',
  blur: 90,
  parallaxStrength: 40
})
</script>

<template>
  <div
    aria-hidden="true"
    class="pointer-events-none absolute rounded-full will-change-transform animate-float"
    :style="{
      width: size,
      height: size,
      background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
      filter: `blur(${blur}px)`,
      transform: `translate3d(calc(var(--mx) * ${parallaxStrength}px), calc(var(--my) * ${parallaxStrength}px), 0)`
    }"
  />
</template>
