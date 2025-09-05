import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star, Quote, Filter, Play, User, Car, Heart, Award } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Michael Rodriguez',
    rating: 5,
    vehicle: 'McLaren 720S',
    service: 'Purchase',
    date: '2024-01-15',
    review: "Absolutely incredible experience from start to finish. The team at Fast & Furious went above and beyond to ensure I found the perfect McLaren. The AI assistant was surprisingly helpful in the initial research phase, and the human expertise sealed the deal. The showroom itself is like stepping into the future - truly a luxury experience that matches the quality of their vehicles.",
    avatar: 'M',
    verified: true,
    helpful: 45
  },
  {
    id: 2,
    name: 'Sarah Chen',
    rating: 5,
    vehicle: 'Ferrari 488 GTB',
    service: 'Purchase',
    date: '2024-01-10',
    review: "I've purchased luxury cars before, but nothing compares to the service at Fast & Furious. From the moment I walked in, I felt like VIP. The financing options were flexible, the test drive was thrilling, and the delivery was flawless. My Ferrari is perfect, and the ongoing relationship they maintain with customers is exceptional.",
    avatar: 'S',
    verified: true,
    helpful: 38
  },
  {
    id: 3,
    name: 'David Johnson',
    rating: 5,
    vehicle: 'Lamborghini Aventador',
    service: 'Purchase',
    date: '2024-01-05',
    review: "The pinnacle of luxury car buying. The Lamborghini Aventador was everything I dreamed of and more. The team's knowledge of the vehicles is encyclopedic, and their passion is infectious. The whole process was smooth, transparent, and enjoyable. I'm already planning my next purchase with them.",
    avatar: 'D',
    verified: true,
    helpful: 52
  },
  {
    id: 4,
    name: 'Elena Vasquez',
    rating: 5,
    vehicle: 'Ferrari 488 GTB',
    service: 'Service',
    date: '2023-12-20',
    review: "Outstanding service department! They maintained my Ferrari with the care and attention it deserves. The technicians are clearly experts, and the service advisor kept me informed throughout. The lounge area while waiting is luxurious, and they even detailed my car as a courtesy. True professionals.",
    avatar: 'E',
    verified: true,
    helpful: 29
  },
  {
    id: 5,
    name: 'James Wilson',
    rating: 5,
    vehicle: 'McLaren 720S',
    service: 'Trade-in',
    date: '2023-12-15',
    review: "Traded in my previous supercar and upgraded to the McLaren 720S. The trade-in valuation was fair and competitive, and the upgrade process was seamless. The team made sure I understood all the differences and new features. The AI receptionist helped me schedule everything perfectly.",
    avatar: 'J',
    verified: true,
    helpful: 33
  },
  {
    id: 6,
    name: 'Maria Garcia',
    rating: 5,
    vehicle: 'Lamborghini Aventador',
    service: 'Financing',
    date: '2023-12-10',
    review: "The financing team worked miracles! They found me rates I didn't think were possible and structured a deal that worked perfectly for my situation. The whole team celebrated with me when I drove off in my Lamborghini. It felt like family, not just a transaction.",
    avatar: 'M',
    verified: true,
    helpful: 41
  }
];

const vehicleTypes = ['All Vehicles', 'Ferrari 488 GTB', 'Lamborghini Aventador', 'McLaren 720S'];
const serviceTypes = ['All Services', 'Purchase', 'Service', 'Trade-in', 'Financing'];
const ratingOptions = ['All Ratings', '5 Stars', '4 Stars', '3 Stars'];

