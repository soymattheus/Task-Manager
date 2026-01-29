import { router, publicProcedure } from "../trpc";
import { usersTable, tasksTable } from "../trpc/database/schema";
import { eq, sql } from "drizzle-orm";
import { db } from "../trpc/database/db";

export const userRouter = router({
  getProfile: publicProcedure.query(async () => {
    const userId = 1; // depois vem do auth

    // 👤 Buscar usuário
    const [user] = await db
      .select({
        fullName: usersTable.fullName,
        createdAt: usersTable.createdAt,
        status: usersTable.status,
      })
      .from(usersTable)
      .where(eq(usersTable.idUser, userId));

    // 📊 Contar tasks por status
    const taskCounts = await db
      .select({
        status: tasksTable.status,
        value: sql<number>`count(*)`,
      })
      .from(tasksTable)
      .where(eq(tasksTable.idUser, userId))
      .groupBy(tasksTable.status);

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
      fullName: user.fullName,
      createdAt: user.createdAt.toISOString().split("T")[0],
      status: user.status,
      tasks: [
        { label: "Not Started", value: taskMap.NOT_STARTED },
        { label: "Started", value: taskMap.STARTED },
        { label: "Completed", value: taskMap.COMPLETED },
        { label: "Canceled", value: taskMap.CANCELED },
      ],
    };
  }),
});
