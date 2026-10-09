'use server'

import { getTokenData } from "@/utilities/getTokenData"
//وانا بعمل call لل function هبعت الprodId
export async function deleteWishlistItem(prodId: string) {
  const token = await getTokenData()

  if (!token) {
    throw new Error("Unauthorized")
  }

  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/wishlist/${prodId}`,
    {
      method: "DELETE",
    
      headers: {
        token: token,
        "Content-Type": "application/json",
      },
    }
  )

  const payload = await response.json()

  if (!response.ok) {
    throw new Error(payload.message || "Failed to add product to wishlist")
  }

  return payload
}