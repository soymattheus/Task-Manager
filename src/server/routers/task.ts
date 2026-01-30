import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { tasks } from "@/drizzle/schema/application";
import { db } from "../database/db";
import { and, eq } from "drizzle-orm";

export const taskRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const res = await db
      .select()
      .from(tasks)
      .where(eq(tasks.id, String(ctx.userId)));
    return res;
  }),

  create: publicProcedure
    .input(
      z.object({
        title: z.string().min(1),
        description: z.string().min(1),
        status: z.string().min(1).max(20),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const [task] = await ctx.db
        .insert(tasks)
        .values({
          title: input.title,
          description: input.description,
          status: input.status,
          id: String(ctx.userId),
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
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const [updatedTask] = await ctx.db
        .update(tasks)
        .set({
          title: input.title,
          description: input.description,
          status: input.status,
        })
        .where(
          and(eq(tasks.idTask, input.idTask), eq(tasks.id, String(ctx.userId))),
        )
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
        .delete(tasks)
        .where(eq(tasks.idTask, input.idTask))
        .returning();

      return deletedTask;
    }),
});
