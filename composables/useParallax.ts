/**
 * useParallax: scroll-driven translate Y on a target element.
 * For mouse parallax, prefer setting CSS transforms with --mx/--my.
 */
import { onMounted, onBeforeUnmount, type Ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function useScrollParallax(
  target: Ref<HTMLElement | null>,
  options: { speed?: number; trigger?: HTMLElement | string } = {}
) {
  const { speed = 0.3 } = options
  let tween: gsap.core.Tween | null = null

  onMounted(() => {
    if (!target.value) return
    gsap.registerPlugin(ScrollTrigger)

    tween = gsap.to(target.value, {
      yPercent: -speed * 100,
      ease: 'none',
      scrollTrigger: {
        trigger: options.trigger ?? target.value,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    })
  })

  onBeforeUnmount(() => {
    tween?.scrollTrigger?.kill()
    tween?.kill()
  })
}
