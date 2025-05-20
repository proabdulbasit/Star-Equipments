import React from 'react';
import { getProductsByCollection } from '../../../utils/shopify';
import ClothingProduct from '../../../components/ClothingProduct/clothingProduct';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams?: Promise<Record<string, string>>;
}

export default async function CollectionPage({
  params,
  searchParams,
}: PageProps) {
  try {
    // Await both params and searchParams
    const resolvedParams = await params;
    const resolvedSearchParams = await searchParams;

    // Ensure params.id is available
    if (!resolvedParams?.id) {
      notFound();
    }

    // Parse query params
    const sort = resolvedSearchParams?.sort || 'RELEVANCE';
    const reverse = resolvedSearchParams?.reverse === 'true';
    const priceFrom = resolvedSearchParams?.priceFrom
      ? parseFloat(resolvedSearchParams.priceFrom)
      : undefined;
    const priceTo = resolvedSearchParams?.priceTo
      ? parseFloat(resolvedSearchParams.priceTo)
      : undefined;
    const cursor = resolvedSearchParams?.cursor;
    const direction = resolvedSearchParams?.direction;
    const pageSize = 16;

    // Cursor-based pagination logic
    let options: any = {
      pageSize,
      sortKey: sort as any,
      reverse,
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

    // Fetch data with the collection ID
    const data = await getProductsByCollection(resolvedParams.id, options);

    if (!data.collectionByHandle?.products?.edges) {
      notFound();
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
  } catch (error) {
    console.error('Error fetching collection:', error);
    notFound();
  }
}
