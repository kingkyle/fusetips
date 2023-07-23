import {
  addCompetitionProcedure,
  listCompetitionsProcedure,
} from "~/server/services/competition";
import { createTRPCRouter } from "../trpc";

export const competitionRouter = createTRPCRouter({
  add: addCompetitionProcedure(),
  list: listCompetitionsProcedure(),
});
