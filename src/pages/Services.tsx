import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  Wrench, 
  RefreshCcw, 
  Shield, 
  Settings, 
  ChevronDown, 
  CheckCircle, 
  Clock, 
  Award, 
  Car,
  DollarSign,
  Calendar,
  Phone
} from 'lucide-react';

const services = [
  {
    id: 'repair',
    icon: Wrench,
    title: 'Auto Repair',
    subtitle: 'Expert repair services for luxury vehicles',
    price: 'Starting at $150/hour',
    duration: '1-5 days',
    description: 'Our certified technicians provide comprehensive repair services for all luxury vehicle brands. Using only genuine parts and advanced diagnostic equipment.',
    features: [
      'Certified luxury vehicle technicians',
      'Genuine OEM parts only',
      'Advanced diagnostic equipment',
      'Comprehensive warranty on repairs',
      'Pickup and delivery service',
      'Detailed repair reports'
    ],
    packages: [
      { name: 'Basic Repair', price: '$150-500', description: 'Minor repairs and diagnostics' },
      { name: 'Major Repair', price: '$500-2000', description: 'Engine, transmission, or complex repairs' },
      { name: 'Collision Repair', price: '$1000+', description: 'Body work and paint restoration' }
    ]
  },
  {
    id: 'trade-in',
    icon: RefreshCcw,
    title: 'Trade-In Program',
    subtitle: 'Competitive valuations for your current vehicle',
    price: 'Free evaluation',
    duration: '30 minutes',
    description: 'Get the best value for your current luxury vehicle with our expert appraisal service. We offer competitive trade-in values and handle all paperwork.',
    features: [
      'Professional vehicle appraisal',
      'Competitive market pricing',
      'Instant trade-in quotes',
      'Streamlined paperwork process',
      'Trade towards any vehicle',
      'No obligation evaluation'
    ],
    packages: [
      { name: 'Standard Evaluation', price: 'Free', description: 'Complete vehicle assessment and quote' },
      { name: 'Premium Appraisal', price: '$200', description: 'Detailed inspection with written report' },
      { name: 'Concierge Service', price: '$500', description: 'White-glove service with pickup' }
    ]
  },
  {
    id: 'warranty',
    icon: Shield,
    title: 'Extended Warranty',
    subtitle: 'Comprehensive protection for your investment',
    price: 'From $2,500/year',
    duration: 'Up to 7 years',
    description: 'Protect your luxury vehicle investment with our comprehensive extended warranty programs. Coverage options for every need and budget.',
    features: [
      'Comprehensive component coverage',
      'Nationwide service network',
      '24/7 roadside assistance',
      'Rental car reimbursement',
      'Transferable coverage',
      'No deductible options available'
    ],
    packages: [
      { name: 'Essential Coverage', price: '$2,500/year', description: 'Powertrain and major components' },
      { name: 'Comprehensive Coverage', price: '$4,500/year', description: 'Bumper-to-bumper protection' },
      { name: 'Premium Coverage', price: '$6,500/year', description: 'Complete coverage with concierge service' }
    ]
  },
  {
    id: 'maintenance',
    icon: Settings,
    title: 'Maintenance Packages',
    subtitle: 'Keep your luxury vehicle in perfect condition',
    price: 'From $500/service',
    duration: '2-4 hours',
    description: 'Regular maintenance is crucial for luxury vehicles. Our maintenance packages ensure your vehicle performs at its peak and retains its value.',
    features: [
      'Factory-scheduled maintenance',
      'Premium fluids and filters',
      'Multi-point inspections',
      'Maintenance scheduling reminders',
      'Loaner vehicle available',
      'Detailed service records'
    ],
    packages: [
      { name: 'Basic Maintenance', price: '$500-800', description: 'Oil change, filters, basic inspection' },
      { name: 'Premium Service', price: '$800-1500', description: 'Comprehensive service and inspection' },
      { name: 'Annual Package', price: '$3000-5000', description: 'Complete yearly maintenance plan' }
    ]
  }
];

