export interface Product {
  id: string;
  handle: string;
  title: string;
  description: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  featuredImage?: {
    url: string;
    altText?: string;
  } | null;
  variants: {
    edges: {
      node: {
        id: string;
      };
    }[];
  };
  options?: Array<{
    name: string;
    values: string[];
  }>;
  metafields?: {
    edges: Array<{
      node: {
        namespace: string;
        key: string;
        value: string;
        type: string;
      };
    }>;
  };
}

export interface GetProductResponse {
  product: Product;
}

export interface Cart {
  id: string;
  lines: {
    edges: {
      node: {
        id: string;
        quantity: number;
        merchandise: {
          id: string;
          product: {
            id: string;
            title: string;
            handle: string;
            featuredImage?: {
              url: string;
              altText?: string;
            } | null;
            priceRange: {
              minVariantPrice: {
                amount: string;
              };
            };
          };
        };
      };
    }[];
  };
  estimatedCost: {
    totalAmount: {
      amount: string;
    };
  };
}

export interface RetrieveCartResponse {
  cart: Cart;
}

export interface DiscountedProduct {
  id: string;
  title: string;
  handle: string;
  image: string;
  price: string;
  compareAtPrice: string;
  discount: string;
  variantId: string;
}
