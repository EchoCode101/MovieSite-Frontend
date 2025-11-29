import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useCreateProfile, useUpdateProfile } from '../hooks/useProfiles'
import type { Profile, CreateProfileData, UpdateProfileData } from '../types'
import { Loader2 } from 'lucide-react'

interface ProfileFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  profile?: Profile | null
  onSuccess?: () => void
}

const LANGUAGES = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
  { value: 'it', label: 'Italian' },
  { value: 'pt', label: 'Portuguese' },
  { value: 'ru', label: 'Russian' },
  { value: 'zh', label: 'Chinese' },
  { value: 'ja', label: 'Japanese' },
  { value: 'ko', label: 'Korean' },
  { value: 'ar', label: 'Arabic' },
  { value: 'hi', label: 'Hindi' },
]

export function ProfileForm({ open, onOpenChange, profile, onSuccess }: ProfileFormProps) {
  const isEditing = !!profile
  const createProfile = useCreateProfile()
  const updateProfile = useUpdateProfile()

  const [formData, setFormData] = useState<CreateProfileData & { pin?: string }>({
    name: '',
    avatar_url: '',
    is_kid: false,
    language: 'en',
    pin: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        avatar_url: profile.avatar_url || '',
        is_kid: profile.is_kid || false,
        language: profile.language || 'en',
        pin: '', // Don't pre-fill PIN for security
      })
    } else {
      setFormData({
        name: '',
        avatar_url: '',
        is_kid: false,
        language: 'en',
        pin: '',
      })
    }
    setErrors({})
  }, [profile, open])

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.name || formData.name.trim().length === 0) {
      newErrors.name = 'Profile name is required'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Profile name must be at least 2 characters'
    } else if (formData.name.trim().length > 50) {
      newErrors.name = 'Profile name must be less than 50 characters'
    }

    if (formData.is_kid && formData.pin) {
      if (formData.pin.length < 4) {
        newErrors.pin = 'PIN must be at least 4 digits'
      } else if (formData.pin.length > 8) {
        newErrors.pin = 'PIN must be less than 8 digits'
      } else if (!/^\d+$/.test(formData.pin)) {
        newErrors.pin = 'PIN must contain only digits'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    try {
      if (isEditing && profile) {
        const updateData: UpdateProfileData = {
          name: formData.name.trim(),
          avatar_url: formData.avatar_url?.trim() || undefined,
          is_kid: formData.is_kid,
          language: formData.language,
        }

        if (formData.pin) {
          updateData.pin = formData.pin
        }

        await updateProfile.mutateAsync({
          id: profile.id,
          data: updateData,
        })
      } else {
        const createData: CreateProfileData = {
          name: formData.name.trim(),
          avatar_url: formData.avatar_url?.trim() || undefined,
          is_kid: formData.is_kid,
          language: formData.language,
        }

        if (formData.pin) {
          createData.pin = formData.pin
        }

        await createProfile.mutateAsync(createData)
      }

      onOpenChange(false)
      onSuccess?.()
    } catch (error) {
      // Error is handled by the hook's toast
    }
  }

  const isLoading = createProfile.isPending || updateProfile.isPending

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Profile' : 'Create Profile'}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? 'Update your profile information and preferences.'
              : 'Create a new profile to personalize your viewing experience.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">
                Profile Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter profile name"
                required
                disabled={isLoading}
                aria-invalid={!!errors.name}
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="avatar_url">Avatar URL (Optional)</Label>
              <Input
                id="avatar_url"
                type="url"
                value={formData.avatar_url || ''}
                onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
                placeholder="https://example.com/avatar.jpg"
                disabled={isLoading}
              />
              <p className="text-xs text-muted-foreground">
                Enter a URL to an image for the profile avatar
              </p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="language">Language</Label>
              <Select
                value={formData.language}
                onValueChange={(value) => setFormData({ ...formData, language: value })}
                disabled={isLoading}
              >
                <SelectTrigger id="language">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {LANGUAGES.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="is_kid"
                checked={formData.is_kid}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, is_kid: checked === true })
                }
                disabled={isLoading}
              />
              <Label
                htmlFor="is_kid"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Kids Profile
              </Label>
            </div>

            {formData.is_kid && (
              <div className="grid gap-2">
                <Label htmlFor="pin">
                  PIN (Optional) <span className="text-xs text-muted-foreground">(4-8 digits)</span>
                </Label>
                <Input
                  id="pin"
                  type="password"
                  value={formData.pin || ''}
                  onChange={(e) => setFormData({ ...formData, pin: e.target.value })}
                  placeholder="Enter PIN (optional)"
                  maxLength={8}
                  disabled={isLoading}
                  aria-invalid={!!errors.pin}
                />
                {errors.pin && (
                  <p className="text-sm text-destructive">{errors.pin}</p>
                )}
                <p className="text-xs text-muted-foreground">
                  Set a PIN to lock this kids profile
                </p>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isEditing ? 'Update Profile' : 'Create Profile'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

