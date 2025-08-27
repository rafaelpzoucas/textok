'use client'

import { CommentType } from '@/features/comments/schemas'
import { ContentType } from '@/features/contents/schemas'
import { User } from '@/features/users/schemas'
import { ChevronDown, ChevronUp, Reply, Share } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from './ui/button'

export function ContentActions({
  content,
  user,
}: {
  content?: ContentType | CommentType
  user: User | null
}) {
  const router = useRouter()

  function handleReply() {
    if (!user) {
      router.push('/login')
    }
  }

  function handleTransactTabcoin() {
    if (!user) {
      router.push(`/login`)
    }
  }

  return (
    <footer className="flex flex-row items-center justify-between mt-4 pb-4">
      <span className="flex flex-row bg-secondary/50 rounded-md">
        <Button variant="ghost" size="icon" onClick={handleTransactTabcoin}>
          <ChevronUp />
        </Button>
        <div className="flex items-center justify-center px-1 text-primary font-bold w-8">
          {content?.tabcoins}
        </div>
        <Button variant="ghost" size="icon" onClick={handleTransactTabcoin}>
          <ChevronDown />
        </Button>
      </span>

      <div className="flex flex-row items-center gap-2">
        <Button
          variant="secondary"
          className="bg-secondary/50"
          onClick={handleReply}
        >
          <Reply />
          <span className="hidden md:block">Responder</span>
        </Button>

        <Button variant="secondary" size="icon" className="bg-secondary/50">
          <Share />
        </Button>
      </div>
    </footer>
  )
}
