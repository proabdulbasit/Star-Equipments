export type ProductProps = {
  params: {
    id: string;
  };
};
export type ProductDetailProps = {
  product: {
    title: string;
    id: string;
    priceRange: {
      minVariantPrice: {
        amount: string;
      };
    };
    variants: {
      edges: Array<{
        node: {
          id: string;
        };
      }>;
    };
    featuredImage?: {
      url: string;
      altText?: string;
    } | null;
    images?: {
      edges: Array<{
        node: {
          url: string;
          altText?: string;
        };
      }>;
    };
    description?: string;
    details?: string[];
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
  };
};
