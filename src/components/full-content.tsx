'use client'

import { Button, buttonVariants } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { UserBadge } from '@/components/user-badge'
import { useReadContentComments } from '@/features/comments/hooks'
import { useReadContentBySlug } from '@/features/contents/hooks'
import { cn } from '@/lib/utils'
import { calculateReadingTime } from '@/utils/calculateReadingTime'
import { formatTimeAgo } from '@/utils/timeAgo'
import { ChevronDown, ChevronUp, Link, Share } from 'lucide-react'
import { useQueryState } from 'nuqs'

export function FullContent() {
  const [username] = useQueryState('username')
  const [slug] = useQueryState('slug')

  const { data: content } = useReadContentBySlug(
    username as string,
    slug as string,
  )

  const { data: comments } = useReadContentComments(
    username as string,
    slug as string,
  )

  console.log({ comments })

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

          <section className="border-t py-4">
            {content?.source_url && (
              <p className="flex flex-row items-center gap-2">
                <Link className="w-4 h-4" />
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
          </section>

          <section className="space-y-10">
            {comments &&
              comments.length > 0 &&
              comments.map((comment) => (
                <article
                  key={comment.id}
                  className="space-y-2 border-l border-muted-foreground/10 pl-4"
                >
                  <header className="flex flex-row items-center gap-2">
                    <UserBadge username={comment?.owner_username} size="sm" />

                    <span className="text-muted-foreground text-xs">
                      {comment?.created_at
                        ? formatTimeAgo(comment?.created_at)
                        : ''}
                    </span>
                  </header>
                  <p>{comment.body || ''}</p>

                  <footer className="flex flex-row items-center justify-between mt-4">
                    <Button variant="secondary">Responder</Button>

                    <div className="space-x-2">
                      <span>
                        <Button variant="ghost" size="icon">
                          <ChevronUp />
                        </Button>
                        <span className="px-1 text-primary">
                          {comment.tabcoins}
                        </span>
                        <Button variant="ghost" size="icon">
                          <ChevronDown />
                        </Button>
                      </span>

                      <Button variant="ghost" size="icon">
                        <Share />
                      </Button>
                    </div>
                  </footer>
                </article>
              ))}
          </section>
        </div>
      </ScrollArea>
    </div>
  )
}
