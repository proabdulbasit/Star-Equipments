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
          className="lg:w-[100px] lg:h-[120px] lg:mt-0 mt-16 w-[40px] h-[50px]"
        />
        <div className="flex lg:mt-0 mt-16 w-full lg:w-[1440px] mx-auto items-center justify-between">
          <h1 className="lg:text-3xl text-sm  michroma-regular text-center  text-[#2C2C2C]">
            Wish List{' '}
          </h1>
          <button className="cursor-pointer text-white text-center rounded-full text-xs lg:text-sm font-bold bg-[#007934] lg:w-[253px] w-[140px] h-[30px] lg:h-[45px]">
            Continue shopping
          </button>
        </div>
      </div>
      <div className="xl:w-[1440px] w-[95%] mt-5 mx-auto">
        <h1 className="lg:text-2xl text-sm  xl:-[450px] roboto-condensed text-[#007934] font-bold">
          Product
        </h1>

        <div className="lg:flex items-center xl:w-[1480px] mx-auto justify-between">
          <div className="flex mt-14 gap-5 xl:w-[600px] items-center">
            <Image
              src="/assets/ProductDetail/gloves.svg"
              alt="shop"
              width={140}
              height={140}
              className="lg:w-[140px] lg:h-[140px] w-[100px] h-[100px]"
            />
            <div className="lg:space-y-3 space-y-1">
              <h1 className="text-[#000000] michroma-regular text-xs lg:text-md">
                A770 - PW3 General Utility Glove{' '}
              </h1>
              <p className="text-[#007934] font-bold text-sm  lg:text-xl roboto-condensed">
                $16.99 USD{' '}
              </p>
              <p className="lg:text-lg text-sm  text-gray-500">Size: SM</p>
            </div>
          </div>
          <button className="cursor-pointer text-white text-center rounded-full lg:text-sm text-xs font-bold bg-[#007934] w-[150px] h-[30px] lg:w-[253px] lg:h-[45px]">
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
          className="lg:w-[100px] lg:h-[120px]  w-[40px] h-[50px]"
        />
        <div className="flex w-full pr-24 items-center justify-center">
          <h1 className="lg:text-3xl text-sm  michroma-regular text-center  text-[#2C2C2C]">
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
