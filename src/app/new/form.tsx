"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition } from "react";
import { type CreateSlangInput, createSlangSchema } from "@/app/new/validation";
import { handleForm } from "@/app/new/_action/handleForm";

export default function Form() {
  const { register, handleSubmit, watch } = useForm<CreateSlangInput>({
    resolver: zodResolver(createSlangSchema, undefined, { raw: true }),
  });

  const onSubmit = handleSubmit((payload) => {
    startTransition(() => {
      handleForm(payload)
        .then(() => alert("Todo created"))
        .catch((err) => {
          if (err instanceof Error) {
            console.error(err.message);
          }
        });
    });
  });

  return (
    <main className="mx-auto max-w-screen-md">
      <form onSubmit={(e) => void onSubmit(e)} className="mt-4 grid">
        <div className="mb-4 font-semibold">ToDo</div>
        <div className="mb-4 grid gap-1">
          <label>Slang</label>
          <input className="ring-1" {...register("slang.slang")} />
        </div>

        <button className="ring-1">Save changes</button>
      </form>

      <pre>{JSON.stringify(watch(), null, 2)}</pre>
    </main>
  );
}
