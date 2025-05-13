'use client'

import { useGesture } from '@use-gesture/react'
import { motion, useAnimation } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'

type Props = {
  postId: string
  userId: string
  children: React.ReactNode
}

export default function CardFeed({ postId, userId, children }: Props) {
  const router = useRouter()
  const controls = useAnimation()
  const ref = useRef(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const [isLongPress, setIsLongPress] = useState(false)

  const handleLongPress = () => {
    setIsLongPress(true)
    alert('Long press: ação contextual aqui')
  }

  const bind = useGesture(
    {
      onDragStart: () => {
        timeoutRef.current = setTimeout(() => {
          handleLongPress()
        }, 600) // tempo do long press
      },
      onDragEnd: async ({ swipe: [swipeX, swipeY] }) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        if (isLongPress) {
          setIsLongPress(false)
          return
        }

        if (swipeY === -1) {
          await controls.start({ y: -window.innerHeight, opacity: 0 })
          router.push(`/post/${postId}/next`)
        } else if (swipeY === 1) {
          await controls.start({ y: window.innerHeight, opacity: 0 })
          router.push(`/post/${postId}/prev`)
        } else if (swipeX === -1) {
          router.push(`/post/${postId}/full`)
        } else if (swipeX === 1) {
          router.push(`/user/${userId}`)
        }
      },
    },
    {
      drag: {
        threshold: 15,
        axis: 'lock',
        swipe: {
          velocity: 0.2,
          distance: 50,
        },
      },
    }
  )

  return (
    <div {...bind()} ref={ref}>

    <motion.div
      animate={controls}
      initial={{ y: 0, opacity: 1 }}
      className="w-full h-screen flex items-center justify-center bg-white dark:bg-black px-4"
    >
      <motion.div
        className="max-w-md w-full rounded-2xl shadow-xl p-6 bg-zinc-100 dark:bg-zinc-900 text-black dark:text-white"
        layout
        layoutId={`card-${postId}`}
      >
        {children}
      </motion.div>
    </motion.div>
    </div>
  )
}
