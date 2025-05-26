'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { toast } from 'sonner';

export default function OrderSuccess() {
  const searchParams = useSearchParams();

  useEffect(() => {
    // Clear cart data after successful order
    Cookies.remove('cartId');
    toast.success('Order placed successfully!', {
      description: 'Thank you for your purchase.',
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F4F4F4]">
      <div className="text-center space-y-6">
        <h1 className="text-3xl michroma-regular text-[#2C2C2C]">
          Order Placed Successfully!
        </h1>
        <p className="text-gray-600 max-w-md mx-auto">
          Thank you for your purchase. We will process your order shortly.
        </p>
      </div>
    </div>
  );
}
