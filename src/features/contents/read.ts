import { StrategyType } from './schemas'

// Cache para requisições
const requestCache = new Map<string, Promise<Response | unknown>>()

export const fetchTabnewsContents = async (
  page: number,
  strategy: StrategyType = 'relevant',
) => {
  // Incluir strategy na chave do cache para evitar conflitos
  const cacheKey = `contents-${page}-${strategy}`

  // Se já existe uma requisição em andamento para esta página e strategy, retorna ela
  if (requestCache.has(cacheKey)) {
    return requestCache.get(cacheKey)
  }

  const requestPromise = fetch(
    `${process.env.NEXT_PUBLIC_TABNEWS_API_URL}/v1/contents?page=${page}&per_page=3&strategy=${strategy}`,
    {
      headers: {
        Accept: 'application/json',
      },
      // Cache da requisição HTTP por 60 segundos
      next: { revalidate: 60 },
    },
  )
    .then(async (res) => {
      // Remove do cache após a requisição completar
      requestCache.delete(cacheKey)

      if (!res.ok) {
        throw new Error(
          `Failed to fetch contents: ${res.status} ${res.statusText}`,
        )
      }

      return await res.json()
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

export const fetchTabnewsContentBySlug = async (
  username: string,
  slug: string,
) => {
  const cacheKey = `content-${username}-${slug}`

  if (requestCache.has(cacheKey)) {
    return requestCache.get(cacheKey)
  }

  const requestPromise = fetch(
    `${process.env.NEXT_PUBLIC_TABNEWS_API_URL}/v1/contents/${username}/${slug}`,
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

// Função para limpar cache específico por strategy (útil quando mudando filtros)
export const clearContentsCacheByStrategy = (strategy?: StrategyType) => {
  if (strategy) {
    // Remove apenas caches da strategy específica
    for (const key of requestCache.keys()) {
      if (key.includes(`contents-`) && key.endsWith(`-${strategy}`)) {
        requestCache.delete(key)
      }
    }
  } else {
    // Remove todos os caches de contents
    for (const key of requestCache.keys()) {
      if (key.startsWith('contents-')) {
        requestCache.delete(key)
      }
    }
  }
}
