import { addTeamDto } from "~/dto/team";
import { adminProtectedProcedure } from "../api/trpc";
import { handleError } from "~/utils/error";

export function addTeamProcedure() {
  return adminProtectedProcedure
    .input(addTeamDto)
    .mutation(async ({ input, ctx }) => {
      try {
        const team = await ctx.prisma.team.create({
          data: {
            name: input.name.toLowerCase(),
            shortName: input.shortName,
            sportId: input.sportId.value,
            countryId: input.countryId.value,
          },
        });
        if (input.competitions) {
          const list =
            (Array.isArray(input.competitions)
              ? input.competitions
              : [input.competitions]) ?? [];
          const data = list.map((c) => {
            return {
              competitionId: c.value,
              teamId: team.id,
            };
          });
          await ctx.prisma.teamsCompetitions.createMany({
            data,
            skipDuplicates: true,
          });
          return { data: team, message: "Team Added", success: true };
        }
      } catch (error) {
        handleError({ error, title: "Team" });
      }
    });
}

export function listTeamsProcedure() {
  return adminProtectedProcedure.query(async ({ ctx }) => {
    const teams = await ctx.prisma.team.findMany({
      orderBy: [{ name: "asc" }],
      include: {
        sport: true,
        country: true,
      },
    });
    return { data: teams, message: "", success: true };
  });
}
