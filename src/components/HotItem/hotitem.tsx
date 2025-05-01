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
        />
        <div className="flex w-full pr-24 items-center justify-between">
          <h1 className="text-3xl  michroma-regular text-center  text-[#2C2C2C]">
            Hot Items{' '}
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
      <div className="flex items-center justify-between  mt-12 w-[83%] mx-auto">
        {HotData
          ? HotData.map((item) => {
              return (
                <div
                  key={item.id}
                  className="w-[376px] border rounded-br-3xl py-2 px-4 rounded-tl-3xl  border-[#959595] flex items-center gap-10"
                >
                  <Image
                    src={item.image}
                    alt="hook"
                    width={144}
                    height={156}
                    className="w-[144px] "
                  />
                  <div className="w">
                    <h1 className="roboto-condensed text-[17px] text-black">
                      {item.title}{' '}
                    </h1>{' '}
                    <div className=" items-center justify-between mt-3 bg-white gap-10">
                      <h1 className="text-xl font-semibold ">{item.price}</h1>
                      <button className="flex justify-end w-full ">
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
  );
}
export default HotItem;
