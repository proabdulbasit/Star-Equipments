'use client';
import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { FaDiamond } from 'react-icons/fa6';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { HeroPropsType } from './type';
import { Swiper as SwiperCore } from 'swiper';
import { motion } from 'framer-motion';

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
      image: '/images/caraosuel2.jpg',
    },
    {
      id: 3,
      title: 'Your Partner in Excellence',
      para: 'Premium Tools Exceptional Results',
      image: '/images/caraosuel.jpg',
    },
  ];

  return (
    <div className="relative w-full h-[60vh] min-h-[400px] flex items-center">
      {/* Smooth background image transition */}
      <div
        key={slides[activeIndex].image}
        className="absolute inset-0 w-full h-full z-0 transition-opacity duration-700"
        style={{
          backgroundImage: `url(${slides[activeIndex].image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 1,
          transition: 'opacity 0.7s ease',
        }}
      />
      {/* Gradient overlay for left side */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#14532d] via-[#14532d]/90 to-transparent z-10 pointer-events-none" />
      <div className="relative z-20 w-full">
        <div className="max-w-[1440px] mx-auto flex flex-col justify-center h-full px-4 md:px-12 lg:px-12">
          <Swiper
            spaceBetween={0}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            modules={[Autoplay]}
            className="mySwiper w-full"
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={slide.id}>
                <div className="text-white text-left w-full  roboto-condensed flex flex-col justify-center py-8 md:py-0">
                  <motion.h1
                    key={`title-${activeIndex}`}
                    className="text-3xl md:text-5xl font-bold"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 0.6,
                      ease: 'easeInOut',
                      delay: 0.2,
                    }}
                  >
                    {slide.title}
                  </motion.h1>
                  <motion.p
                    key={`para-${activeIndex}`}
                    className="text-lg md:text-2xl mt-5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 0.6,
                      ease: 'easeInOut',
                      delay: 0.4,
                    }}
                  >
                    {slide.para}
                  </motion.p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div
            className="w-full flex justify-start md:mt-6 mt-0"
            key={activeIndex + '-dots'}
          >
            {slides.map((slide, idx) => (
              <div
                key={slide.title}
                onClick={() => swiperRef.current?.slideTo(idx)}
                className={`cursor-pointer mr-4 ${
                  idx === activeIndex ? 'text-[#048B3D]' : 'text-white'
                }`}
              >
                <FaDiamond size={20} />
              </div>
            ))}
          </div>
          {/* Action Buttons */}
          <div
            className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            key={activeIndex + '-btns'}
          >
            <a
              href="/parts-accessories"
              className="px-8 py-3 bg-[#048B3D] text-white rounded font-semibold text-center hover:bg-[#02682e] transition"
            >
              View Products
            </a>
            <a
              href="/contact-us"
              className="px-8 py-3 bg-white text-[#048B3D] border border-[#048B3D] rounded font-semibold text-center hover:bg-[#f3f3f3] transition"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
