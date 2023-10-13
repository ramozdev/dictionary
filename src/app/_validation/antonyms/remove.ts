import { z } from "zod";

const removeAntonymsSchema = z
  .string()
  .min(1)
  .refine((id) => !id || !isNaN(parseFloat(id)), {
    message: "id must be a number.",
  })
  .transform((id) => Number(id))
  .array();

export { removeAntonymsSchema };

type RemoveAntonymsInput = z.input<typeof removeAntonymsSchema>;

export type { RemoveAntonymsInput };
