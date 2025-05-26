import { gql, GraphQLClient } from 'graphql-request';
import {
  GetProductResponse,
  RetrieveCartResponse,
  Product,
  Cart,
  DiscountedProduct,
} from '@/utils/type';

const storefrontAccessToken = process.env.NEXT_PUBLIC_STORE_FRONT_ACCESS_TOKEN;
const endpoint = process.env.NEXT_PUBLIC_SHOP_URL;

const graphQLClient = new GraphQLClient(endpoint!, {
  headers: {
    'X-Shopify-Storefront-Access-Token': storefrontAccessToken!,
    'Content-Type': 'application/json',
  },
});

export async function getProducts(): Promise<{
  products: { edges: { node: Product }[] };
}> {
  const getAllProductsQuery = gql`
    {
      products(first: 10) {
        edges {
          node {
            id
            title
            handle
            featuredImage {
              url
              altText
            }
            priceRange {
              minVariantPrice {
                amount
              }
            }
            variants(first: 1) {
              edges {
                node {
                  id
                }
              }
            }
          }
        }
      }
    }
  `;
  return graphQLClient.request(getAllProductsQuery);
}

export async function addToCart(
  itemId: string,
  quantity: number,
): Promise<any> {
  const createCartMutation = gql`
    mutation createCart($cartInput: CartInput) {
      cartCreate(input: $cartInput) {
        cart {
          id
        }
      }
    }
  `;
  const variables = {
    cartInput: {
      lines: [{ quantity, merchandiseId: itemId }],
    },
  };
  return graphQLClient.request(createCartMutation, variables);
}

export async function updateCartItem(
  cartId: string,
  lineId: string,
  quantity: number,
): Promise<any> {
  const updateCartMutation = gql`
    mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          id
        }
      }
    }
  `;
  const variables = {
    cartId,
    lines: [{ id: lineId, quantity }],
  };
  return graphQLClient.request(updateCartMutation, variables);
}

export async function updateCart(
  cartId: string,
  itemId: string,
  quantity: number,
): Promise<any> {
  const updateCartMutation = gql`
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
        }
      }
    }
  `;
  const variables = {
    cartId,
    lines: [{ quantity, merchandiseId: itemId }],
  };
  return graphQLClient.request(updateCartMutation, variables);
}

export async function getProduct(id: string): Promise<Product> {
  const productQuery = gql`
    query getProduct($id: ID!) {
      product(id: $id) {
        id
        handle
        title
        description
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        featuredImage {
          url
          altText
        }
        images(first: 10) {
          edges {
            node {
              url
              altText
            }
          }
        }
        variants(first: 10) {
          edges {
            node {
              id
              selectedOptions {
                name
                value
              }
            }
          }
        }
      }
    }
  `;

  const response = await graphQLClient.request<GetProductResponse>(
    productQuery,
    { id },
  );
  return response.product;
}

export async function retrieveCart(cartId: string): Promise<Cart> {
  const cartQuery = gql`
    query cartQuery($cartId: ID!) {
      cart(id: $cartId) {
        id
        lines(first: 10) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  selectedOptions {
                    name
                    value
                  }
                  product {
                    id
                    title
                    handle
                    featuredImage {
                      url
                      altText
                    }
                    priceRange {
                      minVariantPrice {
                        amount
                      }
                    }
                  }
                }
              }
            }
          }
        }
        estimatedCost {
          totalAmount {
            amount
          }
        }
      }
    }
  `;

  const response = await graphQLClient.request<RetrieveCartResponse>(
    cartQuery,
    { cartId },
  );
  return response.cart;
}
export async function getCheckoutUrl(
  cartId: string,
): Promise<{ cart: { checkoutUrl: string } }> {
  const getCheckoutUrlQuery = gql`
    query checkoutURL($cartId: ID!) {
      cart(id: $cartId) {
        checkoutUrl
      }
    }
  `;
  return graphQLClient.request(getCheckoutUrlQuery, { cartId });
}

