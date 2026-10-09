'use server'

import { getTokenData } from "@/utilities/getTokenData"

export async function clearCart() {
  const token = await getTokenData()

  if (!token) {
    throw new Error("Unauthorized")
  }
try{
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v2/cart`,
    {
      method: "DELETE",
     
      headers: {
        token: token,
        "Content-Type": "application/json",
      },
    }
  )
 if (!response.ok) {
    throw new Error ("Failed to delete product to cart")
  }

  const payload = await response.json()

 
  return payload
}catch(error){

  throw new Error ("Unauthorized")
}
}