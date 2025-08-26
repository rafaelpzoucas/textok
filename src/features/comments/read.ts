// Cache para requisições
const requestCache = new Map<string, Promise<Response | unknown>>()

export const fetchTabnewsContentComments = async (
  username: string,
  slug: string,
) => {
  const cacheKey = `content-${username}-${slug}-comments`

  if (requestCache.has(cacheKey)) {
    return requestCache.get(cacheKey)
  }

  const requestPromise = await fetch(
    `${process.env.NEXT_PUBLIC_TABNEWS_API_URL}/v1/contents/${username}/${slug}/children`,
    {
      headers: {
        Accept: 'application/json',
      },
      // Cache mais longo para conteúdos específicos (5 minutos)
      next: { revalidate: 300 },
    },
  )
    .then(async (res) => {
      requestCache.delete(cacheKey)

      if (!res.ok) {
        throw new Error(
          `Failed to fetch content: ${res.status} ${res.statusText}`,
        )
      }

      return await res.json()
    })
    .catch((error) => {
      requestCache.delete(cacheKey)
      throw error
    })

  requestCache.set(cacheKey, requestPromise)

  return requestPromise
}

// Função para limpar cache se necessário
export const clearRequestCache = () => {
  requestCache.clear()
}
