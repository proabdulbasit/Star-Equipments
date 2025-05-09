import Image from 'next/image';
function FeaturedProduct() {
  return (
    <div className=" bg-[#E8EAED]">
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
            Featured Products
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
      <div className="roboto-condensed pb-20 pt-10 w-[90%]  lg:flex items-center justify-between xl:w-[1440px] mx-auto">
        <Image
          src="/assets/Homepage/product.svg"
          alt="product"
          width={548}
          height={347}
          className="xl:w-[50%]"
        />
        <div className="xl:w-[45%] lg:mt-0 mt-5">
          <h1 className="xl:text-3xl text-xl font-semibold">
            Sho-Me Led Rechargable Light
          </h1>
          <p className="xl:text-lg text-sm text-black mt-5 opacity-70">
            Ringa’s Performance Softboard has been carefully designed to help
            beginner surfers progress past simple techniques and whitewater
            surfing
          </p>
          <div className="flex items-center gap-10 py-5">
            <h1 className="text-xl font-semibold">$110.00</h1>
            <button className="bg-white rounded-full flex items-center gap-2 p-1 w-[100px] lg:w-[148px]">
              <Image
                src="/assets/Homepage/plus.svg"
                alt="product"
                width={31}
                height={31}
                className="lg:w-[31px] lg:h-[31px] w-[20px] h-[20px]"
              />
              <h1 className="text-[#007934] lg:text-xl text-xs font-bold">
                Add to Cart
              </h1>
            </button>
          </div>
          <div className="flex items-center gap-1">
            <h1 className="text-[#007934] roboto-condensed lg:text-lg text-sm font-bold">
              View full details
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
    </div>
  );
}
export default FeaturedProduct;
