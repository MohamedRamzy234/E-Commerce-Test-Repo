'use client'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import React from 'react'
import { Controller, Form, useForm } from 'react-hook-form'
import { toast } from "@/components/ui/toast"
import { useRouter } from 'next/navigation'
import { cartResponseType } from '@/api/Types/cartType'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Banknote, Check, CreditCard } from 'lucide-react'
import { payOnline } from '@/api/actions/payment/payonline.action'
import { payCash} from '@/api/actions/payment/paycash.action'
import { clearCart } from '@/api/actions/cartActions/clearCart.action'

export default function CheckoutForm({cartId}:{cartId:string}) {
  const queryClient = useQueryClient()
  const { data: cartData ,isLoading} = useQuery<cartResponseType>({
     queryKey:['getCart'],
     queryFn:async ()=>{
       const response = await fetch('/api/cart')
       if(!response.ok){
        throw new Error('Failed to fetch cart data')
       }
       return response.json()
  } 
})
   const router = useRouter()
    const { control, handleSubmit } = useForm<shippingData>({
        defaultValues: {
               details: '',
               phone: '',
               city: '',
               postalCode: '',
               paymentMethod: "cash"
  } 
        
    })
 async function submitForm(data: shippingData) {
  console.log(data)
  console.log(cartId)

  // Cash Payment
  if (data.paymentMethod === "cash") {
    const payload = await payCash(cartId, data)

    if (payload?.status === "success") {
      toast.add({
        type: "success",
        description: "Order Created Successfully",
      })
     await clearCart()
     queryClient.invalidateQueries({
  queryKey: ['getCart']
})
      router.push("/")
    } else {
      toast.add({
        type: "error",
        description: "Failed to create order",
      })
    }

    return
  }

  // Online Payment
  if (data.paymentMethod === "online") {
    const payloadOnline = await payOnline(cartId, data)

    if (payloadOnline?.status === "success") {
      toast.add({
        type: "success",
        description: "Order Created Successfully",
      })

      window.location.href = payloadOnline.session.url
    } else {
      toast.add({
        type: "error",
        description: "Failed to create online payment",
      })
    }

    return
  }
}
   
  return (
    <section className="bg-gray-100 py-20 px-6">
  <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
    {/* Checkout Form */}
    <div className="p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Payment Details</h2>
      <form className="space-y-5" onSubmit={handleSubmit(submitForm)}>
        <div>
         <Controller
          name="details"
          control={control}
          render={({ field,fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="w-full text-white text-[20px] font-medium font-['Quicksand'] tracking-wide">
              <FieldLabel className="w-full text-white text-[20px] font-medium font-['Quicksand'] tracking-wide" htmlFor={field.name}>Details</FieldLabel>
              <Input {...field} 
              id={field.name} 
              placeholder="Enter your Details" className="w-full text-white bg-[#0e5e0c]  outline-none bg-lime-[#270082] outl0ine-[#000] py-3 px-8 text-xl rounded-[50px] border-[3px] " type="text" />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]}/>
              )}
            </Field>
          )}
        />
        </div>
        <div>
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
        <div className="flex gap-4">
         <div className="flex  flex-col gap-2 w-full ">
       <Controller
          name="city"
          control={control}
          render={({ field,fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="w-full text-white text-[20px] font-medium font-['Quicksand'] tracking-wide">
              <FieldLabel className="w-full text-white text-[20px] font-medium font-['Quicksand'] tracking-wide" htmlFor={field.name}>City</FieldLabel>
              <Input {...field} 
              id={field.name} 
              placeholder="Enter your City" className="w-full text-white bg-[#0e5e0c]  outline-none bg-lime-[#270082] outl0ine-[#000] py-3 px-8 text-xl rounded-[50px] border-[3px] " type="text" />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]}/>
              )}
            </Field>
          )}
        />
    </div>
          <div className="flex  flex-col gap-2 w-full ">
      <Controller
        name="postalCode"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="w-full text-white text-[20px] font-medium font-['Quicksand'] tracking-wide">
            <FieldLabel className="w-full text-white text-[20px] font-medium font-['Quicksand'] tracking-wide" htmlFor={field.name}>Postal Code</FieldLabel>
            <Input {...field} 
              id={field.name} 
              placeholder="Enter your Postal Code" className="w-full text-white bg-[#0e5e0c]  outline-none bg-lime-[#270082] outl0ine-[#000] py-3 px-8 text-xl rounded-[50px] border-[3px] " type="text" />
            {fieldState.invalid && (
              <FieldError errors={[fieldState.error]}/>
            )}
          </Field>
        )}
      />
    </div>
        </div>
        <Button type='submit' className="w-[300px] h-[62px] cursor-pointer bg-gradient-to-r bg-[#0e5e0c]  rounded-[10px] shadow-[4px_4px_60px_0px_rgba(0,0,0,0.25)] justify-center items-center gap-2.5 inline-flex text-white text-[32px] font-bold font-['Quicksand'] tracking-wide">Place Order</Button>
      </form>
    </div>
    {/* Payment Methods & Summary */}
    <div className="bg-gray-50 p-8 border-l border-gray-200">
  <h3 className="text-xl font-semibold text-gray-700 mb-6">
    Choose Payment Method
  </h3>

  <Controller
    name="paymentMethod"
    control={control}
    render={({ field }) => (
      <div className="space-y-4">

        {/* Cash on Delivery */}
        <div
          onClick={() => field.onChange("cash")}
          className={`flex items-center p-4 rounded-lg border cursor-pointer transition-all
            ${
              field.value === "cash"
                ? "border-green-500 bg-green-50"
                : "border-gray-200 bg-white hover:border-green-300 hover:shadow-md"
            }
          `}
        >
          {/* Icon */}
          <div
            className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4
              ${
                field.value === "cash"
                  ? "bg-green-500 text-white shadow-sm"
                  : "bg-gray-100 text-gray-400"
              }
            `}
          >
            <Banknote size={23} />
          </div>

          {/* Text */}
          <div className="flex-1">
            <p className="text-gray-800 font-semibold">
              Cash on Delivery
            </p>

            <p className="text-gray-500 text-sm mt-1">
              Pay when your order arrives at your doorstep
            </p>
          </div>

          {/* Selected */}
          {field.value === "cash" && (
            <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center">
              <Check
                size={15}
                className="text-white"
                strokeWidth={3}
              />
            </div>
          )}
        </div>

        {/* Pay Online */}
        <div
          onClick={() => field.onChange("online")}
          className={`flex items-center p-4 rounded-lg border cursor-pointer transition-all
            ${
              field.value === "online"
                ? "border-green-500 bg-green-50"
                : "border-gray-200 bg-white hover:border-green-300 hover:shadow-md"
            }
          `}
        >
          {/* Icon */}
          <div
            className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4
              ${
                field.value === "online"
                  ? "bg-green-500 text-white shadow-sm"
                  : "bg-gray-100 text-gray-400"
              }
            `}
          >
            <CreditCard size={23} />
          </div>

          {/* Text */}
          <div className="flex-1">
            <p className="text-gray-800 font-semibold">
              Pay Online
            </p>

            <p className="text-gray-500 text-sm mt-1">
              Secure payment with Credit/Debit Card via Stripe
            </p>

            {/* Card Logos */}
            <div className="flex gap-2 mt-2">
              <span className="text-[9px] font-bold bg-blue-700 text-white px-1 rounded">
                VISA
              </span>

              <span className="text-[9px] font-bold bg-orange-500 text-white px-1 rounded">
                MC
              </span>

              <span className="text-[9px] font-bold bg-blue-500 text-white px-1 rounded">
                AMEX
              </span>
            </div>
          </div>

          {/* Selected */}
          {field.value === "online" && (
            <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center">
              <Check
                size={15}
                className="text-white"
                strokeWidth={3}
              />
            </div>
          )}
        </div>

      </div>
    )}
  />
</div>
  </div>
</section>
    
    
    
  )
}

export interface shippingData{
    details: string,
               phone: string,
               city: string,
               postalCode: string
               paymentMethod: string
}

