'use server'
import { LoginData } from "@/app/(auth)/Login/page";
import { UserData } from "@/app/(auth)/Register/page";
import { cookies } from "next/headers";

export async function userRegister(data:UserData){
try {
  const response = await fetch('https://ecommerce.routemisr.com/api/v1/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const payload = await response.json();
  console.log(payload);

   return response.ok


} catch (error) {
  console.error('Error registering user:', error);
}

}
export async function userLogin(data:LoginData){
try {
  const response = await fetch('https://ecommerce.routemisr.com/api/v1/auth/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const payload = await response.json();
  console.log(payload);
  if(response.ok){
    const cookie = await cookies()
    cookie.set('userToken', payload.token, { path: '/' , httpOnly:true});
  }

   return response.ok


} catch (error) {
  console.error('Error registering user:', error);
}

}

export async function forgotPassword(email: string) {
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    }
  );

  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload.message || "Failed to send reset code");
  }

  return payload;
}
export async function resetPassword(
  email: string,
  newPassword: string
) {
  try {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          newPassword,
        }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.message || "Failed to reset password.",
      };
    }

    return {
      success: true,
      message: result.message || "Password reset successfully.",
    };
  } catch {
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}
export async function verifyResetCode(resetCode: string) {
  try {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resetCode: resetCode.trim(),
        }),
      }
    );

    const result = await response.json();

    if (!response.ok || result.status !== "Success") {
      return {
        success: false,
        message: result.message || "Invalid reset code.",
      };
    }

    return {
      success: true,
      message: result.message || "Reset code verified successfully.",
    };
  } catch {
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}