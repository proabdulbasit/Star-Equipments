import ProductData from '@/data/productData.json';
import Link from 'next/link';
import Image from 'next/image';
import { FaCirclePlus } from 'react-icons/fa6';

function Product() {
  return (
    <div>
      <div className="grid lg:grid-cols-4 lg:mt-10 lg:mb-20 my-5 justify-center xl:w-[1440px] mx-auto grid-cols-2 gap-3 lg:gap-5">
        {ProductData
          ? ProductData.map((product) => (
              <div
                key={product.id}
                className=" w-[140px] lg:w-full p-2 lg:h-[362px]"
              >
                <Link href="#">
                  <div className="bg-[#F5F5F5] flex flex-col justify-center items-center lg:w-full w-[117px] h-[129px] lg:h-[274px] rounded-xl">
                    <Image
                      src={product.image}
                      alt="product"
                      width={181}
                      height={181}
                      className="object-cover h-auto w-auto mx-auto"
                    />
                  </div>
                </Link>
                <h1 className={`text-[#222222]  lg:text-[17px] text-xs mt-5 `}>
                  {product.title}
                </h1>
                <div className="flex items-end my-4 justify-between">
                  <div className={`flex items-center mt-3 `}>
                    <h1 className="text-[#000000] font-bold text-xs lg:text-[20px]">
                      {product.price}
                    </h1>
                  </div>
                  <FaCirclePlus className="text-3xl text-[#007934]" />
                </div>
              </div>
            ))
          : 'loading'}
      </div>
    </div>
  );
}
export default Product;
