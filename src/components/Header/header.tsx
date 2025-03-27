'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import Image from 'next/image';
import NavLink from '@/data/navLinks.json';
import { usePathname } from 'next/navigation';
import { RxCross2 } from 'react-icons/rx';
import { FiMenu } from 'react-icons/fi';
import HeaderLink from '@/data/headerLinks.json';
import { IoSearch } from 'react-icons/io5';
import { FaRegHeart } from 'react-icons/fa6';
import { FiShoppingCart } from 'react-icons/fi';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const toogleOpen = () => setIsOpen(true);
  const toogleClose = () => setIsOpen(false);
  const pathname = usePathname();

  return (
    <>
      <div className="lg:block hidden">
        <div className="flex items-center roboto-condensed">
          <div className="bg-[#048B3D] h-12 w-36"></div>
          <div className="shape absolute left-28 "></div>
          <div className="bg-[#7E7F81] h-12 w-full  flex items-center pr-24 pl-4 justify-between ">
            <h1 className="text-[16px] text-white">
              50% OFF SALE ON PARTS & EQUIPMENT
            </h1>

            <h1 className="text-[16px] text-white">
              <Link href="#">CALL US (715) 760-4004</Link>
            </h1>
          </div>
        </div>
      </div>
      <div className="w-full shadow lg:h-24  h-16 justify-between lg:px-24 px-5 bg-white flex items-center h-">
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
        <div className="lg:hidden block cursor-pointer" onClick={toogleOpen}>
          <FiMenu className="text-[#048B3D] text-2xl" />
        </div>
      </div>
      <div className="bg-[#E8EAED] flex items-center justify-between roboto-condensed text-[14px] xl:text-[18px]  h-20 px-24">
        <div className="flex items-center xl:gap-16 lg:gap-10">
          <select className="text-black cursor-pointer">
            <option>NRC Parts</option>
            <option>NRC Parts</option>
            <option>NRC Parts</option>
            <option>NRC Parts</option>
            <option>NRC Parts</option>
            <option>NRC Parts</option>
          </select>
          <ul className="flex items-center  xl:gap-16 lg:gap-10 justify-between">
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
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
            <Link href="/" className="cursor-pointer">
              <IoSearch className="text-[#007934] font-bold text-2xl" />
            </Link>
          </div>
          <Link href="/" className="cursor-pointer">
            <FaRegHeart className="text-2xl text-black" />
          </Link>
          <Link href="/" className="cursor-pointer">
            <FiShoppingCart className="text-2xl text-black" />
          </Link>
          <div className="flex flex-col">
            <label className="text-sm pl-1 text-black">My Cart</label>
            <select className="text-black font-bold cursor-pointer">
              <option>$215.00</option>
              <option>$215.00</option>
              <option>$215.00</option>
              <option>$215.00</option>
            </select>
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
                      onClick={() => toogleClose()} // Close dropdown on navigation
                    >
                      {item.name}
                    </Link>
                  </li>
                ))
              : 'loading'}
          </ul>
          <div onClick={toogleClose}>
            <RxCross2 className="text-[#048B3D] text-xs mt-1" />
          </div>
        </div>
      )}
    </>
  );
}
export default Header;
