'use client'
import { addTowishlist } from '@/api/actions/wishlistActions/addtowishlist'
// import { getwishlist } from '@/api/actions/wishlistActions/getwishlist'
import React, { ReactNode } from 'react'
import { toast } from "@/components/ui/toast"
import { useMutation,useQueryClient } from '@tanstack/react-query'
//call api add prod to Wishlist => get token
export default function AddtoWishlist({cls,child,prodId}:{cls?:string,child?:ReactNode,prodId:string}) {
    async function handleAddToWishlist(){
      mutate(prodId)
    }
     const {data,mutate}=useMutation({
      mutationFn: addTowishlist,
      onSuccess:(data)=>{
        toast.add({
           type: "success",
           description: data.message,
        }) 
        // query.invalidateQueries({queryKey:['getWishlist']})
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
    <>
  <button onClick={handleAddToWishlist} className={cls}>
        {child}
      </button>
      </>
  )
}
