import Form from "./form";
import { getSlang } from "./query";

export default async function Page({ params }: { params: { slug: string } }) {
  const data = await getSlang(params.slug);

  return (
    <main className="mx-auto max-w-screen-md">
      <Form defaultData={data} />
    </main>
  );
}
