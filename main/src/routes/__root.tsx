import { Outlet, createRootRoute } from '@tanstack/react-router'
import { Navbar } from '@/components/common/navbar'
import { Footer } from '@/components/common/footer'
import { NotFound } from '@/components/common/not-found'
import { Toaster } from '@/components/ui/toaster'
import { ErrorBoundary } from '@/components/common/error-boundary'

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFound,
})

function RootComponent() {
  return (
    <ErrorBoundary>
      <div className="flex min-h-screen flex-col font-sans antialiased">
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
        <Toaster />
      </div>
    </ErrorBoundary>
  )
}
