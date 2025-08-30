// components/feed.tsx
'use client'

import { useInfiniteContents } from '@/features/contents/hooks'
import { strategyEnum, StrategyType } from '@/features/contents/schemas'
import { cn } from '@/lib/utils'
import { useQueryState } from 'nuqs'
import { useMemo, useRef } from 'react'
import { useActiveSnap } from '../hooks/use-active-snap'
import { FeedSnapList } from './feed-snap-list'
import { Tabs, TabsList, TabsTrigger } from './ui/tabs'

export function Feed() {
  const [_page] = useQueryState('page', {
    history: 'push',
  })
  const [_username, setUsername] = useQueryState('username', {
    history: 'push',
  })
  const [_slug, setSlug] = useQueryState('slug', {
    history: 'push',
  })

  const [strategy, setStrategy] = useQueryState('strategy', {
    defaultValue: 'relevant' as StrategyType,
    parse: (value) => {
      const result = strategyEnum.safeParse(value)
      return result.success ? result.data : 'relevant'
    },
    serialize: (value) => value,
    clearOnDefault: false,
    history: 'push',
  })

  const relevantQuery = useInfiniteContents('relevant', {
    enabled: strategy === 'relevant',
  })
  const newQuery = useInfiniteContents('new', {
    enabled: strategy === 'new',
  })

  const relevantRef = useRef<HTMLDivElement | null>(null)
  const newRef = useRef<HTMLDivElement | null>(null)

  const relevantLength = useMemo(
    () => relevantQuery.data?.pages.reduce((a, p) => a + p.length, 0) || 0,
    [relevantQuery.data],
  )
  const newLength = useMemo(
    () => newQuery.data?.pages.reduce((a, p) => a + p.length, 0) || 0,
    [newQuery.data],
  )

  const activeRef = strategy === 'relevant' ? relevantRef : newRef
  const activeLength = strategy === 'relevant' ? relevantLength : newLength

  useActiveSnap({
    containerRef: activeRef,
    setUsername,
    setSlug,
    dataLength: activeLength,
    strategy: strategy as StrategyType,
  })

  const handleStrategyChange = (value: string) => {
    const result = strategyEnum.safeParse(value)
    if (result.success) setStrategy(result.data)
  }

  return (
    <div className="flex-none w-screen h-screen snap-center overflow-y-scroll">
      <Tabs
        value={strategy || 'relevant'}
        onValueChange={handleStrategyChange}
        className="h-full w-full"
      >
        <div className="fixed bottom-0 left-0 w-full z-50 p-4 flex">
          <div className="bg-background w-fit mx-auto rounded-lg">
            <TabsList>
              <TabsTrigger value="relevant">Relevantes</TabsTrigger>
              <TabsTrigger value="new">Recentes</TabsTrigger>
            </TabsList>
          </div>
        </div>

        <div className="h-full w-full relative">
          <div
            className={cn(
              'absolute inset-0 transition-opacity duration-300',
              strategy === 'relevant'
                ? 'opacity-100'
                : 'opacity-0 pointer-events-none',
            )}
          >
            <FeedSnapList
              ref={relevantRef}
              data={relevantQuery.data}
              fetchNextPage={relevantQuery.fetchNextPage}
              hasNextPage={relevantQuery.hasNextPage}
              isFetchingNextPage={relevantQuery.isFetchingNextPage}
            />
          </div>

          <div
            className={cn(
              'absolute inset-0 transition-opacity duration-300',
              strategy === 'new'
                ? 'opacity-100'
                : 'opacity-0 pointer-events-none',
            )}
          >
            <FeedSnapList
              ref={newRef}
              data={newQuery.data}
              fetchNextPage={newQuery.fetchNextPage}
              hasNextPage={newQuery.hasNextPage}
              isFetchingNextPage={newQuery.isFetchingNextPage}
            />
          </div>
        </div>
      </Tabs>
    </div>
  )
}
