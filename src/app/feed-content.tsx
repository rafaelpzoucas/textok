'use client'

import { Content } from '@/features/contents/schemas'
import { ArrowUp } from 'lucide-react'

export function FeedContent({ content }: { content: Content }) {
  return (
    <div className="min-h-screen flex items-center justify-center border-b p-8">
      <div className="flex flex-col gap-6 max-w-3xl">
        <h1 className="text-5xl font-bold text-left break-normal hyphens-auto">
          {content.title}
        </h1>

        <p className="text-xl text-muted-foreground line-clamp-3">
          {content.body}
        </p>

        <ArrowUp className="ml-auto rotate-90 animate-bounce" />
      </div>
    </div>
  )
}
