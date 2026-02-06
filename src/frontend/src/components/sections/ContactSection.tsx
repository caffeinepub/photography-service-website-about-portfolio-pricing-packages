import { useState } from 'react';
import { useInquiryForm } from '@/hooks/useInquiryForm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2, Loader2 } from 'lucide-react';

export function ContactSection() {
  const { formData, errors, isSubmitting, isSuccess, handleChange, handleSubmit, resetForm } = useInquiryForm();
  const [eventType, setEventType] = useState('');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit({ ...formData, eventType });
  };

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-serif font-medium text-foreground mb-6 tracking-tight">
              Get in Touch
            </h2>
            <p className="text-base text-muted-foreground">
              Ready to book your session? Fill out the form below and we'll get back to you within 24 hours.
            </p>
          </div>

          {isSuccess ? (
            <div className="border border-border p-12 text-center">
              <CheckCircle2 className="w-12 h-12 text-foreground mx-auto mb-4" strokeWidth={1.5} />
              <h3 className="text-xl font-serif font-medium mb-2">Thank You!</h3>
              <p className="text-muted-foreground mb-6 text-sm">
                We've received your inquiry and will be in touch soon.
              </p>
              <Button onClick={resetForm} variant="ghost" className="border border-border">
                Send Another Inquiry
              </Button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="border border-border p-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm">Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className={errors.name ? 'border-destructive' : ''}
                  />
                  {errors.name && (
                    <p className="text-xs text-destructive">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className={errors.email ? 'border-destructive' : ''}
                  />
                  {errors.email && (
                    <p className="text-xs text-destructive">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="eventType" className="text-sm">Event Type *</Label>
                  <Select value={eventType} onValueChange={setEventType}>
                    <SelectTrigger className={errors.eventType ? 'border-destructive' : ''}>
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wedding">Wedding</SelectItem>
                      <SelectItem value="portrait">Portrait Session</SelectItem>
                      <SelectItem value="event">Corporate Event</SelectItem>
                      <SelectItem value="product">Product Photography</SelectItem>
                      <SelectItem value="family">Family Portrait</SelectItem>
                      <SelectItem value="engagement">Engagement Shoot</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.eventType && (
                    <p className="text-xs text-destructive">{errors.eventType}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date" className="text-sm">Preferred Date *</Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                    className={errors.date ? 'border-destructive' : ''}
                  />
                  {errors.date && (
                    <p className="text-xs text-destructive">{errors.date}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm">Message *</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your event and any specific requirements..."
                  rows={5}
                  className={errors.message ? 'border-destructive' : ''}
                />
                {errors.message && (
                  <p className="text-xs text-destructive">{errors.message}</p>
                )}
              </div>

              {errors.submit && (
                <Alert variant="destructive">
                  <AlertDescription>{errors.submit}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                size="default"
                variant="ghost"
                className="w-full border border-foreground hover:bg-foreground hover:text-background"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Send Inquiry'
                )}
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
