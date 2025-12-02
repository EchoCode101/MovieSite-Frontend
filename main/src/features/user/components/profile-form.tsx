import { useState, useEffect } from 'react'
import { useUser } from '@/features/auth/hooks/useAuth'
import { useUpdateUserProfile } from '@/features/user/hooks/useUser'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Edit2, Save, X, User, Mail, Shield } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

export function ProfileForm() {
  const { data: user, isLoading } = useUser()
  const updateProfileMutation = useUpdateUserProfile()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    profile_pic: '',
  })

  // Initialize form data when user data loads or when exiting edit mode
  useEffect(() => {
    if (user && !isEditing) {
      setFormData({
        username: user.username || '',
        email: user.email || '',
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        profile_pic: user.profile_pic || '',
      })
    }
  }, [user, isEditing])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = async () => {
    if (!user) return

    try {
      const updatedData = await updateProfileMutation.mutateAsync({
        username: formData.username,
        first_name: formData.first_name,
        last_name: formData.last_name,
        profile_pic: formData.profile_pic,
      })
      // Update form data with the response to ensure UI reflects changes immediately
      setFormData({
        username: updatedData.username || '',
        email: user.email || '',
        first_name: updatedData.first_name || '',
        last_name: updatedData.last_name || '',
        profile_pic: updatedData.profile_pic || '',
      })
      setIsEditing(false)
    } catch (error) {
      // Error is handled by the hook with toast
    }
  }

  const handleCancel = () => {
    if (user) {
      setFormData({
        username: user.username || '',
        email: user.email || '',
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        profile_pic: user.profile_pic || '',
      })
    }
    setIsEditing(false)
  }

  if (isLoading) {
    return (
      <Card className="max-w-2xl mx-auto mt-10">
        <CardContent className="p-6">
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!user) {
    return (
      <Card className="max-w-2xl mx-auto mt-10">
        <CardContent className="p-6">
          <p className="text-center text-muted-foreground">Please login to view profile.</p>
        </CardContent>
      </Card>
    )
  }

  const fullName = user.first_name || user.last_name
    ? `${user.first_name || ''} ${user.last_name || ''}`.trim()
    : user.username

  const initials = user.first_name && user.last_name
    ? `${user.first_name[0]}${user.last_name[0]}`.toUpperCase()
    : user.username?.[0]?.toUpperCase() || 'U'

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">My Profile</CardTitle>
            <CardDescription>Manage your account information and preferences</CardDescription>
          </div>
          {!isEditing ? (
            <Button variant="outline" onClick={() => setIsEditing(true)}>
              <Edit2 className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleCancel} disabled={updateProfileMutation.isPending}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={updateProfileMutation.isPending}>
                <Save className="h-4 w-4 mr-2" />
                {updateProfileMutation.isPending ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Profile Picture Section */}
        <div className="flex flex-col items-center gap-4 pb-6 border-b">
          <Avatar className="h-24 w-24">
            <AvatarImage src={formData.profile_pic || user.profile_pic || ''} alt={fullName} />
            <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
          </Avatar>
          {isEditing && (
            <div className="w-full max-w-sm">
              <Label htmlFor="profile_pic">Profile Picture URL</Label>
              <Input
                id="profile_pic"
                type="url"
                value={formData.profile_pic}
                onChange={(e) => handleInputChange('profile_pic', e.target.value)}
                placeholder="https://example.com/avatar.jpg"
                className="mt-1"
              />
            </div>
          )}
        </div>

        {/* Personal Information */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <User className="h-5 w-5 text-muted-foreground" />
            <h3 className="text-lg font-semibold">Personal Information</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first_name">First Name</Label>
              {isEditing ? (
                <Input
                  id="first_name"
                  value={formData.first_name}
                  onChange={(e) => handleInputChange('first_name', e.target.value)}
                  placeholder="Enter your first name"
                />
              ) : (
                <div className="text-lg py-2 px-3 rounded-md bg-muted/50">
                  {user.first_name || 'Not set'}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="last_name">Last Name</Label>
              {isEditing ? (
                <Input
                  id="last_name"
                  value={formData.last_name}
                  onChange={(e) => handleInputChange('last_name', e.target.value)}
                  placeholder="Enter your last name"
                />
              ) : (
                <div className="text-lg py-2 px-3 rounded-md bg-muted/50">
                  {user.last_name || 'Not set'}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            {isEditing ? (
              <Input
                id="username"
                value={formData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                placeholder="Enter your username"
              />
            ) : (
              <div className="text-lg py-2 px-3 rounded-md bg-muted/50">
                {user.username}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <div className="text-lg py-2 px-3 rounded-md bg-muted/50 flex-1">
                {user.email}
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Email cannot be changed</p>
          </div>
        </div>

        <Separator />

        {/* Account Information */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="h-5 w-5 text-muted-foreground" />
            <h3 className="text-lg font-semibold">Account Information</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Subscription Plan</Label>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-base px-3 py-1.5">
                  {user.subscription_plan || 'Free'}
                </Badge>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Account Role</Label>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-base px-3 py-1.5 capitalize">
                  {user.role || 'User'}
                </Badge>
              </div>
            </div>
          </div>

          {user.status && (
            <div className="space-y-2">
              <Label>Account Status</Label>
              <div className="flex items-center gap-2">
                <Badge
                  variant={user.status === 'Active' ? 'default' : 'secondary'}
                  className="text-base px-3 py-1.5"
                >
                  {user.status}
                </Badge>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

