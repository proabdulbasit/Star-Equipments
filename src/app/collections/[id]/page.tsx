import React from 'react';
import { getProductsByCollectionWithOffset } from '../../../utils/shopify';
import ClothingProduct from '../../../components/ClothingProduct/clothingProduct';
import { notFound, redirect } from 'next/navigation';

interface PageProps {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function CollectionPage({
  params,
  searchParams,
}: PageProps) {
  try {
    // Ensure params.id is available
    if (!params?.id) {
      notFound();
    }

    // Helper function to safely get string value from searchParams
    const getSearchParam = (key: string): string | undefined => {
      const value = searchParams[key];
      return Array.isArray(value) ? value[0] : value;
    };

    // Parse query params with proper type checking
    const sort = (getSearchParam('sort') || 'RELEVANCE') as
      | 'TITLE'
      | 'PRICE'
      | 'CREATED_AT'
      | 'BEST_SELLING'
      | 'ID'
      | 'RELEVANCE';
    const reverse = getSearchParam('reverse') === 'true';

    // Update price filter parameter parsing with proper type checking
    const priceFrom = getSearchParam('filter.v.price.gte')
      ? parseFloat(getSearchParam('filter.v.price.gte')!)
      : undefined;
    const priceTo = getSearchParam('filter.v.price.lte')
      ? parseFloat(getSearchParam('filter.v.price.lte')!)
      : undefined;

    // Parse page number with validation
    const page = getSearchParam('page')
      ? Math.max(1, parseInt(getSearchParam('page')!, 10))
      : 1;

    const pageSize = 16;

    // Get products with pagination
    const data = await getProductsByCollectionWithOffset(
      params.id,
      page,
      pageSize,
      {
        sortKey: sort,
        reverse,
        priceFrom,
        priceTo,
      },
    );

    if (!data.products || data.products.length === 0) {
      if (page === 1) {
        notFound();
      } else {
        // If no products found on a page other than 1, redirect to page 1
        const searchParamsString = new URLSearchParams();
        // Copy all existing search params except page
        Object.entries(searchParams).forEach(([key, value]) => {
          if (key !== 'page' && value) {
            searchParamsString.append(
              key,
              Array.isArray(value) ? value[0] : value,
            );
          }
        });
        searchParamsString.set('page', '1');

        redirect(`/collections/${params.id}?${searchParamsString.toString()}`);
      }
    }

    // If the requested page is greater than total pages, redirect to last page
    if (page > data.pageInfo.totalPages && data.pageInfo.totalPages > 0) {
      const searchParamsString = new URLSearchParams();
      // Copy all existing search params except page
      Object.entries(searchParams).forEach(([key, value]) => {
        if (key !== 'page' && value) {
          searchParamsString.append(
            key,
            Array.isArray(value) ? value[0] : value,
          );
        }
      });
      searchParamsString.set('page', data.pageInfo.totalPages.toString());

      redirect(`/collections/${params.id}?${searchParamsString.toString()}`);
    }

    return (
      <div>
        <ClothingProduct
          products={data.products}
          pageInfo={data.pageInfo}
          currentSort={sort}
          currentPriceFrom={priceFrom}
          currentPriceTo={priceTo}
          currentPage={page}
        />
      </div>
    );
  } catch (error) {
    console.error('Error fetching collection:', error);
    notFound();
  }
}
