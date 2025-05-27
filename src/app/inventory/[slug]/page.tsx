import vehicleData from '@/data/vehicleData.json';
import VehicleDetail from '@/components/Inventory/VehicleDetail';
import { Suspense } from 'react';
import VehicleDetailLoading from './loading';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { slug } = await params;
    const vehicle = vehicleData.find(
      (v: any) => v.slug === decodeURIComponent(slug),
    );

    if (!vehicle) {
      return {
        title: 'Vehicle Not Found - Star Equipment Sales',
        description:
          'The requested vehicle could not be found in our inventory.',
      };
    }

    return {
      title: `${vehicle.title} - Star Equipment Sales`,
      description: `${vehicle.title} - ${
        vehicle.description ||
        'View details about this vehicle in our inventory.'
      }`,
      openGraph: {
        title: `${vehicle.title} - Star Equipment Sales`,
        description: `${vehicle.title} - ${
          vehicle.description ||
          'View details about this vehicle in our inventory.'
        }`,
        type: 'website',
        images: vehicle.images
          ? [
              {
                url: vehicle.images[0],
                width: 1200,
                height: 630,
                alt: vehicle.title,
              },
            ]
          : undefined,
      },
    };
  } catch (error) {
    return {
      title: 'Vehicle Details - Star Equipment Sales',
      description: 'View detailed information about our vehicles.',
    };
  }
}

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
