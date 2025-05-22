'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getAllCollections } from '@/utils/shopify';
import { FaTools } from 'react-icons/fa';

const PARTS_HANDLES = [
  'nrc-parts',
  'baproducts',
  'towmate',
  'accessories',
  'brackets-for-4-x-4-t-bar',
  'brackets-for-5-x-5-t-bar',
  'forks-accessories',
  'tool-mounts-storage',
  'stabilizer-grips',
  'car-carrier-brackets-10-20-000-lbs',
  'car-carrier-brackets-40-000-lbs',
  'ketchs',
  'others-towings',
];

function truncate(str: string, n: number) {
  return str.length > n ? str.slice(0, n) + '...' : str;
}

export default function PartsAccessories() {
  const [collections, setCollections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCollections() {
      try {
        const allCollections = await getAllCollections();
        const filtered = allCollections.filter((col: any) =>
          PARTS_HANDLES.includes(col.handle),
        );
        setCollections(filtered);
      } finally {
        setLoading(false);
      }
    }
    fetchCollections();
  }, []);

  return (
    <div className="bg-[#F4F4F4] min-h-screen pb-16 ">
      <div className="w-full flex flex-col items-center justify-center py-16 bg-gradient-to-r from-[#007934]/10 to-[#048B3D]/10">
        <FaTools className="mb-4 text-[#007934]" size={80} />
        <h1 className="text-4xl michroma-regular text-[#007934] mb-4 text-center">
          Parts & Accessories
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl text-center">
          Explore our wide range of parts and accessories for every job—towing,
          recovery, lighting, storage, and more. Quality gear for professionals
          and enthusiasts alike.
        </p>
      </div>
      <div className="max-w-[1440px] mx-auto px-4 mt-10 lg:px-10 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {loading
            ? [...Array(6)].map((_, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl shadow-md flex flex-col overflow-hidden animate-pulse h-full"
                >
                  <div className="relative w-full aspect-[4/3] bg-gray-200" />
                  <div className="p-6 flex flex-col flex-grow bg-white relative">
                    <div className="h-6 w-3/4 bg-gray-200 rounded mb-2" />
                    <div className="h-4 w-1/2 bg-gray-200 rounded mb-4" />
                    <div className="mt-auto pt-4 border-t border-gray-100">
                      <div className="h-6 w-24 bg-gray-200 rounded-full" />
                    </div>
                  </div>
                </div>
              ))
            : collections.map((cat) => (
                <div
                  key={cat.id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col overflow-hidden"
                >
                  <Link href={`/collections/${cat.handle}`} className="block">
                    <div className="relative w-full aspect-[4/3] bg-gray-100 flex items-center justify-center overflow-hidden">
                      <Image
                        src={cat.image?.url || '/placeholder-image.jpg'}
                        alt={cat.image?.altText || cat.title}
                        fill
                        className="object-contain transition-transform duration-300 hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h2 className="text-xl font-semibold text-[#2C2C2C] mb-2">
                        {truncate(cat.title, 22)}
                      </h2>
                      <p className="text-gray-600 text-sm mb-2 flex-grow">
                        {cat.description}
                      </p>
                      <span className="text-[#007934] font-medium text-sm  mb-2 flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
                        {cat.productsCount} Products
                      </span>
                      <span className="mt-2 inline-block px-6 py-2 bg-[#007934] text-white rounded-full font-semibold text-center hover:bg-[#005f27] transition">
                        View Products
                      </span>
                    </div>
                  </Link>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}
