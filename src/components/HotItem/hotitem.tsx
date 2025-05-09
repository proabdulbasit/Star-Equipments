import Image from 'next/image';
import HotData from '@/data/hotitemLiks.json';
function HotItem() {
  return (
    <div>
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
            Hot Items{' '}
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
      <div className="xl:flex items-center justify-between gap-10 mt-12 w-[95%] xl:w-[1440px] mx-auto">
        {HotData
          ? HotData.map((item) => {
              return (
                <div
                  key={item.id}
                  className="w-full lg:mt-0 mt-10 border rounded-br-3xl py-2 px-4 rounded-tl-3xl  border-[#959595] flex items-center gap-10"
                >
                  <Image
                    src={item.image}
                    alt="hook"
                    width={144}
                    height={156}
                    className="lg:w-[144px] w-[80px] "
                  />
                  <div className="w">
                    <h1 className="roboto-condensed text-sm lg:text-[17px] text-black">
                      {item.title}{' '}
                    </h1>{' '}
                    <div className=" items-center justify-between mt-3 bg-white gap-10">
                      <h1 className="lg:text-xl text-xs font-semibold ">
                        {item.price}
                      </h1>
                      <button className="flex justify-end w-full ">
                        <Image
                          src="/assets/Homepage/plus.svg"
                          alt="product"
                          width={31}
                          height={31}
                          className="lg:w-[31px] lg:h-[31px] h-[20px] w-[20px]"
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
  );
}
export default HotItem;
