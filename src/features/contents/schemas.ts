import { z } from 'zod'

export const ContentSchema = z.object({
  id: z.string().uuid(),
  parent_id: z.string().uuid().nullable(),
  owner_id: z.string().uuid(),
  owner_username: z.string(),
  slug: z.string(),
  title: z.string(),
  type: z.string(),
  status: z.enum(['published', 'draft', 'deleted']),
  source_url: z.string().url().optional(),
  body: z.string(),

  tabcoins: z.number(),
  tabcoins_credit: z.number(),
  tabcoins_debit: z.number(),
  children_deep_count: z.number(),

  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  published_at: z.string().datetime().nullable(),
  deleted_at: z.string().datetime().nullable(),
})

export type Content = z.infer<typeof ContentSchema>
