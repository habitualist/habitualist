/**
 * useTilt: returns event handlers to attach to a card for a 3D tilt effect.
 *
 * Usage:
 *   const { onEnter, onMove, onLeave } = useTilt({ max: 8 })
 *   <div @mouseenter="onEnter" @mousemove="onMove" @mouseleave="onLeave">
 */
import gsap from 'gsap'

export function useTilt(options: { max?: number; perspective?: number; scale?: number } = {}) {
  const { max = 8, perspective = 900, scale = 1.02 } = options

  const onEnter = (e: MouseEvent) => {
    const el = e.currentTarget as HTMLElement
    gsap.to(el, { duration: 0.6, scale, ease: 'expo.out' })
    el.style.transformStyle = 'preserve-3d'
    el.style.perspective = `${perspective}px`
  }

  const onMove = (e: MouseEvent) => {
    const el = e.currentTarget as HTMLElement
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width   // 0..1
    const py = (e.clientY - rect.top) / rect.height
    const rx = (py - 0.5) * -2 * max
    const ry = (px - 0.5) *  2 * max

    gsap.to(el, {
      duration: 0.4,
      rotateX: rx,
      rotateY: ry,
      transformPerspective: perspective,
      ease: 'expo.out'
    })

    // Expose to children via CSS vars (for highlight sheen, etc.)
    el.style.setProperty('--tilt-x', `${(px * 100).toFixed(2)}%`)
    el.style.setProperty('--tilt-y', `${(py * 100).toFixed(2)}%`)
  }

  const onLeave = (e: MouseEvent) => {
    const el = e.currentTarget as HTMLElement
    gsap.to(el, {
      duration: 0.8,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      ease: 'expo.out'
    })
  }

  return { onEnter, onMove, onLeave }
}
