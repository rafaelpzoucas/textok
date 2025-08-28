'use server'

import { TabNewsAPIError, TabNewsError } from '@/types/api-errors'
import { cookies } from 'next/headers'
import { UserLoginData } from './schemas'

export const login = async (data: UserLoginData) => {
  const { email, password } = data
  const cookiesStore = await cookies()

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_TABNEWS_API_BASE_URL}/api/v1/sessions`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      },
    )

    const responseText = await res.text()

    if (!res.ok) {
      try {
        const errorData = JSON.parse(responseText) as TabNewsAPIError
        throw new TabNewsError(errorData)
      } catch {
        throw new Error(responseText || `HTTP ${res.status}: ${res.statusText}`)
      }
    }

    const session = JSON.parse(responseText) as {
      id: string
      token: string
      expires_at: string
      created_at: string
      updated_at: string
    }

    cookiesStore.set('session_id', session.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: new Date(session.expires_at),
      path: '/',
    })

    return session
  } catch (error) {
    if (error instanceof Error) throw error
    throw new Error('Erro de conexão. Tente novamente.')
  }
}
