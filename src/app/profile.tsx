import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { AuthorSchema } from '@/schemas/author'
import { z } from 'zod'
import { AuthorArticles } from './author-articles'

export function Profile({ author }: { author?: z.infer<typeof AuthorSchema> }) {
  return (
    <div className="flex flex-col gap-6 w-full h-full p-8">
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

      <AuthorArticles authorId={author?.id} />
    </div>
  )
}
