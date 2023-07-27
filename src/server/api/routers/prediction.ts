import {
  addPredictionProcedure,
  listPredictionsByMatchIDProcedure,
} from "~/server/services/prediction";
import { createTRPCRouter } from "../trpc";

export const predictionRouter = createTRPCRouter({
  add: addPredictionProcedure(),
  listByMatchID: listPredictionsByMatchIDProcedure(),
});
