"use client";

import { type GetServerSidePropsContext } from "next";
import { signIn } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import SubmitButton from "~/components/Forms/Button";
import Input from "~/components/Forms/Input";
import SimpleNav from "~/components/Nav";
import { loginDto, type iLoginDto } from "~/dto/auth";
import { getServerAuthSession } from "~/server/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import Router from "next/router";
import type { ISessionUser } from "~/components/Shared/shared";

export default function LoginPage() {
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<iLoginDto>({
    resolver: zodResolver(loginDto),
  });

  const handleLogin: SubmitHandler<iLoginDto> = async (data) => {
    setIsLoading(true);
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
      callbackUrl: "/account",
    });
    if (res?.error) {
      setIsLoading(false);
      toast.error("Invalid Login");
      return;
    }
    if (res?.ok) {
      await Router.push("/account");
      return;
    }
    setIsLoading(false);
  };
  return (
    <div>
      <Head>
        <title>Fuse Tips - Login</title>
      </Head>
      <SimpleNav />
      <div className="mx-2 mt-10">
        <div className="container mx-auto rounded-lg bg-tip-lightblue p-8 text-white md:w-[30rem]">
          <h1 className="mb-10 text-center text-2xl font-bold">
            Login to FuseTips
          </h1>
          <form onSubmit={handleSubmit(handleLogin)} noValidate>
            <Input
              label={{ children: "Email Address" }}
              input={{
                type: "email",
                placeholder: "Enter email address",
                ...register("email"),
              }}
              error={{
                children: errors.email?.message,
              }}
            />
            <Input
              label={{ children: "Password" }}
              input={{
                type: "password",
                placeholder: "Enter password",
                ...register("password"),
              }}
              error={{
                children: errors.password?.message,
              }}
            />

            <SubmitButton
              className="btn-primary mb-6 mt-6 block w-full font-semibold text-white"
              type="submit"
              isLoading={isLoading}
              disabled={isLoading}
            >
              Login
            </SubmitButton>
          </form>
          <p className="text-center">
            Not a Member yet?{" "}
            <span>
              <Link
                href="/register"
                className="link-hover link text-tip-orange"
              >
                Register now
              </Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerAuthSession(context);

  if (session && (session.user as ISessionUser)?.role == "user") {
    return { redirect: { destination: "/account" } };
  }
  if (session && (session.user as ISessionUser)?.role == "admin") {
    return { redirect: { destination: "/admin" } };
  }
  return {
    props: {},
  };
}
