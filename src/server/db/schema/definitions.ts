import { examples } from "@/server/db/schema/examples";
import { slangs } from "@/server/db/schema/slangs";
import { relations } from "drizzle-orm";
import {
  bigint,
  mysqlTable,
  serial,
  text,
  varchar,
} from "drizzle-orm/mysql-core";

const definitions = mysqlTable("definitions", {
  id: serial("id").primaryKey(),
  definition: text("definition").notNull(),
  idiom: varchar("idiom", { length: 191 }),
  slangId: bigint("slangId", { mode: "number" }).notNull(),
  pos: varchar("pos", {
    length: 20,
    enum: [
      "adjective",
      "adverb",
      "conjunction",
      "determiner",
      "idiom",
      "interjection",
      "noun",
      "preposition",
      "pronoun",
      "verb",
    ],
  }),
});

const definitionsRelations = relations(definitions, ({ many, one }) => ({
  slang: one(slangs, {
    fields: [definitions.slangId],
    references: [slangs.id],
  }),
  examples: many(examples),
}));

export { definitions, definitionsRelations };
