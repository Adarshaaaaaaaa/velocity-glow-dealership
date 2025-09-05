import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  NavigationMenu, 
  NavigationMenuContent, 
  NavigationMenuItem, 
  NavigationMenuList, 
  NavigationMenuTrigger 
} from '@/components/ui/navigation-menu';
import { Menu, X, Car, User, Phone } from 'lucide-react';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 border-b border-card-border bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 rounded-lg bg-gradient-neon group-hover:shadow-neon transition-all duration-300">
              <Car className="h-6 w-6 text-background" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-neon bg-clip-text text-transparent">
                Fast & Furious
              </h1>
              <p className="text-xs text-muted-foreground">Car Showroom</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList className="space-x-2">
              <NavigationMenuItem>
                <Link to="/">
                  <Button 
                    variant={isActive('/') ? 'default' : 'ghost'} 
                    className="neon-hover"
                  >
                    Home
                  </Button>
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger className="neon-hover">Inventory</NavigationMenuTrigger>
                <NavigationMenuContent className="bg-card border-card-border">
                  <div className="grid gap-3 p-4 w-48">
                    <Link to="/inventory" className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground">
                      <div className="text-sm font-medium leading-none">All Cars</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">Browse our complete inventory</p>
                    </Link>
                    <hr className="border-card-border" />
                    <div className="text-xs text-muted-foreground px-3">Categories</div>
                    <Link to="/inventory?category=suv" className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent">SUV</Link>
                    <Link to="/inventory?category=sedan" className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent">Sedan</Link>
                    <Link to="/inventory?category=sports" className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent">Sports</Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/ai-receptionist">
                  <Button 
                    variant={isActive('/ai-receptionist') ? 'default' : 'ghost'} 
                    className="neon-hover"
                  >
                    AI Assistant
                  </Button>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/test-drive">
                  <Button 
                    variant={isActive('/test-drive') ? 'default' : 'ghost'} 
                    className="neon-hover"
                  >
                    Test Drive
                  </Button>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/finance">
                  <Button 
                    variant={isActive('/finance') ? 'default' : 'ghost'} 
                    className="neon-hover"
                  >
                    Finance
                  </Button>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/contact">
                  <Button 
                    variant={isActive('/contact') ? 'default' : 'ghost'} 
                    className="neon-hover"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Contact
                  </Button>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* User Account & Mobile Menu */}
          <div className="flex items-center space-x-2">
            <Link to="/account" className="hidden sm:block">
              <Button variant="outline" size="sm" className="neon-hover">
                <User className="h-4 w-4 mr-2" />
                Account
              </Button>
            </Link>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-card-border animate-fade-in">
            <nav className="flex flex-col space-y-2">
              <Link to="/" onClick={() => setIsMenuOpen(false)}>
                <Button variant={isActive('/') ? 'default' : 'ghost'} className="w-full justify-start">Home</Button>
              </Link>
              <Link to="/inventory" onClick={() => setIsMenuOpen(false)}>
                <Button variant={isActive('/inventory') ? 'default' : 'ghost'} className="w-full justify-start">Inventory</Button>
              </Link>
              <Link to="/ai-receptionist" onClick={() => setIsMenuOpen(false)}>
                <Button variant={isActive('/ai-receptionist') ? 'default' : 'ghost'} className="w-full justify-start">AI Assistant</Button>
              </Link>
              <Link to="/test-drive" onClick={() => setIsMenuOpen(false)}>
                <Button variant={isActive('/test-drive') ? 'default' : 'ghost'} className="w-full justify-start">Test Drive</Button>
              </Link>
              <Link to="/finance" onClick={() => setIsMenuOpen(false)}>
                <Button variant={isActive('/finance') ? 'default' : 'ghost'} className="w-full justify-start">Finance</Button>
              </Link>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                <Button variant={isActive('/contact') ? 'default' : 'ghost'} className="w-full justify-start">Contact</Button>
              </Link>
              <Link to="/account" onClick={() => setIsMenuOpen(false)}>
                <Button variant={isActive('/account') ? 'default' : 'ghost'} className="w-full justify-start">Account</Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};