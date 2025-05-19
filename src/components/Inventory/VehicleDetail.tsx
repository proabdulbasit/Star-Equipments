'use client';
import {
  FaPhoneAlt,
  FaShareAlt,
  FaCogs,
  FaTachometerAlt,
  FaIdCard,
  FaCar,
} from 'react-icons/fa';
import VehicleImageGallery from './VehicleImageGallery';
import VehicleDescription from './VehicleDescription';

const specIcons: Record<string, JSX.Element> = {
  Engine: <FaCogs className="inline mr-2 text-green-600" />,
  Mileage: <FaTachometerAlt className="inline mr-2 text-green-600" />,
  VIN: <FaIdCard className="inline mr-2 text-green-600" />,
  Model: <FaCar className="inline mr-2 text-green-600" />,
};

const VehicleDetail = ({ vehicle }: any) => {
  return (
    <div className="lg:w-[1440px] mx-auto mt-10 overflow-visible font-sans p-4 lg:p-10">
      <div className="flex flex-col lg:flex-row gap-8 mb-10">
        <div className="w-full lg:w-1/2  rounded-2xl p-0 flex flex-col gap-0 border border-gray-100 animate-fadeInUp">
          <VehicleImageGallery images={vehicle.images} title={vehicle.title} />
        </div>
        <div className="w-full lg:w-1/2 backdrop-blur-xl rounded-2xl md:p-8 flex flex-col gap-6 border border-gray-100 animate-fadeInUp">
          <div className="flex items-center gap-4 mb-2">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight font-michroma">
              {vehicle.title}
            </h1>
            {vehicle.condition && (
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold shadow-md ${vehicle.condition === 'New' ? 'bg-green-600 text-white' : 'bg-yellow-500 text-white'}`}
              >
                {vehicle.condition}
              </span>
            )}
          </div>
          <div className="text-3xl text-green-700 font-extrabold bg-gradient-to-r from-green-200 to-green-50 border border-green-200 px-6 py-3 rounded-xl shadow-lg w-fit mb-2">
            {vehicle.price}
          </div>
          <div className="border-t border-gray-200 my-2" />
          <div className="flex gap-3 flex-wrap mb-2">
            <button className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-400 hover:from-green-700 hover:to-green-500 text-white px-5 py-3 rounded-xl font-semibold shadow transition text-lg">
              <FaPhoneAlt /> Call
            </button>
            <button className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 px-5 py-3 rounded-xl font-semibold shadow transition text-lg">
              <FaShareAlt /> Share
            </button>
            <button className="flex items-center gap-2 bg-green-100 hover:bg-green-200 text-green-700 px-5 py-3 rounded-xl font-semibold shadow transition text-lg">
              Get Credit
            </button>
          </div>
          <div className="bg-white/90 rounded-xl shadow p-4 flex flex-col gap-2 border border-gray-100">
            <div className="text-lg text-gray-700 font-semibold flex items-center gap-2">
              <FaCar className="text-green-600" />
              Dealer: {vehicle.dealer}
            </div>
            <div className="text-gray-600 flex items-center gap-2">
              <FaPhoneAlt className="text-green-600" />
              {vehicle.phone}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <div className="bg-white/90 rounded-2xl shadow p-6 border border-gray-100 animate-fadeInUp">
          <div className="font-bold bg-black text-white px-3 py-1 rounded-t w-fit text-sm mb-1">
            Description
          </div>
          <VehicleDescription description={vehicle.description} />
        </div>
        <div className="bg-white/90 rounded-2xl shadow p-6 border border-gray-100 animate-fadeInUp">
          <div className="font-bold bg-black text-white px-3 py-1 rounded-t w-fit text-sm mb-1">
            Specifications
          </div>
          <table className="w-full border border-t-0 rounded-b bg-gray-50">
            <tbody>
              {vehicle.specifications &&
                Object.entries(vehicle.specifications).map(
                  ([key, value], idx) => (
                    <tr
                      key={key}
                      className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-100'}
                    >
                      <td className="px-3 py-2 font-semibold text-gray-700 w-32">
                        {specIcons[key] || null}
                        {key}
                      </td>
                      <td className="px-3 py-2 text-gray-800">
                        {String(value)}
                      </td>
                    </tr>
                  ),
                )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 z-40 flex lg:hidden bg-white/95 backdrop-blur-md shadow-t px-4 py-3 gap-3 justify-center animate-fadeInUp">
        <button className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-green-400 hover:from-green-700 hover:to-green-500 text-white px-4 py-3 rounded-xl font-semibold shadow transition">
          <FaPhoneAlt /> Call
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-3 rounded-xl font-semibold shadow transition">
          <FaShareAlt /> Share
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 bg-green-100 hover:bg-green-200 text-green-700 px-4 py-3 rounded-xl font-semibold shadow transition">
          Get Credit
        </button>
      </div>
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default VehicleDetail;
