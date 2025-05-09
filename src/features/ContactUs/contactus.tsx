import HeroSection from '@/components/HeroSection';
import Image from 'next/image';
import { MdOutlineMail } from 'react-icons/md';
import { MdOutlinePhoneInTalk } from 'react-icons/md';
import { PiAddressBookTabsLight } from 'react-icons/pi';

import Form from '@/components/Form';
function ContactUs() {
  return (
    <div>
      <HeroSection
        image="/assets/Contact/contactHeader.svg"
        title="Get in touch"
        para="Love to hear form you"
      />
      <div className="flex items-center">
        <Image
          src="/assets/Homepage/dots-icon.svg"
          alt="dots"
          width={120}
          height={120}
          className="lg:w-[120px] lg:h-[120px] w-[40px] h-[50px]"
        />
        <div className="flex xl:w-[1540px] mx-auto items-center justify-between">
          <h1 className="lg:text-3xl text-xs  michroma-regular text-center  text-[#007934]">
            Contact Us{' '}
          </h1>
        </div>
      </div>
      <div className="lg:flex items-center lg:mt-0 mt-10 xl:w-[1440px] w-[90%] mb-12 gap-14 mx-auto">
        <Form />
        <div className="bg-[#E8EAED] py-10 rounded-bl-3xl rounded-tr-3xl px-5">
          <h1 className="lg:text-3xl text-xl  michroma-regular text-[#2C2C2C]">
            Contact Us{' '}
          </h1>
          <div className="flex items-center mt-12 gap-14">
            <MdOutlineMail className="text-2xl text-[#2C2C2C]" />
            <p className="text-[#2C2C2C] text-lg">info@example.com</p>
          </div>
          <div className="flex items-center mt-12 gap-14">
            <MdOutlinePhoneInTalk className="lg:text-2xl text-xl text-[#2C2C2C]" />
            <p className="text-[#2C2C2C] text-sm lg:text-lg">(715) 760-4004</p>
          </div>
          <div className="flex items-center mt-12 gap-5 lg:gap-14">
            <PiAddressBookTabsLight className="lg:text-3xl text-5xl text-[#2C2C2C]" />
            <p className="text-[#2C2C2C] text-sm lg:text-lg">
              644 Starr Ln, Roberts, WI 54023, United States644 Starr Ln,
              Roberts, WI 54023, United States
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ContactUs;
