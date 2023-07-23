import { z } from "zod";

export const addSportDto = z.object({
  name: z
    .string({ required_error: "Please enter name" })
    .min(1, { message: "Please enter name" }),
});

export type iAddSportDto = z.infer<typeof addSportDto>;

export const deleteSportDto = z.object({
  id: z
    .string()
    .uuid({ message: "Invalid ID" })
    .min(1, { message: "ID is required" }),
});

export type iDeleteSportDto = z.infer<typeof deleteSportDto>;

export const updateSportDto = addSportDto.merge(deleteSportDto);

export type iUpdateSportDto = z.infer<typeof updateSportDto>;
