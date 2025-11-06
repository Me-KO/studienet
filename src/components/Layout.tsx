import { Button } from "@/components/ui/button";
import { Link, Outlet } from "react-router-dom";
import { Network, HelpCircle, Home } from "lucide-react";

const Layout = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Network className="w-6 h-6 text-primary" />
              <span className="font-bold text-lg">THE NET</span>
            </Link>
            <div className="hidden md:flex gap-4">
              <Link to="/">
                <Button variant="ghost">
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </Button>
              </Link>
              <Link to="/faq">
                <Button variant="ghost">
                  <HelpCircle className="w-4 h-4 mr-2" />
                  FAQ
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <Outlet />

      {/* Footer */}
      <footer className="bg-card/95 backdrop-blur-sm border-t-2 border-primary/20 py-8 sm:py-12 shadow-lg">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
            <div>
              <h3 className="font-bold mb-3 sm:mb-4 text-base sm:text-lg">StudieNET</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Jouw route door de lessen onboarding. Veel plezier en success! ~ Mede student ;) Deze website bevat een
                geheim, kan jij het vinden?
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-3 sm:mb-4 text-base sm:text-lg">Links</h3>
              <div className="space-y-2 text-xs sm:text-sm">
                <Link to="/" className="block hover:text-primary transition-colors">
                  Home
                </Link>
                <Link to="/faq" className="block hover:text-primary transition-colors">
                  FAQ
                </Link>
              </div>
            </div>
            <div></div>
          </div>
          <div className="text-center text-xs sm:text-sm text-muted-foreground pt-6 sm:pt-8 border-t border-border">
            <p>© 2025 StudieNET. Educatieve tool - Made for fun - geen vervanging van officiële beleidsinfo.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default Layout;
