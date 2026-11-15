import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { reducedMotion } from '../lib/scroll'

type Field = 'side' | 'symbol' | 'entry' | 'stop' | 'targets'
type Side = 'Buy' | 'Sell'

type Signal = {
  channel: string
  tokens: [string, Field | null][]
  side: Side
  symbol: string
  entry: number
  stop: number
  targets: number[]
  digits: number
  valuePerPointPerLot: number // account currency per 1.0 price move per lot
  slip: number
}

const RISK = 100 // 1% of a 10,000 account

const SIGNALS: Signal[] = [
  {
    channel: 'Gold Room',
    tokens: [['GOLD', 'symbol'], [' ', null], ['buy now', 'side'], [' ', null], ['2341', 'entry'], ['\nSL ', null], ['2335', 'stop'], ['\nTP ', null], ['2352 / 2360', 'targets']],
    side: 'Buy', symbol: 'XAUUSD', entry: 2341, stop: 2335, targets: [2352, 2360], digits: 2, valuePerPointPerLot: 100, slip: 0.18,
  },
  {
    channel: 'FX Daily',
    tokens: [['eurusd', 'symbol'], [' ', null], ['sell', 'side'], [' @ ', null], ['1.0874', 'entry'], ['\nsl ', null], ['1.0896', 'stop'], ['  tp ', null], ['1.0830', 'targets']],
    side: 'Sell', symbol: 'EURUSD', entry: 1.0874, stop: 1.0896, targets: [1.083], digits: 5, valuePerPointPerLot: 100000, slip: -0.00002,
  },
  {
    channel: 'Crypto Calls',
    tokens: [['BTC', 'symbol'], [' ', null], ['long', 'side'], [' entry ', null], ['67,250', 'entry'], ['\nstop ', null], ['66,400', 'stop'], ['\ntargets ', null], ['68,100, 69,000', 'targets']],
    side: 'Buy', symbol: 'BTCUSD', entry: 67250, stop: 66400, targets: [68100, 69000], digits: 1, valuePerPointPerLot: 1, slip: 6.5,
  },
  {
    channel: 'FX Daily',
    tokens: [['GJ', 'symbol'], [' ', null], ['short', 'side'], [' ', null], ['191.40', 'entry'], ['\nSL ', null], ['191.95', 'stop'], ['\nTP ', null], ['190.20', 'targets']],
    side: 'Sell', symbol: 'GBPJPY', entry: 191.4, stop: 191.95, targets: [190.2], digits: 3, valuePerPointPerLot: 650, slip: -0.012,
  },
]

const FIELD_ORDER: Field[] = ['side', 'symbol', 'entry', 'stop', 'targets']

const lots = (s: Signal) => Math.max(0.01, Math.floor((RISK / (Math.abs(s.entry - s.stop) * s.valuePerPointPerLot)) * 100) / 100)
const fmt = (n: number, d: number) => n.toLocaleString('en-GB', { minimumFractionDigits: Math.min(d, 2), maximumFractionDigits: d })
const clock = () => new Date().toLocaleTimeString('en-GB', { hour12: false })

type Row = { id: number; time: string; symbol: string; side: Side; size: number; fill: string }

const seedRows: Row[] = [
  { id: -1, time: '09:14:02', symbol: 'USDJPY', side: 'Buy', size: 0.31, fill: '154.218' },
  { id: -2, time: '08:51:47', symbol: 'ETHUSD', side: 'Sell', size: 0.08, fill: '3,412.6' },
  { id: -3, time: '08:02:19', symbol: 'XAUUSD', side: 'Buy', size: 0.12, fill: '2,329.84' },
]

const rowFor = (s: Signal, id: number): Row => ({
  id,
  time: clock(),
  symbol: s.symbol,
  side: s.side,
  size: lots(s),
  fill: fmt(s.entry + s.slip, s.digits),
})

