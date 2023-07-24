import { Prisma } from "@prisma/client";
import { z } from "zod";
import { basicOptionsDto, idDto } from "./competition";

export const addMarketDto = z.object({
    name: z.string().min(1, {message: "Please enter name"}),
    categoryId: basicOptionsDto,
    sportId: basicOptionsDto,
})

export const updateMarketDto = idDto.merge(addMarketDto)

const marketWithCategoryAndSport = Prisma.validator<Prisma.MarketArgs>()({
    include: { sport: true, category: true },
  })

export type MarketWithCategoryAndSport = Prisma.MarketGetPayload<typeof marketWithCategoryAndSport>

export type iAddMarketDto = z.infer<typeof addMarketDto>
export type iUpdateMarketDto = z.infer<typeof updateMarketDto>