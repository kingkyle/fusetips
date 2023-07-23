import { createTRPCRouter } from "../trpc";

import {
  addCountryProcedure,
  listCountryProcedure,
} from "~/server/services/country";

export const countryRouter = createTRPCRouter({
  add: addCountryProcedure(),
  list: listCountryProcedure(),
});
