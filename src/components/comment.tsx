import { CommentType } from '@/features/comments/schemas'
import { User } from '@/features/users/schemas'
import { formatTimeAgo } from '@/utils/timeAgo'
import { ContentActions } from './content-actions'
import { Markdown } from './markdown'
import { Badge } from './ui/badge'
import { UserBadge } from './user-badge'

export function Comment({
  comment,
  opUsername,
  user,
}: {
  comment: CommentType
  opUsername?: string
  user: User | null
}) {
  return (
    <article
      key={comment.id}
      className="space-y-2 border-l-2 border-dotted border-muted pl-6 py-8"
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
      <Markdown content={comment?.body || ''} />

      <ContentActions content={comment} user={user} />

      {comment?.children_deep_count && comment.children_deep_count > 0
        ? comment.children?.map((child) => (
            <Comment
              key={child.id}
              comment={child}
              opUsername={opUsername}
              user={user}
            />
          ))
        : null}
    </article>
  )
}
