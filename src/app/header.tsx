'use client'

import { useIsMobile } from '@/hooks/use-mobile'
import { BookOpen } from 'lucide-react'
import Link from 'next/link'

export function Header() {
  const isMobile = useIsMobile()

  if (isMobile) return null

  return (
    <header className="flex flex-row items-center gap-4 p-4 border-b">
      <div className="flex flex-row gap-2 items-center text-2xl">
        <BookOpen className="w-7 h-7" />
        <strong>TexTok</strong>
      </div>

      <Link href="/">Relevantes</Link>
      <Link href="/recentes/pagina/1">Recentes</Link>
    </header>
  )
}
