// Scroll-linked page tone. Each section can set data-tone="#rrggbb"; the page
// background blends between neighbouring tones as a boundary passes through
// the middle of the viewport, so there is never a hard edge between sections.

const hex = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16))

export function startToneShift() {
  const root = document.documentElement.style
  let raf = 0

  const update = () => {
    raf = 0
    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-tone]'))
    if (!sections.length) return
    const vh = window.innerHeight
    const line = window.scrollY + vh * 0.5 // the viewport's middle, in page coordinates
    const zone = vh * 0.45 // how long each blend takes to scroll through

    let rgb = hex(sections[0].dataset.tone!)
    for (let i = 1; i < sections.length; i++) {
      const edge = sections[i].offsetTop
      const t = Math.min(1, Math.max(0, (line - (edge - zone / 2)) / zone))
      if (t <= 0) break
      const e = t * t * (3 - 2 * t)
      const next = hex(sections[i].dataset.tone!)
      rgb = rgb.map((c, k) => c + (next[k] - c) * e)
    }
    root.setProperty('--page-bg', `rgb(${rgb.map((c) => Math.round(c)).join(' ')})`)
  }

  const onScroll = () => {
    if (!raf) raf = requestAnimationFrame(update)
  }
  update()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll)
  return () => {
    cancelAnimationFrame(raf)
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onScroll)
  }
}
