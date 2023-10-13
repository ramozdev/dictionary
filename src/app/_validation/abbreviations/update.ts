import { z } from "zod";

const updateAbbreviationsSchema = z
  .object({
    abbreviation: z.string(),
  })
  .partial()
  .extend({
    abbreviationId: z
      .string()
      .min(1)
      .refine((id) => !id || !isNaN(parseFloat(id)), {
        message: "id must be a number.",
      })
      .transform((id) => Number(id)),
  })
  .array();

export { updateAbbreviationsSchema };

type UpdateAbbreviationsInput = z.input<typeof updateAbbreviationsSchema>;

export type { UpdateAbbreviationsInput };
