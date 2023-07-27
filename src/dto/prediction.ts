import { z } from "zod";
import { basicOptionsDto } from "./competition";
import { Prisma } from "@prisma/client";

export const addPredictionDto = z.object({
  odd: z.union([z.number(), z.string()]).optional(),
  rating: z.number().optional(),
  marketId: basicOptionsDto,
  categoryId: basicOptionsDto,
  matchId: z
    .string({ required_error: "No Match Selected" })
    .cuid({ message: "Invalid Match" }),
  sportId: z
    .string({ required_error: "No Sport Selected" })
    .cuid({ message: "Invalid sport" }),
  result: z.string().optional(),
  status: z
    .union([z.literal("pending"), z.literal("success"), z.literal("failed")])
    .default("pending"),
  isBanker: z
    .object({
      label: z.string(),
      value: z
        .union([
          z.literal("true", { description: "Invalid Data" }),
          z.literal("false"),
        ])
        .default("false"),
    })
    .nullable()
    .transform((value, ctx) => {
      if (value == null) {
        ctx.addIssue({
          code: "custom",
          message: "please select a value",
        });
        return z.NEVER;
      }
      return value;
    }),
});


const predictionWithCategoryAndMarket = Prisma.validator<Prisma.PredictionArgs>()({
  include: {
    sport: true,
    category: true,
    market: true
  },
});

export type iPredictionWithCategoryAndMarket = Prisma.PredictionGetPayload<typeof predictionWithCategoryAndMarket>

export type iAddPredicitionDto = z.input<typeof addPredictionDto>;
export type iAddPredicitionOutDto = z.output<typeof addPredictionDto>;
