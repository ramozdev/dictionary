"use server";

import {
  createAbbreviations,
  removeAbbreviations,
  updateAbbreviations,
} from "@/app/_action/abbreviations";
import {
  createAntonyms,
  removeAntonyms,
  updateAntonyms,
} from "@/app/_action/antonyms";
import {
  createDefinitions,
  removeDefinitions,
  updateDefinitions,
} from "@/app/_action/definitions";
import {
  createExamples,
  removeExamples,
  updateExamples,
} from "@/app/_action/examples";
import { updateSlangs } from "@/app/_action/slang";
import {
  createSpellings,
  removeSpellings,
  updateSpellings,
} from "@/app/_action/spellings";
import {
  createSynonyms,
  removeSynonyms,
  updateSynonyms,
} from "@/app/_action/synonyms";
import { createTags, removeTags, updateTags } from "@/app/_action/tags";
import { handleFormSchema } from "@/app/_validation/handleForm";

export async function handleForm(formData: unknown) {
  const { create, remove, update } = handleFormSchema.parse(formData);

  await removeAbbreviations(remove.abbreviations);
  await updateAbbreviations(update.abbreviations);
  await createAbbreviations(create.abbreviations);

  await removeAntonyms(remove.antonyms);
  await updateAntonyms(update.antonyms);
  await createAntonyms(create.antonyms);

  await removeDefinitions(remove.definitions);
  await updateDefinitions(update.definitions);
  await createDefinitions(create.definitions);

  await removeExamples(remove.examples);
  await updateExamples(update.examples);
  await createExamples(create.examples);

  // await removeSlangs(remove.slangs);
  await updateSlangs(update.slangs);
  // await createSlangs(create.slangs);

  await removeSpellings(remove.spellings);
  await updateSpellings(update.spellings);
  await createSpellings(create.spellings);

  await removeSynonyms(remove.synonyms);
  await updateSynonyms(update.synonyms);
  await createSynonyms(create.synonyms);

  await removeTags(remove.tags);
  await updateTags(update.tags);
  await createTags(create.tags);
}
