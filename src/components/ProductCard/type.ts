export interface ProductCardProps {
  id: string;
  title: string;
  image: string;
  price: string;
  altText?: string;
  onAddToCart?: () => void;
  discount?: string;
  compareAtPrice?: string;
}
