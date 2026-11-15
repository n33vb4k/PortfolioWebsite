import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { cv, email, socials } from '../lib/content'
import { reducedMotion, scrollToId } from '../lib/scroll'

type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function Contact() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.25'] })
  const inset = useTransform(scrollYProgress, [0, 1], [5, 0])
  const radius = useTransform(scrollYProgress, [0, 1], [18, 0])
  const clipPath = useTransform([inset, radius], ([i, r]) => `inset(0% ${i}% 0% ${i}% round ${r}px ${r}px 0 0)`)

  const [copied, setCopied] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<Status>('idle')

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2400)
    } catch {
      window.location.href = `mailto:${email}`
    }
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('https://formspree.io/f/xjgenvyv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setStatus('sent')
      setForm({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value })

  return (
    <motion.section
      id="contact"
      ref={ref}
      style={reducedMotion() ? undefined : { clipPath }}
      className="on-cobalt gutter bg-cobalt pb-10 pt-24 text-white md:pt-40"
    >
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <h2 className="t-title">Get in touch</h2>
          <p className="t-lead mt-6 max-w-[30ch] text-white/80">
            Hiring, collaborating or curious about something here? Send a message and I’ll reply.
          </p>
          <button type="button" onClick={copy} className="mt-14 block max-w-full text-left" aria-describedby="copy-hint">
            <span className="t-title link-rest pb-1">
              {email.split('@')[0]}@<wbr />
              {email.split('@')[1]}
            </span>
          </button>
          <p id="copy-hint" className="mt-4 t-small text-white/70" aria-live="polite">
            {copied ? 'Copied to your clipboard.' : 'Select the address to copy it, or '}
            {!copied && (
              <a href={`mailto:${email}`} className="link-rest text-white">
                open your mail app
              </a>
            )}
            {!copied && '.'}
          </p>
        </div>

        <form onSubmit={submit} className="space-y-8 lg:col-span-5 lg:col-start-8">
          <label className="block">
            <span className="t-small text-white/70">Name</span>
            <input required name="name" autoComplete="name" value={form.name} onChange={set('name')} className="field" />
          </label>
          <label className="block">
            <span className="t-small text-white/70">Email</span>
            <input required type="email" name="email" autoComplete="email" value={form.email} onChange={set('email')} className="field" />
          </label>
          <label className="block">
            <span className="t-small text-white/70">Message</span>
            <textarea required name="message" rows={4} value={form.message} onChange={set('message')} className="field resize-none" />
          </label>
          <div className="flex flex-wrap items-center gap-6">
            <button
              type="submit"
              disabled={status === 'sending'}
              className="relative overflow-hidden rounded-[3px] bg-white px-6 py-3 font-medium text-cobalt transition-transform duration-500 ease-expo hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70"
            >
              {status === 'sending' ? 'Sending…' : 'Send message'}
            </button>
            <p className="t-small text-white/85" aria-live="polite">
              {status === 'sent' && 'Message sent. Thanks for reaching out.'}
              {status === 'error' && 'The message didn’t send. Check your connection and try again, or email me directly.'}
            </p>
          </div>
        </form>
      </div>

      <footer className="mt-28 flex flex-col gap-6 t-small text-white/80 sm:flex-row sm:items-center sm:justify-between md:mt-40">
        <ul className="flex gap-6">
          {socials.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noopener noreferrer" className="link-draw font-medium">
                {s.label}
              </a>
            </li>
          ))}
          <li>
            <a href={cv} target="_blank" rel="noopener noreferrer" className="link-draw font-medium">
              CV
            </a>
          </li>
        </ul>
        <p className="text-white/70">Designed and built by Neev Bakshi, 2026</p>
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault()
            scrollToId('top')
          }}
          className="link-draw font-medium"
        >
          Back to top
        </a>
      </footer>
    </motion.section>
  )
}
