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
    name: 'Essential',
    price: 599,
    description: 'Perfect for small events and portrait sessions',
    inclusions: [
      'Up to 2 hours of coverage',
      '50 professionally edited photos',
      'Online gallery for viewing and download',
      'Print release included',
      'Basic retouching'
    ]
  },
  {
    name: 'Professional',
    price: 1299,
    description: 'Our most popular package for weddings and events',
    inclusions: [
      'Up to 6 hours of coverage',
      '200+ professionally edited photos',
      'Online gallery with sharing options',
      'Print release and usage rights',
      'Advanced retouching',
      'Second photographer available',
      'Engagement session included'
    ],
    featured: true
  },
  {
    name: 'Premium',
    price: 2499,
    description: 'Complete coverage for your special day',
    inclusions: [
      'Full day coverage (up to 10 hours)',
      '400+ professionally edited photos',
      'Premium online gallery',
      'Full print and usage rights',
      'Advanced retouching and color grading',
      'Two photographers included',
      'Engagement session included',
      'Custom photo album (20 pages)',
      'Priority editing (2-week turnaround)'
    ]
  }
];
