'use client'

import { ScrollArea } from '@/components/ui/scroll-area'
import { UserBadge } from '@/components/user-badge'
import { useReadContentComments } from '@/features/comments/hooks'
import { useReadContentBySlug } from '@/features/contents/hooks'
import { cn } from '@/lib/utils'
import { calculateReadingTime } from '@/utils/calculateReadingTime'
import { formatTimeAgo } from '@/utils/timeAgo'
import { Link } from 'lucide-react'
import { useQueryState } from 'nuqs'
import { Comment } from './comment'
import { ContentActions } from './content-actions'
import { Markdown } from './markdown'

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

  const readingTime = content?.body ? calculateReadingTime(content.body) : null

  return (
    <div className="w-screen h-screen flex-shrink-0 snap-start flex items-center justify-center">
      <ScrollArea className="h-screen w-full rounded-md">
        <div className="p-8 space-y-6 max-w-screen lg:max-w-2xl mx-auto pb-32">
          <header className="flex flex-row items-center gap-2">
            <UserBadge username={content?.owner_username} />

            <span className="text-muted-foreground text-xs">{readingTime}</span>
            <span className="text-muted-foreground text-xs">&bull;</span>
            <span className="text-muted-foreground text-xs">
              {content?.created_at ? formatTimeAgo(content?.created_at) : ''}
            </span>
          </header>

          <h1 className="text-3xl font-bold">{content?.title}</h1>

          <Markdown content={content?.body || ''} />

          <section className="border-b py-4">
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

            <ContentActions content={content} />
          </section>

          <section className="space-y-10">
            {comments &&
              comments.length > 0 &&
              comments.map((comment) => (
                <Comment
                  key={comment.id}
                  comment={comment}
                  opUsername={content?.owner_username}
                />
              ))}
          </section>
        </div>
      </ScrollArea>
    </div>
  )
}
