import { z } from "zod";

const createSlangSchema = z.object({
  slang: z.object({
    slang: z.string().min(1),
    slug: z.string().min(1),
    userId: z.string(),
  }),
});

export { createSlangSchema };

type CreateSlangInput = z.input<typeof createSlangSchema>;

export type { CreateSlangInput };
