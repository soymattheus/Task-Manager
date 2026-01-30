import { InferSelectModel } from "drizzle-orm";
import { tasks } from "@/drizzle/schema/application";

export type Task = InferSelectModel<typeof tasks>;
