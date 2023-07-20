import { z } from "zod";

export const loginDto = z.object({
  email: z
    .string({
      required_error: "please enter email address",
    })
    .min(1, { message: "Please enter email address" })
    .email("Please enter a vaild email"),
  password: z
    .string({
      required_error: "Please enter password",
    })
    .min(1, { message: "Please enter password" })
    .min(4, "Password is too short"),
});

export type iLoginDto = z.infer<typeof loginDto>;

export const registerDto = z.object({
  first_name: z.string({
    required_error: "Please enter first name"
  }).min(1, "Please enter first name"),
  last_name: z.string({
    required_error: "Please enter last name"
  }).min(1, "Please enter last name"),
  username: z
    .string({
      required_error: "Please enter username"
    })
    .min(1, "Please enter username")
    .min(3, "Username is too short"),
  email: z
    .string({
      required_error: "please enter email address",
    })
    .min(1, { message: "Please enter email address" })
    .email("Please enter a vaild email"),
  password: z
    .string({
      required_error: "Please enter password",
    })
    .min(1, { message: "Please enter password" })
    .min(4, "Password is too short"),
});

export type iRegisterDto = z.infer<typeof registerDto>;
