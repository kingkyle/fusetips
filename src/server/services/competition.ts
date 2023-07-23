import { addCompetitionDto } from "~/dto/competition";
import { adminProtectedProcedure } from "../api/trpc";
import { handleError } from "~/utils/error";

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
