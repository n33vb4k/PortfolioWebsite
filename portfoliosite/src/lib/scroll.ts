import Lenis from 'lenis'

let lenis: Lenis | null = null

export const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function startSmoothScroll() {
  if (reducedMotion()) return () => {}
  lenis = new Lenis({
    duration: 1.25,
    easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)), // ease-out expo
  })
  let raf = 0
  const loop = (time: number) => {
    lenis?.raf(time)
    raf = requestAnimationFrame(loop)
  }
  raf = requestAnimationFrame(loop)
  return () => {
    cancelAnimationFrame(raf)
    lenis?.destroy()
    lenis = null
  }
}

export function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  if (lenis) lenis.scrollTo(el, { offset: id === 'top' ? 0 : -72 })
  else el.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth' })
}
