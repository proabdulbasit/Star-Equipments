import { Suspense } from 'react';
import InventoryClient from './InventoryClient';

export default function InventoryPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading inventory...
        </div>
      }
    >
      <InventoryClient />
    </Suspense>
  );
}
