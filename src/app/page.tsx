// import { getSlangs } from "@/app/query";
import { Search } from "@/components/search/search";

export default function Home() {
  // const data = await getSlangs();
  return (
    <main className="mx-auto max-w-screen-md">
      <Search />
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </main>
  );
}
