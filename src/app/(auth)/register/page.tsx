import { fetchAuthedUser } from '@/features/users/read'
import { redirect } from 'next/navigation'
import { RegisterForm } from './form'

export default async function RegisterPage() {
  const user = await fetchAuthedUser().catch(() => null)

  if (user) {
    redirect('/')
  }

  return (
    <div>
      <h1>Cadastro</h1>

      <RegisterForm />
    </div>
  )
}
