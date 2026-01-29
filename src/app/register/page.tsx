"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Eye, EyeOff, ListCheck } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn, signUp } from "@/utils/auth-client";
import { toast } from "sonner";

const registerSchema = z
  .object({
    email: z.email("Enter a valid email address.."),
    password: z.string("Enter your password.").min(6, {
      message: "Enter your password.",
    }),
    confirmPassword: z.string("Confirm your password.").min(6, {
      message: "Confirm your password.",
    }),
    name: z
      .string("Enter a valid name.")
      .min(1, "Name is required.")
      .refine((value) => value.trim().split(/\s+/).length >= 2, {
        message: "Please, enter your name and lastname.",
      })
      .regex(/^[a-z A-Z]+$/, {
        message: "The field should contain only letters.",
      })
      .trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

type RegisterSchema = z.infer<typeof registerSchema>;

export default function Register() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });
  const [showPwd, setShowPwd] = React.useState<boolean>(false);
  const [showConfirmPwd, setShowConfirmPwd] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onRegister(payload: RegisterSchema) {
    await signUp.email({
      email: payload.email,
      password: payload.password,
      name: payload.name,
      callbackURL: "/dashboard",
      fetchOptions: {
        onResponse: () => {
          setIsLoading(false);
        },
        onRequest: () => {
          setIsLoading(true);
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
        onSuccess: () => {
          router.push("/dashboard");
        },
      },
    });
  }
  return (
    <div className="flex flex-col w-full min-h-screen items-center justify-between bg-white font-sans">
      <header className="flex flex-row w-full py-4 px-6 border-b border-gray-300 justify-between items-center">
        <div className="flex flex-row gap-2 p-1.5 rounded-md border border-gray-300">
          <ListCheck />
          Task Manager
        </div>
        <Button onClick={() => router.push("/")}>Login</Button>
      </header>

      <main className="flex flex-col w-full md:w-2/6 gap-4 justify-center items-center my-auto">
        <p className="text-3xl font-bold">Register your account</p>
        <form
          className="flex flex-col w-4/5 md:w-full border border-gray-300 gap-3 p-7 rounded-md"
          onSubmit={handleSubmit(onRegister)}
        >
          {/* E-mail */}
          <Field data-invalid={errors.email}>
            <FieldLabel htmlFor="fieldgroup-email">E-mail</FieldLabel>
            <Input
              id="fieldgroup-email"
              type="text"
              placeholder="name@example.com"
              {...register("email")}
            />
            <FieldError>{errors?.email?.message}</FieldError>
          </Field>

          {/* Password */}
          <Field data-invalid={errors.password}>
            <FieldLabel htmlFor="input-button-password">Password</FieldLabel>
            <ButtonGroup className="flex flex-1 w-full h-full outline-0 data-[disabled=true]:bg-[#F0F0F0]">
              <Input
                type={showPwd ? "text" : "password"}
                id="input-button-password"
                placeholder="Password"
                autoComplete="off"
                {...register("password")}
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowPwd(!showPwd)}
              >
                {showPwd ? <Eye /> : <EyeOff />}
              </Button>
            </ButtonGroup>
            <FieldError>{errors?.password?.message}</FieldError>
          </Field>

          {/* Confirm Password */}
          <Field data-invalid={errors.password}>
            <FieldLabel htmlFor="input-button-confirm-password">
              Confirm password
            </FieldLabel>
            <ButtonGroup className="flex flex-1 w-full h-full outline-0 data-[disabled=true]:bg-[#F0F0F0]">
              <Input
                type={showConfirmPwd ? "text" : "password"}
                id="input-button-confirm-password"
                placeholder="Confirm Password"
                autoComplete="off"
                {...register("confirmPassword")}
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowConfirmPwd(!showConfirmPwd)}
              >
                {showConfirmPwd ? <Eye /> : <EyeOff />}
              </Button>
            </ButtonGroup>
            <FieldError>{errors?.confirmPassword?.message}</FieldError>
          </Field>

          <hr className="border-gray-300" />

          {/* Name */}
          <Field data-invalid={errors.name}>
            <FieldLabel htmlFor="fieldgroup-name">Full name</FieldLabel>
            <Input
              id="fieldgroup-name"
              type="text"
              placeholder="Type your full name"
              autoComplete="off"
              {...register("name")}
            />
            <FieldError>{errors?.name?.message}</FieldError>
          </Field>

          <Button disabled={isLoading} type="submit">
            {isLoading ? "Loading" : "Register"}
          </Button>

          <div className="flex flex-col md:flex-row w-full justify-between items-center">
            <p className="font-normal text-[14px]">
              Do you already have an account?
            </p>
            <Link
              href="/"
              className="font-bold text-[14px] underline cursor-pointer"
            >
              Login
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
}
