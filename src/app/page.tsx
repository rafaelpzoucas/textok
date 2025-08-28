import { FullContent } from '@/components/full-content'
import { Feed } from '../components/feed'

export default async function FeedPage() {
  // const user = await fetchAuthedUser()

  return (
    <div className="flex flex-row w-screen h-screen snap-x snap-mandatory overflow-x-scroll">
      <Feed />

      <FullContent user={null} />
    </div>
  )
}
