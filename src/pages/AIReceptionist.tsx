import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  MessageCircle, 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Bot, 
  User, 
  Trash2,
  Calendar,
  Car,
  Calculator,
  HelpCircle,
  Phone
} from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type?: 'text' | 'booking' | 'calculation';
}

const predefinedResponses = {
  greeting: "Hello! I'm your AI assistant at Fast & Furious Car Showroom. I can help you with vehicle information, schedule test drives, calculate financing, and answer any questions. How can I assist you today?",
  inventory: "We have an amazing selection of luxury vehicles including Ferrari 488 GTB ($280,000), Lamborghini Aventador ($450,000), and McLaren 720S ($320,000). Would you like more details about any specific model?",
  testDrive: "I'd be happy to help you schedule a test drive! We have availability throughout the week. Which vehicle interests you, and what dates work best for you?",
  financing: "We offer competitive financing options with rates starting at 4.9% APR. Our finance calculator can help you estimate monthly payments. Would you like me to help you calculate payments for a specific vehicle?",
  hours: "Our showroom is open Monday-Saturday 9AM-8PM, and Sunday 10AM-6PM. We're located at 123 Luxury Drive, Miami, FL 33101. You can also reach us at (555) 123-4567.",
  services: "We offer comprehensive services including maintenance, repair, trade-ins, and extended warranties. All services are performed by certified technicians using genuine parts."
};

const quickActions = [
  { icon: Car, label: "View Inventory", action: "inventory" },
  { icon: Calendar, label: "Book Test Drive", action: "testDrive" },
  { icon: Calculator, label: "Finance Calculator", action: "financing" },
  { icon: Phone, label: "Contact Info", action: "hours" }
];

