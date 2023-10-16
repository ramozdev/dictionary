import Link from "next/link";
import { Card } from "@/ui/html/card";
import slugify from "sluga";
import { type SlangParser } from "@/app/define/[slug]/parser";

type Props = {
  slang: SlangParser;
};

export function DefinitionCard({
  slang: {
    synonyms,
    antonyms,
    spellings,
    abbreviations,
    definitions,
    slang,
    tags,
    explicit,
    updatedAt,
    augmentative,
    diminutive,
  },
}: Props) {
  const updatedAtString = new Date(updatedAt).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <Card className="mx-auto mb-6 max-w-lg">
      {/* SLANG */}
      <header className="mb-3">
        <div className="mb-2 flex items-center">
          <h1 className="text-xl font-semibold">{slang}</h1>
          {explicit && (
            <div className="ml-2 grid h-5 w-5 place-content-center rounded-sm ring-1 ring-red-500">
              <div>E</div>
            </div>
          )}
        </div>

        {/* SPELLINGS */}
        {spellings && spellings.length > 0 && (
          <ul className="flex gap-x-2">
            {spellings.map((spelling) => (
              <li key={spelling}>{spelling}</li>
            ))}
          </ul>
        )}

        {/* ABBREVIATIONS */}
        {abbreviations && abbreviations.length > 0 && (
          <div className="flex gap-x-2">
            <div>Abbreviations:</div>
            <ul className="flex gap-x-2">
              {abbreviations.map((abbreviation) => (
                <li key={abbreviation}>{abbreviation}</li>
              ))}
            </ul>
          </div>
        )}
      </header>
      <section>
        {Object.entries(definitions).map(([key, definitions]) => (
          <div key={key} className="mb-6">
            <div className="mb-2 font-semibold capitalize">{key}</div>
            <ol className="list-decimal">
              {key === "idiom" ? (
                <>
                  {definitions?.map(({ definition, examples, idiom }) => (
                    <li key={idiom} className="mb-4 ml-10">
                      <p className="mb-2">
                        <strong>{idiom}: </strong>
                        {/* DEFINITION */}
                        {definition}
                      </p>

                      {examples.map((example, index) => (
                        <p key={`${example}-${index}`} className="mb-2 italic">
                          {/* EXAMPLE */}
                          {example}
                        </p>
                      ))}
                    </li>
                  ))}
                </>
              ) : (
                <>
                  {definitions.map(({ definition, examples }) => (
                    <li key={definition} className="mb-4 ml-10">
                      <p className="mb-2">
                        {/* DEFINITION */}
                        {definition}
                      </p>
                      {examples.map((example, index) => (
                        <p key={`${example}${index}`} className="mb-2 italic">
                          {/* EXAMPLE */}
                          {example}
                        </p>
                      ))}
                    </li>
                  ))}
                </>
              )}
            </ol>
          </div>
        ))}
      </section>

      {/* SYNONYMS */}
      {synonyms && synonyms.length > 0 && (
        <section className="mb-4">
          <div>Sinónimos</div>

          <div className="flex gap-x-2">
            {synonyms.map((synonym) => (
              <Link key={synonym} href={`/${slugify(synonym)}`} className="">
                {synonym}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ANTONYMS */}
      {antonyms && antonyms.length > 0 && (
        <section className="mb-4">
          <div>Antónimos</div>

          <div className="flex gap-x-2">
            {antonyms.map((antonym) => (
              <Link key={antonym} href={`/${slugify(antonym)}`} className="">
                {antonym}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* SUFFIX */}
      <div className="mb-4">
        {augmentative && <div>Aumentativo: {augmentative}</div>}
        {diminutive && <div>Diminutivo: {diminutive}</div>}
      </div>

      {/* TAGS */}
      {tags && tags.length > 0 && (
        <section className="">
          <ul>
            {tags.map((tag) => (
              <li key={tag}>#{tag}</li>
            ))}
          </ul>
        </section>
      )}
      <time dateTime={updatedAt} className="flex justify-end text-sm">
        Última edición: {updatedAtString}
      </time>
    </Card>
  );
}
