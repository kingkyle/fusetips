import { addSportDto } from "~/dto/sport";
import { adminProtectedProcedure } from "../api/trpc";
import { handleError } from "~/utils/error";

export function addSportProcedure() {
  return adminProtectedProcedure
    .input(addSportDto)
    .mutation(async ({ input: { name }, ctx }) => {
      try {
        const sport = await ctx.prisma.sport.create({
          data: { name: name.toLowerCase() },
        });
        return { data: sport, message: "Sport Added", success: true };
      } catch (error) {
       handleError({error, title: "Sport"})
      }
    });
}

export function listSportsProcedure() {
  return adminProtectedProcedure.query(async ({ ctx }) => {
    const sports = await ctx.prisma.sport.findMany({
      orderBy: [{ name: "asc" }],
    });
    return { data: sports, success: true, message: "" };
  });
}
