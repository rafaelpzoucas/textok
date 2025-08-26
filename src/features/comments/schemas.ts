import { z } from 'zod'

export const CommentSchema = z.object({
  id: z.string(),
  body: z.string().nullable(),
  owner_username: z.string(),
  created_at: z.string().nullable(),
  updated_at: z.string().nullable(),
  source_url: z.string().nullable(),
  children_deep_count: z.number().nullable(),
  chidlren: z.array(z.any()).nullable(),
  parent_id: z.string().nullable(),
  is_deleted: z.boolean().nullable(),
  tabcoins: z.number().nullable(),
})

export type Comment = z.infer<typeof CommentSchema>
