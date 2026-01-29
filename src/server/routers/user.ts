import { router, publicProcedure } from "../trpc";

export const userRouter = router({
  getProfile: publicProcedure.query(() => {
    return {
      fullName: "Matheus Tavares",
      createdAt: "2026-01-26",
      status: "A",
      tasks: [
        { label: "Not Started", value: 3 },
        { label: "Started", value: 1 },
        { label: "Completed", value: 7 },
        { label: "Canceled", value: 2 },
      ],
    };
  }),
});
