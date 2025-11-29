export interface Video {
  id: string
  title: string
  description: string
  thumbnailUrl: string
  videoUrl: string
  duration?: number
  category: string
  accessLevel: 'Free' | 'Basic' | 'Premium' | 'Ultimate'
  isPremium: boolean // Derived from accessLevel
  rating?: number // Average rating
  views: number
  viewsCount?: number // Alias for views
  createdAt: string
  updatedAt?: string
}


export interface Category {
  id: string
  name: string
}

export interface Comment {
  id: string
  userId: string
  userName: string
  content: string
  createdAt: string
}
