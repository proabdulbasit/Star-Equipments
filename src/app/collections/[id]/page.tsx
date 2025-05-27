import CollectionPage from '@/features/Collections/CollectionPage';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { id } = await params;
    if (!id) {
      return {
        title: 'Collection Not Found - Star Equipment Sales',
        description: 'The requested collection could not be found.',
      };
    }

    const title = id.charAt(0).toUpperCase() + id.slice(1);

    return {
      title: `${title} - Star Equipment Sales`,
      description: `Browse our ${title} collection of products at Star Equipment Sales.`,
      openGraph: {
        title: `${title} - Star Equipment Sales`,
        description: `Browse our ${title} collection of products at Star Equipment Sales.`,
        type: 'website',
      },
    };
  } catch (error) {
    return {
      title: 'Collection - Star Equipment Sales',
      description: 'Browse our collection of products at Star Equipment Sales.',
    };
  }
}

export default CollectionPage;
