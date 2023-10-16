"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition } from "react";
import { type CreateSlangInput, createSlangSchema } from "@/app/new/validation";
import { handleForm } from "@/app/new/_action/handleForm";
import { definitions } from "@/server/db/schema";
import { Select } from "@/ui/html/select";
import { Input } from "@/ui/html/input";
import { Textarea } from "@/ui/html/textarea";

export default function Form() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<CreateSlangInput>({
    defaultValues: {
      slang: {
        augmentative: "",
        diminutive: "",
        explicit: false,
        slang: "",
      },
      definitions: [{ definition: "", pos: "adjective", idiom: "" }],
      abbreviations: [],
      antonyms: [],
      examples: [],
      spellings: [],
      synonyms: [],
      tags: [],
    },
    resolver: zodResolver(createSlangSchema, undefined, { raw: true }),
  });

  const onSubmit = handleSubmit((payload) => {
    startTransition(() => {
      handleForm(payload)
        .then(() => alert("Slang created"))
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
      <form onSubmit={(e) => void onSubmit(e)} className="mt-4 grid">
        <div className="mb-4 grid gap-1">
          <label>Slang</label>
          <Input className="ring-1" {...register("slang.slang")} />
        </div>

        <div className="flex gap-1">
          <label htmlFor={`slang.explicit`}>Explicit</label>
          <Input type="checkbox" {...register(`slang.explicit`)} />
        </div>

        <div>Definitions</div>
        <div className="mb-4">
          {_definitions.fields.map((field, index) => (
            <div key={field._id}>
              <div className="flex gap-2">
                <div className="grid gap-1">
                  <label htmlFor={`definitions.${index}.definition`}>
                    Definition
                  </label>
                  <div>
                    <label htmlFor={`definitions.${index}.pos`}>
                      Part of speech
                    </label>
                    <Select {...register(`definitions.${index}.pos`)}>
                      {definitions.pos.enumValues.map((pos) => {
                        return (
                          <option key={pos} value={pos}>
                            {pos}
                          </option>
                        );
                      })}
                    </Select>
                  </div>
                  <Textarea
                    className="ring-1"
                    {...register(`definitions.${index}.definition`)}
                  ></Textarea>
                </div>

                {_examples.fields.map((fieldExample, indexExample) => {
                  if (fieldExample.definitionIndex !== index) return null;

                  return (
                    <div key={fieldExample._id}>
                      <div className="grid gap-1">
                        <label htmlFor={`examples.${indexExample}.example`}>
                          Example
                        </label>
                        <Textarea
                          className="ring-1"
                          {...register(`examples.${indexExample}.example`)}
                        ></Textarea>
                      </div>

                      <div>
                        <button
                          type="button"
                          className="mb-8 ring-1"
                          onClick={() => _examples.remove(indexExample)}
                        >
                          Delete example
                        </button>
                      </div>
                    </div>
                  );
                })}

                <div>
                  <button
                    type="button"
                    className="mb-8 ring-1"
                    onClick={() => {
                      _examples.append({
                        definitionIndex: index,
                        example: "",
                      });
                    }}
                  >
                    Add example
                  </button>
                </div>

                {index === _definitions.fields.length - 1 && (
                  <button
                    type="button"
                    className="mt-auto"
                    onClick={() => {
                      _definitions.remove(index);
                      const examplesToDelete: number[] = [];

                      _examples.fields.forEach((fieldExample, indexExample) => {
                        if (fieldExample.definitionIndex === index) {
                          examplesToDelete.push(indexExample);
                        }
                      });

                      _examples.remove(examplesToDelete);
                    }}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
          <div>
            <button
              type="button"
              className="mb-8 ring-1"
              onClick={() => {
                _definitions.append({
                  definition: "",
                  pos: "adjective",
                  idiom: "",
                });
              }}
            >
              Add definition
            </button>
          </div>
        </div>

        <button className="ring-1">Save changes</button>
      </form>

      <pre>{JSON.stringify(errors, null, 2)}</pre>
      <pre>{JSON.stringify(watch(), null, 2)}</pre>
    </main>
  );
}
