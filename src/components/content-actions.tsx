'use client'

import { CommentType } from '@/features/comments/schemas'
import { ContentType } from '@/features/contents/schemas'
import { User } from '@/features/users/schemas'
import { ArrowDown, ArrowUp, Reply, Share } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from './ui/button'

export function ContentActions({
  content,
  user,
}: {
  content?: ContentType | CommentType
  user: User | null
}) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const username = searchParams.get('username')
  const slug = searchParams.get('slug')

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

  async function handleShare() {
    const url = `${window.location.origin}/${username}/${slug}`

    if (navigator.share) {
      try {
        await navigator.share({
          title: content?.title ?? 'Veja isso!',
          text: content?.body ?? '',
          url,
        })
      } catch (err) {
        console.error('Erro ao compartilhar:', err)
      }
    } else {
      // fallback: copia pro clipboard
      await navigator.clipboard.writeText(url)
      alert('Link copiado para a área de transferência!')
    }
  }

  return (
    <footer className="flex flex-row items-center justify-between mt-4 pb-4">
      <span className="flex flex-row bg-secondary/30 rounded-md">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleTransactTabcoin}
          disabled
        >
          <ArrowUp />
        </Button>
        <div className="flex items-center justify-center px-1 text-primary font-bold w-8">
          {content?.tabcoins}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleTransactTabcoin}
          disabled
        >
          <ArrowDown />
        </Button>
      </span>

      <div className="flex flex-row items-center gap-2">
        <Button
          variant="secondary"
          className="bg-secondary/50"
          onClick={handleReply}
          disabled
        >
          <Reply />
          <span className="hidden md:block">Responder</span>
        </Button>

        <Button
          variant="secondary"
          size="icon"
          className="bg-secondary/50"
          onClick={handleShare}
        >
          <Share />
        </Button>
      </div>
    </footer>
  )
}
