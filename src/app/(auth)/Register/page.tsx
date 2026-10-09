'use client'
import React from 'react'
import Link from "next/link"
import {
  Field,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import { Controller, useForm } from "react-hook-form"
import { Input } from '@base-ui/react'
import { Button } from '@/components/ui/button'
import { registerSchema } from '@/Schema/registerSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from "zod";
import { toast } from "@/components/ui/toast"
import { userRegister } from '@/api/actions/actions.auth'
import { useRouter } from 'next/navigation'
export type UserData=zod.infer<typeof registerSchema>


export default function Register() {
  const router=useRouter()
const {control,handleSubmit}=useForm<UserData>({
 defaultValues:{
  name:'',
  email:'',
  phone:'',
  password:'',
  rePassword:'',
 },
resolver:zodResolver(registerSchema)

})

async function submitForm(data:UserData){
console.log(data)
//call api to register user
const isRegistered=await userRegister(data)
if (isRegistered) {
  toast.add({
    type: "success",
    description: "You have successfully registered.",
  })
  router.push("/Login")
}
else {
  toast.add({
    type: "error",
    description: "Failed to register. Please try again.",
  });
}}
  return (
  <section ><svg viewBox="1437 116 1437 116" fill="none" xmlns="http://www.w3.org/2000/svg">
    
  </svg>
  <form  className="flex rounded-[30px] mx-auto p-5 flex-col items-center gap-5 bg-[#008225] 
  w-[700px] " onSubmit={handleSubmit(submitForm)}>
    <h1 className="pt-7 mx-auto text-white text-6xl font-bold font-['Quicksand'] tracking-widest">Sign up</h1>
    <div className="flex w-full gap-16">
      <div className="flex  flex-col gap-2 w-full ">
        <Controller
          name="name"
          control={control}
          render={({ field,fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="w-full text-white text-[20px] font-medium font-['Quicksand'] tracking-wide">
              <FieldLabel className="w-full text-white text-[20px] font-medium font-['Quicksand'] tracking-wide" htmlFor={field.name}>Name</FieldLabel>
              <Input {...field} 
              id={field.name} 
              placeholder="Enter your Full Name" className="w-full text-white bg-[#0e5e0c]  outline-none bg-lime-[#270082] outl0ine-[#000] py-3 px-8 text-xl rounded-[50px] border-[3px] " type="text" />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]}/>
              )}
            </Field>
          )}
        />
      </div>
    </div>
    <div className="flex  flex-col gap-2 w-full ">
       <Controller
          name="email"
          control={control}
          render={({ field,fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="w-full text-white text-[20px] font-medium font-['Quicksand'] tracking-wide">
              <FieldLabel className="w-full text-white text-[20px] font-medium font-['Quicksand'] tracking-wide" htmlFor={field.name}>Email</FieldLabel>
              <Input {...field} 
              id={field.name} 
              placeholder="Enter your Email" className="w-full text-white bg-[#0e5e0c]  outline-none bg-lime-[#270082] outl0ine-[#000] py-3 px-8 text-xl rounded-[50px] border-[3px] " type="email" />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]}/>
              )}
            </Field>
          )}
        />
    </div>
    <div className="flex  flex-col gap-2 w-full ">
       <Controller
          name="phone"
          control={control}
          render={({ field,fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="w-full text-white text-[20px] font-medium font-['Quicksand'] tracking-wide">
              <FieldLabel className="w-full text-white text-[20px] font-medium font-['Quicksand'] tracking-wide" htmlFor={field.name}>Phone Number</FieldLabel>
              <Input {...field} 
              id={field.name} 
              placeholder="Enter your Phone Number" className="w-full text-white bg-[#0e5e0c]  outline-none bg-lime-[#270082] outl0ine-[#000] py-3 px-8 text-xl rounded-[50px] border-[3px] " type="tel" />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]}/>
              )}
            </Field>
          )}
        />
    </div>
    <div className="flex  flex-col gap-2 w-full ">
       <Controller
          name="password"
          control={control}
          render={({ field,fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="w-full text-white text-[20px] font-medium font-['Quicksand'] tracking-wide">
              <FieldLabel className="w-full text-white text-[20px] font-medium font-['Quicksand'] tracking-wide" htmlFor={field.name}>Password</FieldLabel>
              <Input {...field} 
              id={field.name} 
              placeholder="Enter your Password" className="w-full text-white bg-[#0e5e0c]  outline-none bg-lime-[#270082] outl0ine-[#000] py-3 px-8 text-xl rounded-[50px] border-[3px] " type="password" />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]}/>
              )}
            </Field>
          )}
        />
    </div>
    <div className="flex  flex-col gap-2 w-full ">
      <Controller
        name="rePassword"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="w-full text-white text-[20px] font-medium font-['Quicksand'] tracking-wide">
            <FieldLabel className="w-full text-white text-[20px] font-medium font-['Quicksand'] tracking-wide" htmlFor={field.name}>Confirm Password</FieldLabel>
            <Input {...field} 
              id={field.name} 
              placeholder="Confirm your Password" className="w-full text-white bg-[#0e5e0c]  outline-none bg-lime-[#270082] outl0ine-[#000] py-3 px-8 text-xl rounded-[50px] border-[3px] " type="password" />
            {fieldState.invalid && (
              <FieldError errors={[fieldState.error]}/>
            )}
          </Field>
        )}
      />
    </div>
    <div className="flex gap-2   items-center w-[505px] h-[38px] ">
     <input
  type="checkbox"
  className="w-[23px] h-[23px] cursor-pointer appearance-none border-2 border-[#0e5e0c] rounded-[5px] bg-white checked:bg-black transition"
/>
<span className="text-white text-[15px] font-normal font-['Quicksand'] tracking-tight">
  I hereby confirm that I have read all the Terms & Conditions carefully and I agree with the same.
</span>
    </div>
    <Button type='submit' className="w-[300px] h-[62px] cursor-pointer bg-gradient-to-r bg-[#0e5e0c]  rounded-[10px] shadow-[4px_4px_60px_0px_rgba(0,0,0,0.25)] justify-center items-center gap-2.5 inline-flex text-white text-[32px] font-bold font-['Quicksand'] tracking-wide">Sign up</Button><span className="text-white text-[15px] font-medium font-['Quicksand'] tracking-tight">Already have a account ? <span className="text-[#000] cursor-pointer text-[15px] font-medium font-['Quicksand'] underline tracking-tight"><Link href='/Login'>Login</Link></span></span>
  </form>
  <svg viewBox="0 0 1190 195" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path />
  </svg>
</section>

  )
}
