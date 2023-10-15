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
            examples: { columns: { example: true, id: true } },
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
      const { abbreviations, antonyms, synonyms, tags, ...item } = data;
      return {
        ...item,
        abbreviations: abbreviations.map(({ abbreviation }) => abbreviation),
        antonyms: antonyms.map(({ antonym }) => antonym),
        synonyms: synonyms.map(({ synonym }) => synonym),
        tags: tags.map(({ tag }) => tag),
      };
    });

  const data = slangParser.parse(payload);

  return data;
}
