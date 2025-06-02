'use client';
import HeroSection2 from '@/components/HeroSection/HeroSection2';
import Image from 'next/image';
import { MdOutlineMail, MdOutlinePhoneInTalk } from 'react-icons/md';
import { PiAddressBookTabsLight } from 'react-icons/pi';
import Form from '@/components/Form';
import { motion } from 'framer-motion';

function ContactUs() {
  return (
    <div>
      <HeroSection2
        title="Get in touch"
        subtitle="We'd love to hear from you!"
        bgImage="/assets/Contact/contactHeader.svg"
        align="center"
      />
      <div className="bg-[#F4F4F4] py-16 min-h-[40vh] ">
        <div className="flex flex-col lg:flex-row gap-10 items-center justify-between max-w-[1440px] mx-auto px-5 lg:px-24 h-full">
          {/* Contact Info Card */}
          <motion.div
            className="bg-white rounded-3xl shadow-xl p-8 flex-1 basis-1/2 mb-8 lg:mb-0 h-full"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-[#007934] mb-8 michroma-regular">
              Contact Information
            </h2>
            <div className="flex items-center gap-4 mb-6">
              <MdOutlineMail className="text-2xl text-[#007934]" />
              <span className="text-[#2C2C2C] text-lg">lisab@jttr.net</span>
            </div>
            <div className="flex items-center gap-4 mb-6">
              <MdOutlinePhoneInTalk className="text-2xl text-[#007934]" />
              <span className="text-[#2C2C2C] text-lg">(715) 760-4004</span>
            </div>
            <div className="flex items-center gap-4 mb-6">
              <PiAddressBookTabsLight className="text-2xl text-[#007934]" />
              <span className="text-[#2C2C2C] text-lg">
                644 Starr Ln, Roberts, WI 54023, United States
              </span>
            </div>
          </motion.div>
          <motion.div
            className="flex-1 basis-1/2 max-w-[600px] w-full h-full"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
            viewport={{ once: true }}
          >
            <Form />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
export default ContactUs;
