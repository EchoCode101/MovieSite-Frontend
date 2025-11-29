import { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { ChevronDown, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Genre } from '@/features/genres/types'

interface MultiSelectGenreProps {
  genres: Genre[]
  selectedGenreIds: string[]
  onSelectionChange: (genreIds: string[]) => void
  disabled?: boolean
}

export function MultiSelectGenre({
  genres,
  selectedGenreIds,
  onSelectionChange,
  disabled = false,
}: MultiSelectGenreProps) {
  const [open, setOpen] = useState(false)

  const handleToggleGenre = (genreId: string) => {
    if (selectedGenreIds.includes(genreId)) {
      onSelectionChange(selectedGenreIds.filter((id) => id !== genreId))
    } else {
      onSelectionChange([...selectedGenreIds, genreId])
    }
  }

  const handleSelectAll = () => {
    if (selectedGenreIds.length === genres.length) {
      onSelectionChange([])
    } else {
      onSelectionChange(genres.map((g) => g.id))
    }
  }

  const handleClear = () => {
    onSelectionChange([])
  }

  const displayText =
    selectedGenreIds.length === 0
      ? 'All Genres'
      : selectedGenreIds.length === 1
        ? genres.find((g) => g.id === selectedGenreIds[0])?.name || '1 selected'
        : `${selectedGenreIds.length} selected`

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "h-10 w-[160px] justify-between font-normal",
            selectedGenreIds.length > 0 && "text-foreground"
          )}
          disabled={disabled}
        >
          <span className="truncate">{displayText}</span>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-4" align="start">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Checkbox
              checked={selectedGenreIds.length === genres.length && genres.length > 0}
              onCheckedChange={handleSelectAll}
            />
            <span className="text-sm font-medium">Select All</span>
          </div>
          {selectedGenreIds.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClear}
              className="h-8 text-xs"
            >
              <X className="h-3 w-3 mr-1" />
              Clear
            </Button>
          )}
        </div>
        <div className="max-h-[300px] overflow-y-auto grid grid-cols-2 gap-2">
          {genres.map((genre) => {
            const isSelected = selectedGenreIds.includes(genre.id)
            return (
              <div
                key={genre.id}
                className="flex items-center space-x-2 p-2 rounded-md hover:bg-accent cursor-pointer"
                onClick={() => handleToggleGenre(genre.id)}
              >
                <Checkbox
                  checked={isSelected}
                  onCheckedChange={() => handleToggleGenre(genre.id)}
                />
                <label className="text-sm cursor-pointer flex-1">
                  {genre.name}
                </label>
              </div>
            )
          })}
        </div>
        {selectedGenreIds.length > 0 && (
          <div className="mt-4 pt-4 border-t flex flex-wrap gap-2">
            {selectedGenreIds.map((genreId) => {
              const genre = genres.find((g) => g.id === genreId)
              if (!genre) return null
              return (
                <Badge
                  key={genreId}
                  variant="secondary"
                  className="text-xs"
                >
                  {genre.name}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleToggleGenre(genreId)
                    }}
                    className="ml-1 hover:bg-destructive/20 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )
            })}
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}

