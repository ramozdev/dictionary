import { z } from "zod";

const ucrItemSchema = z.object({
  value: z.string(),
  action: z.enum(["", "CREATE", "UPDATE", "REMOVE", "ID"]),
});

const ucrSlangSchema = z.object({
  slang: z.object({
    slangId: ucrItemSchema,
    explicit: ucrItemSchema.pick({ action: true }).extend({
      value: z.boolean(),
    }),
    slang: ucrItemSchema,
    augmentative: ucrItemSchema,
    diminutive: ucrItemSchema,
  }),
  abbreviations: z
    .object({
      abbreviationId: ucrItemSchema,
      abbreviation: ucrItemSchema,
    })
    .array(),
  antonyms: z
    .object({
      antonymId: ucrItemSchema,
      antonym: ucrItemSchema,
    })
    .array(),
  spellings: z
    .object({
      spellingId: ucrItemSchema,
      spelling: ucrItemSchema,
    })
    .array(),
  synonyms: z
    .object({
      synonymId: ucrItemSchema,
      synonym: ucrItemSchema,
    })
    .array(),
  tags: z
    .object({
      tagId: ucrItemSchema,
      tag: ucrItemSchema,
    })
    .array(),
  definitions: z
    .object({
      definitionId: ucrItemSchema,
      definition: ucrItemSchema,
      pos: ucrItemSchema,
      idiom: ucrItemSchema,
    })
    .array(),
  examples: z
    .object({
      exampleId: ucrItemSchema,
      example: ucrItemSchema,
      definitionId: ucrItemSchema,
    })
    .array(),
});

export { ucrSlangSchema };

type UcrSlangInput = z.input<typeof ucrSlangSchema>;

export type { UcrSlangInput };
