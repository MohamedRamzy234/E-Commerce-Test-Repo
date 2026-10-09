
"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";

import {
  Field,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { forgotPassword } from "@/api/actions/actions.auth";

type ForgotPasswordData = {
  email: string;
};

export default function ForgotPassword() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ForgotPasswordData>({
    defaultValues: {
      email: "",
    },
  });

  async function submitForm(data: ForgotPasswordData) {
    try {
      const result = await forgotPassword(data.email);

      toast.add({
        type: "success",
        description:
          result.message || "Reset code sent successfully.",
      });

      router.push(
        `/VerifyResetCode?email=${encodeURIComponent(data.email)}`
      );
    } catch (error) {
      toast.add({
        type: "error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to send reset code. Please try again.",
      });
    }
  }

  return (
    <section className="px-4 py-10">
      {/* Forgot Password Form */}
      <form
        onSubmit={handleSubmit(submitForm)}
        className="mx-auto flex w-full max-w-[700px] flex-col items-center gap-5 rounded-[30px] bg-[#008225] p-5 sm:p-8"
      >
        <h1 className="mx-auto pt-7 text-center font-['Quicksand'] text-4xl font-bold tracking-widest text-white sm:text-5xl md:text-6xl">
          Forgot Password
        </h1>

        <p className="w-full text-center font-['Quicksand'] text-base font-medium tracking-wide text-white sm:text-lg">
          Enter your email to reset your password
        </p>

        {/* Email */}
        <div className="flex w-full flex-col gap-2">
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address",
              },
            }}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                className="w-full font-['Quicksand'] text-[20px] font-medium tracking-wide text-white"
              >
                <FieldLabel
                  htmlFor={field.name}
                  className="w-full font-['Quicksand'] text-[20px] font-medium tracking-wide text-white"
                >
                  Email
                </FieldLabel>

                <Input
                  {...field}
                  id={field.name}
                  type="email"
                  placeholder="Enter your Email"
                  className="w-full rounded-[50px] border-[3px] border-white/20 bg-[#0e5e0c] px-8 py-3 text-xl text-white outline-none placeholder:text-white/60 focus-visible:ring-2 focus-visible:ring-white"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-[62px] w-full max-w-[300px] items-center justify-center gap-2.5 rounded-[10px] bg-[#0e5e0c] text-2xl font-bold tracking-wide text-white shadow-[4px_4px_60px_0px_rgba(0,0,0,0.25)] hover:bg-[#094a08] disabled:opacity-60 sm:text-[28px]"
        >
          {isSubmitting ? "Sending..." : "Send Reset Code"}
        </Button>

        {/* Back to Login */}
        <span className="text-center font-['Quicksand'] text-[15px] font-medium tracking-tight text-white">
          Remember your password?{" "}
          <Link
            href="/Login"
            className="cursor-pointer font-medium text-black underline"
          >
            Login
          </Link>
        </span>
      </form>

      {/* Bottom Decoration */}
      <svg
        viewBox="0 0 1190 195"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mt-8 w-full"
        aria-hidden="true"
      >
        <path />
      </svg>
    </section>
  );
}