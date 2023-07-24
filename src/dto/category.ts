import { Prisma } from "@prisma/client";
import { z } from "zod";
import { basicOptionsDto, idDto } from "./competition";

export const addCategoryDto = z.object({
  name: z.string().min(1, { message: "Please enter name" }),
  sportId: basicOptionsDto,
});

export const updateCategoryDto = idDto.merge(addCategoryDto);

const categoryWithMarketsAndSports =
  Prisma.validator<Prisma.MarketCategoryArgs>()({
    include: { sport: true },
  });

export type CategoryWithMarketsAndSports = Prisma.MarketCategoryGetPayload<
  typeof categoryWithMarketsAndSports
>;

export type iAddCategoryDto = z.infer<typeof addCategoryDto>;
export type iUpdateCategoryDto = z.infer<typeof updateCategoryDto>;
