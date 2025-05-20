import ClothingProduct from '@/components/ClothingProduct/clothingProduct';
import { getProductsByCollection } from '@/utils/shopify';
import { headers } from 'next/headers';

export default async function ClothingPage({
  searchParams,
}: {
  searchParams?: Record<string, string>;
}) {
  // Parse query params
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

  // Cursor-based pagination logic
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
        pageInfo={data.collectionByHandle.products.pageInfo}
        currentSort={sort}
        currentPriceFrom={priceFrom}
        currentPriceTo={priceTo}
        currentCursor={cursor}
        currentDirection={direction}
      />
    </div>
  );
}
