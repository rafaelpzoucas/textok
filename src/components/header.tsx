'use client'

import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from './ui/button'

export function Header() {
  const router = useRouter()

  return (
    <header className="flex flex-row items-center gap-4 p-4 px-6">
      <Button variant="secondary" onClick={() => router.push('/')}>
        <ArrowLeft />
        <span>Feed</span>
      </Button>
    </header>
  )
}
