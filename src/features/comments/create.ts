'use server'

import { cookies } from 'next/headers'
import { ContentType } from '../contents/schemas'
import { CommentType } from './schemas'

export const CreateComment = async (
  content: ContentType | CommentType,
  body: string,
) => {
  const cookiesStore = await cookies()
  const sessionId = cookiesStore.get('session_id')?.value

  if (!sessionId) {
    throw new Error('Usuário não autenticado')
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_TABNEWS_API_BASE_URL}/api/v1/contents`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `session_id=${sessionId}`,
      },
      body: JSON.stringify({
        body,
        parent_id: content?.id,
        status: 'published',
      }),
    },
  )

  if (!res.ok) {
    const errorData = await res.json().catch(() => null)
    throw new Error(errorData?.message || 'Erro ao criar resposta')
  }

  return await res.json()
}
