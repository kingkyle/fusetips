import { addSportDto } from "~/dto/sport";
import { adminProtectedProcedure } from "../api/trpc";
import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";

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
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code == "P2002") {
            throw new Error("Sport already exist");
          }
        }
        throw new TRPCError({
          message: "Failed to create sport",
          code: "BAD_REQUEST",
        });
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
