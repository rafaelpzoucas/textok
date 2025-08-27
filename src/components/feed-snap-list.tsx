'use client'

import { ContentType, StrategyType } from '@/features/contents/schemas'
import { InfiniteData } from '@tanstack/react-query'
import { useQueryState } from 'nuqs'
import { useRef } from 'react'
import { useActiveSnap } from '../hooks/use-active-snap'
import { useInfiniteScroll } from '../hooks/use-infinite-scroll'
import { FeedSnap } from './feed-snap'

export function FeedSnapList({
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: {
  strategy: StrategyType
  data?: InfiniteData<ContentType[], unknown>
  fetchNextPage: () => void
  hasNextPage?: boolean
  isFetchingNextPage?: boolean
}) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [_username, setUsername] = useQueryState('username')
  const [_slug, setSlug] = useQueryState('slug')

  const { loaderRef } = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  })

  // Passa dataLength para recalcular quando novas páginas chegam
  const totalItems =
    data?.pages.reduce((acc, page) => acc + page.length, 0) || 0
  useActiveSnap({ containerRef, setUsername, setSlug, dataLength: totalItems })

  return (
    <div
      ref={containerRef}
      className="w-screen h-screen flex-shrink-0 snap-start overflow-y-scroll snap-y snap-mandatory"
    >
      {data?.pages.map((page, pageIndex) =>
        page.map((content, index) => {
          const isPenultimate =
            pageIndex === data.pages.length - 1 && index === page.length - 2

          return (
            <FeedSnap
              key={content.id}
              ref={isPenultimate ? loaderRef : null}
              content={content}
              data-id={`${content.owner_username}:${content.slug}`}
            />
          )
        }),
      )}

      {isFetchingNextPage && (
        <div className="h-20 flex items-center justify-center text-muted-foreground">
          Carregando mais conteúdo...
        </div>
      )}
    </div>
  )
}
