'use client';
import Image from 'next/image';
import GalleryData from '@/data/gallerydata.json';
import HeroSection2 from '@/components/HeroSection/HeroSection2';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function Gallery() {
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const openModal = (idx: number) => setModalIndex(idx);
  const closeModal = () => setModalIndex(null);
  const nextImg = () =>
    setModalIndex(
      modalIndex !== null ? (modalIndex + 1) % GalleryData.length : null,
    );
  const prevImg = () =>
    setModalIndex(
      modalIndex !== null
        ? (modalIndex - 1 + GalleryData.length) % GalleryData.length
        : null,
    );

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12 },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: 'easeOut' },
    },
  };

  return (
    <div>
      <HeroSection2
        title="Gallery"
        subtitle="See our work in action and get inspired"
        bgImage="/assets/Gallery/gallery-4.jpg"
        ctaText="View Gallery"
        ctaHref="/gallery"
        align="center"
      />
      <div className="bg-[#F4F4F4] py-10">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-12">
          <motion.div
            className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 w-full md:w-auto justify-center md:justify-start">
              <Image
                src="/assets/Homepage/dots-icon.svg"
                alt="dots"
                width={80}
                height={80}
                className="hidden md:block"
              />
              <h1 className="text-2xl md:text-3xl michroma-regular text-[#2C2C2C]">
                <span className="block w-full text-center md:text-left">
                  Explore Our Trucks Gallery
                </span>
              </h1>
            </div>
            <a
              href="/parts"
              className="flex items-center justify-center gap-2 px-8 py-3 bg-[#048B3D] text-white rounded-full font-semibold shadow-lg hover:bg-[#02682e] transition text-lg mt-4 md:mt-0 text-center w-full md:w-auto"
              style={{ boxShadow: '0 4px 16px 0 rgba(0,0,0,0.10)' }}
            >
              <span className="w-full text-center">Shop Now</span>
            </a>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {GalleryData
              ? GalleryData.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    className="w-full h-[250px] rounded-xl overflow-hidden shadow-lg group bg-white cursor-pointer"
                    variants={itemVariants}
                    whileHover={{ scale: 1.04 }}
                    onClick={() => openModal(idx)}
                  >
                    <Image
                      src={item.image}
                      alt="item"
                      width={400}
                      height={250}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </motion.div>
                ))
              : 'loading'}
          </motion.div>
        </div>
      </div>
      {/* Modal Lightbox */}
      <AnimatePresence>
        {modalIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="relative max-w-3xl w-full flex flex-col items-center">
              {/* Controls outside image */}
              <button
                onClick={closeModal}
                className="absolute -top-12 right-0 text-white text-3xl bg-black/60 rounded-full w-10 h-10 flex items-center justify-center z-10 hover:bg-black/80 transition"
                aria-label="Close"
              >
                &times;
              </button>
              <button
                onClick={prevImg}
                className="absolute left-[-60px] top-1/2 -translate-y-1/2 text-white text-3xl bg-black/60 rounded-full w-10 h-10 flex items-center justify-center z-10 hover:bg-black/80 transition"
                aria-label="Previous"
              >
                &#8592;
              </button>
              <button
                onClick={nextImg}
                className="absolute right-[-60px] top-1/2 -translate-y-1/2 text-white text-3xl bg-black/60 rounded-full w-10 h-10 flex items-center justify-center z-10 hover:bg-black/80 transition"
                aria-label="Next"
              >
                &#8594;
              </button>
              <motion.img
                src={GalleryData[modalIndex].image}
                alt="Gallery Large"
                className="max-h-[80vh] w-auto rounded-xl shadow-xl"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
export default Gallery;
