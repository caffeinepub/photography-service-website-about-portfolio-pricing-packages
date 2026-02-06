import { Camera, Mail, Phone } from 'lucide-react';
import { SiInstagram } from 'react-icons/si';

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Camera size={20} className="text-foreground" />
              <span className="text-lg font-serif font-medium">The Stories Behind VOWS</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Capturing life's most precious moments with artistry and passion.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-medium mb-4 text-sm">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
                <a
                  href="mailto:thestoriesbehindvows@gmail.com"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  thestoriesbehindvows@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
                <a
                  href="tel:7780748708"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  7780748708
                </a>
              </div>
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-medium mb-4 text-sm">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/thestoriesbehindvows?igsh=bWdrN3o1M21meDBn"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Instagram"
              >
                <SiInstagram size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>
            © 2026. Built with love using{' '}
            <a
              href="https://caffeine.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              caffeine.ai
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
