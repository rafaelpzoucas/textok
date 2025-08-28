export const fetchTabnewsContentComments = async (
  username: string,
  slug: string,
) => {
  const requestPromise = await fetch(
    `${process.env.NEXT_PUBLIC_TABNEWS_API_BASE_URL}/api/v1/contents/${username}/${slug}/children`,
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
