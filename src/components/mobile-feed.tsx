'use client'

import { User } from '@/features/users/schemas'
import { useIsMobile } from '@/hooks/use-mobile'
import { useRef } from 'react'
import { Feed } from './feed'
import { FullContent } from './full-content'

export function MobileFeed({ user }: { user: User | null }) {
  const isMobile = useIsMobile()
  const containerRef = useRef<HTMLDivElement | null>(null)

  if (!isMobile) return null

  return (
    <div
      ref={containerRef}
      className="flex flex-row w-screen h-screen snap-x snap-mandatory overflow-x-scroll"
    >
      <Feed />
      <FullContent user={user} />
    </div>
  )
}
