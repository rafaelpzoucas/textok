'use client'

import { ContentType } from '@/features/contents/schemas'
import { InfiniteData } from '@tanstack/react-query'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { useInfiniteScroll } from '../hooks/use-infinite-scroll'
import { FeedSnap } from './feed-snap'

export interface FeedSnapListProps {
  data?: InfiniteData<ContentType[], unknown>
  fetchNextPage: () => void
  hasNextPage?: boolean
  isFetchingNextPage?: boolean
}

export const FeedSnapList = forwardRef<HTMLDivElement, FeedSnapListProps>(
  ({ data, fetchNextPage, hasNextPage, isFetchingNextPage }, ref) => {
    const containerRef = useRef<HTMLDivElement | null>(null)
    const { loaderRef } = useInfiniteScroll({
      hasNextPage,
      isFetchingNextPage,
      fetchNextPage,
    })

    // Expor o container para o pai
    useImperativeHandle(ref, () => containerRef.current as HTMLDivElement, [])

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
  },
)
FeedSnapList.displayName = 'FeedSnapList'
