import { z } from "zod";

const removeAbbreviationsSchema = z
  .string()
  .min(1)
  .refine((id) => !id || !isNaN(parseFloat(id)), {
    message: "id must be a number.",
  })
  .transform((id) => Number(id))
  .array();

export { removeAbbreviationsSchema };

type RemoveAbbreviationsInput = z.input<typeof removeAbbreviationsSchema>;

export type { RemoveAbbreviationsInput };
