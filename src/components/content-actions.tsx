import { CommentType } from '@/features/comments/schemas'
import { ContentType } from '@/features/contents/schemas'
import { ChevronDown, ChevronUp, CornerDownRight, Share } from 'lucide-react'
import { Button } from './ui/button'

export function ContentActions({
  content,
}: {
  content?: ContentType | CommentType
}) {
  return (
    <footer className="flex flex-row items-center justify-between mt-4">
      <span className="flex flex-row">
        <Button variant="ghost" size="icon">
          <ChevronUp />
        </Button>
        <div className="flex items-center justify-center px-1 text-primary w-8">
          {content?.tabcoins}
        </div>
        <Button variant="ghost" size="icon">
          <ChevronDown />
        </Button>
      </span>

      <div className="flex flex-row items-center gap-2">
        <Button variant="secondary">
          <CornerDownRight />
          Responder
        </Button>

        <Button variant="secondary" size="icon">
          <Share />
        </Button>
      </div>
    </footer>
  )
}
