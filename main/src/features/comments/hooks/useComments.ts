import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  fetchCommentsByVideo,
  fetchCommentsByTarget,
  createComment,
  updateComment,
  deleteComment,
  fetchReplies,
  createReply,
  updateReply,
  deleteReply,
} from '../api/comments'
import type { CreateCommentData, UpdateCommentData, CreateReplyData, UpdateReplyData, Comment, Reply } from '../types'
import { toast } from 'sonner'
import { queryKeys } from '@/lib/query-keys'

// Fetch comments for a video
export const useComments = (videoId: string, options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: queryKeys.comments.byVideo(videoId),
    queryFn: () => fetchCommentsByVideo(videoId),
    enabled: options?.enabled !== false && !!videoId,
  })
}

// Fetch comments by target type and ID
export const useCommentsByTarget = (targetType: 'video' | 'movie' | 'tvshow' | 'episode', targetId: string, options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: queryKeys.comments.byTarget(targetType, targetId),
    queryFn: () => fetchCommentsByTarget(targetType, targetId),
    enabled: options?.enabled !== false && !!targetId && !!targetType,
  })
}

// Create comment mutation
export const useCreateComment = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data: CreateCommentData) => createComment(data),
    onMutate: async (newComment) => {
      // Cancel outgoing refetches for both video and target queries
      const queryKey = newComment.target_type === 'video' 
        ? queryKeys.comments.byVideo(newComment.target_id)
        : queryKeys.comments.byTarget(newComment.target_type, newComment.target_id)
      await queryClient.cancelQueries({ queryKey })
      
      // Snapshot previous value
      const previousComments = queryClient.getQueryData<Comment[]>(queryKey)
      
      return { previousComments, queryKey }
    },
    onSuccess: (newComment, variables) => {
      // Update with server response
      const queryKey = variables.target_type === 'video' 
        ? queryKeys.comments.byVideo(variables.target_id)
        : queryKeys.comments.byTarget(variables.target_type, variables.target_id)
      
      queryClient.setQueryData<Comment[]>(queryKey, (old) => {
        if (!old) return [newComment]
        return [newComment, ...old]
      })
      // Invalidate for consistency
      queryClient.invalidateQueries({
        queryKey,
        refetchType: 'none',
      })
      toast.success('Comment posted!')
    },
    onError: (error, variables, context) => {
      // Rollback on error
      if (context?.previousComments && context?.queryKey) {
        queryClient.setQueryData(context.queryKey, context.previousComments)
      }
      toast.error('Failed to post comment')
    },
  })
}

// Update comment mutation
export const useUpdateComment = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ commentId, data }: { commentId: string; data: UpdateCommentData }) =>
      updateComment(commentId, data),
    onMutate: async ({ commentId, data }) => {
      // Find which query this comment belongs to by checking all comment queries
      const allQueries = queryClient.getQueryCache().findAll({ 
        queryKey: queryKeys.comments.all 
      })
      
      let foundQueryKey: readonly unknown[] | undefined
      let previousComments: Comment[] | undefined
      
      for (const query of allQueries) {
        const comments = query.state.data as Comment[] | undefined
        if (comments && comments.some(c => c._id === commentId)) {
          foundQueryKey = query.queryKey
          previousComments = comments
          break
        }
      }
      
      if (foundQueryKey) {
        // Cancel outgoing refetches
        await queryClient.cancelQueries({ queryKey: foundQueryKey })
        
        // Optimistically update
        queryClient.setQueryData<Comment[]>(foundQueryKey, (old) => {
          if (!old) return []
          return old.map(comment =>
            comment._id === commentId
              ? { ...comment, content: data.content, updatedAt: new Date().toISOString() }
              : comment
          )
        })
      }
      
      return { previousComments, foundQueryKey }
    },
    onSuccess: (updatedComment, variables, context) => {
      // Update with server response - need to find the query key again
      if (context?.foundQueryKey) {
        queryClient.setQueryData<Comment[]>(context.foundQueryKey, (old) => {
          if (!old) return [updatedComment]
          return old.map(comment => comment._id === updatedComment._id ? updatedComment : comment)
        })
        // Invalidate for consistency
        queryClient.invalidateQueries({
          queryKey: context.foundQueryKey,
          refetchType: 'none',
        })
      } else {
        // Fallback: try to find the query key from the comment's target
        // This is a fallback in case the query key wasn't found in onMutate
        const allQueries = queryClient.getQueryCache().findAll({ 
          queryKey: queryKeys.comments.all 
        })
        for (const query of allQueries) {
          const comments = query.state.data as Comment[] | undefined
          if (comments && comments.some(c => c._id === updatedComment._id)) {
            queryClient.setQueryData<Comment[]>(query.queryKey, (old) => {
              if (!old) return [updatedComment]
              return old.map(comment => comment._id === updatedComment._id ? updatedComment : comment)
            })
            queryClient.invalidateQueries({
              queryKey: query.queryKey,
              refetchType: 'none',
            })
            break
          }
        }
      }
      toast.success('Comment updated!')
    },
    onError: (error, variables, context) => {
      // Rollback on error
      if (context?.previousComments && context?.foundQueryKey) {
        queryClient.setQueryData(context.foundQueryKey, context.previousComments)
      }
      toast.error('Failed to update comment')
    },
  })
}

