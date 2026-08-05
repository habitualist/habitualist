<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useTilt } from '~/composables/useTilt'

interface Props {
  max?: number
  scale?: number
}
const props = withDefaults(defineProps<Props>(), { max: 6, scale: 1.02 })
const { onEnter, onMove, onLeave } = useTilt({ max: props.max, scale: props.scale })

// Only bind tilt handlers on fine-pointer (desktop) devices
const isFinePointer = ref(false)
onMounted(() => {
  isFinePointer.value = window.matchMedia('(pointer: fine)').matches
})
</script>

<template>
  <div
    class="relative will-change-transform"
    @mouseenter="isFinePointer ? onEnter($event) : undefined"
    @mousemove="isFinePointer ? onMove($event) : undefined"
    @mouseleave="isFinePointer ? onLeave($event) : undefined"
  >
    <slot />
  </div>
</template>
