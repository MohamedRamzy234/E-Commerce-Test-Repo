import Link from "next/link";
import { getAllBrands } from "@/api/Services/brandApi";

export default async function Brands() {
  const brand = await getAllBrands();

  return (
    <section className="w-full bg-slate-50/50 font-sans">
      {/* Top Purple Gradient Banner */}
      <div className="w-full bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 px-6 py-10 text-white md:px-12 lg:px-16">
        <div className="mx-auto max-w-7xl">
          {/* Breadcrumbs */}
          <nav className="mb-4 text-xs font-normal text-purple-100/90 sm:text-sm">
            <Link
              href="/"
              className="transition-colors hover:text-white hover:underline"
            >
              Home
            </Link>

            <span className="mx-1.5 opacity-70">/</span>

            <span className="font-semibold text-white">Brands</span>
          </nav>

          {/* Banner Header Info */}
          <div className="flex items-center gap-4">
            {/* Tag Icon Box */}
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/20 p-2.5 backdrop-blur-md sm:h-16 sm:w-16">
              <svg
                className="h-7 w-7 text-white sm:h-8 sm:w-8"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.659A2.25 2.25 0 009.568 3z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 6h.008v.008H6V6z"
                />
              </svg>
            </div>

            {/* Title & Description */}
            <div>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                Top Brands
              </h1>

              <p className="mt-1 text-xs font-normal text-purple-100 sm:text-sm">
                Shop from your favorite brands
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Brands Cards Grid */}
      <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8 lg:px-12">
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {brand.map((item) => (
            <Link
              key={item._id}
              href={`/products?brand=${item._id}&brandName=${encodeURIComponent(item.name)}`}
              className="group flex flex-col items-center justify-between rounded-2xl border border-gray-200/80 bg-white p-4 shadow-sm transition-all duration-300 hover:border-purple-300 hover:shadow-[0_4px_20px_rgba(168,85,247,0.25)]"
            >
              {/* Inner Logo Box */}
              <div className="flex h-36 w-full items-center justify-center rounded-xl bg-gray-50/80 p-4 transition-all duration-300 group-hover:bg-gray-50 group-hover:shadow-[0_2px_12px_rgba(168,85,247,0.15)]">
                <img
                  src={item.image}
                  alt={item.name}
                  className="max-h-16 max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Brand Name & Hover Link Container */}
              <div className="mt-4 flex flex-col items-center text-center">
                <span className="text-sm font-semibold text-gray-700 transition-colors duration-200 group-hover:text-purple-600">
                  {item.name}
                </span>

                {/* View Products Link - Appears smoothly on hover */}
                <div className="mt-1 flex translate-y-1 items-center justify-center gap-1 text-xs font-medium text-purple-600 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <span>View Products</span>

                  <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                    →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

