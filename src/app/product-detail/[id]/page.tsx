import { getProduct } from '@/utils/shopify';
import ProductDetail from '@/features/ProductDetail';

type PageProps = {
  params: {
    id: string;
  };
};

export default async function ProductPage({ params }: PageProps) {
  const product = await getProduct(decodeURIComponent(params.id));
  return <ProductDetail product={product} />;
}
