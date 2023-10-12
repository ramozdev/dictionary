import { antonyms } from "@/server/db/schema/antonyms";
import { slangs } from "@/server/db/schema/slangs";
import { relations } from "drizzle-orm";
import {
  bigint,
  mysqlTable,
  primaryKey,
  varchar,
} from "drizzle-orm/mysql-core";

export const antonymsToSlangs = mysqlTable(
  "antonyms_to_slangs",
  {
    antonymId: varchar("antonymId", { length: 255 }).notNull(),
    slangId: bigint("slangId", { mode: "number" }).notNull(),
  },
  ({ antonymId, slangId }) => ({
    pk: primaryKey(antonymId, slangId),
  }),
);

export const antonymsToSlangsRelations = relations(
  antonymsToSlangs,
  ({ one }) => ({
    slang: one(slangs, {
      fields: [antonymsToSlangs.slangId],
      references: [slangs.id],
    }),
    antonym: one(antonyms, {
      fields: [antonymsToSlangs.antonymId],
      references: [antonyms.id],
    }),
  }),
);
