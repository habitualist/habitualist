export const easings = {
  outExpo: 'cubic-bezier(0.16, 1, 0.3, 1)',
  inOutCubic: 'cubic-bezier(0.65, 0, 0.35, 1)',
  outQuart: 'cubic-bezier(0.25, 1, 0.5, 1)',
  outBack: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
} as const

// GSAP-compatible
export const gsapEase = {
  outExpo: 'expo.out',
  inOutCubic: 'cubic.inOut',
  outQuart: 'quart.out',
  outBack: 'back.out(1.7)'
} as const
