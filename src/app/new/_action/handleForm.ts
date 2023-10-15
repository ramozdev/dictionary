"use server";

import { createAbbreviations } from "@/app/_action/abbreviations";
import { createAntonyms } from "@/app/_action/antonyms";
import { createDefinitions } from "@/app/_action/definitions";
import { createExamples } from "@/app/_action/examples";
import { createSpellings } from "@/app/_action/spellings";
import { createSynonyms } from "@/app/_action/synonyms";
import { createTags } from "@/app/_action/tags";
import { createSlang } from "@/app/new/_action/slang";
import { createSlangSchema } from "@/app/new/validation";
import { getCurrentUser } from "@/lib/session";
import slugify from "sluga";

export async function handleForm(formData: unknown) {
  const authUser = await getCurrentUser();

  if (!authUser) throw new Error("Unauthorized");

  const {
    slang,
    abbreviations,
    antonyms,
    definitions,
    examples,
    spellings,
    synonyms,
    tags,
  } = createSlangSchema.parse(formData);

  const slangId = await createSlang({
    ...slang,
    userId: authUser.id,
    slug: slugify(slang.slang),
  });

  const definitionsWithExamples = definitions.map((definition, index) => ({
    ...definition,
    examples: examples.filter(
      ({ definitionIndex }) => definitionIndex === index,
    ),
  }));

  await Promise.all(
    definitionsWithExamples.map(async ({ examples, ...definition }) => {
      const definitionId = await createDefinitions([
        { ...definition, slangId },
      ]);
      if (definitionId) {
        await createExamples(
          examples.map((item) => ({ ...item, definitionId })),
        );
      }
    }),
  );

  await createAntonyms(antonyms.map((item) => ({ ...item, slangId })));
  await createAbbreviations(
    abbreviations.map((item) => ({ ...item, slangId })),
  );
  await createSpellings(spellings.map((item) => ({ ...item, slangId })));
  await createSynonyms(synonyms.map((item) => ({ ...item, slangId })));
  await createTags(tags.map((item) => ({ ...item, slangId })));
}
