'use server'

import { TabNewsAPIError, TabNewsError } from '@/types/api-errors'
import { UserRegisterData } from './schemas'

export const register = async (data: UserRegisterData) => {
  const { email, password, username } = data

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_TABNEWS_API_URL}/v1/users`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      },
    )

    // Primeiro, vamos capturar a resposta como texto
    const responseText = await res.text()

    if (!res.ok) {
      // Tentar fazer parse do JSON se possível
      try {
        const errorData = JSON.parse(responseText) as TabNewsAPIError
        throw new TabNewsError(errorData)
      } catch (_parseError) {
        // Se não conseguir fazer parse, verificar se responseText já é um objeto
        let errorData: TabNewsAPIError | null = null

        try {
          // Tentar fazer parse novamente caso seja uma string JSON escapada
          errorData =
            typeof responseText === 'string'
              ? JSON.parse(responseText)
              : responseText
          if (
            errorData &&
            typeof errorData === 'object' &&
            'name' in errorData
          ) {
            throw new TabNewsError(errorData as TabNewsAPIError)
          }
        } catch {
          // Se ainda não conseguir, usar texto da resposta
        }

        throw new Error(responseText || `HTTP ${res.status}: ${res.statusText}`)
      }
    }

    // Tentar fazer parse da resposta de sucesso
    try {
      return JSON.parse(responseText)
    } catch {
      throw new Error('Resposta inválida do servidor')
    }
  } catch (error) {
    // Re-lançar o erro se já for uma instância de Error
    if (error instanceof Error) {
      throw error
    }

    // Para outros tipos de erro (rede, etc.)
    throw new Error('Erro de conexão. Tente novamente.')
  }
}
