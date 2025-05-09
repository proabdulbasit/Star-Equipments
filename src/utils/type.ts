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
