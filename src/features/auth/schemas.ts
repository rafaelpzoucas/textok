import z from 'zod'

const passwordSchema = z
  .string()
  .min(6, { message: 'Senha deve ter de 8 a 72 caracteres.' })
  .max(72, { message: 'Senha deve ter de 8 a 72 caracteres.' })

const emailSchema = z.string().email({ message: 'Email inválido.' })

export const UserRegisterSchema = z.object({
  username: z.string().min(3).max(30),
  email: emailSchema,
  password: passwordSchema,
})

export const UserLoginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  turnstileToken: z.string(),
})

export type UserRegisterData = z.infer<typeof UserRegisterSchema>
export type UserLoginData = z.infer<typeof UserLoginSchema>
