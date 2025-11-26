export interface Property {
  id: string;
  title: string;
  priceCad: number;
  city: string;
  province: string;
  neighbourhood: string;
  beds: number;
  baths: number;
  areaSqft: number;
  mlsId: string;
  propertyTaxesAnnualCad: number;
  condoFeesMonthlyCad?: number;
  type: 'condo' | 'detached' | 'semi-detached' | 'townhouse';
  images: string[];
  description: string;
  features: string[];
  isFeatured?: boolean;
}

export const properties: Property[] = [
  {
    id: '1',
    title: 'Modern Downtown Condo with Skyline Views',
    priceCad: 850000,
    city: 'Toronto',
    province: 'Ontario',
    neighbourhood: 'Downtown Core',
    beds: 2,
    baths: 2,
    areaSqft: 1100,
    mlsId: 'C5847392',
    propertyTaxesAnnualCad: 4200,
    condoFeesMonthlyCad: 650,
    type: 'condo',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
    ],
    description: 'Stunning 2-bedroom, 2-bathroom condo in the heart of Toronto\'s downtown core. Floor-to-ceiling windows offer breathtaking skyline views. Open-concept living with high-end finishes throughout. Walking distance to transit, restaurants, and entertainment.',
    features: [
      'Floor-to-ceiling windows',
      'Stainless steel appliances',
      'In-suite laundry',
      'Concierge service',
      'Gym and party room',
      '1 parking spot included',
      'Locker storage',
    ],
    isFeatured: true,
  },
  {
    id: '2',
    title: 'Spacious Family Home in Established Neighbourhood',
    priceCad: 1450000,
    city: 'Vancouver',
    province: 'British Columbia',
    neighbourhood: 'Kitsilano',
    beds: 4,
    baths: 3,
    areaSqft: 2400,
    mlsId: 'R2834756',
    propertyTaxesAnnualCad: 7800,
    type: 'detached',
    images: [
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
    ],
    description: 'Beautiful 4-bedroom detached home in sought-after Kitsilano. Fully renovated with modern kitchen, hardwood floors, and updated bathrooms. Large backyard perfect for families. Close to beaches, parks, and top-rated schools.',
    features: [
      'Recently renovated kitchen',
      'Hardwood floors throughout',
      'Large backyard with deck',
      'Updated bathrooms',
      'Double car garage',
      'Near beaches and parks',
      'Top-rated school catchment',
    ],
    isFeatured: true,
  },
  {
    id: '3',
    title: 'Charming Semi-Detached Home Near Transit',
    priceCad: 725000,
    city: 'Calgary',
    province: 'Alberta',
    neighbourhood: 'Marda Loop',
    beds: 3,
    baths: 2.5,
    areaSqft: 1650,
    mlsId: 'A2029485',
    propertyTaxesAnnualCad: 3900,
    type: 'semi-detached',
    images: [
      'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop',
    ],
    description: 'Well-maintained 3-bedroom semi-detached home in vibrant Marda Loop. Open-concept main floor with modern finishes. Finished basement adds extra living space. Steps to shops, restaurants, and public transit.',
    features: [
      'Open-concept main floor',
      'Modern kitchen with island',
      'Finished basement',
      'Attached single garage',
      'Fenced backyard',
      'Close to transit and amenities',
      'Low-maintenance exterior',
    ],
    isFeatured: true,
  },
  {
    id: '4',
    title: 'Contemporary Townhouse in Family-Friendly Community',
    priceCad: 620000,
    city: 'Ottawa',
    province: 'Ontario',
    neighbourhood: 'Barrhaven',
    beds: 3,
    baths: 2.5,
    areaSqft: 1550,
    mlsId: 'O5923847',
    propertyTaxesAnnualCad: 4500,
    condoFeesMonthlyCad: 275,
    type: 'townhouse',
    images: [
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600573472556-e636b3a5f3e1?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600573472555-7b8e7f69e89c?w=800&h=600&fit=crop',
    ],
    description: 'Move-in ready 3-bedroom townhouse in family-friendly Barrhaven. Modern kitchen, spacious bedrooms, and finished basement. Part of well-maintained complex with great amenities. Perfect for first-time buyers or growing families.',
    features: [
      'Modern kitchen with stainless appliances',
      'Primary bedroom with ensuite',
      'Finished basement rec room',
      'Private patio',
      'Single car garage',
      'Near schools and parks',
      'Community playground',
    ],
    isFeatured: false,
  },
  {
    id: '5',
    title: 'Luxury Waterfront Condo with Stunning Views',
    priceCad: 1250000,
    city: 'Vancouver',
    province: 'British Columbia',
    neighbourhood: 'Coal Harbour',
    beds: 2,
    baths: 2,
    areaSqft: 1300,
    mlsId: 'R2845623',
    propertyTaxesAnnualCad: 5200,
    condoFeesMonthlyCad: 890,
    type: 'condo',
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=600&fit=crop',
    ],
    description: 'Exceptional waterfront living in prestigious Coal Harbour. This luxury 2-bedroom condo offers panoramic water and mountain views. Premium finishes, spa-like bathrooms, and a chef\'s kitchen. World-class amenities including concierge, fitness centre, and pool.',
    features: [
      'Panoramic water views',
      'High-end appliances',
      'Marble countertops',
      'Spa-like bathrooms',
      '24-hour concierge',
      'Indoor pool and hot tub',
      'State-of-the-art fitness centre',
      '2 parking stalls + storage',
    ],
    isFeatured: true,
  },
  {
    id: '6',
    title: 'Renovated Bungalow with Character',
    priceCad: 895000,
    city: 'Toronto',
    province: 'Ontario',
    neighbourhood: 'East York',
    beds: 3,
    baths: 2,
    areaSqft: 1800,
    mlsId: 'C5892034',
    propertyTaxesAnnualCad: 5100,
    type: 'detached',
    images: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600563438938-a9a27216b4f5?w=800&h=600&fit=crop',
    ],
    description: 'Charming renovated bungalow in desirable East York. Beautifully updated while maintaining original character. Hardwood floors, modern kitchen, and updated bathrooms. Large lot with mature trees and private backyard. Great location close to transit and parks.',
    features: [
      'Original hardwood floors',
      'Updated kitchen and bathrooms',
      'Finished basement',
      'Large lot with mature trees',
      'Private backyard',
      'Single car garage',
      'Close to TTC and amenities',
    ],
    isFeatured: false,
  },
];

