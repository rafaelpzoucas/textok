// app/providers/turnstile-provider.tsx
'use client'

import { Turnstile } from 'next-turnstile'
import { createContext, useContext, useEffect, useState } from 'react'

type TurnstileContextType = {
  requestChallenge: () => Promise<string>
}

const TurnstileContext = createContext<TurnstileContextType | null>(null)

export function useTurnstile() {
  const ctx = useContext(TurnstileContext)
  if (!ctx) {
    throw new Error('useTurnstile deve ser usado dentro do TurnstileProvider')
  }
  return ctx
}

export function TurnstileProvider({ children }: { children: React.ReactNode }) {
  const siteKey = process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY ?? ''

  const [visible, setVisible] = useState(false)
  const [resolver, setResolver] = useState<((token: string) => void) | null>(
    null,
  )

  const requestChallenge = () =>
    new Promise<string>((resolve) => {
      setResolver(() => resolve)
      setVisible(true)
    })

  // Substitui window.fetch
  useEffect(() => {
    if (typeof window === 'undefined') return

    const originalFetch = window.fetch
    window.fetch = async (input, init) => {
      try {
        const response = await originalFetch(input, init)
        const text = await response.clone().text()

        const isHTML =
          text.includes('<!DOCTYPE html>') || text.includes('<html')

        if (!isHTML) {
          return response
        }

        // Cloudflare bloqueou -> pede desafio
        const token = await requestChallenge()

        // Reexecuta a request com token
        const retryInit: RequestInit = {
          ...init,
          headers: {
            ...(init?.headers || {}),
            'X-Captcha-Token': token,
          },
        }

        return originalFetch(input, retryInit)
      } catch (err) {
        return Promise.reject(err)
      }
    }

    return () => {
      window.fetch = originalFetch
    }
  }, [])

  return (
    <TurnstileContext.Provider value={{ requestChallenge }}>
      {children}
      {visible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-4 rounded-2xl shadow-lg">
            <Turnstile
              siteKey={siteKey}
              onVerify={(token) => {
                resolver?.(token)
                setResolver(null)
                setVisible(false)
              }}
              onError={() => {
                console.error('Erro no Turnstile')
                setResolver(null)
                setVisible(false)
              }}
            />
          </div>
        </div>
      )}
    </TurnstileContext.Provider>
  )
}
