import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { fetchTabnewsContentBySlug, fetchTabnewsContents } from './read'
import { Content } from './schemas'

export const useInfiniteContents = () => {
  return useInfiniteQuery<Content[], Error>({
    queryKey: ['tabnews-contents-infinite'],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await fetchTabnewsContents(pageParam as number)

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

export const useReadContents = (page: number) => {
  return useQuery<Content[]>({
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

export const useReadContentBySlug = (username: string, slug: string) => {
  return useQuery<Content>({
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
  })
}
