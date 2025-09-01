'use client'

import { User } from '@/features/users/schemas'
import { useIsMobile } from '@/hooks/use-mobile'
import { Feed } from './feed'
import { FullContent } from './full-content'

export function MobileFeed({ user }: { user: User | null }) {
  const isMobile = useIsMobile()

  if (!isMobile) return null

  return (
    <div className="flex flex-row w-screen h-screen snap-x snap-mandatory overflow-x-scroll">
      <Feed />

      <FullContent user={user} />
    </div>
  )
}
