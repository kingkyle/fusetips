import {
  addTeamProcedure,
  listTeamsByCompetitionIdProcedure,
  listTeamsProcedure,
} from "~/server/services/team";
import { createTRPCRouter } from "../trpc";

export const teamRouter = createTRPCRouter({
  add: addTeamProcedure(),
  list: listTeamsProcedure(),
  listByCompetitionId: listTeamsByCompetitionIdProcedure(),
});
