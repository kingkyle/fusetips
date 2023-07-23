import { addSportDto } from "~/dto/sport";
import { adminProtectedProcedure } from "../api/trpc";
import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";

export function addCountryProcedure() {
  return adminProtectedProcedure
    .input(addSportDto)
    .mutation(async ({ input: { name }, ctx }) => {
      try {
        const country = await ctx.prisma.country.create({
          data: {
            name: name.toLowerCase(),
          },
        });
        return { data: country, message: "Country Added", success: true };
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code == "P2002") {
            throw new Error("Country already exist");
          }
        }
        throw new TRPCError({
          message: "Failed to create country",
          code: "BAD_REQUEST",
        });
      }
    });
}

export function listCountryProcedure() {
  return adminProtectedProcedure.query(async ({ ctx }) => {
    const country = await ctx.prisma.country.findMany({
      orderBy: [{ name: "asc" }],
    });
    return { data: country, success: true, message: "" };
  });
}