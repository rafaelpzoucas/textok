'use client'

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

import { mockArticles } from "@/schemas/article";
import { useSearchParams } from "next/navigation";
import { FullArticle } from "./full-article";
import { Profile } from "./profile";
import { VerticalScroll } from "./vertical-scroll";

export default function Home() {
  const searchParams = useSearchParams()
  const slug = searchParams.get('article')

  const selectedArticle = mockArticles.find(article => article.slug === slug)

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
          <Profile />
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
}
