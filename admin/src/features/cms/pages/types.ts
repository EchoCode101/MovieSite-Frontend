export interface Page {
  id?: string
  _id?: string
  slug: string
  title: string
  content: string
  is_active: boolean
  createdAt?: string
  updatedAt?: string
}

export type PageListResponse = Page[]

export interface CreatePagePayload {
  slug: string
  title: string
  content: string
  is_active?: boolean
}

export interface UpdatePagePayload {
  title?: string
  content?: string
  is_active?: boolean
}


