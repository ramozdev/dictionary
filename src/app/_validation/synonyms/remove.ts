import { z } from "zod";

const removeSynonymsSchema = z
  .string()
  .min(1)
  .refine((id) => !id || !isNaN(parseFloat(id)), {
    message: "id must be a number.",
  })
  .transform((id) => Number(id))
  .array();

export { removeSynonymsSchema };

type RemoveSynonymsInput = z.input<typeof removeSynonymsSchema>;

export type { RemoveSynonymsInput };
