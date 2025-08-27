'use client'

import {
  useInfiniteContents,
  useReadContentBySlug,
} from '@/features/contents/hooks'
import { ContentType } from '@/features/contents/schemas'
import { useQueryState } from 'nuqs'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useActiveSnap } from '../hooks/use-active-snap'
import { useInfiniteScroll } from '../hooks/use-infinite-scroll'
import { FeedSnap } from './feed-snap'
import { FeedSnapSkeleton } from './feed-snap-skeleton'

export function Feed() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [username, setUsername] = useQueryState('username')
  const [slug, setSlug] = useQueryState('slug')

  // Captura os valores iniciais dos searchParams
  const initialUsernameRef = useRef(username)
  const initialSlugRef = useRef(slug)

  // Ref para controlar se já processamos o conteúdo inicial
  const hasProcessedInitial = useRef(false)

  // State para armazenar o conteúdo inicial
  const [initialContent, setInitialContent] = useState<ContentType | null>(null)

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteContents()

  // Determina se deve fazer fetch do conteúdo inicial
  const shouldFetchInitial = Boolean(
    initialUsernameRef.current &&
      initialSlugRef.current &&
      !hasProcessedInitial.current,
  )

  // Fetch do conteúdo inicial baseado nos searchParams
  const { data: fetchedInitialContent, isSuccess: initialContentFetched } =
    useReadContentBySlug(
      initialUsernameRef.current || '',
      initialSlugRef.current || '',
      {
        enabled: shouldFetchInitial,
        staleTime: 1000 * 60 * 10, // 10 minutos
      },
    )

  // Processa o conteúdo inicial quando ele é carregado
  useEffect(() => {
    if (
      fetchedInitialContent &&
      initialContentFetched &&
      !hasProcessedInitial.current
    ) {
      setInitialContent(fetchedInitialContent)
      hasProcessedInitial.current = true

      console.log('Conteúdo inicial carregado:', fetchedInitialContent.title)

      // Opcional: Limpar os query params após processar
      // setUsername(null)
      // setSlug(null)
    }
  }, [fetchedInitialContent, initialContentFetched])

  const { loaderRef } = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  })

  // Merge inteligente dos conteúdos
  const mergedContents = useMemo(() => {
    const allContents = data?.pages.flat() || []

    // Se não há conteúdo inicial, retorna a lista normal
    if (!initialContent) {
      return allContents
    }

    // Filtra duplicatas do conteúdo inicial
    const uniqueContents = allContents.filter((content) => {
      const isDuplicateById = content.id === initialContent.id
      const isDuplicateBySlug =
        content.owner_username === initialContent.owner_username &&
        content.slug === initialContent.slug

      return !isDuplicateById && !isDuplicateBySlug
    })

    // Retorna o conteúdo inicial primeiro, seguido dos únicos
    return [initialContent, ...uniqueContents]
  }, [data?.pages, initialContent])

  // Passa o total de itens para o hook de snap ativo
  const totalItems = mergedContents.length

  useActiveSnap({
    containerRef,
    setUsername,
    setSlug,
    dataLength: totalItems,
    initialUsername: initialUsernameRef.current,
    initialSlug: initialSlugRef.current,
  })

  return (
    <div
      ref={containerRef}
      className="w-screen h-screen flex-shrink-0 snap-start overflow-y-scroll snap-y snap-mandatory"
    >
      {mergedContents.length > 0 ? (
        mergedContents.map((content, index) => {
          const isPenultimate = index === mergedContents.length - 2
          const isInitialContent =
            initialContent && content.id === initialContent.id

          return (
            <FeedSnap
              key={`${content.id}-${content.owner_username}-${content.slug}${isInitialContent ? '-initial' : ''}`}
              ref={isPenultimate ? loaderRef : null}
              content={content}
              data-id={`${content.owner_username}:${content.slug}`}
            />
          )
        })
      ) : (
        <div className="h-screen flex items-center justify-center w-full p-6">
          <div className="text-center text-muted-foreground w-full">
            {shouldFetchInitial && !initialContentFetched ? (
              <FeedSnapSkeleton />
            ) : (
              'Nenhum conteúdo encontrado.'
            )}
          </div>
        </div>
      )}

      {isFetchingNextPage && (
        <div className="h-20 flex items-center justify-center text-muted-foreground">
          Carregando mais conteúdo...
        </div>
      )}
    </div>
  )
}
