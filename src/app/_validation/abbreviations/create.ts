import { z } from "zod";

const createAbbreviationsSchema = z
  .object({
    abbreviation: z.string(),
  })
  .array();

export { createAbbreviationsSchema };

type CreateAbbreviationsInput = z.input<typeof createAbbreviationsSchema>;

export type { CreateAbbreviationsInput };
