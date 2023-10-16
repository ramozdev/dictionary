"use client";

import { type UcrSlangInput, ucrSlangSchema } from "@/app/validation";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition } from "react";
import { getUCR } from "ucr";
import { handleForm } from "@/app/_action/handleForm";
import { type SlangParser } from "./parser";

type Props = {
  defaultData?: SlangParser;
};

export default function Form({ defaultData }: Props) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { defaultValues },
  } = useForm<UcrSlangInput>({
    defaultValues: {
      definitions: defaultData?.definitions.map(
        ({ definition, id, idiom, pos }) => ({
          definition: {
            action: "",
            value: definition,
          },
          definitionId: {
            action: "ID",
            value: id,
          },
          idiom: {
            action: "",
            value: idiom,
          },
          pos: {
            action: "",
            value: pos,
          },
        }),
      ),
      examples: defaultData?.examples.map(({ example, id, definitionId }) => ({
        example: {
          action: "",
          value: example,
        },
        exampleId: {
          action: "ID",
          value: id,
        },
        definitionId: {
          action: "",
          value: definitionId,
        },
      })),
      slang: {
        augmentative: {
          action: "",
          value: defaultData?.augmentative,
        },
        diminutive: {
          action: "",
          value: defaultData?.diminutive,
        },
        explicit: {
          action: "",
          value: defaultData?.explicit,
        },
        slang: {
          action: "",
          value: defaultData?.slang,
        },
        slangId: {
          action: "ID",
          value: defaultData?.id,
        },
      },
      abbreviations: [],
      antonyms: [],
      spellings: [],
      tags: [],
      synonyms: [],
    },
    resolver: zodResolver(ucrSlangSchema, undefined, { raw: true }),
  });

  const debugPayload = getUCR({
    abbreviations: watch("abbreviations"),
    antonyms: watch("antonyms"),
    definitions: watch("definitions"),
    examples: watch("examples"),
    slangs: [watch("slang")],
    spellings: watch("spellings"),
    synonyms: watch("synonyms"),
    tags: watch("tags"),
  });

  const onSubmit = handleSubmit(({ slang, ...rest }) => {
    startTransition(() => {
      const payload = getUCR({
        ...rest,
        slangs: [slang],
      });

      handleForm(payload)
        .then(() => alert("Slang updated"))
        .catch((err) => {
          if (err instanceof Error) {
            console.error(err.message);
          }
        });
    });
  });

  const _definitions = useFieldArray({
    control,
    name: "definitions",
    keyName: "_id",
  });

  const _examples = useFieldArray({
    control,
    name: "examples",
    keyName: "_id",
  });

  return (
    <main className="mx-auto max-w-screen-md">
      <form onSubmit={(e) => void onSubmit(e)} className="grid">
        <div className="mb-4 font-semibold">ToDo</div>

        <div className="mb-4 grid gap-1">
          <label>Name</label>
          <input
            className="ring-1"
            {...register("slang.slang.value", {
              onChange: ({ target }) => {
                const { value } = target as HTMLInputElement;
                setValue(`slang.slang.value`, value);
                if (value === defaultValues?.slang?.slang?.value) {
                  setValue(`slang.slang.action`, "");
                  return;
                }
                setValue(`slang.slang.action`, `UPDATE`);
              },
            })}
          />
        </div>

        <div className="grid gap-1">
          <label htmlFor={`slang.explicit.value`}>Explicit</label>
          <input
            type="checkbox"
            {...register(`slang.explicit.value`, {
              onChange: ({ target }) => {
                const { checked } = target as HTMLInputElement;
                setValue(`slang.explicit.value`, checked);
                if (checked === defaultValues?.slang?.explicit?.value) {
                  setValue(`slang.explicit.action`, "");
                  return;
                }
                setValue(`slang.explicit.action`, `UPDATE`);
              },
            })}
          />
        </div>

        <div className="mb-4 font-semibold">Definitions</div>
        <div className="mb-4">
          {_definitions.fields.map((definition, index) => {
            if (definition.definition.action === "REMOVE") return null;

            return (
              <div key={definition._id}>
                <div className="flex gap-2">
                  <div className="grid gap-1">
                    <label htmlFor={`tasks.${index}.name.value`}>
                      Definition
                    </label>
                    {definition.definitionId.action === "CREATE" ? (
                      <input
                        className="ring-1"
                        {...register(`definitions.${index}.definition.value`)}
                      />
                    ) : (
                      <input
                        className="ring-1"
                        {...register(`definitions.${index}.definition.value`, {
                          onChange: ({ target }) => {
                            const { value } = target as HTMLInputElement;
                            setValue(
                              `definitions.${index}.definition.value`,
                              value,
                            );
                            if (
                              value ===
                              defaultValues?.definitions?.[index]?.definition
                                ?.value
                            ) {
                              setValue(
                                `definitions.${index}.definition.action`,
                                "",
                              );
                              return;
                            }
                            setValue(
                              `definitions.${index}.definition.action`,
                              `UPDATE`,
                            );
                          },
                        })}
                      />
                    )}
                  </div>

                  {_examples.fields.map((example, index) => {
                    if (
                      example.definitionId.value !==
                      definition.definitionId.value
                    ) {
                      return null;
                    }
                    if (example.example.action === "REMOVE") return null;

                    return (
                      <div key={example._id}>
                        <div className="grid gap-2">
                          <div className="grid gap-1">
                            <label htmlFor={`examples.${index}.example.value`}>
                              Example
                            </label>
                            {example.exampleId.action === "CREATE" ? (
                              <input
                                className="ring-1"
                                {...register(`examples.${index}.example.value`)}
                              />
                            ) : (
                              <input
                                className="ring-1"
                                {...register(
                                  `examples.${index}.example.value`,
                                  {
                                    onChange: ({ target }) => {
                                      const { value } =
                                        target as HTMLInputElement;
                                      setValue(
                                        `examples.${index}.example.value`,
                                        value,
                                      );
                                      if (
                                        value ===
                                        defaultValues?.examples?.[index]
                                          ?.example?.value
                                      ) {
                                        setValue(
                                          `examples.${index}.example.action`,
                                          "",
                                        );
                                        return;
                                      }
                                      setValue(
                                        `examples.${index}.example.action`,
                                        `UPDATE`,
                                      );
                                    },
                                  },
                                )}
                              />
                            )}
                          </div>
                          <button
                            type="button"
                            className="mt-auto"
                            onClick={() => {
                              if (example.exampleId.value === "") {
                                _examples.remove(index);
                                return;
                              }
                              _examples.update(index, {
                                ...example,
                                example: {
                                  ...example.example,
                                  action: "REMOVE",
                                },
                              });
                            }}
                          >
                            Delete example
                          </button>
                        </div>
                      </div>
                    );
                  })}

                  <button
                    type="button"
                    className="mt-auto"
                    onClick={() => {
                      if (definition.definitionId.value === "") {
                        _definitions.remove(index);
                        return;
                      }

                      _examples.fields.forEach((fieldExample, indexExample) => {
                        if (
                          fieldExample.definitionId.value ===
                          definition.definitionId.value
                        ) {
                          _examples.update(indexExample, {
                            ...fieldExample,
                            example: {
                              ...fieldExample.example,
                              action: "REMOVE",
                            },
                          });
                        }
                      });

                      _definitions.update(index, {
                        ...definition,
                        definition: {
                          ...definition.definition,
                          action: "REMOVE",
                        },
                      });
                    }}
                  >
                    Delete definition
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div>
          <button
            type="button"
            className="mb-8 ring-1"
            onClick={() => {
              _definitions.append({
                definition: { value: "", action: "CREATE" },
                definitionId: { value: "", action: "CREATE" },
                idiom: { value: "", action: "CREATE" },
                pos: { value: "", action: "CREATE" },
              });
            }}
          >
            Add task
          </button>
        </div>

        <button className="ring-1">Save changes</button>
      </form>

      <div className="flex gap-2">
        <div>
          <div>
            <pre>getUCR()</pre>
          </div>
          <pre>{JSON.stringify(debugPayload, null, 2)}</pre>
        </div>
        <div>
          <div>
            <pre>watch()</pre>
          </div>
          <pre>{JSON.stringify(watch(), null, 2)}</pre>
        </div>
      </div>
    </main>
  );
}
