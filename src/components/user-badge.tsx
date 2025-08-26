import { Badge } from './ui/badge'

export function UserBadge({ username }: { username?: string }) {
  return (
    <Badge className="font-bold text-accent-foreground text-base px-3 py-1">
      {username}
    </Badge>
  )
}
