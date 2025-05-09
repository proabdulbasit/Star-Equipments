'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa6';
import ClothingData from '@/data/clothingData.json';
import Link from 'next/link';
import { FaCirclePlus } from 'react-icons/fa6';
import { ClothingProps } from './type';
import { addToCart, updateCart, retrieveCart } from '@/utils/shopify';
import { useCart } from '@/context/CartContext';

const itemsPerPage = 8;

const Clothing: React.FC<ClothingProps> = ({ data }) => {
  const products = data.products.edges;

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(ClothingData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const { cart, setCart } = useCart();

  const handleQuickAddToCart = async (variantId: string) => {
    let cartId: any = sessionStorage.getItem('cartId');

    if (cartId) {
      await updateCart(cartId, variantId, 1);
    } else {
      const data: any = await addToCart(variantId, 1);
      cartId = data.cartCreate.cart.id;
      sessionStorage.setItem('cartId', cartId);
    }

    const updatedCart = await retrieveCart(cartId);
    setCart(updatedCart);
    alert('Item added to cart!');
  };

  return (
    <div>
      <div className="flex bg-[#F4F4F4] items-center">
        <Image
          src="/assets/Homepage/dots-icon.svg"
          alt="dots"
          width={120}
          height={120}
          className="lg:w-[100px] lg:h-[120px] lg:mt-0 mt-16 w-[40px] h-[50px]"
        />
        <div className="flex w-full pr-24 lg:mt-0 mt-16 items-center justify-center">
          <h1 className="lg:text-3xl text-sm michroma-regular text-center text-[#2C2C2C]">
            PORTWEST
          </h1>
        </div>
      </div>

      <div className="bg-[#F4F4F4]  lg:px-0 px-5 mx-auto lg:w-full">
        <div className="text-[#2C2C2C]  xl:w-[1440px] mx-auto mt-8 pt-3 flex items-center justify-between  roboto-condensed text-xl">
          <h1>{ClothingData.length} Products</h1>
          <div className="lg:block hidden">
            <div className="flex items-center gap-20">
              <div className="flex items-center gap-3">
                <h1>Sort:</h1>
                <select className="text-black bg-transparent w-40 cursor-pointer">
                  <option>Best Selling</option>
                  <option>Price Low to High</option>
                  <option>Price High to Low</option>
                </select>
              </div>
              <div className="flex items-center gap-3">
                <h1>Filter:</h1>
                <select className="text-black bg-transparent w-40 cursor-pointer">
                  <option>Availability</option>
                  <option>In Stock</option>
                  <option>Out of Stock</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className=" py-12 xl:w-[1440px] mx-auto bg-[#F4F4F4] pt-5 grid  lg:grid-cols-3 md:grid-cols-2 grid-cols-1 xl:grid-cols-4 gap-10">
          {products.map((product) => (
            <div key={product.node.id} className="w-full relative">
              <Link
                href={`/product-detail/${encodeURIComponent(product.node.id)}`}
              >
                <Image
                  src={
                    product.node.featuredImage?.url ?? '/placeholder-image.jpg'
                  }
                  alt={product.node.title}
                  width={260}
                  height={209}
                  className="w-full"
                />
              </Link>

              <div className="bg-white p-5 h-32 rounded-br-3xl">
                <h1 className="roboto-condensed text-[17px] text-black">
                  {product.node.title}{' '}
                </h1>
                <div className="flex items-center justify-between mt-5 bg-white gap-10">
                  <h1 className="text-xl font-semibold">
                    {' '}
                    {product.node.priceRange.minVariantPrice.amount}
                  </h1>

                  <FaCirclePlus
                    className="text-[#007934] text-3xl cursor-pointer"
                    onClick={() =>
                      handleQuickAddToCart(
                        product.node.variants.edges[0].node.id,
                      )
                    }
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center xl:w-[1440px] mx-auto bg-[#F4F4F4] items-center pb-5 space-x-7">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="disabled:opacity-50"
          >
            <FaAngleLeft className="text-xl text-[#2C2C2C]" />
          </button>
          <span className="text-lg font-semibold text-[#2C2C2C]">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="disabled:opacity-50"
          >
            <FaAngleRight className="text-xl text-[#2C2C2C]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Clothing;
