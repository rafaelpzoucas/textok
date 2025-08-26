import { useEffect, useRef } from 'react'

interface UseInfiniteScrollProps {
  hasNextPage: boolean
  isFetchingNextPage: boolean
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
    const el = loaderRef.current

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0]
        if (first.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
        }
      },
      { threshold: 1 },
    )

    observer.observe(el)
    return () => {
      observer.unobserve(el)
    }
  }, [loaderRef, hasNextPage, isFetchingNextPage, fetchNextPage])

  return { loaderRef }
}
