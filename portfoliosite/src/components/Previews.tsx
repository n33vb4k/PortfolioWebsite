import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { reducedMotion } from '../lib/scroll'

export type PreviewKind = 'speakers' | 'workflow' | 'llm' | 'trade' | 'terminal' | 'maze' | 'classifier' | 'type'

const C = {
  raise: '#16243A',
  wall: '#22355A',
  text: '#E6EAEE',
  dim: '#8C97A6',
  glow: '#8A9BFF',
  long: '#1F9D6B',
  short: '#E0574A',
  pac: '#F2C94C',
}

function Frame({ caption, children }: { caption: string; children: ReactNode }) {
  return (
    <figure>
      <div className="relative aspect-[16/10] overflow-hidden rounded-[5px] bg-ink text-[#E6EAEE]" aria-hidden>
        {children}
      </div>
      <figcaption className="mt-3 t-small text-slate">{caption}</figcaption>
    </figure>
  )
}

/* Canvas loop: sizes for DPR, runs only while mounted, draws one frame under reduced motion */
function useCanvas(draw: (ctx: CanvasRenderingContext2D, w: number, h: number, dt: number) => void) {
  const ref = useRef<HTMLCanvasElement>(null)
  const drawRef = useRef(draw)
  drawRef.current = draw
  useEffect(() => {
    const cv = ref.current
    if (!cv) return
    const ctx = cv.getContext('2d')
    if (!ctx) return
    let w = 0
    let h = 0
    const size = () => {
      const r = cv.getBoundingClientRect()
      const d = Math.min(2, window.devicePixelRatio || 1)
      w = r.width
      h = r.height
      cv.width = Math.round(w * d)
      cv.height = Math.round(h * d)
      ctx.setTransform(d, 0, 0, d, 0, 0)
    }
    size()
    const ro = new ResizeObserver(size)
    ro.observe(cv)
    const still = reducedMotion()
    let last = performance.now()
    let raf = 0
    const loop = (t: number) => {
      const dt = Math.min(64, t - last)
      last = t
      drawRef.current(ctx, w, h, still ? 16 : dt)
      if (!still) raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [])
  return ref
}

/* Text script player: each step is a full screen of text and how long to hold it */
type Step = { text: string; ms: number }
const typeOut = (base: string, text: string, ms = 38): Step[] =>
  [...text].map((_, k) => ({ text: base + text.slice(0, k + 1), ms }))
const streamWords = (base: string, text: string, ms = 70): Step[] => {
  const words = text.split(/(?<=\s)/)
  return words.map((_, k) => ({ text: base + words.slice(0, k + 1).join(''), ms }))
}

function useScript(build: () => Step[]) {
  const steps = useMemo(build, []) // eslint-disable-line react-hooks/exhaustive-deps
  const still = reducedMotion()
  const [i, setI] = useState(still ? steps.length - 1 : 0)
  useEffect(() => {
    if (still) return
    const id = setTimeout(() => setI((x) => (x + 1) % steps.length), steps[i].ms)
    return () => clearTimeout(id)
  }, [i, steps, still])
  return steps[i].text
}

function Screen({ text }: { text: string }) {
  return (
    <pre className="absolute inset-0 whitespace-pre-wrap p-5 font-sans text-[0.8rem] leading-[1.6] tnum">
      {text}
      <span className="ml-px inline-block h-[1em] w-[2px] translate-y-[0.15em] animate-pulse bg-white/80" />
    </pre>
  )
}

/* Navaic: a workflow graph with work flowing through it */
function Workflow() {
  const still = reducedMotion()
  const nodes = [
    { id: 'form', x: 40, y: 100, label: 'Web form' },
    { id: 'enrich', x: 130, y: 52, label: 'Enrich' },
    { id: 'score', x: 130, y: 148, label: 'AI score' },
    { id: 'crm', x: 220, y: 100, label: 'CRM' },
    { id: 'email', x: 300, y: 52, label: 'Follow-up' },
    { id: 'notion', x: 300, y: 148, label: 'Notion' },
  ]
  const at = (id: string) => nodes.find((n) => n.id === id)!
  const edges = [
    ['form', 'enrich'],
    ['form', 'score'],
    ['enrich', 'crm'],
    ['score', 'crm'],
    ['crm', 'email'],
    ['crm', 'notion'],
  ]
  const path = (a: string, b: string) => {
    const p = at(a)
    const q = at(b)
    const mx = (p.x + q.x) / 2
    return `M${p.x} ${p.y} C${mx} ${p.y} ${mx} ${q.y} ${q.x} ${q.y}`
  }
  return (
    <svg viewBox="0 0 340 200" className="absolute inset-0 h-full w-full">
      {edges.map(([a, b], i) => (
        <path key={i} id={`wf-${i}`} d={path(a, b)} fill="none" stroke="rgba(230,234,238,0.18)" strokeWidth="1.2" />
      ))}
      {!still &&
        edges.map(([a], i) => (
          <circle key={`p${i}`} r="2.6" fill={C.glow}>
            <animateMotion dur="1.6s" repeatCount="indefinite" begin={`${(a === 'form' ? 0 : a === 'crm' ? 1.6 : 0.8) + (i % 2) * 0.25}s`}>
              <mpath href={`#wf-${i}`} />
            </animateMotion>
          </circle>
        ))}
      {nodes.map((n) => (
        <g key={n.id}>
          <rect x={n.x - 30} y={n.y - 13} width="60" height="26" rx="4" fill={C.raise} stroke="rgba(230,234,238,0.22)" />
          <text x={n.x} y={n.y + 4} textAnchor="middle" fontSize="10" fill={C.text} fontFamily="Archivo">
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  )
}

/* Jarvis: a local model answering */
function LocalLLM() {
  const text = useScript(() => {
    const head = 'jarvis  ~  ollama, llama3, on this machine\n\n'
    const ask = '> plan my morning from the calendar'
    const answer =
      '\n\n09:00  Standup, 15 minutes\n09:30  Two hours of focus on LazyTrader\n11:45  Gym, calendar is clear until 13:00\n\nNothing here left the machine.'
    return [
      { text: head, ms: 700 },
      ...typeOut(head, ask, 42),
      { text: head + ask, ms: 500 },
      ...streamWords(head + ask, answer, 75),
      { text: head + ask + answer, ms: 2600 },
    ]
  })
  return <Screen text={text} />
}

/* MCP Chat: @ mentions and slash commands in a terminal */
function Terminal() {
  const text = useScript(() => {
    const ask = '> what shipped in @rel'
    const menu = '\n    @release-notes.md\n    @roadmap.md'
    const done = '> what shipped in @release-notes.md'
    const reply =
      '\n\nclaude  Version 0.4 added tab completion for slash\n        commands and a tool registry for MCP servers.\n\n> /'
    const cmds = '\n    /summarise   /tools   /clear'
    return [
      { text: '', ms: 500 },
      ...typeOut('', ask, 55),
      { text: ask + menu, ms: 1100 },
      { text: done, ms: 600 },
      ...streamWords(done, reply, 80),
      { text: done + reply + cmds, ms: 2600 },
    ]
  })
  return <Screen text={text} />
}

/* Signal copier: a trade running to its target or stop */
function TradeRun() {
  const sim = useRef({ pts: [2341] as number[], acc: 0, hold: 0, result: '' })
  const ref = useCanvas((ctx, w, h, dt) => {
    const s = sim.current
    const entry = 2341
    const sl = 2335
    const tp = 2352
    s.acc += dt
    if (s.hold > 0) {
      s.hold -= dt
      if (s.hold <= 0) Object.assign(s, { pts: [entry], result: '' })
    } else {
      while (s.acc > 55 && !s.result) {
        s.acc -= 55
        const last = s.pts[s.pts.length - 1]
        const next = last + (Math.random() - 0.46) * 0.9
        s.pts.push(next)
        if (next >= tp) s.result = 'Target hit, +11.0'
        else if (next <= sl) s.result = 'Stopped out, -6.0'
        if (s.result) s.hold = 2200
      }
    }
    s.acc = Math.min(s.acc, 200)

    const pad = 16
    const lo = 2332
    const hi = 2355
    const y = (v: number) => pad + ((hi - v) / (hi - lo)) * (h - pad * 2)
    ctx.clearRect(0, 0, w, h)
    ctx.font = '10px Archivo'
    const level = (v: number, color: string, label: string) => {
      ctx.strokeStyle = color
      ctx.setLineDash([3, 4])
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(pad, y(v))
      ctx.lineTo(w - 70, y(v))
      ctx.stroke()
      ctx.setLineDash([])
      ctx.fillStyle = color
      ctx.fillText(label, w - 64, y(v) + 3.5)
    }
    level(tp, C.long, `TP ${tp}`)
    level(entry, 'rgba(230,234,238,0.55)', `Entry ${entry}`)
    level(sl, C.short, `SL ${sl}`)

    const span = w - 70 - pad
    const n = Math.max(120, s.pts.length)
    const x = (i: number) => pad + (i / n) * span
    ctx.strokeStyle = C.text
    ctx.lineWidth = 1.4
    ctx.beginPath()
    s.pts.forEach((v, i) => (i ? ctx.lineTo(x(i), y(v)) : ctx.moveTo(x(i), y(v))))
    ctx.stroke()
    const li = s.pts.length - 1
    ctx.fillStyle = C.glow
    ctx.beginPath()
    ctx.arc(x(li), y(s.pts[li]), 3, 0, Math.PI * 2)
    ctx.fill()
    if (s.result) {
      ctx.font = '600 13px Archivo'
      ctx.fillStyle = s.result.startsWith('Target') ? C.long : C.short
      ctx.fillText(s.result, pad, h - pad + 2)
    }
  })
  return <canvas ref={ref} className="absolute inset-0 h-full w-full" />
}

/* Console Pac-Man: a ghost hunting with A* */
const MAZE = [
  '###############',
  '#.....#.......#',
  '#.###.#.#####.#',
  '#.#.........#.#',
  '#.#.##.#.##.#.#',
  '#......#......#',
  '#.####.#.####.#',
  '#.............#',
  '###############',
]
type Cell = [number, number]
const open = (c: number, r: number) => MAZE[r]?.[c] === '.'
const near = ([c, r]: Cell): Cell[] =>
  ([[c + 1, r], [c - 1, r], [c, r + 1], [c, r - 1]] as Cell[]).filter(([a, b]) => open(a, b))

function aStar(from: Cell, to: Cell): Cell[] {
  const key = (p: Cell) => p[0] + p[1] * 32
  const g = new Map([[key(from), 0]])
  const prev = new Map<number, Cell>()
  const openSet: Cell[] = [from]
  const hdist = (p: Cell) => Math.abs(p[0] - to[0]) + Math.abs(p[1] - to[1])
  while (openSet.length) {
    openSet.sort((a, b) => g.get(key(a))! + hdist(a) - (g.get(key(b))! + hdist(b)))
    const cur = openSet.shift()!
    if (cur[0] === to[0] && cur[1] === to[1]) {
      const path: Cell[] = [cur]
      let k = key(cur)
      while (prev.has(k)) {
        const p = prev.get(k)!
        path.unshift(p)
        k = key(p)
      }
      return path
    }
    for (const n of near(cur)) {
      const ng = g.get(key(cur))! + 1
      if (ng < (g.get(key(n)) ?? Infinity)) {
        g.set(key(n), ng)
        prev.set(key(n), cur)
        if (!openSet.some((o) => o[0] === n[0] && o[1] === n[1])) openSet.push(n)
      }
    }
  }
  return [from]
}

function Maze() {
  const fresh = () => ({
    pac: [7, 7] as Cell,
    pacPrev: [7, 7] as Cell,
    from: [7, 7] as Cell,
    ghost: [1, 1] as Cell,
    ghostFrom: [1, 1] as Cell,
    path: [] as Cell[],
    eaten: new Set<number>(),
    t: 0,
    tick: 0,
  })
  const sim = useRef(fresh())
  const ref = useCanvas((ctx, w, h, dt) => {
    let s = sim.current
    const STEP = 230
    s.t += dt
    if (s.t >= STEP) {
      s.t -= STEP
      s.tick++
      // Pac wanders, avoiding reversal unless stuck
      const options = near(s.pac).filter(([c, r]) => !(c === s.pacPrev[0] && r === s.pacPrev[1]))
      const pick = (options.length ? options : near(s.pac))[Math.floor(Math.random() * (options.length || 1))]
      s.from = s.pac
      s.pacPrev = s.pac
      s.pac = pick
      s.eaten.add(pick[0] + pick[1] * 32)
      // Ghost moves on three of every four ticks along its A* path
      s.path = aStar(s.ghost, s.pac)
      s.ghostFrom = s.ghost
      if (s.tick % 4 !== 0 && s.path.length > 1) s.ghost = s.path[1]
      if (s.ghost[0] === s.pac[0] && s.ghost[1] === s.pac[1]) {
        sim.current = fresh()
        s = sim.current
      }
    }
    const k = Math.min(1, s.t / STEP)
    const ease = 1 - Math.pow(1 - k, 3)
    const cell = Math.min(w / 15, h / 9)
    const ox = (w - cell * 15) / 2
    const oy = (h - cell * 9) / 2
    const cx = (c: number) => ox + c * cell + cell / 2
    const cy = (r: number) => oy + r * cell + cell / 2
    ctx.clearRect(0, 0, w, h)
    MAZE.forEach((row, r) =>
      [...row].forEach((ch, c) => {
        if (ch === '#') {
          ctx.fillStyle = C.wall
          ctx.fillRect(ox + c * cell + 1, oy + r * cell + 1, cell - 2, cell - 2)
        } else if (!s.eaten.has(c + r * 32)) {
          ctx.fillStyle = 'rgba(230,234,238,0.45)'
          ctx.fillRect(cx(c) - 1, cy(r) - 1, 2, 2)
        }
      }),
    )
    // Ghost's planned route
    ctx.fillStyle = 'rgba(224,87,74,0.55)'
    s.path.slice(1, -1).forEach(([c, r]) => {
      ctx.beginPath()
      ctx.arc(cx(c), cy(r), cell * 0.09, 0, Math.PI * 2)
      ctx.fill()
    })
    const lerp = (a: Cell, b: Cell): [number, number] => [cx(a[0] + (b[0] - a[0]) * ease), cy(a[1] + (b[1] - a[1]) * ease)]
    const [px, py] = lerp(s.from, s.pac)
    const dir = Math.atan2(s.pac[1] - s.from[1], s.pac[0] - s.from[0])
    const mouth = 0.15 + 0.5 * Math.abs(Math.sin(k * Math.PI))
    ctx.fillStyle = C.pac
    ctx.beginPath()
    ctx.moveTo(px, py)
    ctx.arc(px, py, cell * 0.36, dir + mouth, dir + Math.PI * 2 - mouth)
    ctx.fill()
    const [gx, gy] = lerp(s.ghostFrom, s.ghost)
    const gr = cell * 0.34
    ctx.fillStyle = C.short
    ctx.beginPath()
    ctx.arc(gx, gy - gr * 0.15, gr, Math.PI, 0)
    ctx.lineTo(gx + gr, gy + gr * 0.85)
    ctx.lineTo(gx - gr, gy + gr * 0.85)
    ctx.fill()
  })
  return <canvas ref={ref} className="absolute inset-0 h-full w-full" />
}

/* Spam classifier: 54 features in, one probability out */
const EMAILS = [
  { subject: 'You are a WINNER, claim your $1,000 now', p: 0.98 },
  { subject: 'Lecture notes for Thursday', p: 0.03 },
  { subject: 'Free credit report, act today, no cost', p: 0.94 },
  { subject: 'Invoice 1042 for October', p: 0.07 },
]
function Classifier() {
  const still = reducedMotion()
  const [i, setI] = useState(0)
  const [lit, setLit] = useState(still)
  useEffect(() => {
    if (still) return
    setLit(false)
    const a = setTimeout(() => setLit(true), 450)
    const b = setTimeout(() => setI((x) => (x + 1) % EMAILS.length), 3400)
    return () => {
      clearTimeout(a)
      clearTimeout(b)
    }
  }, [i, still])
  const e = EMAILS[i]
  const active = useMemo(() => {
    const set = new Set<number>()
    let seed = i * 97 + 13
    const n = e.p > 0.5 ? 14 : 5
    while (set.size < n) {
      seed = (seed * 1103515245 + 12345) % 2147483648
      set.add(seed % 54)
    }
    return set
  }, [i, e.p])
  const spam = e.p > 0.5
  return (
    <div className="absolute inset-0 flex flex-col justify-between p-5 text-[0.8rem]">
      <p className="text-white">“{e.subject}”</p>
      <div className="grid w-max grid-cols-[repeat(18,0.5rem)] gap-1">
        {Array.from({ length: 54 }, (_, k) => (
          <span
            key={k}
            className="h-2 w-2 rounded-[1px] transition-colors duration-700 ease-expo"
            style={{ backgroundColor: lit && active.has(k) ? C.glow : 'rgba(230,234,238,0.12)', transitionDelay: `${(k % 18) * 12}ms` }}
          />
        ))}
      </div>
      <div>
        <div className="flex items-baseline justify-between tnum">
          <span className="text-[#8C97A6]">Spam probability</span>
          <span className="font-semibold" style={{ color: lit ? (spam ? C.short : C.long) : C.dim }}>
            {lit ? `${spam ? 'Spam' : 'Not spam'}, ${e.p.toFixed(2)}` : 'Reading'}
          </span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full transition-[width] duration-1000 ease-expo"
            style={{ width: lit ? `${e.p * 100}%` : '0%', backgroundColor: spam ? C.short : C.long }}
          />
        </div>
      </div>
    </div>
  )
}

/* Spotify sorter: each playlist is a speaker cabinet, its height is its song count */
const CABINETS = [
  { label: 'Chill', songs: 12, color: 'oklch(0.52 0.12 270)' },
  { label: 'House & Techno', songs: 9, color: 'oklch(0.5 0.12 205)' },
  { label: 'UK Garage', songs: 6, color: 'oklch(0.47 0.12 150)' },
  { label: 'Grime & UK Rap', songs: 6, color: 'oklch(0.42 0.12 45)' },
  { label: 'Drum & Bass', songs: 4, color: 'oklch(0.52 0.12 25)' },
]
const TOTAL_SONGS = CABINETS.reduce((n, c) => n + c.songs, 0)
const GAP = 3

function SpeakerStack() {
  const still = reducedMotion()
  const [grown, setGrown] = useState(still)
  useEffect(() => {
    if (still) return
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => setGrown(true)))
    return () => cancelAnimationFrame(raf)
  }, [still])
  return (
    <div className="absolute inset-x-[14%] inset-y-[9%] flex flex-col-reverse" style={{ gap: GAP }}>
      {CABINETS.map((c, i) => (
        <div
          key={c.label}
          className="relative flex items-center justify-end overflow-hidden rounded-[4px] pr-3"
          style={{
            height: grown ? `calc((100% - ${GAP * (CABINETS.length - 1)}px) * ${c.songs / TOTAL_SONGS})` : 0,
            transition: still ? 'none' : `height 160ms cubic-bezier(0.16, 1, 0.3, 1) ${i * 160}ms`,
            backgroundColor: c.color,
            backgroundImage: 'radial-gradient(rgb(0 0 0 / 0.22) 0.9px, transparent 1.2px)',
            backgroundSize: '4px 4px',
          }}
        >
          <span
            className="whitespace-nowrap text-[0.7rem] uppercase leading-none tracking-[0.04em] text-white"
            style={{ fontVariationSettings: "'wdth' 62, 'wght' 780" }}
          >
            {c.label} {c.songs}
          </span>
        </div>
      ))}
    </div>
  )
}

/* This website: the width axis the whole page is built on */
function TypeAxis() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <span className="axis-swing text-[5.5rem] leading-none tracking-[-0.04em] text-white">Nb</span>
    </div>
  )
}

const PREVIEWS: Record<PreviewKind, { el: () => ReactNode; caption: string }> = {
  speakers: { el: () => <SpeakerStack />, caption: 'Each playlist is a speaker cabinet, as tall as its song count.' },
  workflow: { el: () => <Workflow />, caption: 'A lead moving through a typical Navaic workflow.' },
  llm: { el: () => <LocalLLM />, caption: 'Asking a local model to plan the morning.' },
  trade: { el: () => <TradeRun />, caption: 'A copied gold trade running to its target or stop.' },
  terminal: { el: () => <Terminal />, caption: 'Pulling a file into context with an @ mention.' },
  maze: { el: () => <Maze />, caption: 'The ghost replans its A* route to Pac-Man every step.' },
  classifier: { el: () => <Classifier />, caption: 'The 54 word features of a subject line, then the verdict.' },
  type: { el: () => <TypeAxis />, caption: 'Archivo running along its width axis, 62 to 125.' },
}

export default function Preview({ kind }: { kind: PreviewKind }) {
  const p = PREVIEWS[kind]
  return <Frame caption={p.caption}>{p.el()}</Frame>
}
