export interface PackageDetails {
  name: string;
  price: number;
  coverage: string;
  deliverables: string[];
  turnaround: string;
  addOns?: string[];
  terms: string;
}

export const packagesData: PackageDetails[] = [
  {
    name: 'Essential Package',
    price: 599,
    coverage: 'Up to 2 hours of on-location photography coverage',
    deliverables: [
      '50 professionally edited high-resolution images',
      'Online gallery with download access for 90 days',
      'Print release for personal use',
      'Basic color correction and exposure adjustments'
    ],
    turnaround: '2-3 weeks from event date',
    addOns: [
      'Additional hour of coverage: $150',
      'Extra 25 edited photos: $100',
      'Rush editing (1 week): $150',
      'Premium prints package: $200'
    ],
    terms: '50% deposit required to secure booking. Balance due 7 days before event. Cancellations within 14 days are non-refundable.'
  },
  {
    name: 'Professional Package',
    price: 1299,
    coverage: 'Up to 6 hours of photography coverage with optional second photographer',
    deliverables: [
      '200+ professionally edited high-resolution images',
      'Online gallery with sharing and download options for 1 year',
      'Full print release and commercial usage rights',
      'Advanced retouching including skin smoothing and blemish removal',
      'Complimentary engagement or pre-event session (1 hour)',
      'USB drive with all images'
    ],
    turnaround: '3-4 weeks from event date',
    addOns: [
      'Additional hour of coverage: $200',
      'Second photographer (full day): $400',
      'Custom photo album (30 pages): $500',
      'Canvas print (24x36): $300',
      'Same-day preview (10 images): $100'
    ],
    terms: '50% deposit required to secure booking. Balance due 7 days before event. Includes one round of revision requests. Cancellations within 30 days forfeit deposit.'
  },
  {
    name: 'Premium Package',
    price: 2499,
    coverage: 'Full day coverage (up to 10 hours) with two professional photographers',
    deliverables: [
      '400+ professionally edited high-resolution images',
      'Premium online gallery with unlimited sharing for lifetime access',
      'Full print release and commercial usage rights',
      'Advanced retouching, color grading, and artistic enhancements',
      'Complimentary engagement session (2 hours)',
      'Custom-designed photo album (20 pages, premium materials)',
      'USB drive and cloud backup of all images',
      'Priority customer support'
    ],
    turnaround: '2 weeks from event date (priority editing)',
    addOns: [
      'Additional hour of coverage: $250',
      'Third photographer: $500',
      'Additional album copies: $400 each',
      'Parent albums (10 pages): $250 each',
      'Drone photography (if permitted): $400',
      'Photo booth rental (3 hours): $600'
    ],
    terms: '50% deposit required to secure booking. Balance due 14 days before event. Includes two rounds of revision requests. Travel fees may apply for locations over 50 miles. Cancellations within 60 days forfeit deposit.'
  }
];
