import { Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { pricingTiers } from '@/content/pricing';

export function PricingSection() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
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
    <section id="pricing" className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-serif font-medium text-foreground mb-6 tracking-tight">
            Pricing
          </h2>
          <p className="text-base text-muted-foreground">
            Choose the package that best fits your needs. All packages include professional editing and digital delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <Card
              key={index}
              className={`relative border ${
                tier.featured
                  ? 'border-foreground'
                  : 'border-border'
              }`}
            >
              {tier.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-foreground text-background px-3 py-1 text-xs font-medium">
                  Most Popular
                </div>
              )}
              <CardHeader className="text-center pb-6 pt-8">
                <CardTitle className="text-xl font-serif font-medium mb-3">{tier.name}</CardTitle>
                <div className="mb-3">
                  <span className="text-3xl font-medium">${tier.price}</span>
                  {tier.priceNote && (
                    <span className="text-sm text-muted-foreground ml-2">{tier.priceNote}</span>
                  )}
                </div>
                <CardDescription className="text-sm">{tier.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {tier.inclusions.map((inclusion, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="w-4 h-4 text-foreground mr-3 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                      <span className="text-sm text-muted-foreground">{inclusion}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={scrollToContact}
                  variant="ghost"
                  className={`w-full ${tier.featured ? 'border border-foreground hover:bg-foreground hover:text-background' : 'border border-border'}`}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
