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
  };
};
