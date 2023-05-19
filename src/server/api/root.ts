import { createTRPCRouter } from "y/server/api/trpc";
import { topicRouter } from "y/server/api/routers/topic";
import { noteRouter } from "y/server/api/routers/note";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  topic: topicRouter,
  note: noteRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