export default function SignalDesk({ start }: { start: boolean }) {
  const still = reducedMotion()
  const [idx, setIdx] = useState(0)
  const [typed, setTyped] = useState(still ? Infinity : 0)
  const [parsed, setParsed] = useState(still ? 6 : 0)
  const [rows, setRows] = useState<Row[]>(seedRows)
  const visible = useRef(true)
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => (visible.current = e.isIntersecting))
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!start || still) return
    let cancelled = false
    const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))
    const whenVisible = async () => {
      while (!cancelled && (!visible.current || document.hidden)) await wait(250)
    }
    ;(async () => {
      await wait(900)
      for (let i = 0; !cancelled; i++) {
        const s = SIGNALS[i % SIGNALS.length]
        const text = s.tokens.map(([t]) => t).join('')
        setIdx(i % SIGNALS.length)
        setParsed(0)
        setTyped(0)
        for (let c = 1; c <= text.length && !cancelled; c++) {
          await whenVisible()
          setTyped(c)
          await wait(text[c - 1] === '\n' ? 140 : 26 + Math.random() * 30)
        }
        await wait(380)
        for (let f = 1; f <= 6 && !cancelled; f++) {
          await whenVisible()
          setParsed(f)
          await wait(210)
        }
        await wait(420)
        if (cancelled) return
        setRows((r) => [rowFor(s, i), ...r].slice(0, 4))
        await wait(2900)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [start, still])

  const s = SIGNALS[idx]
  let remaining = typed
  const done = typed >= s.tokens.reduce((n, [t]) => n + t.length, 0)

  const fields: { label: string; value: string; key: Field | 'size' }[] = [
    { key: 'side', label: 'Side', value: s.side },
    { key: 'symbol', label: 'Symbol', value: s.symbol },
    { key: 'entry', label: 'Entry', value: fmt(s.entry, s.digits) },
    { key: 'stop', label: 'Stop', value: fmt(s.stop, s.digits) },
    { key: 'targets', label: s.targets.length > 1 ? 'Targets' : 'Target', value: s.targets.map((t) => fmt(t, s.digits)).join(', ') },
    { key: 'size', label: 'Size at 1% risk', value: `${lots(s).toFixed(2)} lots` },
  ]

  return (
    <div
      ref={root}
      className="relative overflow-hidden rounded-[5px] bg-ink text-[#E6EAEE] shadow-[0_40px_80px_-40px_rgba(15,27,45,0.55)]"
      aria-label="Simulation of the LazyTrader signal pipeline"
      role="img"
    >
      <div className="flex items-center justify-between px-5 pt-5 t-small sm:px-6">
        <span className="font-semibold text-white">
          LazyTrader<span className="hidden sm:inline">, reading a trade signal</span>
        </span>
        <span className="flex items-center gap-2 text-[#8C97A6]">
          <span className="relative flex h-1.5 w-1.5">
            {!still && <span className="absolute inset-0 animate-ping rounded-full bg-long opacity-70" />}
            <span className="relative h-1.5 w-1.5 rounded-full bg-long" />
          </span>
          <span>
            Simulated<span className="hidden sm:inline"> feed</span>
          </span>
        </span>
      </div>

      <div className="grid grid-cols-[minmax(0,1fr)] gap-x-10 gap-y-8 p-5 sm:p-6 md:grid-cols-[1.05fr_1fr] lg:grid-cols-[1fr_0.9fr_1.3fr]" aria-hidden>
        {/* Incoming message */}
        <div>
          <p className="t-small text-[#8C97A6]">Telegram, {s.channel}</p>
          <p className="mt-3 min-h-[4.8em] whitespace-pre-wrap text-[1.05rem] leading-[1.55] tnum">
            {s.tokens.map(([text, field], i) => {
              const shown = text.slice(0, Math.max(0, remaining))
              remaining -= text.length
              if (!shown) return null
              const lit = field !== null && parsed > FIELD_ORDER.indexOf(field)
              return (
                <span
                  key={i}
                  className={`rounded-[2px] transition-[background-color,color,box-shadow] duration-500 ease-expo ${
                    lit ? 'bg-cobalt text-white shadow-[0_0_0_2px_#2442E0]' : ''
                  }`}
                >
                  {shown}
                </span>
              )
            })}
            {!done && <span className="ml-px inline-block h-[1.05em] w-[2px] translate-y-[0.18em] animate-pulse bg-white" />}
          </p>
        </div>

        {/* Parsed order */}
        <div>
          <p className="t-small text-[#8C97A6]">Extracted</p>
          <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 t-small tnum">
            {fields.map((f, i) => {
              const on = parsed > i
              return (
                <div key={f.key} className="contents">
                  <dt className="text-[#8C97A6]">{f.label}</dt>
                  <dd
                    className={`justify-self-end text-right font-medium transition-all duration-700 ease-expo ${
                      on ? 'translate-x-0 opacity-100' : 'translate-x-2 opacity-0'
                    } ${f.key === 'side' ? (s.side === 'Buy' ? 'text-long' : 'text-short') : 'text-white'}`}
                  >
                    {f.value}
                  </dd>
                </div>
              )
            })}
          </dl>
        </div>

        {/* Executed */}
        <div className="md:col-span-2 lg:col-span-1">
          <p className="t-small text-[#8C97A6]">Placed</p>
          <ul className="mt-3 t-small tnum [&>li:nth-child(n+4)]:hidden sm:[&>li:nth-child(n+4)]:grid">
            <AnimatePresence initial={false}>
              {rows.map((r) => (
                <motion.li
                  key={r.id}
                  layout
                  initial={{ opacity: 0, y: -14, backgroundColor: 'rgba(36,66,224,0.55)' }}
                  animate={{ opacity: 1, y: 0, backgroundColor: 'rgba(36,66,224,0)' }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], backgroundColor: { duration: 1.8 } }}
                  className="-mx-2 grid grid-cols-[4rem_1fr_auto] items-baseline gap-x-2.5 sm:grid-cols-[4.4rem_1fr_auto] sm:gap-x-3 whitespace-nowrap rounded-[3px] px-2 py-1.5"
                >
                  <span className="text-[#8C97A6]">{r.time}</span>
                  <span>
                    <span className={r.side === 'Buy' ? 'text-long' : 'text-short'}>{r.side}</span>{' '}
                    <span className="text-white">{r.symbol}</span>
                    <span className="hidden text-[#8C97A6] xl:inline"> {r.size.toFixed(2)}</span>
                  </span>
                  <span className="text-right text-white">{r.fill}</span>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>
      </div>
    </div>
  )
}
