import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Heart, Eye, Car } from 'lucide-react';
import ferrariImage from '@/assets/ferrari-red.jpg';
import lamborghiniImage from '@/assets/lamborghini-black.jpg';
import mclarenImage from '@/assets/mclaren-silver.jpg';

const carsData = [
  {
    id: 1,
    name: 'Ferrari 488 GTB',
    price: 280000,
    year: 2024,
    mileage: 0,
    make: 'Ferrari',
    category: 'sports',
    fuel: 'Gasoline',
    transmission: 'Automatic',
    image: ferrariImage,
    featured: true
  },
  {
    id: 2,
    name: 'Lamborghini Aventador',
    price: 450000,
    year: 2024,
    mileage: 0,
    make: 'Lamborghini',
    category: 'sports',
    fuel: 'Gasoline',
    transmission: 'Automatic',
    image: lamborghiniImage,
    featured: true
  },
  {
    id: 3,
    name: 'McLaren 720S',
    price: 320000,
    year: 2023,
    mileage: 1200,
    make: 'McLaren',
    category: 'sports',
    fuel: 'Gasoline',
    transmission: 'Automatic',
    image: mclarenImage,
    featured: false
  }
];

const Inventory = () => {
  const [cars, setCars] = useState(carsData);
  const [filteredCars, setFilteredCars] = useState(carsData);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    make: 'all',
    category: 'all',
    year: 'all',
    priceRange: 'all'
  });

  useEffect(() => {
    let filtered = cars;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(car =>
        car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.make.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Make filter
    if (filters.make !== 'all') {
      filtered = filtered.filter(car => car.make.toLowerCase() === filters.make);
    }

    // Category filter
    if (filters.category !== 'all') {
      filtered = filtered.filter(car => car.category === filters.category);
    }

    // Year filter
    if (filters.year !== 'all') {
      filtered = filtered.filter(car => car.year.toString() === filters.year);
    }

    // Price range filter
    if (filters.priceRange !== 'all') {
      const [min, max] = filters.priceRange.split('-').map(Number);
      filtered = filtered.filter(car => {
        if (max) {
          return car.price >= min && car.price <= max;
        } else {
          return car.price >= min;
        }
      });
    }

    setFilteredCars(filtered);
  }, [searchQuery, filters, cars]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="bg-gradient-neon bg-clip-text text-transparent">Premium</span> Inventory
          </h1>
          <p className="text-xl text-muted-foreground">Discover luxury vehicles that define excellence</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder="Search cars by make or model..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 bg-card border-card-border"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Select value={filters.make} onValueChange={(value) => setFilters(prev => ({ ...prev, make: value }))}>
              <SelectTrigger className="w-40 bg-card border-card-border">
                <SelectValue placeholder="Make" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Makes</SelectItem>
                <SelectItem value="ferrari">Ferrari</SelectItem>
                <SelectItem value="lamborghini">Lamborghini</SelectItem>
                <SelectItem value="mclaren">McLaren</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.category} onValueChange={(value) => setFilters(prev => ({ ...prev, category: value }))}>
              <SelectTrigger className="w-40 bg-card border-card-border">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="sports">Sports</SelectItem>
                <SelectItem value="sedan">Sedan</SelectItem>
                <SelectItem value="suv">SUV</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.year} onValueChange={(value) => setFilters(prev => ({ ...prev, year: value }))}>
              <SelectTrigger className="w-40 bg-card border-card-border">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.priceRange} onValueChange={(value) => setFilters(prev => ({ ...prev, priceRange: value }))}>
              <SelectTrigger className="w-48 bg-card border-card-border">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="0-300000">Under $300K</SelectItem>
                <SelectItem value="300000-500000">$300K - $500K</SelectItem>
                <SelectItem value="500000">$500K+</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-center">
          <p className="text-muted-foreground">
            Showing <span className="text-foreground font-semibold">{filteredCars.length}</span> vehicle{filteredCars.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Cars Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCars.map((car) => (
            <Card 
              key={car.id} 
              className="border-card-border bg-card/50 backdrop-blur-sm hover:shadow-neon transition-all duration-300 group overflow-hidden"
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4">
                    {car.featured && (
                      <Badge className="bg-gradient-neon text-background">Featured</Badge>
                    )}
                  </div>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button size="sm" variant="outline" className="rounded-full h-10 w-10 p-0 bg-background/80 backdrop-blur border-white/20">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{car.name}</h3>
                    <p className="text-2xl font-bold bg-gradient-neon bg-clip-text text-transparent">
                      {formatPrice(car.price)}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Year</p>
                      <p className="font-semibold">{car.year}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Mileage</p>
                      <p className="font-semibold">{car.mileage.toLocaleString()} mi</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Fuel</p>
                      <p className="font-semibold">{car.fuel}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Transmission</p>
                      <p className="font-semibold">{car.transmission}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link to={`/inventory/${car.id}`} className="flex-1">
                      <Button className="w-full neon-hover">
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </Button>
                    </Link>
                    <Link to="/test-drive">
                      <Button variant="outline" className="neon-hover">
                        <Car className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCars.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
              <Car className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold mb-2">No vehicles found</h3>
            <p className="text-muted-foreground mb-6">Try adjusting your search or filter criteria</p>
            <Button onClick={() => {
              setSearchQuery('');
              setFilters({ make: 'all', category: 'all', year: 'all', priceRange: 'all' });
            }}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inventory;