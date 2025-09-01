import { ContentList } from '@/components/content-list'
import { MobileFeed } from '@/components/mobile-feed'
import { redirect } from 'next/navigation'

export default async function FeedPage({
  searchParams,
}: {
  searchParams: Promise<{ username: string; slug: string }>
}) {
  const { username, slug } = await searchParams

  const user = null

  if (username && slug) {
    redirect(`/${username}/${slug}`)
  }

  return (
    <>
      <ContentList strategy="relevant" />
      <MobileFeed user={user} />
    </>
  )
}
