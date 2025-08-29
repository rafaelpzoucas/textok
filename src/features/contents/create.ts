'use server'

import { cookies } from 'next/headers'
import { CreateContentType } from './schemas'

export interface CreateContentData {
  title: string
  body: string
  source_url?: string
  type?: 'content' | 'ad' // ad para conteúdo patrocinado
}

export const CreateContent = async (data: CreateContentData) => {
  const cookiesStore = await cookies()
  const sessionId = cookiesStore.get('session_id')?.value

  if (!sessionId) {
    throw new Error('Usuário não autenticado')
  }

  const requestBody: CreateContentType = {
    status: 'published',
    title: data.title,
    body: data.body,
    type: data.type || 'content',
  }

  // Só inclui source_url se foi fornecida
  if (data.source_url?.trim()) {
    requestBody.source_url = data.source_url.trim()
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_TABNEWS_API_BASE_URL}/api/v1/contents`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `session_id=${sessionId}`,
      },
      body: JSON.stringify(requestBody),
    },
  )

  if (!res.ok) {
    const errorData = await res.json().catch(() => null)
    throw new Error(errorData?.message || 'Erro ao criar conteúdo')
  }

  return await res.json()
}
