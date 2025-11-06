import { Button } from "@/components/ui/button";
import { Compass } from "lucide-react";
import heroMap from "@/assets/hero-map.jpg";

const Hero = () => {
  const scrollToCheckpoints = () => {
    const checkpointsSection = document.getElementById("checkpoints");
    checkpointsSection?.scrollIntoView({
      behavior: "smooth"
    });
  };
  const openQuiz = () => {
    const event = new CustomEvent("openQuiz");
    window.dispatchEvent(event);
  };
  return <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
          {/* Neon badge */}
          <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/50 px-3 sm:px-6 py-2 sm:py-3 rounded-lg animate-fade-in glow-yellow">
            <Compass className="w-4 h-4 sm:w-5 sm:h-5 text-primary animate-spin" style={{
            animationDuration: "8s"
          }} />
            <span className="text-xs sm:text-sm font-bold text-primary uppercase tracking-wider font-mono">
              JOUW ROUTE DOOR DE WETGEVINGJUNGLE
            </span>
          </div>

          {/* Cyberpunk title with neon glow */}
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold font-heading text-foreground animate-fade-in text-neon-glow" style={{
          animationDelay: "0.1s"
        }}>
            Welkom op
            <br />
            <span className="text-primary animate-neon-pulse">STUDIE-NET</span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-secondary font-sans max-w-2xl mx-auto animate-fade-in tracking-wide" style={{
          animationDelay: "0.2s"
        }}>
            Overleef jij periode 1?
          </p>

          {/* CTA Buttons with neon effects */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in" style={{
          animationDelay: "0.3s"
        }}>
            <Button size="lg" onClick={scrollToCheckpoints} className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold uppercase tracking-wider border-2 border-primary glow-yellow hover:glow-yellow transition-all">
              ▶ Start de route
            </Button>
            
          </div>

          {/* Feature cards with cyberpunk styling */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12 max-w-3xl mx-auto animate-fade-in" style={{
          animationDelay: "0.4s"
        }}>
            <div className="bg-card/60 backdrop-blur-sm p-4 sm:p-6 rounded-lg border border-primary/30 hover:border-primary/60 transition-all glow-yellow hover:glow-yellow">
              <div className="text-3xl sm:text-4xl mb-2">🗺️</div>
              <h3 className="font-bold font-heading text-primary uppercase tracking-wider mb-1 text-sm sm:text-base">Start</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">Begin je quest</p>
            </div>
            <div className="bg-card/60 backdrop-blur-sm p-4 sm:p-6 rounded-lg border border-secondary/30 hover:border-secondary/60 transition-all glow-cyan hover:glow-cyan">
              <div className="text-3xl sm:text-4xl mb-2">🏳️</div>
              <h3 className="font-bold font-heading text-secondary uppercase tracking-wider mb-1 text-sm sm:text-base">Doorloop</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">8 checkpoints in 5-7 minuten</p>
            </div>
            <div className="bg-card/60 backdrop-blur-sm p-4 sm:p-6 rounded-lg border border-primary/30 hover:border-primary/60 transition-all glow-yellow hover:glow-yellow">
              <div className="text-3xl sm:text-4xl mb-2">🎖️</div>
              <h3 className="font-bold font-heading text-primary uppercase tracking-wider mb-1 text-sm sm:text-base">Badge</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">Ontvang je badge na de eindbaas</p>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;