import { getProducts } from '@/utils/shopify';
import ClothingProduct from '@/components/ClothingProduct';

const ShoppingPage = async () => {
  const data = await getProducts();

  return <ClothingProduct data={data} />;
};

export default ShoppingPage;
