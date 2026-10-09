"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { resetPassword } from "@/api/actions/actions.auth";

type ResetPasswordData = {
  email: string;
  newPassword: string;
  confirmPassword: string;
};

export default function ResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailFromUrl = searchParams.get("email") ?? "";
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { control, handleSubmit, watch } =
    useForm<ResetPasswordData>({
      defaultValues: {
        email: emailFromUrl,
        newPassword: "",
        confirmPassword: "",
      },
    });

  async function submitForm(data: ResetPasswordData) {
    setIsSubmitting(true);

    try {
      const result = await resetPassword(
        data.email,
        data.newPassword
      );

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

      router.push("/Login");
    } catch {
      toast.add({
        type: "error",
        description: "Failed to reset password. Please try again.",
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
          FRESH CART
        </h1>

        <p className="w-full text-center font-['Quicksand'] text-base font-medium tracking-wide text-white sm:text-lg">
          Create your new password
        </p>

        
        {/* New Password */}
        <div className="flex w-full flex-col gap-2">
          <Controller
            name="newPassword"
            control={control}
            rules={{
              required: "New password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            }}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                className="w-full font-['Quicksand'] text-[20px] font-medium tracking-wide text-white"
              >
                <FieldLabel htmlFor={field.name}>
                  New Password
                </FieldLabel>

                <Input
                  {...field}
                  id={field.name}
                  type="password"
                  autoComplete="new-password"
                  placeholder="Enter your new password"
                  className="w-full rounded-[50px] border-[3px] border-white/20 bg-[#0e5e0c] px-8 py-3 text-xl text-white outline-none placeholder:text-white/60 focus-visible:ring-2 focus-visible:ring-white"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        {/* Confirm Password */}
        <div className="flex w-full flex-col gap-2">
          <Controller
            name="confirmPassword"
            control={control}
            rules={{
              required: "Please confirm your password",
              validate: (value) =>
                value === watch("newPassword") ||
                "Passwords do not match",
            }}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                className="w-full font-['Quicksand'] text-[20px] font-medium tracking-wide text-white"
              >
                <FieldLabel htmlFor={field.name}>
                  Confirm Password
                </FieldLabel>

                <Input
                  {...field}
                  id={field.name}
                  type="password"
                  autoComplete="new-password"
                  placeholder="Confirm your new password"
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
          {isSubmitting ? "Resetting..." : "Reset Password"}
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
      </form>
    </section>
  );
}


