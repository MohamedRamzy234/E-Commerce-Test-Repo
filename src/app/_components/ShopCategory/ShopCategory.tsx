import { getShopCategory } from '@/api/Services/categoryApi';
import React from 'react'
import Image from 'next/image'




export default async function ShopCategory() {
    //call api
    const data = await getShopCategory();

  return (
<div className='my-5'>
<h2 className='text-2xl text-black border-l-green-400 border-l-4 px-4  font-bold mb-5'>Shop By <span className='text-green-600'>Category</span></h2>

<div className='grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4'>
{data.map((category)=> {return <div key={category._id} className='category'>
<div>
  <Image className='w-25 h-25 rounded-full' src={category.image} alt={category.name} width={200} height={200} />
  <h4>{category.name}</h4>
</div>
</div> })}
</div>
</div>  
   
  )       
 }
