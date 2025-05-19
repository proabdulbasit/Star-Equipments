'use client';
import Image from 'next/image';
import { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface VehicleImageGalleryProps {
  images: string[];
  title: string;
}

const VehicleImageGallery = ({ images, title }: VehicleImageGalleryProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);
  const swiperRef = useRef<any>(null);
  const openModal = (idx: number) => {
    setModalIndex(idx);
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

  const maxThumbs = 3;
  const showMore = images.length > maxThumbs;
  const thumbsToShow = showMore ? images.slice(0, maxThumbs) : images;
  const moreCount = images.length - maxThumbs;

  return (
    <>
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fadeInUp">
          <button
            onClick={closeModal}
            className="absolute top-6 right-10 text-white text-xl font-bold z-50"
          >
            &times;
          </button>
          <div className="relative w-full max-w-3xl flex items-center justify-center">
            <button
              className="absolute left-2 top-1/2 -translate-y-1/2 z-50 bg-black/60 hover:bg-green-600 text-white rounded-full p-3 transition"
              onClick={() => swiperRef.current?.slidePrev()}
              aria-label="Previous image"
              type="button"
            >
              <FaChevronLeft size={24} />
            </button>
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 z-50 bg-black/60 hover:bg-green-600 text-white rounded-full p-3 transition"
              onClick={() => swiperRef.current?.slideNext()}
              aria-label="Next image"
              type="button"
            >
              <FaChevronRight size={24} />
            </button>
            <Swiper
              modules={[Navigation]}
              navigation
              loop={true}
              initialSlide={modalIndex}
              className="w-full h-[70vh]"
              onSwiper={(swiper) => (swiperRef.current = swiper)}
            >
              {images.map((img, idx) => (
                <SwiperSlide key={idx}>
                  <div className="flex items-center justify-center w-full h-[70vh]">
                    <Image
                      src={img}
                      alt={title + ' preview'}
                      fill
                      style={{ objectFit: 'contain' }}
                      className="max-h-[70vh] w-auto h-auto rounded-xl bg-black"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
      <div className="flex flex-col gap-4 w-full h-full">
        <div className="relative w-full aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden">
          <Image
            src={images[0]}
            alt={title}
            fill
            className="object-cover cursor-pointer"
            onClick={() => openModal(0)}
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div className="flex gap-2 mt-2">
          {thumbsToShow.map((img, idx) => (
            <div
              key={idx}
              className="relative w-20 h-16 bg-gray-100 rounded overflow-hidden border cursor-pointer"
              onClick={() => openModal(idx)}
            >
              <Image
                src={img}
                alt={title + ' thumb'}
                fill
                className="object-cover"
              />
            </div>
          ))}
          {showMore && (
            <button
              className="w-20 h-16 bg-gray-200 rounded border flex items-center justify-center text-green-700 font-semibold text-sm cursor-pointer hover:bg-green-100"
              onClick={() => openModal(maxThumbs)}
            >
              +{moreCount} more
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default VehicleImageGallery;
