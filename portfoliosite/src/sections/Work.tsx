import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import SectionHead from '../components/SectionHead'
import Preview from '../components/Previews'
import { projects, type Project } from '../lib/content'

const EXPO = [0.16, 1, 0.3, 1] as const

function Toggle({ open }: { open: boolean }) {
  return (
    <span aria-hidden className="relative block h-4 w-4 shrink-0">
      <span className="absolute left-0 top-1/2 h-[1.5px] w-4 -translate-y-1/2 bg-current" />
      <span
        className={`absolute left-1/2 top-0 h-4 w-[1.5px] -translate-x-1/2 bg-current transition-transform duration-700 ease-expo ${
          open ? 'rotate-90' : ''
        }`}
      />
    </span>
  )
}

function ProjectRow({ p }: { p: Project }) {
  const [open, setOpen] = useState(false)
  const id = useId()
  return (
    <li>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        className="group grid w-full grid-cols-[1fr_auto] items-baseline gap-x-6 py-4 text-left md:py-5 md:grid-cols-12 md:gap-x-10"
      >
        <span
          className="t-lead transition-transform duration-700 ease-expo group-hover:translate-x-2 md:col-span-4"
          style={{ fontVariationSettings: "'wdth' 108, 'wght' 580" }}
        >
          {p.title}
        </span>
        <span className="col-span-2 row-start-2 mt-1 text-slate md:col-span-6 md:col-start-6 md:row-start-1 md:mt-0">
          {p.what}
        </span>
        <span className="col-start-2 row-start-1 self-center text-slate transition-colors duration-500 group-hover:text-cobalt md:col-span-1 md:col-start-12 md:justify-self-end">
          <Toggle open={open} />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.8, ease: EXPO }}
            className="overflow-hidden"
          >
            <div className="grid gap-x-10 gap-y-6 pb-12 pt-2 md:grid-cols-12">
              <div className="md:col-span-4 md:row-span-2">
                <Preview kind={p.preview} />
              </div>
              <p className="max-w-[60ch] md:col-span-6 md:col-start-6">{p.description}</p>
              <div className="t-small text-slate md:col-span-6 md:col-start-6">
                <p>Built with {p.stack.join(', ')}</p>
                <p className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noopener noreferrer" className="link-rest font-medium text-cobalt">
                      Open the live site
                    </a>
                  )}
                  {p.source ? (
                    <a href={p.source} target="_blank" rel="noopener noreferrer" className="link-rest font-medium text-cobalt">
                      {p.sourceLabel ?? 'View source on GitHub'}
                    </a>
                  ) : (
                    <span>Source is private</span>
                  )}
                </p>
                {p.credit && <p className="mt-3">{p.credit}</p>}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  )
}

export default function Work() {
  return (
    <section id="work" data-tone="#F5F6F8" className="gutter py-24 md:py-36">
      <SectionHead title="Work" />
      <ul className="mt-10 md:mt-14">
        {projects.map((p) => (
          <ProjectRow key={p.title} p={p} />
        ))}
      </ul>
    </section>
  )
}
