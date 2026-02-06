import { useState } from 'react';
import { portfolioData, type PortfolioCategory } from '@/content/portfolio';
import { LightboxModal } from '@/components/LightboxModal';

export function PortfolioSection() {
  const [selectedCategory, setSelectedCategory] = useState<PortfolioCategory | 'All'>('All');
  const [selectedImage, setSelectedImage] = useState<{ src: string; title: string; category: string } | null>(null);

  const categories: Array<PortfolioCategory | 'All'> = ['All', 'Weddings', 'Portraits', 'Events', 'Product'];

  const filteredImages = selectedCategory === 'All'
    ? portfolioData
    : portfolioData.filter(item => item.category === selectedCategory);

  return (
    <section id="portfolio" className="py-24 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-serif font-medium text-foreground mb-6 tracking-tight">
            Our Work
          </h2>
          <p className="text-base text-muted-foreground">
            Explore our portfolio of stunning photography across various styles and occasions.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 text-sm transition-all ${
                selectedCategory === category
                  ? 'text-foreground border-b-2 border-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredImages.map((item, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(item)}
              className="group relative aspect-[3/2] overflow-hidden bg-muted"
            >
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-90"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors">
                <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <h3 className="text-background font-medium text-base">{item.title}</h3>
                  <p className="text-background/90 text-sm">{item.category}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <LightboxModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </section>
  );
}
