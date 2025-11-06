import { useEffect, useState } from "react";
import {
  BookOpen,
  Target,
  Heart,
  Lock,
  Bot,
  Trophy,
  LockKeyhole,
} from "lucide-react";
import { useProgress } from "@/contexts/ProgressContext";

const checkpoints = [
  { id: "bronvermelding", label: "Les 1: Bronvermelding", icon: BookOpen },
  { id: "rechten", label: "Les 2: Rechten", icon: Target },
  { id: "feedback", label: "Les 3: Feedback", icon: Heart },
  { id: "privacy", label: "Les 4: Privacy", icon: Lock },
  { id: "gdpr", label: "Les 5: GDPR", icon: Bot },
];

const MiniMapNav = () => {
  const { unlockedCheckpoints } = useProgress();
  const [activeSection, setActiveSection] = useState("bronvermelding");

  useEffect(() => {
    const handleScroll = () => {
      const sections = checkpoints.map((cp) => document.getElementById(cp.id));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(checkpoints[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string, index: number) => {
    const isLocked = !unlockedCheckpoints.includes(index);
    if (isLocked) return; // Don't scroll to locked sections
    
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Desktop: Sticky left rail */}
      <nav className="hidden lg:block fixed left-8 top-1/2 -translate-y-1/2 z-40">
        <div className="bg-card/30 backdrop-blur-sm rounded-2xl shadow-lg p-4 space-y-2">
          {checkpoints.map((checkpoint, index) => {
            const Icon = checkpoint.icon;
            const isActive = activeSection === checkpoint.id;
            const isLocked = !unlockedCheckpoints.includes(index);
            return (
              <button
                key={checkpoint.id}
                onClick={() => scrollToSection(checkpoint.id, index)}
                disabled={isLocked}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                  isLocked
                    ? "opacity-40 cursor-not-allowed text-muted-foreground"
                    : isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "hover:bg-muted text-muted-foreground hover:text-foreground"
                }`}
                title={isLocked ? "Voltooi de vorige les om deze te ontgrendelen" : checkpoint.label}
              >
                {isLocked ? (
                  <LockKeyhole className="w-5 h-5 flex-shrink-0" />
                ) : (
                  <Icon className="w-5 h-5 flex-shrink-0" />
                )}
                <span className="text-sm font-medium whitespace-nowrap">
                  {checkpoint.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Mobile: Horizontal scrollable chips */}
      <nav className="lg:hidden sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 p-4 min-w-max">
            {checkpoints.map((checkpoint, index) => {
              const Icon = checkpoint.icon;
              const isActive = activeSection === checkpoint.id;
              const isLocked = !unlockedCheckpoints.includes(index);
              return (
                <button
                  key={checkpoint.id}
                  onClick={() => scrollToSection(checkpoint.id, index)}
                  disabled={isLocked}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all whitespace-nowrap ${
                    isLocked
                      ? "opacity-40 cursor-not-allowed bg-card text-muted-foreground"
                      : isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-card hover:bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {isLocked ? (
                    <LockKeyhole className="w-4 h-4" />
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}
                  <span className="text-sm font-medium">{checkpoint.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
};

export default MiniMapNav;
