'use client'

import { useIsMobile } from '@/hooks/use-mobile'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from './ui/button'

export function Header() {
  const router = useRouter()
  const isMobile = useIsMobile()

  if (!isMobile) {
    return null
  }

  return (
    <header className="flex flex-row items-center gap-4 p-4 px-6 sticky top-0 z-50 bg-background">
      <Button variant="secondary" onClick={() => router.push('/')}>
        <ArrowLeft />
        <span>Feed</span>
      </Button>
    </header>
  )
}
