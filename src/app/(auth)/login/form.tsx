'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { UserLoginData, UserLoginSchema } from '@/features/auth/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Turnstile } from 'next-turnstile'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export function LoginForm() {
  const [token, setToken] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const form = useForm<UserLoginData>({
    resolver: zodResolver(UserLoginSchema),
    defaultValues: { email: '', password: '' },
  })

  console.log(form.formState)

  const onSubmit = async (values: UserLoginData) => {
    if (!token) {
      setError('Por favor, confirme que não é um robô')
      return
    }

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ ...values, token }),
        headers: { 'Content-Type': 'application/json' },
      })

      if (res.ok) {
        router.push('/') // ou página pós-login
      } else {
        setError('Credenciais inválidas ou token Turnstile inválido')
      }
    } catch {
      setError('Erro de conexão. Tente novamente.')
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Digite seu email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Digite sua senha"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Turnstile
          siteKey={process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY!}
          retry="auto"
          refreshExpired="auto"
          sandbox={process.env.NODE_ENV === 'development'}
          onVerify={(token) => {
            setToken(token)
            form.setValue('turnstileToken', token)
          }}
          onError={() => setError('Falha na verificação de segurança')}
          onExpire={() => setToken(null)}
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Button type="submit" disabled={!token}>
          Entrar
        </Button>
      </form>
    </Form>
  )
}
