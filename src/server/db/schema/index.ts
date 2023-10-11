import { mysqlTableCreator } from "drizzle-orm/mysql-core";

export * from "./abbreviations";
export * from "./accounts";
export * from "./antonyms";
export * from "./definitions";
export * from "./examples";
export * from "./sessions";
export * from "./slangs";
export * from "./spellings";
export * from "./synonyms";
export * from "./tags";
export * from "./users";
export * from "./verification-tokens";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const mysqlTable = mysqlTableCreator((name) => `slang_${name}`);
