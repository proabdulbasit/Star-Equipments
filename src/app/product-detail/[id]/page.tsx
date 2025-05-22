import { getProduct } from '@/utils/shopify';
import ProductDetail from '@/features/ProductDetail';
import { Suspense } from 'react';
import ProductDetailSkeleton from '@/features/ProductDetail/skeleton';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProductPage({ params }: Props) {
  try {
    const { id } = await params;
    const product = await getProduct(decodeURIComponent(id));

    if (!product) {
      return <div>Product not found</div>;
    }

    return (
      <Suspense fallback={<ProductDetailSkeleton />}>
        <ProductDetail product={product} />
      </Suspense>
    );
  } catch (error) {
    console.error('Error loading product:', error);
    return <div>Error loading product</div>;
  }
}
