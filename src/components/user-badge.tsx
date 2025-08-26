import { cn } from '@/lib/utils'
import { Badge } from './ui/badge'

export function UserBadge({
  username,
  size = 'md',
}: {
  username?: string
  size?: 'sm' | 'md' | 'lg'
}) {
  return (
    <Badge
      className={cn(
        'font-bold text-base bg-primary/10 text-primary',
        size === 'sm' && 'text-sm',
        size === 'md' && 'text-base px-3 py-1',
        size === 'lg' && 'text-lg px-5 py-2',
      )}
    >
      {username}
    </Badge>
  )
}
