import {
  abbreviationModelParser,
  antonymModelParser,
  definitionModelParser,
  exampleModelParser,
  slangModelParser,
  spellingModelParser,
  synonymModelParser,
  tagModelParser,
} from "@/validation/parser";
import type { z } from "zod";

const slangParser = slangModelParser
  .pick({
    id: true,
    slug: true,
    explicit: true,
    createdAt: true,
    updatedAt: true,
    slang: true,
    augmentative: true,
    diminutive: true,
    userId: true,
  })
  .extend({
    abbreviations: abbreviationModelParser
      .pick({
        abbreviation: true,
        id: true,
      })
      .array(),
    antonyms: antonymModelParser
      .pick({
        antonym: true,
        id: true,
      })
      .array(),
    definitions: definitionModelParser
      .pick({
        definition: true,
        pos: true,
        idiom: true,
        id: true,
      })
      .array(),
    examples: exampleModelParser
      .pick({
        example: true,
        id: true,
        definitionId: true,
      })
      .array(),
    spellings: spellingModelParser
      .pick({
        spelling: true,
        id: true,
      })
      .array(),
    synonyms: synonymModelParser
      .pick({
        synonym: true,
        id: true,
      })
      .array(),
    tags: tagModelParser
      .pick({
        tag: true,
        id: true,
      })
      .array(),
  });

type SlangParser = z.output<typeof slangParser>;

export { slangParser };

export type { SlangParser };
