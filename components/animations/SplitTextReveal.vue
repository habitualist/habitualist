<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import gsap from 'gsap'
import { splitText } from '~/composables/useSplitText'

interface Props {
  text: string
  mode?: 'chars' | 'words'
  delay?: number
  stagger?: number
  duration?: number
  trigger?: 'mount' | 'in-view'
  as?: string
  className?: string
}
const props = withDefaults(defineProps<Props>(), {
  mode: 'chars',
  delay: 0,
  stagger: 0.025,
  duration: 1.1,
  trigger: 'mount',
  as: 'span'
})

const root = ref<HTMLElement | null>(null)

// Module-level cleanup handles: fallback timer, IntersectionObserver, in-flight tweens.
let fallbackTimer: ReturnType<typeof setTimeout> | null = null
let observer: IntersectionObserver | null = null
let activeItems: HTMLElement[] = []

// Guarantee the final visible state regardless of how we get there.
// killTweensOf prevents a mid-flight tween from overwriting us,
// clearProps removes all GSAP-owned inline styles so nothing lingers.
const makeVisible = () => {
  if (!activeItems.length) return
  gsap.killTweensOf(activeItems)
  gsap.set(activeItems, { clearProps: 'transform,clipPath' })
}

const runAnimation = (items: HTMLElement[]) => {
  gsap.to(items, {
    yPercent: 0,
    clipPath: 'inset(0% 0 0 0)',
    duration: props.duration,
    delay: props.delay,
    stagger: props.stagger,
    ease: 'expo.out',
    onComplete () {
      clearTimeout(fallbackTimer!)
      fallbackTimer = null
      makeVisible()
    }
  })
}

onMounted(() => {
  const el = root.value
  if (!el) return

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  activeItems = splitText(el, props.mode)

  // prefers-reduced-motion: skip animation entirely, show text immediately.
  if (reducedMotion) {
    makeVisible()
    return
  }

  // GSAP takes over both properties from the inline state set by splitText,
  // ensuring it owns the full transform+clipPath from the first frame.
  gsap.set(activeItems, { yPercent: 40, clipPath: 'inset(100% 0 0 0)' })

  // Worst-case safety net: if the GSAP tween is ever dropped (tab hidden during
  // the delay window, ticker stutter, preloader interaction, etc.) this timer
  // forces the final state so text is never left invisible.
  const safetyMs =
    (props.delay + props.duration + props.stagger * activeItems.length + 1) * 1000
  fallbackTimer = setTimeout(makeVisible, safetyMs)

  if (props.trigger === 'mount') {
    runAnimation(activeItems)
  } else {
    observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue
          runAnimation(activeItems)
          observer!.disconnect()
          observer = null
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
  }
})

onBeforeUnmount(() => {
  if (fallbackTimer) clearTimeout(fallbackTimer)
  observer?.disconnect()
  // Kill in-flight tweens so they don't fire into an unmounted component.
  if (activeItems.length) gsap.killTweensOf(activeItems)
})
</script>

<template>
  <component :is="as" ref="root" :class="className">{{ text }}</component>
</template>
