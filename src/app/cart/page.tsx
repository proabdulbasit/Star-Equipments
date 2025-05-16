import React, { Suspense } from 'react';
import Cart from '../../features/Cart/cart';

export default function CartPage() {
  return (
    <Suspense fallback={<div>Loading cart...</div>}>
      <Cart />
    </Suspense>
  );
}
