import Image from 'next/image';
import HeroSection from '@/components/HeroSection';
import FeaturedProduct from '@/components/FeaturedProduct';
import Towing from '@/components/Towing';
import DiscountProduct from '@/components/DiscountProduct';
import HotItem from '@/components/HotItem';
import SubFooter from '@/components/SubFooter';
export default function Home() {
  return (
    <div>
      <HeroSection
        image="/assets/Homepage/hero-truck.svg"
        title="Elevate your towing game!"
        para="Premium Equipment from Star Equipment Sales"
      />
      <div className="shade py-5 w-full">
        <h1 className="text-3xl  michroma-regular text-center  text-white">
          Product Categories
        </h1>
        <div className="w-[70%] mt-10 mx-auto flex items-center justify-between">
          <div>
            <Image
              src="/assets/Homepage/nrc-icon.svg"
              alt="icon"
              width={82}
              height={82}
            />
            <h1 className="text-lg text-white roboto-condensed mt-2">
              NRC Parts
            </h1>
          </div>{' '}
          <div>
            <Image
              src="/assets/Homepage/ba-icon.svg"
              alt="icon"
              width={82}
              height={82}
            />
            <h1 className="text-lg text-white roboto-condensed mt-2">
              B/A Products
            </h1>
          </div>{' '}
          <div>
            <Image
              src="/assets/Homepage/cloth-icon.svg"
              alt="icon"
              width={82}
              height={82}
            />
            <h1 className="text-lg text-white roboto-condensed mt-2">
              Clothing
            </h1>
          </div>{' '}
          <div>
            <Image
              src="/assets/Homepage/micro-icon.svg"
              alt="icon"
              width={82}
              height={82}
            />
            <h1 className="text-lg text-white roboto-condensed mt-2">
              Clothing
            </h1>
          </div>
        </div>
      </div>
      <FeaturedProduct />
      <Towing />
      <DiscountProduct />
      <div className="w-full">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/CC9GEiL7Ujc?si=JpQyT5SI4iJlxuww"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          className="h-[721px] w-full"
        ></iframe>
      </div>
      <HotItem />
      <SubFooter />
    </div>
  );
}
