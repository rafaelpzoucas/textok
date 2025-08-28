import { FullContent } from '@/components/full-content'
import { Header } from '@/components/header'

export default function ContentPage({
  params,
}: {
  params: { username: string; slug: string }
}) {
  return (
    <div>
      <Header />

      <FullContent
        user={null}
        defaultUsername={params.username}
        defaultSlug={params.slug}
      />
    </div>
  )
}
