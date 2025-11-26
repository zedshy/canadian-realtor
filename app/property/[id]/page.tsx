import { properties } from '@/lib/properties';
import PropertyDetailClient from './PropertyDetailClient';

// Generate static params for all properties
export async function generateStaticParams() {
  return properties.map((property) => ({
    id: property.id,
  }));
}

export default async function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const property = properties.find((p) => p.id === id);

  if (!property) {
    return <div>Property not found</div>;
  }

  return <PropertyDetailClient property={property} />;
}
