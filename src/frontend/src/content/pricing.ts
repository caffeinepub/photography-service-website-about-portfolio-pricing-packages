export interface PricingTier {
  name: string;
  price: number;
  priceNote?: string;
  description: string;
  inclusions: string[];
  featured?: boolean;
}

export const pricingTiers: PricingTier[] = [
  {
    name: 'Intimate',
    price: 799,
    description: 'Perfect for small ceremonies and elopements',
    inclusions: [
      'Up to 3 hours of coverage',
      '100 professionally edited photos',
      'Online gallery for viewing and download',
      'Full print release included',
      'Professional retouching',
      'Personal consultation'
    ]
  },
  {
    name: 'Classic',
    price: 1599,
    description: 'Our most popular package for traditional weddings',
    inclusions: [
      'Up to 8 hours of coverage',
      '300+ professionally edited photos',
      'Premium online gallery with sharing',
      'Full print and usage rights',
      'Advanced retouching and color grading',
      'Second photographer included',
      'Complimentary engagement session',
      'USB drive with all images',
      '4-week turnaround time'
    ],
    featured: true
  },
  {
    name: 'Luxury',
    price: 2999,
    description: 'Complete premium coverage for your special day',
    inclusions: [
      'Full day coverage (up to 12 hours)',
      '500+ professionally edited photos',
      'Luxury online gallery with slideshow',
      'Full commercial usage rights',
      'Premium retouching and artistic editing',
      'Two photographers + assistant',
      'Engagement and rehearsal sessions',
      'Custom leather-bound album (30 pages)',
      'USB drive in custom box',
      'Priority editing (2-week turnaround)',
      'Complimentary prints package'
    ]
  }
];
