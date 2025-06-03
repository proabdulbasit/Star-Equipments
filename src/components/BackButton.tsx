'use client';

import { useRouter } from 'next/navigation';
import { IoArrowBack } from 'react-icons/io5';

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="fixed top-20 left-4 lg:left-8 z-50 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors bg-white/80 backdrop-blur-sm px-3 py-2 rounded-lg shadow-sm"
      aria-label="Go back"
    >
      <IoArrowBack className="w-5 h-5" />
      <span className="text-sm font-medium">Back</span>
    </button>
  );
}
