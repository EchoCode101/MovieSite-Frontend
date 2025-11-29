import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { FileQuestion } from 'lucide-react'

export function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      <div className="bg-muted p-6 rounded-full mb-6">
        <FileQuestion className="w-12 h-12 text-muted-foreground" />
      </div>
      <h1 className="text-4xl font-bold tracking-tight mb-2">Page Not Found</h1>
      <p className="text-muted-foreground text-lg mb-8 max-w-md">
        Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
      </p>
      <div className="flex gap-4">
        <Button asChild>
          <Link to="/">Go Home</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to="/catalog">Browse Catalog</Link>
        </Button>
      </div>
    </div>
  )
}

