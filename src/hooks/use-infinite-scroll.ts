'use client'

import { useEffect, useRef } from 'react'

interface UseInfiniteScrollProps {
  hasNextPage?: boolean
  isFetchingNextPage?: boolean
  fetchNextPage: () => void
}

export function useInfiniteScroll({
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: UseInfiniteScrollProps) {
  const loaderRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!loaderRef.current) return
    if (!hasNextPage) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetchingNextPage) {
          fetchNextPage()
        }
      },
      { rootMargin: '200px' }, // dispara um pouco antes do fim
    )

    observer.observe(loaderRef.current)

    return () => {
      observer.disconnect()
    }
  }, [loaderRef, hasNextPage, isFetchingNextPage, fetchNextPage])

  return { loaderRef }
}
