import { Prisma } from "@prisma/client";
import { z } from "zod";
import { basicOptionsDto, idDto } from "./competition";

export const addTeamDto = z.object({
  name: z.string().min(1, { message: "Please enter name" }),
  shortName: z.string().min(1, { message: "Please enter short name" }),
  countryId: basicOptionsDto,
  sportId: basicOptionsDto,
  competitions: z.union([
    basicOptionsDto.optional(),
    basicOptionsDto.array().optional(),
  ]),
});

export const updateTeamDto = idDto.merge(addTeamDto);

export const updateTeamCompetitonsDto = z.object({
  teamId: z.string().min(1).uuid(),
  competitions: z.union([z.string().optional(), z.string().array().optional()]),
});

const teamCompetitionsWithCompetitions =
  Prisma.validator<Prisma.TeamsCompetitionsArgs>()({
    include: {
      competition: true,
    },
  });

const teamWithCompAndSports = Prisma.validator<Prisma.TeamArgs>()({
  include: {
    sport: true,
    competitions: { include: { competition: true } },
    country: true,
  },
});

export type iAddTeamDto = z.infer<typeof addTeamDto>;
export type iUpdateTeamDto = z.infer<typeof updateTeamDto>;

export type TeamWithCompAndSports = Prisma.TeamGetPayload<
  typeof teamWithCompAndSports
>;

export type TeamCompetitionsWithCompetitions =
  Prisma.TeamsCompetitionsGetPayload<typeof teamCompetitionsWithCompetitions>;
