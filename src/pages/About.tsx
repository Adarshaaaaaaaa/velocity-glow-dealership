import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Award, Users, Target, Heart, Star, Trophy, Calendar, Globe } from 'lucide-react';

const milestones = [
  { year: '2010', event: 'Fast & Furious Car Showroom Founded', description: 'Started with a vision to redefine luxury car retail' },
  { year: '2015', event: 'First Premium Location', description: 'Opened our flagship showroom in Miami' },
  { year: '2018', event: '1000+ Cars Sold', description: 'Reached milestone of serving 1000+ satisfied customers' },
  { year: '2020', event: 'AI Integration', description: 'Launched industry-first AI receptionist service' },
  { year: '2023', event: 'Luxury Award Winner', description: 'Named Best Luxury Car Dealer of the Year' },
  { year: '2024', event: 'Digital Innovation', description: 'Pioneering virtual showroom experiences' }
];

const team = [
  {
    name: 'Marcus Rodriguez',
    role: 'Founder & CEO',
    experience: '15+ years',
    specialty: 'Luxury Vehicle Expert',
    achievements: ['Industry Pioneer', 'Customer Champion']
  },
  {
    name: 'Sarah Chen',
    role: 'Sales Director',
    experience: '12+ years',
    specialty: 'Performance Cars',
    achievements: ['Top Sales Leader', 'Client Relations Expert']
  },
  {
    name: 'David Johnson',
    role: 'Finance Manager',
    experience: '10+ years',
    specialty: 'Luxury Financing',
    achievements: ['Finance Expert', 'Deal Structuring Pro']
  },
  {
    name: 'Elena Vasquez',
    role: 'Service Manager',
    experience: '8+ years',
    specialty: 'Technical Excellence',
    achievements: ['Service Excellence', 'Team Leadership']
  }
];

const stats = [
  { icon: Users, value: '5000+', label: 'Happy Customers' },
  { icon: Star, value: '4.9/5', label: 'Customer Rating' },
  { icon: Trophy, value: '25+', label: 'Awards Won' },
  { icon: Globe, value: '15+', label: 'Years Experience' }
];

const About = () => {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <Badge className="bg-gradient-neon text-background text-sm px-4 py-2 mb-6">
            Our Story
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Redefining <span className="bg-gradient-neon bg-clip-text text-transparent">Luxury</span>
            <br />Car Excellence
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            For over a decade, Fast & Furious Car Showroom has been the premier destination for discerning automotive enthusiasts seeking the pinnacle of luxury and performance.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <Card key={index} className="border-card-border bg-card/50 backdrop-blur-sm hover:shadow-neon transition-all duration-300 group">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-neon flex items-center justify-center mb-4 group-hover:animate-float">
                  <stat.icon className="h-8 w-8 text-background" />
                </div>
                <h3 className="text-3xl font-bold mb-2 bg-gradient-neon bg-clip-text text-transparent">
                  {stat.value}
                </h3>
                <p className="text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mission & Values */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          <Card className="border-card-border bg-card/50 backdrop-blur-sm hover:shadow-neon transition-all duration-300">
            <CardContent className="p-8 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-neon flex items-center justify-center">
                <Target className="h-8 w-8 text-background" />
              </div>
              <h3 className="text-2xl font-bold">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To provide an unparalleled luxury car buying experience that combines cutting-edge technology, 
                exceptional service, and the world's finest automotive masterpieces.
              </p>
            </CardContent>
          </Card>

          <Card className="border-card-border bg-card/50 backdrop-blur-sm hover:shadow-neon transition-all duration-300">
            <CardContent className="p-8 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-neon flex items-center justify-center">
                <Heart className="h-8 w-8 text-background" />
              </div>
              <h3 className="text-2xl font-bold">Our Values</h3>
              <p className="text-muted-foreground leading-relaxed">
                Integrity, excellence, and passion drive everything we do. We believe every customer deserves 
                the highest level of respect, transparency, and personalized attention.
              </p>
            </CardContent>
          </Card>

          <Card className="border-card-border bg-card/50 backdrop-blur-sm hover:shadow-neon transition-all duration-300">
            <CardContent className="p-8 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-neon flex items-center justify-center">
                <Award className="h-8 w-8 text-background" />
              </div>
              <h3 className="text-2xl font-bold">Our Promise</h3>
              <p className="text-muted-foreground leading-relaxed">
                Every vehicle we sell comes with our commitment to quality, comprehensive warranties, 
                and ongoing support to ensure your luxury experience never ends.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Timeline */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Our <span className="bg-gradient-neon bg-clip-text text-transparent">Journey</span>
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-neon opacity-30"></div>
              
              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <div key={index} className="relative flex items-start space-x-8 animate-fade-in">
                    <div className="w-16 h-16 rounded-full bg-gradient-neon flex items-center justify-center flex-shrink-0 z-10">
                      <Calendar className="h-6 w-6 text-background" />
                    </div>
                    <Card className="flex-1 border-card-border bg-card/50 backdrop-blur-sm hover:shadow-neon transition-all duration-300">
                      <CardContent className="p-6">
                        <Badge className="bg-primary/20 text-primary mb-3">{milestone.year}</Badge>
                        <h3 className="text-xl font-bold mb-2">{milestone.event}</h3>
                        <p className="text-muted-foreground">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Meet Our <span className="bg-gradient-neon bg-clip-text text-transparent">Expert Team</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="border-card-border bg-card/50 backdrop-blur-sm hover:shadow-neon transition-all duration-300 group">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-24 h-24 mx-auto rounded-full bg-gradient-neon flex items-center justify-center group-hover:animate-float">
                    <Users className="h-12 w-12 text-background" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-primary font-semibold mb-2">{member.role}</p>
                    <p className="text-sm text-muted-foreground mb-2">{member.experience}</p>
                    <p className="text-sm font-medium mb-3">{member.specialty}</p>
                    <div className="space-y-1">
                      {member.achievements.map((achievement, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {achievement}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <Card className="border-card-border bg-card/50 backdrop-blur-sm">
          <CardContent className="p-12 text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Experience <span className="bg-gradient-neon bg-clip-text text-transparent">Excellence</span>?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Visit our showroom and discover why thousands of customers trust us with their luxury car dreams.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8 neon-hover">
                Visit Our Showroom
              </Button>
              <Button size="lg" variant="outline" className="px-8 neon-hover">
                Schedule Consultation
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;