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
          />
          <div className="flex w-full pr-24 items-center justify-between">
            <h1 className="text-3xl  michroma-regular text-center  text-[#2C2C2C]">
              Discounted Products
            </h1>
            <div className="flex items-center gap-1">
              <h1 className="text-[#007934] roboto-condensed text-lg font-bold">
                Shop More
              </h1>
              <Image
                src="/assets/Homepage/arrow-icon.svg"
                alt="dots"
                width={25}
                height={25}
              />
            </div>
          </div>
        </div>

        <div className="flex w-[80%] mt-12 mx-auto justify-between">
          {Product
            ? Product.map((item) => {
                return (
                  <div key={item.id} className="w-[268px]">
                    <Image
                      src={item.image}
                      alt="hook"
                      width={260}
                      height={209}
                      className="w-[268px]"
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
