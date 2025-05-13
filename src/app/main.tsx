'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { mockArticles, mockAuthors } from '@/lib/mocks'
import { useSearchParams } from 'next/navigation'
import { FullArticle } from './full-article'
import { Profile } from './profile'
import { VerticalScroll } from './vertical-scroll'

export function Main() {
  const searchParams = useSearchParams()
  const slug = searchParams.get('article')

  const selectedArticle = mockArticles.find((article) => article.slug === slug)
  const selectedAuthor = mockAuthors.find(
    (author) => author.id === selectedArticle?.author_id,
  )

  return (
    <Carousel opts={{ loop: false }}>
      <CarouselContent className="h-screen bg-background">
        <CarouselItem className="h-screen w-full">
          <VerticalScroll />
        </CarouselItem>
        <CarouselItem className="h-screen w-full">
          <FullArticle article={selectedArticle} />
        </CarouselItem>
        <CarouselItem className="h-screen w-full">
          <Profile author={selectedAuthor} />
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  )
}
