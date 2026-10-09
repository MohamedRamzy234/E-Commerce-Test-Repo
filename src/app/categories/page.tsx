import React from "react";
import Link from "next/link";
import { getShopCategory } from "@/api/Services/categoryApi";

export default async function Categories() {
  const data = await getShopCategory();

  return (
    <section className="w-full bg-slate-50/50 font-sans">
      {/* Top Green Banner */}
      <div className="w-full bg-emerald-600 px-6 py-10 text-white md:px-12 lg:px-16">
        <div className="mx-auto max-w-7xl">
          {/* Breadcrumbs */}
          <nav className="mb-4 text-xs font-normal text-green-100/90 sm:text-sm">
            <Link
              href="/"
              className="transition-colors hover:text-white hover:underline"
            >
              Home
            </Link>

            <span className="mx-1.5 opacity-70">/</span>

            <span className="font-semibold text-white">
              Categories
            </span>
          </nav>

          {/* Banner Header */}
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/20 p-2.5 backdrop-blur-md sm:h-16 sm:w-16">
              <svg
                className="h-8 w-8 text-white sm:h-9 sm:w-9"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M11.644 1.59a1 1 0 01.712 0l9 3.5a1 1 0 010 1.86l-9 3.5a1 1 0 01-.712 0l-9-3.5a1 1 0 010-1.86l9-3.5z" />
                <path d="M2.356 10.09a1 1 0 00-.712 1.86l9 3.5a1 1 0 00.712 0l9-3.5a1 1 0 00-.712-1.86l-8.644 3.361L2.356 10.09z" />
                <path d="M2.356 15.09a1 1 0 00-.712 1.86l9 3.5a1 1 0 00.712 0l9-3.5a1 1 0 00-.712-1.86l-8.644 3.361L2.356 15.09z" />
              </svg>
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                All Categories
              </h1>

              <p className="mt-1 text-xs font-normal text-green-100 sm:text-sm">
                Browse our wide range of product categories
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Cards Grid */}
      <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8 lg:px-12">
        {data.length === 0 ? (
          <p className="py-10 text-center text-gray-500">
            No categories found.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {data.map((category) => (
              <Link
                key={category._id}
                href={`/categories/${category._id}/subcategories`}
                className="group flex flex-col items-center justify-between rounded-2xl border border-gray-200/80 bg-white p-4 shadow-sm transition-all duration-300 hover:border-green-300 hover:shadow-[0_2px_12px_rgba(34,197,94,0.15)]"
              >
                {/* Category Image */}
                <div className="flex h-56 w-full items-center justify-center rounded-xl bg-gray-50/80 p-4 transition-all duration-300 group-hover:bg-gray-50 group-hover:shadow-[0_2px_12px_rgba(34,197,94,0.15)]">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Category Name */}
                <div className="mt-4 flex flex-col items-center text-center">
                  <span className="text-sm font-semibold text-gray-700 transition-colors duration-200 group-hover:text-green-600">
                    {category.name}
                  </span>

                  <div className="mt-1 flex translate-y-1 items-center justify-center gap-1 text-xs font-medium text-green-600 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <span>View Subcategories</span>

                    <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

