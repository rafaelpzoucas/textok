import { z } from 'zod'

// Interface do tipo Comment para suporte à recursividade
export interface CommentType {
  id: string
  owner_id: string
  parent_id: string
  slug: string
  title: string | null
  body: string
  status: 'published' | 'draft' | 'deleted'
  type: 'content'
  source_url: string | null
  created_at: string
  updated_at: string
  published_at: string
  deleted_at: string | null
  owner_username: string
  tabcoins: number
  tabcoins_credit: number
  tabcoins_debit: number
  children_deep_count: number
  children: CommentType[]
}

// Schema recursivo para Comment
export const CommentSchema: z.ZodType<CommentType> = z.lazy(() =>
  z.object({
    id: z.string(),
    owner_id: z.string(),
    parent_id: z.string(),
    slug: z.string(),
    title: z.string().nullable(),
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
    children: z.array(CommentSchema), // Recursividade aqui
  }),
)

// Schema para validar array de comments
export const CommentListSchema = z.array(CommentSchema)

export type CommentListType = z.infer<typeof CommentListSchema>

// Schema para criar comment (campos obrigatórios apenas)
export const CreateCommentSchema = z.object({
  parent_id: z.string().min(1, 'Parent ID é obrigatório'),
  body: z.string().min(1, 'Corpo do comentário é obrigatório'),
  source_url: z.string().url().optional().or(z.literal('')),
})

export const UpdateCommentSchema = z.object({
  body: z.string().min(1, 'Corpo do comentário é obrigatório'),
  source_url: z.string().url().optional().or(z.literal('')),
})

export type CreateCommentType = z.infer<typeof CreateCommentSchema>
export type UpdateCommentType = z.infer<typeof UpdateCommentSchema>
