import { useMemo, useState } from 'react'

import { createFileRoute } from '@tanstack/react-router'

import { Button } from '@/components/ui/button'
import { useChannels } from '@/features/content/channels/hooks'
import { ChannelFilters } from '@/features/content/channels/components/channel-filters'
import { ChannelsTable } from '@/features/content/channels/components/channels-table'
import { ChannelFormDialog } from '@/features/content/channels/components/channel-form-dialog'
import { DeleteChannelDialog } from '@/features/content/channels/components/delete-channel-dialog'
import type { Channel, ChannelListParams } from '@/features/content/channels/types'

export const Route = createFileRoute('/_authenticated/content/channels/')({
  component: ChannelsPage,
})

function ChannelsPage() {
  const [search, setSearch] = useState('')
  const [filterState, setFilterState] = useState<Omit<ChannelListParams, 'search'>>({})
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create')
  const [activeChannel, setActiveChannel] = useState<Channel | null>(null)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [channelToDelete, setChannelToDelete] = useState<Channel | null>(null)

  const params: ChannelListParams = useMemo(
    () => ({
      search: search || undefined,
      is_active: filterState.is_active,
      is_featured: filterState.is_featured,
    }),
    [search, filterState],
  )

  const { data: channels = [], isLoading } = useChannels(params)

  const handleCreateChannel = () => {
    setFormMode('create')
    setActiveChannel(null)
    setIsFormOpen(true)
  }

  const handleEditChannel = (channel: Channel) => {
    setFormMode('edit')
    setActiveChannel(channel)
    setIsFormOpen(true)
  }

  const handleDeleteChannel = (channel: Channel) => {
    setChannelToDelete(channel)
    setIsDeleteOpen(true)
  }

  return (
    <div className="space-y-6">
      <header className="mb-2 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="mb-2 text-3xl font-bold tracking-tight text-slate-50">Channels</h1>
          <p className="text-sm text-slate-400">Manage live TV channels and streams.</p>
        </div>
        <Button type="button" onClick={handleCreateChannel} className="shrink-0">
          Create Channel
        </Button>
      </header>

      <ChannelFilters
        value={filterState}
        onChange={(next) => setFilterState(next)}
        onSearchChange={setSearch}
      />

      <ChannelsTable
        channels={channels}
        isLoading={isLoading}
        onEdit={handleEditChannel}
        onDelete={handleDeleteChannel}
      />

      <ChannelFormDialog
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        mode={formMode}
        channel={formMode === 'edit' ? activeChannel : null}
      />

      <DeleteChannelDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        channel={channelToDelete}
      />
    </div>
  )
}
