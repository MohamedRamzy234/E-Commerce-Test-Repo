"use client";

import React from "react";
import { FaHeart, FaTrash } from "react-icons/fa";
import Link from "next/link";
import { ProductType } from "@/api/Types/producttypes";
import AddBtn from "../AddBtn/AddBtn";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "@/components/ui/toast";
import { deleteWishlistItem } from "@/api/actions/wishlistActions/deletewishlistitem";
import { Spinner } from '@/components/ui/spinner'
type WishlistResponse = {
  status: string;
  count: number;
  data: ProductType[];
};

export default function WishlistComp() {
  const queryClient = useQueryClient();

  const {
    data: wishlistData,
    isLoading,
    isError,
  } = useQuery<WishlistResponse>({
    queryKey: ["getWishlist"],
    queryFn: async () => {
      const response = await fetch("/api/wishlist");

      if (!response.ok) {
        throw new Error("Failed to fetch wishlist");
      }

      return response.json();
    },
  });

  const { mutate: delWishlistItem, isPending: isDeleting } =
    useMutation({
      mutationFn: deleteWishlistItem,

      onSuccess: () => {
        toast.add({
          type: "success",
          description: "Product Deleted Successfully",
        });

        queryClient.invalidateQueries({
          queryKey: ["getWishlist"],
        });
      },

      onError: (error) => {
        toast.add({
          type: "error",
          description:
            error instanceof Error
              ? error.message
              : "Product Deletion Failed",
        });
      },
    });

  // Loading state
  if (isLoading) {
    return (
     <div className="flex min-h-screen items-center justify-center">
      <Spinner className="size-16 text-green-500" />
    </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="flex min-h-[400px] items-center justify-center bg-white">
        <p className="text-sm text-red-500">
          Failed to load wishlist. Please try again.
        </p>
      </div>
    );
  }

  // Empty wishlist state
  if (!wishlistData?.data?.length) {
    return (
      <div className="flex min-h-[400px] w-full flex-col items-center justify-center bg-white p-6 text-center font-sans">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-100/80">
          <svg
            className="h-9 w-9 text-slate-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </div>

        <h2 className="mb-2 text-xl font-bold text-gray-900 sm:text-2xl">
          Your wishlist is empty
        </h2>

        <p className="mb-7 max-w-md text-sm leading-relaxed text-gray-500">
          Browse products and save your favorites here.
        </p>

        <div className="flex w-full max-w-xs flex-col gap-3">
          <Link
            href="/products"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#10a34a] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#0e8f41] focus:outline-none focus:ring-2 focus:ring-[#10a34a] focus:ring-offset-2"
          >
            <span>Browse Products</span>

            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-white px-4 py-8">
      <div className="mx-auto max-w-[1190px]">
        {/* Breadcrumb */}
        <div className="mb-5 flex items-center gap-2 text-sm text-gray-400">
          <Link href="/" className="hover:text-green-600">
            Home
          </Link>

          <span>/</span>

          <span className="font-medium text-gray-700">
            Wishlist
          </span>
        </div>

        {/* Header */}
        <div className="mb-7 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-100 text-xl shadow-md">
              <FaHeart className="text-red-600" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                My Wishlist
              </h1>

              <p className="text-sm text-gray-400">
                {wishlistData.count}{" "}
                {wishlistData.count === 1 ? "item" : "items"} saved
              </p>
            </div>
          </div>
        </div>

        {/* Wishlist Table */}
        <div className="mt-8">
          <div className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 text-center text-xs font-medium uppercase tracking-wide text-gray-500">
                  <th className="px-4 py-4 text-left">
                    Product
                  </th>

                  <th className="px-4 py-4">
                    Price
                  </th>

                  <th className="px-4 py-4">
                    Actions
                  </th>

                  <th className="w-14 px-4 py-4" />
                </tr>
              </thead>

              <tbody>
                {wishlistData.data.map((product) => (
                  <tr
                    key={product._id}
                    className="border-b border-gray-100 text-center"
                  >
                    <td className="px-4 py-5 text-left">
                      <div className="flex items-center gap-4">
                        <div className="flex h-[90px] w-[90px] shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gray-50">
                          <img
                            src={product.imageCover}
                            alt={product.title}
                            className="h-[100px] w-[100px] object-contain"
                          />
                        </div>

                        <div>
                          <h3 className="text-sm font-medium text-gray-800">
                            {product.title}
                          </h3>

                          <p className="mt-1 text-xs text-gray-400">
                            {product.category?.name}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-5">
                      <span className="text-sm font-semibold text-gray-800">
                        {product.price}
                      </span>

                      <span className="ml-1 text-xs text-gray-400">
                        EGP
                      </span>
                    </td>

                    <td className="px-4 py-5">
                      <div className="flex items-center justify-around gap-1">
                        <AddBtn
                          prodId={product._id}
                          cls="rounded-full bg-green-600 px-6 py-3 text-xs font-semibold text-white transition hover:bg-green-700"
                          child={<>Add to Cart</>}
                        />

                        <button
                          onClick={() => delWishlistItem(product._id)}
                          disabled={isDeleting}
                          aria-label={`Remove ${product.title} from wishlist`}
                          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded border border-gray-200 transition hover:border-red-300 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Link
            href="/products"
            className="inline-block cursor-pointer px-8 py-5 text-sm font-semibold text-[#4c4c4c] transition hover:text-red-500"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </section>
  );
}

