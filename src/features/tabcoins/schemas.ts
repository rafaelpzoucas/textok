import z from 'zod'

export const TransactionTypeEnum = z.enum(['credit', 'debit'])

export const TransactTabcoinSchema = z.object({
  username: z.string().min(1),
  slug: z.string().min(1),
  transactionType: TransactionTypeEnum,
})

// Schema para validar resposta da API
export const TabcoinResponseSchema = z.object({
  id: z.string(),
  tabcoins: z.number(),
  tabcoins_credit: z.number(),
  tabcoins_debit: z.number(),
  owner_username: z.string(),
  slug: z.string(),
  // adicione outros campos conforme necessário
})

export type TransactTabcoinData = z.infer<typeof TransactTabcoinSchema>
export type TransactionType = z.infer<typeof TransactionTypeEnum>
