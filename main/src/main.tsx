import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router'
import './styles.css'
import { ThemeProvider } from './components/theme-provider'
import { initializeAuth } from './lib/auth-init'
import { logger } from './lib/logger'
import { getRouter } from './router'

const router = getRouter()

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Initialize authentication state before rendering
initializeAuth().catch((error) => {
  logger.error('Failed to initialize auth', error instanceof Error ? error : new Error('Unknown error'))
})

const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <React.StrictMode>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </React.StrictMode>,
  )
}
