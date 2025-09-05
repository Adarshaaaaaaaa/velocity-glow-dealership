import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { FloatingCTA } from "./components/layout/FloatingCTA";
import Homepage from "./pages/Homepage";
import Inventory from "./pages/Inventory";
import InventoryDetails from "./pages/InventoryDetails";
import TestDrive from "./pages/TestDrive";
import AIReceptionist from "./pages/AIReceptionist";
import Finance from "./pages/Finance";
import About from "./pages/About";
import Testimonials from "./pages/Testimonials";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Account from "./pages/Account";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/inventory/:id" element={<InventoryDetails />} />
              <Route path="/test-drive" element={<TestDrive />} />
              <Route path="/ai-receptionist" element={<AIReceptionist />} />
              <Route path="/finance" element={<Finance />} />
              <Route path="/about" element={<About />} />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/account" element={<Account />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <FloatingCTA />
        </BrowserRouter>
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
