export type PortfolioCategory = 'Weddings' | 'Portraits' | 'Events' | 'Product';

export interface PortfolioItem {
  src: string;
  title: string;
  category: PortfolioCategory;
}

export const portfolioData: PortfolioItem[] = [
  {
    src: '/assets/generated/portfolio-01.dim_1200x800.png',
    title: 'Elegant Wedding Ceremony',
    category: 'Weddings'
  },
  {
    src: '/assets/generated/portfolio-02.dim_1200x800.png',
    title: 'Professional Headshot',
    category: 'Portraits'
  },
  {
    src: '/assets/generated/portfolio-03.dim_1200x800.png',
    title: 'Corporate Gala Event',
    category: 'Events'
  },
  {
    src: '/assets/generated/portfolio-04.dim_1200x800.png',
    title: 'Luxury Product Showcase',
    category: 'Product'
  },
  {
    src: '/assets/generated/portfolio-05.dim_1200x800.png',
    title: 'Romantic Wedding Portrait',
    category: 'Weddings'
  },
  {
    src: '/assets/generated/portfolio-06.dim_1200x800.png',
    title: 'Family Portrait Session',
    category: 'Portraits'
  },
  {
    src: '/assets/generated/portfolio-07.dim_1200x800.png',
    title: 'Conference Photography',
    category: 'Events'
  },
  {
    src: '/assets/generated/portfolio-08.dim_1200x800.png',
    title: 'Fashion Product Line',
    category: 'Product'
  },
  {
    src: '/assets/generated/portfolio-09.dim_1200x800.png',
    title: 'Wedding Reception Details',
    category: 'Weddings'
  },
  {
    src: '/assets/generated/portfolio-10.dim_1200x800.png',
    title: 'Creative Portrait Art',
    category: 'Portraits'
  },
  {
    src: '/assets/generated/portfolio-11.dim_1200x800.png',
    title: 'Networking Event',
    category: 'Events'
  },
  {
    src: '/assets/generated/portfolio-12.dim_1200x800.png',
    title: 'Artisan Product Collection',
    category: 'Product'
  }
];
