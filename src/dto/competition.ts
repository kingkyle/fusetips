import { Prisma } from "@prisma/client";
import { z } from "zod";

export const idDto = z.object({
  id: z
    .string()
    .cuid({ message: "Invalid ID" })
    .min(1, { message: "ID is required" }),
});

export const basicOptionsDto = z.object({
  label: z.string({ required_error: "Invalid" }),
  value: z.string().cuid({ message: "Invalid" }),
}, {required_error: "Please select a value"});

export const addCompetitionDto = z.object({
  name: z.string().min(1, { message: "Please enter name" }),
  shortName: z.string().min(1, { message: "Please enter short name" }),
  countryId: basicOptionsDto,
  sportId: basicOptionsDto,
});

export const updateCompetitionDto = idDto.merge(addCompetitionDto);

const competitionWithCountryAndSport =
  Prisma.validator<Prisma.CompetitionArgs>()({
    include: { country: true, sport: true },
  });

export type iAddCompetitionDto = z.infer<typeof addCompetitionDto>;
export type iUpdateCompetitionDto = z.infer<typeof updateCompetitionDto>;
export type CompetitionWithCountryAndSport = Prisma.CompetitionGetPayload<
  typeof competitionWithCountryAndSport
>;
