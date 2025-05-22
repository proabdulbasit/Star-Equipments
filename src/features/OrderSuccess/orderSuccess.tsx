'use client';
import { useEffect } from 'react';
import { useCart } from '@/context/CartContext';

export default function OrderSuccess() {
  const { setCart } = useCart();

  useEffect(() => {
    setCart(null);
    sessionStorage.removeItem('cartId');
  }, [setCart]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F4F4F4]">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        Thank you for your order!
      </h1>
      <p className="text-lg text-gray-700 mb-2">
        Your order was placed successfully and will be delivered soon.
      </p>
      <p className="text-gray-500">
        A confirmation email has been sent to you.
      </p>
    </div>
  );
}
