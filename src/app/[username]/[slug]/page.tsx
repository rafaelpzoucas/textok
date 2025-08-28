import { FullContent } from '@/components/full-content'
import { Header } from '@/components/header'

export default async function ContentPage({
  params,
}: {
  params: Promise<{ username: string; slug: string }>
}) {
  const { username, slug } = await params

  return (
    <div>
      <Header />

      <FullContent user={null} defaultUsername={username} defaultSlug={slug} />
    </div>
  )
}
