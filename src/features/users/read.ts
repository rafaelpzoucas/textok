'use server'

import { cookies } from 'next/headers'
import { User } from './schemas'

export const fetchAuthedUser = async () => {
  const cookiesStore = await cookies()
  const sessionId = cookiesStore.get('session_id')?.value

  const requestPromise = fetch(
    `${process.env.NEXT_PUBLIC_TABNEWS_API_BASE_URL}/api/v1/user`,
    {
      headers: {
        Accept: 'application/json',
        Cookie: `session_id=${sessionId}`,
      },
    },
  )
    .then(async (res) => {
      if (!res.ok) {
        throw new Error(`Failed to fetch user: ${res.status} ${res.statusText}`)
      }

      const data = await res.json()

      return data as User
    })
    .catch((error) => {
      throw error
    })

  return requestPromise
}
