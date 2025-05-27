import { Suspense } from 'react';
import OrderSuccess from '@/features/OrderSuccess/orderSuccess';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Order Confirmed - Star Equipment Sales',
  description:
    'Thank you for your order at Star Equipment Sales. Your order has been successfully placed and confirmed.',
  openGraph: {
    title: 'Order Confirmed - Star Equipment Sales',
    description:
      'Thank you for your order at Star Equipment Sales. Your order has been successfully placed and confirmed.',
    type: 'website',
  },
};

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderSuccess />
    </Suspense>
  );
}
