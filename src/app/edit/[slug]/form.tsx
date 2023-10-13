"use client";

import { type UcrSlangInput, ucrSlangSchema } from "@/app/validation";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition } from "react";
import { getUCR } from "ucr";
import { handleForm } from "@/app/_action/handleForm";

type Props = {
  defaultData?: UcrSlangInput;
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
    defaultValues: defaultData,
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
          <label htmlFor={`slang.completed.value`}>Completed</label>
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
          {_definitions.fields.map((field, index) => {
            if (field.definition.action === "REMOVE") return null;

            return (
              <div key={field._id}>
                <div className="flex gap-2">
                  <div className="grid gap-1">
                    <label htmlFor={`tasks.${index}.name.value`}>Name</label>
                    {field.definitionId.action === "CREATE" ? (
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
                  <button
                    type="button"
                    className="mt-auto"
                    onClick={() => {
                      if (field.definitionId.value === "") {
                        _definitions.remove(index);
                        return;
                      }
                      _definitions.update(index, {
                        ...field,
                        definition: {
                          ...field.definition,
                          action: "REMOVE",
                        },
                      });
                    }}
                  >
                    Delete
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
