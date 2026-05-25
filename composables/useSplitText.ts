/**
 * useSplitText: minimal splitter (no GSAP SplitText license needed).
 * Wraps each char/word in a span with a parent that has overflow:hidden
 * so the child can be translated from below.
 */
export function splitText(
  el: HTMLElement,
  mode: 'chars' | 'words' = 'chars'
): HTMLElement[] {
  const text = el.textContent ?? ''
  el.textContent = ''
  el.setAttribute('aria-label', text)

  const items: HTMLElement[] = []
  const units = mode === 'words' ? text.split(/(\s+)/) : Array.from(text)

  for (const u of units) {
    if (/^\s+$/.test(u)) {
      el.appendChild(document.createTextNode(u))
      continue
    }
    const wrap = document.createElement('span')
    wrap.className = 'reveal-mask'
    wrap.setAttribute('aria-hidden', 'true')

    const inner = document.createElement('span')
    inner.textContent = u
    inner.style.display = 'inline-block'
    // clip-path owns the masking; Y translate adds physical movement depth.
    // clip-path: inset(100% 0 0 0) → top inset 100% = visible region starts at
    // the very bottom of the element (zero height) → fully hidden.
    inner.style.clipPath = 'inset(100% 0 0 0)'
    inner.style.transform = 'translateY(40%)'
    inner.style.willChange = 'transform, clip-path'

    wrap.appendChild(inner)
    el.appendChild(wrap)
    items.push(inner)
  }
  return items
}