const Services = () => {
  const [openService, setOpenService] = useState<string | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<{ [key: string]: number }>({});

  const handleServiceToggle = (serviceId: string) => {
    setOpenService(openService === serviceId ? null : serviceId);
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Premium <span className="bg-gradient-neon bg-clip-text text-transparent">Services</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">Expert care for your luxury vehicle investment</p>
          
          {/* Service Overview Stats */}
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <Card className="border-card-border bg-card/50 backdrop-blur-sm">
              <CardContent className="p-4 text-center">
                <Award className="h-8 w-8 mx-auto mb-2 text-primary" />
                <p className="font-bold text-lg">15+</p>
                <p className="text-sm text-muted-foreground">Years Experience</p>
              </CardContent>
            </Card>
            <Card className="border-card-border bg-card/50 backdrop-blur-sm">
              <CardContent className="p-4 text-center">
                <CheckCircle className="h-8 w-8 mx-auto mb-2 text-primary" />
                <p className="font-bold text-lg">5000+</p>
                <p className="text-sm text-muted-foreground">Services Completed</p>
              </CardContent>
            </Card>
            <Card className="border-card-border bg-card/50 backdrop-blur-sm">
              <CardContent className="p-4 text-center">
                <Clock className="h-8 w-8 mx-auto mb-2 text-primary" />
                <p className="font-bold text-lg">24/7</p>
                <p className="text-sm text-muted-foreground">Support Available</p>
              </CardContent>
            </Card>
            <Card className="border-card-border bg-card/50 backdrop-blur-sm">
              <CardContent className="p-4 text-center">
                <Car className="h-8 w-8 mx-auto mb-2 text-primary" />
                <p className="font-bold text-lg">100%</p>
                <p className="text-sm text-muted-foreground">Satisfaction Rate</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Services */}
        <div className="space-y-6 mb-12">
          {services.map((service, index) => (
            <Card key={service.id} className="border-card-border bg-card/50 backdrop-blur-sm hover:shadow-neon transition-all duration-300">
              <Collapsible open={openService === service.id} onOpenChange={() => handleServiceToggle(service.id)}>
                <CollapsibleTrigger className="w-full">
                  <CardHeader className="cursor-pointer hover:bg-muted/20 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 rounded-xl bg-gradient-neon flex items-center justify-center">
                          <service.icon className="h-8 w-8 text-background" />
                        </div>
                        <div className="text-left">
                          <CardTitle className="text-2xl mb-2">{service.title}</CardTitle>
                          <p className="text-muted-foreground">{service.subtitle}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <Badge variant="outline" className="flex items-center space-x-1">
                              <DollarSign className="h-3 w-3" />
                              <span>{service.price}</span>
                            </Badge>
                            <Badge variant="outline" className="flex items-center space-x-1">
                              <Clock className="h-3 w-3" />
                              <span>{service.duration}</span>
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <ChevronDown className={`h-6 w-6 transition-transform ${openService === service.id ? 'rotate-180' : ''}`} />
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                
                <CollapsibleContent className="animate-fade-in">
                  <CardContent className="pt-0">
                    <div className="grid lg:grid-cols-2 gap-8">
                      {/* Service Description */}
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-semibold text-lg mb-3">Service Overview</h4>
                          <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-lg mb-3">What's Included</h4>
                          <div className="space-y-2">
                            {service.features.map((feature, i) => (
                              <div key={i} className="flex items-center space-x-2">
                                <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                                <span className="text-sm">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Service Packages */}
                      <div className="space-y-4">
                        <h4 className="font-semibold text-lg">Service Packages</h4>
                        {service.packages.map((pkg, i) => (
                          <Card 
                            key={i} 
                            className={`border-2 cursor-pointer transition-all hover:shadow-neon-sm ${
                              selectedPackage[service.id] === i ? 'border-primary bg-primary/5' : 'border-card-border'
                            }`}
                            onClick={() => setSelectedPackage({ ...selectedPackage, [service.id]: i })}
                          >
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start mb-2">
                                <h5 className="font-semibold">{pkg.name}</h5>
                                <Badge className={selectedPackage[service.id] === i ? 'bg-primary' : 'bg-muted'}>
                                  {pkg.price}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{pkg.description}</p>
                            </CardContent>
                          </Card>
                        ))}
                        
                        <div className="flex gap-3 mt-6">
                          <Button className="flex-1 neon-hover">
                            <Calendar className="mr-2 h-4 w-4" />
                            Book Service
                          </Button>
                          <Button variant="outline" className="neon-hover">
                            <Phone className="mr-2 h-4 w-4" />
                            Call
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          ))}
        </div>

        {/* Additional Services */}
        <Card className="border-card-border bg-card/50 backdrop-blur-sm mb-12">
          <CardHeader>
            <CardTitle>Additional Services</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 mx-auto rounded-full bg-gradient-neon flex items-center justify-center">
                  <Car className="h-6 w-6 text-background" />
                </div>
                <h4 className="font-semibold">Detailing Services</h4>
                <p className="text-sm text-muted-foreground">Premium interior and exterior detailing</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 mx-auto rounded-full bg-gradient-neon flex items-center justify-center">
                  <Shield className="h-6 w-6 text-background" />
                </div>
                <h4 className="font-semibold">Paint Protection</h4>
                <p className="text-sm text-muted-foreground">Ceramic coating and paint protection film</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 mx-auto rounded-full bg-gradient-neon flex items-center justify-center">
                  <Settings className="h-6 w-6 text-background" />
                </div>
                <h4 className="font-semibold">Performance Tuning</h4>
                <p className="text-sm text-muted-foreground">ECU tuning and performance modifications</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact CTA */}
        <Card className="border-card-border bg-card/50 backdrop-blur-sm">
          <CardContent className="p-8 text-center space-y-6">
            <h2 className="text-3xl font-bold">
              Need <span className="bg-gradient-neon bg-clip-text text-transparent">Professional Service</span>?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our expert technicians are ready to provide the highest quality service for your luxury vehicle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8 neon-hover">
                <Calendar className="mr-2 h-5 w-5" />
                Schedule Service
              </Button>
              <Button size="lg" variant="outline" className="px-8 neon-hover">
                <Phone className="mr-2 h-5 w-5" />
                Call (555) 123-4567
              </Button>
            </div>
            <div className="text-sm text-muted-foreground">
              <p>Service hours: Monday-Saturday 8AM-6PM | Emergency service available 24/7</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Services;