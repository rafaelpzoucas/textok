import { z } from 'zod'

export const strategyEnum = z.enum(['relevant', 'new'])

export const ContentSchema = z.object({
  id: z.string(),
  owner_id: z.string(),
  parent_id: z.string().nullable(),
  slug: z.string(),
  title: z.string(),
  body: z.string(),
  status: z.enum(['published', 'draft', 'deleted']),
  type: z.enum(['content']),
  source_url: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
  published_at: z.string(),
  deleted_at: z.string().nullable(),
  owner_username: z.string(),
  tabcoins: z.number(),
  tabcoins_credit: z.number(),
  tabcoins_debit: z.number(),
  children_deep_count: z.number(),
})

export type ContentType = z.infer<typeof ContentSchema>

// Schema para validar array de contents
export const ContentListSchema = z.array(ContentSchema)

export type ContentListType = z.infer<typeof ContentListSchema>

// Schema para criar/atualizar content (campos opcionais)
export const CreateContentSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  body: z.string().min(1, 'Corpo é obrigatório'),
  source_url: z.string().url().optional().or(z.literal('')),
})

export const UpdateContentSchema = CreateContentSchema.partial()

export type CreateContentType = z.infer<typeof CreateContentSchema>
export type UpdateContentType = z.infer<typeof UpdateContentSchema>
export type StrategyType = z.infer<typeof strategyEnum>
