'use client'

import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { UserBadge } from '@/components/user-badge'
import { useReadContentComments } from '@/features/comments/hooks'
import { useReadContentBySlug } from '@/features/contents/hooks'
import { User } from '@/features/users/schemas'
import { useIsSnapActive } from '@/hooks/use-horizontal-snap'
import { cn } from '@/lib/utils'
import { calculateReadingTime } from '@/utils/calculateReadingTime'
import { formatTimeAgo } from '@/utils/timeAgo'
import { Link } from 'lucide-react'
import { useQueryState } from 'nuqs'
import { useRef } from 'react'
import { Comment } from './comment'
import { ContentActions } from './content-actions'
import { Markdown } from './markdown'
import { Header } from './mobile-header'

function FullContentSkeleton() {
  return (
    <div className="p-6 space-y-6 max-w-screen lg:max-w-4xl mx-auto pb-32">
      {/* Header Section */}
      <header className="flex flex-col gap-2">
        <Skeleton className="h-8 w-32" />

        <div className="flex flex-row items-center gap-2">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-20" />
        </div>
      </header>

      {/* Title */}
      <Skeleton className="h-10 w-3/4" />

      {/* Content Body */}
      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />

        <div className="pt-4 space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-1/2" />
        </div>

        <div className="pt-4 space-y-3">
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/5" />
        </div>
      </div>

      {/* Source Section */}
      <section className="space-y-3">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row items-center gap-2">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-12" />
          </div>
          <Skeleton className="h-4 w-64" />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-4">
          <Skeleton className="h-9 w-16" />
          <Skeleton className="h-9 w-16" />
          <Skeleton className="h-9 w-20" />
        </div>
      </section>
    </div>
  )
}

export function FullContent({
  user,
  defaultUsername,
  defaultSlug,
}: {
  user: User | null
  defaultUsername?: string
  defaultSlug?: string
}) {
  const fullContentRef = useRef<HTMLDivElement | null>(null)
  const isActive = useIsSnapActive(fullContentRef)

  const [qUsername] = useQueryState('username')
  const [qSlug] = useQueryState('slug')

  const username = (qUsername as string) || (defaultUsername as string)
  const slug = (qSlug as string) || (defaultSlug as string)

  const { data: content, isPending } = useReadContentBySlug(username, slug, {
    enabled: isActive,
  })

  const { data: comments } = useReadContentComments(username, slug, {
    enabled: isActive && !!content,
  })

  const readingTime = content?.body ? calculateReadingTime(content.body) : null

  return (
    <div
      ref={fullContentRef}
      className="w-full h-full flex-shrink-0 snap-start flex items-center justify-center"
    >
      <ScrollArea className="h-screen lg:h-[calc(100vh_-_65px)] w-full rounded-md">
        {defaultUsername && defaultSlug && <Header />}

        {isPending && !content ? (
          <FullContentSkeleton />
        ) : (
          <div className="p-6 space-y-6 max-w-screen lg:max-w-4xl mx-auto pb-32">
            <header className="flex flex-col  gap-2">
              <UserBadge username={content?.owner_username} />

              <div className="flex flex-row items-center gap-2">
                <span className="text-muted-foreground text-xs">
                  {readingTime}
                </span>
                <span className="text-muted-foreground text-xs">&bull;</span>
                <span className="text-muted-foreground text-xs">
                  {content?.created_at
                    ? formatTimeAgo(content?.created_at)
                    : ''}
                </span>
              </div>
            </header>

            <h1 className="text-3xl font-bold">{content?.title}</h1>

            <Markdown content={content?.body || ''} />

            <section>
              {content?.source_url && (
                <div className="flex flex-col gap-2">
                  <span className="flex flex-row items-center gap-2">
                    <Link className="w-4 h-4 text-muted-foreground" />
                    Fonte:{' '}
                  </span>
                  <a
                    href={content?.source_url}
                    className={cn(
                      'px-0 font-bold break-all hyphens-auto text-left min-w-0 w-fit text-primary/70 hover:text-primary/60',
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {content?.source_url}
                  </a>
                </div>
              )}

              <ContentActions content={content} user={user} />
            </section>

            <section className="">
              {comments &&
                comments.length > 0 &&
                comments.map((comment) => (
                  <Comment
                    key={comment.id}
                    comment={comment}
                    opUsername={content?.owner_username}
                    user={user}
                  />
                ))}
            </section>
          </div>
        )}
      </ScrollArea>
    </div>
  )
}
