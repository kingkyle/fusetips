import {
  addMarketProcedure,
  listMarketBySportIDProcedure,
  listMarketProcedure,
} from "~/server/services/market";
import { createTRPCRouter } from "../trpc";

export const marketRouter = createTRPCRouter({
  add: addMarketProcedure(),
  list: listMarketProcedure(),
  listBySportId: listMarketBySportIDProcedure(),
});
