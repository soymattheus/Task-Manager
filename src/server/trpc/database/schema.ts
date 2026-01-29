import {
  pgTable,
  integer,
  varchar,
  timestamp,
  char,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  idUser: integer("id_user").primaryKey().generatedAlwaysAsIdentity(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
  status: char("status", { length: 1 }).notNull(),
});

export const tasksTable = pgTable("tasks", {
  idTask: integer("id_task").primaryKey().generatedAlwaysAsIdentity(),
  title: varchar("title", { length: 50 }).notNull(),
  description: varchar("description", { length: 255 }).notNull(),
  status: varchar("status", { length: 20 }).notNull(),
  idUser: integer("id_user")
    .references(() => usersTable.idUser, {
      onDelete: "cascade",
    })
    .notNull(),
});
