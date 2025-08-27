import { fetchAuthedUser } from '@/features/users/read'
import { redirect } from 'next/navigation'
import { LoginForm } from './form'

export default async function LoginPage() {
  const user = await fetchAuthedUser().catch(() => null)

  if (user) {
    redirect('/')
  }

  return (
    <div className="flex min-h-screen flex-col items-start justify-center gap-8 p-8 w-full">
      <div className="flex flex-col gap-8 max-w-md w-full mx-auto">
        <h1 className="text-4xl font-bold">Login</h1>

        <LoginForm />
      </div>
    </div>
  )
}
