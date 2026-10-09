'use client'
import React from 'react'
import Link from "next/link"
import {
  Field,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import { Controller, useForm } from "react-hook-form"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { loginSchema } from '@/Schema/loginSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from "zod";
import { toast } from "@/components/ui/toast"
import { signIn } from "next-auth/react";
import { userLogin, userRegister } from '@/api/actions/actions.auth'
import { useRouter } from 'next/navigation'
export type LoginData=zod.infer<typeof loginSchema> //إعملي type من الloginSchema


export default function Login() {
  const router=useRouter()
const {control,handleSubmit}=useForm<LoginData>({
 defaultValues:{
  email:'',
  password:'',  
 },
resolver:zodResolver(loginSchema)

})

async function submitForm(data:LoginData){
  const result = await signIn("credentials", {
    email: data.email,
    password: data.password,
    redirect: false,
  });
   console.log("SignIn result:", result);

  if (result?.ok) {
    toast.add({
      type: "success",
      description: "You have successfully logged in.",
    });

    router.push("/");
  } else {
    toast.add({
      type: "error",
      description: "Failed to login. Please check your email and password.",
    });
  }

//call api to register user
// const isLogin=await userLogin(data)
// if (isLogin) {
//   toast.add({
//     type: "success",
//     description: "You have successfully logged in.",
//   })
//   // router.push("/")
// }
// else {
//   toast.add({
//     type: "error",
//     description: "Failed to login. Please try again.",
//   });
// }
}
  return (
    
  <section ><svg viewBox="1437 116 1437 116" fill="none" xmlns="http://www.w3.org/2000/svg">
    
  </svg>
  <form  className="flex rounded-[30px] mx-auto p-5 flex-col items-center gap-5 bg-[#008225] 
  w-[700px] " onSubmit={handleSubmit(submitForm)}>
    <h1 className="pt-7 mx-auto text-white text-6xl font-bold font-['Quicksand'] tracking-widest">Sign in</h1>
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
   
    <Button type='submit' className="w-[300px] h-[62px] cursor-pointer bg-gradient-to-r bg-[#0e5e0c]  rounded-[10px] shadow-[4px_4px_60px_0px_rgba(0,0,0,0.25)] justify-center items-center gap-2.5 inline-flex text-white text-[32px] font-bold font-['Quicksand'] tracking-wide">Login</Button><span className="text-white text-[15px] font-medium font-['Quicksand'] tracking-tight">Already don't have a account ?   <Link href="/Register" className="text-[#000] cursor-pointer text-[15px] font-medium font-['Quicksand'] underline tracking-tight">Sign up</Link></span>
      <Link
  href="/ForgotPassword"
  className="text-sm font-medium text-white hover:underline"
>
  Forgot Password?
</Link>
  </form><svg viewBox="0 0 1190 195" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path />
  </svg>
  <Link
  href="/ForgotPassword"
  className="text-sm font-medium text-green-600 hover:underline"
>
  Forgot Password?
</Link>
</section>

  )
}
