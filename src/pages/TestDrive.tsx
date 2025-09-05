import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { CalendarIcon, Clock, Car, User, Phone, Mail, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const availableSlots = {
  '2024-01-15': ['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM'],
  '2024-01-16': ['10:00 AM', '1:00 PM', '3:00 PM'],
  '2024-01-17': ['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM', '5:00 PM'],
  '2024-01-18': ['10:00 AM', '12:00 PM', '3:00 PM'],
  '2024-01-19': ['9:00 AM', '11:00 AM', '1:00 PM', '4:00 PM']
};

const vehicles = [
  { id: 1, name: 'Ferrari 488 GTB', price: '$280,000' },
  { id: 2, name: 'Lamborghini Aventador', price: '$450,000' },
  { id: 3, name: 'McLaren 720S', price: '$320,000' }
];

const TestDrive = () => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    licenseNumber: '',
    message: ''
  });

  const dateKey = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '';
  const availableTimes = dateKey ? availableSlots[dateKey as keyof typeof availableSlots] || [] : [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save to localStorage (simulating backend)
    const booking = {
      id: Date.now(),
      ...formData,
      vehicle: selectedVehicle,
      date: selectedDate ? format(selectedDate, 'PPP') : '',
      time: selectedTime,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    const existingBookings = JSON.parse(localStorage.getItem('testDriveBookings') || '[]');
    existingBookings.push(booking);
    localStorage.setItem('testDriveBookings', JSON.stringify(existingBookings));

    setIsSubmitted(true);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
              <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
              <p className="text-muted-foreground">
                Your test drive has been scheduled. We'll send you a confirmation email shortly.
              </p>
            </div>
            <div className="space-y-2 text-left bg-muted/50 p-4 rounded-lg">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Vehicle:</span>
                <span className="font-semibold">{vehicles.find(v => v.id.toString() === selectedVehicle)?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date:</span>
                <span className="font-semibold">{selectedDate ? format(selectedDate, 'PPP') : ''}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Time:</span>
                <span className="font-semibold">{selectedTime}</span>
              </div>
            </div>
            <Button 
              onClick={() => {
                setIsSubmitted(false);
                setSelectedDate(undefined);
                setSelectedTime('');
                setSelectedVehicle('');
                setFormData({
                  firstName: '',
                  lastName: '',
                  email: '',
                  phone: '',
                  licenseNumber: '',
                  message: ''
                });
              }}
              className="w-full neon-hover"
            >
              Book Another Test Drive
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Schedule Your <span className="bg-gradient-neon bg-clip-text text-transparent">Test Drive</span>
          </h1>
          <p className="text-xl text-muted-foreground">Experience luxury performance firsthand</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Booking Details */}
            <div className="space-y-6">
              {/* Vehicle Selection */}
              <Card className="border-card-border bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Car className="mr-2 h-5 w-5 text-primary" />
                    Select Vehicle
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-3">
                    {vehicles.map((vehicle) => (
                      <div
                        key={vehicle.id}
                        className={cn(
                          "p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-neon-sm",
                          selectedVehicle === vehicle.id.toString()
                            ? "border-primary bg-primary/10"
                            : "border-card-border hover:border-primary/50"
                        )}
                        onClick={() => setSelectedVehicle(vehicle.id.toString())}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-semibold">{vehicle.name}</h3>
                            <p className="text-primary font-bold">{vehicle.price}</p>
                          </div>
                          {selectedVehicle === vehicle.id.toString() && (
                            <Badge className="bg-gradient-neon text-background">Selected</Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Date Selection */}
              <Card className="border-card-border bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CalendarIcon className="mr-2 h-5 w-5 text-primary" />
                    Select Date
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal h-12",
                          !selectedDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-card border-card-border">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </CardContent>
              </Card>

              {/* Time Selection */}
              {selectedDate && (
                <Card className="border-card-border bg-card/50 backdrop-blur-sm animate-fade-in">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Clock className="mr-2 h-5 w-5 text-primary" />
                      Select Time
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {availableTimes.length > 0 ? (
                      <div className="grid grid-cols-2 gap-3">
                        {availableTimes.map((time) => (
                          <Button
                            key={time}
                            type="button"
                            variant={selectedTime === time ? "default" : "outline"}
                            className="h-12 neon-hover"
                            onClick={() => setSelectedTime(time)}
                          >
                            {time}
                          </Button>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-center py-4">
                        No available slots for this date. Please select another date.
                      </p>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Right Column - Personal Information */}
            <div className="space-y-6">
              <Card className="border-card-border bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="mr-2 h-5 w-5 text-primary" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
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

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="bg-background border-card-border"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="license">Driver's License Number *</Label>
                    <Input
                      id="license"
                      required
                      value={formData.licenseNumber}
                      onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                      className="bg-background border-card-border"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Additional Message (Optional)</Label>
                    <Textarea
                      id="message"
                      rows={3}
                      placeholder="Any specific questions or requirements..."
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      className="bg-background border-card-border"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Requirements */}
              <Card className="border-card-border bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Valid driver's license required</li>
                    <li>• Must be 21+ years old</li>
                    <li>• Insurance verification may be required</li>
                    <li>• Photo ID must match license</li>
                    <li>• Test drive duration: 30-45 minutes</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <Button 
              type="submit" 
              size="lg" 
              className="px-12 neon-hover"
              disabled={!selectedVehicle || !selectedDate || !selectedTime || !formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.licenseNumber}
            >
              Confirm Test Drive Booking
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TestDrive;