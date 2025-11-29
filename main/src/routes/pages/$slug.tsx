import { createFileRoute } from '@tanstack/react-router'
import { usePage } from '@/features/pages/hooks/usePages'
import { Loader2 } from 'lucide-react'

export const Route = createFileRoute('/pages/$slug')({
  component: PageViewer,
})

function PageViewer() {
  const { slug } = Route.useParams()
  const { data: page, isLoading, error } = usePage(slug)

  if (isLoading)
    return (
      <div className="container mx-auto py-8 text-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
      </div>
    )

  if (error)
    return (
      <div className="container mx-auto py-8 text-center text-destructive">
        Error loading page: {error.message}
      </div>
    )

  if (!page)
    return (
      <div className="container mx-auto py-8 text-center">Page not found</div>
    )

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">{page.title}</h1>
        <div
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      </div>
    </div>
  )
}

