import { z } from "zod";

export const ArticleSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  summary: z.string(),
  body: z.string(),
  author_id: z.string(),
  slug: z.string(),
})
