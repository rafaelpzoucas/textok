import { FullContent } from '@/components/full-content'
import { fetchAuthedUser } from '@/features/users/read'

export default async function ContentPage({
  params,
}: {
  params: Promise<{ username: string; slug: string }>
}) {
  const { username, slug } = await params

  const user = await fetchAuthedUser()

  return (
    <FullContent user={user} defaultUsername={username} defaultSlug={slug} />
  )
}
