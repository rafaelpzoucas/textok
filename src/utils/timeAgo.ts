import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
} from 'date-fns'

export function formatTimeAgo(date: Date | string): string {
  const now = new Date()
  const target = typeof date === 'string' ? new Date(date) : date

  const minutes = differenceInMinutes(now, target)

  if (minutes < 1) return 'agora'
  if (minutes < 60) return `${minutes}m atrás`

  const hours = differenceInHours(now, target)
  if (hours < 24) return `${hours}h atrás`

  const days = differenceInDays(now, target)
  if (days < 30) return `${days}d atrás`

  // se quiser meses/anos também:
  const months = Math.floor(days / 30)
  if (months < 12) return `${months}mês${months > 1 ? 'es' : ''} atrás`

  const years = Math.floor(days / 365)
  return `${years}a atrás`
}
