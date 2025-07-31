'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaTools } from 'react-icons/fa';
import CollectionsSidebar from '@/components/CollectionsSidebar';

export default function CollectionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Extract collection name from pathname
  const getCollectionName = () => {
    if (pathname === '/collections') {
      return 'Shop Our Products';
    }
    if (pathname === '/collections/baproducts') {
      return 'B/A Products';
    }
    const segments = pathname.split('/');
    const collectionId = segments[segments.length - 1];
    return collectionId.replace(/-/g, ' ');
  };

  return (
    <div className="bg-[#F4F4F4] min-h-screen">
      {/* Green Header Section - Persistent */}
      <div className="w-full flex flex-col items-center justify-center py-16 bg-gradient-to-r from-[#007934]/10 to-[#048B3D]/10">
        <FaTools className="mb-4 text-[#007934]" size={80} />
        <h1 className="text-4xl michroma-regular text-[#007934] mb-4 text-center capitalize">
          {getCollectionName()}
        </h1>
        {/* <p className="text-lg text-gray-700 max-w-2xl text-center px-4">
          Explore our wide range of parts and accessories for every job—towing,
          recovery, lighting, storage, and more. Quality gear for professionals
          and enthusiasts alike.
        </p> */}
      </div>

      {/* Breadcrumb - Persistent */}
      <div className="xl:w-[1440px] mx-auto px-4 py-4">
        <nav className="flex items-center space-x-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-[#007934] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            href="/collections"
            className="hover:text-[#007934] transition-colors"
          >
            Collections
          </Link>
          {pathname !== '/collections' && (
            <>
              <span>/</span>
              <span className="text-[#007934] font-medium capitalize">
                {getCollectionName()}
              </span>
            </>
          )}
        </nav>
      </div>

      {/* Main Content with Sidebar - Persistent Layout */}
      <div className="xl:w-[1440px] mx-auto px-4 pb-12">
        <div className="flex gap-8 items-start">
          {/* Sidebar - Desktop only - PERSISTENT */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <CollectionsSidebar />
          </div>

          {/* Main Content - Only this changes */}
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </div>
  );
}
