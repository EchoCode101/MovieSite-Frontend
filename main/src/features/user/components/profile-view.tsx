import { useUser, useLogout } from '@/features/auth/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function ProfileView() {
  const { data: user } = useUser()
  const logout = useLogout()

  if (!user) return <div>Please login to view profile.</div>

  return (
    <Card className="max-w-md mx-auto mt-10">
      <CardHeader>
        <CardTitle>My Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium text-muted-foreground">Name</label>
          <div className="text-lg">
            {user.first_name || user.last_name
              ? `${user.first_name || ''} ${user.last_name || ''}`.trim()
              : user.username}
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-muted-foreground">Email</label>
          <div className="text-lg">{user.email}</div>
        </div>
        <div>
          <label className="text-sm font-medium text-muted-foreground">Plan</label>
          <div className="text-lg capitalize">{user.subscription_plan || user.role || 'Free'}</div>
        </div>
        <div className="pt-4">
          <Button variant="destructive" onClick={logout} className="w-full">
            Logout
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
