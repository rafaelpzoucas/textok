'use client'

import { mockArticles } from '@/schemas/article'
import useEmblaCarousel from 'embla-carousel-react'
import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { FeedArticle } from './feed-article'

export function VerticalScroll() {
  const router = useRouter()

  const [viewportRef, emblaApi] = useEmblaCarousel({
    axis: 'y',
    dragFree: false,
    loop: true,
  })
  
  const wheelTimeout = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (!emblaApi) return

    // Função que será chamada sempre que o slide mudar
    const onSelect = () => {
      const selectedIndex = emblaApi.selectedScrollSnap()
      const selectedArticle = mockArticles[selectedIndex] // Pegando o artigo baseado no índice
      if (selectedArticle) {
        router.push(`?article=${selectedArticle.slug}`)
      }
    }

    // Chama onSelect imediatamente para console.log o primeiro artigo
    onSelect()

    // Adiciona o ouvinte de evento para o slide mudar
    emblaApi.on('select', onSelect)

    const onWheel = (event: WheelEvent) => {
      // ignora scroll horizontal
      if (Math.abs(event.deltaY) < Math.abs(event.deltaX)) return

      event.preventDefault()

      // Evita múltiplos scrolls com um gesto só
      if (wheelTimeout.current) return

      const direction = event.deltaY > 0 ? 1 : -1
      const nextIndex = emblaApi.selectedScrollSnap() + direction

      if (nextIndex >= 0 && nextIndex < emblaApi.scrollSnapList().length) {
        emblaApi.scrollTo(nextIndex)
      }

      wheelTimeout.current = setTimeout(() => {
        wheelTimeout.current = null
      }, 500) // controla sensibilidade do gesto
    }

    const node = emblaApi.containerNode()
    node.addEventListener('wheel', onWheel, { passive: false })

    return () => {
      // Limpeza dos eventos
      emblaApi.off('select', onSelect)
      node.removeEventListener('wheel', onWheel)
    }
  }, [emblaApi])

  return (
    <div
      ref={viewportRef}
      className="overflow-hidden h-dvh w-full touch-pan-y"
    >
      <div className="flex flex-col h-full px-8">
        {mockArticles.map(article => (
          <FeedArticle key={article.id} article={article} />
        ))}
      </div>
    </div>
  )
}
