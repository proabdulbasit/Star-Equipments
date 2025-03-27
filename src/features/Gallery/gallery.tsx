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
      <div className="flex bg-[#F4F4F4] items-center">
        <Image
          src="/assets/Homepage/dots-icon.svg"
          alt="dots"
          width={120}
          height={120}
        />
        <div className="flex w-full pr-24 items-center justify-between">
          <h1 className="text-3xl  michroma-regular text-center  text-[#2C2C2C]">
            Explore Our trucks Gallery
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
      <div className="flex items-center mt-24 justify-between w-[85%] mx-auto">
        {GalleryData
          ? GalleryData.map((item) => {
              return (
                <div key={item.id} className="w-[285px] h-[250px]">
                  <Image src={item.image} alt="item" width={285} height={250} />
                </div>
              );
            })
          : 'loading'}
      </div>
      <div className="flex bg-[#F4F4F4] items-center">
        <div className="flex w-full px-24 items-center justify-between">
          <h1 className="text-3xl  michroma-regular text-center  text-[#2C2C2C]">
            Construction Equipment{' '}
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
      <div className="flex items-center mt-14 justify-between w-[85%] mx-auto">
        {GalleryData
          ? GalleryData.map((item) => {
              return (
                <div key={item.id} className="w-[285px] h-[250px]">
                  <Image src={item.image} alt="item" width={285} height={250} />
                </div>
              );
            })
          : 'loading'}
      </div>
    </div>
  );
}
export default Gallery;
