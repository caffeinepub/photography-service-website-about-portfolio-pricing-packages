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
    <section id="portfolio" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-serif font-semibold text-foreground mb-6">
            Our Work
          </h2>
          <p className="text-lg text-foreground/80">
            Explore our portfolio of stunning photography across various styles and occasions.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-sm text-sm font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground shadow-soft'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((item, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(item)}
              className="group relative aspect-[3/2] overflow-hidden rounded-sm bg-muted hover:shadow-medium transition-all"
            >
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-background font-semibold text-lg">{item.title}</h3>
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
