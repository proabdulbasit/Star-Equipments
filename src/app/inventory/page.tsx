import { Suspense } from 'react';
import InventoryClient from './InventoryClient';
import InventoryLoading from './loading';

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
