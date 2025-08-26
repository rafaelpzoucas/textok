import { Feed } from '../components/feed'
import { FullContent } from '../components/full-content'

export default function FeedPage() {
  return (
    <div className="flex flex-row w-screen h-screen snap-x snap-mandatory overflow-x-scroll">
      <Feed />
      <FullContent />
    </div>
  )
}
