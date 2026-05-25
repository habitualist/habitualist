<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useNuxtApp } from '#app'

const navItems = [
  {
    id: 'home',
    label: 'Home',
    svgPath: 'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10'
  },
  {
    id: 'about',
    label: 'About',
    svgPath: 'M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 11a4 4 0 100-8 4 4 0 000 8z'
  },
  {
    id: 'projects',
    label: 'Work',
    svgPath: 'M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z'
  },
  {
    id: 'skills',
    label: 'Skills',
    svgPath: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z'
  },
  {
    id: 'experience',
    label: 'Exp.',
    svgPath: 'M20 7H4a2 2 0 00-2 2v11a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2'
  },
  {
    id: 'contact',
    label: 'Contact',
    svgPath: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6'
  },
]

const active = ref('home')
const mobileOpen = ref(false)
let observer: IntersectionObserver | null = null

const scrollTo = (id: string) => {
  mobileOpen.value = false
  const target = document.getElementById(id)
  if (!target) return
  const { $lenis } = useNuxtApp() as any
  if ($lenis?.scrollTo) {
    $lenis.scrollTo(target, { offset: -80, duration: 1.4 })
  } else {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible) active.value = visible.target.id
    },
    { threshold: [0.3, 0.6], rootMargin: '-80px 0px -40% 0px' }
  )
  navItems.forEach(i => {
    const el = document.getElementById(i.id)
    if (el) observer!.observe(el)
  })
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>

