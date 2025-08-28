import { FullContent } from '@/components/full-content'
import { fetchAuthedUser } from '@/features/users/read'
import { redirect } from 'next/navigation'
import { Feed } from '../components/feed'

export default async function FeedPage({
  searchParams,
}: {
  searchParams: Promise<{ username: string; slug: string }>
}) {
  const { username, slug } = await searchParams

  const user = await fetchAuthedUser()

  if (username && slug) {
    redirect(`/${username}/${slug}`)
  }

  return (
    <div className="flex flex-row w-screen h-screen snap-x snap-mandatory overflow-x-scroll">
      <Feed />

      <FullContent user={user} />
    </div>
  )
}
