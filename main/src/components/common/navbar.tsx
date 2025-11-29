import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Menu,
  ChevronDown,
  Search,
  User,
  X,
  BookmarkCheck,
  CreditCard,
  Monitor,
  Receipt,
  Users,
  ArrowUpCircle,
  Home,
  LayoutGrid,
  Radio,
  DollarSign,
  Info,
  Mail,
  Shield,
} from "lucide-react";
import { useUser, useLogout } from "@/features/auth/hooks/useAuth";
import { ProfileSelector } from "@/features/profiles/components/profile-selector";
import { ThemeToggle } from "@/components/ThemeToggle";
import { NotificationDropdown } from "@/components/NotificationDropdown";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { data: user } = useUser();
  const logout = useLogout();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Helper to check if a route is active
  const isActive = (path: string) => {
    return (
      location.pathname === path || location.pathname.startsWith(path + "/")
    );
  };

  // Calculate user initials for avatar fallback
  const userInitials =
    user?.first_name && user?.last_name
      ? `${user.first_name[0]}${user.last_name[0]}`.toUpperCase()
      : user?.username?.[0]?.toUpperCase() || "U";

  // Calculate full name for avatar alt text
  const userFullName =
    user?.first_name || user?.last_name
      ? `${user.first_name || ""} ${user.last_name || ""}`.trim()
      : user?.username || "User";

  useEffect(() => {
    if (isSearchExpanded && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchExpanded]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate({ to: "/catalog", search: { search: searchQuery } });
      setIsSearchExpanded(false);
      setIsMobileSearchOpen(false);
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
        {/* Left Section: Logo + Hamburger (Mobile) */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Mobile Hamburger Menu */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] sm:w-[300px] p-0">
              <div className="flex flex-col h-full">
                <SheetHeader className="px-6 py-4 border-b">
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <nav className="flex-1 overflow-y-auto px-4 py-4">
                  <div className="flex flex-col gap-1">
                    <Link
                      to="/"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition-colors",
                        isActive("/")
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-accent hover:text-accent-foreground"
                      )}
                    >
                      <Home className="h-5 w-5" />
                      Home
                    </Link>
                    <Link
                      to="/catalog"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition-colors",
                        isActive("/catalog")
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-accent hover:text-accent-foreground"
                      )}
                    >
                      <LayoutGrid className="h-5 w-5" />
                      Catalog
                    </Link>
                    <Link
                      to="/live"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition-colors",
                        isActive("/live")
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-accent hover:text-accent-foreground"
                      )}
                    >
                      <Radio className="h-5 w-5" />
                      Live
                    </Link>
                    <Link
                      to="/pricing"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition-colors",
                        isActive("/pricing")
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-accent hover:text-accent-foreground"
                      )}
                    >
                      <DollarSign className="h-5 w-5" />
                      Pricing
                    </Link>
                  </div>

                  <div className="pt-6 mt-6 border-t">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-4">
                      Company
                    </p>
                    <div className="flex flex-col gap-1">
                      <Link
                        to="/about"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition-colors",
                          isActive("/about")
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-accent hover:text-accent-foreground"
                        )}
                      >
                        <Info className="h-5 w-5" />
                        About
                      </Link>
                      <Link
                        to="/contact"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition-colors",
                          isActive("/contact")
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-accent hover:text-accent-foreground"
                        )}
                      >
                        <Mail className="h-5 w-5" />
                        Contact
                      </Link>
                      <Link
                        to="/privacy"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition-colors",
                          isActive("/privacy")
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-accent hover:text-accent-foreground"
                        )}
                      >
                        <Shield className="h-5 w-5" />
                        Privacy
                      </Link>
                    </div>
                  </div>

                  {user && (
                    <>
                      <div className="pt-6 mt-6 border-t">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-4">
                          Account
                        </p>
                        <div className="flex flex-col gap-1">
                          <Link
                            to="/profile"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={cn(
                              "flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition-colors",
                              isActive("/profile")
                                ? "bg-primary text-primary-foreground"
                                : "hover:bg-accent hover:text-accent-foreground"
                            )}
                          >
                            <User className="h-5 w-5" />
                            Profile
                          </Link>
                          <Link
                            to="/watchlist"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={cn(
                              "flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition-colors",
                              isActive("/watchlist")
                                ? "bg-primary text-primary-foreground"
                                : "hover:bg-accent hover:text-accent-foreground"
                            )}
                          >
                            <BookmarkCheck className="h-5 w-5" />
                            My Watchlist
                          </Link>
                          <Link
                            to="/subscriptions"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={cn(
                              "flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition-colors",
                              isActive("/subscriptions")
                                ? "bg-primary text-primary-foreground"
                                : "hover:bg-accent hover:text-accent-foreground"
                            )}
                          >
                            <CreditCard className="h-5 w-5" />
                            My Subscriptions
                          </Link>
                          <Link
                            to="/devices"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={cn(
                              "flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition-colors",
                              isActive("/devices")
                                ? "bg-primary text-primary-foreground"
                                : "hover:bg-accent hover:text-accent-foreground"
                            )}
                          >
                            <Monitor className="h-5 w-5" />
                            My Devices
                          </Link>
                          <Link
                            to="/transactions"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={cn(
                              "flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition-colors",
                              isActive("/transactions")
                                ? "bg-primary text-primary-foreground"
                                : "hover:bg-accent hover:text-accent-foreground"
                            )}
                          >
                            <Receipt className="h-5 w-5" />
                            Transaction History
                          </Link>
                        </div>
                      </div>

                      {/* Profile Selector in Mobile Menu */}
                      <div className="pt-6 mt-6 border-t px-4">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                          Switch Profile
                        </p>
                        <ProfileSelector />
                      </div>
                    </>
                  )}
                </nav>
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <img src="/logo.svg" alt="PunjabiDub Logo" className="h-6" />
          </Link>
        </div>

        {/* Center Section: Navigation Links (Desktop Only) */}
        <div className="hidden lg:flex items-center gap-6 flex-1 justify-center">
          <Link
            to="/catalog"
            className="text-sm font-medium transition-colors hover:text-primary"
            activeProps={{ className: "text-primary" }}
          >
            Catalog
          </Link>
          {/* <Link
            to="/catalog"
            search={{ type: "movie" }}
            className="text-sm font-medium transition-colors hover:text-primary"
            activeProps={{ className: "text-primary" }}
          >
            Movies
          </Link>
          <Link
            to="/catalog"
            search={{ type: "tv-show" }}
            className="text-sm font-medium transition-colors hover:text-primary"
            activeProps={{ className: "text-primary" }}
          >
            TV Shows
          </Link> */}
          <Link
            to="/live"
            className="text-sm font-medium transition-colors hover:text-primary"
            activeProps={{ className: "text-primary" }}
          >
            Live
          </Link>
          <Link
            to="/pricing"
            className="text-sm font-medium transition-colors hover:text-primary"
            activeProps={{ className: "text-primary" }}
          >
            Pricing
          </Link>

          {/* Company Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1">
                Company
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to="/about">About</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/contact">Contact</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/privacy">Privacy</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Right Section: Search + User Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Search - Desktop: Expandable, Mobile: Icon Only */}
          <div className="hidden md:block flex-shrink-0">
            <form
              onSubmit={handleSearch}
              className={cn(
                "relative flex items-center transition-all duration-300 ease-in-out",
                isSearchExpanded ? "w-64 max-w-[280px]" : "w-10"
              )}
            >
              {isSearchExpanded ? (
                <>
                  <Search className="absolute left-3 h-4 w-4 text-muted-foreground z-10" />
                  <Input
                    ref={searchInputRef}
                    type="search"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-10 w-full"
                    onBlur={() => !searchQuery && setIsSearchExpanded(false)}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 h-8 w-8 hover:bg-transparent"
                    onClick={() => {
                      setSearchQuery("");
                      setIsSearchExpanded(false);
                    }}
                  >
                    <X className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </>
              ) : (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSearchExpanded(true)}
                  className="h-9 w-9"
                >
                  <Search className="h-5 w-5" />
                </Button>
              )}
            </form>
          </div>

          {/* Mobile Search - Opens in Sheet */}
          <Sheet open={isMobileSearchOpen} onOpenChange={setIsMobileSearchOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="h-auto">
              <SheetHeader>
                <SheetTitle>Search</SheetTitle>
              </SheetHeader>
              <form onSubmit={handleSearch} className="mt-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search videos, movies, TV shows..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                    autoFocus
                  />
                </div>
              </form>
            </SheetContent>
          </Sheet>

          {/* User Actions */}
          <div className="flex items-center gap-1">
            <ThemeToggle />
            {user && <NotificationDropdown />}
            {user && (
              <div className="hidden sm:block">
                <ProfileSelector />
              </div>
            )}

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2 h-9 px-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={user.profile_pic || ""}
                        alt={userFullName}
                      />
                      <AvatarFallback className="text-xs border border-primary text-primary dark:bg-primary dark:text-primary-foreground dark:border-none">
                        {userInitials}
                      </AvatarFallback>
                    </Avatar>
                    <ChevronDown className="h-4 w-4 hidden sm:block" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">{userFullName}</p>
                    <p className="text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/profiles" className="flex items-center">
                      <Users className="mr-2 h-4 w-4" />
                      My Profiles
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/watchlist" className="flex items-center">
                      <BookmarkCheck className="mr-2 h-4 w-4" />
                      My Watchlist
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/subscriptions" className="flex items-center">
                      <CreditCard className="mr-2 h-4 w-4" />
                      My Subscriptions
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/devices" className="flex items-center">
                      <Monitor className="mr-2 h-4 w-4" />
                      My Devices
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/transactions" className="flex items-center">
                      <Receipt className="mr-2 h-4 w-4" />
                      Transaction History
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/pricing" className="flex items-center">
                      <ArrowUpCircle className="mr-2 h-4 w-4" />
                      Upgrade Plan
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => logout()}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="hidden sm:flex"
                >
                  <Link to="/auth/login">Login</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link to="/auth/register">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
