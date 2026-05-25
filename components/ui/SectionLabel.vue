<script setup lang="ts">
interface Props {
  num: string
  label: string
}
defineProps<Props>()
</script>

<template>
  <div class="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-muted">
    <span class="text-accent">/ {{ num }}</span>
    <span class="h-px w-8 bg-hairline" />
    <span>{{ label }}</span>
  </div>
</template>
