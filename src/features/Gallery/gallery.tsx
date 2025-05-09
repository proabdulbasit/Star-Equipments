import HeroSection from '@/components/HeroSection';
import Image from 'next/image';
import GalleryData from '@/data/gallerydata.json';
function Gallery() {
  return (
    <div>
      <HeroSection
        image="/assets/Homepage/galleryTruck.svg"
        title="Explore Our Gallery"
        para="Where Strength Meets Precision"
      />
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
            Explore Our Trucks Gallery{' '}
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
      <div className="lg:flex items-center mt-24 gap-10 justify-between w-[95%] xl:w-[1440px] mx-auto">
        {GalleryData
          ? GalleryData.map((item) => {
              return (
                <div key={item.id} className="w-full lg:mt-0 mt-5 lg:h-[250px]">
                  <Image
                    src={item.image}
                    alt="item"
                    width={285}
                    height={250}
                    className="w-full"
                  />
                </div>
              );
            })
          : 'loading'}
      </div>
      <div className="flex  mt-10 items-center">
        <div className="flex xl:w-[1440px] mx-auto w-[95%] items-center justify-between">
          <h1 className="lg:text-3xl text-xs michroma-regular text-center  text-[#2C2C2C]">
            Construction Equipment{' '}
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
            />
          </div>
        </div>
      </div>
      <div className="lg:flex items-center my-14 gap-10 justify-between w-[95%] xl:w-[1440px] mx-auto">
        {GalleryData
          ? GalleryData.map((item) => {
              return (
                <div key={item.id} className="w-full lg:mt-0 mt-5 lg:h-[250px]">
                  <Image
                    src={item.image}
                    alt="item"
                    width={285}
                    height={250}
                    className="w-full"
                  />
                </div>
              );
            })
          : 'loading'}
      </div>
    </div>
  );
}
export default Gallery;
