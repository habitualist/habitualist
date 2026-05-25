<script setup lang="ts">
interface Props {
  delay?: number
  variant?: 'fade-up' | 'fade' | 'stagger-children'
  as?: string
}
withDefaults(defineProps<Props>(), {
  delay: 0,
  variant: 'fade-up',
  as: 'div'
})
</script>

<template>
  <component
    :is="as"
    data-reveal
    :data-reveal-variant="variant"
    :data-reveal-delay="delay"
  >
    <slot />
  </component>
</template>
