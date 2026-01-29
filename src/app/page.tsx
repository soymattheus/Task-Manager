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
import { signIn } from "@/utils/auth-client";

const loginSchema = z.object({
  email: z.email("Enter a valid email address.."),
  password: z.string("Enter your password.").min(6, {
    message: "Enter your password.",
  }),
});

type LoginSchema = z.infer<typeof loginSchema>;

export default function Home() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });
  const [showPwd, setShowPwd] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onLogin(payload: LoginSchema) {
    setIsLoading(true);
    await signIn.email({
      email: payload.email,
      password: payload.password,
      fetchOptions: {
        onRequest: () => {
          setIsLoading(true);
        },
        onResponse: () => {
          setIsLoading(false);
        },
        onSuccess: () => {
          router.replace("/dashboard");
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
        <Button onClick={() => router.push("/register")}>Register</Button>
      </header>

      <main className="flex flex-col w-full md:w-2/6 gap-4 justify-center items-center my-auto">
        <p className="text-3xl font-bold">Login to your account</p>
        <form
          className="flex flex-col w-4/5 md:w-full border border-gray-300 gap-3 p-7 rounded-md"
          onSubmit={handleSubmit(onLogin)}
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
            <FieldLabel htmlFor="input-button-group">Password</FieldLabel>
            <ButtonGroup className="flex flex-1 w-full h-full outline-0 data-[disabled=true]:bg-[#F0F0F0]">
              <Input
                type={showPwd ? "password" : "text"}
                id="input-button-group"
                placeholder="Password"
                autoComplete="off"
                {...register("password")}
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowPwd(!showPwd)}
              >
                {showPwd ? <EyeOff /> : <Eye />}
              </Button>
            </ButtonGroup>
            <FieldError>{errors?.password?.message}</FieldError>
          </Field>

          <Button disabled={isLoading} type="submit">
            {isLoading ? "Loading" : "Login"}
          </Button>

          <div className="flex flex-col md:flex-row w-full justify-between items-center">
            <p className="font-normal text-[14px]">
              Don&apos;t have an account yet?
            </p>
            <Link
              href="/register"
              className="font-bold text-[14px] underline cursor-pointer"
            >
              Register
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
}
