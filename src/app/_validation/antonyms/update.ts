import { z } from "zod";

const updateAntonymsSchema = z
  .object({
    antonym: z.string(),
  })
  .partial()
  .extend({
    antonymId: z
      .string()
      .min(1)
      .refine((id) => !id || !isNaN(parseFloat(id)), {
        message: "id must be a number.",
      })
      .transform((id) => Number(id)),
  })
  .array();

export { updateAntonymsSchema };

type UpdateAntonymsInput = z.input<typeof updateAntonymsSchema>;

export type { UpdateAntonymsInput };