export async function deleteCart(
  cartId: string,
  lineItemId: string,
): Promise<any> {
  const deleteCartMutation = gql`
    mutation deleteCart($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          id
          lines(first: 10) {
            edges {
              node {
                id
                quantity
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await graphQLClient.request(deleteCartMutation, {
      cartId,
      lineIds: [lineItemId],
    });
    return response;
  } catch (error) {
    alert('Failed to remove item from the cart!');
    console.error(error);
  }
}

/**
 * Fetch products by collection handle with pagination, sorting, and filtering.
 * @param collectionHandle - Shopify collection handle
 * @param options - { pageSize, cursor, sortKey, reverse, priceFrom, priceTo, availability }
 */
export async function getProductsByCollection(
  collectionHandle: string,
  options?: {
    pageSize?: number;
    cursor?: string;
    sortKey?:
      | 'TITLE'
      | 'PRICE'
      | 'CREATED_AT'
      | 'BEST_SELLING'
      | 'ID'
      | 'RELEVANCE';
    reverse?: boolean;
    priceFrom?: number;
    priceTo?: number;
    availability?: 'in' | 'out';
    after?: string;
    before?: string;
    first?: number;
    last?: number;
  },
): Promise<{
  collectionByHandle: {
    products: {
      edges: { node: Product }[];
      pageInfo: {
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        endCursor: string;
        startCursor: string;
      };
    };
  };
}> {
  const {
    pageSize = 16,
    sortKey = 'RELEVANCE',
    reverse = false,
    priceFrom,
    priceTo,
    availability,
    after,
    before,
    first,
    last,
  } = options || {};

  // Build query string for filtering
  let queryFilters = [];
  if (availability === 'in') queryFilters.push('available_for_sale:true');
  if (availability === 'out') queryFilters.push('available_for_sale:false');
  if (typeof priceFrom === 'number')
    queryFilters.push(`price:>='${priceFrom}'`);
  if (typeof priceTo === 'number') queryFilters.push(`price:<='${priceTo}'`);
  const queryString = queryFilters.length ? queryFilters.join(' AND ') : '';

  // Build pagination parameters
  let paginationParams = [];
  if (after) paginationParams.push(`after: "${after}"`);
  if (before) paginationParams.push(`before: "${before}"`);
  if (first) paginationParams.push(`first: ${first}`);
  if (last) paginationParams.push(`last: ${last}`);
  if (!after && !before && !first && !last)
    paginationParams.push(`first: ${pageSize}`);

  const gqlQuery = `
    {
      collectionByHandle(handle: "${collectionHandle}") {
        products(
          ${paginationParams.join(', ')}
          sortKey: ${sortKey}
          reverse: ${reverse}
          ${queryString ? `, query: "${queryString}"` : ''}
        ) {
          pageInfo {
            hasNextPage
            hasPreviousPage
            endCursor
            startCursor
          }
          edges {
            node {
              id
              title
              handle
              featuredImage { url altText }
              priceRange { minVariantPrice { amount } }
              availableForSale
              variants(first: 1) {
                edges {
                  node {
                    id
                  }
                }
              }
            }
          }
        }
      }
    }
  `;
  return graphQLClient.request(gqlQuery);
}

interface Collection {
  id: string;
  handle: string;
  title: string;
  description: string;
  image?: {
    url: string;
    altText?: string;
  } | null;
  productsCount: number;
}

async function getCollectionProductCount(
  collectionHandle: string,
): Promise<number> {
  const countQuery = `
    {
      collectionByHandle(handle: "${collectionHandle}") {
        products(first: 250) {
          edges {
            node {
              id
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    }
  `;

  try {
    const response = await graphQLClient.request<{
      collectionByHandle: {
        products: {
          edges: Array<{ node: { id: string } }>;
          pageInfo: {
            hasNextPage: boolean;
            endCursor: string;
          };
        };
      };
    }>(countQuery);

    // Count the products in the first page
    let totalCount = response.collectionByHandle.products.edges.length;

    // If there are more pages, keep fetching until we get all products
    if (response.collectionByHandle.products.pageInfo.hasNextPage) {
      let hasNextPage = true;
      let cursor = response.collectionByHandle.products.pageInfo.endCursor;

      while (hasNextPage) {
        const nextPageQuery = `
          {
            collectionByHandle(handle: "${collectionHandle}") {
              products(
                first: 250
                after: "${cursor}"
              ) {
                edges {
                  node {
                    id
                  }
                }
                pageInfo {
                  hasNextPage
                  endCursor
                }
              }
            }
          }
        `;

        const nextPageResponse = await graphQLClient.request<{
          collectionByHandle: {
            products: {
              edges: Array<{ node: { id: string } }>;
              pageInfo: {
                hasNextPage: boolean;
                endCursor: string;
              };
            };
          };
        }>(nextPageQuery);

        const nextPageCount =
          nextPageResponse.collectionByHandle.products.edges.length;
        totalCount += nextPageCount;
        hasNextPage =
          nextPageResponse.collectionByHandle.products.pageInfo.hasNextPage;
        cursor =
          nextPageResponse.collectionByHandle.products.pageInfo.endCursor;

        // If we got less than a full page, we've reached the end
        if (nextPageCount < 250) {
          break;
        }
      }
    }

    console.log(
      `Collection ${collectionHandle} total product count:`,
      totalCount,
    );
    return totalCount;
  } catch (error) {
    console.error('Error getting collection product count:', error);
    return 0;
  }
}

export async function getAllCollections(): Promise<Collection[]> {
  const collectionsQuery = gql`
    {
      collections(first: 50) {
        edges {
          node {
            id
            handle
            title
            description
            image {
              url
              altText
            }
          }
        }
      }
    }
  `;

  try {
    const response = await graphQLClient.request<{
      collections: {
        edges: Array<{
          node: {
            id: string;
            handle: string;
            title: string;
            description: string;
            image?: {
              url: string;
              altText?: string;
            } | null;
          };
        }>;
      };
    }>(collectionsQuery);

    // Map the collections and get product counts in parallel
    const collections = await Promise.all(
      response.collections.edges.map(async (edge) => {
        // Get the product count for each collection using the improved counting logic
        const productsCount = await getCollectionProductCount(edge.node.handle);

        return {
          id: edge.node.id,
          handle: edge.node.handle,
          title: edge.node.title,
          description: edge.node.description,
          image: edge.node.image,
          productsCount,
        };
      }),
    );

    // Log the collections with their counts for debugging
    console.log(
      'Collections with product counts:',
      collections.map((c) => ({
        title: c.title,
        handle: c.handle,
        productsCount: c.productsCount,
      })),
    );

    return collections;
  } catch (error) {
    console.error('Error fetching collections:', error);
    return [];
  }
}

export interface NRCCategory {
  id: string;
  handle: string;
  title: string;
  description: string;
  image: {
    url: string;
    altText: string;
  };
}

export async function getNRCCategories(): Promise<NRCCategory[]> {
  const query = gql`
    query GetNRCCategories {
      collections(first: 50, query: "handle:nrc-*") {
        edges {
          node {
            id
            handle
            title
            description
            image {
              url
              altText
            }
          }
        }
      }
    }
  `;

  try {
    const response = await graphQLClient.request<{
      collections: {
        edges: Array<{
          node: {
            id: string;
            handle: string;
            title: string;
            description: string;
            image?: {
              url: string;
              altText?: string;
            } | null;
          };
        }>;
      };
    }>(query);

    const collections = response.collections.edges.map(({ node }) => ({
      id: node.id,
      handle: node.handle.replace('nrc-', ''), // Remove 'nrc-' prefix for cleaner URLs
      title: node.title,
      description: node.description || '',
      image: {
        url: node.image?.url || '/placeholder-image.jpg',
        altText: node.image?.altText || node.title,
      },
    }));

    // Filter and sort NRC categories
    const nrcCategories = collections.filter((collection: NRCCategory) => {
      const validHandles = [
        'brackets-for-4-x-4-t-bar',
        'brackets-for-5-x-5-t-bar',
        'car-carrier-brackets-10-20-000-lbs',
        'car-carrier-brackets-40-000-lbs',
        'forks-accessories',
        'ketchs',
        'others-towings',
        'tool-mounts-storage',
        'stabilizer-grips',
      ];
      return validHandles.includes(collection.handle);
    });

    return nrcCategories;
  } catch (error) {
    console.error('Error fetching NRC categories:', error);
    return [];
  }
}

async function getCollectionCount(
  collectionHandle: string,
  filterString?: string,
): Promise<number> {
  const countQuery = `
    {
      collectionByHandle(handle: "${collectionHandle}") {
        products(
          first: 250
          ${filterString ? filterString : ''}
        ) {
          edges {
            node {
              id
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    }
  `;

  try {
    const response = await graphQLClient.request<{
      collectionByHandle: {
        products: {
          edges: Array<{ node: { id: string } }>;
          pageInfo: {
            hasNextPage: boolean;
            endCursor: string;
          };
        };
      };
    }>(countQuery);

    const firstPageCount = response.collectionByHandle.products.edges.length;

    if (response.collectionByHandle.products.pageInfo.hasNextPage) {
      let totalCount = firstPageCount;
      let hasNextPage = true;
      let cursor = response.collectionByHandle.products.pageInfo.endCursor;

      // Keep fetching pages until we get all products or reach a reasonable limit
      while (hasNextPage && totalCount < 1000) {
        const nextPageQuery = `
          {
            collectionByHandle(handle: "${collectionHandle}") {
              products(
                first: 250
                after: "${cursor}"
                ${filterString ? filterString : ''}
              ) {
                edges {
                  node {
                    id
                  }
                }
                pageInfo {
                  hasNextPage
                  endCursor
                }
              }
            }
          }
        `;

        const nextPageResponse = await graphQLClient.request<{
          collectionByHandle: {
            products: {
              edges: Array<{ node: { id: string } }>;
              pageInfo: {
                hasNextPage: boolean;
                endCursor: string;
              };
            };
          };
        }>(nextPageQuery);

        const nextPageCount =
          nextPageResponse.collectionByHandle.products.edges.length;
        totalCount += nextPageCount;
        hasNextPage =
          nextPageResponse.collectionByHandle.products.pageInfo.hasNextPage;
        cursor =
          nextPageResponse.collectionByHandle.products.pageInfo.endCursor;

        // If we got less than a full page, we've reached the end
        if (nextPageCount < 250) {
          break;
        }
      }

      console.log(`Collection ${collectionHandle} total count:`, totalCount);
      return totalCount;
    }

    // If no next page, return the exact count
    console.log(`Collection ${collectionHandle} total count:`, firstPageCount);
    return firstPageCount;
  } catch (error) {
    console.error('Error getting collection count:', error);
    return 0;
  }
}

export async function getProductsByCollectionWithOffset(
  collectionHandle: string,
  page: number,
  pageSize: number = 16,
  options?: {
    sortKey?:
      | 'TITLE'
      | 'PRICE'
      | 'CREATED_AT'
      | 'BEST_SELLING'
      | 'ID'
      | 'RELEVANCE';
    reverse?: boolean;
    priceFrom?: number;
    priceTo?: number;
    availability?: 'in' | 'out';
  },
): Promise<{
  products: { node: Product }[];
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    currentPage: number;
    totalPages: number;
    totalProducts: number;
    hasMoreProducts?: boolean;
  };
}> {
  const {
    sortKey = 'RELEVANCE',
    reverse = false,
    priceFrom,
    priceTo,
    availability,
  } = options || {};

  // Build filter conditions using Shopify's filter syntax
  let filterConditions = [];

  if (availability === 'in') {
    filterConditions.push('available_for_sale: true');
  } else if (availability === 'out') {
    filterConditions.push('available_for_sale: false');
  }

  if (typeof priceFrom === 'number') {
    filterConditions.push(`variants_price_gte: ${priceFrom.toFixed(2)}`);
  }
  if (typeof priceTo === 'number') {
    filterConditions.push(`variants_price_lte: ${priceTo.toFixed(2)}`);
  }

  const filterString =
    filterConditions.length > 0
      ? `filter: { ${filterConditions.join(', ')} }`
      : '';

  try {
    // Get total count first
    const totalCount = await getCollectionCount(collectionHandle, filterString);
    const hasMoreProducts = totalCount >= 1000;
    const effectiveTotal = hasMoreProducts ? 1000 : totalCount;
    const totalPages = Math.ceil(effectiveTotal / pageSize);
    const currentPage = Math.min(page, totalPages);

    // If we're requesting a page beyond what's available, return empty results
    if (currentPage > totalPages) {
      return {
        products: [],
        pageInfo: {
          hasNextPage: false,
          hasPreviousPage: totalPages > 1,
          currentPage: totalPages,
          totalPages,
          totalProducts: effectiveTotal,
          hasMoreProducts,
        },
      };
    }

    // Calculate how many products to skip
    const skipCount = (currentPage - 1) * pageSize;

    // Function to get products with cursor
    const getProductsWithCursor = async (cursor?: string) => {
      const query = `
        {
          collectionByHandle(handle: "${collectionHandle}") {
            products(
              first: ${pageSize}
              ${cursor ? `after: "${cursor}"` : ''}
              sortKey: ${sortKey}
              reverse: ${reverse}
              ${filterString}
            ) {
              edges {
                node {
                  id
                  title
                  handle
                  featuredImage { url altText }
                  priceRange { 
                    minVariantPrice { 
                      amount 
                      currencyCode 
                    }
                  }
                  availableForSale
                  variants(first: 1) {
                    edges {
                      node {
                        id
                        price {
                          amount
                          currencyCode
                        }
                      }
                    }
                  }
                }
              }
              pageInfo {
                hasNextPage
                hasPreviousPage
                endCursor
              }
            }
          }
        }
      `;

      return graphQLClient.request<{
        collectionByHandle: {
          products: {
            edges: { node: Product }[];
            pageInfo: {
              hasNextPage: boolean;
              hasPreviousPage: boolean;
              endCursor: string;
            };
          };
        };
      }>(query);
    };

    // For first page, get products directly
    if (currentPage === 1) {
      const response = await getProductsWithCursor();
      return {
        products: response.collectionByHandle.products.edges,
        pageInfo: {
          hasNextPage:
            response.collectionByHandle.products.pageInfo.hasNextPage,
          hasPreviousPage: false,
          currentPage: 1,
          totalPages,
          totalProducts: effectiveTotal,
          hasMoreProducts,
        },
      };
    }

    // For other pages, we need to get the cursor first
    let currentCursor: string | undefined;
    let products: { node: Product }[] = [];

    // Get initial cursor
    const initialResponse = await getProductsWithCursor();
    currentCursor =
      initialResponse.collectionByHandle.products.pageInfo.endCursor;

    // Keep fetching pages until we reach the desired page
    for (let i = 2; i <= currentPage; i++) {
      const response = await getProductsWithCursor(currentCursor);
      products = response.collectionByHandle.products.edges;
      currentCursor = response.collectionByHandle.products.pageInfo.endCursor;

      // If we're on the last iteration (current page), break
      if (i === currentPage) {
        break;
      }
    }

    return {
      products,
      pageInfo: {
        hasNextPage: currentPage < totalPages,
        hasPreviousPage: currentPage > 1,
        currentPage,
        totalPages,
        totalProducts: effectiveTotal,
        hasMoreProducts,
      },
    };
  } catch (error) {
    console.error('GraphQL Error:', error);
    return {
      products: [],
      pageInfo: {
        hasNextPage: false,
        hasPreviousPage: false,
        currentPage: 1,
        totalPages: 0,
        totalProducts: 0,
        hasMoreProducts: false,
      },
    };
  }
}

export async function getProductRecommendations(
  productId: string,
): Promise<Product[]> {
  const recommendationsQuery = gql`
    query productRecommendations($productId: ID!) {
      productRecommendations(productId: $productId) {
        id
        title
        handle
        featuredImage {
          url
          altText
        }
        priceRange {
          minVariantPrice {
            amount
          }
        }
        variants(first: 1) {
          edges {
            node {
              id
            }
          }
        }
      }
    }
  `;
  const response = await graphQLClient.request<{
    productRecommendations: Product[];
  }>(recommendationsQuery, { productId });
  return response.productRecommendations;
}

export async function getDiscountedProducts(): Promise<DiscountedProduct[]> {
  const discountedProductsQuery = gql`
    {
      products(first: 10, query: "compare_at_price:>0") {
        edges {
          node {
            id
            title
            handle
            featuredImage {
              url
              altText
            }
            variants(first: 1) {
              edges {
                node {
                  id
                  price {
                    amount
                    currencyCode
                  }
                  compareAtPrice {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await graphQLClient.request<{
      products: {
        edges: Array<{
          node: {
            id: string;
            title: string;
            handle: string;
            featuredImage?: {
              url: string;
              altText?: string;
            } | null;
            variants: {
              edges: Array<{
                node: {
                  id: string;
                  price: {
                    amount: string;
                    currencyCode: string;
                  };
                  compareAtPrice?: {
                    amount: string;
                    currencyCode: string;
                  } | null;
                };
              }>;
            };
          };
        }>;
      };
    }>(discountedProductsQuery);

    // Filter and transform the products to only include those with actual discounts
    return response.products.edges
      .map(({ node }) => {
        const variant = node.variants.edges[0]?.node;
        if (!variant) return null;

        const price = parseFloat(variant.price.amount);
        const compareAtPrice = variant.compareAtPrice
          ? parseFloat(variant.compareAtPrice.amount)
          : null;

        // Only include products that have a valid discount
        if (!compareAtPrice || compareAtPrice <= price) return null;

        const discount = Math.round(
          ((compareAtPrice - price) / compareAtPrice) * 100,
        );

        return {
          id: node.id,
          title: node.title,
          handle: node.handle,
          image: node.featuredImage?.url || '/placeholder-image.jpg',
          price: `$${price.toFixed(2)}`,
          compareAtPrice: `$${compareAtPrice.toFixed(2)}`,
          discount: `${discount}% OFF`,
          variantId: variant.id,
        };
      })
      .filter(
        (product): product is NonNullable<typeof product> => product !== null,
      );
  } catch (error) {
    console.error('Error fetching discounted products:', error);
    return [];
  }
}

export async function searchProducts(
  query: string,
  options?: {
    pageSize?: number;
    sortKey?:
      | 'TITLE'
      | 'PRICE'
      | 'CREATED_AT'
      | 'BEST_SELLING'
      | 'ID'
      | 'RELEVANCE';
    reverse?: boolean;
    priceFrom?: number;
    priceTo?: number;
    availability?: 'in' | 'out';
  },
): Promise<{
  products: { node: Product }[];
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    currentPage: number;
    totalPages: number;
    totalProducts: number;
  };
}> {
  const {
    pageSize = 16,
    sortKey = 'RELEVANCE',
    reverse = false,
    priceFrom,
    priceTo,
    availability,
  } = options || {};

  // Build the search query
  let searchQueryString = query;

  // Add price range to search query
  if (typeof priceFrom === 'number' || typeof priceTo === 'number') {
    let priceQuery = '';
    if (typeof priceFrom === 'number') {
      priceQuery += `price:>=${priceFrom}`;
    }
    if (typeof priceTo === 'number') {
      if (priceQuery) priceQuery += ' AND ';
      priceQuery += `price:<=${priceTo}`;
    }
    if (priceQuery) {
      searchQueryString = searchQueryString
        ? `${searchQueryString} AND ${priceQuery}`
        : priceQuery;
    }
  }

  // Add availability to search query
  if (availability === 'in') {
    searchQueryString = searchQueryString
      ? `${searchQueryString} AND available_for_sale:true`
      : 'available_for_sale:true';
  } else if (availability === 'out') {
    searchQueryString = searchQueryString
      ? `${searchQueryString} AND available_for_sale:false`
      : 'available_for_sale:false';
  }

  const searchQuery = gql`
    query searchProducts(
      $query: String!
      $first: Int!
      $sortKey: ProductSortKeys!
      $reverse: Boolean!
    ) {
      products(
        first: $first
        query: $query
        sortKey: $sortKey
        reverse: $reverse
      ) {
        edges {
          node {
            id
            title
            handle
            description
            featuredImage {
              url
              altText
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
              maxVariantPrice {
                amount
                currencyCode
              }
            }
            availableForSale
            variants(first: 1) {
              edges {
                node {
                  id
                  price {
                    amount
                    currencyCode
                  }
                  compareAtPrice {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
      }
    }
  `;

  try {
    console.log('Final search query:', searchQueryString); // Debug log

    const response = await graphQLClient.request<{
      products: {
        edges: { node: Product }[];
        pageInfo: {
          hasNextPage: boolean;
          hasPreviousPage: boolean;
        };
      };
    }>(searchQuery, {
      query: searchQueryString,
      first: pageSize,
      sortKey,
      reverse,
    });

    // Log the response for debugging
    console.log('Search response:', {
      totalProducts: response.products.edges.length,
      firstProduct: response.products.edges[0]?.node,
    });

    return {
      products: response.products.edges,
      pageInfo: {
        hasNextPage: response.products.pageInfo.hasNextPage,
        hasPreviousPage: response.products.pageInfo.hasPreviousPage,
        currentPage: 1,
        totalPages: Math.ceil(response.products.edges.length / pageSize),
        totalProducts: response.products.edges.length,
      },
    };
  } catch (error) {
    console.error('Error searching products:', error);
    return {
      products: [],
      pageInfo: {
        hasNextPage: false,
        hasPreviousPage: false,
        currentPage: 1,
        totalPages: 0,
        totalProducts: 0,
      },
    };
  }
}
