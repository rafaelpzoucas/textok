'use server'

import { cookies } from 'next/headers'
import { User } from './schemas'

// Cache para requisições
const requestCache = new Map<string, Promise<Response | unknown>>()

export const fetchAuthedUser = async () => {
  const cacheKey = `authed-user`
  const cookiesStore = await cookies()
  const sessionId = cookiesStore.get('session_id')?.value

  const requestPromise = fetch(
    `${process.env.NEXT_PUBLIC_TABNEWS_API_URL}/v1/user`,
    {
      headers: {
        Accept: 'application/json',
        Cookie: `session_id=${sessionId}`,
      },

      next: { revalidate: 60 },
    },
  )
    .then(async (res) => {
      // Remove do cache após a requisição completar
      requestCache.delete(cacheKey)

      if (!res.ok) {
        throw new Error(`Failed to fetch user: ${res.status} ${res.statusText}`)
      }

      const data = await res.json()

      return data as User
    })
    .catch((error) => {
      // Remove do cache em caso de erro também
      requestCache.delete(cacheKey)
      throw error
    })

  // Adiciona no cache
  requestCache.set(cacheKey, requestPromise)

  return requestPromise
}
