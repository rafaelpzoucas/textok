// app/api/auth/login/route.ts
import { UserLoginSchema } from '@/features/auth/schemas'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Valida os dados com Zod
    const validation = UserLoginSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        {
          name: 'ValidationError',
          message: 'Dados inválidos',
          action: 'Verifique os dados informados',
        },
        { status: 400 },
      )
    }

    const { email, password, turnstileToken } = validation.data

    const cfRes = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `secret=${encodeURIComponent(process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY!)}&response=${encodeURIComponent(turnstileToken)}`,
      },
    )

    const cfData = await cfRes.json()

    if (!cfData.success) {
      return NextResponse.json(
        {
          name: 'CaptchaError',
          message: 'Verificação de segurança falhou',
          action: 'Tente novamente',
        },
        { status: 400 },
      )
    }

    // Faz a requisição para o TabNews com headers otimizados
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_TABNEWS_API_BASE_URL}/api/v1/sessions`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'User-Agent': 'Mozilla/5.0 (compatible; NextJS-App/1.0)',
          // Forward alguns headers do cliente original
          ...(request.headers.get('x-forwarded-for') && {
            'X-Forwarded-For': request.headers.get('x-forwarded-for')!,
          }),
          ...(request.headers.get('user-agent') && {
            'X-Original-User-Agent': request.headers.get('user-agent')!,
          }),
        },
        body: JSON.stringify({ email, password }),
      },
    )

    const responseText = await response.text()

    // Verifica se é uma página HTML do Cloudflare
    if (
      responseText.includes('<!DOCTYPE html>') ||
      responseText.includes('<html')
    ) {
      console.error('Cloudflare challenge detected in login route')
      return NextResponse.json(
        {
          name: 'ServiceUnavailableError',
          message: 'Serviço temporariamente indisponível',
          action: 'Tente novamente em alguns minutos',
        },
        { status: 503 },
      )
    }

    if (!response.ok) {
      try {
        const errorData = JSON.parse(responseText)
        return NextResponse.json(errorData, { status: response.status })
      } catch {
        return NextResponse.json(
          {
            name: 'UnknownError',
            message: 'Erro interno do servidor',
            action: 'Tente novamente',
          },
          { status: response.status },
        )
      }
    }

    const sessionData = JSON.parse(responseText) as {
      id: string
      token: string
      expires_at: string
      created_at: string
      updated_at: string
    }

    // Define o cookie de sessão
    const cookiesStore = await cookies()
    cookiesStore.set('session_id', sessionData.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: new Date(sessionData.expires_at),
      path: '/',
    })

    // Retorna apenas os dados necessários (sem expor o token)
    return NextResponse.json({
      id: sessionData.id,
      expires_at: sessionData.expires_at,
      created_at: sessionData.created_at,
      updated_at: sessionData.updated_at,
    })
  } catch (error) {
    console.error('Login route error:', error)

    return NextResponse.json(
      {
        name: 'InternalServerError',
        message: 'Erro interno do servidor',
        action: 'Tente novamente mais tarde',
      },
      { status: 500 },
    )
  }
}
