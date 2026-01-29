import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { tasksTable } from "@/server/database/schema";
import { db } from "../database/db";
import { eq } from "drizzle-orm";

export const taskRouter = router({
  getAll: publicProcedure.query(async () => {
    const tasks = await db.select().from(tasksTable);
    return tasks;
  }),

  create: publicProcedure
    .input(
      z.object({
        title: z.string().min(1),
        description: z.string().min(1),
        status: z.string().min(1).max(20),
        idUser: z.number(),
      }),
    )
    .mutation(async ({ input }) => {
      const [task] = await db
        .insert(tasksTable)
        .values({
          title: input.title,
          description: input.description,
          status: input.status,
          idUser: input.idUser,
        })
        .returning();

      return task;
    }),

  update: publicProcedure
    .input(
      z.object({
        idTask: z.number(),
        title: z.string().min(1),
        description: z.string().min(1),
        status: z.string().min(1).max(20),
        idUser: z.number(),
      }),
    )
    .mutation(async ({ input }) => {
      const [updatedTask] = await db
        .update(tasksTable)
        .set({
          title: input.title,
          description: input.description,
          status: input.status,
          idUser: input.idUser,
        })
        .where(eq(tasksTable.idTask, input.idTask))
        .returning();

      return updatedTask;
    }),

  delete: publicProcedure
    .input(
      z.object({
        idTask: z.number(),
      }),
    )
    .mutation(async ({ input }) => {
      const [deletedTask] = await db
        .delete(tasksTable)
        .where(eq(tasksTable.idTask, input.idTask))
        .returning();

      return deletedTask;
    }),
});
