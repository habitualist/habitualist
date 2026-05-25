<script setup lang="ts">
import { useCursorGlow } from '~/composables/useCursorGlow'
import { ref, onMounted } from 'vue'

useCursorGlow()

// Hide on touch devices
const enabled = ref(true)
onMounted(() => {
  enabled.value = window.matchMedia('(pointer: fine)').matches
})
</script>

<template>
  <div
    v-if="enabled"
    aria-hidden="true"
    class="pointer-events-none fixed inset-0 z-[3]"
    style="mix-blend-mode: screen"
  >
    <!-- Large soft glow -->
    <div
      class="absolute h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
      style="
        left: var(--cursor-x);
        top: var(--cursor-y);
        background: radial-gradient(circle, rgba(0,255,136,0.10) 0%, rgba(0,255,136,0.04) 30%, transparent 70%);
        filter: blur(40px);
      "
    />
    <!-- Tight inner dot -->
    <div
      class="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
      style="
        left: var(--cursor-x);
        top: var(--cursor-y);
        box-shadow: 0 0 12px rgba(0,255,136,0.8);
      "
    />
  </div>
</template>
