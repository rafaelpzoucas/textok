import { CommentType } from '@/features/comments/schemas'
import { ContentType } from '@/features/contents/schemas'
import { useTransactTabcoin } from '@/features/tabcoins/hook'
import { TransactionType } from '@/features/tabcoins/schemas'
import { User } from '@/features/users/schemas'
import { ArrowDown, ArrowUp } from 'lucide-react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useReward } from 'react-rewards'
import { Button } from './ui/button'

export function TabcoinButtons({
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

  const [currentContent, setCurrentContent] = useState(content)

  const { reward: rewardCredit, isAnimating: isAnimatingCredit } = useReward(
    `reward-${content?.id}`,
    'confetti',
    {
      position: 'absolute',
      lifetime: 100,
      decay: 0.9,
      spread: 60,
      elementCount: 100,
    },
  )

  const { reward: rewardDebit, isAnimating: isAnimatingDebit } = useReward(
    `reward-${content?.id}`,
    'emoji',
    {
      position: 'absolute',
      lifetime: 100,
      angle: 90,
      startVelocity: 10,
      decay: 0.94,
      spread: 60,
      elementCount: 4,
      emoji: ['😡'],
    },
  )

  const { mutate: transactTabcoin, isPending } = useTransactTabcoin({
    onSuccess: (response) => {
      setCurrentContent((prev) => ({
        ...prev!,
        ...response.data,
      }))
    },
  })

  function handleTransactTabcoin(transactionType: TransactionType) {
    if (!user) {
      router.push(`/login?redirect=/${username}/${slug}`)
      return
    }

    if (!currentContent || !username || !slug) {
      console.error('Missing required data for transaction: ', {
        currentContent,
        username,
        slug,
      })
      return
    }

    transactTabcoin(
      { username, slug, transactionType },
      {
        onSuccess: (response) => {
          setCurrentContent((prev) => ({
            ...prev!,
            ...response.data,
          }))

          if (transactionType === 'credit') rewardCredit()
          if (transactionType === 'debit') rewardDebit()
        },
      },
    )
  }

  const isInAction = isPending || isAnimatingCredit || isAnimatingDebit

  const disableButtons = isInAction || content?.status !== 'published'

  return (
    <span className="flex flex-row bg-secondary/30 rounded-md relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => handleTransactTabcoin('credit')}
        disabled={disableButtons}
      >
        <ArrowUp />
      </Button>
      <div className="flex items-center justify-center px-1 text-primary font-bold w-8">
        {content?.tabcoins}
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => handleTransactTabcoin('debit')}
        disabled={disableButtons}
      >
        <ArrowDown />
      </Button>
      <div
        id={`reward-${content?.id}`}
        className="absolute top-1/2 left-1/2"
        aria-hidden
      ></div>
    </span>
  )
}
