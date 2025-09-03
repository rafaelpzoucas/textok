import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { CreateContent, CreateContentData } from './create'
import { fetchTabnewsContentBySlug, fetchTabnewsContents } from './read'
import { ContentType, StrategyType } from './schemas'

export function useCreateContent() {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: async (data: CreateContentData) => {
      return await CreateContent(data)
    },
    onSuccess: (data) => {
      // Invalidar queries dos conteúdos
      queryClient.invalidateQueries({
        queryKey: ['tabnews-contents-infinite', 'new'],
      })
      queryClient.invalidateQueries({
        queryKey: ['tabnews-contents-infinite', 'relevant'],
      })

      // Redirecionar para o novo conteúdo criado
      if (data?.owner_username && data?.slug) {
        router.push(`/${data.owner_username}/${data.slug}`)
      }

      toast.success('Conteúdo publicado com sucesso!')
    },
    onError: (error) => {
      toast.error(error.message || 'Erro ao publicar conteúdo')
    },
  })
}

export const useInfiniteContents = (
  strategy: StrategyType,
  options: { enabled: boolean },
) => {
  return useInfiniteQuery<ContentType[], Error>({
    queryKey: ['tabnews-contents-infinite', strategy],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await fetchTabnewsContents(pageParam as number, strategy)

      if (Array.isArray(res)) {
        return res
      }

      return res?.data ?? []
    },
    getNextPageParam: (lastPage, allPages) => {
      // Se a última página tem menos de 2 items, não há mais páginas
      if (lastPage.length < 2) {
        return undefined
      }
      // Retorna o número da próxima página
      return allPages.length + 1
    },
    enabled: options.enabled ?? true,
    initialPageParam: 1,
    staleTime: 1000 * 60 * 5, // 5 minutos
  })
}

export const useReadContents = (page: number, strategy?: StrategyType) => {
  return useQuery<ContentType[]>({
    queryKey: ['tabnews-contents', page, strategy],
    queryFn: async () => {
      const res = await fetchTabnewsContents(page, strategy)

      if (Array.isArray(res)) {
        return res
      }

      return res?.data ?? []
    },
    enabled: page > 0,
    staleTime: 1000 * 60 * 5, // 5 minutos
  })
}

export const useReadContentBySlug = (
  username: string,
  slug: string,
  options?: { enabled?: boolean },
) => {
  return useQuery<ContentType>({
    queryKey: ['tabnews-content', username, slug],
    queryFn: async () => {
      const res = await fetchTabnewsContentBySlug(username, slug)

      if (res && !Array.isArray(res)) {
        return res
      }

      return res?.data
    },
    enabled: !!username && !!slug && (options?.enabled ?? true),
    staleTime: 1000 * 60 * 10, // 10 minutos
  })
}
