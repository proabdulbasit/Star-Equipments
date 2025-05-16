'use client';
import Carousel from '@/components/Carousel';
import Link from 'next/link';
import Product from '@/components/Product';
import Image from 'next/image';
import { useState } from 'react';
import { addToCart, updateCart, retrieveCart } from '@/utils/shopify';
import { useCart } from '@/context/CartContext';
import { CiCircleMinus, CiCirclePlus } from 'react-icons/ci';
import { ProductDetailProps } from './type';

function ProductDetail({ product }: ProductDetailProps) {
  const [count, setCount] = useState(0);
  const [checkout, setCheckout] = useState(false);
  const { cart, setCart } = useCart();
  const [selectedSize, setSelectedSize] = useState('');

  if (!product) {
    return <div>Loading product details...</div>;
  }

  const handleAddToCart = async () => {
    let cartId: any = sessionStorage.getItem('cartId');

    if (count > 0 && product.variants.edges[0]?.node.id) {
      try {
        if (cartId) {
          await updateCart(cartId, product.variants.edges[0].node.id, count);
          alert('item added successfully');
        } else {
          let data: any = await addToCart(
            product.variants.edges[0].node.id,
            count,
          );
          cartId = data.cartCreate.cart.id;
          sessionStorage.setItem('cartId', cartId);
        }

        const updatedCart = await retrieveCart(cartId);
        setCart(updatedCart);
        setCheckout(true);
      } catch (error) {
        console.error('Error adding to cart:', error);
        alert('Failed to add item to cart');
      }
    }
  };

  return (
    <>
      <div className="flex mb-10 mt-24  w-[90%] lg:w-[1440px] mx-auto">
        {/* <Carousel images={product.featuredImage.url} /> */}
        <div className="space-y-4 roboto-condensed mt-">
          <h1 className="text-[#000000] capitalize michroma-regular text-2xl">
            {product.title}
          </h1>
          <p className="text-[#007934] font-bold text-xl roboto-condensed">
            {product.priceRange.minVariantPrice.amount} USD
          </p>
          <p className="text-lg  text-gray-500">
            Shipping calculated at checkout.
          </p>
          <div className="flex roboto-condensed text-lg items-center gap-1">
            <p className="text-lg text-gray-500">
              Pay over time for orders over
            </p>
            <h1 className="text-lg text-[#000000]">$35.00</h1>
            <p className="text-gray-500">with</p>
            <Image
              src="/assets/ProductDetail/shop.svg"
              alt="shop"
              width={58}
              height={14}
            />
            <Link
              href="#"
              className="text-[#007934] opacity-50 underline cursor-pointer"
            >
              Learn more
            </Link>
          </div>
          <p className="text-lg font-semibold text-gray-500">Size </p>
          <div className="flex items-center gap-5">
            {['SM', 'MD', 'LG', 'XL', 'XXL'].map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`text-[#000000] text-sm w-[34px] h-[22px] border border-[#000000] opacity-60 rounded-tr-md rounded-bl-md cursor-pointer ${
                  selectedSize === size ? 'bg-black text-white' : ''
                }`}
              >
                {size}
              </button>
            ))}
          </div>

          <p className="text-lg font-semibold text-gray-500">Quantity </p>
          <div className="flex lg:justify-start justify-center items-center gap-2 lg:gap-4">
            <CiCircleMinus
              className="text-[#6F4B9D] lg:w-[56px] w-[45px] h-[45px] lg:h-[56px] cursor-pointer"
              onClick={() => setCount(Math.max(count - 1, 0))}
            />
            <div className="text-white bg-[#6F4B9D] lg:w-[51px] w-[40px] h-[40px] lg:h-[51px] rounded-full flex flex-col justify-center lg:text-xl text-lg items-center">
              {count}
            </div>
            <CiCirclePlus
              className="text-[#6F4B9D] lg:w-[56px] w-[45px] h-[45px] lg:h-[56px] cursor-pointer"
              onClick={() => setCount(count + 1)}
            />
          </div>
          <div className="flex items-center gap-5">
            <button
              onClick={handleAddToCart}
              className="cursor-pointer text-white text-center rounded-full text-lg font-bold bg-[#007934] w-[203px] h-[55px]"
            >
              Add to cart
            </button>
            <button className="cursor-pointer text-white text-center rounded-full text-xl font-bold bg-white border border-[#5433EB] flex justify-center items-center w-[203px] h-[55px]">
              {' '}
              <Image
                src="/assets/ProductDetail/shop.svg"
                alt="shop"
                width={98}
                height={34}
              />
            </button>
          </div>
          <p className="text-lg roboto-condensed w-[550px] text-gray-500 list-disc">
            {' '}
            This high-performing glove is multi-purpose and suitable for any
            job. Lightweight and comfortable for the wearer without compromising
            the gloves performance. Reinforced thumb crotch and fingertips adds
            abrasion resistance in hard wearing areas. Highly durable synthetic
            leather palm. This glove can be used on most touchscreen devices.
          </p>
          <p className="text-lg font-semibold text-gray-500">Materials </p>
          <p className="text-lg roboto-condensed w-[550px] text-gray-500 list-disc">
            Nylon, Polyester, Polyurethane, TPR
          </p>
          <div className="flex items-center gap-1">
            <Link
              href="#"
              className="text-lg flex gap-1 items-start  text-gray-500"
            >
              <Image
                src="/assets/ProductDetail/warning.svg"
                alt="shop"
                width={24}
                height={24}
              />{' '}
              WARNING: Cancer and reproductive harm WWW.p65warnings.ca.gov
              california residents click here
            </Link>
          </div>
          <p className="text-lg flex gap-3 text-gray-800 ">
            {' '}
            <Image
              src="/assets/ProductDetail/share.svg"
              alt="shop"
              width={17}
              height={18}
            />{' '}
            Share{' '}
          </p>
        </div>
      </div>
      <div className="flex bg-[#F4F4F4] items-center">
        <Image
          src="/assets/Homepage/dots-icon.svg"
          alt="dots"
          width={120}
          height={120}
        />
        <div className="flex w-full pr-24 items-center justify-center">
          <h1 className="text-3xl  michroma-regular text-center  text-[#2C2C2C]">
            You may also like{' '}
          </h1>
        </div>
      </div>
      <div>
        <Product />
      </div>
    </>
  );
}

export default ProductDetail;
