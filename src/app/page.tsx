import Image from "next/image";
import FeaturedProducts from "./_components/FeaturedProducts/FeaturedProducts";
import img1 from '../assets/images/home-slider-1.d79601a8.png'
import img2 from '../assets/images/home-slider-1.d79601a8.png'
import img3 from '../assets/images/home-slider-1.d79601a8.png'
import Slider from "./_components/Slider/Slider";
import { Spinner } from "@/components/ui/spinner"
import dynamic from "next/dynamic";
const ShopCategory = dynamic(
  () => import("./_components/ShopCategory/ShopCategory"),
  {
    loading: () => (
      <div className="flex min-h-screen items-center justify-center">
      <Spinner className="size-16 text-green-500" />
    </div>
    ),
  }
);
export default function Home() {
  return (
    <>
    <Slider spaceBetween={0} slidesPerView={1} pageList={[img1.src, img2.src, img3.src]} />
    <ShopCategory />
   <FeaturedProducts />
   </>
  );
}
