import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { adminService, AdminUser, ActivityLogItem } from '../services/dataService'

export default function AdminPage() {
  const queryClient = useQueryClient()

  const { data: users, isLoading: usersLoading } = useQuery({
    queryKey: ['admin-users'],
    queryFn: adminService.listUsers
  })

  const { data: activity, isLoading: activityLoading } = useQuery({
    queryKey: ['admin-activity'],
    queryFn: () => adminService.recentActivity(20)
  })

  const updateRoleMutation = useMutation({
    mutationFn: ({ id, role }: { id: number; role: 'ADMIN' | 'MEMBER' }) => adminService.updateRole(id, role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] })
    }
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <div className="text-sm text-slate-400">Admin / Team Management</div>
          <div className="text-2xl font-semibold">Users & activity</div>
          <div className="text-xs text-slate-500">Manage roles and monitor recent events.</div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="card p-4 lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <div className="font-semibold">Team members</div>
            <span className="badge">{users?.length ?? 0}</span>
          </div>
          {usersLoading ? (
            <Spinner />
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="text-slate-400 text-xs">
                  <tr>
                    <th className="text-left py-2">Name</th>
                    <th className="text-left py-2">Email</th>
                    <th className="text-left py-2">Role</th>
                    <th className="text-left py-2">Status</th>
                    <th className="text-left py-2">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {users?.map((u: AdminUser) => (
                    <tr key={u.id}>
                      <td className="py-2">{u.name}</td>
                      <td className="py-2 text-slate-400">{u.email}</td>
                      <td className="py-2">
                        <span className={u.role === 'ADMIN' ? 'badge bg-purple-500/20 text-purple-300' : 'badge'}>{u.role}</span>
                      </td>
                      <td className="py-2 text-slate-400">{u.active ? 'Active' : 'Inactive'}</td>
                      <td className="py-2">
                        <select
                          className="select"
                          value={u.role}
                          onChange={(e) => updateRoleMutation.mutate({ id: u.id, role: e.target.value as 'ADMIN' | 'MEMBER' })}
                          disabled={updateRoleMutation.isPending}
                        >
                          <option value="MEMBER">Member</option>
                          <option value="ADMIN">Admin</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="card p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="font-semibold">Recent activity</div>
            <span className="badge">20</span>
          </div>
          {activityLoading ? (
            <Spinner />
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
              {activity?.map((item: ActivityLogItem) => (
                <div key={item.id} className="border border-white/5 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold text-sm">{item.action}</div>
                    <div className="text-xs text-slate-500">{new Date(item.createdAt).toLocaleString()}</div>
                  </div>
                  <div className="text-xs text-slate-400 mt-1">{item.details}</div>
                  <div className="text-xs text-slate-500 mt-1">By {item.actor?.name || 'System'} • {item.severity || 'INFO'}</div>
                </div>
              ))}
              {(!activity || activity.length === 0) && <div className="text-sm text-slate-500">No activity yet.</div>}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function Spinner() {
  return (
    <div className="flex items-center justify-center h-24">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
    </div>
  )
}
