/**
 * useScrollReveal: animate elements with [data-reveal] when in view.
 * Variants via data-reveal-variant: "fade-up" (default), "fade", "stagger-children".
 */
import { onMounted, onBeforeUnmount } from 'vue'
import gsap from 'gsap'

type Variant = 'fade-up' | 'fade' | 'stagger-children'

export function useScrollReveal(root?: HTMLElement | null) {
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    const scope = root ?? document
    const targets = scope.querySelectorAll<HTMLElement>('[data-reveal]')

    if (!targets.length) return

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const el = entry.target as HTMLElement
          const variant = (el.dataset.revealVariant as Variant) ?? 'fade-up'
          const delay = parseFloat(el.dataset.revealDelay ?? '0')
          play(el, variant, delay)
          observer?.unobserve(el)
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
    )

    targets.forEach((t) => {
      prepare(t, (t.dataset.revealVariant as Variant) ?? 'fade-up')
      observer!.observe(t)
    })
  })

  onBeforeUnmount(() => observer?.disconnect())
}

function prepare(el: HTMLElement, variant: Variant) {
  if (variant === 'fade-up') {
    gsap.set(el, { y: 40, autoAlpha: 0 })
  } else if (variant === 'fade') {
    gsap.set(el, { autoAlpha: 0 })
  } else if (variant === 'stagger-children') {
    gsap.set(el.children, { y: 30, autoAlpha: 0 })
  }
}

function play(el: HTMLElement, variant: Variant, delay: number) {
  if (variant === 'fade-up') {
    gsap.to(el, { y: 0, autoAlpha: 1, duration: 1.1, delay, ease: 'expo.out' })
  } else if (variant === 'fade') {
    gsap.to(el, { autoAlpha: 1, duration: 1, delay, ease: 'expo.out' })
  } else if (variant === 'stagger-children') {
    gsap.to(el.children, {
      y: 0,
      autoAlpha: 1,
      duration: 1,
      delay,
      ease: 'expo.out',
      stagger: 0.08
    })
  }
}
