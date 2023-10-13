"use server";

import { createAbbreviations } from "@/app/_action/abbreviations";
import { createAntonyms } from "@/app/_action/antonyms";
import { createDefinitions } from "@/app/_action/definitions";
// import { createExamples } from "@/app/_action/examples";
import { createSpellings } from "@/app/_action/spellings";
import { createSynonyms } from "@/app/_action/synonyms";
import { createTags } from "@/app/_action/tags";
import { createSlang } from "@/app/new/_action/slang";
import { createSlangSchema } from "@/app/new/validation";

export async function handleForm(formData: unknown) {
  const {
    slang,
    abbreviations,
    antonyms,
    definitions,
    // examples,
    spellings,
    synonyms,
    tags,
  } = createSlangSchema.parse(formData);

  const slangId = await createSlang(slang);
  await createDefinitions(definitions.map((item) => ({ ...item, slangId })));
  await createAntonyms(antonyms.map((item) => ({ ...item, slangId })));
  await createAbbreviations(
    abbreviations.map((item) => ({ ...item, slangId })),
  );
  // await createExamples(examples.map((item) => ({ ...item, slangId })));
  await createSpellings(spellings.map((item) => ({ ...item, slangId })));
  await createSynonyms(synonyms.map((item) => ({ ...item, slangId })));
  await createTags(tags.map((item) => ({ ...item, slangId })));
}
