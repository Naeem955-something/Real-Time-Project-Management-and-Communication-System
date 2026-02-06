import React from 'react'

type Props = {
  title: string
  value: string | number
  hint?: string
  accent?: string
}

export default function StatCard({ title, value, hint, accent = 'primary' }: Props) {
  return (
    <div className="card p-4">
      <div className="text-sm text-slate-400">{title}</div>
      <div className="text-3xl font-semibold mt-2">{value}</div>
      {hint && <div className={`mt-2 text-xs text-${accent}-200`}>{hint}</div>}
    </div>
  )
}
