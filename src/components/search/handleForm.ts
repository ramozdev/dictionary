"use server";

import { type SearchInput, searchSchema } from "@/components/search/validation";
import { db } from "@/server/db";
import { like } from "drizzle-orm";
import slugify from "sluga";

export async function handleForm(formData: SearchInput) {
  const parsedData = searchSchema.parse(formData);

  const res = await db.query.slangs.findMany({
    where: (users) =>
      like(users.slug, `%${slugify(parsedData.search.toLowerCase())}%`),
    limit: 10,
    columns: {
      slang: true,
      slug: true,
      explicit: true,
    },
  });

  return res;
}
