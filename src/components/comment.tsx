import { CommentType } from '@/features/comments/schemas'
import { formatTimeAgo } from '@/utils/timeAgo'
import { ContentActions } from './content-actions'
import { Badge } from './ui/badge'
import { UserBadge } from './user-badge'

export function Comment({
  comment,
  opUsername,
}: {
  comment: CommentType
  opUsername?: string
}) {
  return (
    <article
      key={comment.id}
      className="space-y-2 border-l border-muted-foreground/10 pl-4 mt-6"
    >
      <header className="flex flex-row items-center gap-2">
        <div className="space-x-1">
          <UserBadge username={comment?.owner_username} size="sm" />
          {opUsername === comment?.owner_username ? (
            <Badge variant="outline" className="text-xs text-muted-foreground">
              Autor
            </Badge>
          ) : null}
        </div>

        <span className="text-muted-foreground text-xs">
          {comment?.created_at ? formatTimeAgo(comment?.created_at) : ''}
        </span>
      </header>
      <p>{comment.body || ''}</p>

      <ContentActions content={comment} />

      {comment?.children_deep_count && comment.children_deep_count > 0
        ? comment.children?.map((child) => (
            <Comment key={child.id} comment={child} opUsername={opUsername} />
          ))
        : null}
    </article>
  )
}
