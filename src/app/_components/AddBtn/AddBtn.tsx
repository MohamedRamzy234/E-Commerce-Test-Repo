"use client"

import React, { ReactNode } from "react"
import { toast } from "@/components/ui/toast"
import { addToCart } from "@/api/actions/cartActions/addToCart"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export default function AddBtn({
  cls,
  child,
  prodId,
}: {
  cls: string
  child: ReactNode
  prodId: string
}) {

  let query= useQueryClient()
  async function handleAddToCart() {
    mutate(prodId)
    // try {
    //   const data = await addToCart(prodId)

    //   console.log("Add to cart:", data)

    //   if (data?.message === "Product added successfully to your cart") {
    //     toast.add({
    //       type: "success",
    //       description: data.message,
    //     })
    //   }
    // } catch (error) {
    //   toast.add({
    //     type: "error",
    //     description:
    //       error instanceof Error ? error.message : "Login First",
    //   })
    // }
  }
  const { data, mutate } = useMutation({
  mutationFn: addToCart,
  onSuccess: (data) => {
    toast.add({
           type: "success",
           description: data.message,
        }) 
        query.invalidateQueries({queryKey:['getCart']})
 },
 onError: (error) => {
      toast.add({
        type: "error",
        description:
          error instanceof Error ? error.message : "Login First",
      })
 }
})
  return (
    <button onClick={handleAddToCart} className={cls}>
      {child}
    </button>
  )
}