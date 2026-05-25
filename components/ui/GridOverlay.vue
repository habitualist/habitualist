<script setup lang="ts">
interface Props {
  size?: number       // grid cell px
  opacity?: number    // 0..1
  parallax?: boolean  // react to mouse via --mx/--my
}
const props = withDefaults(defineProps<Props>(), {
  size: 64,
  opacity: 0.06,
  parallax: true
})
</script>

<template>
  <div
    aria-hidden="true"
    class="pointer-events-none absolute inset-0 overflow-hidden"
  >
    <div
      class="absolute inset-[-10%]"
      :style="{
        backgroundImage:
          `linear-gradient(to right, rgba(255,255,255,${opacity}) 1px, transparent 1px),
           linear-gradient(to bottom, rgba(255,255,255,${opacity}) 1px, transparent 1px)`,
        backgroundSize: `${size}px ${size}px`,
        transform: parallax
          ? 'translate3d(calc(var(--mx) * -20px), calc(var(--my) * -20px), 0)'
          : undefined,
        maskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 85%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 85%)'
      }"
    />
  </div>
</template>
