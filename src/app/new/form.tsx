"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition } from "react";
import { type CreateSlangInput, createSlangSchema } from "@/app/new/validation";
import { handleForm } from "@/app/new/_action/handleForm";

export default function Form() {
  const { register, handleSubmit, control, watch } = useForm<CreateSlangInput>({
    defaultValues: {
      slang: {
        augmentative: "",
        diminutive: "",
        explicit: false,
        slang: "",
        userId: "",
      },
      definitions: [{ definition: "" }],
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

  return (
    <main className="mx-auto max-w-screen-md">
      <form onSubmit={(e) => void onSubmit(e)} className="mt-4 grid">
        <div className="mb-4 grid gap-1">
          <label>Slang</label>
          <input className="ring-1" {...register("slang.slang")} />
        </div>

        <div>Definition</div>
        <div className="mb-4">
          {_definitions.fields.map((field, index) => (
            <div key={field._id}>
              <div className="flex gap-2">
                <div className="grid gap-1">
                  <label
                    className="sr-only"
                    htmlFor={`definitions.${index}.definition`}
                  >
                    Definition
                  </label>
                  <textarea
                    className="ring-1"
                    {...register(`definitions.${index}.definition`)}
                  ></textarea>
                </div>
                {index > 0 && (
                  <button
                    type="button"
                    className="mt-auto"
                    onClick={() => _definitions.remove(index)}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <button className="ring-1">Save changes</button>
      </form>

      <pre>{JSON.stringify(watch(), null, 2)}</pre>
    </main>
  );
}
