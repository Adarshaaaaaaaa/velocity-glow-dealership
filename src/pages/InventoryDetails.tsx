import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  Car, 
  Fuel, 
  Gauge, 
  Calendar, 
  MapPin,
  Phone,
  MessageCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import ferrariImage from '@/assets/ferrari-red.jpg';
import lamborghiniImage from '@/assets/lamborghini-black.jpg';
import mclarenImage from '@/assets/mclaren-silver.jpg';

const carDetails = {
  1: {
    id: 1,
    name: 'Ferrari 488 GTB',
    price: 280000,
    year: 2024,
    mileage: 0,
    make: 'Ferrari',
    model: '488 GTB',
    category: 'Sports Car',
    fuel: 'Gasoline',
    transmission: 'Automatic',
    engine: '3.9L V8 Twin Turbo',
    horsepower: '661 HP',
    torque: '561 lb-ft',
    topSpeed: '205 mph',
    acceleration: '3.0s (0-60 mph)',
    drivetrain: 'RWD',
    color: 'Rosso Corsa Red',
    interior: 'Black Leather',
    vin: 'ZFF79ALA5K0123456',
    images: [ferrariImage, ferrariImage, ferrariImage],
    features: [
      'Carbon Fiber Steering Wheel',
      'Premium Sound System',
      'Navigation System',
      'Parking Sensors',
      'Adaptive Suspension',
      'Launch Control',
      'Traction Control',
      'Electronic Stability Control'
    ]
  },
  2: {
    id: 2,
    name: 'Lamborghini Aventador',
    price: 450000,
    year: 2024,
    mileage: 0,
    make: 'Lamborghini',
    model: 'Aventador LP 740-4 S',
    category: 'Sports Car',
    fuel: 'Gasoline',
    transmission: 'Automatic',
    engine: '6.5L V12',
    horsepower: '740 HP',
    torque: '509 lb-ft',
    topSpeed: '217 mph',
    acceleration: '2.9s (0-60 mph)',
    drivetrain: 'AWD',
    color: 'Nero Aldebaran Black',
    interior: 'Nero Alde Leather',
    vin: 'ZHWUC1ZD5KLA12345',
    images: [lamborghiniImage, lamborghiniImage, lamborghiniImage],
    features: [
      'Active Aerodynamics',
      'Carbon Ceramic Brakes',
      'Adaptive Dampers',
      'Launch Control',
      'Multiple Drive Modes',
      'Premium Audio System',
      'Navigation System',
      'Parking Camera'
    ]
  },
  3: {
    id: 3,
    name: 'McLaren 720S',
    price: 320000,
    year: 2023,
    mileage: 1200,
    make: 'McLaren',
    model: '720S',
    category: 'Sports Car',
    fuel: 'Gasoline',
    transmission: 'Automatic',
    engine: '4.0L V8 Twin Turbo',
    horsepower: '710 HP',
    torque: '568 lb-ft',
    topSpeed: '212 mph',
    acceleration: '2.8s (0-60 mph)',
    drivetrain: 'RWD',
    color: 'Supernova Silver',
    interior: 'Carbon Black Leather',
    vin: 'SBM14DCA5KW123456',
    images: [mclarenImage, mclarenImage, mclarenImage],
    features: [
      'Active Suspension',
      'Carbon Fiber Body',
      'Butterfly Doors',
      'Track Mode',
      'Premium Meridian Audio',
      'Climate Control',
      'Reversing Camera',
      'Tire Pressure Monitoring'
    ]
  }
};

