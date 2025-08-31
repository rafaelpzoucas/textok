'use client'

import { useEffect } from 'react'

type TurnstileProps = {
  siteKey: string
  onVerify: (token: string) => void
}

export function Turnstile({ siteKey, onVerify }: TurnstileProps) {
  useEffect(() => {
    // @ts-expect-error on turnstile
    if (window.turnstile) {
      // @ts-expect-error on turnstile
      window.turnstile.render('#cf-turnstile', {
        sitekey: siteKey,
        callback: (token: string) => onVerify(token),
      })
    }
  }, [siteKey, onVerify])

  return <div id="cf-turnstile" className="my-4" />
}
