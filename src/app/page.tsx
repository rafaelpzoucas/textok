import { FullContent } from '@/components/full-content'
import { Strategy } from '@/components/strategy'
import { Feed } from '../components/feed'

export default async function FeedPage() {
  // const user = await fetchAuthedUser()

  return (
    <div className="flex flex-row w-screen h-screen snap-x snap-mandatory overflow-x-scroll">
      <Feed />
      <FullContent user={null} />
      <Strategy />
    </div>
  )
}
