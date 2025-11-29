import { useState, useEffect } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { X, Search, ArrowUp, ArrowDown } from 'lucide-react'
import { useGenres } from '@/features/genres/hooks/useGenres'
import { cn } from '@/lib/utils'
import { MultiSelectYear } from './multi-select-year'
import { MultiSelectGenre } from './multi-select-genre'

interface FilterBarProps {
  contentType?: 'video' | 'movie' | 'tv-show' | 'episode'
  search?: string
  genre?: string | string[]
  year?: string | string[]
  sort?: string
  sort_order?: 'ASC' | 'DESC'
  access_type?: string
  limit?: number
  onSearchChange: (value: string) => void
  onGenreChange: (value: string | string[]) => void
  onYearChange: (value: string | string[]) => void
  onSortChange: (value: string) => void
  onSortOrderChange: (value: 'ASC' | 'DESC') => void
  onAccessTypeChange: (value: string) => void
  onLimitChange: (value: number) => void
  onClearFilters: () => void
}

const ACCESS_TYPE_OPTIONS = [
  { value: 'All', label: 'All' },
  { value: 'free', label: 'Free' },
  { value: 'subscription', label: 'Premium' },
  { value: 'pay_per_view', label: 'PPV' },
]

const LIMIT_OPTIONS = [12, 24, 48, 96]

// Base sort options for all content types
const BASE_SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'popular', label: 'Popular' },
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
]

// Additional sort options for movies and TV shows
const RATING_SORT_OPTIONS = [
  { value: 'rating', label: 'Rating' },
]

// Additional sort options for videos
const VIDEO_SORT_OPTIONS = [
  { value: 'most_viewed', label: 'Most Viewed' },
  { value: 'most_liked', label: 'Most Liked' },
]

