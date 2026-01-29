import { router, publicProcedure } from "../trpc";
import { tasks } from "../database/schema";
import { user } from "../../../auth-schema";
import { eq, sql } from "drizzle-orm";
import { db } from "../database/db";

export const userRouter = router({
  getAll: publicProcedure.query(async () => {
    const users = await db.select().from(user);
    return users;
  }),

  getProfile: publicProcedure.query(async ({ ctx }) => {
    const [res] = await db
      .select({
        name: user.name,
        createdAt: user.createdAt,
      })
      .from(user)
      .where(eq(user.id, String(ctx.userId)));

    // 📊 Contar tasks por status
    const taskCounts = await db
      .select({
        status: tasks.status,
        value: sql<number>`count(*)`,
      })
      .from(tasks)
      .where(eq(tasks.id, String(ctx.userId)))
      .groupBy(tasks.status);

    // 🧠 Mapear pro formato do front
    const taskMap: Record<string, number> = {
      NOT_STARTED: 0,
      STARTED: 0,
      COMPLETED: 0,
      CANCELED: 0,
    };

    taskCounts.forEach((t) => {
      taskMap[t.status.toUpperCase().replace(" ", "_")] = t.value;
    });

    return {
      name: res.name,
      createdAt: res.createdAt.toISOString().split("T")[0],
      tasks: [
        { label: "Not Started", value: taskMap.NOT_STARTED },
        { label: "Started", value: taskMap.STARTED },
        { label: "Completed", value: taskMap.COMPLETED },
        { label: "Canceled", value: taskMap.CANCELED },
      ],
    };
  }),
});
