import { ReactNode } from 'react'

type Props = {
  title: string
  count?: number
  children?: ReactNode
}

export default function TaskColumn({ title, count, children }: Props) {
  return (
    <div className="card p-4 flex-1 min-w-[240px]">
      <div className="flex items-center justify-between mb-3">
        <div className="font-semibold">{title}</div>
        <span className="badge">{count ?? 0}</span>
      </div>
      <div className="space-y-3 max-h-[520px] overflow-auto pr-1">{children}</div>
    </div>
  )
}
