'use client'

import { useQuery } from '@tanstack/react-query'
import { fetchAuthedUser } from './read'

export function useAuthedUser() {
  return useQuery({
    queryKey: ['authed-user'],
    queryFn: () => fetchAuthedUser(),
    staleTime: 60_000, // bate com o revalidate: 60 do fetch
    retry: false, // se o usuário não estiver autenticado, não adianta ficar tentando
  })
}
