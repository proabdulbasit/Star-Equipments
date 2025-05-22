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
    <div
      className="relative w-full h-[60vh] min-h-[400px] flex items-center"
      style={{
        backgroundImage: `url(${slides[activeIndex].image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
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
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                  className="text-white text-left w-full md:w-1/2 roboto-condensed flex flex-col justify-center py-8 md:py-0"
                >
                  <motion.h1
                    className="text-3xl md:text-5xl font-bold"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  >
                    {slide.title}
                  </motion.h1>
                  <motion.p
                    className="text-lg md:text-2xl mt-5"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: 'easeOut', delay: 0.15 }}
                  >
                    {slide.para}
                  </motion.p>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
          <motion.div
            className="w-full flex justify-start mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
            key={activeIndex + '-dots'}
          >
            {slides.map((slide, idx) => (
              <div
                key={slide.title}
                onClick={() => swiperRef.current?.slideTo(idx)}
                className={`cursor-pointer mx-2 ${
                  idx === activeIndex ? 'text-[#048B3D]' : 'text-white'
                }`}
              >
                <FaDiamond size={20} />
              </div>
            ))}
          </motion.div>
          {/* Action Buttons */}
          <motion.div
            className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }}
            key={activeIndex + '-btns'}
          >
            <a
              href="/parts"
              className="px-8 py-3 bg-[#048B3D] text-white rounded font-semibold text-center hover:bg-[#02682e] transition"
            >
              View Products
            </a>
            <a
              href="/contact"
              className="px-8 py-3 bg-white text-[#048B3D] border border-[#048B3D] rounded font-semibold text-center hover:bg-[#f3f3f3] transition"
            >
              Contact Us
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
