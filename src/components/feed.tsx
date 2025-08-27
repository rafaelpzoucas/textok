'use client'

import { useInfiniteContents } from '@/features/contents/hooks'
import { strategyEnum, StrategyType } from '@/features/contents/schemas'
import { useQueryState } from 'nuqs'
import { FeedSnapList } from './feed-snap-list'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'

export function Feed() {
  const [strategy, setStrategy] = useQueryState('strategy', {
    defaultValue: 'relevant' as StrategyType,
    parse: (value) => {
      const result = strategyEnum.safeParse(value)
      return result.success ? result.data : 'relevant'
    },
    serialize: (value) => value,
    clearOnDefault: false,
  })

  const {
    data: relevantData,
    fetchNextPage: relevantFetchNextPage,
    hasNextPage: relevantHasNextPage,
    isFetchingNextPage: relevantIsFetchingNextPage,
  } = useInfiniteContents('relevant')
  const {
    data: newData,
    fetchNextPage: newFetchNextPage,
    hasNextPage: newHasNextPage,
    isFetchingNextPage: newIsFetchingNextPage,
  } = useInfiniteContents('new')

  const handleStrategyChange = (value: string) => {
    const result = strategyEnum.safeParse(value)
    if (result.success) {
      setStrategy(result.data)
    }
  }

  return (
    <Tabs
      defaultValue="relevant"
      value={strategy}
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
      <TabsContent value="relevant">
        <FeedSnapList
          strategy="relevant"
          data={relevantData}
          fetchNextPage={relevantFetchNextPage}
          hasNextPage={relevantHasNextPage}
          isFetchingNextPage={relevantIsFetchingNextPage}
        />
      </TabsContent>
      <TabsContent value="new">
        <FeedSnapList
          strategy="new"
          data={newData}
          fetchNextPage={newFetchNextPage}
          hasNextPage={newHasNextPage}
          isFetchingNextPage={newIsFetchingNextPage}
        />
      </TabsContent>
    </Tabs>
  )
}
