import {
  createAbbreviationsSchema,
  removeAbbreviationsSchema,
  updateAbbreviationsSchema,
} from "@/app/_validation/abbreviations";
import {
  createAntonymsSchema,
  removeAntonymsSchema,
  updateAntonymsSchema,
} from "@/app/_validation/antonyms";
import {
  createDefinitionsSchema,
  removeDefinitionsSchema,
  updateDefinitionsSchema,
} from "@/app/_validation/definitons";
import {
  createExamplesSchema,
  removeExamplesSchema,
  updateExamplesSchema,
} from "@/app/_validation/examples";
import {
  createSpellingsSchema,
  removeSpellingsSchema,
  updateSpellingsSchema,
} from "@/app/_validation/spellings";
import {
  createSynonymsSchema,
  removeSynonymsSchema,
  updateSynonymsSchema,
} from "@/app/_validation/synonyms";
import {
  createTagsSchema,
  removeTagsSchema,
  updateTagsSchema,
} from "@/app/_validation/tags";
import { updateSlangsSchema } from "@/app/_validation/slangs";
import { z } from "zod";

const handleFormSchema = z.object({
  create: z.object({
    abbreviations: createAbbreviationsSchema,
    antonyms: createAntonymsSchema,
    definitions: createDefinitionsSchema,
    examples: createExamplesSchema,
    // slangs: createSlangsSchema,
    spellings: createSpellingsSchema,
    synonyms: createSynonymsSchema,
    tags: createTagsSchema,
  }),
  update: z.object({
    abbreviations: updateAbbreviationsSchema,
    antonyms: updateAntonymsSchema,
    definitions: updateDefinitionsSchema,
    examples: updateExamplesSchema,
    slangs: updateSlangsSchema,
    spellings: updateSpellingsSchema,
    synonyms: updateSynonymsSchema,
    tags: updateTagsSchema,
  }),
  remove: z.object({
    abbreviations: removeAbbreviationsSchema,
    antonyms: removeAntonymsSchema,
    definitions: removeDefinitionsSchema,
    examples: removeExamplesSchema,
    // slangs: removeSlangsSchema,
    spellings: removeSpellingsSchema,
    synonyms: removeSynonymsSchema,
    tags: removeTagsSchema,
  }),
});

export { handleFormSchema };

type HandleFormSchema = z.input<typeof handleFormSchema>;
type HandleFormOuput = z.output<typeof handleFormSchema>;

export type { HandleFormSchema, HandleFormOuput };
