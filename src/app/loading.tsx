import { BookOpen } from 'lucide-react'

export default function Loading() {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <BookOpen className="animate-bounce w-[100px] h-[100px]" />
    </div>
  )
}
