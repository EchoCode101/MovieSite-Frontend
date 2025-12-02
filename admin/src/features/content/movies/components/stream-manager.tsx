import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { MovieStream } from '../types'

interface StreamManagerProps {
  streams: MovieStream[]
  onChange: (streams: MovieStream[]) => void
}

export function StreamManager({ streams, onChange }: StreamManagerProps) {
  const addStream = () => {
    onChange([...streams, { url: '' }])
  }

  const removeStream = (index: number) => {
    onChange(streams.filter((_, i) => i !== index))
  }

  const updateStream = (index: number, field: keyof MovieStream, value: string) => {
    const updated = [...streams]
    updated[index] = { ...updated[index], [field]: value }
    onChange(updated)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>Streams</Label>
        <Button type="button" variant="outline" size="sm" onClick={addStream}>
          Add Stream
        </Button>
      </div>

      {streams.length === 0 ? (
        <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-4 text-center text-slate-400">
          No streams added. Click "Add Stream" to add one.
        </div>
      ) : (
        <div className="rounded-lg border border-slate-800 bg-slate-900/50 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-800">
                <TableHead>Label</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>URL *</TableHead>
                <TableHead className="w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {streams.map((stream, index) => (
                <TableRow key={`${stream.url}-${index}`} className="border-slate-800">
                  <TableCell>
                    <Input
                      value={stream.label || ''}
                      onChange={(e) => updateStream(index, 'label', e.target.value)}
                      placeholder="HD, 4K, etc."
                      className="bg-slate-950"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={stream.type || ''}
                      onChange={(e) => updateStream(index, 'type', e.target.value)}
                      placeholder="hls, mp4, etc."
                      className="bg-slate-950"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={stream.url}
                      onChange={(e) => updateStream(index, 'url', e.target.value)}
                      placeholder="https://example.com/stream.m3u8"
                      className="bg-slate-950"
                      required
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeStream(index)}
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}

