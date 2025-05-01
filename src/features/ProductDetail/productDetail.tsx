import Carousel from '@/components/Carousel';
import Image from 'next/image';
import Link from 'next/link';
import { AiFillMinusCircle } from 'react-icons/ai';
import { FaCirclePlus } from 'react-icons/fa6';
import Product from '@/components/Product';
function ProductDetail() {
  return (
    <>
      <div className="flex my-10  w-[90%] mx-auto">
        <Carousel />
        <div className="space-y-4 roboto-condensed mt-10">
          <h1 className="text-[#000000] michroma-regular text-2xl">
            A770 - PW3 General Utility Glove
          </h1>
          <p className="text-[#007934] font-bold text-xl roboto-condensed">
            $16.99 USD
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
            <button className="text-[#000000] text-sm w-[34px] h-[22px] border border-[#000000] opacity-60 rounded-tr-md rounded-bl-md cursor-pointer ">
              SM
            </button>
            <button className="text-[#000000] text-sm w-[34px] h-[22px] border border-[#000000] opacity-60 rounded-tr-md rounded-bl-md cursor-pointer ">
              MD
            </button>
            <button className="text-[#000000] text-sm w-[34px] h-[22px] border border-[#000000] opacity-60 rounded-tr-md rounded-bl-md cursor-pointer ">
              LG
            </button>
            <button className="text-[#000000] text-sm w-[34px] h-[22px] border border-[#000000] opacity-60 rounded-tr-md rounded-bl-md cursor-pointer ">
              XL
            </button>
            <button className="text-[#000000] text-sm w-[34px] h-[22px] border border-[#000000] opacity-60 rounded-tr-md rounded-bl-md cursor-pointer ">
              XXL
            </button>
          </div>
          <p className="text-lg font-semibold text-gray-500">Quantity </p>
          <div className="flex items-center justify-between p-1 w-[120px] h-[40px] border rounded-full border-[#2C2C2C]">
            <AiFillMinusCircle className="text-[#007934] text-3xl cursor-pointer " />
            <p className="text-gray-900 text-xl">0</p>
            <FaCirclePlus className="text-[#007934] text-3xl cursor-pointer " />
          </div>
          <div className="flex items-center gap-5">
            <button className="cursor-pointer text-white text-center rounded-full text-lg font-bold bg-[#007934] w-[203px] h-[55px]">
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
