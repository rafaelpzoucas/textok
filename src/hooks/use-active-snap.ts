'use client'

import { useEffect, useRef } from 'react'

interface UseActiveSnapProps {
  containerRef: React.RefObject<HTMLElement | null>
  setUsername: (username: string | null) => void
  setSlug: (slug: string | null) => void
  dataLength?: number // opcional, para recalcular quando novas páginas chegam
}

export function useActiveSnap({
  containerRef,
  setUsername,
  setSlug,
  dataLength,
  initialUsername,
  initialSlug,
}: UseActiveSnapProps & {
  initialUsername: string | null
  initialSlug: string | null
}) {
  const activeIdRef = useRef<string | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const getSections = () =>
      Array.from(container.querySelectorAll<HTMLElement>('section[data-id]'))

    const updateActive = () => {
      const mid = container.scrollTop + container.clientHeight / 2
      const sections = getSections()
      if (!sections.length) return

      let bestEl: HTMLElement | null = null
      let bestDist = Infinity

      sections.forEach((el) => {
        const top = el.offsetTop
        const center = top + el.clientHeight / 2
        const dist = Math.abs(center - mid)
        if (dist < bestDist) {
          bestDist = dist
          bestEl = el
        }
      })

      if (bestEl) {
        // Correção: garantir que bestEl é um HTMLElement com dataset
        const id =
          (bestEl as HTMLElement & { dataset: DOMStringMap }).dataset.id || null
        if (id && id !== activeIdRef.current) {
          activeIdRef.current = id
          const [u, s = ''] = id.split(':')
          setUsername(u || null)
          setSlug(s || null)
        }
      }
    }

    // Atualiza sempre que houver scroll
    container.addEventListener('scroll', updateActive)
    // Atualiza no mount
    if (!initialUsername && !initialSlug) {
      updateActive()
    }

    return () => {
      container.removeEventListener('scroll', updateActive)
    }
  }, [containerRef, setUsername, setSlug, dataLength]) // eslint-disable-line react-hooks/exhaustive-deps
}
