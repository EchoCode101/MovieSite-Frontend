import { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { ChevronDown, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MultiSelectYearProps {
  selectedYears: string[]
  onSelectionChange: (years: string[]) => void
  disabled?: boolean
}

const YEARS = Array.from({ length: 30 }, (_, i) => (new Date().getFullYear() - i).toString())

export function MultiSelectYear({
  selectedYears,
  onSelectionChange,
  disabled = false,
}: MultiSelectYearProps) {
  const [open, setOpen] = useState(false)

  const handleToggleYear = (year: string) => {
    if (selectedYears.includes(year)) {
      onSelectionChange(selectedYears.filter((y) => y !== year))
    } else {
      onSelectionChange([...selectedYears, year])
    }
  }

  const handleSelectAll = () => {
    if (selectedYears.length === YEARS.length) {
      onSelectionChange([])
    } else {
      onSelectionChange([...YEARS])
    }
  }

  const handleClear = () => {
    onSelectionChange([])
  }

  const displayText =
    selectedYears.length === 0
      ? 'All Years'
      : selectedYears.length === 1
        ? selectedYears[0]
        : `${selectedYears.length} selected`

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "h-10 w-[160px] justify-between font-normal",
            selectedYears.length > 0 && "text-foreground"
          )}
          disabled={disabled}
        >
          <span className="truncate">{displayText}</span>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-4" align="start">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Checkbox
              checked={selectedYears.length === YEARS.length && YEARS.length > 0}
              onCheckedChange={handleSelectAll}
            />
            <span className="text-sm font-medium">Select All</span>
          </div>
          {selectedYears.length > 0 && (
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
        <div className="grid grid-cols-4 gap-2 max-h-[300px] overflow-y-auto">
          {YEARS.map((year) => {
            const isSelected = selectedYears.includes(year)
            return (
              <div
                key={year}
                className="flex items-center space-x-2 p-2 rounded-md hover:bg-accent cursor-pointer"
                onClick={() => handleToggleYear(year)}
              >
                <Checkbox
                  checked={isSelected}
                  onCheckedChange={() => handleToggleYear(year)}
                />
                <label className="text-sm cursor-pointer flex-1">
                  {year}
                </label>
              </div>
            )
          })}
        </div>
        {selectedYears.length > 0 && (
          <div className="mt-4 pt-4 border-t flex flex-wrap gap-2">
            {selectedYears.map((year) => (
              <Badge
                key={year}
                variant="secondary"
                className="text-xs"
              >
                {year}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleToggleYear(year)
                  }}
                  className="ml-1 hover:bg-destructive/20 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}

