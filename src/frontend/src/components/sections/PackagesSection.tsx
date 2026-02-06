import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { packagesData } from '@/content/packages';
import { Clock, Image, Calendar, Plus, FileText } from 'lucide-react';

export function PackagesSection() {
  return (
    <section id="packages" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-serif font-semibold text-foreground mb-6">
            Package Details
          </h2>
          <p className="text-lg text-foreground/80">
            Detailed breakdown of what's included in each photography package.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {packagesData.map((pkg, index) => (
              <AccordionItem
                key={index}
                value={`package-${index}`}
                className="border border-border rounded-sm bg-card shadow-soft overflow-hidden"
              >
                <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between w-full pr-4">
                    <span className="text-xl font-serif font-semibold">{pkg.name}</span>
                    <span className="text-lg font-bold text-accent">${pkg.price}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="space-y-6 pt-4">
                    {/* Coverage */}
                    <div>
                      <div className="flex items-center mb-3">
                        <Clock className="w-5 h-5 text-accent mr-2" />
                        <h4 className="font-semibold">Coverage</h4>
                      </div>
                      <p className="text-sm text-muted-foreground ml-7">{pkg.coverage}</p>
                    </div>

                    {/* Deliverables */}
                    <div>
                      <div className="flex items-center mb-3">
                        <Image className="w-5 h-5 text-accent mr-2" />
                        <h4 className="font-semibold">Deliverables</h4>
                      </div>
                      <ul className="space-y-2 ml-7">
                        {pkg.deliverables.map((item, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-start">
                            <span className="mr-2">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Turnaround */}
                    <div>
                      <div className="flex items-center mb-3">
                        <Calendar className="w-5 h-5 text-accent mr-2" />
                        <h4 className="font-semibold">Turnaround Time</h4>
                      </div>
                      <p className="text-sm text-muted-foreground ml-7">{pkg.turnaround}</p>
                    </div>

                    {/* Add-ons */}
                    {pkg.addOns && pkg.addOns.length > 0 && (
                      <div>
                        <div className="flex items-center mb-3">
                          <Plus className="w-5 h-5 text-accent mr-2" />
                          <h4 className="font-semibold">Available Add-ons</h4>
                        </div>
                        <ul className="space-y-2 ml-7">
                          {pkg.addOns.map((addon, idx) => (
                            <li key={idx} className="text-sm text-muted-foreground flex items-start">
                              <span className="mr-2">•</span>
                              <span>{addon}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Terms */}
                    <div>
                      <div className="flex items-center mb-3">
                        <FileText className="w-5 h-5 text-accent mr-2" />
                        <h4 className="font-semibold">Booking Terms</h4>
                      </div>
                      <p className="text-sm text-muted-foreground ml-7">{pkg.terms}</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
