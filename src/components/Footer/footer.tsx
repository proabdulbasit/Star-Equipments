import React from 'react';
import Image from 'next/image';
import { FaFacebookF } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import FooterLinksJson from '@/data/footerLinks.json';
import RenderSection from '@/components/Footer/renderFooterLinks';
import Link from 'next/link';
function Footer() {
  const { NavigationLinks, SupportLinks } = FooterLinksJson;

  return (
    <>
      <div className="bg-[#031E0E] py-20 roboto-condensed lg:flex  lg:justify-between justify-center lg:text-start text-center lg:p-24 p-5">
        <div className="max-w-[1440px] mx-auto w-full flex flex-col lg:flex-row lg:justify-between">
          <div>
            <Link href="/" className="cursor-pointer">
              <Image
                src="/images/logo-pngg.png"
                alt="icons"
                width={204}
                height={200}
                className="mx-auto"
              />
            </Link>

            <p className="lg:text-[18px] leading-[2] text-[14px] text-[#FFFFFF] mb-3 mt-5 lg:w-72">
              644 Star Lane Roberts, WI 54023
            </p>
            <Link href="#" className="cursor-pointer text-white">
              <p>(715) 760-4004</p>
            </Link>
          </div>
          <RenderSection title="Quick Links" items={NavigationLinks} />
          <RenderSection title="Our Store" items={SupportLinks} />
          <div className="xl:mt-0 my-5">
            <h1 className="text-[#007934] font-bold  lg:text-[24px]  text-[20px]">
              Follow Us{' '}
            </h1>
            <div className="flex items-center mt-5 lg:justify-start justify-center gap-4">
              <div className="bg-[#007934] shadow-lg rounded-full w-[40px] h-[40px] flex items-center flex-col justify-center">
                <Link href="https://www.facebook.com/bigrigtowingandrecovery/">
                  <FaFacebookF className="text-white text-2xl" />
                </Link>
              </div>{' '}
              <div className="bg-[#007934] shadow-lg rounded-full w-[40px] h-[40px] flex items-center flex-col justify-center">
                <Link href="">
                  <FaInstagram className="text-white text-2xl" />
                </Link>
              </div>
            </div>
          </div>
          <div className="xl:mt-0 my-5">
            <h1 className="text-[#007934] mb-5 font-bold  lg:text-[24px]  text-[20px]">
              Payment Options{' '}
            </h1>
            <Image
              src="/assets/Header/icons.svg"
              alt="icons"
              width={204}
              height={200}
              className="mx-auto"
            />
          </div>
        </div>
      </div>
      <div className="bg-[#007934] text-center py-3">
        <div className="max-w-[1440px] mx-auto w-full lg:flex items-center justify-between lg:text-[15px] text-[9px] text-white raleway px-5 lg:px-24">
          <h1>© Star Equipment Sales • All Rights Reserved </h1>
          <div>
            <ul className="flex items-center justify-center lg:mt-0 mt-2 gap-10">
              <li>
                <Link href="/terms-conditions">Term and Conditions</Link>
              </li>
              <li>
                <Link href="/privacy-policy">Privacy Policy</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
export default Footer;
