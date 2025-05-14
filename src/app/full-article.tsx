import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { mockAuthors } from '@/lib/mocks'
import { ArticleSchema } from '@/schemas/article'
import { z } from 'zod'

export function FullArticle({
  article,
}: {
  article?: z.infer<typeof ArticleSchema>
}) {
  const author = mockAuthors.find((author) => author.id === article?.author_id)

  return (
    <ScrollArea className="h-screen w-full rounded-md border">
      <div className="p-8 space-y-6">
        <h1 className="text-4xl font-bold">{article?.title}</h1>

        <p className="text-2xl text-muted-foreground">{article?.body}</p>

        <footer className="border-t py-4">
          <div className="flex flex-col gap-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>{author?.name[0]}</AvatarFallback>
            </Avatar>

            <div className="flex flex-col">
              <p className="text-xl font-bold">{author?.name}</p>
              <span className="text-muted-foreground">{author?.bio}</span>
            </div>
          </div>
        </footer>
      </div>
    </ScrollArea>
  )
}
