import { addMatchDto } from "~/dto/match";
import { adminProtectedProcedure } from "../api/trpc";
import { handleError } from "~/utils/error";

export function addMatchProcedure() {
  return adminProtectedProcedure
    .input(addMatchDto)
    .mutation(async ({ input, ctx }) => {
      try {
        const data = await ctx.prisma.match.create({
          data: {
            homeTeamId: input.homeTeamId.value,
            awayTeamId: input.awayTeamId.value,
            date: input.date,
            competitionId: input.competitionId.value,
            sportId: input.sportId.value,
            countryId: input.countryId.value,
          },
        });
        return { data, message: "Match Added", success: true };
      } catch (error) {
        handleError({ error, title: "Match" });
      }
    });
}

export function listMatchProcedure() {
  return adminProtectedProcedure.query(async ({ ctx }) => {
    const data = await ctx.prisma.match.findMany({
      orderBy: [{ date: "desc" }],
      include: {
        competition: true,
        homeTeam: true,
        awayTeam: true,
        sport: true,
        country: true,
      },
    });
    return { data, message: "", success: true };
  });
}
