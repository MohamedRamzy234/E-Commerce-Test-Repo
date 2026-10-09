'use server'

import { shippingData } from "@/app/checkout/CheckoutForm"
import { getTokenData } from "@/utilities/getTokenData"

export async function payOnline(cartId: string,shippingAddress:shippingData) {
  const token = await getTokenData()

  if (!token) {
    throw new Error("Unauthorized")
  }

  const response = await fetch(
   `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${process.env.NEXTAUTH_URL}`,
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