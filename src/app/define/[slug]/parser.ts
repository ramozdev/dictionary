import { definitions } from "@/server/db/schema";
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
import { z } from "zod";

const slangParser = slangModelParser
  .pick({
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
    abbreviations: abbreviationModelParser.shape.abbreviation.array(),
    antonyms: antonymModelParser.shape.antonym.array(),
    definitions: z.record(
      z.enum(definitions.pos.enumValues),
      definitionModelParser
        .pick({
          definition: true,
          idiom: true,
        })
        .extend({
          examples: exampleModelParser.shape.example.array(),
        })
        .array(),
    ),
    spellings: spellingModelParser.shape.spelling.array(),
    synonyms: synonymModelParser.shape.synonym.array(),
    tags: tagModelParser.shape.tag.array(),
  });

type SlangParser = z.output<typeof slangParser>;

export { slangParser };

export type { SlangParser };
