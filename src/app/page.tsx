'use client';

import Image from 'next/image';
import HeroSection from '@/components/HeroSection';
import Towing from '@/components/Towing';
import DiscountProduct from '@/components/DiscountProduct';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Parts from '@/components/Parts/Parts';

const categories = [
  {
    icon: '/assets/Homepage/nrc-icon.svg',
    label: 'NRC Parts',
    link: '/nrc-parts',
  },
  {
    icon: '/assets/Homepage/ba-icon.svg',
    label: 'B/A Products',
    link: '/ba-products',
  },
  {
    icon: '/assets/Homepage/cloth-icon.svg',
    label: 'Clothing',
    link: '/clothing',
  },
  {
    icon: '/assets/Homepage/micro-icon.svg',
    label: 'Towmate',
    link: '/towmate',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

export default function Home() {
  const router = useRouter();

  return (
    <div>
      <HeroSection
        image="/images/caraosuel3.jpg"
        title="Elevate your towing game!"
        para="Premium Equipment from Star Equipment Sales"
      />
      <div className="shade py-5 w-full ">
        <motion.h1
          className="text-3xl  michroma-regular text-center  text-white  mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          Product Categories
        </motion.h1>
        <motion.div
          className="mt-10 mx-auto flex items-center justify-between max-w-[1440px] mx-auto px-5 lg:px-12 mb-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.label + idx}
              className="flex flex-col items-center group cursor-pointer"
              variants={itemVariants}
              whileHover={{ scale: 1.08 }}
              transition={{ type: 'spring', stiffness: 300 }}
              onClick={() => {
                router.push(cat.link);
              }}
            >
              <Image
                src={cat.icon}
                alt="icon"
                width={82}
                height={82}
                className="transition-transform duration-300"
              />
              <h1 className="text-lg text-white roboto-condensed mt-2">
                {cat.label}
              </h1>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <DiscountProduct />
      <Parts />
      <Towing />

      {/* YouTube Video Section */}
      <section
        className="w-full py-16 relative bg-cover bg-center"
        style={{ backgroundImage: "url('/images/caraosuel2.jpg')" }}
      >
        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#14532d]/80 to-[#048B3D]/40 z-0 pointer-events-none" />
        <motion.h2
          className="text-3xl michroma-regular text-center text-white mb-10 relative z-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          Watch Us in Action
        </motion.h2>
        <motion.div
          className="max-w-[900px] mx-auto rounded-2xl overflow-hidden shadow-2xl border-4 border-white relative z-10"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="relative pb-[56.25%] h-0">
            <iframe
              src="https://www.youtube.com/embed/CC9GEiL7Ujc?rel=0&modestbranding=1&controls=1&loop=1&playlist=CC9GEiL7Ujc"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full"
            ></iframe>
          </div>
        </motion.div>
      </section>
      {/* <HotItem /> */}
      {/* <SubFooter /> */}
    </div>
  );
}
