
"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import Logo from "../../../assets/images/freshcart-logo.svg";
import { getShopCategory } from "@/api/Services/categoryApi";
import { cartResponseType } from "@/api/Types/cartType";

const visibleCategories = [
  "Electronics",
  "Women's Fashion",
  "Men's Fashion",
  "Beauty&Health",
];

export default function Navbar() {
  const router = useRouter();
  const { status } = useSession();

  const { data: categories = [], isLoading: categoriesLoading } =
    useQuery({
      queryKey: ["categories"],
      queryFn: getShopCategory,
    });

  const { data: cartData } = useQuery<cartResponseType>({
    queryKey: ["getCart"],
    queryFn: async () => {
      const response = await fetch("/api/cart");

      if (!response.ok) {
        throw new Error("Failed to fetch cart data");
      }

      return response.json();
    },
    enabled: status === "authenticated",
  });

  function handleLogout() {
    signOut({ redirect: true, callbackUrl: "/Login" });
  }

  // Display only the four requested categories.
  const filteredCategories = categories.filter((category) =>
    visibleCategories.includes(category.name)
  );

  return (
    <NavigationMenu className="sticky top-0 z-50 max-w-full bg-white p-3">
      <NavigationMenuList className="flex justify-between">
        {/* Logo */}
        <NavigationMenuItem>
          <Link href="/">
            <Image src={Logo} alt="Fresh cart" priority />
          </Link>
        </NavigationMenuItem>

        <div className="hidden gap-4 md:flex" />

        <div className="flex items-center gap-6">
          {/* Home */}
          <NavigationMenuItem>
            <Link
              className="font-semibold hover:text-green-500"
              href="/"
            >
              Home
            </Link>
          </NavigationMenuItem>

          {/* Shop */}
          <NavigationMenuItem>
            <Link
              className="font-semibold hover:text-green-500"
              href="/products"
            >
              Shop
            </Link>
          </NavigationMenuItem>

          {/* Categories */}
          <NavigationMenuItem>
            <NavigationMenuTrigger className="font-semibold hover:text-green-500">
              Categories
            </NavigationMenuTrigger>

            <NavigationMenuContent>
              <ul className="w-64 p-2">
                <li>
                  <Link
                    href="/categories"
                    className="block rounded-md px-3 py-2 font-semibold hover:bg-gray-100 hover:text-green-600"
                  >
                    All Categories
                  </Link>
                </li>

                {categoriesLoading ? (
                  <li className="px-3 py-2 text-sm text-gray-500">
                    Loading...
                  </li>
                ) : (
                  visibleCategories.map((name) => {
                    const category = filteredCategories.find(
                      (item) => item.name === name
                    );

                    if (!category) return null;

                    return (
                      <li key={category._id}>
                        <Link
                          href={`/categories/${category._id}/subcategories`}
                          className="block rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-green-600"
                        >
                          {category.name}
                        </Link>
                      </li>
                    );
                  })
                )}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Brands */}
          <NavigationMenuItem>
            <Link
              className="font-semibold hover:text-green-500"
              href="/brands"
            >
              Brands
            </Link>
          </NavigationMenuItem>

          {/* Wishlist */}
          <Link href="/wishList" aria-label="Wishlist">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6 cursor-pointer hover:text-green-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          </Link>

          {/* Cart */}
          <button
            onClick={() => {
              if (status === "authenticated") {
                router.push("/cart");
              } else if (status === "unauthenticated") {
                router.push("/Login");
              }
            }}
            disabled={status === "loading"}
            aria-label="Shopping cart"
            className="relative cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6 hover:text-green-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1-1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1-1.5 0Z"
              />
            </svg>

            {status === "authenticated" && cartData && (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-green-600 px-1 text-[11px] font-bold text-white">
                {cartData.numOfCartItems}
              </span>
            )}
          </button>

          {/* Sign In / Sign Out */}
          {status === "authenticated" ? (
            <button
              onClick={handleLogout}
              className="hidden cursor-pointer items-center gap-1 rounded-4xl bg-green-600 px-3 py-2 text-white hover:bg-green-800 md:flex"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
              Sign Out
            </button>
          ) : (
            <Link
              href="/Login"
              className="hidden cursor-pointer items-center gap-1 rounded-4xl bg-green-600 px-3 py-2 text-white hover:bg-green-800 md:flex"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile Menu */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="rounded-lg bg-green-500 hover:bg-green-500 md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </NavigationMenuTrigger>

          <NavigationMenuContent>
            <ul className="w-64 p-2">
              <li>
                <Link
                  href="/"
                  className="block rounded-md px-3 py-2 hover:bg-gray-100"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/products"
                  className="block rounded-md px-3 py-2 hover:bg-gray-100"
                >
                  Shop
                </Link>
              </li>

              <li>
                <Link
                  href="/brands"
                  className="block rounded-md px-3 py-2 hover:bg-gray-100"
                >
                  Brands
                </Link>
              </li>

              <li>
                <Link
                  href="/categories"
                  className="block rounded-md px-3 py-2 hover:bg-gray-100"
                >
                  All Categories
                </Link>
              </li>

              {categoriesLoading ? (
                <li className="px-3 py-2 text-sm text-gray-500">
                  Loading categories...
                </li>
              ) : (
                visibleCategories.map((name) => {
                  const category = filteredCategories.find(
                    (item) => item.name === name
                  );

                  if (!category) return null;

                  return (
                    <li key={category._id}>
                      <Link
                        href={`/categories/${category._id}/subcategories`}
                        className="block rounded-md px-3 py-2 hover:bg-gray-100 hover:text-green-600"
                      >
                        {category.name}
                      </Link>
                    </li>
                  );
                })
              )}

              <li>
                <Link
                  href="/wishList"
                  className="block rounded-md px-3 py-2 hover:bg-gray-100"
                >
                  Wishlist
                </Link>
              </li>

              <li>
                <button
                  onClick={() => {
                    if (status === "authenticated") {
                      router.push("/cart");
                    } else {
                      router.push("/Login");
                    }
                  }}
                  className="block w-full rounded-md px-3 py-2 text-left hover:bg-gray-100"
                >
                  Cart
                </button>
              </li>

              {status === "authenticated" ? (
                <li>
                  <button
                    onClick={handleLogout}
                    className="block w-full rounded-md px-3 py-2 text-left hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </li>
              ) : (
                <li>
                  <Link
                    href="/Login"
                    className="block rounded-md px-3 py-2 hover:bg-gray-100"
                  >
                    Sign In
                  </Link>
                </li>
              )}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}