import { z } from "zod";

const updateSpellingsSchema = z
  .object({
    spelling: z.string(),
  })
  .partial()
  .extend({
    spellingId: z
      .string()
      .min(1)
      .refine((id) => !id || !isNaN(parseFloat(id)), {
        message: "id must be a number.",
      })
      .transform((id) => Number(id)),
  })
  .array();

export { updateSpellingsSchema };

type UpdateSpellingsInput = z.input<typeof updateSpellingsSchema>;

export type { UpdateSpellingsInput };
