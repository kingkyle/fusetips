import { Prisma } from "@prisma/client";
import { z } from "zod";
import { basicOptionsDto, idDto } from "./competition";

export const baseMatchDto = z.object({
  homeTeamId: basicOptionsDto,
  awayTeamId: basicOptionsDto,
  competitionId: basicOptionsDto,
  countryId: basicOptionsDto,
  sportId: basicOptionsDto,
  date: z.date({
    required_error: "please enter date",
    invalid_type_error: "Invalid date",
  }),
});

export const matchSportCountryDto = z.object({
  countryId: z
    .string({
      required_error: "Please select country",
    })
    .cuid({ message: "Invalid Country" }),
  sportId: z
    .string({
      required_error: "Please select sport",
    })
    .cuid({ message: "Invalid Sport" }),
});

export const addMatchDto = baseMatchDto.superRefine(
  ({ homeTeamId, awayTeamId }, ctx) => {
    if (homeTeamId.value === awayTeamId.value) {
      ctx.addIssue({
        code: "custom",
        message: "Home and Away Teams cannot be the same",
      });
    }
  }
);

export const updateMatchDto = idDto.merge(baseMatchDto);

const matchWithCountryCompetitionAndSport =
  Prisma.validator<Prisma.MatchArgs>()({
    include: {
      sport: true,
      competition: true,
      country: true,
      homeTeam: true,
      awayTeam: true,
      predictions: {
        include: {
          market: true,
          category: true,
        },
      },
    },
  });

export type iMatchData = Prisma.MatchGetPayload<
  typeof matchWithCountryCompetitionAndSport
>;

export type iAddMatchDto = z.input<typeof addMatchDto>;
export type iAddMatchDtoOut = z.output<typeof addMatchDto>;
export type iUpdateMatchDto = z.infer<typeof updateMatchDto>;
export type iMatchSportCountryDto = z.infer<typeof matchSportCountryDto>;
