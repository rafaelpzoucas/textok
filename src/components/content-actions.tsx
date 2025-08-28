'use client'

import { CommentType } from '@/features/comments/schemas'
import { ContentType } from '@/features/contents/schemas'
import { User } from '@/features/users/schemas'
import { Reply, Share } from 'lucide-react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { TabcoinButtons } from './tabcoin-buttons'
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
  const params = useParams()

  const qUsername = searchParams.get('username') as string
  const qSlug = searchParams.get('slug') as string
  const pUsername = params.username as string
  const pSlug = params.slug as string

  const username = pUsername || qUsername
  const slug = pSlug || qSlug

  function handleReply() {
    if (!user) {
      router.push('/login')
    }
  }

  async function handleShare() {
    const url = `${window.location.origin}/${username}/${slug}`

    if (navigator.share) {
      try {
        await navigator.share({
          title: content?.title ?? 'Veja isso!',
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
      <TabcoinButtons user={user} content={content} />

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
