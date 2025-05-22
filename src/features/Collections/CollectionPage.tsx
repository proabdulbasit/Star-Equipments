import React, { Suspense } from 'react';
import { getProductsByCollectionWithOffset } from '@/utils/shopify';
import ClothingProduct from '@/components/ClothingProduct/clothingProduct';
import { notFound, redirect } from 'next/navigation';
import ClothingProductSkeleton from './skeleton';

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function CollectionPage({ params, searchParams }: Props) {
  try {
    const [{ id }, resolvedSearchParams] = await Promise.all([
      params,
      searchParams,
    ]);

    if (!id) {
      notFound();
    }

    const getSearchParam = (key: string): string | undefined => {
      const value = resolvedSearchParams[key];
      return Array.isArray(value) ? value[0] : value;
    };

    const sort = (getSearchParam('sort') || 'RELEVANCE') as
      | 'TITLE'
      | 'PRICE'
      | 'CREATED_AT'
      | 'BEST_SELLING'
      | 'ID'
      | 'RELEVANCE';
    const reverse = getSearchParam('reverse') === 'true';

    const priceFrom = getSearchParam('filter.v.price.gte')
      ? parseFloat(getSearchParam('filter.v.price.gte')!)
      : undefined;
    const priceTo = getSearchParam('filter.v.price.lte')
      ? parseFloat(getSearchParam('filter.v.price.lte')!)
      : undefined;

    const page = getSearchParam('page')
      ? Math.max(1, parseInt(getSearchParam('page')!, 10))
      : 1;

    const pageSize = 16;

    const data = await getProductsByCollectionWithOffset(id, page, pageSize, {
      sortKey: sort,
      reverse,
      priceFrom,
      priceTo,
    });

    if (!data.products || data.products.length === 0) {
      if (page === 1) {
        notFound();
      } else {
        const searchParamsString = new URLSearchParams();
        Object.entries(resolvedSearchParams).forEach(([key, value]) => {
          if (key !== 'page' && value) {
            searchParamsString.append(
              key,
              Array.isArray(value) ? value[0] : value,
            );
          }
        });
        searchParamsString.set('page', '1');

        redirect(`/collections/${id}?${searchParamsString.toString()}`);
      }
    }

    if (page > data.pageInfo.totalPages && data.pageInfo.totalPages > 0) {
      const searchParamsString = new URLSearchParams();
      Object.entries(resolvedSearchParams).forEach(([key, value]) => {
        if (key !== 'page' && value) {
          searchParamsString.append(
            key,
            Array.isArray(value) ? value[0] : value,
          );
        }
      });
      searchParamsString.set('page', data.pageInfo.totalPages.toString());

      redirect(`/collections/${id}?${searchParamsString.toString()}`);
    }

    return (
      <Suspense fallback={<ClothingProductSkeleton />}>
        <div>
          <ClothingProduct
            products={data.products}
            pageInfo={data.pageInfo}
            currentSort={sort}
            currentPriceFrom={priceFrom}
            currentPriceTo={priceTo}
            currentPage={page}
            collectionId={id}
          />
        </div>
      </Suspense>
    );
  } catch (error) {
    console.error('Error fetching collection:', error);
    notFound();
  }
}
