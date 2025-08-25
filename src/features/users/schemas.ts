import { z } from 'zod'

export const userSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(100),
  username: z.string(),
  bio: z.string().max(255).optional(),
})

export type UserType = z.infer<typeof userSchema>
