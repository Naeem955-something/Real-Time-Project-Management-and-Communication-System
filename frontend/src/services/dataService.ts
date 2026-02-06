import api from './api'

export interface Project {
  id: number
  name: string
  description: string
  status: string
  startDate?: string
  endDate?: string
  team?: any
}

export const projectService = {
  getAll: async (): Promise<Project[]> => {
    const response = await api.get<Project[]>('/projects')
    return response.data
  },

  getById: async (id: number): Promise<Project> => {
    const response = await api.get<Project>(`/projects/${id}`)
    return response.data
  },

  create: async (data: Partial<Project>): Promise<Project> => {
    const response = await api.post<Project>('/projects', data)
    return response.data
  },

  update: async (id: number, data: Partial<Project>): Promise<Project> => {
    const response = await api.put<Project>(`/projects/${id}`, data)
    return response.data
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/projects/${id}`)
  }
}

export interface Task {
  id: number
  title: string
  description: string
  status: 'TODO' | 'IN_PROGRESS' | 'REVIEW' | 'DONE'
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  startDate?: string
  dueDate?: string
  project?: any
  assignees?: any[]
  tags?: string[]
}

export const taskService = {
  getByProject: async (projectId: number): Promise<Task[]> => {
    const response = await api.get<Task[]>(`/tasks/project/${projectId}`)
    return response.data
  },

  create: async (projectId: number, data: Partial<Task>): Promise<Task> => {
    const response = await api.post<Task>(`/tasks/project/${projectId}`, data)
    return response.data
  },

  update: async (id: number, data: Partial<Task>): Promise<Task> => {
    const response = await api.put<Task>(`/tasks/${id}`, data)
    return response.data
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/tasks/${id}`)
  }
}

export interface DashboardSummary {
  totalTasks: number
  openTasks: number
  completedTasks: number
  tasksTodo: number
  tasksInProgress: number
  tasksDone: number
  completionRate: number
  activeProjects: number
  totalProjects: number
  teamMembers: number
  upcomingDeadlines: number
  unreadNotifications: number
  recentActivityCount: number
}

export interface ActivityItem {
  id: number
  action: string
  details: string
  severity: string
  actor: string
  createdAt: string
}

export const dashboardService = {
  getSummary: async (userId?: number): Promise<DashboardSummary> => {
    const query = userId ? `?userId=${userId}` : ''
    const response = await api.get<DashboardSummary>(`/dashboard/summary${query}`)
    return response.data
  },
  
  getUpcomingDeadlines: async (days: number = 7): Promise<Task[]> => {
    const response = await api.get<Task[]>(`/dashboard/upcoming-deadlines?days=${days}`)
    return response.data
  },
  
  getRecentActivity: async (limit: number = 5): Promise<ActivityItem[]> => {
    const response = await api.get<ActivityItem[]>(`/dashboard/recent-activity?limit=${limit}`)
    return response.data
  },
  
  getNotificationPreview: async (userId: number, limit: number = 5): Promise<Notification[]> => {
    const response = await api.get<Notification[]>(`/dashboard/notifications-preview/${userId}?limit=${limit}`)
    return response.data
  }
}

export interface FileItem {
  id: number
  name: string
  storagePath: string
  sizeInBytes: number
  contentType: string
  project?: any
}

export interface Document {
  id: number
  title: string
  content?: string
  project?: any
}

