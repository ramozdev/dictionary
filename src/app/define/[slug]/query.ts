import { db } from "@/server/db";
import { notFound } from "next/navigation";
import { slangParser } from "./parser";
import type { definitions as Definitions } from "@/server/db/schema";

export async function getSlang(slug: string) {
  const payload = await db.query.slangs
    .findFirst({
      where: (posts, { eq }) => eq(posts.slug, slug),
      columns: {
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
        spellings: { columns: { spelling: true } },
        definitions: {
          columns: {
            definition: true,
            pos: true,
            idiom: true,
          },
          with: {
            examples: { columns: { example: true } },
          },
        },
        abbreviations: {
          with: {
            abbreviation: { columns: { abbreviation: true } },
          },
        },
        antonyms: {
          with: {
            antonym: { columns: { antonym: true } },
          },
        },
        synonyms: {
          with: {
            synonym: { columns: { synonym: true } },
          },
        },
        tags: {
          with: {
            tag: { columns: { tag: true } },
          },
        },
      },
    })
    .then((data) => {
      if (!data) notFound();
      const {
        abbreviations,
        antonyms,
        synonyms,
        tags,
        spellings,
        definitions,
        ...item
      } = data;
      return {
        ...item,
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce#grouping_objects_by_a_property
        definitions: definitions?.reduce<
          Record<
            (typeof Definitions.pos.dataType)[number],
            {
              idiom: string | null;
              definition: string;
              examples: string[];
            }[]
          >
        >((acc, obj) => {
          const curGroup = acc[obj.pos] ?? [];

          // exclude pos and parse examples
          const parsedObj = {
            examples: obj.examples.map(({ example }) => example),
            definition: obj.definition,
            idiom: obj.idiom,
          };

          return { ...acc, [obj.pos]: [...curGroup, parsedObj] };
        }, {}),
        abbreviations: abbreviations.map(
          ({ abbreviation: { abbreviation } }) => abbreviation,
        ),
        spellings: spellings.map(({ spelling }) => spelling),
        antonyms: antonyms.map(({ antonym: { antonym } }) => antonym),
        synonyms: synonyms.map(({ synonym: { synonym } }) => synonym),
        tags: tags.map(({ tag: { tag } }) => tag),
      };
    });

  const data = slangParser.parse(payload);

  return data;
}
