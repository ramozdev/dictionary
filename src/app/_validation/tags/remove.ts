import { z } from "zod";

const removeTagsSchema = z
  .string()
  .min(1)
  .refine((id) => !id || !isNaN(parseFloat(id)), {
    message: "id must be a number.",
  })
  .transform((id) => Number(id))
  .array();

export { removeTagsSchema };

type RemoveTagsInput = z.input<typeof removeTagsSchema>;

export type { RemoveTagsInput };
