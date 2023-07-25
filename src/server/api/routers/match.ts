import { addMatchProcedure, listMatchProcedure } from "~/server/services/match";
import { createTRPCRouter } from "../trpc";

export const matchRouter = createTRPCRouter({
  add: addMatchProcedure(),
  list: listMatchProcedure(),
});
