import { ContentList } from '@/components/content-list'

export default async function RecentPage({
  params,
}: {
  params: Promise<{ page: string }>
}) {
  const { page } = await params

  return <ContentList page={Number(page)} strategy="relevant" />
}
