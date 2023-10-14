import { z } from "zod";

const createSlangSchema = z.object({
  slang: z.object({
    slang: z.string().min(1),
    explicit: z.boolean(),
    userId: z.string(),
    augmentative: z.string(),
    diminutive: z.string(),
  }),
  abbreviations: z
    .object({
      abbreviation: z.string().min(1),
    })
    .array(),
  antonyms: z
    .object({
      antonym: z.string().min(1),
    })
    .array(),
  spellings: z
    .object({
      spelling: z.string().min(1),
    })
    .array(),
  synonyms: z
    .object({
      synonym: z.string().min(1),
    })
    .array(),
  tags: z
    .object({
      tag: z.string().min(1),
    })
    .array(),
  definitions: z
    .object({
      definition: z.string().min(1),
      pos: z.string().min(1),
      idiom: z.string().min(1),
    })
    .array(),
  examples: z
    .object({
      example: z.string().min(1),
    })
    .array(),
});

export { createSlangSchema };

type CreateSlangInput = z.input<typeof createSlangSchema>;

export type { CreateSlangInput };
