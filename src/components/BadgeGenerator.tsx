import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import confetti from "canvas-confetti";
import { Download, Trophy } from "lucide-react";
import { toast } from "sonner";

interface BadgeGeneratorProps {
  variant?: "default" | "survivor";
}

const BadgeGenerator = ({ variant = "default" }: BadgeGeneratorProps) => {
  const [studentName, setStudentName] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [canvasDataUrl, setCanvasDataUrl] = useState("");

  const isSurvivor = variant === "survivor";

  const generatePreview = () => {
    if (!studentName.trim()) {
      toast.error("Vul je naam in om je badge te genereren");
      return;
    }

    // Create canvas for badge
    const canvas = document.createElement("canvas");
    canvas.width = 800;
    canvas.height = 600;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    if (isSurvivor) {
      // DedSec hacker themed background - dark with grid
      ctx.fillStyle = "#0a0e1a";
      ctx.fillRect(0, 0, 800, 600);

      // Grid pattern overlay
      ctx.strokeStyle = "#00ff41";
      ctx.globalAlpha = 0.1;
      ctx.lineWidth = 1;
      for (let i = 0; i < 800; i += 20) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, 600);
        ctx.stroke();
      }
      for (let i = 0; i < 600; i += 20) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(800, i);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      // Glitch effect bars
      ctx.fillStyle = "#ff0040";
      ctx.globalAlpha = 0.3;
      ctx.fillRect(50, 80, 700, 3);
      ctx.fillRect(50, 540, 700, 3);
      ctx.globalAlpha = 1;

      // Border - hacker green
      ctx.strokeStyle = "#00ff41";
      ctx.lineWidth = 4;
      ctx.strokeRect(20, 20, 760, 560);

      // Inner border
      ctx.strokeStyle = "#00ff41";
      ctx.lineWidth = 2;
      ctx.strokeRect(30, 30, 740, 540);

      // Title - glitchy style
      ctx.fillStyle = "#00ff41";
      ctx.font = "bold 52px monospace";
      ctx.textAlign = "center";
      ctx.fillText("[ SURVIVOR BADGE ]", 400, 100);

      // Glitch effect on title
      ctx.fillStyle = "#ff0040";
      ctx.globalAlpha = 0.5;
      ctx.fillText("[ SURVIVOR BADGE ]", 402, 98);
      ctx.fillStyle = "#00ffff";
      ctx.fillText("[ SURVIVOR BADGE ]", 398, 102);
      ctx.globalAlpha = 1;

      // Subtitle
      ctx.fillStyle = "#ffffff";
      ctx.font = "20px monospace";
      ctx.fillText("BOSS DEFEATED - SYSTEM COMPROMISED", 400, 140);
    } else {
      // Regular background gradient
      const gradient = ctx.createLinearGradient(0, 0, 800, 600);
      gradient.addColorStop(0, "#1e40af");
      gradient.addColorStop(1, "#7c3aed");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 800, 600);

      // Border
      ctx.strokeStyle = "#fbbf24";
      ctx.lineWidth = 10;
      ctx.strokeRect(20, 20, 760, 560);

      // Title
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 48px Arial";
      ctx.textAlign = "center";
      ctx.fillText("YOU WIN!", 400, 100);

      // Subtitle
      ctx.font = "24px Arial";
      ctx.fillText("5 Lessen Succesvol Afgerond", 400, 150);
    }

    // Name
    if (isSurvivor) {
      ctx.font = "bold 48px monospace";
      ctx.fillStyle = "#00ff41";
      ctx.fillText(`> ${studentName.toUpperCase()}`, 400, 310);

      // Glitch effect on name
      ctx.globalAlpha = 0.5;
      ctx.fillStyle = "#ff0040";
      ctx.fillText(`> ${studentName.toUpperCase()}`, 402, 308);
      ctx.fillStyle = "#00ffff";
      ctx.fillText(`> ${studentName.toUpperCase()}`, 398, 312);
      ctx.globalAlpha = 1;
    } else {
      ctx.font = "bold 56px Arial";
      ctx.fillStyle = "#fbbf24";
      ctx.fillText(studentName, 400, 250);
    }

    // Achievement text
    ctx.fillStyle = "#ffffff";
    if (isSurvivor) {
      ctx.font = "18px monospace";
      ctx.fillText("[ ACCESS GRANTED ]", 400, 350);
      ctx.fillText("THREAT NEUTRALIZED // SYSTEM BREACHED", 400, 380);
      ctx.fillText("STATUS: PERIODE 1 ONBOARDING SURVIVED", 400, 410);
    } else {
      ctx.font = "20px Arial";
      ctx.fillText("heeft succesvol alle 5 lessen doorlopen en", 400, 310);
      ctx.fillText("de essentiële studievaardigheden gemeesterd!", 400, 345);
    }

    // Skills
    if (isSurvivor) {
      ctx.font = "bold 16px monospace";
      ctx.textAlign = "left";
      ctx.fillStyle = "#00ff41";
      ctx.fillText("[X] BRONVERMELDING", 100, 450);
      ctx.fillText("[X] RECHTEN & PLICHTEN", 100, 480);
      ctx.fillText("[X] FEEDBACKGELETTERDHEID", 100, 510);

      ctx.fillText("[X] PRIVACY & AVG", 450, 450);
      ctx.fillText("[X] GDPR & NIS2", 450, 480);
      ctx.fillText("[X] STUDIEVAARDIGHEDEN", 450, 510);
    } else {
      ctx.font = "bold 18px Arial";
      ctx.textAlign = "left";
      ctx.fillText("[ ] BRONVERMELDING", 100, 420);
      ctx.fillText("[ ] RECHTEN & PLICHTEN", 100, 455);
      ctx.fillText("[ ] FEEDBACKGELETTERDHEID", 100, 490);

      ctx.fillText("[ ] PRIVACY & AVG", 450, 420);
      ctx.fillText("[ ] GDPR & NIS2", 450, 455);
      ctx.fillText("[ ] STUDIEVAARDIGHEDEN", 450, 490);
    }

    // Date
    ctx.textAlign = "center";
    if (isSurvivor) {
      ctx.font = "14px monospace";
      ctx.fillStyle = "#00ff41";
      const today = new Date().toLocaleDateString("nl-NL");
      ctx.fillText(`>> TIMESTAMP: ${today} | ID: ${Math.random().toString(36).substr(2, 9).toUpperCase()}`, 400, 555);
    } else {
      ctx.font = "16px Arial";
      ctx.fillStyle = "#ffffff";
      const today = new Date().toLocaleDateString("nl-NL");
      ctx.fillText(`Behaald op: ${today}`, 400, 570);
    }

    // Store canvas data and show preview
    const dataUrl = canvas.toDataURL();
    setCanvasDataUrl(dataUrl);
    setShowPreview(true);

    // Trigger confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#fbbf24", "#7c3aed", "#1e40af", "#f43f5e"],
    });
  };

  const downloadBadge = () => {
    const link = document.createElement("a");
    const filename = isSurvivor
      ? `survivor-badge-${studentName.replace(/\s+/g, "-").toLowerCase()}.png`
      : `studiestart-badge-${studentName.replace(/\s+/g, "-").toLowerCase()}.png`;
    link.download = filename;
    link.href = canvasDataUrl;
    link.click();

    toast.success(isSurvivor ? ">> SURVIVOR BADGE DOWNLOADED | SYSTEM BREACH COMPLETE" : "Badge gedownload!");
  };

  const resetPreview = () => {
    setShowPreview(false);
    setCanvasDataUrl("");
    setStudentName("");
  };

  return (
    <Card
      className={`p-6 mt-6 border-2 ${
        isSurvivor
          ? "border-destructive/40 bg-gradient-to-br from-destructive/10 to-primary/10"
          : "border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5"
      }`}
    >
      <div className="flex flex-col items-center space-y-4">
        <div
          className={`flex items-center gap-2 text-xl font-bold font-mono ${
            isSurvivor ? "text-success-green" : "text-primary"
          }`}
        >
          <Trophy className="w-6 h-6" />
          <span>{isSurvivor ? "[ DOWNLOAD SURVIVOR BADGE ]" : "Download je Badge"}</span>
        </div>
        {!showPreview ? (
          <>
            <p className={`text-center ${isSurvivor ? "font-mono text-success-green" : "text-muted-foreground"}`}>
              {isSurvivor
                ? ">> ACCESS GRANTED | BOSS DEFEATED | ENTER NAME FOR BADGE"
                : "Gefeliciteerd! Vul je naam in en bekijk je persoonlijke badge."}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
              <Input
                type="text"
                placeholder="Jouw naam"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="flex-1"
                onKeyDown={(e) => e.key === "Enter" && generatePreview()}
              />
              <Button onClick={generatePreview} className="gap-2">
                <Trophy className="w-4 h-4" />
                Genereer Preview
              </Button>
            </div>
          </>
        ) : (
          <>
            <p
              className={`text-center font-semibold ${isSurvivor ? "font-mono text-success-green" : "text-muted-foreground"}`}
            >
              {isSurvivor
                ? ">> BADGE GENERATED | DOWNLOAD READY"
                : "Zo ziet je badge eruit! Tevreden? Download hem hieronder of maak een screenshot."}
            </p>

            {/* Preview Image */}
            <div className="w-full max-w-2xl border-4 border-primary rounded-lg overflow-hidden shadow-xl">
              <img src={canvasDataUrl} alt="Badge Preview" className="w-full h-auto" />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
              <Button onClick={downloadBadge} className="flex-1 gap-2" size="lg">
                <Download className="w-4 h-4" />
                Download Badge
              </Button>
              <Button onClick={resetPreview} variant="outline" className="flex-1" size="lg">
                Opnieuw Genereren
              </Button>
            </div>
          </>
        )}
      </div>
    </Card>
  );
};

export default BadgeGenerator;
