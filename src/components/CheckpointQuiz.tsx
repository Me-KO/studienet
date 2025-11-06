import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, XCircle, Sparkles, Skull, Zap } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import DigitalRain from "./DigitalRain";

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  feedback: string;
}

export interface CheckpointQuizData {
  questions: QuizQuestion[];
  motivationalMessages: string[];
}

interface CheckpointQuizProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  quizData: CheckpointQuizData;
  onSuccess: () => void;
  checkpointTitle: string;
  onGameOver?: () => void;
}

const CheckpointQuiz = ({
  open,
  onOpenChange,
  quizData,
  onSuccess,
  checkpointTitle,
  onGameOver,
}: CheckpointQuizProps) => {
  const [currentPos, setCurrentPos] = useState(0);
  const [questionOrder, setQuestionOrder] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [shake, setShake] = useState(false);
  const [bossHealth, setBossHealth] = useState(100);
  const [hpAnimation, setHpAnimation] = useState<"damage" | "heal" | null>(null);
  const [playerHP, setPlayerHP] = useState(100);
  const [gameOver, setGameOver] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState<QuizQuestion[]>([]);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  const [shuffledCorrectIndex, setShuffledCorrectIndex] = useState(0);
  const [correctSet, setCorrectSet] = useState<Set<number>>(new Set());

  const isFinalBoss = checkpointTitle.includes("EINDBAAS") || checkpointTitle.includes("DATABR3ACH");

  // Calculate glitch intensity based on boss health
  const getGlitchIntensity = () => {
    if (!isFinalBoss) return "none";
    if (bossHealth > 70) return "low";
    if (bossHealth > 40) return "medium";
    if (bossHealth > 15) return "high";
    return "extreme";
  };

  const glitchIntensity = getGlitchIntensity();

  // Shuffle options for current question
  const shuffleOptions = (question: QuizQuestion) => {
    const optionsWithIndex = question.options.map((option, index) => ({
      option,
      originalIndex: index,
    }));

    // Shuffle the array
    const shuffled = [...optionsWithIndex].sort(() => Math.random() - 0.5);

    // Find the new index of the correct answer
    const newCorrectIndex = shuffled.findIndex((item) => item.originalIndex === question.correctAnswer);

    setShuffledOptions(shuffled.map((item) => item.option));
    setShuffledCorrectIndex(newCorrectIndex);
  };

  // Select 10 random questions for final boss on mount
  useEffect(() => {
    if (isFinalBoss && open && quizData.questions.length >= 10) {
      const shuffled = [...quizData.questions].sort(() => Math.random() - 0.5);
      setSelectedQuestions(shuffled.slice(0, 10));
    } else {
      setSelectedQuestions(quizData.questions);
    }
  }, [open, isFinalBoss, quizData.questions]);

  // Initialize order and shuffle options on question change
  useEffect(() => {
    if (open) {
      setQuestionOrder(Array.from({ length: selectedQuestions.length }, (_, i) => i));
      setCurrentPos(0);
      setCorrectSet(new Set());
    }
  }, [open, selectedQuestions.length]);

  useEffect(() => {
    const currentIdx = questionOrder[currentPos] ?? 0;
    const q = selectedQuestions[currentIdx] || quizData.questions[0];
    if (q) {
      shuffleOptions(q);
    }
  }, [currentPos, questionOrder, selectedQuestions, quizData.questions]);

  useEffect(() => {
    if (shake) {
      const timer = setTimeout(() => setShake(false), 500);
      return () => clearTimeout(timer);
    }
  }, [shake]);

  useEffect(() => {
    if (hpAnimation) {
      const timer = setTimeout(() => setHpAnimation(null), 600);
      return () => clearTimeout(timer);
    }
  }, [hpAnimation]);

  const currentIdx = questionOrder[currentPos] ?? 0;
  const question = selectedQuestions[currentIdx] || quizData.questions[0];
  const totalQuestions = selectedQuestions.length;
  const progressPercent = totalQuestions ? (correctSet.size / totalQuestions) * 100 : 0;
  const wrongMessages = [
    "Bijna! Probeer het nog een keer — je kunt dit!",
    "Goed bezig, denk nog eens na en probeer opnieuw.",
    "Foutje hoort erbij — je leert ervan! Nog een poging.",
    "Niet erg! Een nieuwe vraag en dan kom je terug hier.",
  ];

  const handleAnswer = (answerIndex: number) => {
    if (showFeedback || gameOver) return;

    setSelectedAnswer(answerIndex);
    const correct = answerIndex === shuffledCorrectIndex;
    setIsCorrect(correct);
    setShowFeedback(true);

    // Track correct answers per unique question
    if (correct) {
      setCorrectSet((prev) => {
        const next = new Set(prev);
        next.add(currentIdx);
        return next;
      });
    }

    if (isFinalBoss) {
      if (correct) {
        // Correct answer: Boss loses 10 HP
        setBossHealth(Math.max(0, bossHealth - 10));
        setHpAnimation("damage");
      } else {
        // Wrong answer: Player loses 20 HP
        const newPlayerHP = Math.max(0, playerHP - 20);
        setPlayerHP(newPlayerHP);
        setHpAnimation("heal");
        setShake(true);

        // Check for game over
        if (newPlayerHP === 0) {
          setGameOver(true);
        }
      }
    }
  };

  const handleNext = () => {
    // If all unique questions are correct, finish
    if (correctSet.size === totalQuestions && totalQuestions > 0) {
      onSuccess();
      handleClose();
      return;
    }

    // On wrong answer: insert a different question next, then retry the same question
    if (!isCorrect) {
      setQuestionOrder((prev) => {
        const newOrder = [...prev];
        const pool = Array.from({ length: totalQuestions }, (_, i) => i).filter((i) => i !== currentIdx);
        const randomOther = pool[Math.floor(Math.random() * pool.length)] ?? currentIdx;
        newOrder.splice(currentPos + 1, 0, randomOther, currentIdx);
        return newOrder;
      });
    }

    // Advance to next
    setCurrentPos((p) => p + 1);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setIsCorrect(false);

    // Auto-finish if completed after advancing
    if (correctSet.size === totalQuestions && totalQuestions > 0) {
      onSuccess();
      handleClose();
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    // Reset for next time
    setTimeout(() => {
      setCurrentPos(0);
      setQuestionOrder([]);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setIsCorrect(false);
      setBossHealth(100);
      setPlayerHP(100);
      setGameOver(false);
      setSelectedQuestions([]);
      setCorrectSet(new Set());
      setShuffledOptions([]);
      setShuffledCorrectIndex(0);
    }, 300);
  };

  const handleRetry = () => {
    setCurrentPos(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setIsCorrect(false);
    setBossHealth(100);
    setPlayerHP(100);
    setGameOver(false);
    setCorrectSet(new Set());
    setShuffledOptions([]);
    setShuffledCorrectIndex(0);
    setQuestionOrder(Array.from({ length: selectedQuestions.length }, (_, i) => i));
    // Re-shuffle questions
    if (isFinalBoss && quizData.questions.length > 10) {
      const shuffled = [...quizData.questions].sort(() => Math.random() - 0.5);
      setSelectedQuestions(shuffled.slice(0, 10));
    }
  };

  // Game Over Screen
  if (gameOver) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="max-w-2xl border-4 border-destructive shadow-2xl shadow-destructive/50">
          <DialogHeader>
            <DialogTitle className="text-3xl flex items-center justify-center gap-2 text-destructive">
              <Skull className="w-8 h-8 animate-pulse" />
              GAME OVER
              <Skull className="w-8 h-8 animate-pulse" />
            </DialogTitle>
            <DialogDescription className="text-center text-lg pt-4 text-destructive/90">
              DATABR3ACH heeft je systemen overgenomen...
            </DialogDescription>
          </DialogHeader>

          <Card className="p-6 bg-destructive/10 border-destructive/50">
            <div className="text-center space-y-4">
              <div className="text-6xl animate-pulse">💀</div>
              <p className="text-lg font-semibold text-destructive">
                Je bent uit het systeem geschopt! DATABR3ACH blijft in controle.
              </p>
              <p className="text-muted-foreground">
                "Zwakte gedetecteerd. Systeem overgenomen. Probeer opnieuw... als je durft." - DATABR3ACH
              </p>
              <p className="text-sm text-muted-foreground italic">
                Elke netrunner faalt soms. Leer van je fouten en kom sterker terug!
              </p>
            </div>
          </Card>

          <div className="flex gap-3">
            <Button onClick={handleRetry} className="flex-1 bg-primary hover:bg-primary/90" size="lg">
              🔄 Probeer Opnieuw
            </Button>
            <Button onClick={handleClose} variant="outline" className="flex-1" size="lg">
              Terug
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <>
      {open && <DigitalRain intensity={isFinalBoss ? "high" : "medium"} />}
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent
          className={`max-w-2xl max-h-[90vh] overflow-y-auto transition-all duration-300 ${
            isFinalBoss ? "border-4 border-destructive shadow-2xl shadow-destructive/50" : ""
          } ${shake ? "animate-shake" : ""}`}
        >
          <DialogHeader>
            <DialogTitle
              className={`text-2xl flex items-center justify-center gap-2 ${
                isFinalBoss ? "text-destructive" : ""
              } ${glitchIntensity !== "none" ? "relative" : ""}`}
            >
              {isFinalBoss && <Skull className="w-6 h-6 animate-pulse" />}
              <span
                className={
                  glitchIntensity === "extreme"
                    ? "glitch-text-extreme"
                    : glitchIntensity === "high"
                      ? "glitch-text-high"
                      : glitchIntensity === "medium"
                        ? "glitch-text-medium"
                        : glitchIntensity === "low"
                          ? "glitch-text-low"
                          : ""
                }
              >
                {checkpointTitle}
              </span>
              {isFinalBoss && <Skull className="w-6 h-6 animate-pulse" />}
            </DialogTitle>
            <DialogDescription
              className={`text-center ${isFinalBoss ? "text-destructive/80 font-semibold" : ""} ${
                glitchIntensity === "extreme" || glitchIntensity === "high" ? "glitch-text-medium" : ""
              }`}
            >
              {isFinalBoss && <Zap className="w-4 h-4 inline mr-1" />}
              {isFinalBoss ? "Rogue AI Boss Fight - Versla DATABR3ACH!" : `Voortgang ${Math.round(progressPercent)}%`}
            </DialogDescription>
          </DialogHeader>

          {/* Player HP (Final Boss only) */}
          {isFinalBoss && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-semibold text-primary">
                <span>❤️ Jouw HP</span>
                <span className={playerHP <= 30 ? "text-destructive animate-pulse" : ""}>{playerHP} HP</span>
              </div>
              <Progress value={playerHP} className="h-3 bg-muted" />
            </div>
          )}

          {/* Boss HP / Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-semibold">
              <span
                className={`${isFinalBoss ? "text-destructive" : "text-muted-foreground"} ${
                  glitchIntensity === "extreme"
                    ? "glitch-text-extreme"
                    : glitchIntensity === "high"
                      ? "glitch-text-high"
                      : ""
                }`}
              >
                {isFinalBoss ? "💀 DATABR3ACH HP" : "Voortgang"}
              </span>
              <span
                className={`${isFinalBoss ? "text-destructive" : "text-muted-foreground"} ${
                  glitchIntensity === "extreme"
                    ? "glitch-text-extreme"
                    : glitchIntensity === "high"
                      ? "glitch-text-high"
                      : ""
                }`}
              >
                {isFinalBoss ? `${bossHealth} HP` : `${Math.round(progressPercent)}%`}
              </span>
            </div>
            <Progress
              value={isFinalBoss ? bossHealth : progressPercent}
              className={`h-3 transition-all ${isFinalBoss ? "bg-destructive/20" : ""} ${
                hpAnimation === "damage" ? "animate-hp-damage" : ""
              } ${hpAnimation === "heal" ? "animate-hp-heal" : ""}`}
            />
          </div>

          {/* Question */}
          <Card
            className={`p-6 ${isFinalBoss ? "bg-destructive/10 border-2 border-destructive/50" : "bg-secondary/10"}`}
          >
            <h3
              className={`text-lg font-semibold mb-4 ${isFinalBoss ? "text-destructive" : ""} ${
                glitchIntensity === "extreme"
                  ? "glitch-text-extreme"
                  : glitchIntensity === "high"
                    ? "glitch-text-high"
                    : glitchIntensity === "medium"
                      ? "glitch-text-medium"
                      : ""
              }`}
            >
              {isFinalBoss && "💀 "}
              {question.question}
            </h3>

            <div className="space-y-3">
              {shuffledOptions.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={showFeedback}
                  variant="outline"
                  className={`w-full text-left p-4 rounded-lg transition-all h-auto whitespace-normal ${
                    selectedAnswer === index
                      ? isCorrect
                        ? "bg-success-green/20 border-2 border-success-green"
                        : "bg-destructive/20 border-2 border-destructive"
                      : isFinalBoss
                        ? "bg-background hover:bg-destructive/10 border border-destructive/30"
                        : "bg-background hover:bg-accent"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {selectedAnswer === index &&
                      (isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-success-green mt-0.5 shrink-0" />
                      ) : (
                        <XCircle className="w-5 h-5 text-destructive mt-0.5 shrink-0" />
                      ))}
                    <span className="flex-1 text-left">{option}</span>
                  </div>
                </Button>
              ))}
            </div>
          </Card>

          {/* Feedback */}
          {showFeedback && isCorrect && (
            <Card className="p-4 bg-success-green/20 border-2 border-success-green animate-glow-green">
              <p className="text-success-green font-bold text-lg">{question.feedback}</p>
            </Card>
          )}

          {/* Motivational Message - Wrong Answer */}
          {showFeedback && !isCorrect && !isFinalBoss && (
            <Card className="p-4 bg-amber-500/10 border-2 border-amber-500 animate-fade-in">
              <p className="text-amber-700 dark:text-amber-400 font-semibold">
                💪 {wrongMessages[Math.floor(Math.random() * wrongMessages.length)]}
              </p>
            </Card>
          )}

          {/* Motivational Message - Correct Answer */}
          {showFeedback && isCorrect && (
            <Card
              className={`p-4 animate-fade-in ${
                isFinalBoss ? "bg-primary/20 border-primary/40" : "bg-success-green/10 border-2 border-success-green"
              }`}
            >
              <div className={`flex items-center gap-2 ${isFinalBoss ? "text-primary" : "text-success-green"}`}>
                {isFinalBoss ? <Zap className="w-5 h-5 animate-pulse" /> : <Sparkles className="w-5 h-5" />}
                <p className="font-semibold">
                  {quizData.motivationalMessages[currentIdx % quizData.motivationalMessages.length] || "Goed bezig!"}
                </p>
              </div>
            </Card>
          )}

          {/* Navigation */}
          {showFeedback &&
            (isFinalBoss && !isCorrect ? (
              <Card className="p-4 bg-destructive/20 border-destructive/40 text-center">
                <p className="font-semibold text-destructive">💀 DATABR3ACH COUNTERATTACK! Je verliest 20 HP!</p>
                <p className="text-sm text-muted-foreground mt-2">
                  "Je kennis heeft zwakke plekken. Ik exploit ze allemaal." - DATABR3ACH
                </p>
                {playerHP > 0 && (
                  <Button onClick={handleNext} className="w-full mt-3 bg-destructive hover:bg-destructive/90" size="lg">
                    💪 Blijf Vechten
                  </Button>
                )}
              </Card>
            ) : isCorrect ? (
              <Button
                onClick={handleNext}
                className={`w-full ${isFinalBoss ? "bg-destructive hover:bg-destructive/90" : ""}`}
                size="lg"
              >
                {bossHealth === 0 && isFinalBoss
                  ? "🏆 DATABR3ACH VERSLAGEN!"
                  : correctSet.size < totalQuestions
                    ? isFinalBoss
                      ? "⚔️ Volgende Aanval"
                      : "Volgende Vraag"
                    : isFinalBoss
                      ? "🏆 FINAL STRIKE!"
                      : "Voltooi Quiz"}
              </Button>
            ) : null)}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CheckpointQuiz;
