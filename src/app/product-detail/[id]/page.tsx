import { getProduct } from '@/utils/shopify';
import ProductDetail from '@/features/ProductDetail';
import { Suspense } from 'react';
import ProductDetailSkeleton from '@/features/ProductDetail/skeleton';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { id } = await params;
    const product = await getProduct(decodeURIComponent(id));

    if (!product) {
      return {
        title: 'Product Not Found - Star Equipment Sales',
        description: 'The requested product could not be found.',
      };
    }

    return {
      title: `${product.title} - Star Equipment Sales`,
      description:
        product.description ||
        `View details about ${product.title} at Star Equipment Sales.`,
      openGraph: {
        title: `${product.title} - Star Equipment Sales`,
        description:
          product.description ||
          `View details about ${product.title} at Star Equipment Sales.`,
        type: 'website',
        images: product.featuredImage?.url
          ? [
              {
                url: product.featuredImage.url,
                width: 1200,
                height: 630,
                alt: product.title,
              },
            ]
          : undefined,
      },
    };
  } catch (error) {
    return {
      title: 'Product Details - Star Equipment Sales',
      description: 'View detailed information about our products.',
    };
  }
}

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
