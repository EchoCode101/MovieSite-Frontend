export interface Comment {
  _id: string
  video_id: string
  member_id: {
    _id: string
    username: string
    first_name?: string
    last_name?: string
    profile_pic?: string
  }
  content: string
  likesCount?: number
  dislikesCount?: number
  createdAt: string
  updatedAt: string
}

export interface Reply {
  _id: string
  comment_id: string
  member_id: {
    _id: string
    username: string
    first_name?: string
    last_name?: string
    profile_pic?: string
  }
  reply_content: string
  likesCount?: number
  dislikesCount?: number
  createdAt: string
  updatedAt: string
}

export interface Review {
  _id: string
  video_id: string
  member_id: {
    _id: string
    username: string
    first_name?: string
    last_name?: string
    profile_pic?: string
  }
  review_content: string
  rating: number
  likesCount?: number
  dislikesCount?: number
  createdAt: string
  updatedAt: string
}

export interface CreateCommentData {
  target_type: 'video' | 'movie' | 'tvshow' | 'episode'
  target_id: string
  content: string
}

export interface CreateReplyData {
  comment_id: string
  reply_content: string
}

export interface CreateReviewData {
  target_type: 'video' | 'movie' | 'tvshow' | 'episode'
  target_id: string
  rating: number
  content: string
}

export interface UpdateCommentData {
  content: string
}

export interface UpdateReplyData {
  reply_content: string
}

export interface UpdateReviewData {
  rating?: number
  content?: string
}