export const fileService = {
  getByProject: async (projectId: number): Promise<FileItem[]> => {
    const response = await api.get<FileItem[]>(`/files/project/${projectId}`)
    return response.data
  },

  upload: async (file: File, projectId: number): Promise<FileItem> => {
    const formData = new FormData()
    formData.append('file', file)
    const response = await api.post<FileItem>(`/files/project/${projectId}/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    return response.data
  },

  uploadVersion: async (file: File, fileId: number): Promise<FileItem> => {
    const formData = new FormData()
    formData.append('file', file)
    const response = await api.post<FileItem>(`/files/${fileId}/upload-version`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    return response.data
  },

  getVersions: async (fileId: number): Promise<any[]> => {
    const response = await api.get<any[]>(`/files/${fileId}/versions`)
    return response.data
  },

  restoreVersion: async (fileId: number, versionLabel: string): Promise<FileItem> => {
    const response = await api.post<FileItem>(`/files/${fileId}/restore/${versionLabel}`)
    return response.data
  },

  deleteFile: async (fileId: number): Promise<void> => {
    await api.delete(`/files/${fileId}`)
  }
}

export interface Goal {
  id: number
  title: string
  description: string
  currentValue: number
  targetValue: number
  status: string
  owner?: any
}

export const goalService = {
  getByUser: async (userId: number): Promise<Goal[]> => {
    const response = await api.get<Goal[]>(`/goals/user/${userId}`)
    return response.data
  },

  updateProgress: async (id: number, currentValue: number): Promise<Goal> => {
    const response = await api.post<Goal>(`/goals/${id}/progress?current=${currentValue}`)
    return response.data
  }
}

export interface Notification {
  id: number
  message: string
  type: 'TASK' | 'SYSTEM' | 'DEADLINE' | 'MESSAGE'
  readFlag: boolean
  link?: string
  createdAt: string
  recipient?: any
}

export const notificationService = {
  getUnread: async (userId: number): Promise<Notification[]> => {
    const response = await api.get<Notification[]>(`/notifications/unread/${userId}`)
    return response.data
  },

  markAsRead: async (notificationId: number): Promise<Notification> => {
    const response = await api.post<Notification>(`/notifications/read/${notificationId}`)
    return response.data
  },

  getAll: async (userId: number): Promise<Notification[]> => {
    const response = await api.get<Notification[]>(`/notifications/user/${userId}`)
    return response.data
  },

  getRecent: async (userId: number, limit: number = 5): Promise<Notification[]> => {
    const response = await api.get<Notification[]>(`/notifications/recent/${userId}?limit=${limit}`)
    return response.data
  },

  unreadCount: async (userId: number): Promise<number> => {
    const response = await api.get<number>(`/notifications/unread-count/${userId}`)
    return response.data
  },

  markAllRead: async (userId: number): Promise<void> => {
    await api.post(`/notifications/mark-all-read/${userId}`)
  }
}

export interface AnalyticsPoint {
  period: string
  label: string
  created: number
  completed: number
}

export interface StatusBreakdown {
  TODO: number
  IN_PROGRESS: number
  REVIEW: number
  DONE: number
  [key: string]: number
}

export interface TeamWorkload {
  team: string
  tasks: number
}

export interface ActivityPoint {
  date: string
  events: number
}

export interface AnalyticsOverview {
  statusBreakdown: StatusBreakdown
  throughput: AnalyticsPoint[]
  teamWorkload: TeamWorkload[]
  activityTrend: ActivityPoint[]
  activityTotal: number
  totalTasks: number
  completedTasks: number
  completionRate: number
  activeProjects: number
}

export const analyticsService = {
  getOverview: async (months: number = 6, activityDays: number = 14): Promise<AnalyticsOverview> => {
    const response = await api.get<AnalyticsOverview>(`/analytics/overview?months=${months}&activityDays=${activityDays}`)
    return response.data
  }
}

export interface DailySummary {
  id: number
  title: string
  content: string
  completedLast24h: number
  newTasksLast24h: number
  pendingTasks: number
  upcomingDeadlines: number
  activityCount: number
  createdAt: string
}

export const dailySummaryService = {
  latest: async (limit: number = 7): Promise<DailySummary[]> => {
    const response = await api.get<DailySummary[]>(`/daily-summary/latest?limit=${limit}`)
    return response.data
  },
  runNow: async (): Promise<DailySummary> => {
    const response = await api.post<DailySummary>('/daily-summary/run')
    return response.data
  }
}

export interface SearchResults {
  tasks: Task[]
  projects: Project[]
  documents: Document[]
  files: FileItem[]
}

export const searchService = {
  search: async (keyword: string): Promise<SearchResults> => {
    const response = await api.get<SearchResults>(`/search?q=${encodeURIComponent(keyword)}`)
    return response.data
  }
}

export const exportService = {
  downloadBoardCsv: async (projectId: number): Promise<Blob> => {
    const response = await api.get(`/export/board/${projectId}`, { responseType: 'blob' })
    return response.data
  },
  downloadProjectSummary: async (projectId: number): Promise<Blob> => {
    const response = await api.get(`/export/project/${projectId}`, { responseType: 'blob' })
    return response.data
  }
}

export interface AdminUser {
  id: number
  name: string
  email: string
  role: 'ADMIN' | 'MEMBER'
  active: boolean
  createdAt: string
}

export interface ActivityLogItem {
  id: number
  action: string
  details: string
  severity: string
  actor?: { name: string }
  createdAt: string
}

export const adminService = {
  listUsers: async (): Promise<AdminUser[]> => {
    const response = await api.get<AdminUser[]>('/admin/users')
    return response.data
  },
  updateRole: async (id: number, role: 'ADMIN' | 'MEMBER'): Promise<AdminUser> => {
    const response = await api.put<AdminUser>(`/admin/users/${id}/role`, { role })
    return response.data
  },
  recentActivity: async (limit: number = 20): Promise<ActivityLogItem[]> => {
    const response = await api.get<ActivityLogItem[]>(`/admin/activity?limit=${limit}`)
    return response.data
  }
}

export interface UserStats {
  tasksAssigned: number
  tasksCompleted: number
  activityCount: number
  joinedDate: string
  role: string
  active: boolean
}

export interface UserProfileUpdate {
  name?: string
  title?: string
  avatarUrl?: string
}

export interface PasswordChange {
  currentPassword: string
  newPassword: string
}

export const userService = {
  getUserById: async (id: number): Promise<any> => {
    const response = await api.get(`/users/${id}`)
    return response.data
  },

  getCurrentUser: async (): Promise<any> => {
    const response = await api.get('/users/me')
    return response.data
  },

  getUserStats: async (id: number): Promise<UserStats> => {
    const response = await api.get<UserStats>(`/users/${id}/stats`)
    return response.data
  },

  updateProfile: async (id: number, data: UserProfileUpdate): Promise<any> => {
    const response = await api.put(`/users/${id}/profile`, data)
    return response.data
  },

  changePassword: async (id: number, data: PasswordChange): Promise<any> => {
    const response = await api.put(`/users/${id}/password`, data)
    return response.data
  },

  updatePreferences: async (id: number, preferences: Record<string, any>): Promise<any> => {
    const response = await api.put(`/users/${id}/preferences`, preferences)
    return response.data
  }
}
