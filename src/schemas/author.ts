import { z } from "zod";

export const AuthorSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  bio: z.string(),
  avatar_url: z.string(),
})