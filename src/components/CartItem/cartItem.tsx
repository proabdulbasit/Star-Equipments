import React, { useState } from 'react';
import Image from 'next/image';
import { AiFillMinusCircle } from 'react-icons/ai';
import { FaCirclePlus } from 'react-icons/fa6';
import { CartTypes } from './type';

function CartItem({ cartId, item, removeFromCart }: CartTypes) {
  const [count, setCount] = useState(1);

  const handleIncrement = () => {
    setCount((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setCount((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const unitPrice = parseFloat(
    item.node.merchandise.product.priceRange.minVariantPrice.amount,
  );
  const totalPrice = (unitPrice * count).toFixed(2);
  return (
    <div className="lg:mb-0 mb-20 border-b border-[#007934] pb-5 ">
      <div key={item.node.id} className="lg:flex items-center justify-between">
        <div className="flex mt-14 gap-5 xl:w-[600px] items-center">
          <Image
            src={item.node.merchandise.product.featuredImage.url}
            alt={item.node.merchandise.product.featuredImage.altText}
            width={140}
            height={140}
            className="lg:w-[140px] lg:h-[140px] w-[100px] h-[100px]"
          />
          <div className="lg:space-y-3 space-y-1">
            <h1 className="text-[#000000] michroma-regular text-xs lg:text-sm lg:text-md">
              {item.node.merchandise.product?.title}
            </h1>
            <p className="text-[rgb(0,121,52)] font-bold text-sm lg:text-xl roboto-condensed">
              {unitPrice}$
            </p>
          </div>
        </div>
        <div className="flex items-center gap-5 lg:gap-12">
          <div className="flex items-center justify-between p-1 w-[120px] h-[30px] lg:h-[40px] border rounded-full border-[#2C2C2C]">
            <AiFillMinusCircle
              onClick={handleDecrement}
              className="text-[#007934] text-2xl lg:text-3xl cursor-pointer"
            />
            <p className="text-gray-900 text-sm lg:text-xl">{count}</p>
            <FaCirclePlus
              onClick={handleIncrement}
              className="text-[#007934] text-2xl lg:text-3xl cursor-pointer"
            />
          </div>
          <div
            onClick={() => removeFromCart(cartId, item.node.id)}
            className="bg-[#007934] rounded-full cursor-pointer w-[25px] h-[25px] lg:w-[30px] lg:h-[30px] flex justify-center items-center"
          >
            <Image
              src="/assets/ProductDetail/dustbin.svg"
              alt="shop"
              width={25}
              height={25}
              className="lg:w-[25px] lg:h-[25px] w-[18px] h-[18px]"
            />
          </div>
          <div className="lg:hidden block">
            <p className="text-[#000000] font-bold text-lg">{totalPrice}$</p>
          </div>
        </div>
        <div className="lg:block hidden">
          <p className="text-[#000000] font-bold text-xl">{totalPrice}$</p>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
