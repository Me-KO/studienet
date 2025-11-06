import { Button } from "@/components/ui/button";
import { LucideIcon, Lock } from "lucide-react";
import { ReactNode } from "react";

interface CheckpointCardProps {
  id: string;
  icon: LucideIcon;
  emoji: string;
  title: string;
  lead: string;
  bullets: string[];
  proTip: string;
  ctaText: string;
  ctaAction?: () => void;
  children?: ReactNode;
  variant: "success" | "privacy" | "reflection" | "final";
  isLocked?: boolean;
}

const CheckpointCard = ({
  id,
  icon: Icon,
  emoji,
  title,
  lead,
  bullets,
  proTip,
  ctaText,
  ctaAction,
  children,
  variant,
  isLocked = false,
}: CheckpointCardProps) => {
  const variantStyles = {
    success: "border-l-4 border-l-success-green bg-success-green/10 border border-success-green/30 glow-green",
    privacy: "border-l-4 border-l-secondary bg-secondary/10 border border-secondary/30 glow-cyan",
    reflection: "border-l-4 border-l-primary bg-primary/10 border border-primary/30 glow-yellow",
    final: "border-l-4 border-l-primary bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary/50 glow-yellow",
  };

  const iconColors = {
    success: "text-success-green glow-green",
    privacy: "text-secondary glow-cyan",
    reflection: "text-primary glow-yellow",
    final: "text-primary glow-yellow",
  };

  return (
    <div
      id={id}
      className={`checkpoint-card rounded-lg p-4 sm:p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all scroll-mt-24 backdrop-blur-sm ${
        isLocked ? "opacity-60 border-l-4 border-l-muted bg-muted/10 border border-muted/30" : variantStyles[variant]
      }`}
    >
      <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
        <div className={`flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-lg bg-card/50 border-2 flex items-center justify-center shadow-sm ${
          isLocked ? "text-muted-foreground border-muted" : `${iconColors[variant]} border-current`
        }`}>
          {isLocked ? <Lock className="w-6 h-6 sm:w-8 sm:h-8" /> : <Icon className="w-6 h-6 sm:w-8 sm:h-8" />}
        </div>
        
        <div className="flex-1 space-y-3 sm:space-y-4 w-full">
          <div>
            <div className="flex items-center gap-2 sm:gap-3 mb-2">
              {!isLocked && <span className="text-2xl sm:text-3xl">{emoji}</span>}
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-foreground uppercase tracking-wide">
                {isLocked ? "◉ Vergrendeld Level" : title}
              </h3>
              {isLocked && <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground ml-auto" />}
            </div>
            <p className="text-base sm:text-lg text-muted-foreground">
              {isLocked ? "Voltooi de vorige checkpoint om dit level te ontgrendelen" : lead}
            </p>
          </div>

          {!isLocked && (
            <>
              <ul className="space-y-2">
                {bullets.map((bullet, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className={`mt-1 font-bold ${
                      variant === "success" ? "text-success-green" :
                      variant === "privacy" ? "text-secondary" :
                      variant === "reflection" ? "text-primary" :
                      "text-primary"
                    }`}>▸</span>
                    <span className="text-sm sm:text-base text-foreground">{bullet}</span>
                  </li>
                ))}
              </ul>

              {proTip && (
                <div className={`rounded-lg p-3 sm:p-4 border-2 ${
                  variant === "success" ? "bg-success-green/20 border-success-green/50" :
                  variant === "privacy" ? "bg-secondary/20 border-secondary/50" :
                  variant === "reflection" ? "bg-primary/20 border-primary/50" :
                  "bg-primary/20 border-primary/50"
                }`}>
                  <p className="text-xs sm:text-sm font-semibold text-foreground flex items-start gap-2">
                    <span>💡</span>
                    <span className="font-mono">
                      <strong className="uppercase tracking-wide">Pro-tip:</strong> {proTip}
                    </span>
                  </p>
                </div>
              )}

              {children}

              {ctaText && (
                <Button
                  onClick={ctaAction}
                  variant="outline"
                  className={`font-bold uppercase tracking-wider border-2 transition-all ${
                    variant === "success" ? "border-success-green text-success-green hover:bg-success-green hover:text-primary-foreground glow-green" :
                    variant === "privacy" ? "border-secondary text-secondary hover:bg-secondary hover:text-primary-foreground glow-cyan" :
                    variant === "reflection" ? "border-primary text-primary hover:bg-primary hover:text-primary-foreground glow-yellow" :
                    "border-primary text-primary hover:bg-primary hover:text-primary-foreground glow-yellow"
                  }`}
                >
                  {ctaText}
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckpointCard;
