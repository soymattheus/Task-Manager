import { router } from "./trpc";
import { taskRouter } from "./routers/task";
import { userRouter } from "./routers/user";
// se tiver outros routers, importe aqui

export const appRouter = router({
  task: taskRouter,
  user: userRouter,
  // auth: authRouter,
});

export type AppRouter = typeof appRouter;
