import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle2, XCircle } from "lucide-react";

interface Question {
  question: string;
  options: { value: string; label: string; correct: boolean }[];
  feedback: string;
}

const questions: Question[] = [
  {
    question: "Wat is het nut van de Pomodoro-techniek?",
    options: [
      { value: "a", label: "Langer doorleren zonder pauze", correct: false },
      { value: "b", label: "Gefocust leren in korte blokken", correct: true },
      { value: "c", label: "Alleen voor tomaten kweken", correct: false },
    ],
    feedback: "Yes! 25/5 minuten blokken houden je scherp en voorkomen burn-out.",
  },
  {
    question: "Wat deel je NIET in een klas-WhatsApp groep?",
    options: [
      { value: "a", label: "Studentnummer", correct: true },
      { value: "b", label: "Link van het rooster", correct: false },
      { value: "c", label: "Vraag over de opdracht", correct: false },
    ],
    feedback: "Correct! Persoonsgegevens zoals studentnummer blijven privé.",
  },
  {
    question: "Hoe gebruik je AI veilig voor je studie?",
    options: [
      { value: "a", label: "Uploaden van persoonlijke documenten", correct: false },
      { value: "b", label: "Ideeën laten genereren, zonder persoonsgegevens", correct: true },
      { value: "c", label: "AI de hele opdracht laten maken", correct: false },
    ],
    feedback: "Precies! Gebruik AI voor inspiratie, maar deel geen privéinfo en doe zelf de denkslag.",
  },
];

const QuizModal = () => {
  const [open, setOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const handleOpenQuiz = () => setOpen(true);
    window.addEventListener("openQuiz", handleOpenQuiz);
    return () => window.removeEventListener("openQuiz", handleOpenQuiz);
  }, []);

  const handleSubmit = () => {
    const question = questions[currentQuestion];
    const isCorrect = question.options.find((o) => o.value === selectedAnswer)?.correct;
    
    if (isCorrect) {
      setScore(score + 1);
    }
    
    setShowFeedback(true);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer("");
      setShowFeedback(false);
    } else {
      setCompleted(true);
    }
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setShowFeedback(false);
    setScore(0);
    setCompleted(false);
    setOpen(false);
  };

  const question = questions[currentQuestion];
  const isCorrect = question.options.find((o) => o.value === selectedAnswer)?.correct;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {completed ? "Quiz Voltooid! 🎉" : "Mini-Quiz"}
          </DialogTitle>
          <DialogDescription>
            {completed
              ? `Je hebt ${score} van de ${questions.length} vragen goed beantwoord!`
              : `Vraag ${currentQuestion + 1} van ${questions.length}`}
          </DialogDescription>
        </DialogHeader>

        {completed ? (
          <div className="space-y-6 py-4">
            <div className="text-center">
              <div className="text-6xl mb-4">
                {score === questions.length ? "🏆" : score >= 2 ? "🎖️" : "📚"}
              </div>
              <p className="text-lg">
                {score === questions.length
                  ? "Perfect! Je bent helemaal klaar voor de start!"
                  : score >= 2
                  ? "Goed gedaan! Je bent op de goede weg!"
                  : "Blijf oefenen, je komt er wel!"}
              </p>
            </div>
            <Button onClick={handleReset} className="w-full bg-primary hover:bg-primary/90">
              Sluiten
            </Button>
          </div>
        ) : (
          <div className="space-y-6 py-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">{question.question}</h3>
              
              <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
                {question.options.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={option.value}
                      id={option.value}
                      disabled={showFeedback}
                    />
                    <Label
                      htmlFor={option.value}
                      className={`flex-1 cursor-pointer ${
                        showFeedback
                          ? option.correct
                            ? "text-primary font-semibold"
                            : selectedAnswer === option.value
                            ? "text-destructive"
                            : ""
                          : ""
                      }`}
                    >
                      {option.label}
                      {showFeedback && option.correct && (
                        <CheckCircle2 className="inline-block ml-2 w-5 h-5 text-primary" />
                      )}
                      {showFeedback && !option.correct && selectedAnswer === option.value && (
                        <XCircle className="inline-block ml-2 w-5 h-5 text-destructive" />
                      )}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {showFeedback && (
              <div
                className={`p-4 rounded-lg ${
                  isCorrect ? "bg-success-green/10 border border-primary/20" : "bg-destructive/10 border border-destructive/20"
                }`}
              >
                <p className="text-sm">{question.feedback}</p>
              </div>
            )}

            <div className="flex gap-3">
              {!showFeedback ? (
                <Button
                  onClick={handleSubmit}
                  disabled={!selectedAnswer}
                  className="flex-1 bg-primary hover:bg-primary/90"
                >
                  Controleer
                </Button>
              ) : (
                <Button onClick={handleNext} className="flex-1 bg-primary hover:bg-primary/90">
                  {currentQuestion < questions.length - 1 ? "Volgende" : "Resultaten"}
                </Button>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default QuizModal;
