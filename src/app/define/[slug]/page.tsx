import { getSlang } from "./query";

export default async function Page({ params }: { params: { slug: string } }) {
  const data = await getSlang(params.slug);
  return (
    <main className="mx-auto max-w-screen-md">
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  );
}