// Delete comment mutation
export const useDeleteComment = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (commentId: string) => deleteComment(commentId),
    onMutate: async (commentId) => {
      // Find which query this comment belongs to by checking all comment queries
      const allQueries = queryClient.getQueryCache().findAll({ 
        queryKey: queryKeys.comments.all 
      })
      
      let foundQueryKey: readonly unknown[] | undefined
      let previousComments: Comment[] | undefined
      
      for (const query of allQueries) {
        const comments = query.state.data as Comment[] | undefined
        if (comments && comments.some(c => c._id === commentId)) {
          foundQueryKey = query.queryKey
          previousComments = comments
          break
        }
      }
      
      if (foundQueryKey) {
        // Cancel outgoing refetches
        await queryClient.cancelQueries({ queryKey: foundQueryKey })
        
        // Optimistically update
        queryClient.setQueryData<Comment[]>(foundQueryKey, (old) => {
          if (!old) return []
          return old.filter(comment => comment._id !== commentId)
        })
      }
      
      return { previousComments, foundQueryKey }
    },
    onSuccess: (_, commentId, context) => {
      // Invalidate for consistency
      if (context?.foundQueryKey) {
        queryClient.invalidateQueries({
          queryKey: context.foundQueryKey,
          refetchType: 'none',
        })
      }
      toast.success('Comment deleted!')
    },
    onError: (error, commentId, context) => {
      // Rollback on error
      if (context?.previousComments && context?.foundQueryKey) {
        queryClient.setQueryData(context.foundQueryKey, context.previousComments)
      }
      toast.error('Failed to delete comment')
    },
  })
}

// Fetch replies for a comment
export const useReplies = (commentId: string) => {
  return useQuery({
    queryKey: queryKeys.replies.byComment(commentId),
    queryFn: () => fetchReplies(commentId),
    enabled: !!commentId,
  })
}

// Create reply mutation
export const useCreateReply = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data: CreateReplyData) => createReply(data),
    onMutate: async (newReply) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: queryKeys.replies.byComment(newReply.comment_id) })
      
      // Snapshot previous value
      const previousReplies = queryClient.getQueryData<Reply[]>(queryKeys.replies.byComment(newReply.comment_id))
      
      // Optimistically update
      queryClient.setQueryData<Reply[]>(queryKeys.replies.byComment(newReply.comment_id), (old) => {
        if (!old) return []
        return old
      })
      
      return { previousReplies }
    },
    onSuccess: (newReply, variables) => {
      // Update with server response
      queryClient.setQueryData<Reply[]>(queryKeys.replies.byComment(variables.comment_id), (old) => {
        if (!old) return [newReply]
        return [newReply, ...old]
      })
      // Invalidate for consistency
      queryClient.invalidateQueries({
        queryKey: queryKeys.replies.byComment(variables.comment_id),
        refetchType: 'none',
      })
      toast.success('Reply posted!')
    },
    onError: (error, variables, context) => {
      // Rollback on error
      if (context?.previousReplies) {
        queryClient.setQueryData(queryKeys.replies.byComment(variables.comment_id), context.previousReplies)
      }
      toast.error('Failed to post reply')
    },
  })
}

