'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { ContentType } from '../contents/schemas'
import { CreateComment } from './create'
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

export function useCreateComment() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      content,
      body,
    }: {
      content: ContentType | CommentType
      body: string
    }) => {
      return await CreateComment(content, body)
    },
    onSuccess: (data, variables) => {
      // Invalidar queries relacionadas aos comentários
      queryClient.invalidateQueries({
        queryKey: [
          'tabnews-content-comments',
          variables.content?.owner_username,
          variables.content?.slug,
        ],
      })

      toast.success('Comentário publicado com sucesso!')
    },
    onError: (error) => {
      toast.error(error.message || 'Erro ao publicar comentário')
    },
  })
}
