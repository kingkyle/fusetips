import {
  addCategoryProcedure,
  listCatergoryProcedure,
} from "~/server/services/category";
import { createTRPCRouter } from "../trpc";

export const categoryRouter = createTRPCRouter({
  add: addCategoryProcedure(),
  list: listCatergoryProcedure(),
});
