'use server'

import { getTokenData } from "@/utilities/getTokenData"

export async function updateCart({prodId, count}: {prodId: string, count: number}) {
  const token = await getTokenData()

  if (!token) {
    throw new Error("Unauthorized")
  }

  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v2/cart/${prodId}`,
    {
      method: "PUT",
      body: JSON.stringify({
        count: count,
      }),
      headers: {
        token: token,
        "Content-Type": "application/json",
      },
    }
  )

  const payload = await response.json()

  if (!response.ok) {
    throw new Error(payload.message || "Failed to add product to cart")
  }

  return payload
}