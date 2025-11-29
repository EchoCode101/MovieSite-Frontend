import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { ProfileForm } from './profile-form'
import { useDeleteProfile } from '../hooks/useProfiles'
import type { Profile } from '../types'
import { Edit, Trash2, User } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ProfileCardProps {
  profile: Profile
  onEdit?: () => void
  onDelete?: () => void
  className?: string
}

export function ProfileCard({ profile, onEdit, onDelete, className }: ProfileCardProps) {
  const [isEditOpen, setIsEditOpen] = useState(false)
  const deleteProfile = useDeleteProfile()

  const handleDelete = async () => {
    try {
      await deleteProfile.mutateAsync(profile.id)
      onDelete?.()
    } catch (error) {
      // Error is handled by the hook's toast
    }
  }

  const initials = profile.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <>
      <Card className={cn('hover:shadow-lg transition-shadow', className)}>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={profile.avatar_url || undefined} alt={profile.name} />
              <AvatarFallback className="text-lg">
                {profile.avatar_url ? <User className="h-8 w-8" /> : initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-semibold truncate">{profile.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                {profile.is_kid ? (
                  <Badge variant="secondary" className="text-xs">
                    Kids Profile
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-xs">
                    Standard
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center justify-between">
            <span>Language:</span>
            <span className="font-medium text-foreground">
              {profile.language.toUpperCase()}
            </span>
          </div>
          {profile.autoplay_next !== undefined && (
            <div className="flex items-center justify-between">
              <span>Autoplay Next:</span>
              <span className="font-medium text-foreground">
                {profile.autoplay_next ? 'Yes' : 'No'}
              </span>
            </div>
          )}
          {profile.autoplay_trailers !== undefined && (
            <div className="flex items-center justify-between">
              <span>Autoplay Trailers:</span>
              <span className="font-medium text-foreground">
                {profile.autoplay_trailers ? 'Yes' : 'No'}
              </span>
            </div>
          )}
          {profile.is_kid && profile.pin && (
            <div className="flex items-center justify-between">
              <span>PIN Protected:</span>
              <span className="font-medium text-foreground">Yes</span>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex gap-2 pt-4">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => setIsEditOpen(true)}
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm" className="flex-1">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Profile</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete the profile &quot;{profile.name}&quot;? This
                  action cannot be undone and will remove all watchlist items and watch history
                  associated with this profile.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} className="bg-destructive">
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      </Card>

      <ProfileForm
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        profile={profile}
        onSuccess={() => {
          setIsEditOpen(false)
          onEdit?.()
        }}
      />
    </>
  )
}

