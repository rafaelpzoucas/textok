import { UserBadge } from '@/components/user-badge'
import { calculateReadingTime } from '@/utils/calculateReadingTime'
import { forwardRef } from 'react'

interface FeedSnapProps {
  content: {
    id: string
    title: string
    owner_username: string
    slug: string
    tabcoins: number
    children_deep_count: number
    body?: string
  }
}

export const FeedSnap = forwardRef<HTMLDivElement, FeedSnapProps>(
  ({ content }, ref) => {
    const readingTime = content.body ? calculateReadingTime(content.body) : null

    return (
      <section
        ref={ref}
        className="h-screen snap-start flex flex-col justify-center gap-12 p-8 border-b"
        data-id={`${content?.owner_username}:${content?.slug}`}
      >
        <UserBadge username={content?.owner_username} />

        <h1 className="text-5xl font-bold text-left">{content.title}</h1>

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
