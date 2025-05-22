import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-[#F4F4F4] px-4">
      <Image
        src="/assets/Homepage/dots-icon.svg"
        alt="dots"
        width={120}
        height={120}
        className="w-[100px] h-[120px] mb-8"
      />
      <h1 className="text-3xl font-bold text-[#2C2C2C] mb-4">
        Collection Not Found
      </h1>
      <p className="text-gray-600 mb-8 text-center">
        Sorry, we couldn&apos;t find the collection you&apos;re looking for.
      </p>
      <Link
        href="/parts-accessories"
        className="bg-[#007934] text-white px-6 py-3 rounded-md hover:bg-[#006529] transition-colors"
      >
        Return to Collections
      </Link>
    </div>
  );
}
