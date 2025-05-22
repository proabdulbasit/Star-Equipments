'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import Image from 'next/image';
import NavLink from '@/data/navLinks.json';
import { usePathname } from 'next/navigation';
import { RxCross2 } from 'react-icons/rx';
import { FiMenu } from 'react-icons/fi';
import HeaderLink from '@/data/headerLinks.json';
import { FiShoppingCart } from 'react-icons/fi';
import { useCart } from '@/context/CartContext';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(true);
  const toggleClose = () => setIsOpen(false);
  const pathname = usePathname();
  const { cart } = useCart();
  const cartCount =
    cart?.lines?.edges?.reduce(
      (sum: any, item: { node: { quantity: any } }) =>
        sum + (item.node.quantity || 0),
      0,
    ) || 0;

  return (
    <>
      <div className="sticky top-0 z-50 shadow-lg">
        <div className="lg:block hidden"></div>
        <div className="w-full shadow lg:h-24 h-16 bg-white">
          <div className="max-w-[1440px] mx-auto px-4 lg:px-8 h-full flex items-center justify-between">
            <Link href="/">
              <Image
                src="/assets/Header/logo.svg"
                width={136}
                height={70}
                alt="logo"
                className="lg:w-[136px] lg:h-[70px] w-[100px]"
              />
            </Link>
            <ul className="flex items-center roboto-condensed xl:gap-16 lg:gap-10 justify-between">
              {NavLink
                ? NavLink.map((item, index) => (
                    <li key={item.id}>
                      <Link
                        href={item.url}
                        className={`lg:block hidden text-[14px] xl:text-[18px] ${
                          pathname === item.url
                            ? 'text-[#007934] font-bold' // Active link styling
                            : 'text-[#000000] font-normal'
                        } hover:text-[#007934]`}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))
                : 'loading'}
            </ul>
            <div
              className="lg:hidden block cursor-pointer"
              onClick={toggleOpen}
            >
              <FiMenu className="text-[#048B3D] text-2xl" />
            </div>
          </div>
        </div>
        {/* Secondary nav bar: show on desktop, hide on mobile if no links */}
        <div className="bg-[#E8EAED] h-20 lg:block hidden">
          <div className="max-w-[1440px] mx-auto px-5 lg:px-12 h-full flex items-center justify-between roboto-condensed text-[14px] xl:text-[18px]">
            <div className="flex items-center xl:gap-16 lg:gap-10">
              <ul className="flex items-center xl:gap-16 lg:gap-10 justify-between">
                {HeaderLink
                  ? HeaderLink.map((item, index) => (
                      <li key={item.id}>
                        <Link
                          href={item.url}
                          className={`lg:block hidden text-[14px] xl:text-[18px] text-black`}
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))
                  : 'loading'}
              </ul>
            </div>
            <div className="flex items-center gap-7">
              <Link href="/cart" className="cursor-pointer relative">
                <FiShoppingCart className="text-2xl text-black" />
                <span className="absolute -top-2 -right-2 bg-[#007934] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              </Link>
            </div>
          </div>
        </div>
        {/* On mobile, show a cart bar with 'Your Cart' and the cart icon */}
        <div className="bg-[#E8EAED] h-14 lg:hidden flex items-center justify-between px-4">
          <span className="text-[16px] font-medium text-black">Your Cart</span>
          <Link href="/cart" className="relative">
            <FiShoppingCart className="text-2xl text-black" />

            <span className="absolute -top-2 -right-2 bg-[#007934] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          </Link>
        </div>
      </div>
      {/* Mobile Hamburger Menu Dropdown */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex justify-end">
          <div className="bg-white shadow-2xl w-64 h-full flex flex-col p-5 relative animate-fadeInRight">
            <div className="flex justify-between items-center mb-4">
              <span className="font-bold text-lg text-[#048B3D]">Menu</span>
              <button onClick={toggleClose} aria-label="Close menu">
                <RxCross2 className="text-[#048B3D] text-xl" />
              </button>
            </div>
            <ul className="flex flex-col space-y-3 mb-4">
              {NavLink &&
                NavLink.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={item.url}
                      className="text-[#222] hover:text-[#048B3D] font-medium text-[16px]"
                      onClick={toggleClose}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
            </ul>
            {/* Divider */}
            {HeaderLink && HeaderLink.length > 0 && <hr className="my-2" />}
            <ul className="flex flex-col space-y-3">
              {HeaderLink &&
                HeaderLink.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={item.url}
                      className="text-[#666] hover:text-[#048B3D] font-normal text-[15px]"
                      onClick={toggleClose}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
            </ul>
            <div className="mt-auto pt-6">
              <Link
                href="/cart"
                className="flex items-center gap-2 text-[#048B3D] font-semibold text-lg"
                onClick={toggleClose}
              >
                <FiShoppingCart className="text-2xl" /> Cart
                <span className="bg-[#007934] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center ml-1">
                  {cartCount}
                </span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default Header;
