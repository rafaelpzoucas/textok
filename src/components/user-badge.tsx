import { Badge } from './ui/badge'

export function UserBadge({ username }: { username?: string }) {
  return (
    <Badge className="font-bold text-base px-3 py-1 bg-primary/10 text-primary">
      {username}
    </Badge>
  )
}
