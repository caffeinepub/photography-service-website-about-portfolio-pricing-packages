import { Award, Heart, Users, Camera } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function AboutSection() {
  const highlights = [
    {
      icon: Award,
      title: '10+ Years Experience',
      description: 'Over a decade of capturing beautiful moments and telling visual stories.'
    },
    {
      icon: Heart,
      title: 'Passion-Driven',
      description: 'Every shoot is approached with creativity, care, and attention to detail.'
    },
    {
      icon: Users,
      title: '500+ Happy Clients',
      description: 'Trusted by hundreds of clients to document their most important moments.'
    },
    {
      icon: Camera,
      title: 'Professional Equipment',
      description: 'State-of-the-art cameras and lighting to ensure stunning results.'
    }
  ];

  const specialties = [
    'Wedding Photography',
    'Portrait Sessions',
    'Corporate Events',
    'Product Photography',
    'Family Portraits',
    'Engagement Shoots'
  ];

  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-serif font-medium text-foreground mb-6 tracking-tight">
            About The Stories Behind VOWS
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            Founded in 2021, The Stories Behind VOWS has been dedicated to capturing life's most precious moments 
            with artistry and authenticity. We believe that every photograph tells a story, and our mission 
            is to preserve your memories in their most beautiful form. Our team of experienced photographers 
            combines technical expertise with creative vision to deliver images that you'll treasure forever.
          </p>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {highlights.map((highlight, index) => (
            <Card key={index} className="border border-border">
              <CardContent className="pt-8 pb-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 mb-4">
                  <highlight.icon className="w-6 h-6 text-foreground" strokeWidth={1.5} />
                </div>
                <h3 className="font-medium text-base mb-2">{highlight.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{highlight.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Specialties */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-xl font-serif font-medium text-center mb-8">Our Specialties</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {specialties.map((specialty, index) => (
              <div
                key={index}
                className="border border-border px-4 py-3 text-center hover:border-foreground/40 transition-colors"
              >
                <span className="text-sm">{specialty}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
