import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getProfiles, createProfile, updateProfile, deleteProfile } from '../api/profiles'
import type { CreateProfileData, UpdateProfileData, Profile } from '../types'
import { queryKeys } from '@/lib/query-keys'
import { toast } from 'sonner'

/**
 * Hook to fetch all user profiles
 * 
 * @returns Query hook for profiles list
 */
export const useProfiles = () => {
  return useQuery({
    queryKey: queryKeys.profiles.list(),
    queryFn: getProfiles,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

/**
 * Hook to fetch a single profile
 * 
 * @param profileId - Profile ID
 * @returns Query hook for single profile
 */
export const useProfile = (profileId: string) => {
  return useQuery({
    queryKey: queryKeys.profiles.detail(profileId),
    queryFn: async () => {
      const profiles = await getProfiles()
      return profiles.find((p) => p.id === profileId)
    },
    enabled: !!profileId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

/**
 * Hook to create a new profile
 * 
 * @returns Mutation hook for profile creation
 */
export const useCreateProfile = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateProfileData) => createProfile(data),
    onMutate: async (newProfile) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: queryKeys.profiles.all })

      // Snapshot previous value
      const previousProfiles = queryClient.getQueryData<Profile[]>(queryKeys.profiles.list())

      // Optimistically update cache
      if (previousProfiles) {
        // Create optimistic profile (will be replaced by server response)
        const optimisticProfile: Profile = {
          id: `temp-${Date.now()}`,
          name: newProfile.name,
          avatar_url: newProfile.avatar_url || null,
          is_kid: newProfile.is_kid || false,
          language: newProfile.language || 'en',
          pin: newProfile.pin || null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        queryClient.setQueryData<Profile[]>(queryKeys.profiles.list(), [...previousProfiles, optimisticProfile])
      }

      return { previousProfiles }
    },
    onSuccess: (newProfile) => {
      // Update cache with server response
      queryClient.setQueryData<Profile[]>(queryKeys.profiles.list(), (old) => {
        if (!old) return [newProfile]
        // Replace optimistic profile with real one
        return old.map((p) => (p.id.startsWith('temp-') ? newProfile : p))
      })
      // Invalidate for consistency
      queryClient.invalidateQueries({ queryKey: queryKeys.profiles.all, refetchType: 'none' })
      toast.success('Profile created successfully!')
    },
    onError: (error, _, context) => {
      // Rollback on error
      if (context?.previousProfiles) {
        queryClient.setQueryData(queryKeys.profiles.list(), context.previousProfiles)
      }
      const errorMessage = error instanceof Error ? error.message : 'Failed to create profile'
      toast.error(errorMessage)
    },
  })
}

/**
 * Hook to update a profile
 * 
 * @returns Mutation hook for profile update
 */
export const useUpdateProfile = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateProfileData }) => updateProfile(id, data),
    onMutate: async ({ id, data: updateData }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: queryKeys.profiles.all })

      // Snapshot previous values
      const previousProfiles = queryClient.getQueryData<Profile[]>(queryKeys.profiles.list())
      const previousProfile = queryClient.getQueryData<Profile | undefined>(queryKeys.profiles.detail(id))

      // Optimistically update cache
      if (previousProfiles) {
        queryClient.setQueryData<Profile[]>(queryKeys.profiles.list(), (old) => {
          if (!old) return old
          return old.map((p) => (p.id === id ? { ...p, ...updateData, updatedAt: new Date().toISOString() } : p))
        })
      }
      if (previousProfile) {
        queryClient.setQueryData<Profile>(queryKeys.profiles.detail(id), {
          ...previousProfile,
          ...updateData,
          updatedAt: new Date().toISOString(),
        })
      }

      return { previousProfiles, previousProfile }
    },
    onSuccess: (updatedProfile, variables) => {
      // Update cache with server response
      queryClient.setQueryData<Profile[]>(queryKeys.profiles.list(), (old) => {
        if (!old) return [updatedProfile]
        return old.map((p) => (p.id === variables.id ? updatedProfile : p))
      })
      queryClient.setQueryData<Profile>(queryKeys.profiles.detail(variables.id), updatedProfile)
      // Invalidate for consistency
      queryClient.invalidateQueries({ queryKey: queryKeys.profiles.all, refetchType: 'none' })
      toast.success('Profile updated successfully!')
    },
    onError: (error, variables, context) => {
      // Rollback on error
      if (context?.previousProfiles) {
        queryClient.setQueryData(queryKeys.profiles.list(), context.previousProfiles)
      }
      if (context?.previousProfile) {
        queryClient.setQueryData(queryKeys.profiles.detail(variables.id), context.previousProfile)
      }
      const errorMessage = error instanceof Error ? error.message : 'Failed to update profile'
      toast.error(errorMessage)
    },
  })
}

/**
 * Hook to delete a profile
 * 
 * @returns Mutation hook for profile deletion
 */
export const useDeleteProfile = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteProfile(id),
    onMutate: async (id) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: queryKeys.profiles.all })

      // Snapshot previous value
      const previousProfiles = queryClient.getQueryData<Profile[]>(queryKeys.profiles.list())

      // Optimistically update cache
      if (previousProfiles) {
        queryClient.setQueryData<Profile[]>(queryKeys.profiles.list(), (old) => {
          if (!old) return old
          return old.filter((p) => p.id !== id)
        })
      }

      return { previousProfiles }
    },
    onSuccess: () => {
      // Invalidate for consistency
      queryClient.invalidateQueries({ queryKey: queryKeys.profiles.all, refetchType: 'none' })
      toast.success('Profile deleted successfully!')
    },
    onError: (error, _, context) => {
      // Rollback on error
      if (context?.previousProfiles) {
        queryClient.setQueryData(queryKeys.profiles.list(), context.previousProfiles)
      }
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete profile'
      toast.error(errorMessage)
    },
  })
}

