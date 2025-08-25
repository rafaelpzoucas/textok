import Image from 'next/image'

export default function Loading() {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <Image
        src="/globe.svg"
        alt=""
        width={250}
        height={250}
        className="animate-bounce"
      />
    </div>
  )
}
