import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  Heart, 
  Calendar, 
  MessageCircle, 
  Edit, 
  Save, 
  Car, 
  DollarSign,
  Clock,
  CheckCircle,
  Star,
  Trash2
} from 'lucide-react';

interface UserProfile {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  createdAt: string;
}

interface SavedCar {
  id: number;
  name: string;
  price: number;
  savedAt: string;
}

interface Booking {
  id: number;
  vehicle: string;
  date: string;
  time: string;
  status: string;
  createdAt: string;
}

interface ChatHistory {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const Account = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  const [savedCars, setSavedCars] = useState<SavedCar[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);
  const [financeCalculations, setFinanceCalculations] = useState<any[]>([]);

  useEffect(() => {
    // Load user data from localStorage
    const userData = localStorage.getItem('userAccount');
    if (userData) {
      const profile = JSON.parse(userData);
      setUserProfile(profile);
      setEditForm({
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        phone: profile.phone
      });
    }

    // Load saved cars (mock data)
    setSavedCars([
      { id: 1, name: 'Ferrari 488 GTB', price: 280000, savedAt: '2024-01-10' },
      { id: 2, name: 'McLaren 720S', price: 320000, savedAt: '2024-01-08' }
    ]);

    // Load bookings
    const savedBookings = localStorage.getItem('testDriveBookings');
    if (savedBookings) {
      setBookings(JSON.parse(savedBookings));
    }

    // Load chat history
    const savedChat = localStorage.getItem('aiChatHistory');
    if (savedChat) {
      setChatHistory(JSON.parse(savedChat).map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      })));
    }

    // Load finance calculations
    const savedCalculations = localStorage.getItem('financeCalculations');
    if (savedCalculations) {
      setFinanceCalculations(JSON.parse(savedCalculations));
    }
  }, []);

  const handleSaveProfile = () => {
    if (userProfile) {
      const updatedProfile = {
        ...userProfile,
        ...editForm
      };
      setUserProfile(updatedProfile);
      localStorage.setItem('userAccount', JSON.stringify(updatedProfile));
      setIsEditing(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
  };

  const removeSavedCar = (carId: number) => {
    setSavedCars(prev => prev.filter(car => car.id !== carId));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  if (!userProfile) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4 border-card-border bg-card/50 backdrop-blur-sm">
          <CardContent className="p-8 text-center space-y-6">
            <User className="h-12 w-12 mx-auto text-muted-foreground" />
            <div>
              <h2 className="text-2xl font-bold mb-2">No Account Found</h2>
              <p className="text-muted-foreground">Please register or log in to access your account.</p>
            </div>
            <Button className="w-full neon-hover">
              Go to Login
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
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-neon flex items-center justify-center">
              <User className="h-8 w-8 text-background" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">
                Welcome back, <span className="bg-gradient-neon bg-clip-text text-transparent">{userProfile.firstName}</span>
              </h1>
              <p className="text-muted-foreground">Manage your luxury car experience</p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="mt-6">
            <Card className="border-card-border bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <User className="mr-2 h-5 w-5 text-primary" />
                    Profile Information
                  </CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                    className="neon-hover"
                  >
                    {isEditing ? (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save
                      </>
                    ) : (
                      <>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </>
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={isEditing ? editForm.firstName : userProfile.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      disabled={!isEditing}
                      className="bg-background border-card-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={isEditing ? editForm.lastName : userProfile.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      disabled={!isEditing}
                      className="bg-background border-card-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={isEditing ? editForm.email : userProfile.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      disabled={!isEditing}
                      className="bg-background border-card-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={isEditing ? editForm.phone : userProfile.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      disabled={!isEditing}
                      className="bg-background border-card-border"
                    />
                  </div>
                </div>
                
                <Separator />
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-semibold text-lg">Member Since</h4>
                    <p className="text-muted-foreground">
                      {new Date(userProfile.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-semibold text-lg">Account Status</h4>
                    <Badge className="bg-gradient-neon text-background">Premium</Badge>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-semibold text-lg">Loyalty Points</h4>
                    <p className="text-2xl font-bold text-primary">2,450</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Favorites Tab */}
          <TabsContent value="favorites" className="mt-6">
            <Card className="border-card-border bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="mr-2 h-5 w-5 text-primary" />
                  Saved Vehicles
                </CardTitle>
              </CardHeader>
              <CardContent>
                {savedCars.length > 0 ? (
                  <div className="space-y-4">
                    {savedCars.map((car) => (
                      <div key={car.id} className="flex items-center justify-between p-4 border border-card-border rounded-lg hover:bg-muted/20 transition-colors">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 rounded-lg bg-gradient-neon flex items-center justify-center">
                            <Car className="h-6 w-6 text-background" />
                          </div>
                          <div>
                            <h4 className="font-semibold">{car.name}</h4>
                            <p className="text-primary font-bold">{formatCurrency(car.price)}</p>
                            <p className="text-sm text-muted-foreground">Saved on {car.savedAt}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" className="neon-hover">
                            View Details
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => removeSavedCar(car.id)}
                            className="text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Heart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-xl font-bold mb-2">No Saved Vehicles</h3>
                    <p className="text-muted-foreground mb-6">Start browsing our inventory to save your favorite cars</p>
                    <Button className="neon-hover">Browse Inventory</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="mt-6">
            <Card className="border-card-border bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-primary" />
                  Test Drive Bookings
                </CardTitle>
              </CardHeader>
              <CardContent>
                {bookings.length > 0 ? (
                  <div className="space-y-4">
                    {bookings.map((booking) => (
                      <div key={booking.id} className="p-4 border border-card-border rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold">{booking.vehicle}</h4>
                          <Badge className={
                            booking.status === 'confirmed' ? 'bg-green-500/20 text-green-400' :
                            booking.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-red-500/20 text-red-400'
                          }>
                            {booking.status}
                          </Badge>
                        </div>
                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-primary" />
                            <span>{booking.date}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-primary" />
                            <span>{booking.time}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-primary" />
                            <span>Booked on {new Date(booking.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-xl font-bold mb-2">No Bookings Yet</h3>
                    <p className="text-muted-foreground mb-6">Schedule your first test drive to experience luxury performance</p>
                    <Button className="neon-hover">Book Test Drive</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="mt-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Chat History */}
              <Card className="border-card-border bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageCircle className="mr-2 h-5 w-5 text-primary" />
                    Recent AI Conversations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {chatHistory.length > 0 ? (
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {chatHistory.slice(-5).map((message) => (
                        <div key={message.id} className={`p-3 rounded-lg text-sm ${
                          message.sender === 'user' ? 'bg-primary/10 ml-4' : 'bg-muted/50 mr-4'
                        }`}>
                          <p className="font-medium text-xs mb-1">
                            {message.sender === 'user' ? 'You' : 'AI Assistant'}
                          </p>
                          <p className="text-muted-foreground">{message.content.substring(0, 100)}...</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {message.timestamp.toLocaleString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <MessageCircle className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-muted-foreground">No chat history yet</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Finance Calculations */}
              <Card className="border-card-border bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <DollarSign className="mr-2 h-5 w-5 text-primary" />
                    Saved Calculations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {financeCalculations.length > 0 ? (
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {financeCalculations.slice(0, 5).map((calc) => (
                        <div key={calc.id} className="p-3 border border-card-border rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <h5 className="font-semibold">{formatCurrency(calc.monthlyPayment)}/mo</h5>
                            <Badge variant="outline">{calc.date}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Vehicle: {formatCurrency(calc.vehiclePrice)}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <DollarSign className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-muted-foreground">No saved calculations</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Account;