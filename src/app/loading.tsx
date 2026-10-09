import React from 'react'
import { Spinner } from "@/components/ui/spinner"
import { cn } from "cn"
import { LoaderIcon } from "lucide-react"
export default function loading() {
 
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Spinner className="size-16 text-green-500" />
    </div>
    
  )
}

