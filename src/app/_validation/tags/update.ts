import { z } from "zod";

const updateTagsSchema = z
  .object({
    tag: z.string(),
  })
  .partial()
  .extend({
    tagId: z
      .string()
      .min(1)
      .refine((id) => !id || !isNaN(parseFloat(id)), {
        message: "id must be a number.",
      })
      .transform((id) => Number(id)),
  })
  .array();

export { updateTagsSchema };

type UpdateTagsInput = z.input<typeof updateTagsSchema>;

export type { UpdateTagsInput };
