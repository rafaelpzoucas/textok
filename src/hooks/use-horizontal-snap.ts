'use client'

import { useEffect, useState } from 'react'

export function useIsSnapActive(ref: React.RefObject<HTMLElement | null>) {
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const container = el.parentElement // o scroll horizontal
    if (!container) return

    const updateActive = () => {
      const mid = container.scrollLeft + container.clientWidth / 2
      const center = el.offsetLeft + el.clientWidth / 2
      const dist = Math.abs(center - mid)

      // considera ativo se o centro está alinhado (tolerância de 1px)
      setActive(dist < 1)
    }

    container.addEventListener('scroll', updateActive, { passive: true })
    updateActive()

    return () => {
      container.removeEventListener('scroll', updateActive)
    }
  }, [ref])

  return active
}
