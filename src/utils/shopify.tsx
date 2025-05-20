import { gql, GraphQLClient } from 'graphql-request';
import {
  GetProductResponse,
  RetrieveCartResponse,
  Product,
  Cart,
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
        variants(first: 10) {
          edges {
            node {
              id
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

    alert('Item successfully removed from the cart!');
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
