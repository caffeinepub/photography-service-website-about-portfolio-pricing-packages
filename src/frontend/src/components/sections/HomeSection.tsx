import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function HomeSection() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Hero Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/generated/hero-photography.dim_1920x900.png"
          alt="Photography hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-medium text-foreground leading-[1.1] tracking-tight">
            Capturing Moments,<br />Creating Memories
          </h1>
          <p className="text-base sm:text-lg text-foreground/60 max-w-xl mx-auto leading-relaxed">
            Professional photography services for weddings, portraits, events, and more. 
            We transform fleeting moments into timeless art.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Button
              size="default"
              variant="ghost"
              onClick={() => scrollToSection('about')}
              className="group border border-foreground/20 hover:border-foreground/40"
            >
              Learn More
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="default"
              variant="ghost"
              onClick={() => scrollToSection('contact')}
              className="border border-foreground/20 hover:border-foreground/40"
            >
              Book a Session
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-5 h-8 border border-foreground/20 flex items-start justify-center p-1.5">
          <div className="w-0.5 h-2 bg-foreground/20" />
        </div>
      </div>
    </section>
  );
}
