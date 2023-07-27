import { addPredictionDto } from "~/dto/prediction";
import { adminProtectedProcedure } from "../api/trpc";
import { handleError } from "~/utils/error";
import { idDto } from "~/dto/competition";

export function addPredictionProcedure() {
  return adminProtectedProcedure
    .input(addPredictionDto)
    .mutation(async ({ input, ctx }) => {
      try {
        const data = await ctx.prisma.prediction.create({
          data: {
            matchId: input.matchId,
            marketId: input.marketId.value,
            categoryId: input.categoryId.value,
            isBanker: input.isBanker.value,
            sportId: input.sportId,
            odd: input.odd as string,
            rating: input.rating,
          },
        });
        return { data, message: "Prediction Added", success: true };
      } catch (error) {
        console.log({ error });
        handleError({ error, title: "Prediction" });
      }
    });
}

export function listPredictionProcedure() {
  return adminProtectedProcedure.query(async ({ ctx }) => {
    try {
      const data = await ctx.prisma.prediction.findMany({
        orderBy: [{ match: { createdAt: "asc" } }],
        include: { match: true, market: true },
      });
      return { data, message: "", success: true };
    } catch (error) {
      handleError({ error, title: "Prediction" });
    }
  });
}

export function listPredictionsByMatchIDProcedure() {
  return adminProtectedProcedure.input(idDto).query(async ({ input, ctx }) => {
    try {
      const data = await ctx.prisma.match.findFirst({
        where: { id: input.id },
        orderBy: [{ predictions: { _count: "asc" } }],
        include: {
          predictions: {
            include: {
              market: true,
              category: true,
              sport: true,
            }
          },
          homeTeam: true,
          awayTeam: true,
          sport: true,
          competition: true,
        },
      });
      return { data: data ?? [], message: "", success: true };
    } catch (error) {
      handleError({ error, title: "Prediction" });
    }
  });
}
