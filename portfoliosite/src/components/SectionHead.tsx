import type { ReactNode } from 'react'

export default function SectionHead({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
      <h2 className="t-title lg:col-span-4">{title}</h2>
      {children && <div className="t-lead max-w-[34ch] text-slate lg:col-span-7 lg:col-start-6">{children}</div>}
    </div>
  )
}
