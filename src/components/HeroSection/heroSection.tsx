'use client';
import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { FaDiamond } from 'react-icons/fa6';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { HeroPropsType } from './type';
import { Swiper as SwiperCore } from 'swiper';

interface SlideType {
  id: number;
  title: string;
  para: string;
  image: string;
}

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
    <div className="bg-[url('/assets/Homepage/hero-bg.svg')] flex flex-col items-center gap-10 px-24 h-[calc(100vh-31vh)] bg-center bg-cover bg-no-repeat w-full">
      <Swiper
        spaceBetween={0}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        modules={[Autoplay]}
        className="mySwiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <div
              className="flex h-[calc(100vh-31vh)] items-center"
              style={{ backgroundColor: 'transparent' }}
            >
              <div className="text-white text-start w-[410px] roboto-condensed">
                <h1 className="text-5xl font-bold">{slide.title}</h1>
                <p className="text-2xl mt-5">{slide.para}</p>
              </div>
              <div>
                <Image
                  src={slide.image}
                  alt="hero truck"
                  width={859}
                  height={413}
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute left-24 bottom-24">
        <div className="flex justify-center mt-4">
          {slides.map((slide) => (
            <div
              key={slide.title}
              onClick={() => swiperRef.current?.slideTo(slides.indexOf(slide))}
              className={`cursor-pointer mx-2 ${
                slides.indexOf(slide) === activeIndex
                  ? 'text-[#048B3D]'
                  : 'text-white'
              }`}
            >
              <FaDiamond size={20} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
