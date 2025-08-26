'use client'

import { buttonVariants } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { UserBadge } from '@/components/user-badge'
import { useReadContentBySlug } from '@/features/contents/hooks'
import { cn } from '@/lib/utils'
import { calculateReadingTime } from '@/utils/calculateReadingTime'
import { formatTimeAgo } from '@/utils/timeAgo'
import { useQueryState } from 'nuqs'

export function FullContent() {
  const [username] = useQueryState('username')
  const [slug] = useQueryState('slug')

  const { data: content } = useReadContentBySlug(
    username as string,
    slug as string,
  )

  const readingTime = content?.body ? calculateReadingTime(content.body) : null

  return (
    <div className="w-screen h-screen flex-shrink-0 snap-start flex items-center justify-center">
      <ScrollArea className="h-screen w-full rounded-md">
        <div className="p-8 space-y-6 max-w-screen lg:max-w-2xl mx-auto">
          <header className="flex flex-row items-center gap-2">
            <UserBadge username={content?.owner_username} />

            <span className="text-muted-foreground text-xs">{readingTime}</span>
            <span className="text-muted-foreground text-xs">&bull;</span>
            <span className="text-muted-foreground text-xs">
              {content?.created_at ? formatTimeAgo(content?.created_at) : ''}
            </span>
          </header>

          <h1 className="text-3xl font-bold">{content?.title}</h1>

          <p className="text-2xl text-muted-foreground prose">
            {content?.body}
          </p>

          <footer className="border-t py-4">
            {content?.source_url && (
              <p>
                Fonte:{' '}
                <a
                  href={content?.source_url}
                  className={cn(
                    buttonVariants({ variant: 'link' }),
                    'px-0 font-bold',
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {content?.source_url}
                </a>
              </p>
            )}
          </footer>
        </div>
      </ScrollArea>
    </div>
  )
}
