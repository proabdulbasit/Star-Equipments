'use client';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import Image from 'next/image';
import NavLink from '@/data/navLinks.json';
import { usePathname } from 'next/navigation';
import { RxCross2 } from 'react-icons/rx';
import { FiMenu } from 'react-icons/fi';
import HeaderLink from '@/data/headerLinks.json';
import { IoSearch } from 'react-icons/io5';
import { FaRegHeart } from 'react-icons/fa6';
import { FiShoppingCart } from 'react-icons/fi';
import { Autoplay } from 'swiper/modules';
import { useCart } from '@/context/CartContext';
import { useFavourite } from '@/context/FavouriteContext';

function Header() {
  const { cart } = useCart();
  const { favourites } = useFavourite();

  const [isOpen, setIsOpen] = useState(false);
  const toogleOpen = () => setIsOpen(true);
  const toogleClose = () => setIsOpen(false);
  const pathname = usePathname();

  return (
    <>
      <div className="lg:block hidden">
        <div className=" fixed z-40 left-0 right-0 top-0">
          <div className="flex items-center roboto-condensed">
            <div className="bg-[#048B3D] h-12 w-36"></div>
            <div className="shape absolute left-[115px] "></div>
            <div className="bg-[#7E7F81] w-full">
              <div className=" h-12 w-full  lg:w-[90%]  flex items-center justify-between ">
                <div className="w-80">
                  <Swiper
                    className=" "
                    autoplay={{
                      delay: 3000,
                      disableOnInteraction: false,
                    }}
                    modules={[Autoplay]}
                  >
                    <SwiperSlide>
                      {' '}
                      <h1 className="text-[16px]  text-white">
                        50% OFF SALE ON PARTS & EQUIPMENT
                      </h1>
                    </SwiperSlide>
                    <SwiperSlide>
                      {' '}
                      <h1 className="text-[16px] text-white">
                        UNLOCK UNBETABLE SAVINGS!
                      </h1>
                    </SwiperSlide>
                    <SwiperSlide>
                      {' '}
                      <h1 className="text-[16px] text-white">
                        HURRY SELLS END SOON!
                      </h1>
                    </SwiperSlide>
                  </Swiper>
                </div>

                <h1 className="text-[16px] text-white">
                  <Link href="#">CALL US (715) 760-4004</Link>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white shadow z-40 fixed left-0 right-0 lg:top-12">
        <div className="w-[95%]  lg:h-24  h-16 justify-between  xl:w-[1440px] mx-auto bg-white flex items-center">
          <Link href="/">
            <Image
              src="/assets/Header/logo.svg"
              width={136}
              height={70}
              alt="logo"
              className="lg:w-[136px] lg:h-[70px] w-[100px]"
            />
          </Link>
          <ul className="flex items-center  roboto-condensed xl:gap-16 lg:gap-10 justify-between">
            {NavLink
              ? NavLink.map((item, index) => (
                  <li key={item.id}>
                    <Link
                      href={item.url}
                      className={`lg:block hidden text-[14px] xl:text-[18px] ${
                        pathname === item.url
                          ? 'text-[#007934] font-bold'
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
      </div>
      <div className="lg:block hidden">
        <div className="bg-[#E8EAED] w-full mt-36">
          <div className=" flex items-center justify-between roboto-condensed text-[14px] xl:text-[18px] w-[95%]  h-20 xl:w-[1440px] mx-auto">
            <div className="flex items-center xl:gap-16 lg:gap-10">
              <select className="text-black bg-transparent outline-none cursor-pointer">
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
              <Link href="/wishlist" className="relative cursor-pointer">
                <FaRegHeart className="text-2xl text-black" />
                {favourites.length > 0 && (
                  <h1 className="absolute -top-3 -right-2 bg-red-600 h-5 text-sm text-white p-1 flex justify-center items-center rounded-full">
                    {favourites.length}
                  </h1>
                )}
              </Link>
              <Link
                className="relative"
                href={`/cart?cartid=${sessionStorage.getItem('cartId')}`}
              >
                <FiShoppingCart className="text-2xl text-black" />
                <h1 className="absolute -top-3 -right-2 bg-green-900 h-5 text-sm text-white p-1 flex justify-center items-center rounded-full">
                  {cart?.lines?.edges?.length ?? 0}
                </h1>
              </Link>

              <div className="flex flex-col">
                <label className="text-sm pl-1 text-black">My Cart</label>
                <select className="text-black font-bold bg-transparent outline-none cursor-pointer">
                  <option>$215.00</option>
                  <option>$215.00</option>
                  <option>$215.00</option>
                  <option>$215.00</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="flex rounded-2xl z-40 p-5 justify-between bg-white shadow-2xl absolute top-4 w-52 right-5">
          <ul className="justify-between flex flex-col space-y-3">
            {NavLink
              ? NavLink.map((item, index) => (
                  <li key={item.id}>
                    <Link
                      href={item.url}
                      className="text-[#666666] hover:text-[#048B3D] font-normal text-[12px]"
                      onClick={() => toogleClose()}
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
