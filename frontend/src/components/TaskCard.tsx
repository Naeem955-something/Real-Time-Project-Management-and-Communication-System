type Props = {
  title: string
  desc?: string
  tags?: string[]
  due?: string
  assignees?: string[]
}

export default function TaskCard({ title, desc, tags = [], due, assignees = [] }: Props) {
  return (
    <div className="border border-white/10 rounded-xl p-3 bg-white/5 hover:border-primary/40 transition">
      <div className="font-semibold text-slate-100">{title}</div>
      {desc && <div className="text-sm text-slate-400 line-clamp-2">{desc}</div>}
      <div className="flex items-center justify-between mt-2 text-xs text-slate-400">
        <div className="flex gap-2 flex-wrap">
          {tags.map(tag => <span key={tag} className="badge">{tag}</span>)}
        </div>
        {due && <span className="text-amber-200">Due {due}</span>}
      </div>
      {assignees.length > 0 && (
        <div className="mt-2 flex -space-x-2">
          {assignees.map(name => (
            <div key={name} className="h-8 w-8 rounded-full bg-primary/30 border border-white/10 flex items-center justify-center text-xs font-semibold">
              {name.slice(0, 2).toUpperCase()}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
