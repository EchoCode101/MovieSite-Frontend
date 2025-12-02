import { useEffect, useMemo, useState } from 'react'

import { createFileRoute } from '@tanstack/react-router'

import { Button } from '@/components/ui/button'
import { useAdminUser } from '@/features/auth/hooks/use-admin-user'
import type { UserListParams } from '@/features/users/types'
import { useUser, useUsers } from '@/features/users/hooks'
import { DeleteUserDialog } from '@/features/users/components/delete-user-dialog'
import { UserDetailsDialog } from '@/features/users/components/user-details-dialog'
import { UserFormDialog } from '@/features/users/components/user-form-dialog'
import { UserFilters } from '@/features/users/components/user-filters'
import { UsersBulkActions } from '@/features/users/components/users-bulk-actions'
import { UsersTable } from '@/features/users/components/users-table'

export const Route = createFileRoute('/_authenticated/users/')({
  component: UsersPage,
})

function UsersPage() {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [filterState, setFilterState] = useState<
    Omit<UserListParams, 'page' | 'limit' | 'sort' | 'order'>
  >({})
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create')
  const [activeUserId, setActiveUserId] = useState<string | undefined>(undefined)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  const { data: adminUser } = useAdminUser()

  const params: UserListParams = useMemo(
    () => ({
      page,
      limit: 10,
      search: search || undefined,
      role: filterState.role,
      status: filterState.status,
      subscription_plan: filterState.subscription_plan,
    }),
    [page, search, filterState],
  )

  const { data, isLoading } = useUsers(params)

  const users = data?.users ?? []

  const {
    data: activeUserDetail,
  } = useUser(activeUserId)

  // Reset selection when page changes
  useEffect(() => {
    setSelectedIds([])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    )
  }

  const handleToggleSelectAll = () => {
    if (selectedIds.length === users.length) {
      setSelectedIds([])
    } else {
      setSelectedIds(users.map((u) => u.id || u._id || ''))
    }
  }

  const handleSelectUser = (id: string) => {
    setActiveUserId(id)
    setIsDetailsOpen(true)
  }

  const handleCreateUser = () => {
    setFormMode('create')
    setActiveUserId(undefined)
    setIsFormOpen(true)
  }

  const handleBulkDelete = () => {
    if (selectedIds.length === 0) return
    // For now, open delete dialog on the first selected user; bulk deletion can be added later.
    setActiveUserId(selectedIds[0])
    setIsDeleteOpen(true)
  }

  const debouncedSearchChange = (value: string) => {
    setSearch(value)
    setPage(1)
  }

  const isSelf =
    adminUser && activeUserDetail
      ? adminUser.email === activeUserDetail.email
      : false

  return (
    <div className="space-y-6">
      <header className="mb-2 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="mb-2 text-3xl font-bold tracking-tight text-slate-50">
            Users
          </h1>
          <p className="text-sm text-slate-400">
            Manage platform users, roles, and subscriptions.
          </p>
        </div>
        <Button type="button" onClick={handleCreateUser} className="shrink-0">
          Create user
        </Button>
      </header>

      <UserFilters
        value={filterState}
        onChange={(next) => {
          setFilterState(next)
          setPage(1)
        }}
        onSearchChange={debouncedSearchChange}
      />

      <UsersBulkActions
        selectedIds={selectedIds}
        users={users}
        onClearSelection={() => setSelectedIds([])}
        onBulkDelete={handleBulkDelete}
      />

      <UsersTable
        users={users}
        isLoading={isLoading}
        page={data?.currentPage ?? page}
        totalPages={data?.totalPages ?? page}
        onPageChange={(next) => {
          if (next < 1 || (data && next > data.totalPages)) return
          setPage(next)
        }}
        onSelectUser={handleSelectUser}
        selectedIds={selectedIds}
        onToggleSelect={handleToggleSelect}
        onToggleSelectAll={handleToggleSelectAll}
      />

      <UserFormDialog
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        mode={formMode}
        user={formMode === 'edit' ? activeUserDetail ?? null : null}
      />

      <UserDetailsDialog
        open={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
        user={activeUserDetail ?? null}
      />

      <DeleteUserDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        user={activeUserDetail ?? null}
        isSelf={isSelf}
      />
    </div>
  )
}

