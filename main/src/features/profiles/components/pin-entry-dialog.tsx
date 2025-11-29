import { useState, useRef, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2, Lock } from 'lucide-react'
import { validateProfilePin } from '../api/profiles'
import { toast } from 'sonner'

interface PinEntryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  profileId: string
  profileName: string
  onSuccess: () => void
  onCancel?: () => void
}

/**
 * Dialog component for entering PIN to access a kids profile
 */
export function PinEntryDialog({
  open,
  onOpenChange,
  profileId,
  profileName,
  onSuccess,
  onCancel,
}: PinEntryDialogProps) {
  const [pin, setPin] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Focus input when dialog opens
  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [open])

  // Reset state when dialog opens/closes
  useEffect(() => {
    if (!open) {
      setPin('')
      setError(null)
    }
  }, [open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!pin || pin.length < 4) {
      setError('PIN must be at least 4 digits')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const isValid = await validateProfilePin(profileId, pin)
      
      if (isValid) {
        // Store PIN validation in sessionStorage for current session
        const validatedProfiles = JSON.parse(sessionStorage.getItem('validatedProfiles') || '[]')
        if (!validatedProfiles.includes(profileId)) {
          validatedProfiles.push(profileId)
          sessionStorage.setItem('validatedProfiles', JSON.stringify(validatedProfiles))
        }
        
        toast.success('PIN validated successfully')
        onSuccess()
        onOpenChange(false)
      } else {
        setError('Incorrect PIN. Please try again.')
        setPin('')
        if (inputRef.current) {
          inputRef.current.focus()
        }
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to validate PIN'
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setPin('')
    setError(null)
    onCancel?.()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-full bg-primary/10">
              <Lock className="h-5 w-5 text-primary" />
            </div>
            <DialogTitle>PIN Required</DialogTitle>
          </div>
          <DialogDescription>
            This profile is protected by a PIN. Please enter the PIN to access <strong>{profileName}</strong>.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="pin">Enter PIN</Label>
            <Input
              id="pin"
              ref={inputRef}
              type="password"
              inputMode="numeric"
              pattern="[0-9]*"
              value={pin}
              onChange={(e) => {
                // Only allow numeric input
                const value = e.target.value.replace(/\D/g, '')
                setPin(value)
                setError(null)
              }}
              placeholder="Enter 4-8 digit PIN"
              maxLength={8}
              disabled={isLoading}
              className="text-center text-2xl tracking-widest font-mono"
              autoComplete="off"
              aria-invalid={!!error}
            />
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading || pin.length < 4}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Unlock Profile
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

/**
 * Check if a profile PIN has been validated in the current session
 */
export function isProfilePinValidated(profileId: string): boolean {
  if (typeof window === 'undefined') return false
  const validatedProfiles = JSON.parse(sessionStorage.getItem('validatedProfiles') || '[]')
  return validatedProfiles.includes(profileId)
}

/**
 * Clear PIN validation for a profile (e.g., on logout)
 */
export function clearProfilePinValidation(profileId?: string): void {
  if (typeof window === 'undefined') return
  if (profileId) {
    const validatedProfiles = JSON.parse(sessionStorage.getItem('validatedProfiles') || '[]')
    const filtered = validatedProfiles.filter((id: string) => id !== profileId)
    sessionStorage.setItem('validatedProfiles', JSON.stringify(filtered))
  } else {
    // Clear all validations
    sessionStorage.removeItem('validatedProfiles')
  }
}

