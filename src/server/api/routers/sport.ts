import {
  addSportProcedure,
  listSportsProcedure,
} from "~/server/services/sport";
import { createTRPCRouter } from "../trpc";

export const sportRouter = createTRPCRouter({
  add: addSportProcedure(),
  list: listSportsProcedure(),
});
