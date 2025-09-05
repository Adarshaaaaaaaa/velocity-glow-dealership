import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Car, MessageCircle, X } from 'lucide-react';

export const FloatingCTA = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-4">
      {/* AI Chat Toggle */}
      <div className="relative">
        {isExpanded && (
          <div className="absolute bottom-14 right-0 w-80 h-96 bg-card border border-card-border rounded-lg shadow-luxury animate-scale-in overflow-hidden">
            <div className="bg-gradient-neon p-4 text-background flex justify-between items-center">
              <h3 className="font-semibold">AI Assistant</h3>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => setIsExpanded(false)}
                className="text-background hover:bg-background/20 h-6 w-6 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-4 space-y-4 h-64 overflow-y-auto">
              <div className="flex items-start space-x-2">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <MessageCircle className="h-4 w-4 text-background" />
                </div>
                <div className="flex-1 bg-muted p-3 rounded-lg rounded-tl-none">
                  <p className="text-sm">Hi! I'm your AI assistant. How can I help you today?</p>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="bg-primary text-primary-foreground p-3 rounded-lg rounded-tr-none max-w-xs">
                  <p className="text-sm">I'm looking for a sports car</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <MessageCircle className="h-4 w-4 text-background" />
                </div>
                <div className="flex-1 bg-muted p-3 rounded-lg rounded-tl-none">
                  <p className="text-sm">Great! I can help you find the perfect sports car. What's your budget range?</p>
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-card-border">
              <Link to="/ai-receptionist" onClick={() => setIsExpanded(false)}>
                <Button className="w-full neon-hover">
                  Open Full Chat
                </Button>
              </Link>
            </div>
          </div>
        )}
        
        <Button
          size="lg"
          className="rounded-full shadow-neon hover:shadow-neon-lg transition-all duration-300 animate-glow-pulse"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <MessageCircle className="h-5 w-5 mr-2" />
          AI Chat
        </Button>
      </div>

      {/* Book Test Drive CTA */}
      <Link to="/test-drive">
        <Button 
          size="lg" 
          variant="secondary"
          className="rounded-full shadow-luxury hover:scale-105 transition-all duration-300 group"
        >
          <Car className="h-5 w-5 mr-2 group-hover:animate-float" />
          Book Test Drive
        </Button>
      </Link>
    </div>
  );
};