<template>
  <!-- ── DESKTOP lg+: vertical floating capsule ── -->
  <aside
    aria-label="Site navigation"
    class="hidden lg:flex fixed left-3 top-1/2 -translate-y-1/2 z-50"
  >
    <nav class="glass rounded-[2.5rem] border border-hairline flex flex-col items-center py-4 px-2 w-[90px] gap-0.5">

      <!-- Avatar + brand anchor -->
      <button
        aria-label="Back to top"
        class="flex flex-col items-center gap-1.5 py-2 px-1 w-full rounded-2xl
               hover:bg-elevated transition-colors duration-300 group mb-1"
        @click="scrollTo('home')"
      >
        <!-- Avatar ring: outer glow pulse + inner photo -->
        <div class="relative">
          <!-- Animated accent ring -->
          <div
            aria-hidden="true"
            class="absolute -inset-[3px] rounded-full animate-pulse-glow"
            style="background: conic-gradient(from 0deg, var(--accent) 0%, transparent 60%, var(--accent) 100%); opacity: 0.55;"
          />
          <!-- Photo circle -->
          <div
            class="relative w-12 h-12 rounded-full overflow-hidden border-2 border-accent/50
                   group-hover:border-accent transition-colors duration-300"
            style="box-shadow: 0 0 14px rgba(0,255,136,0.3);"
          >
            <NuxtImg
              src="/images/avatar.png"
              alt="Obinna Nnaochin"
              width="48"
              height="48"
              class="w-full h-full object-cover object-top scale-110"
              loading="eager"
            />
          </div>
        </div>
        <span class="font-mono text-[9px] font-semibold uppercase tracking-[0.08em] text-ink-dim
                     group-hover:text-accent transition-colors duration-300 leading-none">
          Habitualist
        </span>
      </button>

      <div class="w-9 h-px bg-hairline mb-1" />

      <!-- Nav items — icon + always-visible label -->
      <button
        v-for="item in navItems"
        :key="item.id"
        :aria-label="item.label === 'Exp.' ? 'Experience' : item.label"
        :aria-current="active === item.id ? 'page' : undefined"
        class="flex flex-col items-center gap-0.5 px-1 py-2 rounded-xl w-full
               transition-colors duration-300"
        :class="active === item.id
          ? 'text-accent bg-accent/5'
          : 'text-ink-dim hover:text-ink hover:bg-elevated'"
        @click="scrollTo(item.id)"
      >
        <svg
          width="15" height="15" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="1.8"
          stroke-linecap="round" stroke-linejoin="round"
          aria-hidden="true"
        >
          <path :d="item.svgPath" />
        </svg>
        <span class="font-mono text-[9px] font-semibold uppercase tracking-[0.08em] leading-none">
          {{ item.label }}
        </span>
      </button>

      <div class="w-9 h-px bg-hairline my-1" />

      <!-- Download CV -->
      <a
        href="/cv/Obinna_Nnaochin_CV.pdf"
        download
        aria-label="Download CV"
        class="flex flex-col items-center gap-0.5 px-1 py-2 rounded-xl w-full
               text-ink-dim hover:text-accent hover:bg-accent/5
               transition-colors duration-300"
      >
        <svg
          width="15" height="15" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="1.8"
          stroke-linecap="round" stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4 M7 10l5 5 5-5 M12 15V3" />
        </svg>
        <span class="font-mono text-[9px] font-semibold uppercase tracking-[0.05em] leading-tight text-center">Download CV</span>
      </a>

      <!-- GitHub -->
      <a
        href="https://github.com/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub profile"
        class="flex flex-col items-center gap-0.5 px-1 py-2 rounded-xl w-full
               text-ink-dim hover:text-ink hover:bg-elevated
               transition-colors duration-300"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0112 6.84a9.59 9.59 0 012.5.34c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85 0 1.34-.01 2.41-.01 2.74 0 .27.18.58.69.48A10 10 0 0022 12c0-5.52-4.48-10-10-10z" />
        </svg>
        <span class="font-mono text-[9px] font-semibold uppercase tracking-[0.08em] leading-none">GitHub</span>
      </a>

      <!-- LinkedIn -->
      <a
        href="https://linkedin.com/in/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn profile"
        class="flex flex-col items-center gap-0.5 px-1 py-2 rounded-xl w-full
               text-ink-dim hover:text-[#0A66C2] hover:bg-elevated
               transition-colors duration-300"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zM9 17H6.5v-7H9v7zm-1.25-8.07a1.44 1.44 0 110-2.88 1.44 1.44 0 010 2.88zM18 17h-2.5v-3.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5V17H10v-7h2.5v1c.5-.75 1.3-1 2-1 1.66 0 3 1.34 3 3v4z" />
        </svg>
        <span class="font-mono text-[9px] font-semibold uppercase tracking-[0.08em] leading-none">LinkedIn</span>
      </a>

    </nav>
  </aside>

  <!-- ── MOBILE / TABLET < lg: horizontal top bar ── -->
  <header
    class="lg:hidden fixed inset-x-0 top-0 z-50
           backdrop-blur-xl bg-base/80 border-b border-hairline"
  >
    <div class="container-x flex h-16 items-center justify-between">

      <!-- Brand -->
      <button
        class="flex items-center gap-2 group"
        aria-label="Back to top"
        @click="scrollTo('home')"
      >
        <div
          class="h-7 w-7 rounded-full border border-accent/40 bg-accent/5
                 flex items-center justify-center
                 group-hover:border-accent transition-colors duration-300"
        >
          <span class="font-display text-[0.72rem] text-accent leading-none select-none">H</span>
        </div>
        <span class="font-mono text-[11px] uppercase tracking-[0.2em] text-ink
                     group-hover:text-accent transition-colors duration-300">
          Habitualist
        </span>
      </button>

      <!-- Hamburger -->
      <button
        class="flex h-10 w-10 items-center justify-center rounded-full border border-hairline
               hover:border-hairline-glow transition-colors duration-300"
        :aria-expanded="mobileOpen"
        aria-label="Toggle navigation menu"
        @click="mobileOpen = !mobileOpen"
      >
        <span class="relative block h-3 w-5">
          <span
            class="absolute left-0 top-0 h-px w-full bg-ink transition-transform duration-300"
            :class="mobileOpen ? 'translate-y-[6px] rotate-45' : ''"
          />
          <span
            class="absolute left-0 top-3 h-px w-full bg-ink transition-transform duration-300"
            :class="mobileOpen ? '-translate-y-[6px] -rotate-45' : ''"
          />
        </span>
      </button>
    </div>

    <!-- Mobile dropdown sheet -->
    <Transition
      enter-active-class="transition duration-300 ease-out-expo"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="mobileOpen"
        class="border-t border-hairline bg-base/95 backdrop-blur-xl"
        role="dialog"
        aria-label="Navigation menu"
      >
        <nav class="container-x flex flex-col py-4 gap-1">
          <button
            v-for="item in navItems"
            :key="item.id"
            class="flex items-center justify-between rounded-lg px-4 py-3
                   font-mono text-sm uppercase tracking-[0.18em]
                   transition-colors hover:bg-elevated"
            :class="active === item.id ? 'text-accent' : 'text-ink-muted hover:text-ink'"
            @click="scrollTo(item.id)"
          >
            <span>{{ item.label === 'Exp.' ? 'Experience' : item.label }}</span>
            <svg
              width="13" height="13" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="1.8" stroke-linecap="round"
              aria-hidden="true"
            >
              <path d="M5 12h14 M12 5l7 7-7 7" />
            </svg>
          </button>

          <div class="my-2 h-px w-full bg-hairline" />

          <a
            href="/cv/Obinna_Nnaochin_CV.pdf"
            download
            class="flex items-center justify-between rounded-lg px-4 py-3
                   font-mono text-sm uppercase tracking-[0.18em]
                   text-ink-muted hover:text-accent hover:bg-elevated
                   transition-colors duration-300"
          >
            <span>Download CV</span>
            <svg
              width="13" height="13" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="1.8" stroke-linecap="round"
              aria-hidden="true"
            >
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4 M7 10l5 5 5-5 M12 15V3" />
            </svg>
          </a>

          <div class="flex items-center gap-4 px-4 py-3">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              class="flex items-center gap-2 font-mono text-xs uppercase tracking-wider
                     text-ink-dim hover:text-ink transition-colors duration-300"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0112 6.84a9.59 9.59 0 012.5.34c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85 0 1.34-.01 2.41-.01 2.74 0 .27.18.58.69.48A10 10 0 0022 12c0-5.52-4.48-10-10-10z" />
              </svg>
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              class="flex items-center gap-2 font-mono text-xs uppercase tracking-wider
                     text-ink-dim hover:text-ink transition-colors duration-300"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zM9 17H6.5v-7H9v7zm-1.25-8.07a1.44 1.44 0 110-2.88 1.44 1.44 0 010 2.88zM18 17h-2.5v-3.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5V17H10v-7h2.5v1c.5-.75 1.3-1 2-1 1.66 0 3 1.34 3 3v4z" />
              </svg>
              LinkedIn
            </a>
          </div>
        </nav>
      </div>
    </Transition>
  </header>
</template>