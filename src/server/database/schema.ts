import {
  pgTable,
  integer,
  varchar,
  timestamp,
  boolean,
  text,
} from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: varchar("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const tasks = pgTable("tasks", {
  idTask: integer("id_task").primaryKey().generatedAlwaysAsIdentity(),
  title: varchar("title", { length: 50 }).notNull(),
  description: varchar("description", { length: 255 }).notNull(),
  status: varchar("status", { length: 20 }).notNull(),
  id: varchar("id_user")
    .references(() => user.id, {
      onDelete: "cascade",
    })
    .notNull(),
});
