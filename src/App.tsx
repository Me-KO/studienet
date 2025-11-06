import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProgressProvider } from "./contexts/ProgressContext";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import FAQ from "./pages/FAQ";
import NotFound from "./pages/NotFound";
import CyberpunkTerminal from "./components/CyberpunkTerminal";
import DebuggerDetector from "./components/DebuggerDetector";
import SecretZone from "./pages/SecretZone";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ProgressProvider>
        <CyberpunkTerminal />
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <DebuggerDetector />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Index />} />
              <Route path="/faq" element={<FAQ />} />
            </Route>
            {/* DedSec: Secret routes for those who dare to look... */}
            <Route path="/h4ck3r_z0n3" element={<SecretZone />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ProgressProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
