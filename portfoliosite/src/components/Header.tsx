import { useEffect, useState } from 'react'
import { scrollToId } from '../lib/scroll'
import { cv } from '../lib/content'

const NAV = [
  { id: 'work', label: 'Work' },
  { id: 'background', label: 'Background' },
  { id: 'contact', label: 'Contact' },
]

export default function Header() {
  const [raised, setRaised] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setRaised(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    NAV.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    const top = document.getElementById('top')
    if (top) io.observe(top)
    return () => {
      window.removeEventListener('scroll', onScroll)
      io.disconnect()
    }
  }, [])

  return (
    <header
      className={`gutter fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between gap-3 transition-[background-color] duration-700 ease-expo ${raised ? 'backdrop-blur-md' : ''}`}
      style={{ backgroundColor: raised ? 'color-mix(in srgb, var(--page-bg, #ECEFF1) 80%, transparent)' : 'transparent' }}
    >
      <a
        href="#top"
        onClick={(e) => {
          e.preventDefault()
          scrollToId('top')
        }}
        data-logo
        aria-label="Neev Bakshi, back to top"
        className="whitespace-nowrap tracking-[-0.01em] max-[359px]:text-[0.88rem]"
        style={{
          opacity: 'var(--logo-o, 0)',
          visibility: 'var(--logo-v, hidden)' as 'hidden',
          fontVariationSettings: "'wdth' 112, 'wght' 620",
        }}
      >
        Neev <span data-logo-b>Bakshi</span>
      </a>
      <nav aria-label="Sections">
        <ul className="flex gap-4 t-small max-[359px]:gap-2.5 max-[359px]:text-[0.72rem] sm:gap-8 sm:text-[0.94rem]">
          {NAV.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToId(id)
                }}
                aria-current={active === id ? 'true' : undefined}
                className={`link-draw pb-0.5 transition-colors duration-500 ${active === id ? 'text-cobalt' : 'text-ink'}`}
              >
                {label}
              </a>
            </li>
          ))}
          <li className="hidden sm:block">
            <a href={cv} target="_blank" rel="noopener noreferrer" className="link-rest pb-0.5 font-medium text-cobalt">
              CV
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}
