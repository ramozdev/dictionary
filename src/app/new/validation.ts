import {
  abbreviationModel,
  antonymModel,
  definitionModel,
  exampleModel,
  slangModel,
  spellingModel,
  synonymModel,
  tagModel,
} from "@/validation/zod";
import { z } from "zod";

const createSlangSchema = z.object({
  slang: slangModel.pick({
    slang: true,
    explicit: true,
    augmentative: true,
    diminutive: true,
  }),
  abbreviations: abbreviationModel
    .pick({
      abbreviation: true,
    })
    .array(),
  antonyms: antonymModel
    .pick({
      antonym: true,
    })
    .array(),
  spellings: spellingModel
    .pick({
      spelling: true,
    })
    .array(),
  synonyms: synonymModel
    .pick({
      synonym: true,
    })
    .array(),
  tags: tagModel
    .pick({
      tag: true,
    })
    .array(),
  definitions: definitionModel
    .pick({
      definition: true,
      pos: true,
      idiom: true,
    })
    .array(),
  examples: exampleModel
    .pick({
      example: true,
    })
    .extend({
      definitionIndex: z.number(),
    })
    .array(),
});

export { createSlangSchema };

type CreateSlangInput = z.input<typeof createSlangSchema>;

export type { CreateSlangInput };
