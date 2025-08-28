import { FullContent } from '@/components/full-content'
import { redirect } from 'next/navigation'
import { Feed } from '../components/feed'

export default async function FeedPage({
  searchParams,
}: {
  searchParams: Promise<{ page: string; username: string; slug: string }>
}) {
  const { page, username, slug } = await searchParams

  // const user = await fetchAuthedUser()

  if (page === 'content') {
    redirect(`/${username}/${slug}`)
  }

  return (
    <div className="flex flex-row w-screen h-screen snap-x snap-mandatory overflow-x-scroll">
      <Feed />

      <FullContent user={null} />
    </div>
  )
}
