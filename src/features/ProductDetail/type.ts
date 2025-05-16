export type ProductProps = {
  params: {
    id: string;
  };
};
export type ProductDetailProps = {
  product: {
    title: string;
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
  };
};
