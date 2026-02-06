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
    <section id="about" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-serif font-semibold text-foreground mb-6">
            About Lumière Studio
          </h2>
          <p className="text-lg text-foreground/80 leading-relaxed">
            Founded in 2014, Lumière Studio has been dedicated to capturing life's most precious moments 
            with artistry and authenticity. We believe that every photograph tells a story, and our mission 
            is to preserve your memories in their most beautiful form. Our team of experienced photographers 
            combines technical expertise with creative vision to deliver images that you'll treasure forever.
          </p>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {highlights.map((highlight, index) => (
            <Card key={index} className="border-none shadow-soft hover:shadow-medium transition-shadow">
              <CardContent className="pt-6 text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent/10 mb-4">
                  <highlight.icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{highlight.title}</h3>
                <p className="text-sm text-muted-foreground">{highlight.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Specialties */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-serif font-semibold text-center mb-8">Our Specialties</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {specialties.map((specialty, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-sm px-4 py-3 text-center hover:border-accent transition-colors"
              >
                <span className="text-sm font-medium">{specialty}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
