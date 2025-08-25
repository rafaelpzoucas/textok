import { buttonVariants } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { User } from '@/components/user'
import { Content } from '@/features/contents/schemas'
import { cn } from '@/lib/utils'
import { calculateReadingTime } from '@/utils/calculateReadingTime'
import { formatTimeAgo } from '@/utils/timeAgo'

export function FullContent({ content }: { content?: Content }) {
  const readingTime = content?.body ? calculateReadingTime(content.body) : null

  return (
    <ScrollArea className="h-screen w-full rounded-md">
      <div className="p-8 space-y-6 max-w-screen lg:max-w-2xl mx-auto">
        <header className="flex flex-row items-center gap-2">
          <User username={content?.owner_username} />
          <span className="text-muted-foreground text-xs">{readingTime}</span>
          <span className="text-muted-foreground text-xs">&bull;</span>
          <span className="text-muted-foreground text-xs">
            {content?.created_at ? formatTimeAgo(content?.created_at) : ''}
          </span>
        </header>

        <h1 className="text-3xl font-bold">{content?.title}</h1>

        <p className="text-2xl text-muted-foreground prose">{content?.body}</p>

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
  )
}