export function FilterBar({
  contentType = 'video',
  search = '',
  genre = 'All',
  year = 'All',
  sort = 'featured',
  sort_order = 'DESC',
  access_type = 'All',
  limit = 12,
  onSearchChange,
  onGenreChange,
  onYearChange,
  onSortChange,
  onSortOrderChange,
  onAccessTypeChange,
  onLimitChange,
  onClearFilters,
}: FilterBarProps) {
  const [searchValue, setSearchValue] = useState(search)
  const { data: genres = [], isLoading: genresLoading } = useGenres()

  // Normalize genre and year to arrays
  const selectedGenres = Array.isArray(genre) ? genre : genre !== 'All' ? [genre] : []
  const selectedYears = Array.isArray(year) ? year : year !== 'All' ? [year] : []

  // Sync search value when prop changes (e.g., from URL)
  useEffect(() => {
    setSearchValue(search)
  }, [search])

  // Handle search submit (Enter key or search button)
  const handleSearchSubmit = () => {
    onSearchChange(searchValue)
  }

  // Handle Enter key press
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSearchSubmit()
    }
  }

  // Handle clear search
  const handleClearSearch = () => {
    setSearchValue('')
    onSearchChange('')
  }

  // Get sort options based on content type
  const getSortOptions = () => {
    if (contentType === 'movie' || contentType === 'tv-show') {
      return [...BASE_SORT_OPTIONS, ...RATING_SORT_OPTIONS]
    }
    if (contentType === 'video') {
      return [...BASE_SORT_OPTIONS, ...VIDEO_SORT_OPTIONS]
    }
    return BASE_SORT_OPTIONS
  }

  const sortOptions = getSortOptions()
  
  // Check if sort order should be disabled (for newest/oldest as they have built-in direction)
  const isSortOrderDisabled = sort === 'newest' || sort === 'oldest'

  // Check if any filters are active
  const hasActiveFilters =
    searchValue !== '' ||
    selectedGenres.length > 0 ||
    selectedYears.length > 0 ||
    sort !== 'featured' ||
    (!isSortOrderDisabled && sort_order !== 'DESC') ||
    access_type !== 'All' ||
    limit !== 12

  const handleGenreChange = (genreIds: string[]) => {
    onGenreChange(genreIds.length === 0 ? 'All' : genreIds)
  }

  const handleYearChange = (years: string[]) => {
    onYearChange(years.length === 0 ? 'All' : years)
  }

  return (
    <div className="mb-8">
      <div className="flex flex-wrap items-end gap-4 sm:gap-4 md:gap-6">
        {/* Search */}
        <div className="flex flex-col gap-1.5 flex-1 min-w-[200px] sm:min-w-[240px]">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Search
          </label>
          <div className="relative flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                type="text"
                placeholder="Search titles, descriptions..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="pl-10 pr-10 h-10"
              />
              {searchValue && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <Button
              type="button"
              onClick={handleSearchSubmit}
              size="sm"
              className="h-10 px-4 gap-2"
            >
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline">Search</span>
            </Button>
          </div>
        </div>

        {/* Genre Filter - Only show for movie, tv-show, episode */}
        {(contentType === 'movie' || contentType === 'tv-show' || contentType === 'episode') && (
          <div className="flex flex-col gap-1.5 w-[160px]">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Genre
            </label>
            <MultiSelectGenre
              genres={genres}
              selectedGenreIds={selectedGenres}
              onSelectionChange={handleGenreChange}
              disabled={genresLoading}
            />
          </div>
        )}

        {/* Year Filter */}
        <div className="flex flex-col gap-1.5 w-[160px]">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Year
          </label>
          <MultiSelectYear
            selectedYears={selectedYears}
            onSelectionChange={handleYearChange}
          />
        </div>

        {/* Access Type Filter */}
        <div className="flex flex-col gap-1.5 w-[160px]">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Access
          </label>
          <Select value={access_type} onValueChange={onAccessTypeChange}>
            <SelectTrigger className="h-10 w-full">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              {ACCESS_TYPE_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Sort Filter Group */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Sort By
          </label>
          <div className="flex items-center gap-2">
            <Select value={sort} onValueChange={onSortChange}>
              <SelectTrigger className="h-10 w-[160px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {/* Sort Order Toggle - Always visible but disabled for newest/oldest */}
            <div className="flex items-center gap-1 border rounded-md p-0.5 bg-muted/50 h-10">
              <Button
                type="button"
                variant={sort_order === 'ASC' ? 'default' : 'ghost'}
                size="sm"
                className={cn(
                  "h-9 px-3 gap-1.5",
                  sort_order === 'ASC' && "bg-primary text-primary-foreground"
                )}
                onClick={() => onSortOrderChange('ASC')}
                disabled={isSortOrderDisabled}
                title="Ascending"
              >
                <ArrowUp className="h-3.5 w-3.5" />
                <span className="text-xs font-medium">Asc</span>
              </Button>
              <Button
                type="button"
                variant={sort_order === 'DESC' ? 'default' : 'ghost'}
                size="sm"
                className={cn(
                  "h-9 px-3 gap-1.5",
                  sort_order === 'DESC' && "bg-primary text-primary-foreground"
                )}
                onClick={() => onSortOrderChange('DESC')}
                disabled={isSortOrderDisabled}
                title="Descending"
              >
                <ArrowDown className="h-3.5 w-3.5" />
                <span className="text-xs font-medium">Desc</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Items Per Page */}
        <div className="flex flex-col gap-1.5 w-[160px]">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Per Page
          </label>
          <Select
            value={limit.toString()}
            onValueChange={(value) => onLimitChange(Number(value))}
          >
            <SelectTrigger className="h-10 w-full">
              <SelectValue placeholder="12" />
            </SelectTrigger>
            <SelectContent>
              {LIMIT_OPTIONS.map((option) => (
                <SelectItem key={option} value={option.toString()}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Clear Filters Button - Always visible but disabled when no filters */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider opacity-0">
            Actions
          </label>
          <Button
            variant="outline"
            size="sm"
            onClick={onClearFilters}
            disabled={!hasActiveFilters}
            className="gap-2 h-10 w-[100px]"
          >
            <X className="h-4 w-4" />
            Clear
          </Button>
        </div>
      </div>
    </div>
  )
}
