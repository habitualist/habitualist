<script setup lang="ts">
import { useTilt } from '~/composables/useTilt'

interface Props {
  max?: number
  scale?: number
}
const props = withDefaults(defineProps<Props>(), { max: 6, scale: 1.02 })
const { onEnter, onMove, onLeave } = useTilt({ max: props.max, scale: props.scale })
</script>

<template>
  <div
    class="relative will-change-transform"
    @mouseenter="onEnter"
    @mousemove="onMove"
    @mouseleave="onLeave"
  >
    <slot />
  </div>
</template>
