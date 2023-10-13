import { z } from "zod";

const createSlangsSchema = z
  .object({
    slang: z.string(),
    slug: z.string(),
    userId: z.string(),
  })
  .array();

export { createSlangsSchema };

type CreateSlangsInput = z.input<typeof createSlangsSchema>;

export type { CreateSlangsInput };