const AIReceptionist = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: predefinedResponses.greeting,
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedTab, setSelectedTab] = useState('chat');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    // Load chat history from localStorage
    const savedMessages = localStorage.getItem('aiChatHistory');
    if (savedMessages) {
      const parsed = JSON.parse(savedMessages).map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      }));
      setMessages(parsed);
    }
  }, []);

  useEffect(() => {
    // Save chat history to localStorage
    localStorage.setItem('aiChatHistory', JSON.stringify(messages));
  }, [messages]);

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return predefinedResponses.greeting;
    } else if (lowerMessage.includes('inventory') || lowerMessage.includes('cars') || lowerMessage.includes('vehicles')) {
      return predefinedResponses.inventory;
    } else if (lowerMessage.includes('test drive') || lowerMessage.includes('schedule') || lowerMessage.includes('appointment')) {
      return predefinedResponses.testDrive;
    } else if (lowerMessage.includes('finance') || lowerMessage.includes('loan') || lowerMessage.includes('payment')) {
      return predefinedResponses.financing;
    } else if (lowerMessage.includes('hours') || lowerMessage.includes('open') || lowerMessage.includes('location') || lowerMessage.includes('address')) {
      return predefinedResponses.hours;
    } else if (lowerMessage.includes('service') || lowerMessage.includes('maintenance') || lowerMessage.includes('repair')) {
      return predefinedResponses.services;
    } else if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
      return "Our vehicles range from luxury sports cars starting at $280,000 to ultra-premium models at $450,000+. Each vehicle includes a comprehensive warranty and service package. Would you like specific pricing for any model?";
    } else if (lowerMessage.includes('ferrari')) {
      return "The Ferrari 488 GTB is priced at $280,000. It features a 3.9L V8 twin-turbo engine with 661 HP, 0-60 mph in 3.0 seconds, and a top speed of 205 mph. Would you like to schedule a test drive?";
    } else if (lowerMessage.includes('lamborghini')) {
      return "The Lamborghini Aventador is our flagship model at $450,000. It has a 6.5L V12 engine producing 740 HP, 0-60 mph in 2.9 seconds, and a top speed of 217 mph. It's truly an extraordinary machine!";
    } else if (lowerMessage.includes('mclaren')) {
      return "The McLaren 720S is available for $320,000. It features a 4.0L V8 twin-turbo engine with 710 HP, 0-60 mph in 2.8 seconds, and butterfly doors. It's the perfect blend of performance and luxury.";
    } else {
      return "I understand you're interested in learning more. I can help you with vehicle information, scheduling test drives, financing options, and general inquiries. Is there something specific you'd like to know about our luxury vehicles or services?";
    }
  };

  const sendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(inputMessage),
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleQuickAction = (action: string) => {
    const actionMessage = {
      id: Date.now().toString(),
      content: action === 'inventory' ? 'Tell me about your inventory' :
              action === 'testDrive' ? 'I want to schedule a test drive' :
              action === 'financing' ? 'Tell me about financing options' :
              'What are your hours and location?',
      sender: 'user' as const,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, actionMessage]);

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: predefinedResponses[action as keyof typeof predefinedResponses],
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 500);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // In a real implementation, this would start/stop speech recognition
  };

  const toggleSpeaking = () => {
    setIsSpeaking(!isSpeaking);
    // In a real implementation, this would start/stop text-to-speech
  };

  const clearChat = () => {
    setMessages([{
      id: '1',
      content: predefinedResponses.greeting,
      sender: 'ai',
      timestamp: new Date()
    }]);
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-neon bg-clip-text text-transparent">AI</span> Receptionist
          </h1>
          <p className="text-xl text-muted-foreground">Your 24/7 luxury car concierge</p>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="chat">Live Chat</TabsTrigger>
            <TabsTrigger value="voice">Voice Assistant</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="mt-6">
            <div className="grid lg:grid-cols-4 gap-6">
              {/* Chat Interface */}
              <Card className="lg:col-span-3 border-card-border bg-card/50 backdrop-blur-sm h-[600px] flex flex-col">
                <CardHeader className="flex-shrink-0 pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-neon flex items-center justify-center animate-glow-pulse">
                        <Bot className="h-5 w-5 text-background" />
                      </div>
                      <div>
                        <CardTitle>AI Assistant</CardTitle>
                        <p className="text-sm text-muted-foreground">Always here to help</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={clearChat} className="neon-hover">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col p-0">
                  {/* Messages */}
                  <div 
                    ref={chatContainerRef}
                    className="flex-1 overflow-y-auto p-4 space-y-4"
                  >
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`flex max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start space-x-2`}>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            message.sender === 'user' ? 'ml-2 bg-primary' : 'mr-2 bg-gradient-neon'
                          }`}>
                            {message.sender === 'user' ? 
                              <User className="h-4 w-4 text-primary-foreground" /> : 
                              <Bot className="h-4 w-4 text-background" />
                            }
                          </div>
                          <div className={`rounded-lg p-3 ${
                            message.sender === 'user' 
                              ? 'bg-primary text-primary-foreground rounded-tr-none' 
                              : 'bg-muted rounded-tl-none'
                          }`}>
                            <p className="text-sm">{message.content}</p>
                            <p className="text-xs opacity-70 mt-1">
                              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input */}
                  <div className="p-4 border-t border-card-border">
                    <div className="flex space-x-2">
                      <Input
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder="Type your message..."
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        className="flex-1 bg-background border-card-border"
                      />
                      <Button onClick={sendMessage} className="neon-hover">
                        <Send className="h-4 w-4" />
                      </Button>
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
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full justify-start neon-hover"
                      onClick={() => handleQuickAction(action.action)}
                    >
                      <action.icon className="mr-2 h-4 w-4" />
                      {action.label}
                    </Button>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="voice" className="mt-6">
            <Card className="border-card-border bg-card/50 backdrop-blur-sm max-w-2xl mx-auto">
              <CardHeader className="text-center">
                <CardTitle>Voice Assistant</CardTitle>
                <p className="text-muted-foreground">Talk naturally with our AI assistant</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className={`w-32 h-32 mx-auto rounded-full flex items-center justify-center mb-6 ${
                    isRecording ? 'bg-gradient-neon animate-glow-pulse' : 'bg-muted'
                  }`}>
                    <Mic className={`h-12 w-12 ${isRecording ? 'text-background' : 'text-muted-foreground'}`} />
                  </div>
                  
                  <div className="flex justify-center space-x-4">
                    <Button
                      variant={isRecording ? "default" : "outline"}
                      size="lg"
                      onClick={toggleRecording}
                      className="neon-hover"
                    >
                      {isRecording ? <MicOff className="mr-2 h-5 w-5" /> : <Mic className="mr-2 h-5 w-5" />}
                      {isRecording ? 'Stop Recording' : 'Start Recording'}
                    </Button>
                    
                    <Button
                      variant={isSpeaking ? "default" : "outline"}
                      size="lg"
                      onClick={toggleSpeaking}
                      className="neon-hover"
                    >
                      {isSpeaking ? <VolumeX className="mr-2 h-5 w-5" /> : <Volume2 className="mr-2 h-5 w-5" />}
                      {isSpeaking ? 'Mute' : 'Speak'}
                    </Button>
                  </div>
                </div>

                <div className="text-center text-muted-foreground">
                  {isRecording ? 
                    "Listening... Speak clearly about vehicles, scheduling, or any questions you have." :
                    "Click 'Start Recording' and ask me anything about our luxury vehicles."
                  }
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Try saying:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• "Tell me about the Ferrari 488 GTB"</li>
                    <li>• "I want to schedule a test drive"</li>
                    <li>• "What financing options do you have?"</li>
                    <li>• "What are your showroom hours?"</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="faq" className="mt-6">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-card-border bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <HelpCircle className="mr-2 h-5 w-5 text-primary" />
                    Frequently Asked Questions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">What vehicles do you have in stock?</h4>
                    <p className="text-sm text-muted-foreground">We maintain a curated selection of luxury supercars including Ferrari, Lamborghini, and McLaren models. Our inventory is updated daily.</p>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-semibold mb-2">How do I schedule a test drive?</h4>
                    <p className="text-sm text-muted-foreground">You can schedule through our AI assistant, call us directly, or use our online booking system. Valid license and insurance required.</p>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-semibold mb-2">What financing options are available?</h4>
                    <p className="text-sm text-muted-foreground">We offer competitive financing with rates starting at 4.9% APR, leasing options, and can work with your preferred lender.</p>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-semibold mb-2">Do you accept trade-ins?</h4>
                    <p className="text-sm text-muted-foreground">Yes! We accept trade-ins and offer competitive valuations for luxury vehicles. Our experts will assess your vehicle's value.</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-card-border bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-semibold">Phone</p>
                      <p className="text-sm text-muted-foreground">(555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MessageCircle className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-sm text-muted-foreground">info@fastfuriousshowroom.com</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Calendar className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-semibold">Hours</p>
                      <div className="text-sm text-muted-foreground">
                        <p>Mon-Sat: 9:00 AM - 8:00 PM</p>
                        <p>Sunday: 10:00 AM - 6:00 PM</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AIReceptionist;