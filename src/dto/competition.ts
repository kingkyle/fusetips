import { Prisma } from "@prisma/client";
import { z } from "zod";

export const idDto = z.object({
  id: z
    .string()
    .cuid({ message: "Invalid ID" })
    .min(1, { message: "ID is required" }),
});

export const basicOptionsDto = z
  .object(
    {
      label: z
        .string({ required_error: "Invalid" })
        .min(1, "Please select value"),
      value: z
        .string()
        .cuid({ message: "Invalid" })
        .min(1, "Please select value"),
    },
    { required_error: "Please select a value", invalid_type_error: "Invalid" }
  )
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
  });

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

export type WithNullableFields<T, Fields> = {
  [K in keyof T]: K extends Fields ? T[K] | null | undefined : T[K];
};
export type iAddCompetitionDto = z.input<typeof addCompetitionDto>;
export type iAddCompetitionDtoOut = z.output<typeof addCompetitionDto>;
export type iUpdateCompetitionDto = z.infer<typeof updateCompetitionDto>;
export type CompetitionWithCountryAndSport = Prisma.CompetitionGetPayload<
  typeof competitionWithCountryAndSport
>;
