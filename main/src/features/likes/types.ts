export interface LikeDislikeResponse {
  is_like?: boolean
  removed?: boolean
}

export interface LikeDislikeCounts {
  likes: number
  dislikes: number
}

export interface ToggleLikeDislikeData {
  target_id: string
  target_type: 'video' | 'comment' | 'review' | 'comment_reply' | 'episode' | 'movie' | 'tvshow'
  is_like: boolean
}
