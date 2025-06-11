import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { useRef, useState } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';

const VehicleCard = ({ vehicle }: any) => {
  const swiperRef = useRef<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = vehicle.images.length;

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  return (
    <Link href={`/inventory/${vehicle.slug}`} className="block h-full">
      <div className="bg-white border border-[#e6f2ed] rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden flex flex-col h-full group cursor-pointer">
        <div className="relative w-full h-56 bg-gray-100">
          <Swiper
            modules={[Pagination]}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
            pagination={{
              clickable: true,
              renderBullet: (index, className) =>
                index < 4 ? `<span class="${className}"></span>` : '',
            }}
            className="w-full h-full"
            style={{ borderRadius: '1rem' }}
          >
            {vehicle.images.map((img: string, idx: number) => (
              <SwiperSlide key={idx}>
                <Image
                  src={img}
                  alt={`${vehicle.title} image ${idx + 1}`}
                  fill
                  className="object-cover"
                  priority={idx === 0}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          {/* Custom navigation buttons */}
          {currentIndex > 0 && (
            <button
              onClick={handlePrev}
              className="absolute left-2 top-1/2 z-20 -translate-y-1/2 bg-white/90 text-black rounded-full w-8 h-8 flex items-center justify-center shadow border border-gray-200"
              tabIndex={0}
              aria-label="Previous image"
            >
              <svg width={20} height={20} fill="none" viewBox="0 0 24 24">
                <path
                  d="M15 19l-7-7 7-7"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
          {currentIndex < totalSlides - 1 && (
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 z-20 -translate-y-1/2 bg-white/90 text-black rounded-full w-8 h-8 flex items-center justify-center shadow border border-gray-200"
              tabIndex={0}
              aria-label="Next image"
            >
              <svg width={20} height={20} fill="none" viewBox="0 0 24 24">
                <path
                  d="M9 5l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
          <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black/60 to-transparent z-10 pointer-events-none" />
          {/* Example badge for new vehicles */}
          {vehicle.isNew && (
            <span className="absolute top-3 left-3 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full z-20 shadow">
              NEW
            </span>
          )}
        </div>
        <div className="p-5 flex flex-col flex-1">
          <h2 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-green-700 transition">
            {vehicle.title}
          </h2>
          <div className="text-green-700 font-semibold text-xl mb-3">
            {vehicle.price}
          </div>
          <div className="mt-auto bg-gradient-to-r from-green-600 to-green-400 hover:from-green-700 hover:to-green-500 text-white text-center rounded-lg py-2 px-4 font-semibold transition shadow">
            More Info & Photos
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VehicleCard;
