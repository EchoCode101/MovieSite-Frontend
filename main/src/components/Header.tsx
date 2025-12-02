import { Link, useRouterState } from '@tanstack/react-router'
import { useState } from 'react'
import {
  Home,
  Menu,
  Network,
  SquareFunction,
  StickyNote,
} from 'lucide-react'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const router = useRouterState()
  const currentPath = router.location.pathname

  const isActive = (path: string) => currentPath === path

  const demoItems = [
    {
      title: 'TanStack Query',
      href: '/demo/tanstack-query',
      icon: Network,
    },
    {
      title: 'Start - Server Functions',
      href: '/demo/start/server-funcs',
      icon: SquareFunction,
    },
    {
      title: 'Start - API Request',
      href: '/demo/start/api-request',
      icon: Network,
    },
  ]

  const ssrItems = [
    {
      title: 'SPA Mode',
      href: '/demo/start/ssr/spa-mode',
      icon: StickyNote,
    },
    {
      title: 'Full SSR',
      href: '/demo/start/ssr/full-ssr',
      icon: StickyNote,
    },
    {
      title: 'Data Only',
      href: '/demo/start/ssr/data-only',
      icon: StickyNote,
    },
  ]

  return (
    <>
      {/* Desktop Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-gray-900/80">
        <div className="container flex h-16 items-center justify-between px-4">
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              {/* Home Link */}
              <NavigationMenuItem>
                <Link
                  to="/"
                  className={cn(
                    'group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-800 hover:text-white focus:bg-gray-800 focus:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50',
                    isActive('/') &&
                      'bg-cyan-600 text-white hover:bg-cyan-700'
                  )}
                >
                  <Home className="mr-2 h-4 w-4" />
                  Home
                </Link>
              </NavigationMenuItem>

              {/* Demos Dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-gray-800 data-[state=open]:bg-gray-800">
                  Demos
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[400px] gap-3 p-4">
                    {demoItems.map((item) => {
                      const Icon = item.icon
                      return (
                        <Link
                          key={item.href}
                          to={item.href}
                          className={cn(
                            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-800 hover:text-white focus:bg-gray-800 focus:text-white',
                            isActive(item.href) && 'bg-cyan-600/20 text-cyan-400'
                          )}
                        >
                          <div className="flex items-center gap-2">
                            <Icon className="h-4 w-4" />
                            <div className="text-sm font-medium leading-none">
                              {item.title}
                            </div>
                          </div>
                        </Link>
                      )
                    })}
                    <Separator className="my-2" />
                    <div className="px-3 py-2">
                      <div className="mb-2 text-sm font-semibold text-gray-400">
                        Start - SSR Demos
                      </div>
                      <div className="space-y-1">
                        {ssrItems.map((item) => {
                          const Icon = item.icon
                          return (
                            <Link
                              key={item.href}
                              to={item.href}
                              className={cn(
                                'block select-none rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-gray-800 hover:text-white focus:bg-gray-800 focus:text-white',
                                isActive(item.href) &&
                                  'bg-cyan-600/20 text-cyan-400'
                              )}
                            >
                              <div className="flex items-center gap-2 text-sm">
                                <Icon className="h-3 w-3" />
                                <span>{item.title}</span>
                              </div>
                            </Link>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Mobile Menu Button */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] bg-gray-900 text-white">
              <SheetHeader>
                <SheetTitle className="text-left">Navigation</SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-2">
                {/* Home Link */}
                <Link
                  to="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-800',
                    isActive('/') && 'bg-cyan-600 text-white'
                  )}
                >
                  <Home className="h-4 w-4" />
                  Home
                </Link>

                <Separator className="my-2" />

                {/* Demo Links */}
                <div className="space-y-1">
                  <div className="px-3 py-2 text-xs font-semibold uppercase text-gray-400">
                    Demos
                  </div>
                  {demoItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.href}
                        to={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-gray-800',
                          isActive(item.href) && 'bg-cyan-600/20 text-cyan-400'
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        {item.title}
                      </Link>
                    )
                  })}
                </div>

                <Separator className="my-2" />

                {/* SSR Demos */}
                <div className="space-y-1">
                  <div className="px-3 py-2 text-xs font-semibold uppercase text-gray-400">
                    Start - SSR Demos
                  </div>
                  {ssrItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.href}
                        to={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-gray-800',
                          isActive(item.href) && 'bg-cyan-600/20 text-cyan-400'
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        {item.title}
                      </Link>
                    )
                  })}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </>
  )
}
