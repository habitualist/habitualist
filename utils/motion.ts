import gsap from 'gsap'

// Set sensible defaults once
export function configureGsap() {
  gsap.defaults({
    ease: 'expo.out',
    duration: 1
  })
}

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t

export const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v))
