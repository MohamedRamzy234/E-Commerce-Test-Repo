'use client'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// Import Swiper styles

import Image from 'next/image';
type SliderType = {
    spaceBetween:number,
    slidesPerView:number,
    pageList:string[]
}

export default function Slider({spaceBetween,slidesPerView,pageList}:SliderType) {
  return (
    <Swiper
    loop={true}
    modules={[Navigation, Pagination]}
      navigation
     pagination={{
  clickable: true,
     
    renderBullet: (index, className) =>
     `<span class="${className}" style="background:white;  width: 8px !important;
  height: 8px !important;
  background: white !important;
  opacity: 0.5;
  border-radius: 50%;
  transition: all 0.3s ease;"></span>`,
      bulletActiveClass:'w-10! rounded-3xl opacity-80!' }}

      spaceBetween={spaceBetween}
      slidesPerView={slidesPerView}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {pageList.map((src,index) => (
        <SwiperSlide key={index}  >
          <Image src={src} alt='' className='w-full h-80 object-cover' width={400} height={400}  />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
