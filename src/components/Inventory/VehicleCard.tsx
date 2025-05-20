import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const VehicleCard = ({ vehicle }: any) => (
  <div className="bg-white border border-[#e6f2ed] rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden flex flex-col group cursor-pointer">
    <div className="relative w-full h-56 bg-gray-100">
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
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
      <Link
        href={`/inventory/${vehicle.slug}`}
        className="mt-auto bg-gradient-to-r from-green-600 to-green-400 hover:from-green-700 hover:to-green-500 text-white text-center rounded-lg py-2 px-4 font-semibold transition shadow"
      >
        More Info & Photos
      </Link>
    </div>
  </div>
);

export default VehicleCard;
