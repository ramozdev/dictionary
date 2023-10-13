import { z } from "zod";

const createTagsSchema = z
  .object({
    tag: z.string(),
  })
  .array();

export { createTagsSchema };

type CreateTagsInput = z.input<typeof createTagsSchema>;

export type { CreateTagsInput };
