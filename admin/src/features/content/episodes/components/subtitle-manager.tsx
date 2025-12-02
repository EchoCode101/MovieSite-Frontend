import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { EpisodeSubtitle } from '../types'

interface SubtitleManagerProps {
  subtitles: EpisodeSubtitle[]
  onChange: (subtitles: EpisodeSubtitle[]) => void
}

export function SubtitleManager({ subtitles, onChange }: SubtitleManagerProps) {
  const addSubtitle = () => {
    onChange([...subtitles, { language: '', is_default: false, url: '' }])
  }

  const removeSubtitle = (index: number) => {
    onChange(subtitles.filter((_, i) => i !== index))
  }

  const updateSubtitle = (index: number, field: keyof EpisodeSubtitle, value: string | boolean) => {
    const updated = [...subtitles]
    updated[index] = { ...updated[index], [field]: value }
    
    // If setting is_default to true, set all others to false
    if (field === 'is_default' && value === true) {
      updated.forEach((subtitle, i) => {
        if (i !== index) {
          subtitle.is_default = false
        }
      })
    }
    
    onChange(updated)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>Subtitles</Label>
        <Button type="button" variant="outline" size="sm" onClick={addSubtitle}>
          Add Subtitle
        </Button>
      </div>

      {subtitles.length === 0 ? (
        <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-4 text-center text-slate-400">
          No subtitles added. Click "Add Subtitle" to add one.
        </div>
      ) : (
        <div className="rounded-lg border border-slate-800 bg-slate-900/50 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-800">
                <TableHead>Language</TableHead>
                <TableHead>Default</TableHead>
                <TableHead>URL *</TableHead>
                <TableHead className="w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subtitles.map((subtitle, index) => (
                <TableRow key={`${subtitle.url}-${index}`} className="border-slate-800">
                  <TableCell>
                    <Input
                      value={subtitle.language}
                      onChange={(e) => updateSubtitle(index, 'language', e.target.value)}
                      placeholder="en, es, fr, etc."
                      className="bg-slate-950"
                    />
                  </TableCell>
                  <TableCell>
                    <Checkbox
                      checked={subtitle.is_default}
                      onCheckedChange={(checked) =>
                        updateSubtitle(index, 'is_default', checked === true)
                      }
                      aria-label="Set as default"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={subtitle.url}
                      onChange={(e) => updateSubtitle(index, 'url', e.target.value)}
                      placeholder="https://example.com/subtitle.vtt"
                      className="bg-slate-950"
                      required
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSubtitle(index)}
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

