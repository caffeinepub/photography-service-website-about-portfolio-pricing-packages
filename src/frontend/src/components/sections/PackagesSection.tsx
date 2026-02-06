import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { packagesData } from '@/content/packages';
import { Clock, Image, Calendar, Plus, FileText } from 'lucide-react';

export function PackagesSection() {
  return (
    <section id="packages" className="py-24 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-serif font-medium text-foreground mb-6 tracking-tight">
            Package Details
          </h2>
          <p className="text-base text-muted-foreground">
            Detailed breakdown of what's included in each photography package.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3">
            {packagesData.map((pkg, index) => (
              <AccordionItem
                key={index}
                value={`package-${index}`}
                className="border border-border bg-card overflow-hidden"
              >
                <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/30 transition-colors">
                  <div className="flex items-center justify-between w-full pr-4">
                    <span className="text-lg font-serif font-medium">{pkg.name}</span>
                    <span className="text-base font-medium">${pkg.price}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="space-y-6 pt-4">
                    {/* Coverage */}
                    <div>
                      <div className="flex items-center mb-2">
                        <Clock className="w-4 h-4 text-foreground mr-2" strokeWidth={1.5} />
                        <h4 className="font-medium text-sm">Coverage</h4>
                      </div>
                      <p className="text-sm text-muted-foreground ml-6">{pkg.coverage}</p>
                    </div>

                    {/* Deliverables */}
                    <div>
                      <div className="flex items-center mb-2">
                        <Image className="w-4 h-4 text-foreground mr-2" strokeWidth={1.5} />
                        <h4 className="font-medium text-sm">Deliverables</h4>
                      </div>
                      <ul className="space-y-1.5 ml-6">
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
                      <div className="flex items-center mb-2">
                        <Calendar className="w-4 h-4 text-foreground mr-2" strokeWidth={1.5} />
                        <h4 className="font-medium text-sm">Turnaround Time</h4>
                      </div>
                      <p className="text-sm text-muted-foreground ml-6">{pkg.turnaround}</p>
                    </div>

                    {/* Add-ons */}
                    {pkg.addOns && pkg.addOns.length > 0 && (
                      <div>
                        <div className="flex items-center mb-2">
                          <Plus className="w-4 h-4 text-foreground mr-2" strokeWidth={1.5} />
                          <h4 className="font-medium text-sm">Available Add-ons</h4>
                        </div>
                        <ul className="space-y-1.5 ml-6">
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
                      <div className="flex items-center mb-2">
                        <FileText className="w-4 h-4 text-foreground mr-2" strokeWidth={1.5} />
                        <h4 className="font-medium text-sm">Booking Terms</h4>
                      </div>
                      <p className="text-sm text-muted-foreground ml-6">{pkg.terms}</p>
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
