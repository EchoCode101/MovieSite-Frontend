import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Pencil, Trash2 } from 'lucide-react'
import type { Channel } from '../types'

interface ChannelsTableProps {
  channels: Channel[]
  isLoading: boolean
  onEdit: (channel: Channel) => void
  onDelete: (channel: Channel) => void
}

export function ChannelsTable({
  channels,
  isLoading,
  onEdit,
  onDelete,
}: ChannelsTableProps) {
  if (isLoading) {
    return (
      <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-8 text-center text-slate-400">
        Loading channels...
      </div>
    )
  }

  if (channels.length === 0) {
    return (
      <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-8 text-center text-slate-400">
        No channels found
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900/50 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-slate-800 hover:bg-slate-800/50">
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Stream Type</TableHead>
            <TableHead>Language</TableHead>
            <TableHead>Country</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Featured</TableHead>
            <TableHead>Sort Order</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {channels.map((channel) => {
            const channelId = channel.id || channel._id || ''
            return (
              <TableRow
                key={channelId}
                className="border-slate-800 hover:bg-slate-800/50"
              >
                <TableCell>
                  {channel.logo_url ? (
                    <img
                      src={channel.logo_url}
                      alt={channel.name}
                      className="h-12 w-12 rounded object-cover"
                    />
                  ) : (
                    <div className="h-12 w-12 rounded bg-slate-800 flex items-center justify-center text-slate-500">
                      No Logo
                    </div>
                  )}
                </TableCell>
                <TableCell className="font-medium">{channel.name}</TableCell>
                <TableCell>
                  {channel.stream_type ? (
                    <Badge className="bg-blue-500/20 text-blue-300">
                      {channel.stream_type.toUpperCase()}
                    </Badge>
                  ) : (
                    '-'
                  )}
                </TableCell>
                <TableCell className="text-slate-400">{channel.language || '-'}</TableCell>
                <TableCell className="text-slate-400">{channel.country || '-'}</TableCell>
                <TableCell className="text-slate-400">{channel.category || '-'}</TableCell>
                <TableCell>
                  <Badge
                    className={
                      channel.is_active
                        ? 'bg-green-500/20 text-green-300'
                        : 'bg-red-500/20 text-red-300'
                    }
                  >
                    {channel.is_active ? 'Active' : 'Inactive'}
                  </Badge>
                </TableCell>
                <TableCell>
                  {channel.is_featured ? (
                    <Badge className="bg-yellow-500/20 text-yellow-300">Featured</Badge>
                  ) : (
                    '-'
                  )}
                </TableCell>
                <TableCell className="text-slate-400">{channel.sort_order || '-'}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(channel)}
                      className="h-8 w-8 p-0"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(channel)}
                      className="h-8 w-8 p-0 text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

