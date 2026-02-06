import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
  Legend
} from 'recharts'
import { analyticsService, AnalyticsPoint, TeamWorkload, ActivityPoint } from '../services/dataService'

const statusColors = ['#60a5fa', '#34d399', '#fbbf24', '#a78bfa']
const teamColors = ['#38bdf8', '#c084fc', '#f59e0b', '#22c55e', '#ef4444', '#8b5cf6']

export default function Analytics() {
  const [months, setMonths] = useState(6)

  const { data, isLoading } = useQuery({
    queryKey: ['analytics', months],
    queryFn: () => analyticsService.getOverview(months, 14)
  })

  const statusData = useMemo(
    () => Object.entries(data?.statusBreakdown || {}).map(([name, value]) => ({ name, value })),
    [data]
  )

  const throughput: AnalyticsPoint[] = data?.throughput || []
  const teamWorkload: TeamWorkload[] = data?.teamWorkload || []
  const activityTrend: ActivityPoint[] = data?.activityTrend || []

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <div className="text-sm text-slate-400">Analytics</div>
          <div className="text-2xl font-semibold">Team performance</div>
          <div className="text-xs text-slate-500">Powered by live task and activity data</div>
        </div>
        <div className="flex items-center gap-2">
          <select
            className="select"
            value={months}
            onChange={(e) => setMonths(Number(e.target.value))}
          >
            <option value={3}>Last 3 months</option>
            <option value={6}>Last 6 months</option>
            <option value={12}>Last 12 months</option>
          </select>
          <button className="btn-primary">Export report</button>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-3">
        <StatTile label="Completion" value={`${data?.completionRate ?? 0}%`} hint={`${data?.completedTasks ?? 0} done`} />
        <StatTile label="Total tasks" value={data?.totalTasks ?? 0} hint={`${data?.activeProjects ?? 0} active projects`} />
        <StatTile label="Activity (14d)" value={data?.activityTotal ?? 0} hint="Events logged" />
        <StatTile label="Teams" value={teamWorkload.length || 1} hint="Workload coverage" />
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="card p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="font-semibold">Throughput</div>
              <div className="text-xs text-slate-400">Created vs completed (per month)</div>
            </div>
            <span className="badge">{months}m</span>
          </div>
          <div className="h-72">
            {throughput.length === 0 ? (
              <EmptyState message="No task activity in this range." />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={throughput}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                  <XAxis dataKey="label" stroke="#475569" tickLine={false} axisLine={false} />
                  <YAxis stroke="#475569" tickLine={false} axisLine={false} allowDecimals={false} />
                  <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #1e293b' }} />
                  <Legend />
                  <Bar dataKey="created" fill="#60a5fa" radius={[6, 6, 0, 0]} name="Created" />
                  <Bar dataKey="completed" fill="#34d399" radius={[6, 6, 0, 0]} name="Completed" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="card p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="font-semibold">Status mix</div>
              <div className="text-xs text-slate-400">Live task distribution</div>
            </div>
            <span className="badge">Breakdown</span>
          </div>
          <div className="h-72 flex items-center justify-center">
            {statusData.length === 0 ? (
              <EmptyState message="No tasks to analyze." />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={statusData} dataKey="value" cx="50%" cy="50%" outerRadius={100} label>
                    {statusData.map((entry, idx) => (
                      <Cell key={entry.name} fill={statusColors[idx % statusColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #1e293b' }} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="card p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="font-semibold">Team workload</div>
              <div className="text-xs text-slate-400">Tasks grouped by team</div>
            </div>
            <span className="badge">Workload</span>
          </div>
          <div className="h-64">
            {teamWorkload.length === 0 ? (
              <EmptyState message="No team data available." />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={teamWorkload} layout="vertical" margin={{ left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                  <XAxis type="number" stroke="#475569" tickLine={false} axisLine={false} allowDecimals={false} />
                  <YAxis type="category" dataKey="team" stroke="#475569" width={90} />
                  <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #1e293b' }} />
                  <Bar dataKey="tasks" radius={[0, 6, 6, 0]}>
                    {teamWorkload.map((_, idx) => (
                      <Cell key={idx} fill={teamColors[idx % teamColors.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="card p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="font-semibold">Activity trend</div>
              <div className="text-xs text-slate-400">Events logged over the last 14 days</div>
            </div>
            <span className="badge">Timeline</span>
          </div>
          <div className="h-64">
            {activityTrend.length === 0 ? (
              <EmptyState message="No activity recorded." />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={activityTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                  <XAxis dataKey="date" stroke="#475569" tickLine={false} axisLine={false} />
                  <YAxis stroke="#475569" tickLine={false} axisLine={false} allowDecimals={false} />
                  <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #1e293b' }} />
                  <Line type="monotone" dataKey="events" stroke="#60a5fa" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function StatTile({ label, value, hint }: { label: string; value: number | string; hint?: string }) {
  return (
    <div className="card p-4">
      <div className="text-xs text-slate-400">{label}</div>
      <div className="text-2xl font-semibold mt-1">{value}</div>
      {hint && <div className="text-xs text-slate-500 mt-1">{hint}</div>}
    </div>
  )
}

function EmptyState({ message }: { message: string }) {
  return <div className="h-full w-full flex items-center justify-center text-slate-500 text-sm">{message}</div>
}
