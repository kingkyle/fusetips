import { zodResolver } from "@hookform/resolvers/zod";
import type { GetServerSidePropsContext } from "next";
import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import React from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import SubmitButton from "~/components/Forms/Button";
import Input from "~/components/Forms/Input";
import SimpleNav from "~/components/Nav";
import { type iRegisterDto, registerDto } from "~/dto/auth";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/utils/api";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<iRegisterDto>({
    resolver: zodResolver(registerDto),
  });

  const registerM = api.auth.register.useMutation({
    onSuccess: async () => {
      reset();
      toast.success("Welcome to Fusetips");
      await Router.push("/login");
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleRegister: SubmitHandler<iRegisterDto> = (data) => {
    registerM.mutate({
      first_name: data.first_name,
      email: data.email,
      last_name: data.last_name,
      password: data.password,
      username: data.username,
    });
  };

  return (
    <div>
      <Head>
        <title>Fuse Tips - Register</title>
      </Head>
      <SimpleNav />
      <div className="mx-2 mt-10">
        <div className="container mx-auto rounded-lg bg-tip-lightblue p-8 text-white md:w-[30rem]">
          <h1 className="mb-10 text-center text-2xl font-bold">
            Welcome FuseTips
          </h1>
          <form onSubmit={handleSubmit(handleRegister)}>
            <Input
              label={{ children: "First name" }}
              input={{
                type: "text",
                placeholder: "Enter first name",
                ...register("first_name"),
              }}
              error={{
                children: errors.first_name?.message,
              }}
            />
            <Input
              label={{ children: "Last name" }}
              input={{
                type: "text",
                placeholder: "Enter last name",
                ...register("last_name"),
              }}
              error={{
                children: errors.last_name?.message,
              }}
            />
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
              label={{ children: "Username" }}
              input={{
                type: "text",
                placeholder: "Enter username",
                ...register("username"),
              }}
              error={{
                children: errors.username?.message,
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
              disabled={registerM.isLoading}
              isLoading={registerM.isLoading}
            >
              Register
            </SubmitButton>
          </form>
          <p className="text-center">
            Already a Member?{" "}
            <span>
              <Link href="/login" className="link-hover link text-tip-orange">
                Login
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

  if (session) {
    return { redirect: { destination: "/account" } };
  }
  return {
    props: {},
  };
}
