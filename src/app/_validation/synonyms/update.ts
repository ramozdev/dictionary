import { z } from "zod";

const updateSynonymsSchema = z
  .object({
    synonym: z.string(),
  })
  .partial()
  .extend({
    synonymId: z
      .string()
      .min(1)
      .refine((id) => !id || !isNaN(parseFloat(id)), {
        message: "id must be a number.",
      })
      .transform((id) => Number(id)),
  })
  .array();

export { updateSynonymsSchema };

type UpdateSynonymsInput = z.input<typeof updateSynonymsSchema>;

export type { UpdateSynonymsInput };
