import { useId } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { UserListParams } from '../types'

interface UserListFilterState
  extends Omit<UserListParams, 'page' | 'limit' | 'sort' | 'order'> {}

interface UserFiltersProps {
  value: UserListFilterState
  onChange: (next: UserListFilterState) => void
  onSearchChange: (search: string) => void
}

export function UserFilters({
  value,
  onChange,
  onSearchChange,
}: UserFiltersProps) {
  const searchId = useId()
  const roleId = useId()
  const statusId = useId()
  const planId = useId()

  return (
    <div className="flex flex-wrap gap-4 rounded-lg border border-slate-800 bg-slate-900/50 p-4">
      <div className="flex-1 min-w-[200px]">
        <Label htmlFor={searchId} className="mb-2 block text-sm">
          Search
        </Label>
        <Input
          id={searchId}
          type="text"
          placeholder="Search by username, email..."
          value={value.search || ''}
          onChange={(e) => onSearchChange(e.target.value)}
          className="bg-slate-950"
        />
      </div>

      <div className="min-w-[150px]">
        <Label htmlFor={roleId} className="mb-2 block text-sm">
          Role
        </Label>
        <Select
          value={value.role || 'all'}
          onValueChange={(val) =>
            onChange({ ...value, role: val === 'all' ? undefined : (val as 'user' | 'admin') })
          }
        >
          <SelectTrigger id={roleId} className="bg-slate-950">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="user">User</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="min-w-[150px]">
        <Label htmlFor={statusId} className="mb-2 block text-sm">
          Status
        </Label>
        <Select
          value={value.status || 'all'}
          onValueChange={(val) =>
            onChange({
              ...value,
              status: val === 'all' ? undefined : (val as 'Active' | 'Inactive'),
            })
          }
        >
          <SelectTrigger id={statusId} className="bg-slate-950">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="min-w-[150px]">
        <Label htmlFor={planId} className="mb-2 block text-sm">
          Plan
        </Label>
        <Select
          value={value.subscription_plan || 'all'}
          onValueChange={(val) =>
            onChange({
              ...value,
              subscription_plan: val === 'all' ? undefined : val,
            })
          }
        >
          <SelectTrigger id={planId} className="bg-slate-950">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Plans</SelectItem>
            <SelectItem value="Free">Free</SelectItem>
            <SelectItem value="Basic">Basic</SelectItem>
            <SelectItem value="Premium">Premium</SelectItem>
            <SelectItem value="Ultimate">Ultimate</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-end">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            onChange({})
            onSearchChange('')
          }}
          className="bg-slate-950"
        >
          Clear
        </Button>
      </div>
    </div>
  )
}

