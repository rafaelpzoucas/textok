import { CommentType } from '@/features/comments/schemas'
import { ContentType } from '@/features/contents/schemas'
import { ChevronDown, ChevronUp, Share } from 'lucide-react'
import { Button } from './ui/button'

export function ContentActions({
  content,
}: {
  content?: ContentType | CommentType
}) {
  return (
    <footer className="flex flex-row items-center justify-between mt-4">
      <Button variant="secondary">Responder</Button>

      <div className="space-x-2">
        <span>
          <Button variant="ghost" size="icon">
            <ChevronUp />
          </Button>
          <span className="px-1 text-primary">{content?.tabcoins}</span>
          <Button variant="ghost" size="icon">
            <ChevronDown />
          </Button>
        </span>

        <Button variant="ghost" size="icon">
          <Share />
        </Button>
      </div>
    </footer>
  )
}
