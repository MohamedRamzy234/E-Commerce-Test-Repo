"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";

import { verifyResetCode } from "@/api/actions/actions.auth";

type VerifyResetCodeData = {
  resetCode: string;
};

export default function VerifyResetCode() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email") ?? "";

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { control, handleSubmit } = useForm<VerifyResetCodeData>({
    defaultValues: {
      resetCode: "",
    },
  });

  async function submitForm(data: VerifyResetCodeData) {
    setIsSubmitting(true);

    try {
      const result = await verifyResetCode(data.resetCode);

      if (!result.success) {
        toast.add({
          type: "error",
          description: result.message,
        });

        return;
      }

      toast.add({
        type: "success",
        description: result.message,
      });

      const nextUrl = email
        ? `/ResetPassword?email=${encodeURIComponent(email)}`
        : "/ResetPassword";

      router.push(nextUrl);
    } catch {
      toast.add({
        type: "error",
        description: "Failed to verify reset code. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="px-4 py-10">
      <form
        onSubmit={handleSubmit(submitForm)}
        className="mx-auto flex w-full max-w-[700px] flex-col items-center gap-5 rounded-[30px] bg-[#008225] p-5 sm:p-8"
      >
        <h1 className="mx-auto pt-7 text-center font-['Quicksand'] text-4xl font-bold tracking-widest text-white sm:text-5xl md:text-6xl">
          Verify Reset Code
        </h1>

        <p className="w-full text-center font-['Quicksand'] text-base font-medium tracking-wide text-white sm:text-lg">
          Enter the reset code sent to your email.
        </p>

        <div className="flex w-full flex-col gap-2">
          <Controller
            name="resetCode"
            control={control}
            rules={{
              required: "Reset code is required",
              validate: (value) =>
                value.trim().length > 0 ||
                "Please enter the reset code",
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
                  Reset Code
                </FieldLabel>

                <Input
                  {...field}
                  id={field.name}
                  type="text"
                  placeholder="Enter your reset code"
                  autoComplete="one-time-code"
                  className="w-full rounded-[50px] border-[3px] border-white/20 bg-[#0e5e0c] px-8 py-3 text-xl text-white outline-none placeholder:text-white/60 focus-visible:ring-2 focus-visible:ring-white"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-[62px] w-full max-w-[300px] items-center justify-center gap-2.5 rounded-[10px] bg-[#0e5e0c] text-2xl font-bold tracking-wide text-white shadow-[4px_4px_60px_0px_rgba(0,0,0,0.25)] hover:bg-[#094a08] disabled:opacity-60 sm:text-[28px]"
        >
          {isSubmitting ? "Verifying..." : "Verify Code"}
        </Button>

        <span className="text-center font-['Quicksand'] text-[15px] font-medium tracking-tight text-white">
          Remember your password?{" "}
          <Link
            href="/Login"
            className="cursor-pointer font-medium text-black underline"
          >
            Login
          </Link>
        </span>

        <Link
          href="/ForgotPassword"
          className="text-sm font-medium text-white underline hover:text-white/80"
        >
          Send a new reset code
        </Link>
      </form>
    </section>
  );
}