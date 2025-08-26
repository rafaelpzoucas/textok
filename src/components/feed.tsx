'use client'

import { useInfiniteContents } from '@/features/contents/hooks'

import { useQueryState } from 'nuqs'
import { useActiveSnap } from '../hooks/use-active-snap'
import { useInfiniteScroll } from '../hooks/use-infinite-scroll'
import { FeedSnap } from './feed-snap'

export function Feed() {
  const [_username, setUsername] = useQueryState('username')
  const [_slug, setSlug] = useQueryState('slug')

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteContents()

  const { loaderRef } = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  })

  useActiveSnap({ setUsername, setSlug })

  return (
    <div className="w-screen h-screen flex-shrink-0 snap-start overflow-y-scroll snap-y snap-mandatory">
      {data?.pages.map((page, pageIndex) =>
        page.map((content, index) => {
          const isPenultimate =
            pageIndex === data.pages.length - 1 && index === page.length - 2

          return (
            <FeedSnap
              key={content.id}
              ref={isPenultimate ? loaderRef : null}
              content={content}
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