const InventoryDetails = () => {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const car = carDetails[parseInt(id || '0') as keyof typeof carDetails];

  if (!car) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Vehicle Not Found</h1>
          <Link to="/inventory">
            <Button>Back to Inventory</Button>
          </Link>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % car.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + car.images.length) % car.images.length);
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <div className="mb-6">
          <Link to="/inventory">
            <Button variant="outline" className="neon-hover">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Inventory
            </Button>
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <Card className="border-card-border overflow-hidden">
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={car.images[currentImageIndex]}
                    alt={car.name}
                    className="w-full h-96 lg:h-[500px] object-cover"
                  />
                  
                  {car.images.length > 1 && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 rounded-full h-10 w-10 p-0 bg-background/80 backdrop-blur"
                        onClick={prevImage}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 rounded-full h-10 w-10 p-0 bg-background/80 backdrop-blur"
                        onClick={nextImage}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </>
                  )}

                  <div className="absolute top-4 left-4">
                    <Badge className="bg-gradient-neon text-background">Premium</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Thumbnail Images */}
            {car.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {car.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                      index === currentImageIndex ? 'border-primary' : 'border-card-border'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${car.name} ${index + 1}`}
                      className="w-20 h-16 object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Vehicle Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold mb-2">{car.name}</h1>
              <p className="text-4xl lg:text-5xl font-bold bg-gradient-neon bg-clip-text text-transparent mb-4">
                {formatPrice(car.price)}
              </p>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="neon-hover">
                  <Heart className="mr-2 h-4 w-4" />
                  Save
                </Button>
                <Button variant="outline" size="sm" className="neon-hover">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>

            {/* Quick Specs */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="border-card-border bg-card/50">
                <CardContent className="p-4 text-center">
                  <Calendar className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <p className="text-sm text-muted-foreground">Year</p>
                  <p className="font-bold text-lg">{car.year}</p>
                </CardContent>
              </Card>
              <Card className="border-card-border bg-card/50">
                <CardContent className="p-4 text-center">
                  <Gauge className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <p className="text-sm text-muted-foreground">Mileage</p>
                  <p className="font-bold text-lg">{car.mileage.toLocaleString()} mi</p>
                </CardContent>
              </Card>
              <Card className="border-card-border bg-card/50">
                <CardContent className="p-4 text-center">
                  <Fuel className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <p className="text-sm text-muted-foreground">Engine</p>
                  <p className="font-bold text-lg">{car.engine}</p>
                </CardContent>
              </Card>
              <Card className="border-card-border bg-card/50">
                <CardContent className="p-4 text-center">
                  <Car className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <p className="text-sm text-muted-foreground">Power</p>
                  <p className="font-bold text-lg">{car.horsepower}</p>
                </CardContent>
              </Card>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/test-drive" className="flex-1">
                <Button size="lg" className="w-full neon-hover">
                  <Car className="mr-2 h-5 w-5" />
                  Schedule Test Drive
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="neon-hover">
                  <Phone className="mr-2 h-5 w-5" />
                  Call Now
                </Button>
              </Link>
            </div>

            <Link to="/ai-receptionist">
              <Button variant="outline" className="w-full neon-hover">
                <MessageCircle className="mr-2 h-4 w-4" />
                Chat with AI Assistant
              </Button>
            </Link>
          </div>
        </div>

        {/* Detailed Information Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="specifications" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="finance">Finance Options</TabsTrigger>
            </TabsList>
            
            <TabsContent value="specifications" className="mt-6">
              <Card className="border-card-border bg-card/50">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Vehicle Specifications</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Make:</span>
                        <span className="font-semibold">{car.make}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Model:</span>
                        <span className="font-semibold">{car.model}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Year:</span>
                        <span className="font-semibold">{car.year}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Category:</span>
                        <span className="font-semibold">{car.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Engine:</span>
                        <span className="font-semibold">{car.engine}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Horsepower:</span>
                        <span className="font-semibold">{car.horsepower}</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Torque:</span>
                        <span className="font-semibold">{car.torque}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Top Speed:</span>
                        <span className="font-semibold">{car.topSpeed}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">0-60 mph:</span>
                        <span className="font-semibold">{car.acceleration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Drivetrain:</span>
                        <span className="font-semibold">{car.drivetrain}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Transmission:</span>
                        <span className="font-semibold">{car.transmission}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">VIN:</span>
                        <span className="font-semibold text-sm">{car.vin}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="features" className="mt-6">
              <Card className="border-card-border bg-card/50">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Features & Equipment</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {car.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="finance" className="mt-6">
              <Card className="border-card-border bg-card/50">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Financing Options</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">Estimated Monthly Payment</h4>
                      <p className="text-2xl font-bold text-primary mb-2">$4,850/mo</p>
                      <p className="text-sm text-muted-foreground">Based on 60 months at 4.9% APR</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Vehicle Price:</span>
                        <span className="font-semibold">{formatPrice(car.price)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Down Payment (20%):</span>
                        <span className="font-semibold">{formatPrice(car.price * 0.2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Loan Amount:</span>
                        <span className="font-semibold">{formatPrice(car.price * 0.8)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <Link to="/finance">
                      <Button className="neon-hover">
                        Calculate Custom Payment
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default InventoryDetails;