<script setup lang="ts">
interface Props { dot?: boolean }
withDefaults(defineProps<Props>(), { dot: true })
</script>

<template>
  <span
    class="inline-flex items-center gap-2 rounded-full border border-hairline
           bg-elevated/60 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em]
           text-ink-muted backdrop-blur-xs"
  >
    <span
      v-if="dot"
      class="inline-block h-1.5 w-1.5 rounded-full bg-accent animate-pulse-glow"
    />
    <slot />
  </span>
</template>
