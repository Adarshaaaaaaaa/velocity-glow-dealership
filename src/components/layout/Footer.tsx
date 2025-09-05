import { Link } from 'react-router-dom';
import { Car, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Footer = () => {
  return (
    <footer className="bg-background-secondary border-t border-card-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-lg bg-gradient-neon">
                <Car className="h-6 w-6 text-background" />
              </div>
              <div>
                <h3 className="text-lg font-bold bg-gradient-neon bg-clip-text text-transparent">
                  Fast & Furious
                </h3>
                <p className="text-sm text-muted-foreground">Car Showroom</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Premium luxury car dealership offering the finest selection of high-performance vehicles with exceptional service.
            </p>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline" className="neon-hover">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline" className="neon-hover">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline" className="neon-hover">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline" className="neon-hover">
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Us</Link>
              <Link to="/inventory" className="text-sm text-muted-foreground hover:text-primary transition-colors">Our Inventory</Link>
              <Link to="/testimonials" className="text-sm text-muted-foreground hover:text-primary transition-colors">Testimonials</Link>
              <Link to="/services" className="text-sm text-muted-foreground hover:text-primary transition-colors">Services</Link>
              <Link to="/test-drive" className="text-sm text-muted-foreground hover:text-primary transition-colors">Book Test Drive</Link>
            </nav>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Services</h4>
            <nav className="flex flex-col space-y-2">
              <Link to="/services?service=repair" className="text-sm text-muted-foreground hover:text-primary transition-colors">Auto Repair</Link>
              <Link to="/services?service=trade-in" className="text-sm text-muted-foreground hover:text-primary transition-colors">Trade-in</Link>
              <Link to="/services?service=warranty" className="text-sm text-muted-foreground hover:text-primary transition-colors">Warranty</Link>
              <Link to="/services?service=maintenance" className="text-sm text-muted-foreground hover:text-primary transition-colors">Maintenance</Link>
              <Link to="/finance" className="text-sm text-muted-foreground hover:text-primary transition-colors">Financing</Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">info@fastfuriousshowroom.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-primary mt-0.5" />
                <span className="text-sm text-muted-foreground">
                  123 Luxury Drive<br />
                  Miami, FL 33101
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-card-border">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-sm text-muted-foreground">
              © 2024 Fast & Furious Car Showroom. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms & Conditions</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};