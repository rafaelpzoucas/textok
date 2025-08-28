'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { TransactTabcoinData } from './schemas'
import { transactTabcoin } from './transact'

interface TransactTabcoinResponse {
  success: boolean
  data: {
    id: string
    tabcoins: number
    tabcoins_credit: number
    tabcoins_debit: number
    // outros campos que a API retorna
  }
  status: number
}

interface UseTransactTabcoinOptions {
  onSuccess?: (data: TransactTabcoinResponse) => void
  onError?: (error: Error) => void
}

export const useTransactTabcoin = (options?: UseTransactTabcoinOptions) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['transact-tabcoin'],
    mutationFn: async (
      values: TransactTabcoinData,
    ): Promise<TransactTabcoinResponse> => {
      return await transactTabcoin(values)
    },

    onSuccess: (data, variables) => {
      // Invalida queries relacionadas para atualizar dados
      queryClient.invalidateQueries({
        queryKey: ['authed-user'],
      })
      queryClient.invalidateQueries({
        queryKey: ['tabnews-content', variables.username, variables.slug],
      })
      queryClient.invalidateQueries({
        queryKey: [
          'tabnews-content-comments',
          variables.username,
          variables.slug,
        ],
      })

      // Feedback visual
      toast.success('Voto registrado com sucesso!')

      // Callback personalizado
      options?.onSuccess?.(data)
    },
    onError: (error) => {
      toast.error(error.message)
      options?.onError?.(error)
    },
  })
}
