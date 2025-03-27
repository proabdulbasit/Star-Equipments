import HeroSection from '@/components/HeroSection';
import Image from 'next/image';
import {
  Terms,
  ChangesTerms,
  Property,
  Users,
  Agree,
  Reliance,
  Warranties,
  Liability,
  Law,
  Waiver,
} from './constants';
function TermsCondition() {
  return (
    <div>
      <HeroSection
        image="/assets/Terms/terms.svg"
        title="Terms & Conditions"
        para="Read the document carefully"
      />
      <div className="flex bg-[#F4F4F4] items-center">
        <Image
          src="/assets/Homepage/dots-icon.svg"
          alt="dots"
          width={120}
          height={120}
        />
        <div className="flex w-full pr-24 items-center justify-between">
          <h1 className="text-3xl  michroma-regular text-center  text-[#007934]">
            Acceptance of the Terms of Use
          </h1>
        </div>
      </div>
      <ul className="space-y-5 w-[90%] mt-5 mx-auto">
        {Terms
          ? Terms.map((item: any) => {
              return (
                <li key={item.id}>
                  <p className="text-[#000000]  roboto-condensed  text-lg">
                    {item.list}
                  </p>
                </li>
              );
            })
          : 'loading'}
      </ul>
      <div className=" my-10">
        <h1 className="text-3xl  michroma-regular w-[90%] mx-auto  text-[#007934]">
          Changes to the Terms of Use{' '}
        </h1>
      </div>
      <ul className="space-y-5 w-[90%] mt-5 mx-auto">
        {ChangesTerms
          ? ChangesTerms.map((item) => {
              return (
                <li key={item.id}>
                  <p className="text-[#000000]  roboto-condensed  text-lg">
                    {item.list}
                  </p>
                </li>
              );
            })
          : 'loading'}
      </ul>
      <div className=" w-[90%] mx-auto my-10">
        <h1 className="text-3xl  michroma-regular  text-[#007934]">
          Intellectual Property Rights{' '}
        </h1>
        <p className="text-[#000000] mt-5 roboto-condensed  text-lg">
          The Website and its entire contents, features and functionality
          (including but not limited to all information, software, text,
          displays, images, video and audio, and the design, selection and
          arrangement thereof), are owned by the Company, its licensors or other
          providers of such material and are protected by United States and
          international copyright, trademark, patent, trade secret and other
          intellectual property or proprietary rights laws. These Terms of Use
          permit you to use the Website for your personal, non-commercial use
          only. You must not reproduce, distribute, modify, create derivative
          works of, publicly display, publicly perform, republish, download,
          store or transmit any of the material on our Website, except as
          follows:
        </p>
      </div>
      <ul className="space-y-5 w-[85%] list-disc mt-5 mx-auto">
        {Property
          ? Property.map((item) => {
              return (
                <li key={item.id}>
                  <p className="text-[#000000]  roboto-condensed  text-lg">
                    {item.list}
                  </p>
                </li>
              );
            })
          : 'loading'}
      </ul>
      <div className=" w-[90%] mx-auto my-10">
        <h1 className="text-3xl  michroma-regular  text-[#007934]">
          Trademarks{' '}
        </h1>
        <p className="text-[#000000] mt-5 roboto-condensed  text-lg">
          The Company name, the Company logo and all related names, logos,
          product and service names, designs and slogans are trademarks of the
          Company. You must not use such marks without the prior written
          permission of the Company. All other names, logos, product and service
          names, designs and slogans on this Website are the trademarks of their
          respective owners.
        </p>
      </div>
      <div className=" w-[90%] mx-auto my-10">
        <h1 className="text-3xl  michroma-regular  text-[#007934]">
          Prohibited Uses
        </h1>
        <p className="text-[#000000] mt-5 roboto-condensed  text-lg">
          You may use the Website only for lawful purposes and in accordance
          with these Terms of Use. You agree not to use the Website:
        </p>
      </div>
      <ul className="space-y-5 w-[85%] list-disc mt-0 mx-auto">
        {Users
          ? Users.map((item) => {
              return (
                <li key={item.id}>
                  <p className="text-[#000000]  roboto-condensed  text-lg">
                    {item.list}
                  </p>
                </li>
              );
            })
          : 'loading'}
      </ul>
      <div className=" w-[90%] mx-auto my-10">
        <h1 className="text-3xl  michroma-regular  text-[#007934]">
          Additionally, you agree not to:
        </h1>
      </div>
      <ul className="space-y-5 w-[85%] list-disc mt-0 mx-auto">
        {Agree
          ? Agree.map((item) => {
              return (
                <li key={item.id}>
                  <p className="text-[#000000]  roboto-condensed  text-lg">
                    {item.list}
                  </p>
                </li>
              );
            })
          : 'loading'}
      </ul>
      <div className=" w-[90%] mx-auto my-10">
        <h1 className="text-3xl  michroma-regular  text-[#007934]">
          Reliance on Information Posted
        </h1>
      </div>
      <ul className="space-y-5 w-[90%] mt-0 mx-auto">
        {Reliance
          ? Reliance.map((item) => {
              return (
                <li key={item.id}>
                  <p className="text-[#000000]  roboto-condensed  text-lg">
                    {item.list}
                  </p>
                </li>
              );
            })
          : 'loading'}
      </ul>
      <div className=" w-[90%] mx-auto my-10">
        <h1 className="text-3xl  michroma-regular  text-[#007934]">
          Purchases
        </h1>
        <p className="text-[#000000] mt-5 roboto-condensed  text-lg">
          Only licensed, franchised dealers can legally sell vehicles. Sales of
          vehicles listed on the Website must be made by one of our licensed
          dealer locations.
        </p>
      </div>
      <div className=" w-[90%] mx-auto my-10">
        <h1 className="text-3xl  michroma-regular  text-[#007934]">
          Changes to the Website
        </h1>
        <p className="text-[#000000] mt-5 roboto-condensed  text-lg">
          We may update the content on this Website from time to time, but its
          content is not necessarily complete or up-to-date. Any of the material
          on the Website may be out of date at any given time, and we are under
          no obligation to update such material.{' '}
        </p>
        <p className="text-[#000000] mt-5 roboto-condensed  text-lg">
          Information About You and Your Visits to the Website All information
          we collect on this Website is subject to our Privacy Policy. By using
          the Website, you consent to all actions taken by us with respect to
          your information in compliance with the Privacy Policy.
        </p>
      </div>
      <div className=" w-[90%] mx-auto my-10">
        <h1 className="text-3xl  michroma-regular  text-[#007934]">
          Links from the Website
        </h1>
        <p className="text-[#000000] mt-5 roboto-condensed  text-lg">
          If the Website contains links to other sites and resources provided by
          third parties, these links are provided for your convenience only.
          This includes links contained in advertisements, including banner
          advertisements and sponsored links. We have no control over the
          contents of those sites or resources, and accept no responsibility for
          them or for any loss or damage that may arise from your use of them.
          If you decide to access any of the third party websites linked to this
          Website, you do so entirely at your own risk and subject to the terms
          and conditions of use for such websites.
        </p>
      </div>
      <div className=" w-[90%] mx-auto my-10">
        <h1 className="text-3xl  michroma-regular  text-[#007934]">
          Geographic Restrictions
        </h1>
        <p className="text-[#000000] mt-5 roboto-condensed  text-lg">
          We provide this Website for use only by persons located in the United
          States. We make no claims that the Website or any of its content is
          accessible or appropriate outside of the United States. Access to the
          Website may not be legal by certain persons or in certain countries.
          If you access the Website from outside the United States, you do so on
          your own initiative and are responsible for compliance with local
          laws.
        </p>
      </div>
      <div className=" w-[90%] mx-auto my-10">
        <h1 className="text-3xl  michroma-regular  text-[#007934]">
          Disclaimer of Warranties
        </h1>
      </div>
      <ul className="space-y-5 w-[90%] mt-0 mx-auto">
        {Warranties
          ? Warranties.map((item) => {
              return (
                <li key={item.id}>
                  <p className="text-[#000000]  roboto-condensed  text-lg">
                    {item.list}
                  </p>
                </li>
              );
            })
          : 'loading'}
      </ul>
      <div className=" w-[90%] mx-auto my-10">
        <h1 className="text-3xl  michroma-regular  text-[#007934]">
          Limitation on Liability{' '}
        </h1>
      </div>
      <ul className="space-y-5 w-[90%] mt-0 mx-auto">
        {Liability
          ? Liability.map((item) => {
              return (
                <li key={item.id}>
                  <p className="text-[#000000]  roboto-condensed  text-lg">
                    {item.list}
                  </p>
                </li>
              );
            })
          : 'loading'}
      </ul>
      <div className=" w-[90%] mx-auto my-10">
        <h1 className="text-3xl  michroma-regular  text-[#007934]">
          Indemnification{' '}
        </h1>
        <p className="text-[#000000] mt-5 roboto-condensed  text-lg">
          You agree to defend, indemnify and hold harmless the Company, its
          affiliates, licensors and service providers, and its and their
          respective officers, directors, employees, contractors, agents,
          licensors, suppliers, successors and assigns from and against any
          claims, liabilities, damages, judgments, awards, losses, costs,
          expenses or fees (including reasonable attorneys fees) arising out of
          or relating to your violation of these Terms of Use or your use of the
          Website, including, but not limited to, any use of the Websites
          content, services and products other than as expressly authorized in
          these Terms of Use or your use of any information obtained from the
          Website.
        </p>
      </div>
      <div className=" w-[90%] mx-auto my-10">
        <h1 className="text-3xl  michroma-regular  text-[#007934]">
          Governing Law and Jurisdiction{' '}
        </h1>
      </div>
      <ul className="space-y-5 w-[90%] mt-0 mx-auto">
        {Law
          ? Law.map((item) => {
              return (
                <li key={item.id}>
                  <p className="text-[#000000]  roboto-condensed  text-lg">
                    {item.list}
                  </p>
                </li>
              );
            })
          : 'loading'}
      </ul>
      <div className=" w-[90%] mx-auto my-10">
        <h1 className="text-3xl  michroma-regular  text-[#007934]">
          Limitation on Time to File Claims{' '}
        </h1>
        <p className="text-[#000000] mt-5 roboto-condensed  text-lg">
          ANY CAUSE OF ACTION OR CLAIM YOU MAY HAVE ARISING OUT OF OR RELATING
          TO THESE TERMS OF USE OR THE WEBSITE MUST BE COMMENCED WITHIN ONE (1)
          YEAR AFTER THE CAUSE OF ACTION ACCRUES, OTHERWISE, SUCH CAUSE OF
          ACTION OR CLAIM IS PERMANENTLY BARRED.{' '}
        </p>
      </div>
      <div className=" w-[90%] mx-auto my-10">
        <h1 className="text-3xl  michroma-regular  text-[#007934]">
          Waiver and Severability{' '}
        </h1>
      </div>
      <ul className="space-y-5 w-[90%] mt-0 mx-auto">
        {Waiver
          ? Waiver.map((item) => {
              return (
                <li key={item.id}>
                  <p className="text-[#000000]  roboto-condensed  text-lg">
                    {item.list}
                  </p>
                </li>
              );
            })
          : 'loading'}
      </ul>
      <div className=" w-[90%] mx-auto my-10">
        <h1 className="text-3xl  michroma-regular  text-[#007934]">
          Entire Agreement{' '}
        </h1>
        <p className="text-[#000000] mt-5 roboto-condensed  text-lg">
          The Terms of Use and our Privacy Policy constitute the sole and entire
          agreement between you and us with respect to the Website and supersede
          all prior and contemporaneous understandings, agreements,
          representations and warranties, both written and oral, with respect to
          the Website.
        </p>
      </div>
    </div>
  );
}
export default TermsCondition;
