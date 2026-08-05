<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="relative z-[2] border-t border-hairline bg-base">
    <div class="container-x py-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

      <!-- Left: status dot + availability -->
      <div class="flex items-center gap-2 font-mono text-xs text-ink-muted">
        <span class="inline-block h-1.5 w-1.5 rounded-full bg-accent animate-pulse-glow flex-shrink-0" />
        <span>AVAILABLE FOR WORK — {{ year }}</span>
      </div>

      <!-- Centre: email -->
      <a
        href="mailto:nnaochinobinna001@gmail.com"
        class="font-mono text-xs text-ink-muted hover:text-accent transition-colors duration-300 break-all"
      >
        nnaochinobinna001@gmail.com
      </a>

      <!-- Right: copyright -->
      <div class="font-mono text-xs text-ink-dim">
        © {{ year }} Obinna Nnaochin — Habitualist
      </div>

    </div>
  </footer>
</template>
