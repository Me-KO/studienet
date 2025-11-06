import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import confetti from "canvas-confetti";
import { Shield, Lock, Eye, Code, Terminal, Timer, Trophy, Zap, Crown } from "lucide-react";

// Hacker nickname generator
const generateHackerName = () => {
  const prefixes = ["Crypt0", "LUK4", "Shad0w", "D0aK3s"];
  const suffixes = ["Hunt3r", "D3str0y3r", "Butch3r"];
  const numbers = ["", "42", "69", "99", "13", "404", "666", "777", "1337"];

  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  const number = numbers[Math.floor(Math.random() * numbers.length)];

  return `${prefix}${suffix}${number}`;
};

type LeaderboardEntry = {
  name: string;
  time: number;
  rank: string;
  timestamp: number;
};

const getLeaderboard = (): LeaderboardEntry[] => {
  try {
    const stored = localStorage.getItem("hackzone_leaderboard");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveToLeaderboard = (entry: LeaderboardEntry) => {
  try {
    const leaderboard = getLeaderboard();
    leaderboard.push(entry);
    leaderboard.sort((a, b) => a.time - b.time);
    const top10 = leaderboard.slice(0, 10);
    localStorage.setItem("hackzone_leaderboard", JSON.stringify(top10));
    return top10;
  } catch {
    return [];
  }
};

const SecretZone = () => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [finalTime, setFinalTime] = useState<number | null>(null);
  const [hackerName] = useState(generateHackerName());
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const startTimeRef = useRef<number>(Date.now());
  const timerIntervalRef = useRef<number | null>(null);

  // Console clues voor hackers die F12 gebruiken
  useEffect(() => {
    console.log(
      "%c🎯 Nice, je hebt de secretzone gevonden!",
      "color: #FFD700; font-size: 20px; font-weight: bold; text-shadow: 0 0 10px #FFD700;",
    );
    console.log("%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", "color: #00FFFF;");
    console.log("%c🔐 Clue voor het wachtwoord:", "color: #FF1493; font-size: 16px; font-weight: bold;");
    console.log("%c   Deel 1: C0D3", "color: #00FFFF; font-size: 14px;");
    console.log("%c   Deel 2: HUNT3R", "color: #00FFFF; font-size: 14px;");
    console.log("%c   💡 Succes!", "color: #FFD700; font-size: 14px;");
    console.log("%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", "color: #00FFFF;");
    console.log(
      "%c🕵️ Tip: Bekijk de HTML comments in de DOM...",
      "color: #FF1493; font-size: 12px; font-style: italic;",
    );
    console.log("%c⏱️ Timer gestart! Hoe snel kun jij het kraken?", "color: #FFD700; font-size: 14px;");

    // Start timer
    startTimeRef.current = Date.now();
    timerIntervalRef.current = window.setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTimeRef.current) / 1000));
    }, 1000);

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, []);

  const getSpeedrunBadge = (seconds: number) => {
    if (seconds <= 30) {
      return {
        title: "⚡ LIGHTNING FAST",
        color: "bg-gradient-to-r from-yellow-400 to-orange-500",
        message: "LEGENDARY! Je bent een natuurtalent!",
        rank: "S-RANK",
      };
    } else if (seconds <= 60) {
      return {
        title: "🔥 SPEED DEMON",
        color: "bg-gradient-to-r from-orange-400 to-red-500",
        message: "Wow! Sneller dan de verbinding naar mijn localhost!",
        rank: "A-RANK",
      };
    } else if (seconds <= 120) {
      return {
        title: "💨 QUICK THINKER",
        color: "bg-gradient-to-r from-blue-400 to-cyan-500",
        message: "Goed gedaan!",
        rank: "B-RANK",
      };
    } else if (seconds <= 300) {
      return {
        title: "🎯 CODE BREAKER",
        color: "bg-gradient-to-r from-green-400 to-emerald-500",
        message: "Gelukt! Je hebt de code gekraakt!",
        rank: "C-RANK",
      };
    } else {
      return {
        title: "🐢 PERSISTENT HACKER",
        color: "bg-gradient-to-r from-purple-400 to-pink-500",
        message: "Perfection takes time, je hebt het gehaald!",
        rank: "D-RANK",
      };
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // DedSec password hint: C0D3 + HUNT3R
    if (password.toUpperCase() === "C0D3HUNT3R") {
      // Stop timer
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
      const completionTime = Math.floor((Date.now() - startTimeRef.current) / 1000);
      setFinalTime(completionTime);
      setUnlocked(true);
      setError(false);

      // Save to leaderboard
      const newEntry: LeaderboardEntry = {
        name: hackerName,
        time: completionTime,
        rank: getSpeedrunBadge(completionTime).rank,
        timestamp: Date.now(),
      };
      const updatedLeaderboard = saveToLeaderboard(newEntry);
      setLeaderboard(updatedLeaderboard);

      console.log(
        `%c🏆 GEKRAAKT IN ${formatTime(completionTime)}!`,
        "color: #FFD700; font-size: 24px; font-weight: bold;",
      );
      console.log(
        `%c${getSpeedrunBadge(completionTime).rank} - ${getSpeedrunBadge(completionTime).title}`,
        "color: #00FFFF; font-size: 18px;",
      );

      // Confetti celebration
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 7,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ["#FFD700", "#00FFFF", "#FF1493"],
        });
        confetti({
          particleCount: 7,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ["#FFD700", "#00FFFF", "#FF1493"],
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* DedSec: Zoek hier naar hints in de HTML comments! */}
      {/* 🔍 Clue 1: Het wachtwoord bestaat uit twee delen */}
      {/* 🔍 Clue 2: Eerste deel = C0D3 (1337 speak voor CODE) */}
      {/* 🔍 Clue 3: Tweede deel = HUNT3R (1337 speak voor HUNTER) */}
      {/* 💡 Combineer: C0D3 + HUNT3R = ? */}
      <div className="max-w-2xl w-full">
        {!unlocked ? (
          <div className="bg-card/60 backdrop-blur-sm border border-primary/50 rounded-lg p-8 glow-yellow">
            {/* DedSec ASCII Art Header */}
            <pre className="text-primary text-xs mb-6 overflow-x-auto font-mono">
              {`
    ██████╗ ███████╗██████╗ ███████╗███████╗ ██████╗
    ██╔══██╗██╔════╝██╔══██╗██╔════╝██╔════╝██╔════╝
    ██║  ██║█████╗  ██║  ██║███████╗█████╗  ██║     
    ██║  ██║██╔══╝  ██║  ██║╚════██║██╔══╝  ██║     
    ██████╔╝███████╗██████╔╝███████║███████╗╚██████╗
    ╚═════╝ ╚══════╝╚═════╝ ╚══════╝╚══════╝ ╚═════╝
`}
            </pre>

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Shield className="w-8 h-8 text-primary animate-pulse" />
                <h1 className="text-3xl font-bold font-heading text-primary">HACKER GEDETECTEERD</h1>
              </div>
              <div className="flex items-center gap-2 bg-background/50 px-4 py-2 rounded border border-primary/30">
                <Timer className="w-5 h-5 text-primary animate-pulse" />
                <span className="font-mono text-xl font-bold text-primary">{formatTime(elapsedTime)}</span>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <p className="text-secondary font-mono">// TOEGANG BEPERKT - VERIFICATIE VEREIST</p>
              <p className="text-muted-foreground">
                Je hebt de verborgen pagina gevonden, hacker! Maar om verder te gaan moet je het wachtwoord vinden,
                succes...
              </p>

              {/* Hints die zichtbaar zijn in de UI */}
              {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
                <div className="bg-background/30 p-4 rounded border border-primary/20 text-center">
                  <Eye className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground font-mono">
                    Open de <span className="text-primary">Console</span> (F12)
                  </p>
                </div>
                <div className="bg-background/30 p-4 rounded border border-secondary/20 text-center">
                  <Code className="w-8 h-8 text-secondary mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground font-mono">
                    Bekijk de <span className="text-secondary">HTML comments</span>
                  </p>
                </div>
                <div className="bg-background/30 p-4 rounded border border-primary/20 text-center">
                  <Terminal className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground font-mono">
                    Inspect de <span className="text-primary">DOM elementen</span>
                  </p>
                </div>
              </div> */}

              <div className="bg-background/50 p-4 rounded border border-primary/30 font-mono text-sm">
                <p className="text-primary font-bold mb-2">🔓 ONTGRENDEL DE ZONE:</p>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  <span className="text-secondary">→ Hint 1:</span> Je hebt al een goede start gemaakt druk op
                  <kbd className="px-2 py-1 bg-primary/20 rounded text-primary">F12</kbd> of klik rechts en kies
                  "Inspect"
                  <br />
                  <span className="text-secondary">→ Hint 2:</span> Handig voor een hacker minder handig voor de
                  beveiliging.
                  <br />
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="text"
                  placeholder="Voer wachtwoord in..."
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(false);
                  }}
                  className="bg-background/50 border-primary/50 font-mono"
                />
                {error && (
                  <p className="text-destructive text-sm mt-2 font-mono">✗ TOEGANG GEWEIGERD - Probeer opnieuw</p>
                )}
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold">
                <Lock className="w-4 h-4 mr-2" />
                ONTGRENDEL
              </Button>
            </form>
          </div>
        ) : (
          <div className="bg-card/60 backdrop-blur-sm border border-primary/50 rounded-lg p-8 glow-yellow animate-fade-in">
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <Trophy className="w-24 h-24 text-primary animate-pulse" />
              </div>

              <h1 className="text-4xl font-bold font-heading text-primary">TOEGANG VERLEEND!</h1>

              {/* Speedrun Results */}
              {finalTime !== null && (
                <div className="bg-background/50 p-6 rounded-lg border-2 border-primary/50 space-y-4">
                  <div className="flex items-center justify-center gap-3">
                    <Zap className="w-8 h-8 text-primary animate-pulse" />
                    <div>
                      <p className="text-sm text-muted-foreground font-mono">COMPLETION TIME</p>
                      <p className="text-4xl font-bold text-primary font-mono">{formatTime(finalTime)}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Badge
                      className={`text-xl px-6 py-3 ${getSpeedrunBadge(finalTime).color} text-white border-0 animate-pulse`}
                    >
                      {getSpeedrunBadge(finalTime).title}
                    </Badge>
                    <p className="text-lg text-secondary font-bold">{getSpeedrunBadge(finalTime).rank}</p>
                    <p className="text-sm text-muted-foreground">{getSpeedrunBadge(finalTime).message}</p>
                  </div>

                  {/* Speedrun Leaderboard Info */}
                  <div className="text-xs text-muted-foreground font-mono pt-4 border-t border-primary/30">
                    <p className="text-primary mb-2">⚡ SPEEDRUN TIERS:</p>
                    <div className="grid grid-cols-2 gap-2 text-left">
                      <span>S-RANK:</span>
                      <span className="text-yellow-400">≤ 30s</span>
                      <span>A-RANK:</span>
                      <span className="text-orange-400">≤ 60s</span>
                      <span>B-RANK:</span>
                      <span className="text-cyan-400">≤ 2min</span>
                      <span>C-RANK:</span>
                      <span className="text-green-400">≤ 5min</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <p className="text-xl text-secondary font-mono">Gefeliciteerd, Exploiter! 🎉</p>
                <p className="text-muted-foreground">
                  Hee sneaky, leuk dat je binnenkwam. Helaas geen koffie of thee maar je hebt bewezen dat je
                  nieuwsgierigheid geen grenzen kent. Je hebt de clues gevonden en het wachtwoord gekraakt in
                  recordtijd!
                </p>
                <p className="text-muted-foreground">
                  Bedankt voor het spelen en het verkennen van dit geheim! Je nieuwsgierigheid en technische skills is
                  precies wat je nodig hebt voor deze opleiding.
                </p>
              </div>

              <div className="flex justify-center pt-4">
                <Badge className="text-lg px-6 py-3 bg-gradient-to-r from-primary to-secondary border-2 border-primary animate-pulse">
                  🏆 ELITE EXPLOITER
                </Badge>
              </div>

              <div className="bg-background/50 p-4 rounded border border-primary/30 font-mono text-sm">
                <p className="text-primary">MISSIE VOLTOOID:</p>
                <p className="text-muted-foreground">
                  ✓ Developer tools geopend
                  <br />
                  ✓ Comments gevonden
                  <br />
                  ✓ Wachtwoord gekraakt
                  <br />✓ Geheime badge ontgrendeld
                </p>
              </div>

              {/* Leaderboard */}
              {leaderboard.length > 0 && (
                <div className="bg-background/50 p-6 rounded-lg border-2 border-secondary/50 space-y-4">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <Crown className="w-6 h-6 text-primary" />
                    <h2 className="text-2xl font-bold text-primary font-heading">TOP 10 LEADERBOARD</h2>
                    <Crown className="w-6 h-6 text-primary" />
                  </div>

                  <div className="space-y-2">
                    {leaderboard.map((entry, index) => (
                      <div
                        key={index}
                        className={`flex items-center justify-between p-3 rounded border ${
                          entry.name === hackerName
                            ? "bg-primary/20 border-primary animate-pulse"
                            : "bg-background/30 border-primary/20"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`font-bold text-lg ${
                              index === 0
                                ? "text-yellow-400"
                                : index === 1
                                  ? "text-gray-400"
                                  : index === 2
                                    ? "text-orange-400"
                                    : "text-muted-foreground"
                            }`}
                          >
                            #{index + 1}
                          </span>
                          <span className="font-mono text-primary">
                            {entry.name}
                            {entry.name === hackerName && " (YOU)"}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant="outline" className="font-mono">
                            {entry.rank}
                          </Badge>
                          <span className="font-mono text-secondary font-bold">{formatTime(entry.time)}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="text-xs text-muted-foreground text-center pt-4 border-t border-primary/30 space-y-1">
                    <p className="text-primary">🔒 PRIVACY & GDPR DISCLAIMER</p>
                    <p>
                      Deze leaderboard wordt lokaal opgeslagen op je eigen apparaat.
                      <br />
                      Je hacker naam "{hackerName}" is volledig random gegenereerd.
                      <br />
                      Er wordt GEEN data naar externe servers verstuurd.
                    </p>
                  </div>
                </div>
              )}

              <Button
                onClick={() => (window.location.href = "/")}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
              >
                TERUG NAAR MISSIE
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SecretZone;
