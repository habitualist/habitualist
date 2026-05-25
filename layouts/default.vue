<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useMouse } from '~/composables/useMouse'
import { useScrollReveal } from '~/composables/useScrollReveal'
import { configureGsap } from '~/utils/motion'

// Mount global systems
useMouse()
useScrollReveal()

onMounted(() => {
  configureGsap()
})

// Starts true on both server and client → no hydration mismatch.
// The Preloader emits 'done' when its exit animation completes, then we unmount it.
const showPreloader = ref(true)
</script>

<template>
  <div class="relative min-h-screen bg-base text-ink">
    <!-- Preloader: rendered on first load, unmounted after exit animation -->
    <Preloader v-if="showPreloader" @done="showPreloader = false" />

    <!-- Cursor spotlight -->
    <CursorGlow />

    <!-- Subtle film grain over everything -->
    <div class="noise fixed inset-0 z-[1] pointer-events-none" />

    <!-- Sticky nav -->
    <AppNavbar />

    <!-- Page body -->
    <main class="relative z-[2]">
      <slot />
    </main>

    <AppFooter />
  </div>
</template>
