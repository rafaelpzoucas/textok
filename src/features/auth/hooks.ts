'use client'

import { TabNewsError } from '@/types/api-errors'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { fetchAuthedUser } from '../users/read'
import { register } from './register'
import { UserLoginData, UserRegisterData } from './schemas'

export const useRegister = () => {
  return useMutation({
    mutationFn: (data: UserRegisterData) => register(data),
    onSuccess: (data) => {
      toast.success('Verifique seu email para ativar a conta!')
      console.log('Usuário registrado com sucesso:', data)
    },
    onError: (error) => {
      console.error('Erro ao registrar:', error)

      if (error instanceof TabNewsError) {
        // Erro estruturado da API
        toast.error(error.userMessage, {
          description: error.userAction,
        })
      } else {
        // Erro genérico ou de rede
        toast.error('Erro ao registrar usuário', {
          description: error.message || 'Tente novamente em alguns instantes.',
        })
      }
    },
  })
}

export const useLogin = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: async (data: UserLoginData) => {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      })

      if (!res.ok) {
        const json = await res.json()
        throw new TabNewsError(json) // ou seu erro customizado
      }

      return res.json()
    },
    onSuccess: async () => {
      toast.success('Login realizado com sucesso!')

      // Busca usuário autenticado após login
      try {
        const user = await fetchAuthedUser()

        // Atualiza cache do React Query
        queryClient.setQueryData(['authed-user'], user)

        // (opcional) persistir em localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('user', JSON.stringify(user))
        }

        router.push('/')
      } catch (error) {
        console.error('Erro ao buscar usuário autenticado:', error)
        // Ainda redireciona mesmo se não conseguir buscar o usuário
        router.push('/')
      }
    },
    onError: (error) => {
      console.error('Erro ao fazer login:', error)

      if (error instanceof TabNewsError) {
        const { apiError } = error

        switch (apiError.name) {
          case 'UnauthorizedError':
            toast.error('Credenciais incorretas', {
              description: 'Verifique seu email e senha e tente novamente.',
            })
            break

          case 'ValidationError':
            toast.error('Dados inválidos', {
              description: apiError.action || 'Verifique os dados informados.',
            })
            break

          case 'TooManyRequestsError':
            toast.error('Muitas tentativas', {
              description: 'Aguarde alguns minutos antes de tentar novamente.',
            })
            break

          case 'ServiceUnavailableError':
            toast.error('Serviço indisponível', {
              description:
                'O TabNews está com alta demanda. Tente novamente em alguns minutos.',
            })
            break

          default:
            toast.error(apiError.message || 'Erro ao fazer login', {
              description: apiError.action || 'Tente novamente.',
            })
        }
      } else if (error instanceof Error) {
        toast.error('Erro ao fazer login', {
          description:
            error.message || 'Verifique sua conexão e tente novamente.',
        })
      } else {
        toast.error('Erro ao fazer login', {
          description: 'Erro desconhecido. Tente novamente.',
        })
      }
    },
  })
}

// Hook helper para verificar tipos específicos de erro
export const useErrorHandler = () => {
  const handleAPIError = (error: unknown) => {
    if (error instanceof TabNewsError) {
      return {
        isAPIError: true,
        message: error.userMessage,
        action: error.userAction,
        statusCode: error.statusCode,
        errorType: error.apiError.name,
        errorId: error.apiError.error_id,
      }
    }

    return {
      isAPIError: false,
      message: error instanceof Error ? error.message : 'Erro desconhecido',
      action: null,
      statusCode: null,
      errorType: null,
      errorId: null,
    }
  }

  return { handleAPIError }
}
