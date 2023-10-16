"use client";

import { type UcrSlangInput, ucrSlangSchema } from "@/app/validation";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition } from "react";
import { getUCR } from "ucr";
import { handleForm } from "@/app/_action/handleForm";
import { type SlangParser } from "./parser";
import { definitions } from "@/server/db/schema";
import { Select } from "@/ui/html/select";
import { Input } from "@/ui/html/input";
import { Textarea } from "@/ui/html/textarea";
import { Button } from "@/ui/html/button";
import { v4 as uuidv4 } from "uuid";

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
          <Input
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
          <Input
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
        <div className="mb-4 space-y-4">
          {_definitions.fields.map((definition, index) => {
            if (definition.definition.action === "REMOVE") return null;

            return (
              <div key={definition._id}>
                <div className="grid gap-2 rounded-md border border-neutral-300 p-2">
                  <div className="grid gap-1">
                    <div>
                      <label htmlFor={`definitions.${index}.pos.value`}>
                        Part of speech
                      </label>
                      {definition.definitionId.action === "CREATE" ? (
                        <Select {...register(`definitions.${index}.pos.value`)}>
                          {definitions.pos.enumValues.map((pos) => {
                            return (
                              <option key={pos} value={pos}>
                                {pos}
                              </option>
                            );
                          })}
                        </Select>
                      ) : (
                        <Select
                          {...register(`definitions.${index}.pos.value`, {
                            onChange: ({ target }) => {
                              const { value } = target as HTMLInputElement;
                              setValue(`definitions.${index}.pos.value`, value);
                              if (
                                value ===
                                defaultValues?.definitions?.[index]?.pos?.value
                              ) {
                                setValue(`definitions.${index}.pos.action`, "");
                                return;
                              }
                              setValue(
                                `definitions.${index}.pos.action`,
                                `UPDATE`,
                              );
                            },
                          })}
                        >
                          {definitions.pos.enumValues.map((pos) => {
                            return (
                              <option key={pos} value={pos}>
                                {pos}
                              </option>
                            );
                          })}
                        </Select>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <div className="w-full">
                        <label htmlFor={`tasks.${index}.name.value`}>
                          Definition
                        </label>
                        {definition.definitionId.action === "CREATE" ? (
                          <Textarea
                            className="w-full"
                            {...register(
                              `definitions.${index}.definition.value`,
                            )}
                          ></Textarea>
                        ) : (
                          <Textarea
                            className="w-full"
                            {...register(
                              `definitions.${index}.definition.value`,
                              {
                                onChange: ({ target }) => {
                                  const { value } = target as HTMLInputElement;
                                  setValue(
                                    `definitions.${index}.definition.value`,
                                    value,
                                  );
                                  if (
                                    value ===
                                    defaultValues?.definitions?.[index]
                                      ?.definition?.value
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
                              },
                            )}
                          ></Textarea>
                        )}
                      </div>
                      <Button
                        type="button"
                        className="mt-auto"
                        onClick={() => {
                          if (definition.definitionId.action === "CREATE") {
                            _examples.fields.forEach(
                              (fieldExample, indexExample) => {
                                if (
                                  fieldExample.definitionId.value ===
                                  definition.definitionId.value
                                ) {
                                  _examples.remove(indexExample);
                                }
                              },
                            );
                            _definitions.remove(index);
                            return;
                          }
                          _examples.fields.forEach(
                            (fieldExample, indexExample) => {
                              if (
                                fieldExample.definitionId.value ===
                                definition.definitionId.value
                              ) {
                                if (fieldExample.exampleId.value === "") {
                                  _examples.remove(indexExample);
                                  return;
                                }
                                _examples.update(indexExample, {
                                  ...fieldExample,
                                  example: {
                                    ...fieldExample.example,
                                    action: "REMOVE",
                                  },
                                });
                              }
                            },
                          );
                          _definitions.update(index, {
                            ...definition,
                            definition: {
                              ...definition.definition,
                              action: "REMOVE",
                            },
                          });
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>

                  <div className="grid rounded-md border border-neutral-300 p-2">
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
                          <div className="flex gap-2">
                            <div className="grid w-full gap-1">
                              <label
                                htmlFor={`examples.${index}.example.value`}
                              >
                                Example
                              </label>
                              {example.exampleId.action === "CREATE" ? (
                                <Textarea
                                  {...register(
                                    `examples.${index}.example.value`,
                                  )}
                                ></Textarea>
                              ) : (
                                <Textarea
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
                                ></Textarea>
                              )}
                            </div>
                            <Button
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
                              Delete
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                    <div>
                      <Button
                        type="button"
                        className="mt-4"
                        onClick={() => {
                          _examples.append({
                            definitionId: {
                              value: definition.definitionId.value,
                              action: "CREATE",
                            },
                            example: { value: "", action: "CREATE" },
                            exampleId: { value: "", action: "CREATE" },
                          });
                        }}
                      >
                        Add Example
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div>
          <Button
            type="button"
            className="mb-8 ring-1"
            onClick={() => {
              _definitions.append({
                definition: { value: "", action: "CREATE" },
                definitionId: {
                  value: `UCR_CREATE_${uuidv4()}`,
                  action: "CREATE",
                },
                idiom: { value: "", action: "CREATE" },
                pos: { value: "", action: "CREATE" },
              });
            }}
          >
            Add Definition
          </Button>
        </div>

        <Button className="ring-1">Save changes</Button>
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
