import { z } from "zod";

const updateSlangsSchema = z
  .object({
    slang: z.string(),
  })
  .partial()
  .extend({
    slangId: z
      .string()
      .min(1)
      .refine((id) => !id || !isNaN(parseFloat(id)), {
        message: "id must be a number.",
      })
      .transform((id) => Number(id)),
  })
  .array();

export { updateSlangsSchema };

type UpdateSlangsInput = z.input<typeof updateSlangsSchema>;

export type { UpdateSlangsInput };
