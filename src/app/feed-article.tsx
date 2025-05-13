'use client'

import Article from '@/components/article'
import { ArticleSchema } from '@/schemas/article'
import { z } from 'zod'

export function FeedArticle({
  article,
}: {
  article: z.infer<typeof ArticleSchema>
}) {
  return (
    <div className="min-h-screen flex items-center justify-center border-b">
      <Article article={article} />
    </div>
  )
}
