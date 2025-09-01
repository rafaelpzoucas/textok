import { redirect } from 'next/navigation'

export default async function RecentPage({
  params,
}: {
  params: Promise<{ page: number }>
}) {
  const { page } = await params

  if (!page) {
    redirect('/recentes/pagina/1')
  }

  return null
}
