'use client'

import { useQuery } from '@tanstack/react-query'
import { fetchTabnewsContentComments } from './read'
import { CommentType } from './schemas'

export const useReadContentComments = (username: string, slug: string) => {
  return useQuery<CommentType[]>({
    queryKey: ['tabnews-content-comments', username, slug],
    queryFn: async () => {
      const res = await fetchTabnewsContentComments(username, slug)
      // Always return an array (fallback to empty array if undefined)
      return Array.isArray(res) ? res : []
    },
    enabled: !!username && !!slug,
    staleTime: 1000 * 60 * 10,
  })
}
