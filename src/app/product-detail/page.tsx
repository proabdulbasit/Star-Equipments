import ProductDetail from '@/features/ProductDetail/productDetail';
import { ProductDetailProps } from '@/features/ProductDetail/type';

async function getProductData() {
  return {
    title: 'Sample Product',
    priceRange: {
      minVariantPrice: {
        amount: '99.99',
      },
    },
    variants: {
      edges: [
        {
          node: {
            id: 'sample-variant-id',
          },
        },
      ],
    },
  };
}

export default async function ProductDetailPage() {
  const product = await getProductData();
  return <ProductDetail product={product} />;
}
