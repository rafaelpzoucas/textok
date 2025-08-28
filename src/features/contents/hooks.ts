import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { fetchTabnewsContentBySlug, fetchTabnewsContents } from './read'
import { ContentType, StrategyType } from './schemas'

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

export const useReadContents = (page: number) => {
  return useQuery<ContentType[]>({
    queryKey: ['tabnews-contents', page],
    queryFn: async () => {
      const res = await fetchTabnewsContents(page)

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
  strategy: string,
) => {
  return useQuery<ContentType>({
    queryKey: ['tabnews-content', username, slug, strategy],
    queryFn: async () => {
      const res = await fetchTabnewsContentBySlug(username, slug)

      if (res && !Array.isArray(res)) {
        return res
      }

      return res?.data
    },
    enabled: !!username && !!slug && !!strategy,
    staleTime: 1000 * 60 * 10, // 10 minutos
  })
}
