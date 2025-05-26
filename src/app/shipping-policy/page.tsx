import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shipping Policy - Star Equipment Sales',
  description:
    'Learn about our shipping policies, costs, and return shipping procedures. Understand how shipping times and costs are calculated for your orders.',
  openGraph: {
    title: 'Shipping Policy - Star Equipment Sales',
    description:
      'Learn about our shipping policies, costs, and return shipping procedures. Understand how shipping times and costs are calculated for your orders.',
    type: 'website',
  },
};

export default function ShippingPolicy() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 py-16">
      <h1 className="text-5xl font-light text-center mb-12">Shipping policy</h1>
      <div className="max-w-2xl w-full mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-gray-700">Shipping</h2>
        <p className="text-lg text-gray-600 mb-6">
          You will be responsible for paying for your own shipping costs for
          returning your item. Shipping costs are non refundable.
        </p>
        <p className="text-lg text-gray-600 mb-6">
          If you receive a refund, the cost of return shipping will also be
          deducted from your refund.
        </p>
        <p className="text-lg text-gray-600">
          Shipping times depend on weight, size, and merchant availability
          depending on market. Please contact for more information.
        </p>
      </div>
    </div>
  );
}
