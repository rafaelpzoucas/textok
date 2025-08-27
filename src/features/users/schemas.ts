import { z } from 'zod'

export const UserSchema = z.object({
  id: z.string().uuid(),
  username: z.string(),
  email: z.string().email(),
  description: z.string().nullable().optional(), // vazio = "", mas deixei flexível
  features: z.array(z.string()),
  notifications: z.boolean(),
  tabcash: z.number(),
  tabcoins: z.number(),
  created_at: z.string().datetime(), // ou z.coerce.date() se quiser Date
  updated_at: z.string().datetime(),
})

export type User = z.infer<typeof UserSchema>
