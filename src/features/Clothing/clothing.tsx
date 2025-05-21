import ClothingProduct from '@/components/ClothingProduct/clothingProduct';
import { getProductsByCollection } from '@/utils/shopify';
import { headers } from 'next/headers';
import Cart from '@/features/Cart';

export default async function ClothingPage({
  searchParams,
}: {
  searchParams?: Record<string, string>;
}) {
  const sort = searchParams?.sort || 'RELEVANCE';
  const priceFrom = searchParams?.priceFrom
    ? parseFloat(searchParams.priceFrom)
    : undefined;
  const priceTo = searchParams?.priceTo
    ? parseFloat(searchParams.priceTo)
    : undefined;
  const cursor = searchParams?.cursor;
  const direction = searchParams?.direction;
  const pageSize = 16;

  let options: any = {
    pageSize,
    sortKey: sort as any,
    priceFrom,
    priceTo,
  };

  if (cursor && direction === 'next') {
    options.after = cursor;
    options.first = pageSize;
  } else if (cursor && direction === 'prev') {
    options.before = cursor;
    options.last = pageSize;
  } else {
    options.first = pageSize;
  }

  const data = await getProductsByCollection('towmate', options);

  if (!data.collectionByHandle?.products?.edges) {
    return <div>No products found</div>;
  }

  return (
    <div>
      <ClothingProduct
        products={data.collectionByHandle.products.edges}
        pageInfo={{
          ...data.collectionByHandle.products.pageInfo,
          currentPage: 1,
          totalPages: 1,
          totalProducts: data.collectionByHandle.products.edges.length,
        }}
        currentSort={sort}
        currentPriceFrom={priceFrom}
        currentPriceTo={priceTo}
        currentPage={1}
      />
    </div>
  );
}
