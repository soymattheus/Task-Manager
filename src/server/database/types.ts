import { InferSelectModel } from "drizzle-orm";
import { tasksTable } from "./schema";

export type Task = InferSelectModel<typeof tasksTable>;
