import {
  useInfiniteQuery,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query'
import { fetchTabnewsContentBySlug, fetchTabnewsContents } from './read'
import { ContentType, StrategyType } from './schemas'

export const useInfiniteContents = (strategy: StrategyType = 'relevant') => {
  return useInfiniteQuery<ContentType[], Error>({
    queryKey: ['tabnews-contents-infinite', strategy], // Incluir strategy na queryKey
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
    initialPageParam: 1,
    staleTime: 1000 * 60 * 5, // 5 minutos
  })
}

export const useReadContents = (
  page: number,
  strategy: StrategyType = 'relevant',
) => {
  return useQuery<ContentType[]>({
    queryKey: ['tabnews-contents', page, strategy], // Incluir strategy na queryKey
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
  options?: Omit<UseQueryOptions<ContentType, Error>, 'queryKey' | 'queryFn'>,
) => {
  return useQuery<ContentType, Error>({
    queryKey: ['tabnews-content', username, slug],
    queryFn: async () => {
      const res = await fetchTabnewsContentBySlug(username, slug)

      if (res && !Array.isArray(res)) {
        return res
      }

      return res?.data
    },
    enabled: !!username && !!slug,
    staleTime: 1000 * 60 * 10, // 10 minutos
    ...options, // Spread das options passadas
  })
}
