import { fetchAuthedUser } from '@/features/users/read'
import { User } from '@/features/users/schemas'
import { Feed } from '../components/feed'
import { FullContent } from '../components/full-content'

export default async function FeedPage() {
  const user = await fetchAuthedUser()

  return (
    <div className="flex flex-row w-screen h-screen snap-x snap-mandatory overflow-x-scroll">
      <Feed />
      <FullContent user={(user as User) ?? null} />
    </div>
  )
}
