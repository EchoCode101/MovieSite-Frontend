import { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useProfiles } from '../hooks/useProfiles'
import type { Profile } from '../types'
import { ChevronDown, User, Check, Lock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { PinEntryDialog, isProfilePinValidated } from './pin-entry-dialog'

interface ProfileSelectorProps {
  currentProfileId?: string | null
  onProfileSelect?: (profile: Profile) => void
  className?: string
}

const ACTIVE_PROFILE_KEY = 'activeProfileId'

/**
 * Get the active profile ID from localStorage
 */
export function getActiveProfileId(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(ACTIVE_PROFILE_KEY)
}

/**
 * Set the active profile ID in localStorage
 */
export function setActiveProfileId(profileId: string): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(ACTIVE_PROFILE_KEY, profileId)
}

/**
 * Clear the active profile ID from localStorage
 */
export function clearActiveProfileId(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(ACTIVE_PROFILE_KEY)
}

export function ProfileSelector({
  currentProfileId,
  onProfileSelect,
  className,
}: ProfileSelectorProps) {
  const { data: profiles, isLoading } = useProfiles()
  const [activeId, setActiveId] = useState<string | null>(
    currentProfileId || getActiveProfileId()
  )
  const [pinDialogOpen, setPinDialogOpen] = useState(false)
  const [pendingProfile, setPendingProfile] = useState<Profile | null>(null)

  if (isLoading || !profiles || profiles.length === 0) {
    return null
  }

  // If only one profile, don't show selector
  if (profiles.length <= 1) {
    return null
  }

  const activeProfile = profiles.find((p) => p.id === activeId) || profiles[0]

  const handleProfileSelect = (profile: Profile) => {
    // Check if this is a kids profile with PIN protection
    const isPinProtected = profile.is_kid && (profile.has_pin || profile.pin)
    
    if (isPinProtected && !isProfilePinValidated(profile.id)) {
      // Show PIN dialog
      setPendingProfile(profile)
      setPinDialogOpen(true)
    } else {
      // No PIN required or already validated, switch immediately
      setActiveId(profile.id)
      setActiveProfileId(profile.id)
      onProfileSelect?.(profile)
    }
  }

  const handlePinSuccess = () => {
    if (pendingProfile) {
      setActiveId(pendingProfile.id)
      setActiveProfileId(pendingProfile.id)
      onProfileSelect?.(pendingProfile)
      setPendingProfile(null)
    }
  }

  const handlePinCancel = () => {
    setPendingProfile(null)
  }

  const initials = activeProfile.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className={cn('gap-2', className)}>
            <Avatar className="h-8 w-8">
              <AvatarImage src={activeProfile.avatar_url || undefined} alt={activeProfile.name} />
              <AvatarFallback className="text-xs">
                {activeProfile.avatar_url ? <User className="h-4 w-4" /> : initials}
              </AvatarFallback>
            </Avatar>
            <span className="hidden sm:inline-block max-w-[120px] truncate">
              {activeProfile.name}
            </span>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Switch Profile</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {profiles.map((profile) => {
            const isPinProtected = profile.is_kid && (profile.has_pin || profile.pin)
            const isPinValidated = isPinProtected && isProfilePinValidated(profile.id)
            
            return (
              <DropdownMenuItem
                key={profile.id}
                onClick={() => handleProfileSelect(profile)}
                className="flex items-center gap-2 cursor-pointer"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src={profile.avatar_url || undefined} alt={profile.name} />
                  <AvatarFallback className="text-xs">
                    {profile.avatar_url ? (
                      <User className="h-4 w-4" />
                    ) : (
                      profile.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .toUpperCase()
                        .slice(0, 2)
                    )}
                  </AvatarFallback>
                </Avatar>
                <span className="flex-1 truncate">{profile.name}</span>
                <div className="flex items-center gap-1">
                  {isPinProtected && (
                    <Lock className={cn(
                      "h-3 w-3",
                      isPinValidated ? "text-green-500" : "text-muted-foreground"
                    )} />
                  )}
                  {profile.id === activeId && <Check className="h-4 w-4" />}
                </div>
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuContent>
      </DropdownMenu>

      {pendingProfile && (
        <PinEntryDialog
          open={pinDialogOpen}
          onOpenChange={setPinDialogOpen}
          profileId={pendingProfile.id}
          profileName={pendingProfile.name}
          onSuccess={handlePinSuccess}
          onCancel={handlePinCancel}
        />
      )}
    </>
  )
}

