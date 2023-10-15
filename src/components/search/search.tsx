"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { useDebounce } from "use-debounce";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { handleForm } from "./handleForm";

export function Search() {
  const router = useRouter();
  const { register, watch } = useForm({
    defaultValues: { search: "" },
  });
  const searchText = watch("search");
  const [data, setData] = React.useState<
    Awaited<ReturnType<typeof handleForm>>
  >([]);
  const [debouncedText] = useDebounce(searchText, 500);

  React.useEffect(() => {
    handleForm({ search: debouncedText })
      .then((res) => setData(res))
      .catch((err) => {
        if (err instanceof Error) {
          console.error(err.message);
        }
      });
  }, [debouncedText]);

  // const { data, isFetching } = api.search.slang.useQuery(
  //   { slang: debouncedText },
  //   {
  //     enabled: debouncedText.length > 2,
  //   },
  // );
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && e.metaKey) {
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <button type="button" onClick={() => setOpen((open) => !open)}>
        <p>Search</p>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-slate-100 bg-slate-100 px-1.5 font-mono text-[10px] font-medium text-slate-600 opacity-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>
      <Command.Dialog open={open} onOpenChange={setOpen}>
        <input
          placeholder="Search"
          autoComplete="off"
          {...register("search")}
        />

        <Command.List>
          {/* {isFetching && <Command.Loading>Loading...</Command.Loading>} */}
          {!!data ? (
            data.length === 0 ? (
              <Command.Empty>No results found.</Command.Empty>
            ) : (
              <Command.Group heading="Results">
                {data.map(({ slang, slug }) => (
                  <Command.Item
                    key={slang}
                    onSelect={() => {
                      void router.push(`/define/${slug}`);
                      setOpen(false);
                    }}
                  >
                    {slang}
                  </Command.Item>
                ))}
              </Command.Group>
            )
          ) : (
            <Command.Group heading="Trending">
              <Command.Item>Slang 1</Command.Item>
              <Command.Item disabled>Slang 2</Command.Item>
              <Command.Item>Slang 3</Command.Item>
              <Command.Item>Slang 4</Command.Item>
            </Command.Group>
          )}
        </Command.List>
      </Command.Dialog>
    </>
  );
}
