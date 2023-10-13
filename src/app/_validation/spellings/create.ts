import { z } from "zod";

const createSpellingsSchema = z
  .object({
    spelling: z.string(),
    slangId: z.number(),
  })
  .array();

export { createSpellingsSchema };

type CreateSpellingsInput = z.input<typeof createSpellingsSchema>;

export type { CreateSpellingsInput };
