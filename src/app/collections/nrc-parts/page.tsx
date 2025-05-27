import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getNRCCategories } from '@/utils/shopify';
import NRCCategoryCard from '@/components/NRCCategoryCard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NRC Parts - Star Equipment Sales',
  description:
    'Explore our comprehensive collection of NRC parts. Find high-quality towing equipment parts and accessories for your fleet.',
  openGraph: {
    title: 'NRC Parts - Star Equipment Sales',
    description:
      'Explore our comprehensive collection of NRC parts. Find high-quality towing equipment parts and accessories for your fleet.',
    type: 'website',
  },
};

export const dynamic = 'force-dynamic';

export default async function NRCCategoriesPage() {
  try {
    const categories = await getNRCCategories();

    if (!categories || categories.length === 0) {
      return (
        <div className="min-h-screen bg-[#F4F4F4] flex flex-col items-center justify-center px-4">
          <Image
            src="/assets/Homepage/dots-icon.svg"
            alt="dots"
            width={120}
            height={120}
            className="w-[100px] h-[120px] mb-8"
          />
          <h1 className="text-3xl font-bold text-[#2C2C2C] mb-4">
            No Categories Found
          </h1>
          <p className="text-gray-600 mb-8 text-center">
            No NRC categories are currently available. Please check back later.
          </p>
          <Link
            href="/"
            className="bg-[#007934] text-white px-6 py-3 rounded-md hover:bg-[#006529] transition-colors"
          >
            Return Home
          </Link>
        </div>
      );
    }

    return (
      <div className="bg-[#F4F4F4] min-h-screen">
        {/* Header Section */}
        <div className="flex bg-[#F4F4F4] items-center">
          <Image
            src="/assets/Homepage/dots-icon.svg"
            alt="dots"
            width={120}
            height={120}
            className="lg:w-[100px] lg:h-[120px] lg:mt-0 mt-16 w-[40px] h-[50px]"
          />
          <div className="flex w-full pr-24 lg:mt-0 mt-16 items-center justify-center">
            <h1 className="lg:text-3xl text-sm michroma-regular text-center text-[#2C2C2C]">
              NRC Parts Categories
            </h1>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="xl:w-[1440px] mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-[#007934] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/parts-accessories"
              className="hover:text-[#007934] transition-colors"
            >
              Collections
            </Link>
            <span>/</span>
            <span className="text-[#007934]">NRC Parts</span>
          </nav>
        </div>

        {/* Categories Grid */}
        <div className="xl:w-[1440px] mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">
            {categories.map((category) => (
              <NRCCategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error in NRCCategoriesPage:', error);
    notFound();
  }
}
