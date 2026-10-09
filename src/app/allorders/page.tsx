"use client";

import { useState } from "react";

export default function AllOrders() {
  const [open, setOpen] = useState(false);

  return (
    <section className="min-h-screen bg-white px-4 py-8">
      <div className="mx-auto max-w-[1190px]">

        {/* Breadcrumb */}
        <div className="mb-5 flex items-center gap-2 text-sm text-gray-400">
          <span>Home</span>
          <span>/</span>
          <span className="font-medium text-gray-700">
            My Orders
          </span>
        </div>

        {/* Header */}
        <div className="mb-7 flex items-center justify-between">
          <div className="flex items-center gap-4">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-500 text-xl shadow-md">
              🛍️
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                My Orders
              </h1>

              <p className="text-sm text-gray-400">
                Track and manage your orders
              </p>
            </div>

          </div>

          <button className="flex items-center gap-2 text-sm font-medium text-green-600 transition hover:text-green-700">
            🛍️
            Continue Shopping
          </button>
        </div>

        {/* Orders */}
        <div className="space-y-4">

          {/* Order Card */}
          <div
            className={`overflow-hidden rounded-xl border transition ${
              open
                ? "border-green-200 shadow-sm"
                : "border-gray-200"
            }`}
          >

            {/* Order Header */}
            <div className="relative p-5">

              <div className="flex items-start justify-between">

                {/* Left Side */}
                <div className="flex gap-4">

                  {/* Product Image */}
                  <div className="flex h-[88px] w-[88px] shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-50">
                    <span className="text-3xl">
                      🛍️
                    </span>
                  </div>

                  {/* Order Information */}
                  <div className="pt-0.5">

                    {/* Status */}
                    <div className="mb-2 inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-semibold text-amber-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                      Pending
                    </div>

                    {/* Order Number */}
                    <h2 className="mb-2 text-[15px] font-bold text-gray-800">
                      <span className="mr-1 text-gray-400">
                        #
                      </span>
                      ORD-123456
                    </h2>

                    {/* Meta */}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400">

                      <div className="flex items-center gap-1">
                        <span>📅</span>
                        <span>Oct 08, 2026</span>
                      </div>

                      <span>•</span>

                      <div className="flex items-center gap-1">
                        <span>📦</span>
                        <span>2 Items</span>
                      </div>

                      <span>•</span>

                      <div className="flex items-center gap-1">
                        <span>📍</span>
                        <span>Cairo</span>
                      </div>

                    </div>

                    {/* Price */}
                    <div className="mt-4 flex items-baseline gap-1">
                      <span className="text-xl font-bold text-gray-800">
                        1,250
                      </span>

                      <span className="text-xs text-gray-400">
                        EGP
                      </span>
                    </div>

                  </div>
                </div>

                {/* Right Side */}
                <div className="flex flex-col items-end gap-6">

                  {/* Payment Icon */}
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100">
                    💳
                  </div>

                  {/* Toggle */}
                  <button
                    onClick={() => setOpen(!open)}
                    className="flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2 text-xs font-medium text-white shadow-md transition hover:bg-green-700"
                  >
                    {open ? "⌃" : "⌄"}
                  </button>

                </div>

              </div>
            </div>

            {/* Expanded Content */}
            {open && (
              <div className="border-t border-gray-100 bg-gray-50/70">

                <div className="p-5">

                  {/* Order Items */}
                  <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-gray-700">

                    <div className="flex h-5 w-5 items-center justify-center rounded-md bg-green-100">
                      📦
                    </div>

                    Order Items
                  </div>

                  {/* Item */}
                  <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-white p-3">

                    <div className="flex items-center gap-3">

                      <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg bg-gray-50">
                        <span className="text-xl">
                          📦
                        </span>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-gray-800">
                          Product Name
                        </h3>

                        <p className="mt-1 text-xs text-gray-400">
                          Quantity: 1
                        </p>
                      </div>

                    </div>

                    <div className="text-sm font-bold text-gray-800">
                      750
                      <span className="ml-1 text-[10px] font-normal text-gray-400">
                        EGP
                      </span>
                    </div>

                  </div>

                  {/* Bottom Information */}
                  <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">

                    {/* Delivery Address */}
                    <div className="rounded-xl border border-gray-100 bg-white p-4">

                      <div className="mb-3 flex items-center gap-2">

                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
                          📍
                        </div>

                        <span className="text-xs font-semibold text-gray-700">
                          Delivery Address
                        </span>

                      </div>

                      <h4 className="text-sm font-medium text-gray-700">
                        Mohamed Ramzy
                      </h4>

                      <p className="mt-1 text-xs text-gray-400">
                        Cairo, Egypt
                      </p>

                      <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                        <span>☎</span>
                        01000000000
                      </div>

                    </div>

                    {/* Order Summary */}
                    <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-4">

                      <div className="mb-3 flex items-center gap-2">

                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-yellow-400">
                          💳
                        </div>

                        <span className="text-xs font-semibold text-gray-700">
                          Order Summary
                        </span>

                      </div>

                      <div className="space-y-2 text-xs">

                        <div className="flex justify-between">
                          <span className="text-gray-500">
                            Subtotal
                          </span>

                          <span className="text-gray-600">
                            1,250 EGP
                          </span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-gray-500">
                            Shipping
                          </span>

                          <span className="text-gray-600">
                            Free
                          </span>
                        </div>

                        <div className="my-2 border-t border-yellow-200" />

                        <div className="flex justify-between">
                          <span className="font-semibold text-gray-700">
                            Total
                          </span>

                          <span className="text-base font-bold text-gray-800">
                            1,250 EGP
                          </span>
                        </div>

                      </div>
                    </div>

                  </div>
                </div>
              </div>
            )}

          </div>

        </div>
      </div>
    </section>
  );
}