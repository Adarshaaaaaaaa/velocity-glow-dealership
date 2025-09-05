import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle, 
  User, 
  Eye, 
  EyeOff,
  CheckCircle,
  Car,
  Calendar
} from 'lucide-react';

const Contact = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState('contact');
  const [formData, setFormData] = useState({
    // Contact form
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    preferredContact: 'email',
    // Register form
    firstName: '',
    lastName: '',
    registerEmail: '',
    registerPhone: '',
    password: '',
    confirmPassword: '',
    // Login form
    loginEmail: '',
    loginPassword: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    // Save to localStorage (simulating account creation)
    const userData = {
      id: Date.now(),
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.registerEmail,
      phone: formData.registerPhone,
      createdAt: new Date().toISOString()
    };
    localStorage.setItem('userAccount', JSON.stringify(userData));
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4 border-card-border bg-card/50 backdrop-blur-sm">
          <CardContent className="p-8 text-center space-y-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-neon flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-background" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">
                {activeTab === 'contact' && 'Message Sent!'}
                {activeTab === 'register' && 'Account Created!'}
                {activeTab === 'login' && 'Welcome Back!'}
              </h2>
              <p className="text-muted-foreground">
                {activeTab === 'contact' && 'Thank you for contacting us. We\'ll get back to you within 24 hours.'}
                {activeTab === 'register' && 'Your account has been created successfully. Welcome to Fast & Furious!'}
                {activeTab === 'login' && 'You have been logged in successfully.'}
              </p>
            </div>
            <Button onClick={() => setIsSubmitted(false)} className="w-full neon-hover">
              Continue
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Get In <span className="bg-gradient-neon bg-clip-text text-transparent">Touch</span>
          </h1>
          <p className="text-xl text-muted-foreground">We're here to help with all your luxury car needs</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="border-card-border bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Phone className="mr-2 h-5 w-5 text-primary" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-neon flex items-center justify-center">
                    <Phone className="h-5 w-5 text-background" />
                  </div>
                  <div>
                    <p className="font-semibold">Phone</p>
                    <p className="text-muted-foreground">(555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-neon flex items-center justify-center">
                    <Mail className="h-5 w-5 text-background" />
                  </div>
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-muted-foreground">info@fastfuriousshowroom.com</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-neon flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-background" />
                  </div>
                  <div>
                    <p className="font-semibold">Address</p>
                    <p className="text-muted-foreground">
                      123 Luxury Drive<br />
                      Miami, FL 33101
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-neon flex items-center justify-center">
                    <Clock className="h-5 w-5 text-background" />
                  </div>
                  <div>
                    <p className="font-semibold">Hours</p>
                    <div className="text-muted-foreground text-sm">
                      <p>Mon-Sat: 9:00 AM - 8:00 PM</p>
                      <p>Sunday: 10:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-card-border bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start neon-hover">
                  <Car className="mr-2 h-4 w-4" />
                  Schedule Test Drive
                </Button>
                <Button variant="outline" className="w-full justify-start neon-hover">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Chat with AI Assistant
                </Button>
                <Button variant="outline" className="w-full justify-start neon-hover">
                  <Calendar className="mr-2 h-4 w-4" />
                  Book Service Appointment
                </Button>
              </CardContent>
            </Card>

            {/* Map Placeholder */}
            <Card className="border-card-border bg-card/50 backdrop-blur-sm">
              <CardContent className="p-0">
                <div className="h-64 bg-gradient-luxury rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 mx-auto mb-2 text-primary" />
                    <p className="text-muted-foreground">Interactive Map</p>
                    <p className="text-sm text-muted-foreground">123 Luxury Drive, Miami, FL</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Forms */}
          <div className="lg:col-span-2">
            <Card className="border-card-border bg-card/50 backdrop-blur-sm">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="contact">Contact Us</TabsTrigger>
                  <TabsTrigger value="register">Register</TabsTrigger>
                  <TabsTrigger value="login">Login</TabsTrigger>
                </TabsList>

                {/* Contact Form */}
                <TabsContent value="contact">
                  <CardHeader>
                    <CardTitle>Send us a Message</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleContactSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            required
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            className="bg-background border-card-border"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className="bg-background border-card-border"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            className="bg-background border-card-border"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="subject">Subject *</Label>
                          <Input
                            id="subject"
                            required
                            value={formData.subject}
                            onChange={(e) => handleInputChange('subject', e.target.value)}
                            className="bg-background border-card-border"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          required
                          rows={6}
                          placeholder="Tell us how we can help you..."
                          value={formData.message}
                          onChange={(e) => handleInputChange('message', e.target.value)}
                          className="bg-background border-card-border"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Preferred Contact Method</Label>
                        <div className="flex gap-4">
                          <label className="flex items-center space-x-2">
                            <input
                              type="radio"
                              name="contact"
                              value="email"
                              checked={formData.preferredContact === 'email'}
                              onChange={(e) => handleInputChange('preferredContact', e.target.value)}
                              className="text-primary"
                            />
                            <span>Email</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input
                              type="radio"
                              name="contact"
                              value="phone"
                              checked={formData.preferredContact === 'phone'}
                              onChange={(e) => handleInputChange('preferredContact', e.target.value)}
                              className="text-primary"
                            />
                            <span>Phone</span>
                          </label>
                        </div>
                      </div>

                      <Button type="submit" size="lg" className="w-full neon-hover">
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </TabsContent>

                {/* Register Form */}
                <TabsContent value="register">
                  <CardHeader>
                    <CardTitle>Create Your Account</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleRegisterSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input
                            id="firstName"
                            required
                            value={formData.firstName}
                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                            className="bg-background border-card-border"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input
                            id="lastName"
                            required
                            value={formData.lastName}
                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                            className="bg-background border-card-border"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="registerEmail">Email Address *</Label>
                        <Input
                          id="registerEmail"
                          type="email"
                          required
                          value={formData.registerEmail}
                          onChange={(e) => handleInputChange('registerEmail', e.target.value)}
                          className="bg-background border-card-border"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="registerPhone">Phone Number *</Label>
                        <Input
                          id="registerPhone"
                          type="tel"
                          required
                          value={formData.registerPhone}
                          onChange={(e) => handleInputChange('registerPhone', e.target.value)}
                          className="bg-background border-card-border"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="password">Password *</Label>
                        <div className="relative">
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            required
                            value={formData.password}
                            onChange={(e) => handleInputChange('password', e.target.value)}
                            className="bg-background border-card-border pr-10"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm Password *</Label>
                        <div className="relative">
                          <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            required
                            value={formData.confirmPassword}
                            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                            className="bg-background border-card-border pr-10"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>

                      <div className="text-sm text-muted-foreground">
                        By creating an account, you agree to our Terms of Service and Privacy Policy.
                      </div>

                      <Button type="submit" size="lg" className="w-full neon-hover">
                        Create Account
                      </Button>
                    </form>
                  </CardContent>
                </TabsContent>

                {/* Login Form */}
                <TabsContent value="login">
                  <CardHeader>
                    <CardTitle>Welcome Back</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleLoginSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="loginEmail">Email Address *</Label>
                        <Input
                          id="loginEmail"
                          type="email"
                          required
                          value={formData.loginEmail}
                          onChange={(e) => handleInputChange('loginEmail', e.target.value)}
                          className="bg-background border-card-border"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="loginPassword">Password *</Label>
                        <div className="relative">
                          <Input
                            id="loginPassword"
                            type={showPassword ? "text" : "password"}
                            required
                            value={formData.loginPassword}
                            onChange={(e) => handleInputChange('loginPassword', e.target.value)}
                            className="bg-background border-card-border pr-10"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded" />
                          <span className="text-sm">Remember me</span>
                        </label>
                        <Button variant="ghost" size="sm" className="text-primary">
                          Forgot password?
                        </Button>
                      </div>

                      <Button type="submit" size="lg" className="w-full neon-hover">
                        Sign In
                      </Button>
                    </form>
                  </CardContent>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;