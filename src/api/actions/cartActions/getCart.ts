

import { getTokenData } from "@/utilities/getTokenData"

export async function getCart() {
  const token = await getTokenData()

  if (!token) {
    throw new Error("Unauthorized")
  }

  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v2/cart",
    {
      method: "GET",
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