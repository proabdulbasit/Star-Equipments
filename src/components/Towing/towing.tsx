import { motion } from 'framer-motion';

function Towing() {
  return (
    <div className="bg-[url('/assets/Homepage/towing.svg')] roboto-condensed flex items-center justify-center px-4 md:px-12 lg:px-24 h-[477px] bg-center bg-cover bg-no-repeat w-full ">
      <div className="max-w-[1440px] w-full flex flex-col items-center justify-center mx-auto">
        <motion.div
          className="w-full md:w-1/2 mx-auto text-center py-10 md:py-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <motion.h1
            className="text-3xl text-white font-bold"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            Build for the Future – Towing Equipment That Goes the Distance
          </motion.h1>
          <motion.p
            className="text-white text-xl my-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.15 }}
            viewport={{ once: true }}
          >
            With over 40 years of industry expertise, our curated selection of
            towing and recovery equipment is designed to meet the demands of
            professionals. Step into the future with Star Equipment Sales
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
export default Towing;
