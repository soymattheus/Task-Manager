import { InferSelectModel } from "drizzle-orm";
import { tasks } from "./schema";

export type Task = InferSelectModel<typeof tasks>;
