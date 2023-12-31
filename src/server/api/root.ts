import { authRouter } from "~/server/api/routers/auth";
import { createTRPCRouter } from "~/server/api/trpc";
import { countryRouter } from "./routers/country";
import { sportRouter } from "./routers/sport";
import { competitionRouter } from "./routers/competition";
import { teamRouter } from "./routers/team";
import { categoryRouter } from "./routers/category";
import { marketRouter } from "./routers/market";
import { matchRouter } from "./routers/match";
import { predictionRouter } from "./routers/prediction";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  auth: authRouter,
  country: countryRouter,
  sport: sportRouter,
  competition: competitionRouter,
  team: teamRouter,
  category: categoryRouter,
  market: marketRouter,
  match: matchRouter,
  prediction: predictionRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
