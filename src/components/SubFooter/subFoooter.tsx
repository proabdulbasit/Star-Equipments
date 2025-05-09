import Image from 'next/image';
function SubFooter() {
  return (
    <div className="bg-[#08341B] xl:flex items-center gap-10 lg:pt-0 pt-5 justify-between mt-14  text-white w-full bg-opacity-90">
      <Image
        src="/assets/Footer/footertruck.svg"
        alt="footertruck"
        width={767}
        height={425}
      />
      <div className="roboto-condensed text-white lg:mr-20 lg:p-0 p-5 space-y-6">
        <h1 className="lg:text-3xl text-xl font-bold">Stay in the Loop!</h1>
        <p className="lg:text-xl text-sm font-semibold">
          Sign up for our promotional emails and:
        </p>
        <ul className="lg:text-[19px] text-xs space-y-1 list-disc ml-7">
          <li>Get exclusive discounts and special offers.</li>
          <li>Be the first to know about new product launches.</li>
          <li>
            Receive expert tips and industry updates straight to your inbox.
          </li>
        </ul>
        <p className="lg:text-lg text-sm font-semibold">
          👉 Don’t miss out — join our email list today!
        </p>

        <div className="flex  items-center gap-5">
          <input
            type="text"
            placeholder="Your Email here"
            className="bg-white lg:h-[55px] h-[40px] lg:text-lg text-sm text-[#5B5B5B] rounded-full w-full pl-4 xl:w-[300px]  lg:pl-8"
          />
          <button className="lg:h-[55px] h-[40px] cursor-pointer rounded-full xl:w-[203px] w-full text-center text-white lg:text-xl  bg-[#007934] border-2 border-white">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
}

export default SubFooter;
