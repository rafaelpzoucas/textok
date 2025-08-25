'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import {
  useInfiniteContents,
  useReadContentBySlug,
} from '@/features/contents/hooks'
import { useSearchParams } from 'next/navigation'
import { Suspense, useMemo } from 'react'
import { FullContent } from './full-content'
import { VerticalScroll } from './vertical-scroll'

function FeedItems() {
  const searchParams = useSearchParams()
  const slug = searchParams.get('slug') ?? ''
  const username = searchParams.get('username') ?? ''

  const {
    data: infiniteData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
    refetch,
  } = useInfiniteContents()

  const { data: content } = useReadContentBySlug(username, slug)

  // Flatten all pages into a single array
  const contents = useMemo(() => {
    if (!infiniteData?.pages) return []
    return infiniteData.pages.flat()
  }, [infiniteData?.pages])

  if (isLoading) {
    return (
      <CarouselItem className="h-screen w-full">
        <div className="flex items-center justify-center h-full">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <div className="text-center">
              <div className="font-medium">Carregando feed...</div>
              <div className="text-sm text-muted-foreground mt-1">
                Buscando os melhores conteúdos
              </div>
            </div>
          </div>
        </div>
      </CarouselItem>
    )
  }

  if (error) {
    return (
      <CarouselItem className="h-screen w-full">
        <div className="flex items-center justify-center h-full">
          <div className="text-center max-w-md px-6">
            <div className="text-6xl mb-4">📰</div>
            <div className="text-xl font-semibold mb-2">
              Ops! Algo deu errado
            </div>
            <div className="text-muted-foreground mb-6">
              Não foi possível carregar o feed do TabNews. Verifique sua conexão
              e tente novamente.
            </div>
            <button
              onClick={() => refetch()}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Tentar novamente
            </button>
          </div>
        </div>
      </CarouselItem>
    )
  }

  if (contents.length === 0) {
    return (
      <CarouselItem className="h-screen w-full">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="text-6xl mb-4">📄</div>
            <div className="text-xl font-semibold mb-2">Feed vazio</div>
            <div className="text-muted-foreground">
              Nenhum conteúdo encontrado no momento
            </div>
          </div>
        </div>
      </CarouselItem>
    )
  }

  return (
    <>
      <CarouselItem className="h-screen w-full">
        <VerticalScroll
          contents={contents}
          hasNextPage={hasNextPage ?? false}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
        />
      </CarouselItem>
      <CarouselItem className="h-screen w-full">
        <FullContent content={content} />
      </CarouselItem>
    </>
  )
}

export function Feed() {
  return (
    <Carousel opts={{ loop: false }}>
      <CarouselContent className="h-screen bg-background">
        <Suspense fallback={<div>Carregando...</div>}>
          <FeedItems />
        </Suspense>
      </CarouselContent>
    </Carousel>
  )
}
