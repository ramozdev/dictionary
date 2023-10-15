import { db } from "@/server/db";
import { notFound } from "next/navigation";
import { slangParser } from "./parser";

export async function getSlang(slug: string) {
  const payload = await db.query.slangs
    .findFirst({
      where: (posts, { eq }) => eq(posts.slug, slug),
      columns: {
        id: true,
        slug: true,
        explicit: true,
        createdAt: true,
        updatedAt: true,
        slang: true,
        augmentative: true,
        diminutive: true,
        userId: true,
      },
      with: {
        spellings: { columns: { spelling: true, id: true } },
        definitions: {
          columns: {
            definition: true,
            pos: true,
            idiom: true,
            id: true,
          },
          with: {
            examples: {
              columns: { example: true, id: true, definitionId: true },
            },
          },
        },
        abbreviations: {
          with: {
            abbreviation: { columns: { abbreviation: true, id: true } },
          },
        },
        antonyms: {
          with: {
            antonym: { columns: { antonym: true, id: true } },
          },
        },
        synonyms: {
          with: {
            synonym: { columns: { synonym: true, id: true } },
          },
        },
        tags: {
          with: {
            tag: { columns: { tag: true, id: true } },
          },
        },
      },
    })
    .then((data) => {
      if (!data) notFound();
      return {
        ...data,
        examples: data.definitions.flatMap(({ examples }) => examples),
        definitions: data.definitions.map(({ definition, pos, idiom, id }) => ({
          definition,
          pos,
          idiom,
          id,
        })),
        spellings: data.spellings.map(({ spelling }) => spelling),
        abbreviations: data.abbreviations.map(
          ({ abbreviation }) => abbreviation,
        ),
        antonyms: data.antonyms.map(({ antonym }) => antonym),
        synonyms: data.synonyms.map(({ synonym }) => synonym),
        tags: data.tags.map(({ tag }) => tag),
      };
    });

  const data = slangParser.parse(payload);

  return data;
}
