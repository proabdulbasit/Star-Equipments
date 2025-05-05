export interface ClothingProps {
  data: {
    products: {
      edges: {
        node: {
          variants: any;
          id: any;
          title: string;
          featuredImage?: { url: string } | null;
          priceRange: { minVariantPrice: { amount: string } };
        };
      }[];
    };
  };
}
