'use client';
import { useState } from 'react';

const VehicleDescription = ({ description }: { description: string }) => {
  const [showFullDesc, setShowFullDesc] = useState(false);
  const descLimit = 180;
  const isLongDesc = description && description.length > descLimit;
  const descToShow =
    showFullDesc || !isLongDesc
      ? description
      : description.slice(0, descLimit) + '...';

  return (
    <div className="px-1 py-2 text-gray-800 leading-relaxed">
      {descToShow}
      {isLongDesc && (
        <button
          className="ml-2 text-green-700 underline text-sm"
          onClick={() => setShowFullDesc((v) => !v)}
        >
          {showFullDesc ? 'Show less' : 'Read more'}
        </button>
      )}
    </div>
  );
};

export default VehicleDescription;
