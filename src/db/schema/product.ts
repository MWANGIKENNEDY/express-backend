// Product schema definition
import { integer, pgTable, varchar, decimal } from "drizzle-orm/pg-core";

export const productsTable = pgTable("products", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 1000 }),
  price: decimal({ precision: 10, scale: 2 }).notNull(),
});