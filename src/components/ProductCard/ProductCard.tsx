import Image from 'next/image';
import Link from 'next/link';
import { FaCirclePlus } from 'react-icons/fa6';
import { ProductCardProps } from './type';

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  image,
  price,
  altText,
  onAddToCart,
  discount,
  compareAtPrice,
  isLoading = false,
}) => {
  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Add to cart button clicked in ProductCard');
    if (onAddToCart && !isLoading) {
      onAddToCart();
    }
  };

  return (
    <div className="group w-full bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col overflow-hidden relative">
      <Link
        href={`/product-detail/${encodeURIComponent(id)}`}
        className="block flex-1"
        tabIndex={-1}
      >
        <div className="relative w-full aspect-[4/3] bg-gray-100 flex items-center justify-center overflow-hidden">
          <Image
            src={image}
            alt={altText || title}
            fill
            className="object-contain transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          {discount && (
            <div className="absolute top-2 right-2 bg-[#007934] text-white px-2 py-1 rounded text-sm font-semibold">
              {discount}
            </div>
          )}
        </div>
        <div className="flex-1 flex flex-col justify-between p-4">
          <h1 className="roboto-condensed font-semibold text-base text-black mb-2 line-clamp-2 min-h-[48px] group-hover:underline group-hover:text-[#007934]">
            {title}
          </h1>
          <div className="flex items-end justify-between mt-auto">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-[#007934]">{price}</span>
              {compareAtPrice && (
                <span className="text-sm text-gray-500 line-through">
                  {compareAtPrice}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
      <button
        className="absolute bottom-3 right-6 bg-[#007934] hover:bg-[#005f27] text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg transition-all duration-200 group-hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#007934] z-10 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleAddToCartClick}
        aria-label="Add to cart"
        type="button"
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <FaCirclePlus className="text-2xl" />
        )}
      </button>
    </div>
  );
};

export default ProductCard;