const Testimonials = () => {
  const [filteredTestimonials, setFilteredTestimonials] = useState(testimonials);
  const [vehicleFilter, setVehicleFilter] = useState('All Vehicles');
  const [serviceFilter, setServiceFilter] = useState('All Services');
  const [ratingFilterValue, setRatingFilterValue] = useState('All Ratings');

  const applyFilters = () => {
    let filtered = testimonials;

    if (vehicleFilter !== 'All Vehicles') {
      filtered = filtered.filter(t => t.vehicle === vehicleFilter);
    }

    if (serviceFilter !== 'All Services') {
      filtered = filtered.filter(t => t.service === serviceFilter);
    }

    if (ratingFilterValue !== 'All Ratings') {
      const rating = parseInt(ratingFilterValue.charAt(0));
      filtered = filtered.filter(t => t.rating === rating);
    }

    setFilteredTestimonials(filtered);
  };

  useState(() => {
    applyFilters();
  });

  const averageRating = (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1);
  const totalReviews = testimonials.length;

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Customer <span className="bg-gradient-neon bg-clip-text text-transparent">Testimonials</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">Hear from our satisfied luxury car owners</p>
          
          {/* Rating Summary */}
          <Card className="max-w-md mx-auto border-card-border bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 fill-neon-cyan text-neon-cyan" />
                  ))}
                </div>
                <span className="text-2xl font-bold bg-gradient-neon bg-clip-text text-transparent">{averageRating}</span>
              </div>
              <p className="text-muted-foreground">Based on {totalReviews} verified reviews</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="border-card-border bg-card/50 backdrop-blur-sm mb-8">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4 mb-4">
              <Filter className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Filter Reviews</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <Select value={vehicleFilter} onValueChange={(value) => {
                setVehicleFilter(value);
                setTimeout(applyFilters, 0);
              }}>
                <SelectTrigger className="bg-background border-card-border">
                  <SelectValue placeholder="Vehicle Type" />
                </SelectTrigger>
                <SelectContent>
                  {vehicleTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={serviceFilter} onValueChange={(value) => {
                setServiceFilter(value);
                setTimeout(applyFilters, 0);
              }}>
                <SelectTrigger className="bg-background border-card-border">
                  <SelectValue placeholder="Service Type" />
                </SelectTrigger>
                <SelectContent>
                  {serviceTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={ratingFilterValue} onValueChange={(value) => {
                setRatingFilterValue(value);
                setTimeout(applyFilters, 0);
              }}>
                <SelectTrigger className="bg-background border-card-border">
                  <SelectValue placeholder="Rating" />
                </SelectTrigger>
                <SelectContent>
                  {ratingOptions.map(rating => (
                    <SelectItem key={rating} value={rating}>{rating}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Testimonials Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {filteredTestimonials.map((testimonial, index) => (
            <Card key={testimonial.id} className="border-card-border bg-card/50 backdrop-blur-sm hover:shadow-neon transition-all duration-300 animate-fade-in">
              <CardContent className="p-6 space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-neon flex items-center justify-center">
                      <span className="text-background font-bold">{testimonial.avatar}</span>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-bold">{testimonial.name}</h3>
                        {testimonial.verified && (
                          <Badge className="bg-gradient-neon text-background text-xs">Verified</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{testimonial.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1 mb-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-neon-cyan text-neon-cyan" />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Vehicle & Service Tags */}
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="flex items-center space-x-1">
                    <Car className="h-3 w-3" />
                    <span>{testimonial.vehicle}</span>
                  </Badge>
                  <Badge variant="outline">{testimonial.service}</Badge>
                </div>

                {/* Review Content */}
                <div className="relative">
                  <Quote className="absolute -top-2 -left-2 h-8 w-8 text-primary/20" />
                  <p className="text-muted-foreground leading-relaxed pl-6 italic">
                    "{testimonial.review}"
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-card-border">
                  <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                      <Heart className="h-4 w-4 mr-1" />
                      Helpful ({testimonial.helpful})
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                    <Play className="h-4 w-4 mr-1" />
                    Watch Video
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredTestimonials.length === 0 && (
          <Card className="border-card-border bg-card/50 backdrop-blur-sm">
            <CardContent className="p-12 text-center">
              <User className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-bold mb-2">No reviews found</h3>
              <p className="text-muted-foreground mb-6">Try adjusting your filter criteria to see more reviews.</p>
            <Button onClick={() => {
              setVehicleFilter('All Vehicles');
              setServiceFilter('All Services');
              setRatingFilterValue('All Ratings');
              setFilteredTestimonials(testimonials);
            }}>
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Call to Action */}
        <Card className="border-card-border bg-card/50 backdrop-blur-sm">
          <CardContent className="p-8 text-center space-y-6">
            <Award className="h-12 w-12 mx-auto text-primary" />
            <h2 className="text-3xl font-bold">
              Join Our <span className="bg-gradient-neon bg-clip-text text-transparent">Happy Customers</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the luxury car buying process that has earned us hundreds of 5-star reviews.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8 neon-hover">
                Schedule Test Drive
              </Button>
              <Button size="lg" variant="outline" className="px-8 neon-hover">
                View Inventory
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Testimonials;