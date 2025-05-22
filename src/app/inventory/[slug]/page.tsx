import vehicleData from '@/data/vehicleData.json';
import VehicleDetail from '@/components/Inventory/VehicleDetail';
import { Suspense } from 'react';
import VehicleDetailLoading from './loading';

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function VehiclePage({ params }: Props) {
  try {
    const { slug } = await params;
    const vehicle = vehicleData.find(
      (v: any) => v.slug === decodeURIComponent(slug),
    );

    if (!vehicle) {
      return <div className="p-8 text-center text-xl">Vehicle not found</div>;
    }

    return (
      <Suspense fallback={<VehicleDetailLoading />}>
        <VehicleDetail vehicle={vehicle} />
      </Suspense>
    );
  } catch (error) {
    console.error('Error loading vehicle:', error);
    return <div className="p-8 text-center text-xl">Error loading vehicle</div>;
  }
}
