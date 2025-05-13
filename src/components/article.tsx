import { ArticleSchema } from '@/schemas/article'
import { z } from 'zod'

type Props = {
  article: z.infer<typeof ArticleSchema>
}

export default function Article({ article }: Props) {

  return (
    <div className="flex flex-col gap-6 items-center justify-center">
      <h1 className="text-6xl font-bold text-left break-normal hyphens-auto">
        {article.title}
      </h1>

      <p className='text-xl text-muted-foreground'>{article.summary}</p>
    </div>
  )
}
