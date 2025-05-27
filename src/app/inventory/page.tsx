import { Suspense } from 'react';
import InventoryClient from './InventoryClient';
import InventoryLoading from './loading';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Inventory - Star Equipment Sales',
  description:
    'Browse our extensive inventory of premium towing equipment and parts. Find the perfect equipment for your towing needs.',
  openGraph: {
    title: 'Inventory - Star Equipment Sales',
    description:
      'Browse our extensive inventory of premium towing equipment and parts. Find the perfect equipment for your towing needs.',
    type: 'website',
  },
};

export default function InventoryPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <InventoryLoading />
        </div>
      }
    >
      <InventoryClient />
    </Suspense>
  );
}
