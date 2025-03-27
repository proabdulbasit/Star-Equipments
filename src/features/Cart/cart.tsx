import Image from 'next/image';
import { ProductData } from './constants';
import { AiFillMinusCircle } from 'react-icons/ai';
import { FaCirclePlus } from 'react-icons/fa6';
import Product from '@/components/Product';

function Cart() {
  return (
    <>
      <div className="relative h-[120vh]">
        <div className="flex bg-[#F4F4F4] items-center">
          <Image
            src="/assets/Homepage/dots-icon.svg"
            alt="dots"
            width={120}
            height={120}
          />
          <div className="flex w-full pr-24 items-center justify-between">
            <h1 className="text-3xl  michroma-regular text-center  text-[#2C2C2C]">
              Your cart{' '}
            </h1>
            <button className="cursor-pointer text-white text-center rounded-full text-sm font-bold bg-[#007934] w-[253px] h-[45px]">
              Continue shopping
            </button>
          </div>
        </div>
        <div className="w-[85%] mx-auto">
          <div className="flex items-center mt-5 justify-between">
            <h1 className="text-2xl  w-[450px] roboto-condensed text-[#007934] font-bold">
              Product
            </h1>
            <h1 className="text-2xl  roboto-condensed text-[#007934] font-bold">
              Quantity
            </h1>
            <h1 className="text-2xl  roboto-condensed text-[#007934] font-bold">
              Total
            </h1>
          </div>
          {ProductData
            ? ProductData.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex mt-14  w-[600px] items-center">
                      <Image
                        src={item.image}
                        alt="shop"
                        width={140}
                        height={140}
                      />
                      <div className="space-y-3">
                        <h1 className="text-[#000000] michroma-regular text-md">
                          {item.title}{' '}
                        </h1>
                        <p className="text-[#007934] font-bold text-xl roboto-condensed">
                          {item.price}{' '}
                        </p>
                        <p className="text-lg  text-gray-500">{item.size}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-12">
                      <div className="flex items-center justify-between p-1 w-[120px] h-[40px] border rounded-full border-[#2C2C2C]">
                        <AiFillMinusCircle className="text-[#007934] text-3xl cursor-pointer " />
                        <p className="text-gray-900 text-xl">0</p>
                        <FaCirclePlus className="text-[#007934] text-3xl cursor-pointer " />
                      </div>
                      <div className="bg-[#007934] rounded-full  w-[30px] h-[30px] flex justify-center items-center">
                        <Image
                          src="/assets/ProductDetail/dustbin.svg"
                          alt="shop"
                          width={25}
                          height={25}
                        />
                      </div>
                    </div>
                    <div>
                      <p className="text-[#000000] font-bold text-xl ">
                        $16.99
                      </p>
                    </div>
                  </div>
                );
              })
            : 'loading'}
        </div>
        <hr className="my-5 " />
        <div className="absolute right-24  mb-10  w-[350px]">
          <div className=" flex justify-between">
            <h1 className="text-white">g</h1>
            <h1 className="text-[#000000] text-center text-2xl font-bold">
              Subtotal
            </h1>
            <p className="text-[#007934]  font-bold text-2xl roboto-condensed">
              $16.99{' '}
            </p>
          </div>
          <p className="text-xl my-4 text-[#2C2C2C] opacity-60">
            Tax included. Shipping calculated at checkout.
          </p>
          <button className="cursor-pointer  text-white text-center rounded-full text-lg font-bold bg-[#007934] w-full h-[55px]">
            Check out{' '}
          </button>
          <div className="flex  items-center  my-6 gap-5">
            <button className="cursor-pointer text-white text-center rounded-full text-xl font-bold bg-white border border-[#5433EB] flex justify-center items-center w-[203px] h-[50px]">
              {' '}
              <Image
                src="/assets/ProductDetail/shop.svg"
                alt="shop"
                width={68}
                height={34}
              />
            </button>{' '}
            <button className="cursor-pointer border text-gray-700 text-center rounded-full text-xl  bg-white border-gray-800 flex justify-center items-center w-[203px] h-[50px]">
              Goggle Play
            </button>
          </div>
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
export default Cart;
