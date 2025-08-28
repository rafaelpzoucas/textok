'use server'

import { cookies } from 'next/headers'
import { TransactTabcoinData } from './schemas'

export async function transactTabcoin(data: TransactTabcoinData) {
  const { username, slug, transactionType } = data

  const cookiesStore = await cookies()
  const sessionId = cookiesStore.get('session_id')?.value

  if (!sessionId) {
    throw new Error('Session not found - user not authenticated')
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_TABNEWS_API_BASE_URL}/api/v1/contents/${username}/${slug}/tabcoins`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Cookie: `session_id=${sessionId}`,
      },
      body: JSON.stringify({
        transaction_type: transactionType,
      }),
    },
  )

  const responseBody = await response.json()

  if (response.status !== 201) {
    const message =
      responseBody?.message ||
      responseBody?.body?.message ||
      response.statusText ||
      'Erro desconhecido ao transacionar TabCoins'

    const error = new Error(message) as Error & {
      status?: number
      responseBody?: unknown
    }
    error.status = response.status
    error.responseBody = responseBody
    throw error
  }

  // Retorna os dados atualizados do conteúdo
  return {
    success: true,
    data: responseBody,
    status: response.status,
  }
}
