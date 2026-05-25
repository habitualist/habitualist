<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const role = 'IT Specialist & Digital Consultant'
const status = ref('AVAILABLE FOR WORK')

const scrollIndicator = ref<HTMLElement | null>(null)
const globeWrapRef = ref<HTMLElement | null>(null)

let globeTween: gsap.core.Tween | null = null

onMounted(() => {
  if (scrollIndicator.value) {
    gsap.to(scrollIndicator.value, {
      y: 8,
      duration: 1.6,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true
    })
  }

  if (globeWrapRef.value) {
    globeTween = gsap.to(globeWrapRef.value, {
      scale: 0.7,
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: '#home',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    })
  }
})

onBeforeUnmount(() => {
  globeTween?.scrollTrigger?.kill()
  globeTween?.kill()
})

const scrollToProjects = () => {
  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
}
const scrollToContact = () => {
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section
    id="home"
    class="relative isolate flex min-h-screen w-full items-center overflow-hidden bg-base pt-20 lg:pt-0"
  >
    <!-- LAYER 1: Globe (full brightness, centered) -->
    <div
      ref="globeWrapRef"
      aria-hidden="true"
      class="pointer-events-none absolute inset-0 z-[1]"
    >
      <div
        class="h-full w-full opacity-90"
        style="transform: translate3d(calc(var(--mx) * -10px), calc(var(--my) * -10px), 0)"
      >
        <ClientOnly>
          <WireframeGlobe />
        </ClientOnly>
      </div>
    </div>

    <!-- LAYER 2: Animated grid -->
    <GridOverlay :size="80" :opacity="0.045" />

    <!-- LAYER 3: Floating glow orbs -->
    <GlowOrb
      class="left-[-10%] top-[10%]"
      size="600px"
      color="rgba(0, 255, 136, 0.18)"
      :blur="120"
      :parallax-strength="50"
    />
    <GlowOrb
      class="right-[-10%] bottom-[10%]"
      size="500px"
      color="rgba(64, 128, 255, 0.12)"
      :blur="100"
      :parallax-strength="40"
    />

    <!-- LAYER 4: Vignette -->
    <div
      aria-hidden="true"
      class="pointer-events-none absolute inset-0 z-[2]"
      style="background: radial-gradient(ellipse 100% 60% at 50% 50%, transparent 0%, rgba(5,6,10,0.7) 100%);"
    />

    <!-- LAYER 5: Content -->
    <div class="container-x relative z-[10] w-full">
      <div class="flex flex-col items-center lg:flex-row lg:items-center lg:justify-between gap-10 lg:gap-16">

        <!-- LEFT: Text content -->
        <div class="flex flex-col items-center text-center lg:items-start lg:text-left flex-1">

          <!-- Status row -->
          <FadeUp :delay="0.1" class="mb-8 flex items-center gap-3 flex-wrap justify-center lg:justify-start">
            <AppBadge>{{ status }}</AppBadge>
            <span class="hidden sm:inline-block font-mono text-[10px] uppercase tracking-[0.22em] text-ink-dim">
              BASED IN LAGOS · REMOTE WORLDWIDE
            </span>
          </FadeUp>

          <!-- HEADLINE -->
          <h1
            class="font-display uppercase text-display-lg text-balance text-ink text-glow max-w-[20ch]"
          >
            <span class="block overflow-hidden">
              <SplitTextReveal
                text="Crafting Digital"
                :stagger="0.025"
                :delay="0.2"
                as="span"
                class-name="block"
              />
            </span>
            <span class="block overflow-hidden">
              <SplitTextReveal
                text="Experiences That"
                :stagger="0.025"
                :delay="0.35"
                as="span"
                class-name="block"
              />
            </span>
            <span class="block overflow-hidden">
              <SplitTextReveal
                text="Feel Alive"
                :stagger="0.025"
                :delay="0.5"
                as="span"
                class-name="block text-accent"
              />
            </span>
          </h1>

          <!-- Accent underline -->
          <FadeUp :delay="0.68" class="mt-4 flex items-center gap-2">
            <span class="block h-[2px] w-16 bg-accent rounded-full" />
            <span class="block h-[2px] w-8 bg-accent/30 rounded-full" />
          </FadeUp>

          <!-- Subheadline -->
          <FadeUp :delay="0.9" class="mt-8 max-w-xl">
            <p class="text-base md:text-lg leading-relaxed text-ink-muted text-balance">
              Obinna builds and maintains web applications, automates workflows,
              and delivers <strong class="text-ink font-semibold">hands-on IT support and training</strong> —
              combining full-stack development, AI tooling, and technical consulting.
              He also <strong class="text-ink font-semibold">teaches and trains individuals on IT skills</strong>,
              from basic computer literacy to intermediate tech and computer skills.
            </p>
          </FadeUp>

          <!-- CTAs -->
          <FadeUp :delay="1.1" class="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-4">
            <AppButton variant="primary" size="lg" @click="scrollToProjects">
              View Projects
            </AppButton>
            <AppButton variant="ghost" size="lg" @click="scrollToContact">
              Contact Me
            </AppButton>
          </FadeUp>

          <!-- Role line -->
          <FadeUp :delay="1.3" class="mt-14 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.24em] text-ink-muted">
            <span class="h-px w-12 bg-hairline" />
            <span>{{ role }}</span>
            <span class="h-px w-12 bg-hairline" />
          </FadeUp>
        </div>

        <!-- RIGHT: Portrait with glowing HUD frame — desktop only -->
        <FadeUp :delay="0.4" class="hidden lg:flex flex-shrink-0 items-center">
          <div
            class="relative overflow-hidden rounded-2xl"
            style="
              width: 340px;
              aspect-ratio: 3/4;
              border: 1.5px solid rgba(0, 255, 136, 0.55);
              box-shadow:
                0 0 0 1px rgba(0, 255, 136, 0.06),
                0 0 25px rgba(0, 255, 136, 0.28),
                0 0 60px rgba(0, 255, 136, 0.14),
                0 0 100px rgba(0, 255, 136, 0.06);
            "
          >
            <!-- Corner accent marks -->
            <span
              aria-hidden="true"
              class="pointer-events-none absolute top-0 left-0 h-8 w-8 border-t-2 border-l-2 border-accent rounded-tl-2xl z-[4]"
            />
            <span
              aria-hidden="true"
              class="pointer-events-none absolute bottom-0 right-0 h-8 w-8 border-b-2 border-r-2 border-accent rounded-br-2xl z-[4]"
            />

            <!-- Placeholder shown behind image -->
            <div class="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-elevated z-[1]">
              <div class="flex h-16 w-16 items-center justify-center rounded-full border border-hairline-glow bg-base">
                <span class="font-display text-3xl text-accent leading-none select-none">ON</span>
              </div>
            </div>

            <NuxtImg
              src="/images/obi1.jpeg"
              alt="Obinna Nnaochin — IT Specialist & Digital Consultant"
              width="340"
              height="453"
              loading="eager"
              class="absolute inset-0 w-full h-full object-cover object-top z-[2]"
            />

            <!-- Bottom fade -->
            <div
              aria-hidden="true"
              class="pointer-events-none absolute inset-x-0 bottom-0 z-[3]"
              style="height: 65%; background: linear-gradient(to bottom, transparent 0%, rgba(5,6,10,0.6) 40%, var(--bg-base) 75%);"
            />
          </div>
        </FadeUp>

      </div>
    </div>

    <!-- Corner technical labels -->
    <div class="pointer-events-none absolute inset-0 z-[5]">
      <!-- Top-right -->
      <div class="absolute right-6 top-24 md:right-10 md:top-28 text-right font-mono text-[10px] uppercase tracking-[0.22em] text-ink-dim">
        <div>LAT 6.5244°N</div>
        <div>LNG 3.3792°E</div>
      </div>
      <!-- Bottom-left -->
      <div class="absolute left-6 bottom-10 md:left-10 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-dim">
        <div>SYS / READY</div>
        <div class="mt-2 flex items-center gap-2">
          <span class="inline-block h-1 w-1 rounded-full bg-accent animate-pulse-glow" />
          <span>UPTIME 100%</span>
        </div>
      </div>
      <!-- Bottom-right scroll indicator -->
      <div
        ref="scrollIndicator"
        class="absolute right-6 md:right-10 bottom-10 flex flex-col items-center gap-2
               font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted"
      >
        <span>SCROLL</span>
        <svg width="12" height="20" viewBox="0 0 12 20" fill="none">
          <path d="M6 1v18m0 0l-4-4m4 4l4-4"
            stroke="currentColor" stroke-width="1.2" stroke-linecap="round" />
        </svg>
      </div>
    </div>
  </section>
</template>
