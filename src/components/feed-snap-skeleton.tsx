import { Skeleton } from '@/components/ui/skeleton'
import { forwardRef } from 'react'

export const FeedSnapSkeleton = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <section
      ref={ref}
      className="h-screen snap-start flex flex-col justify-center gap-12 border-b"
    >
      {/* UserBadge skeleton */}
      <div className="flex items-center gap-2">
        <Skeleton className="h-8 w-32" />
      </div>

      {/* Title skeleton */}
      <div className="space-y-3">
        <Skeleton className="h-10 w-3/5" />
        <Skeleton className="h-10 w-4/5" />
        <Skeleton className="h-10 w-3/5" />
        <Skeleton className="h-10 w-full" />
      </div>

      {/* Footer skeleton */}
      <footer className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-12" />
        </div>
      </footer>
    </section>
  )
})

FeedSnapSkeleton.displayName = 'FeedSnapSkeleton'
