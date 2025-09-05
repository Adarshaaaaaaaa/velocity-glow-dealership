import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  Shield, 
  CreditCard, 
  Users,
  Car,
  MessageCircle,
  Phone,
  Award
} from 'lucide-react';
import heroImage from '@/assets/hero-showroom.jpg';
import ferrariImage from '@/assets/ferrari-red.jpg';
import lamborghiniImage from '@/assets/lamborghini-black.jpg';
import mclarenImage from '@/assets/mclaren-silver.jpg';

const featuredCars = [
  {
    id: 1,
    name: 'Ferrari 488 GTB',
    price: '$280,000',
    year: '2024',
    mileage: '0 miles',
    image: ferrariImage,
    badge: 'New Arrival'
  },
  {
    id: 2,
    name: 'Lamborghini Aventador',
    price: '$450,000',
    year: '2024',
    mileage: '0 miles',
    image: lamborghiniImage,
    badge: 'Exclusive'
  },
  {
    id: 3,
    name: 'McLaren 720S',
    price: '$320,000',
    year: '2023',
    mileage: '1,200 miles',
    image: mclarenImage,
    badge: 'Special Offer'
  }
];

const Homepage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredCars.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredCars.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredCars.length) % featuredCars.length);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/50" />
        </div>
        
        <div className="relative z-10 text-center space-y-6 px-4 max-w-4xl mx-auto">
          <Badge className="bg-gradient-neon text-background text-sm px-4 py-2 animate-fade-in">
            ⚡ Premium Luxury Car Dealership
          </Badge>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight animate-fade-in">
            <span className="bg-gradient-neon bg-clip-text text-transparent">
              Fast & Furious
            </span>
            <br />
            <span className="text-foreground">Car Showroom</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto animate-slide-in">
            Experience the pinnacle of automotive excellence with our curated collection of luxury supercars
          </p>

          {/* Search Bar */}
          <div className="relative max-w-md mx-auto animate-scale-in">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder="Search by make, model, or price..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 text-lg border-2 border-card-border focus:border-primary bg-card/80 backdrop-blur"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Link to="/inventory">
              <Button size="lg" className="h-14 px-8 text-lg neon-hover">
                <Car className="mr-2 h-5 w-5" />
                View Inventory
              </Button>
            </Link>
            <Link to="/test-drive">
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg neon-hover">
                Book Test Drive
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Cars Slider */}
      <section className="py-20 bg-background-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-neon bg-clip-text text-transparent">Featured</span> Collection
            </h2>
            <p className="text-xl text-muted-foreground">Handpicked premium vehicles for the discerning enthusiast</p>
          </div>

          <div className="relative max-w-6xl mx-auto">
            <div className="overflow-hidden rounded-2xl">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {featuredCars.map((car, index) => (
                  <div key={car.id} className="w-full flex-shrink-0">
                    <Card className="border-0 bg-card/50 backdrop-blur-sm shadow-luxury hover:shadow-neon transition-all duration-500 group">
                      <CardContent className="p-0">
                        <div className="grid md:grid-cols-2 gap-0">
                          <div className="relative overflow-hidden">
                            <img
                              src={car.image}
                              alt={car.name}
                              className="w-full h-80 md:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <Badge className="absolute top-4 left-4 bg-gradient-neon text-background">
                              {car.badge}
                            </Badge>
                          </div>
                          <div className="p-8 flex flex-col justify-center space-y-6">
                            <div>
                              <h3 className="text-2xl md:text-3xl font-bold mb-2">{car.name}</h3>
                              <p className="text-3xl md:text-4xl font-bold bg-gradient-neon bg-clip-text text-transparent">
                                {car.price}
                              </p>
                            </div>
                            <div className="space-y-2">
                              <p className="text-muted-foreground">Year: <span className="text-foreground font-semibold">{car.year}</span></p>
                              <p className="text-muted-foreground">Mileage: <span className="text-foreground font-semibold">{car.mileage}</span></p>
                            </div>
                            <div className="flex gap-4">
                              <Link to={`/inventory/${car.id}`}>
                                <Button className="flex-1 neon-hover">View Details</Button>
                              </Link>
                              <Link to="/test-drive">
                                <Button variant="outline" className="neon-hover">Test Drive</Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            {/* Slider Controls */}
            <Button
              variant="outline"
              size="lg"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 rounded-full h-12 w-12 p-0 neon-hover"
              onClick={prevSlide}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 rounded-full h-12 w-12 p-0 neon-hover"
              onClick={nextSlide}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>

            {/* Slide Indicators */}
            <div className="flex justify-center space-x-2 mt-6">
              {featuredCars.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide ? 'bg-primary shadow-neon-sm' : 'bg-muted'
                  }`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose <span className="bg-gradient-neon bg-clip-text text-transparent">Fast & Furious</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-card-border bg-card/50 backdrop-blur-sm hover:shadow-neon transition-all duration-300 group">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-neon flex items-center justify-center group-hover:animate-float">
                  <Shield className="h-8 w-8 text-background" />
                </div>
                <h3 className="text-xl font-bold">Certified Quality</h3>
                <p className="text-muted-foreground">Every vehicle undergoes rigorous inspection and certification</p>
              </CardContent>
            </Card>

            <Card className="border-card-border bg-card/50 backdrop-blur-sm hover:shadow-neon transition-all duration-300 group">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-neon flex items-center justify-center group-hover:animate-float">
                  <CreditCard className="h-8 w-8 text-background" />
                </div>
                <h3 className="text-xl font-bold">Flexible Financing</h3>
                <p className="text-muted-foreground">Competitive rates and customized payment plans</p>
              </CardContent>
            </Card>

            <Card className="border-card-border bg-card/50 backdrop-blur-sm hover:shadow-neon transition-all duration-300 group">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-neon flex items-center justify-center group-hover:animate-float">
                  <Award className="h-8 w-8 text-background" />
                </div>
                <h3 className="text-xl font-bold">Expert Service</h3>
                <p className="text-muted-foreground">Professional maintenance and repair services</p>
              </CardContent>
            </Card>

            <Card className="border-card-border bg-card/50 backdrop-blur-sm hover:shadow-neon transition-all duration-300 group">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-neon flex items-center justify-center group-hover:animate-float">
                  <Users className="h-8 w-8 text-background" />
                </div>
                <h3 className="text-xl font-bold">24/7 Support</h3>
                <p className="text-muted-foreground">Round-the-clock customer assistance and AI chat support</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* AI Assistant Preview */}
      <section className="py-20 bg-background-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Meet Your <span className="bg-gradient-neon bg-clip-text text-transparent">AI Assistant</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Get instant answers, schedule test drives, and find your perfect car with our advanced AI receptionist
            </p>

            <Card className="border-card-border bg-card/50 backdrop-blur-sm shadow-luxury">
              <CardContent className="p-8">
                <div className="flex items-center justify-center space-x-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-neon flex items-center justify-center animate-glow-pulse">
                    <MessageCircle className="h-6 w-6 text-background" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-lg">AI Assistant</h3>
                    <p className="text-sm text-muted-foreground">Always here to help</p>
                  </div>
                </div>
                
                <div className="space-y-4 text-left max-w-md mx-auto">
                  <div className="bg-muted p-4 rounded-lg rounded-tl-none">
                    <p className="text-sm">Hi! I can help you find the perfect car, schedule test drives, and answer questions about our inventory. What are you looking for today?</p>
                  </div>
                </div>

                <div className="flex gap-4 justify-center mt-6">
                  <Link to="/ai-receptionist">
                    <Button className="neon-hover">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Start Chat
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button variant="outline" className="neon-hover">
                      <Phone className="mr-2 h-4 w-4" />
                      Call Us
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our <span className="bg-gradient-neon bg-clip-text text-transparent">Customers Say</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Michael Rodriguez",
                rating: 5,
                comment: "Incredible service and the most beautiful showroom I've ever seen. My McLaren purchase was seamless!",
                car: "McLaren 720S"
              },
              {
                name: "Sarah Chen",
                rating: 5,
                comment: "The AI assistant helped me find exactly what I was looking for. Fast & Furious exceeded all expectations.",
                car: "Ferrari 488 GTB"
              },
              {
                name: "David Johnson",
                rating: 5,
                comment: "Professional team, luxury experience, and fair pricing. Will definitely recommend to friends.",
                car: "Lamborghini Aventador"
              }
            ].map((review, index) => (
              <Card key={index} className="border-card-border bg-card/50 backdrop-blur-sm hover:shadow-neon transition-all duration-300">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-neon-cyan text-neon-cyan" />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic">"{review.comment}"</p>
                  <div>
                    <p className="font-semibold">{review.name}</p>
                    <p className="text-sm text-muted-foreground">Purchased: {review.car}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/testimonials">
              <Button variant="outline" className="neon-hover">
                View All Reviews
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;