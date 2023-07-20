import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import * as bcrypt from "bcryptjs";
import { loginDto, registerDto } from "~/dto/auth";
import { TRPCError } from "@trpc/server";
import { Prisma } from "@prisma/client";

export const authRouter = createTRPCRouter({
  login: publicProcedure
    .input(loginDto)
    .mutation(async ({ input: { email, password }, ctx }) => {
      const user = await ctx.prisma.user.findFirst({ where: { email } });
      if (user != null) {
        const isMatch: boolean = await bcrypt.compare(password, user.password);
        if (isMatch) {
        }
      }
      return {};
    }),
  register: publicProcedure
    .input(registerDto)
    .mutation(async ({ input, ctx }) => {
      try {
        const { first_name, last_name, email, username, password } = input;
        const hashPass = await bcrypt.hash(password, 10);
        const newUser = await ctx.prisma.user.create({
          data: {
            first_name,
            last_name,
            email: email.toLowerCase(),
            username: username.toLowerCase(),
            password: hashPass,
            role: "user",
          },
        });
        return newUser;
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          console.log(error.message);
          if (error.code == "P2002") {
            throw new Error("Username or Email already exist");
          }
        }

        throw new TRPCError({
          message: "Unexpected Error",
          code: "BAD_REQUEST",
        });
      }
    }),
});
