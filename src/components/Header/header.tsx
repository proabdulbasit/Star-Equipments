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
          <div className="max-w-[1440px] mx-auto px-5 lg:px-12 h-full flex items-center justify-between">
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
        <div className="bg-[#E8EAED] h-20">
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
              {/* <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                <Link href="/" className="cursor-pointer">
                  <IoSearch className="text-[#007934] font-bold text-2xl" />
                </Link>
              </div>
              <Link href="/" className="cursor-pointer">
                <FaRegHeart className="text-2xl text-black" />
              </Link> */}
              <Link href="/cart" className="cursor-pointer relative">
                <FiShoppingCart className="text-2xl text-black" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#007934] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
              {/* <div className="flex flex-col">
                <label className="text-sm pl-1 text-black">My Cart</label>
                <select className="text-black font-bold cursor-pointer">
                  <option>$215.00</option>
                  <option>$215.00</option>
                  <option>$215.00</option>
                  <option>$215.00</option>
                </select>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="flex rounded-2xl p-5 justify-between bg-white shadow-2xl absolute top-4 w-40 right-5">
          <ul className="justify-between flex flex-col space-y-3">
            {NavLink
              ? NavLink.map((item, index) => (
                  <li key={item.id}>
                    <Link
                      href={item.url}
                      className="text-[#666666] hover:text-[#048B3D] font-normal text-[12px]"
                      onClick={() => toggleClose()} // Close dropdown on navigation
                    >
                      {item.name}
                    </Link>
                  </li>
                ))
              : 'loading'}
          </ul>
          <div onClick={toggleClose}>
            <RxCross2 className="text-[#048B3D] text-xs mt-1" />
          </div>
        </div>
      )}
    </>
  );
}
export default Header;
