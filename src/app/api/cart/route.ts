import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v2/cart",
    {
      headers: {
        token: token.token as string,
        "Content-Type": "application/json",
      },
    }
  );

  const payload = await response.json();

  if (!response.ok) {
    return NextResponse.json(
      payload,
      { status: response.status }
    );
  }

  return NextResponse.json(payload);
}
