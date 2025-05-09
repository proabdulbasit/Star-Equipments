'use client';
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import Image from 'next/image';
import { CarouselProps } from './type';

function Carousel({ images }: CarouselProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="w-[550px] h-[480px]  mx-10">
      <Swiper
        style={
          {
            '--swiper-navigation-color': '#fff',
            '--swiper-pagination-color': '#fff',
          } as { [key: string]: string }
        }
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        onSlideChange={(swiper) => setSelectedIndex(swiper.activeIndex)}
      >
        {images.map((image, index) => (
          <SwiperSlide key={image}>
            <div
              className={`border rounded-xl w-[550px] h-[470px] ${
                selectedIndex === index ? 'border-[#007934]' : 'border-gray-300'
              }`}
            >
              <Image
                src={image}
                alt="gloves"
                width={270}
                height={230}
                className="h-[200px] object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={3}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="-mt-32"
      >
        {images.map((image, index) => (
          <SwiperSlide key={image} onClick={() => setSelectedIndex(index)}>
            <div
              className={`w-[170px] h-[170px] cursor-pointer ${
                selectedIndex === index
                  ? 'border shadow rounded-xl'
                  : 'border border-transparent'
              }`}
            >
              <Image src={image} alt="gloves" width={170} height={170} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
export default Carousel;
