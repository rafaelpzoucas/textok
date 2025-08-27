import { UserBadge } from '@/components/user-badge'
import { ContentType } from '@/features/contents/schemas'
import { calculateReadingTime } from '@/utils/calculateReadingTime'
import { formatTimeAgo } from '@/utils/timeAgo'
import { forwardRef } from 'react'

interface FeedSnapProps {
  content: ContentType
}

export const FeedSnap = forwardRef<HTMLDivElement, FeedSnapProps>(
  ({ content }, ref) => {
    const readingTime = content.body ? calculateReadingTime(content.body) : null

    return (
      <section
        ref={ref}
        className="h-[calc(100vh_-_60px)] snap-start flex flex-col justify-center gap-12 p-8"
        data-id={`${content?.owner_username}:${content?.slug}`}
      >
        <header className="space-x-4">
          <UserBadge username={content?.owner_username} />
          <span className="text-muted-foreground text-xs">
            {content?.created_at ? formatTimeAgo(content?.created_at) : ''}
          </span>
        </header>

        <h1 className="text-5xl font-bold text-left [word-break:break-word] [overflow-wrap:anywhere] ">
          {content.title}
        </h1>

        <footer className="flex flex-col gap-2">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <span>{content.tabcoins} tabcoins</span>
            <span>&bull;</span>
            <span>
              {content.children_deep_count}{' '}
              {content.children_deep_count > 1 ? 'comentários' : 'comentário'}
            </span>
            {readingTime && (
              <>
                <span>&bull;</span>
                <span>{readingTime}</span>
              </>
            )}
          </div>
        </footer>
      </section>
    )
  },
)

FeedSnap.displayName = 'FeedSnap'
