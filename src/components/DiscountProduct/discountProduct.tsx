import Image from 'next/image';
import Product from '@/data/product.json';
function DiscountProduct() {
  return (
    <div>
      <div className=" bg-[#E8EAED] pb-10">
        <div className="flex items-center">
          <Image
            src="/assets/Homepage/dots-icon.svg"
            alt="dots"
            width={120}
            height={120}
            className="lg:w-[120px] lg:h-[120px] w-[50px] h-[50px]"
          />
          <div className="flex lg:w-[1440px] w-[95%]  mx-auto items-center justify-between">
            <h1 className="lg:text-3xl text-xs  michroma-regular text-center  text-[#2C2C2C]">
              Discount Products
            </h1>
            <div className="flex items-center gap-1">
              <h1 className="text-[#007934] roboto-condensed text-xs lg:text-lg font-bold">
                Shop More
              </h1>
              <Image
                src="/assets/Homepage/arrow-icon.svg"
                alt="dots"
                width={25}
                height={25}
                className="lg:w-[25px] lg:h-[25px] w-[10px] h-[10px]"
              />
            </div>
          </div>
        </div>

        <div className="lg:flex xl:w-[1440px] w-[95%] mt-12 xl:gap-10  mx-auto justify-between">
          {Product
            ? Product.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="lg:w-[500px] mx-auto lg:mt-0 mt-10"
                  >
                    <Image
                      src={item.image}
                      alt="hook"
                      width={260}
                      height={209}
                      className="w-full"
                    />
                    <div className="bg-white p-5 h-44">
                      <h1 className="roboto-condensed text-[17px] text-black">
                        {item.title}
                      </h1>
                      <div className="flex items-center justify-between mt-5 bg-white gap-10">
                        <h1 className="text-xl font-semibold ">{item.price}</h1>
                        <button>
                          <Image
                            src="/assets/Homepage/plus.svg"
                            alt="product"
                            width={31}
                            height={31}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            : 'loading'}
        </div>
      </div>
    </div>
  );
}
export default DiscountProduct;
