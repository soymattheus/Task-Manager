import { router } from "./trpc";
import { taskRouter } from "./routers/task";
import { userRouter } from "./routers/user";

export const appRouter = router({
  task: taskRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;
