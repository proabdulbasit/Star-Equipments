'use client';
import React from 'react';

import { motion } from 'framer-motion';

interface HeroSection2Props {
  title: string;
  subtitle?: string;
  bgImage: string;
  ctaText?: string;
  ctaHref?: string;
  align?: 'center' | 'left';
}

const HeroSection2: React.FC<HeroSection2Props> = ({
  title,
  subtitle,
  bgImage,
  ctaText,
  ctaHref,
  align = 'center',
}) => {
  return (
    <section
      className="relative w-full h-[40vh] min-h-[300px] flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Overlay gradient for readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent z-0 pointer-events-none" />
      <motion.div
        className={`relative z-10 max-w-[900px] w-full px-6 flex flex-col ${
          align === 'center'
            ? 'items-center text-center'
            : 'items-start text-left'
        }`}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h1 className="text-white text-3xl md:text-6xl font-bold drop-shadow-lg mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="text-white text-lg md:text-2xl mb-6 drop-shadow">
            {subtitle}
          </p>
        )}
        {/* {ctaText && ctaHref && (
          <a
            href={ctaHref}
            className="inline-block px-8 py-3 bg-[#048B3D] text-white rounded font-semibold text-center hover:bg-[#02682e] transition shadow-lg"
          >
            {ctaText}
          </a>
        )} */}
      </motion.div>
    </section>
  );
};

export default HeroSection2;
