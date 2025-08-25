'use client'

import { Content } from '@/features/contents/schemas'
import type { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { FeedContent } from './feed-content'

interface VerticalScrollProps {
  contents: Content[]
  hasNextPage: boolean
  isFetchingNextPage: boolean
  fetchNextPage: () => void
}

export function VerticalScroll({
  contents,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: VerticalScrollProps) {
  const router = useRouter()

  // refs para evitar rebind de listeners
  const contentsRef = useRef(contents)
  const hasNextPageRef = useRef(hasNextPage)
  const isFetchingNextPageRef = useRef(isFetchingNextPage)
  const fetchNextPageRef = useRef(fetchNextPage)

  useEffect(() => {
    contentsRef.current = contents
  }, [contents])
  useEffect(() => {
    hasNextPageRef.current = hasNextPage
  }, [hasNextPage])
  useEffect(() => {
    isFetchingNextPageRef.current = isFetchingNextPage
  }, [isFetchingNextPage])
  useEffect(() => {
    fetchNextPageRef.current = fetchNextPage
  }, [fetchNextPage])

  const options: EmblaOptionsType = {
    axis: 'y',
    loop: false,
    dragFree: false,
    containScroll: 'trimSnaps',
    skipSnaps: false,
    duration: 25,
  }

  const [emblaRef, emblaApi] = useEmblaCarousel(options)

  useEffect(() => {
    if (!emblaApi) return

    const onSelect = async () => {
      const index = emblaApi.selectedScrollSnap()

      const list = contentsRef.current
      const item = list[index]
      if (item) {
        router.push(`?username=${item.owner_username}&slug=${item.slug}`, {
          scroll: false,
        })
      }

      // dispara prefetch quando estiver nos últimos 3 itens
      const nearEnd = index >= list.length - 3
      if (nearEnd && hasNextPageRef.current && !isFetchingNextPageRef.current) {
        await fetchNextPageRef.current()
      }
    }

    emblaApi.on('select', onSelect)
    // disparo inicial
    onSelect()

    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi, router])

  // reinit quando a lista cresce
  useEffect(() => {
    if (emblaApi && contents.length > 0) {
      emblaApi.reInit()
    }
  }, [emblaApi, contents.length])

  return (
    <div className="h-screen overflow-hidden relative">
      <div className="embla h-full" ref={emblaRef}>
        <div className="embla__container h-full flex flex-col">
          {contents.map((content, index) => (
            <div
              key={index}
              className="embla__slide h-screen w-full flex-shrink-0"
            >
              <FeedContent content={content} />
            </div>
          ))}
        </div>
      </div>

      {isFetchingNextPage && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50">
          <div className="flex items-center space-x-2 bg-background/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <span className="text-sm font-medium">Carregando mais...</span>
          </div>
        </div>
      )}
    </div>
  )
}
