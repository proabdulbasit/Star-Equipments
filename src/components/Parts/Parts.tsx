'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const parts = [
  {
    name: 'B/A Products',
    image: '/images/ba-products.webp',
    href: '/shop/ba-products',
  },
  {
    name: 'Clothing',
    image: '/images/portwest.webp',
    href: '/shop/clothing',
  },
  {
    name: 'Towmate',
    image: '/images/towmate.webp',
    href: '/shop/towmate',
  },
  {
    name: 'NRC Parts',
    image: '/images/nrc.avif',
    href: '/shop/nrc-parts',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

function Parts() {
  return (
    <section className="py-16 bg-[#F4F4F4]">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-12">
        <motion.h2
          className="text-3xl michroma-regular text-center text-[#007934] mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          Shop by Category
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {parts.map((part) => (
            <motion.div
              key={part.name}
              variants={cardVariants}
              whileHover={{ scale: 1.04 }}
            >
              <Link
                href={part.href}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition flex flex-col items-center p-6 cursor-pointer border border-transparent hover:border-[#007934]"
              >
                <div className="w-full h-48 flex items-center justify-center overflow-hidden rounded-xl mb-6 bg-gray-100">
                  <Image
                    src={part.image}
                    alt={part.name}
                    width={220}
                    height={180}
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-xl font-semibold text-[#2C2C2C] mb-4 text-center">
                  {part.name}
                </h3>
                <span className="mt-auto inline-block px-6 py-2 bg-[#048B3D] text-white rounded-full font-semibold text-center hover:bg-[#02682e] transition">
                  Shop Now
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
export default Parts;
