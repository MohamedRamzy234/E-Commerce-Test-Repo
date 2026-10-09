"use client";
import Logo from '../../../assets/images/freshcart-logo.svg'
import Link from "next/link"
import Image from "next/image"
import * as React from "react"
import { FaPhoneAlt } from "react-icons/fa";
import { FaHeadphones } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";
import { GiReturnArrow } from "react-icons/gi";
import { RiSecurePaymentFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";







export default function Footer() {
  return (
    <footer className="w-full">

      {/* ================= TOP FEATURES ================= */}
      <div className="bg-green-50 px-6 py-7">
        <div className="max-w-6xl mx-auto flex justify-between items-center gap-8">

          {/* Free Shipping */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
              {/* Truck Icon */}
              <MdLocalShipping className='text-green-500'/>

            </div>

            <div>
              <h4 className="font-semibold text-gray-800">
                Free Shipping
              </h4>
              <p className="text-sm text-gray-500">
                On orders over 500 EGP
              </p>
            </div>
          </div>

          {/* Easy Returns */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
              {/* Return Icon */}
              <GiReturnArrow className='text-green-500' />

            </div>

            <div>
              <h4 className="font-semibold text-gray-800">
                Easy Returns
              </h4>
              <p className="text-sm text-gray-500">
                14-day return policy
              </p>
            </div>
          </div>

          {/* Secure Payment */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
              {/* Shield Icon */}
              <RiSecurePaymentFill className='text-green-500' />

            </div>

            <div>
              <h4 className="font-semibold text-gray-800">
                Secure Payment
              </h4>
              <p className="text-sm text-gray-500">
                100% secure checkout
              </p>
            </div>
          </div>

          {/* Support */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
              {/* Headphones Icon */}
              <FaHeadphones className='text-green-500' />

            </div>

            <div>
              <h4 className="font-semibold text-gray-800">
                24/7 Support
              </h4>
              <p className="text-sm text-gray-500">
                Contact us anytime
              </p>
            </div>
          </div>

        </div>
      </div>
      <div className="bg-[#0d1728] text-white px-6 py-12">

        <div className="max-w-6xl mx-auto flex justify-between items-start gap-10">

          {/* ================= BRAND ================= */}
          <div className="w-[32%]">
<div className="inline-flex items-center gap-2 bg-white text-gray-800 rounded-lg px-4 py-2 mb-7">
  <Image
    src={Logo}
    alt="Fresh cart"
    className="w-auto h-10"
  />
</div>
            <p className="text-gray-400 text-sm leading-6 max-w-md">
              FreshCart is your one-stop destination for quality products.
              From fashion to electronics, we bring you the best brands at
              competitive prices with a seamless shopping experience.
            </p>

            {/* Contact */}
            <div className="mt-6 space-y-4">

              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <FaPhoneAlt className='text-green-500' />
                  {/* Phone Icon */}
                
                <span>+1 (800) 123-4567</span>
              </div>

              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <div className="text-green-500">
                  {/* Email Icon */}
                  <MdEmail className='text-green-500' />

                </div>
                <span>support@freshcart.com</span>
              </div>

              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <div className="text-green-500">
                  {/* Location Icon */}
                  <FaLocationDot className='text-green-500' />

                </div>
                <span>
                  123 Commerce Street, New York, NY 10001
                </span>
              </div>

            </div>

            {/* Social Media */}
            <div className="flex gap-3 mt-7">

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#1c2a3d] flex items-center justify-center text-gray-400 hover:bg-green-600 hover:text-white transition"
              >
                {/* Facebook */}
                <FaFacebookF />

              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#1c2a3d] flex items-center justify-center text-gray-400 hover:bg-green-600 hover:text-white transition"
              >
                {/* Twitter */}
                <FaTwitter />

              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#1c2a3d] flex items-center justify-center text-gray-400 hover:bg-green-600 hover:text-white transition"
              >
                {/* Instagram */}
                <FaInstagram />

              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#1c2a3d] flex items-center justify-center text-gray-400 hover:bg-green-600 hover:text-white transition"
              >
                {/* Youtube */}
                <FaYoutube />

              </a>

            </div>
          </div>

          {/* ================= SHOP ================= */}
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-6">
              Shop
            </h3>

            <ul className="space-y-4 text-sm text-gray-400">
              <li>
                <Link href="/products" className="hover:text-green-500 transition">
                  All Products
                </Link>
              </li>

              <li>
                <Link href="/categories" className="hover:text-green-500 transition">
                  Categories
                </Link>
              </li>

              <li>
                <a href="#" className="hover:text-green-500 transition">
                  Brands
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-green-500 transition">
                  Electronics
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-green-500 transition">
                  Men's Fashion
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-green-500 transition">
                  Women's Fashion
                </a>
              </li>
            </ul>
          </div>

          {/* ================= ACCOUNT ================= */}
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-6">
              Account
            </h3>

            <ul className="space-y-4 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-green-500 transition">
                  My Account
                </a>
              </li>

              <li>
                <Link href='/allorders'>Order History</Link>
              </li>

              <li>
                <Link href="/wishList" className="hover:text-green-500 transition">
                  Wishlist
                </Link>
              </li>

              <li>
                <Link href="/cart" className="hover:text-green-500 transition">
                  Shopping Cart
                </Link>
              </li>

              <li>
                <Link href="/Login" className="hover:text-green-500 transition">
                  Sign In
                </Link>
              </li>

              <li>
                <Link href="/Register" className="hover:text-green-500 transition">
                  Create Account
                </Link>
              </li>
            </ul>
          </div>

          {/* ================= SUPPORT ================= */}
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-6">
              Support
            </h3>

            <ul className="space-y-4 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-green-500 transition">
                  Contact Us
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-green-500 transition">
                  Help Center
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-green-500 transition">
                  Shipping Info
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-green-500 transition">
                  Returns & Refunds
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-green-500 transition">
                  Track Order
                </a>
              </li>
            </ul>
          </div>

          {/* ================= LEGAL ================= */}
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-6">
              Legal
            </h3>

            <ul className="space-y-4 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-green-500 transition">
                  Privacy Policy
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-green-500 transition">
                  Terms of Service
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-green-500 transition">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>
      
      {/* ================= BOTTOM ================= */}
      <div className="bg-[#0d1728] border-t border-gray-800 px-6 py-5">

        <div className="max-w-6xl mx-auto flex items-center justify-between">

          <p className="text-gray-500 text-sm">
            © 2026 FreshCart. All rights reserved.
          </p>

          {/* Payment Methods */}
          <div className="flex items-center gap-5 text-gray-500">

            <div className="flex items-center gap-2 text-sm">
              {/* Visa Icon */}
              <span>Visa</span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              {/* Mastercard Icon */}
              <span>Mastercard</span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              {/* PayPal Icon */}
              <span>PayPal</span>
            </div>

          </div>

        </div>
      </div>

    </footer>
  );
}