'use client';
import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { FaDiamond } from 'react-icons/fa6';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { Swiper as SwiperCore } from 'swiper';
import 'swiper/css';
import { HeroPropsType, SlideType } from './type';

const HeroSection: React.FC<HeroPropsType> = ({ title, para, image }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const swiperRef = useRef<SwiperCore | null>(null);

  const slides: SlideType[] = [
    { id: 1, title, para, image },
    {
      id: 2,
      title: 'Take Your Towing To The Next Level',
      para: 'Top-Tier Equipment Unmatched Value',
      image: '/assets/Homepage/carousel2.svg',
    },
    {
      id: 3,
      title: 'Your Partner in Excellence',
      para: 'Premium Tools Exceptional Results',
      image: '/assets/Homepage/carousel2.svg',
    },
  ];

  return (
    <div className="bg-[url('/assets/Homepage/hero-bg.svg')] lg:pt-0 pt-20 gap-10 lg:px-24 lg:h-[calc(100vh-31vh)] bg-center bg-cover bg-no-repeat ">
      <div className="xl:w-[1440px] w-[90%] mx-auto">
        <Swiper
          spaceBetween={0}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          modules={[Autoplay]}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={slide.id}>
              <div
                className="flex h-[calc(100vh-31vh)] lg:flex-row flex-col gap-10 justify-center lg:justify-between items-center"
                style={{ backgroundColor: 'transparent' }}
              >
                <div className="text-white text-start lg:w-[410px] roboto-condensed">
                  <h1 className="lg:text-5xl text-3xl font-bold">
                    {slide.title}
                  </h1>
                  <p className="lg:text-2xl text-sm mt-5">{slide.para}</p>
                </div>
                <div>
                  <Image
                    src={slide.image}
                    alt="hero truck"
                    width={859}
                    height={413}
                    className="lg:w-[859px] lg:h-[413px]  "
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="absolute left-0 right-0 mx-auto xl:w-[1440px]  bottom-24">
          <div className="flex justify- mt-4">
            {slides.map((slide) => (
              <div
                key={slide.title}
                onClick={() =>
                  swiperRef.current?.slideTo(slides.indexOf(slide))
                }
                className={`cursor-pointer mx-1 lg:mx-2 ${
                  slides.indexOf(slide) === activeIndex
                    ? 'text-[#048B3D]'
                    : 'text-white'
                }`}
              >
                <FaDiamond className="text-xs lg:text-xl" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
