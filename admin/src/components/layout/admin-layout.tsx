import { Sidebar } from '@/components/common/sidebar'
import { useAdminLogout } from '@/features/auth/hooks/use-admin-logout'
import { useAdminUser } from '@/features/auth/hooks/use-admin-user'

interface AdminLayoutProps {
  children: React.ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const { data: adminUser } = useAdminUser()
  const logoutMutation = useAdminLogout()

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-50">
      <Sidebar />
      <div className="flex min-h-screen flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-slate-800/50 bg-slate-900/50 backdrop-blur-sm px-6 py-4 shadow-sm">
          <div className="text-sm text-slate-400">
            Signed in as{' '}
            <span className="font-semibold text-slate-100">
              {adminUser?.email ?? 'Admin'}
            </span>
          </div>
          <button
            type="button"
            onClick={() => logoutMutation.mutate()}
            disabled={logoutMutation.isPending}
            className="rounded-lg border border-slate-700/50 bg-slate-800/50 px-4 py-2 text-sm font-medium text-slate-100 hover:bg-slate-700/50 hover:border-slate-600 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {logoutMutation.isPending ? 'Logging out...' : 'Logout'}
          </button>
        </header>
        <main className="flex-1 overflow-y-auto bg-slate-950/50 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}


