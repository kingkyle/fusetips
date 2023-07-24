import { addMarketDto } from "~/dto/market";
import { adminProtectedProcedure } from "../api/trpc";
import { handleError } from "~/utils/error";
import { idDto } from "~/dto/competition";

export function addMarketProcedure() {
  return adminProtectedProcedure
    .input(addMarketDto)
    .mutation(async ({ input, ctx }) => {
      try {
        const data = await ctx.prisma.market.create({
          data: {
            name: input.name.toLowerCase(),
            categoryId: input.categoryId.value,
            sportId: input.sportId.value,
          },
        });
        return { data, message: "Market Added", success: true };
      } catch (error) {
        handleError({ error, title: "Market" });
      }
    });
}

export function listMarketProcedure() {
  return adminProtectedProcedure.query(async ({ ctx }) => {
    const data = await ctx.prisma.market.findMany({
      orderBy: [{ name: "asc" }],
      include: { sport: true, category: true },
    });
    return { data, message: "", success: true };
  });
}

export function listMarketBySportIDProcedure() {
  return adminProtectedProcedure.input(idDto).query(async ({ input, ctx }) => {
    const data = await ctx.prisma.market.findMany({
      where: { sportId: input.id },
      orderBy: [{ name: "asc" }],
      include: { sport: true, category: true },
    });
    return { data, message: "", success: true };
  });
}
