import ProductDetail from '@/features/ProductDetail/productDetail';
import { ProductDetailProps } from '@/features/ProductDetail/type';

async function getProductData() {
  return {
    id: 'sample-product-id',
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
    featuredImage: {
      url: '/assets/ProductDetail/placeholder.png',
      altText: 'Sample Product Image',
    },
  };
}

export default async function ProductDetailPage() {
  const product = await getProductData();
  return <ProductDetail product={product} />;
}
