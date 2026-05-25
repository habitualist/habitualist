/**
 * Tracks the mouse globally and writes normalized coords (-1..1)
 * to CSS variables --mx and --my on <html>. Use those vars in CSS
 * for cheap, GPU-friendly parallax.
 *
 * Also exposes reactive refs for use in JS.
 */
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { lerp } from '~/utils/motion'

export function useMouse(options: { lerpAmount?: number } = {}) {
  const { lerpAmount = 0.08 } = options

  const x = ref(0)         // raw, normalized -1..1
  const y = ref(0)
  const smoothX = ref(0)   // eased
  const smoothY = ref(0)

  let raf = 0
  let running = true

  const onMove = (e: MouseEvent) => {
    x.value = (e.clientX / window.innerWidth) * 2 - 1
    y.value = (e.clientY / window.innerHeight) * 2 - 1
  }

  const tick = () => {
    if (!running) return
    smoothX.value = lerp(smoothX.value, x.value, lerpAmount)
    smoothY.value = lerp(smoothY.value, y.value, lerpAmount)
    document.documentElement.style.setProperty('--mx', smoothX.value.toFixed(4))
    document.documentElement.style.setProperty('--my', smoothY.value.toFixed(4))
    raf = requestAnimationFrame(tick)
  }

  onMounted(() => {
    window.addEventListener('mousemove', onMove, { passive: true })
    raf = requestAnimationFrame(tick)
  })

  onBeforeUnmount(() => {
    running = false
    cancelAnimationFrame(raf)
    window.removeEventListener('mousemove', onMove)
  })

  return { x, y, smoothX, smoothY }
}
