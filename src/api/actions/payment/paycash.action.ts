'use server'

import { shippingData } from "@/app/checkout/CheckoutForm"
import { getTokenData } from "@/utilities/getTokenData"

export async function payCash(cartId: string,shippingAddress:shippingData) {
  const token = await getTokenData()

  if (!token) {
    throw new Error("Unauthorized")
  }

  const response = await fetch(
   `https://ecommerce.routemisr.com/api/v2/orders/${cartId}`,
    {
      method: "POST",
      body: JSON.stringify({
       
        shippingAddress:shippingAddress
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