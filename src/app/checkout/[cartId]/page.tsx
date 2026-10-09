import React from 'react'
import CheckoutForm from '../CheckoutForm'

type props={
  params: {
    cartId: string
  }
}
export default async function Checkout(props: props) {
  const  params = await props.params
  const {cartId }= params
  return (
    //form
    <CheckoutForm cartId={cartId} />
  )
}
