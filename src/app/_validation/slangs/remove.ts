import { z } from "zod";

const removeSlangsSchema = z
  .string()
  .min(1)
  .refine((id) => !id || !isNaN(parseFloat(id)), {
    message: "id must be a number.",
  })
  .transform((id) => Number(id))
  .array();

export { removeSlangsSchema };

type RemoveSlangsInput = z.input<typeof removeSlangsSchema>;

export type { RemoveSlangsInput };
