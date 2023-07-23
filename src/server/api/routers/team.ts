import { addTeamProcedure, listTeamsProcedure } from "~/server/services/team";
import { createTRPCRouter } from "../trpc";

export const teamRouter = createTRPCRouter({
    add: addTeamProcedure(),
    list: listTeamsProcedure(),
});
