import { useEffect } from 'react'
import { Analytics } from '@vercel/analytics/react'
import Header from './components/Header'
import Hero from './sections/Hero'
import Work from './sections/Work'
import Background from './sections/Background'
import Contact from './sections/Contact'
import { startSmoothScroll } from './lib/scroll'
import { startToneShift } from './lib/tone'

export default function App() {
  useEffect(() => startSmoothScroll(), [])
  useEffect(() => startToneShift(), [])
  return (
    <>
      <a href="#work" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-white focus:px-3 focus:py-2">
        Skip to work
      </a>
      <Header />
      <main>
        <Hero />
        <Work />
        <Background />
        <Contact />
      </main>
      <Analytics />
    </>
  )
}
