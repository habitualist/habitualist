<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="relative z-[2] border-t border-hairline bg-base">
    <div class="container-x py-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
      <div class="flex items-center gap-2 font-mono text-xs text-ink-muted">
        <span class="inline-block h-1.5 w-1.5 rounded-full bg-accent animate-pulse-glow" />
        <span>AVAILABLE FOR WORK — {{ year }}</span>
      </div>
      <div class="font-mono text-xs text-ink-dim">
        © {{ year }} Obinna Nnaochin — Habitualist
      </div>
    </div>
  </footer>
</template>
