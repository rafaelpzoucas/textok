import { TabNewsError } from '@/types/api-errors'
import { UserLoginData } from './schemas'

export const login = async (data: UserLoginData) => {
  const { email, password } = data

  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include', // Importante para cookies
    })

    const responseData = await res.json()

    if (!res.ok) {
      throw new TabNewsError(responseData)
    }

    return responseData
  } catch (error) {
    if (error instanceof TabNewsError) {
      throw error
    }

    if (error instanceof Error) {
      throw error
    }

    throw new Error('Erro de conexão. Tente novamente.')
  }
}
