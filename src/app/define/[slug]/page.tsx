import { DefinitionCard } from "@/components/definition-card";
import { getSlang } from "./query";

export default async function Page({ params }: { params: { slug: string } }) {
  const data = await getSlang(params.slug);
  return (
    <main className="mx-auto max-w-screen-md">
      <DefinitionCard slang={data} />
    </main>
  );
}
