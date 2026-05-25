/**
 * useCursorGlow: tracks the cursor and exposes a lerped position
 * via --cursor-x / --cursor-y on <html>. CursorGlow.vue reads those.
 */
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { lerp } from '~/utils/motion'

export function useCursorGlow() {
  const tx = ref(0)
  const ty = ref(0)
  let rx = 0
  let ry = 0
  let raf = 0
  let running = true

  const onMove = (e: MouseEvent) => {
    rx = e.clientX
    ry = e.clientY
  }

  const tick = () => {
    if (!running) return
    tx.value = lerp(tx.value, rx, 0.18)
    ty.value = lerp(ty.value, ry, 0.18)
    document.documentElement.style.setProperty('--cursor-x', `${tx.value}px`)
    document.documentElement.style.setProperty('--cursor-y', `${ty.value}px`)
    raf = requestAnimationFrame(tick)
  }

  onMounted(() => {
    rx = window.innerWidth / 2
    ry = window.innerHeight / 2
    tx.value = rx
    ty.value = ry
    window.addEventListener('mousemove', onMove, { passive: true })
    raf = requestAnimationFrame(tick)
  })

  onBeforeUnmount(() => {
    running = false
    cancelAnimationFrame(raf)
    window.removeEventListener('mousemove', onMove)
  })

  return { tx, ty }
}
