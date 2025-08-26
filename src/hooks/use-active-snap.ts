import { useEffect, useRef } from 'react'

interface UseActiveContentProps {
  setUsername: (username: string | null) => void
  setSlug: (slug: string | null) => void
}

export function useActiveSnap({ setUsername, setSlug }: UseActiveContentProps) {
  const activeIdRef = useRef<string | null>(null)

  useEffect(() => {
    const sections = document.querySelectorAll('section[data-id]')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            const el = entry.target as HTMLElement
            const id = el.dataset.id
            if (id && id !== activeIdRef.current) {
              activeIdRef.current = id
              const [u, s] = id.split(':')
              setUsername(u)
              setSlug(s)
            }
          }
        })
      },
      { threshold: [0.6] },
    )

    sections.forEach((s) => observer.observe(s))

    return () => {
      sections.forEach((s) => observer.unobserve(s))
    }
  }, [setUsername, setSlug])

  return { activeIdRef }
}
