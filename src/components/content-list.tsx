'use client'

import { useReadContents } from '@/features/contents/hooks'
import { StrategyType } from '@/features/contents/schemas'
import { useIsMobile } from '@/hooks/use-mobile'
import { formatTimeAgo } from '@/utils/timeAgo'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from './ui/button'

export function ContentList({
  strategy = 'relevant',
  page = 1,
}: {
  page?: number
  strategy?: StrategyType
}) {
  const router = useRouter()

  const isMobile = useIsMobile()
  const { data } = useReadContents(page, strategy)

  const isRelevants = strategy === 'relevant'

  if (isMobile) return null

  return (
    <div className="flex flex-col max-w-4xl mx-auto p-4 gap-6 pb-16">
      <ol className="space-y-3">
        {data?.map((content, index) => {
          const relativeNumber = (page - 1) * 30 + (index + 1)

          return (
            <li key={content.id}>
              <Link
                href={`/${content.owner_username}/${content.slug}`}
                className="space-x-4"
              >
                <span>{relativeNumber}.</span>
                <strong className="hover:underline">{content.title}</strong>
              </Link>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <span>{content.tabcoins} tabcoins</span>
                <span>&bull;</span>
                <span>
                  {content.children_deep_count}{' '}
                  {content.children_deep_count > 1
                    ? 'comentários'
                    : 'comentário'}
                </span>
                <span>&bull;</span>
                <span>{content.owner_username}</span>
                <span>&bull;</span>
                <span>
                  {content?.created_at
                    ? formatTimeAgo(content?.created_at)
                    : ''}
                </span>
              </div>
            </li>
          )
        })}
      </ol>

      <footer className="flex flex-row items-center gap-4 mx-auto">
        <Button variant="link" onClick={() => router.back()}>
          <ChevronLeft /> Anterior
        </Button>

        <Button
          variant={'link'}
          onClick={() =>
            router.push(`${isRelevants ? '' : '/recentes'}/pagina/${page + 1}`)
          }
        >
          Próxima
          <ChevronRight />
        </Button>
      </footer>
    </div>
  )
}
