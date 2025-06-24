'use client';
import Link from 'next/link';
import React, { useState, Suspense, useEffect } from 'react';
import Image from 'next/image';
import NavLink from '@/data/navLinks.json';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { RxCross2 } from 'react-icons/rx';
import { FiMenu } from 'react-icons/fi';
import HeaderLink from '@/data/headerLinks.json';
import { FiShoppingCart } from 'react-icons/fi';
import { useCart } from '@/context/CartContext';
import SearchBar from '@/components/SearchBar/SearchBar';
import { FiSearch, FiX } from 'react-icons/fi';
import { FiArrowLeft } from 'react-icons/fi';
import { FiChevronDown } from 'react-icons/fi';
import DropdownMenu from './DropdownMenu';
import { getDropdownItemByName } from '@/utils/dropdownUtils';
import { getNRCCategories, NRCCategory } from '@/utils/shopify';
import { FaRegStar } from 'react-icons/fa';

function HeaderContent() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const toggleOpen = () => setIsOpen(true);
  const toggleClose = () => setIsOpen(false);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { cart } = useCart();
  const isHomePage = pathname === '/';
  const cartCount =
    cart?.lines?.edges?.reduce(
      (sum: any, item: { node: { quantity: any } }) =>
        sum + (item.node.quantity || 0),
      0,
    ) || 0;

  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [nrcCategories, setNrcCategories] = useState<NRCCategory[]>([]);

  useEffect(() => {
    // When the route or search params change, stop loading
    setIsSearching(false);
  }, [pathname, searchParams]);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    getNRCCategories().then(setNrcCategories);
  }, []);

  const handleSearch = (query: string) => {
    if (query.trim()) {
      setIsSearching(true);
      router.push(`/?q=${encodeURIComponent(query.trim())}`);
    } else {
      // Remove 'q' param from URL (or set to empty)
      const url = new URL(window.location.href);
      url.searchParams.delete('q');
      setIsSearching(false);
      router.push(url.pathname + (url.search ? url.search : ''));
    }
  };

  const handleDropdownToggle = (itemId: number) => {
    setActiveDropdown(activeDropdown === itemId ? null : itemId);
  };

  const closeDropdown = () => {
    setActiveDropdown(null);
  };

  // Check if a nav item has dropdown functionality
  const getDropdownItem = (navItem: any) => {
    return getDropdownItemByName(navItem.name);
  };

  return (
    <>
      {/* Promotional Banner */}
      <div className="bg-[#007934] text-white relative overflow-hidden">
        {/* Mobile Banner */}
        <div className="md:hidden w-full overflow-x-hidden">
          <div className="flex whitespace-nowrap animate-marquee-7s">
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="flex shrink-0 items-center justify-center px-4 py-2.5"
              >
                <FaRegStar className="w-4 h-4" />
                <span className="text-sm ml-2">
                  Get 10% off all glass shower door installs now through May
                  31st
                </span>
              </div>
            ))}
          </div>
        </div>
        {/* Desktop Banner */}
        <div className="hidden md:block w-full overflow-x-hidden">
          <div className="flex whitespace-nowrap animate-marquee-20s">
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="flex shrink-0 items-center justify-center gap-8 px-4 py-2.5"
              >
                {[...Array(4)].map((_, j) => (
                  <React.Fragment key={j}>
                    <div className="flex items-center gap-2">
                      <FaRegStar className="w-4 h-4" />
                      <span>
                        Get 10% off all glass shower door installs now through
                        May 31st
                      </span>
                    </div>
                    {j < 3 && <span>•</span>}
                  </React.Fragment>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
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
                ? NavLink.map((item, index) => {
                    const dropdownItem = getDropdownItem(item);
                    const isDropdownActive = activeDropdown === item.id;

                    return (
                      <li key={item.id} className="relative">
                        {dropdownItem ? (
                          // Dropdown menu item
                          <div className="relative">
                            <button
                              onClick={() => handleDropdownToggle(item.id)}
                              onMouseEnter={() =>
                                !isMobile && setActiveDropdown(item.id)
                              }
                              className={`lg:flex hidden items-center gap-1 text-[14px] xl:text-[18px] ${
                                pathname === item.url
                                  ? 'text-[#007934] font-bold'
                                  : 'text-[#000000] font-normal'
                              } hover:text-[#007934] transition-colors`}
                            >
                              {item.name}
                              <FiChevronDown
                                className={`transition-transform ${isDropdownActive ? 'rotate-180' : ''}`}
                              />
                            </button>
                            {/* Only render the floating dropdown on desktop */}
                            {!isMobile && isDropdownActive && (
                              <DropdownMenu
                                item={dropdownItem}
                                isActive={isDropdownActive}
                                onClose={closeDropdown}
                                nrcCategories={nrcCategories}
                              />
                            )}
                          </div>
                        ) : (
                          // Regular menu item
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
                        )}
                      </li>
                    );
                  })
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
            <div className="flex items-center space-x-4">
              <div className="relative group">
                <SearchBar
                  className="w-64 transition-all duration-300 ease-in-out group-hover:w-72"
                  onSearch={handleSearch}
                />
              </div>

              <Link href="/cart" className="relative">
                <FiShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#007934] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
        {/* On mobile, show a cart bar with 'Your Cart' and the cart icon */}
        <div className="bg-[#E8EAED] h-14 lg:hidden flex items-center justify-between px-4">
          <span className="text-[16px] font-medium text-black">Your Cart</span>
          <Link href="/cart" className="relative">
            <FiShoppingCart className="text-2xl text-black" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#007934] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
        {/* On mobile, show animatic search bar below the cart bar */}
        <div className="lg:hidden">
          {!showMobileSearch ? (
            <button
              className="fixed top-[130px] right-4 z-50 rounded-full bg-white shadow w-14 h-14 flex items-center justify-center"
              onClick={() => setShowMobileSearch(true)}
              aria-label="Open search"
              style={{ boxShadow: '0 4px 32px 0 rgba(0,0,0,0.18)' }}
            >
              <FiSearch className="text-2xl text-gray-400" />
            </button>
          ) : (
            <div className="fixed top-[130px] right-4 z-50 w-[90vw] max-w-xs bg-white rounded-xl shadow-2xl flex items-center px-4 py-2 transition-all duration-300">
              <SearchBar className="w-full" onSearch={handleSearch} />
              <button
                className="ml-2"
                onClick={() => setShowMobileSearch(false)}
                aria-label="Close search"
              >
                <FiX className="text-2xl text-gray-500" />
              </button>
            </div>
          )}
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
                NavLink.map((item) => {
                  const dropdownItem = getDropdownItem(item);
                  const isDropdownActive = activeDropdown === item.id;

                  return (
                    <li key={item.id}>
                      {dropdownItem ? (
                        // Mobile dropdown menu item
                        <div className="space-y-2">
                          <button
                            onClick={() => handleDropdownToggle(item.id)}
                            className="flex items-center justify-between w-full text-[#222] hover:text-[#048B3D] font-medium text-[16px]"
                          >
                            {item.name}
                            <FiChevronDown
                              className={`transition-transform ${isDropdownActive ? 'rotate-180' : ''}`}
                            />
                          </button>
                          {isDropdownActive && dropdownItem.subcategories && (
                            <div className="ml-4 space-y-2 border-l-2 border-gray-200 pl-4">
                              {dropdownItem.subcategories.map((subcategory) => (
                                <div key={subcategory.id} className="space-y-1">
                                  <button
                                    onClick={() => {
                                      toggleClose();
                                      if (
                                        subcategory.url.startsWith('/inventory')
                                      ) {
                                        router.push(subcategory.url);
                                      } else {
                                        window.location.href = subcategory.url;
                                      }
                                    }}
                                    className="block w-full text-left text-[#666] hover:text-[#048B3D] font-normal text-[15px]"
                                  >
                                    {subcategory.name}
                                  </button>
                                  <div className="ml-4 space-y-1">
                                    {subcategory.types.map((type) => (
                                      <button
                                        key={type.id}
                                        onClick={() => {
                                          toggleClose();
                                          if (
                                            type.url.startsWith('/inventory')
                                          ) {
                                            router.push(type.url);
                                          } else {
                                            window.location.href = type.url;
                                          }
                                        }}
                                        className="block w-full text-left text-[#888] hover:text-[#048B3D] font-normal text-[14px]"
                                      >
                                        • {type.name}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        // Regular mobile menu item
                        <Link
                          href={item.url}
                          className="text-[#222] hover:text-[#048B3D] font-medium text-[16px]"
                          onClick={toggleClose}
                        >
                          {item.name}
                        </Link>
                      )}
                    </li>
                  );
                })}
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
                {cartCount > 0 && (
                  <span className="bg-[#007934] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center ml-1">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      )}
      {/* Global search loading spinner overlay */}
      {isSearching && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/80">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#007934]"></div>
        </div>
      )}
    </>
  );
}

export default function Header() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeaderContent />
    </Suspense>
  );
}
