'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { useState } from 'react'
import { TurnstileProvider } from './turnstile-provider'
import { Toaster } from './ui/sonner'

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Com SSR, normalmente queremos definir um staleTime padrão
            // acima de 0 para evitar refetch imediato no cliente
            staleTime: 60 * 1000, // 1 minuto
          },
        },
      }),
  )

  return (
    <TurnstileProvider>
      <QueryClientProvider client={queryClient}>
        <NuqsAdapter>
          {children}
          <Toaster />
        </NuqsAdapter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </TurnstileProvider>
  )
}
