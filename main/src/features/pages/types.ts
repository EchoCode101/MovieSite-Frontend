export interface Page {
  id: string
  slug: string
  title: string
  content: string
  is_active: boolean
  meta_title?: string
  meta_description?: string
  createdAt?: string
  updatedAt?: string
}

