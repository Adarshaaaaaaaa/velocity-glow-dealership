import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calculator, DollarSign, TrendingUp, Percent, Calendar, PiggyBank, Save } from 'lucide-react';

interface CalculationResult {
  monthlyPayment: number;
  totalInterest: number;
  totalAmount: number;
  loanAmount: number;
}

const Finance = () => {
  const [vehiclePrice, setVehiclePrice] = useState(280000);
  const [downPayment, setDownPayment] = useState(56000);
  const [interestRate, setInterestRate] = useState(4.9);
  const [loanTerm, setLoanTerm] = useState(60);
  const [results, setResults] = useState<CalculationResult | null>(null);
  const [savedCalculations, setSavedCalculations] = useState<Array<CalculationResult & { id: string; vehiclePrice: number; date: string }>>([]);

  useEffect(() => {
    calculatePayment();
  }, [vehiclePrice, downPayment, interestRate, loanTerm]);

  useEffect(() => {
    // Load saved calculations from localStorage
    const saved = localStorage.getItem('financeCalculations');
    if (saved) {
      setSavedCalculations(JSON.parse(saved));
    }
  }, []);

  const calculatePayment = () => {
    const principal = vehiclePrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTerm;

    if (principal <= 0 || monthlyRate <= 0 || numPayments <= 0) {
      setResults(null);
      return;
    }

    const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                          (Math.pow(1 + monthlyRate, numPayments) - 1);
    
    const totalAmount = monthlyPayment * numPayments;
    const totalInterest = totalAmount - principal;

    setResults({
      monthlyPayment,
      totalInterest,
      totalAmount,
      loanAmount: principal
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const saveCalculation = () => {
    if (!results) return;

    const calculation = {
      id: Date.now().toString(),
      ...results,
      vehiclePrice,
      date: new Date().toLocaleDateString()
    };

    const updated = [calculation, ...savedCalculations.slice(0, 9)]; // Keep only 10 most recent
    setSavedCalculations(updated);
    localStorage.setItem('financeCalculations', JSON.stringify(updated));
  };

  const loadPresetVehicle = (price: number) => {
    setVehiclePrice(price);
    setDownPayment(Math.round(price * 0.2)); // 20% down payment
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-neon bg-clip-text text-transparent">Finance</span> Calculator
          </h1>
          <p className="text-xl text-muted-foreground">Plan your luxury car purchase with confidence</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calculator Input */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-card-border bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calculator className="mr-2 h-5 w-5 text-primary" />
                  Loan Calculator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Vehicle Price */}
                <div className="space-y-3">
                  <Label htmlFor="vehiclePrice">Vehicle Price</Label>
                  <Input
                    id="vehiclePrice"
                    type="number"
                    value={vehiclePrice}
                    onChange={(e) => setVehiclePrice(Number(e.target.value))}
                    className="bg-background border-card-border"
                  />
                  <div className="flex gap-2 flex-wrap">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => loadPresetVehicle(280000)}
                      className="neon-hover"
                    >
                      Ferrari ($280K)
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => loadPresetVehicle(320000)}
                      className="neon-hover"
                    >
                      McLaren ($320K)
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => loadPresetVehicle(450000)}
                      className="neon-hover"
                    >
                      Lamborghini ($450K)
                    </Button>
                  </div>
                </div>

                {/* Down Payment */}
                <div className="space-y-3">
                  <Label>Down Payment: {formatCurrency(downPayment)} ({((downPayment / vehiclePrice) * 100).toFixed(1)}%)</Label>
                  <Slider
                    value={[downPayment]}
                    onValueChange={(values) => setDownPayment(values[0])}
                    max={vehiclePrice * 0.5}
                    min={vehiclePrice * 0.1}
                    step={1000}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>10% ({formatCurrency(vehiclePrice * 0.1)})</span>
                    <span>50% ({formatCurrency(vehiclePrice * 0.5)})</span>
                  </div>
                </div>

                {/* Interest Rate */}
                <div className="space-y-3">
                  <Label>Interest Rate: {interestRate}% APR</Label>
                  <Slider
                    value={[interestRate]}
                    onValueChange={(values) => setInterestRate(values[0])}
                    max={12}
                    min={2}
                    step={0.1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>2.0%</span>
                    <span>12.0%</span>
                  </div>
                </div>

                {/* Loan Term */}
                <div className="space-y-3">
                  <Label htmlFor="loanTerm">Loan Term</Label>
                  <Select value={loanTerm.toString()} onValueChange={(value) => setLoanTerm(Number(value))}>
                    <SelectTrigger className="bg-background border-card-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="36">36 months (3 years)</SelectItem>
                      <SelectItem value="48">48 months (4 years)</SelectItem>
                      <SelectItem value="60">60 months (5 years)</SelectItem>
                      <SelectItem value="72">72 months (6 years)</SelectItem>
                      <SelectItem value="84">84 months (7 years)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Payment Breakdown Chart */}
            {results && (
              <Card className="border-card-border bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="mr-2 h-5 w-5 text-primary" />
                    Payment Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <p className="text-sm text-muted-foreground">Principal</p>
                      <p className="text-xl font-bold text-primary">{formatCurrency(results.loanAmount)}</p>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <p className="text-sm text-muted-foreground">Total Interest</p>
                      <p className="text-xl font-bold text-secondary">{formatCurrency(results.totalInterest)}</p>
                    </div>
                  </div>
                  
                  {/* Visual breakdown */}
                  <div className="w-full bg-muted rounded-full h-4 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-700"
                      style={{ 
                        width: `${(results.loanAmount / results.totalAmount) * 100}%`
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center">
                      <div className="w-3 h-3 bg-primary rounded mr-2" />
                      Principal: {((results.loanAmount / results.totalAmount) * 100).toFixed(1)}%
                    </span>
                    <span className="flex items-center">
                      <div className="w-3 h-3 bg-secondary rounded mr-2" />
                      Interest: {((results.totalInterest / results.totalAmount) * 100).toFixed(1)}%
                    </span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Results & Actions */}
          <div className="space-y-6">
            {/* Monthly Payment Result */}
            {results && (
              <Card className="border-card-border bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <DollarSign className="mr-2 h-5 w-5 text-primary" />
                    Payment Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-2">Monthly Payment</p>
                    <p className="text-4xl font-bold bg-gradient-neon bg-clip-text text-transparent">
                      {formatCurrency(results.monthlyPayment)}
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Loan Amount:</span>
                      <span className="font-semibold">{formatCurrency(results.loanAmount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Interest:</span>
                      <span className="font-semibold">{formatCurrency(results.totalInterest)}</span>
                    </div>
                    <div className="flex justify-between border-t border-card-border pt-2">
                      <span className="text-muted-foreground">Total Amount:</span>
                      <span className="font-bold">{formatCurrency(results.totalAmount)}</span>
                    </div>
                  </div>

                  <Button onClick={saveCalculation} className="w-full neon-hover">
                    <Save className="mr-2 h-4 w-4" />
                    Save Calculation
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Financing Options */}
            <Card className="border-card-border bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Percent className="mr-2 h-5 w-5 text-primary" />
                  Financing Options
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border border-card-border rounded-lg">
                  <h4 className="font-semibold mb-2 text-primary">Excellent Credit (750+)</h4>
                  <p className="text-sm text-muted-foreground">Rates as low as 4.9% APR</p>
                </div>
                <div className="p-4 border border-card-border rounded-lg">
                  <h4 className="font-semibold mb-2">Good Credit (700-749)</h4>
                  <p className="text-sm text-muted-foreground">Rates from 5.9% APR</p>
                </div>
                <div className="p-4 border border-card-border rounded-lg">
                  <h4 className="font-semibold mb-2">Fair Credit (650-699)</h4>
                  <p className="text-sm text-muted-foreground">Rates from 7.9% APR</p>
                </div>
                
                <div className="mt-4 p-4 bg-gradient-glow rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <PiggyBank className="mr-2 h-4 w-4" />
                    Special Offers
                  </h4>
                  <ul className="text-sm space-y-1">
                    <li>• 0.9% APR for qualified buyers</li>
                    <li>• No payments for 90 days</li>
                    <li>• Flexible lease options</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Saved Calculations */}
            {savedCalculations.length > 0 && (
              <Card className="border-card-border bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="mr-2 h-5 w-5 text-primary" />
                    Saved Calculations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {savedCalculations.slice(0, 5).map((calc) => (
                    <div key={calc.id} className="p-3 border border-card-border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                         onClick={() => {
                           setVehiclePrice(calc.vehiclePrice);
                           // Could restore other values too
                         }}>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-semibold">{formatCurrency(calc.monthlyPayment)}/mo</p>
                          <p className="text-sm text-muted-foreground">{formatCurrency(calc.vehiclePrice)} vehicle</p>
                        </div>
                        <p className="text-xs text-muted-foreground">{calc.date}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Finance;