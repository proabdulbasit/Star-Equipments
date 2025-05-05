import HeroSection from '@/components/HeroSection';
import Image from 'next/image';
import PrivacyData from '@/data/privacyData.json';
import CookesData from '@/data/cookiesData.json';
import TrackingData from '@/data/trackingData.json';
import CreditDat from '@/data/creditData.json';
function PrivacyPolicy() {
  return (
    <div>
      <HeroSection
        image="/assets/Privacy/privacybanner.svg"
        title="Privacy Policy"
        para="Where Strength Meets Precision"
      />
      <div className="flex bg-[#F4F4F4] items-center">
        <Image
          src="/assets/Homepage/dots-icon.svg"
          alt="dots"
          width={120}
          height={120}
          className="lg:w-[120px] lg:h-[120px] w-[40px] h-[50px]"
        />
        <div className="flex lg:w-[1540px] w-full mx-auto items-center justify-between">
          <h1 className="lg:text-3xl text-xs   michroma-regular text-center  text-[#007934]">
            Information Collection and Use{' '}
          </h1>
        </div>
      </div>
      <ul className="space-y-5 xl:w-[1440px]   w-[90%] mt-5 mx-auto">
        {PrivacyData
          ? PrivacyData.map((item) => {
              return (
                <li key={item.id}>
                  <p className="text-[#000000]  roboto-condensed text-xs lg:text-lg">
                    {item.list}
                  </p>
                </li>
              );
            })
          : 'loading'}
      </ul>
      <div className="lg:text-center my-10">
        <h1 className="lg:text-3xl text-xs  michroma-regular lg:text-center  text-[#007934]">
          Cookies{' '}
        </h1>
      </div>
      <ul className="space-y-5 xl:w-[1440px]   w-[90%] mt-5 mx-auto">
        {CookesData
          ? CookesData.map((item) => {
              return (
                <li key={item.id}>
                  <p className="text-[#000000]  roboto-condensed  text-xs lg:text-lg">
                    {item.list}
                  </p>
                </li>
              );
            })
          : 'loading'}
      </ul>
      <div className=" my-10">
        <h1 className="lg:text-3xl text-xs  michroma-regular xl:w-[1440px] mx-auto  text-[#007934]">
          Tracking Interests{' '}
        </h1>
      </div>
      <ul className="space-y-5 xl:w-[1440px]  w-[90%]  mt-5 mx-auto">
        {TrackingData
          ? TrackingData.map((item) => {
              return (
                <li key={item.id}>
                  <p className="text-[#000000]  roboto-condensed text-xs lg:text-lg">
                    {item.list}
                  </p>
                </li>
              );
            })
          : 'loading'}
      </ul>
      <div className=" my-10">
        <h1 className="lg:text-3xl text-xs michroma-regular xl:w-[1440px] mx-auto  text-[#007934]">
          Credit Applications{' '}
        </h1>
      </div>
      <ul className="space-y-5 xl:w-[1440px]  w-[90%]  my-5 mx-auto">
        {CreditDat
          ? CreditDat.map((item) => {
              return (
                <li key={item.id}>
                  <p className="text-[#000000]  roboto-condensed  text-xs lg:text-lg">
                    {item.list}
                  </p>
                </li>
              );
            })
          : 'loading'}
      </ul>
    </div>
  );
}
export default PrivacyPolicy;
