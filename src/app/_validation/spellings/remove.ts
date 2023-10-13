import { z } from "zod";

const removeSpellingsSchema = z
  .string()
  .min(1)
  .refine((id) => !id || !isNaN(parseFloat(id)), {
    message: "id must be a number.",
  })
  .transform((id) => Number(id))
  .array();

export { removeSpellingsSchema };

type RemoveSpellingsInput = z.input<typeof removeSpellingsSchema>;

export type { RemoveSpellingsInput };
