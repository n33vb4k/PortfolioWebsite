import { useEffect, useRef, useState } from 'react'
import SignalDesk from '../components/SignalDesk'
import { reducedMotion, scrollToId } from '../lib/scroll'
import { cv } from '../lib/content'

const Word = ({ text, offset }: { text: string; offset: number }) => (
  <>
    {text.split('').map((ch, i) => (
      <span key={i} aria-hidden style={{ transitionDelay: `${(offset + i) * 55}ms` }}>
        {ch}
      </span>
    ))}
  </>
)

export default function Hero() {
  const [on, setOn] = useState(false)
  const [settled, setSettled] = useState(false)
  const name = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    document.fonts.ready.then(() => requestAnimationFrame(() => setOn(true)))
  }, [])

  useEffect(() => {
    if (!on) return
    const t = setTimeout(() => setSettled(true), 2200)
    return () => clearTimeout(t)
  }, [on])

  // As the hero scrolls away, the name compresses along its width axis, its two
  // lines merge into one, and its real font size eases down to the header logo's.
  // It finishes at the logo's exact size, axes, spacing and position, then hands
  // over to the logo with no visible change. Font size (not a scale transform)
  // keeps the type sharp the whole way; the wrapper holds the layout still.
  useEffect(() => {
    const root = document.documentElement.style
    const h1 = name.current
    const frame = h1?.parentElement
    const logo = document.querySelector<HTMLElement>('[data-logo]')
    if (!h1 || !frame || !logo || reducedMotion()) {
      root.setProperty('--logo-o', '1')
      root.setProperty('--logo-v', 'visible')
      return
    }
    const [line1, line2] = Array.from(h1.children) as HTMLElement[]
    const firstOfLine2 = line2.firstElementChild as HTMLElement
    const logoB = logo.querySelector<HTMLElement>('[data-logo-b]')!
    const clamp = (v: number) => Math.min(1, Math.max(0, v))
    const smooth = (v: number) => v * v * (3 - 2 * v)
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    let raf = 0
    const update = () => {
      raf = 0
      const docTop = frame.offsetTop
      // The dock completes at 88% of the hero name's scroll distance
      const p = clamp(window.scrollY / ((docTop + frame.offsetHeight) * 0.88))
      const travel = smooth(p)
      const merge = smooth(clamp((p - 0.4) / 0.6))
      const squeeze = (p === 0 ? 0 : 1 - Math.pow(2, -10 * p)) * (1 - merge)

      const displayFs = parseFloat(getComputedStyle(frame).fontSize)
      const logoFs = parseFloat(getComputedStyle(logo).fontSize)
      const fs = lerp(displayFs, logoFs, travel)
      h1.style.fontSize = `${fs.toFixed(3)}px`
      h1.style.setProperty('--w', (112 - 50 * squeeze).toFixed(2))
      h1.style.setProperty('--g', (lerp(560, 620, merge) + 140 * squeeze).toFixed(1))
      h1.style.letterSpacing = `${lerp(-0.04, -0.01, merge).toFixed(4)}em`

      // Slide "Bakshi" up beside "Neev", to where the logo sets it
      const logoBox = logo.getBoundingClientRect()
      const bTarget = ((logoB.getBoundingClientRect().left - logoBox.left) / logoFs) * fs
      const dx = (bTarget - firstOfLine2.offsetLeft) * merge
      const dy = -(line2.offsetTop - line1.offsetTop) * merge
      line2.style.transform = `translate3d(${dx.toFixed(2)}px, ${dy.toFixed(2)}px, 0)`

      // Line centres meet: first display line and the logo's text
      const lineCentre = (line1.offsetHeight - 0.07 * fs) / 2
      const endTop = logoBox.top + logoBox.height / 2 - lineCentre
      const viewTop = lerp(docTop, endTop, travel)
      h1.style.transform = `translate3d(0, ${(viewTop - (docTop - window.scrollY)).toFixed(2)}px, 0)`

      const docked = p >= 1
      h1.style.visibility = docked ? 'hidden' : 'visible'
      root.setProperty('--logo-o', docked ? '1' : '0')
      root.setProperty('--logo-v', docked ? 'visible' : 'hidden')
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
  }, [])

  return (
    <section id="top" data-tone="#ECEFF1" className={`gutter pb-24 pt-24 md:pb-36 md:pt-28 ${on ? 'is-in' : ''}`}>
      <div className="t-display relative z-[60] h-[1.78em]">
      <h1 ref={name} aria-label="Neev Bakshi" className={`morph absolute left-0 top-0 font-normal ${on ? 'is-in' : ''} ${settled ? 'settled' : ''}`}>
        <span className="block overflow-hidden pb-[0.07em]">
          <Word text="Neev" offset={0} />
        </span>
        <span className="block overflow-hidden pb-[0.07em] pl-[0.62em] md:pl-[1.05em]">
          <Word text="Bakshi" offset={3} />
        </span>
      </h1>
      </div>

      <div className="relative mt-10 grid grid-cols-[minmax(0,1fr)] gap-12 md:mt-12 lg:grid-cols-12 lg:gap-10">
        <div className="fade-late lg:col-span-4" style={{ transitionDelay: '900ms' }}>
          <p className="t-lead max-w-[24ch]">I build AI agents and the automation around them.</p>
          <p className="mt-6 max-w-[40ch] text-slate">
            Computer Science and AI student at the University of Bath with experience building agentic AI systems at
            BlackRock and UBS.
          </p>
          <div className="mt-8 flex gap-7">
            <a href={cv} target="_blank" rel="noopener noreferrer" className="link-rest pb-0.5 font-medium text-cobalt">
              View CV
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                scrollToId('contact')
              }}
              className="link-draw pb-0.5 font-medium"
            >
              Get in touch
            </a>
          </div>
        </div>
        <div className="fade-late lg:col-span-8" style={{ transitionDelay: '1150ms' }}>
          <SignalDesk start={on} />
        </div>
      </div>
    </section>
  )
}
