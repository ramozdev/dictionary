import { getSlangs } from "@/app/query";

export default async function Home() {
  const data = await getSlangs();
  return (
    <main className="mx-auto max-w-screen-md">
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  );
}
