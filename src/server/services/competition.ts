import { addCompetitionDto } from "~/dto/competition";
import { adminProtectedProcedure } from "../api/trpc";
import { handleError } from "~/utils/error";
import { matchSportCountryDto } from "~/dto/match";

export function addCompetitionProcedure() {
  return adminProtectedProcedure
    .input(addCompetitionDto)
    .mutation(async ({ input, ctx }) => {
      try {
        const competition = await ctx.prisma.competition.create({
          data: {
            countryId: input.countryId.value,
            sportId: input.sportId.value,
            shortName: input.shortName,
            name: input.name.toLowerCase(),
          },
        });
        return {
          data: competition,
          message: "Compettition Added",
          success: true,
        };
      } catch (error) {
        handleError({ error, title: "Competition" });
      }
    });
}

export function listCompetitionsProcedure() {
  return adminProtectedProcedure.query(async ({ ctx }) => {
    const competitions = await ctx.prisma.competition.findMany({
      orderBy: [{ name: "asc" }],
      include: { country: true, sport: true },
    });
    return { data: competitions, message: "", success: true };
  });
}

export function listCompetitionsByCountryAndSport() {
  return adminProtectedProcedure
    .input(matchSportCountryDto)
    .query(async ({ input, ctx }) => {
      const data = await ctx.prisma.competition.findMany({
        where: {
          countryId: input.countryId,
          sportId: input.sportId,
        },
        orderBy: [{ name: "asc" }],
      });
      return { data, message: "", success: true };
    });
}
