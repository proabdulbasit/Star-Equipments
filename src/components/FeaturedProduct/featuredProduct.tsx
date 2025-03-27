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
        />
        <div className="flex w-full pr-24 items-center justify-between">
          <h1 className="text-3xl  michroma-regular text-center  text-[#2C2C2C]">
            Featured Products
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
      <div className="roboto-condensed pb-20 pt-10  flex items-center justify-between w-[80%] mx-auto">
        <Image
          src="/assets/Homepage/product.svg"
          alt="product"
          width={548}
          height={347}
          className="w-[50%]"
        />
        <div className="w-[40%]">
          <h1 className="text-3xl font-semibold">
            Sho-Me Led Rechargable Light
          </h1>
          <p className="text-lg text-black mt-5 opacity-70">
            Ringa’s Performance Softboard has been carefully designed to help
            beginner surfers progress past simple techniques and whitewater
            surfing
          </p>
          <div className="flex items-center gap-10 py-5">
            <h1 className="text-xl font-semibold">$110.00</h1>
            <button className="bg-white rounded-full flex items-center gap-2 p-1 w-[148px]">
              <Image
                src="/assets/Homepage/plus.svg"
                alt="product"
                width={31}
                height={31}
              />
              <h1 className="text-[#007934] text-xl font-bold">Add to Cart</h1>
            </button>
          </div>
          <div className="flex items-center gap-1">
            <h1 className="text-[#007934] roboto-condensed text-lg font-bold">
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