// Update reply mutation
export const useUpdateReply = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ replyId, data }: { replyId: string; data: UpdateReplyData }) =>
      updateReply(replyId, data),
    onMutate: async ({ replyId, data }) => {
      // Find which comment this reply belongs to
      const replyQueries = queryClient.getQueriesData<Reply[]>({ queryKey: queryKeys.replies.all })
      
      let commentId: string | undefined
      let previousReplies: Reply[] | undefined
      
      for (const [queryKey, replies] of replyQueries) {
        if (replies && replies.some(r => r._id === replyId)) {
          commentId = (queryKey as readonly unknown[])[1] as string
          previousReplies = replies
          break
        }
      }
      
      if (commentId) {
        // Cancel outgoing refetches
        await queryClient.cancelQueries({ queryKey: queryKeys.replies.byComment(commentId) })
        
        // Optimistically update
        queryClient.setQueryData<Reply[]>(queryKeys.replies.byComment(commentId), (old) => {
          if (!old) return []
          return old.map(reply =>
            reply._id === replyId
              ? { ...reply, reply_content: data.reply_content, updatedAt: new Date().toISOString() }
              : reply
          )
        })
      }
      
      return { previousReplies, commentId }
    },
    onSuccess: (updatedReply) => {
      // Update with server response
      queryClient.setQueryData<Reply[]>(queryKeys.replies.byComment(updatedReply.comment_id), (old) => {
        if (!old) return [updatedReply]
        return old.map(reply => reply._id === updatedReply._id ? updatedReply : reply)
      })
      // Invalidate for consistency
      queryClient.invalidateQueries({
        queryKey: queryKeys.replies.byComment(updatedReply.comment_id),
        refetchType: 'none',
      })
      toast.success('Reply updated!')
    },
    onError: (error, variables, context) => {
      // Rollback on error
      if (context?.previousReplies && context?.commentId) {
        queryClient.setQueryData(queryKeys.replies.byComment(context.commentId), context.previousReplies)
      }
      toast.error('Failed to update reply')
    },
  })
}

// Delete reply mutation
export const useDeleteReply = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (replyId: string) => deleteReply(replyId),
    onMutate: async (replyId) => {
      // Find which comment this reply belongs to
      const replyQueries = queryClient.getQueriesData<Reply[]>({ queryKey: queryKeys.replies.all })
      
      let commentId: string | undefined
      let previousReplies: Reply[] | undefined
      
      for (const [queryKey, replies] of replyQueries) {
        if (replies && replies.some(r => r._id === replyId)) {
          commentId = (queryKey as readonly unknown[])[1] as string
          previousReplies = replies
          break
        }
      }
      
      if (commentId) {
        // Cancel outgoing refetches
        await queryClient.cancelQueries({ queryKey: queryKeys.replies.byComment(commentId) })
        
        // Optimistically update
        queryClient.setQueryData<Reply[]>(queryKeys.replies.byComment(commentId), (old) => {
          if (!old) return []
          return old.filter(reply => reply._id !== replyId)
        })
      }
      
      return { previousReplies, commentId }
    },
    onSuccess: (_, replyId, context) => {
      // Invalidate for consistency
      if (context?.commentId) {
        queryClient.invalidateQueries({
          queryKey: queryKeys.replies.byComment(context.commentId),
          refetchType: 'none',
        })
      }
      toast.success('Reply deleted!')
    },
    onError: (error, replyId, context) => {
      // Rollback on error
      if (context?.previousReplies && context?.commentId) {
        queryClient.setQueryData(queryKeys.replies.byComment(context.commentId), context.previousReplies)
      }
      toast.error('Failed to delete reply')
    },
  })
}
