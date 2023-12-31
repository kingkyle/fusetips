import { addCategoryDto } from "~/dto/category";
import { adminProtectedProcedure } from "../api/trpc";
import { handleError } from "~/utils/error";
import { idDto } from "~/dto/competition";

export function addCategoryProcedure() {
  return adminProtectedProcedure
    .input(addCategoryDto)
    .mutation(async ({ input, ctx }) => {
      try {
        const data = await ctx.prisma.marketCategory.create({
          data: {
            name: input.name.toLowerCase(),
            sportId: input.sportId.value,
          },
        });
        return { data, message: "Market Category Added", success: true };
      } catch (error) {
        handleError({ error, title: "Market Category" });
      }
    });
}

export function listCatergoryProcedure() {
  return adminProtectedProcedure.query(async ({ ctx }) => {
    const data = await ctx.prisma.marketCategory.findMany({
      orderBy: [{ name: "asc" }],
      include: { sport: true },
    });
    return { data, message: "", success: true };
  });
}

export function listCatergoryBySportIdProcedure() {
  return adminProtectedProcedure.input(idDto).query(async ({ input, ctx }) => {
    const data = await ctx.prisma.marketCategory.findMany({
      where: { sportId: input.id },
      orderBy: [{ name: "asc" }],
    });
    return { data, message: "", success: true };
  });
}
