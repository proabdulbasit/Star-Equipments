import Image from 'next/image';
import Product from '@/components/Product';

function Wishlist() {
  return (
    <div>
      <div className="flex bg-[#F4F4F4] items-center">
        <Image
          src="/assets/Homepage/dots-icon.svg"
          alt="dots"
          width={120}
          height={120}
        />
        <div className="flex w-full pr-24 items-center justify-between">
          <h1 className="text-3xl  michroma-regular text-center  text-[#2C2C2C]">
            Wish List{' '}
          </h1>
          <button className="cursor-pointer text-white text-center rounded-full text-sm font-bold bg-[#007934] w-[253px] h-[45px]">
            Continue shopping
          </button>
        </div>
      </div>
      <div className="w-[85%] mt-5 mx-auto">
        <h1 className="text-2xl  w-[450px] roboto-condensed text-[#007934] font-bold">
          Product
        </h1>

        <div className="flex items-center justify-between">
          <div className="flex mt-14 gap-5 w-[600px] items-center">
            <Image
              src="/assets/ProductDetail/gloves.svg"
              alt="shop"
              width={140}
              height={140}
            />
            <div className="space-y-3">
              <h1 className="text-[#000000] michroma-regular text-md">
                A770 - PW3 General Utility Glove{' '}
              </h1>
              <p className="text-[#007934] font-bold text-xl roboto-condensed">
                $16.99 USD{' '}
              </p>
              <p className="text-lg  text-gray-500">Size: SM</p>
            </div>
          </div>
          <button className="cursor-pointer text-white text-center rounded-full text-sm font-bold bg-[#007934] w-[253px] h-[45px]">
            Check out{' '}
          </button>
        </div>
      </div>
      <div className="flex bg-[#F4F4F4] mt-20 items-center">
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
    </div>
  );
}
export default Wishlist;
