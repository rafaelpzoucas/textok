import { Badge } from './ui/badge'

export function User({ username }: { username?: string }) {
  return <Badge className="font-bold text-accent-foreground">{username}</Badge>
}
