import { User } from '@/components/user'
import { UserType } from '@/features/users/schemas'
import { AuthorArticles } from './author-articles'

export function Profile({ user }: { user?: UserType }) {
  return (
    <div className="flex flex-col gap-6 w-full h-full p-8">
      <User user={user} />

      <AuthorArticles authorId={user?.id} />
    </div>
  )
}
