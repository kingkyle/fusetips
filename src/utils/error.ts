import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";

export interface IErrorProps {
  title: string;
  error: Error | unknown;
}
export interface IError {
  message: string;
  code: string;
}

export function handleError({ error, title }: IErrorProps): IError {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code == "P2002") {
      throw new TRPCError({
        message: `${title} already exist`,
        code: "BAD_REQUEST",
      });
    }
  }
  throw new TRPCError({
    message: `Failed to create ${title}`,
    code: "BAD_REQUEST",
  });
}
