import { createFileRoute, useParams } from '@tanstack/react-router'
import { useVideos } from '@/features/videos/hooks/useVideos'
import { VideoCard } from '@/features/videos/components/video-card'
import { FilterBar } from '@/features/videos/components/filter-bar'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { Loader2 } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'
import { z } from 'zod'

const categorySearchSchema = z.object({
  genre: z.string().optional().default('All'),
  year: z.string().optional().default('All'),
  sort: z.string().optional().default('featured'),
  page: z.number().optional().default(1),
})

export const Route = createFileRoute('/category/$categoryId')({
  validateSearch: categorySearchSchema,
  component: CategoryDetailedPage,
})

function CategoryDetailedPage() {
  const { categoryId } = useParams({ from: '/category/$categoryId' })
  const navigate = useNavigate({ from: '/category/$categoryId' })
  const { genre = 'All', year = 'All', sort = 'featured', page = 1 } = Route.useSearch()
  
  const { data, isLoading, error } = useVideos({ page, limit: 12 })
  const videos = data?.videos
  const totalPages = data?.totalPages || 1

  const handleGenreChange = (value: string) => {
    navigate({ search: (prev) => ({ ...prev, genre: value, page: 1 }) })
  }

  const handleYearChange = (value: string) => {
    navigate({ search: (prev) => ({ ...prev, year: value, page: 1 }) })
  }

  const handleSortChange = (value: string) => {
    navigate({ search: (prev) => ({ ...prev, sort: value, page: 1 }) })
  }

  const handleClearFilters = () => {
    navigate({ search: { page: 1 } })
  }

  const handlePageChange = (newPage: number) => {
    navigate({ search: (prev) => ({ ...prev, page: newPage }) })
  }

  // Format category name for display
  const categoryName = categoryId
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  return (
    <div className="min-h-screen bg-background">
      {/* Category Header */}
      <section className="bg-muted/30 border-b">
        <div className="container mx-auto py-12 px-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            {categoryName}
          </h1>
          <p className="text-lg text-muted-foreground">
            Explore our collection of {categoryName.toLowerCase()} videos
          </p>
        </div>
      </section>

      <div className="container mx-auto py-12 px-4">
        {/* Filter Bar */}
        <FilterBar
          genre={genre}
          year={year}
          sort={sort}
          onGenreChange={handleGenreChange}
          onYearChange={handleYearChange}
          onSortChange={handleSortChange}
          onClearFilters={handleClearFilters}
        />

        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold tracking-tight">
            {videos?.length || 0} Videos Found
          </h2>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}
        
        {error && (
          <div className="text-center py-20">
            <p className="text-destructive text-lg">Failed to load videos. Please try again later.</p>
          </div>
        )}

        {/* Detailed Grid Layout - Larger cards with more info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {videos?.map((video) => (
            <div key={video.id} className="space-y-3">
              <VideoCard video={video} />
              <div className="px-2">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {video.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {videos?.length === 0 && !isLoading && (
          <div className="text-center text-muted-foreground mt-10">
            No videos found in this category. Try adjusting your filters.
          </div>
        )}

        {/* Pagination */}
        <div className="mt-8">
          <div className="text-sm text-muted-foreground mb-2 text-center">
            Page {page} of {totalPages} ({videos?.length || 0} videos on this page)
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => handlePageChange(Math.max(1, page - 1))}
                  className={page === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
              {[...Array(Math.min(totalPages, 5))].map((_, i) => {
                const pageNum = i + 1
                return (
                  <PaginationItem key={pageNum}>
                    <PaginationLink 
                      isActive={page === pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className="cursor-pointer"
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                )
              })}
              <PaginationItem>
                <PaginationNext 
                  onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
                  className={page === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  )
}
