import { StrategyType } from './schemas'

export const fetchTabnewsContents = async (
  page: number,
  strategy: StrategyType = 'relevant',
) => {
  const requestPromise = fetch(
    `${process.env.NEXT_PUBLIC_TABNEWS_API_BASE_URL}/api/v1/contents?page=${page}&per_page=20&strategy=${strategy}`,
    {
      headers: {
        Accept: 'application/json',
      },
    },
  )
    .then(async (res) => {
      if (!res.ok) {
        throw new Error(
          `Failed to fetch contents: ${res.status} ${res.statusText}`,
        )
      }

      return await res.json()
    })
    .catch((error) => {
      throw error
    })

  return requestPromise
}

export const fetchTabnewsContentBySlug = async (
  username: string,
  slug: string,
) => {
  const requestPromise = fetch(
    `${process.env.NEXT_PUBLIC_TABNEWS_API_BASE_URL}/api/v1/contents/${username}/${slug}`,
    {
      headers: {
        Accept: 'application/json',
      },
    },
  )
    .then(async (res) => {
      if (!res.ok) {
        throw new Error(
          `Failed to fetch content: ${res.status} ${res.statusText}`,
        )
      }

      return await res.json()
    })
    .catch((error) => {
      throw error
    })

  return requestPromise
}
