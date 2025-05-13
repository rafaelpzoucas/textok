import { Card } from '@/components/ui/card'
import { mockArticles } from '@/lib/mocks'

export function AuthorArticles({ authorId }: { authorId?: string }) {
  const authorArticles = mockArticles.filter(
    (article) => article.author_id === authorId,
  )
  return (
    <div className="flex flex-col gap-2 h-full w-full">
      <h1 className="text-xl font-bold">Artigos</h1>

      {authorArticles.map((article) => (
        <Card key={article.id} className="font-bold text-lg p-4">
          {article.title}
        </Card>
      ))}
    </div>
  )
}
