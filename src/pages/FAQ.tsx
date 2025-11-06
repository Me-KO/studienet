import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
const faqs = [
  {
    question: "Wat is STUDIENET?",
    answer:
      "Studienet is een interactieve game die je helpt om succesvol door je eerste periode op school te navigeren. Het bevat checkpoints met belangrijke informatie over de aankomende onboarding lessen.",
  },
  {
    question: "Moet ik alle checkpoints in volgorde doorlopen?",
    answer: "Ja",
  },
  {
    question: "Wat zijn de badges en hoe verdien ik ze?",
    answer:
      "Badge is een beloningen die je verdient door checkpoints te voltooien en quizzen af te ronden. Ze tonen je voortgang en kunnen je motiveren om alle content te verkennen.",
  },
  {
    question: "Hoe werken de quizzen?",
    answer:
      "Elk checkpoint bevat een quiz waarmee je kunt testen of je de informatie goed hebt begrepen. Je kunt de quiz meerdere keren maken totdat je alle vragen goed hebt.",
  },
  {
    question: "Is deze tool officieel?",
    answer:
      "Ik moest een product opleveren aan studenten die volgend jaar deze opleiding gaan doen, ik ben een gamer en vond het leuk om lekker creatief te zijn met mijn product. Leuker dan een powerpoint toch ;) Deze tool vervangt geen officiële beleidsinformatie van de school. Raadpleeg altijd het officiële studentenportaal voor beleidsinfo.",
  },
  {
    question: "Kan ik mijn voortgang opslaan?",
    answer:
      "Ja, je voortgang wordt automatisch opgeslagen in je browser. Let op: als je je browsergegevens wist, gaat je voortgang verloren.",
  },
  {
    question: "Wat moet ik doen als ik technische problemen ervaar?",
    answer:
      "Probeer eerst je pagina te verversen. Als het probleem aanhoudt, probeer dan een andere browser of wis je browsercache. De meeste problemen worden hiermee opgelost.",
  },
  {
    question: "Werkt deze map ook op mobiele apparaten?",
    answer:
      "Ja! Studie-NET is volledig responsive en werkt op alle apparaten - computers, tablets, smart-koelkasten, smart-wasmachines en smartphones.",
  },
  {
    question: "Hoeveel tijd kost het om alle checkpoints te doorlopen?",
    answer:
      "Gemiddeld duurt het ongeveer 5-10 minuten om alle checkpoints grondig door te nemen. Je kunt dit in je eigen tempo doen en terugkomen wanneer je wilt.",
  },
  {
    question: "Kan ik suggesties doen voor nieuwe content?",
    answer:
      "Deze tool is gemaakt door een medestudent als hulpmiddel. Ik volg zelf ook de deeltijd studie. Ik weet niet of ik daar tijd voor heb. ",
  },
];
const FAQ = () => {
  return (
    <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16 max-w-4xl">
      <div className="relative z-10 text-center mb-8 sm:mb-12">
        <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary/20 mb-4 shadow-lg">
          <HelpCircle className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-foreground">Veelgestelde Vragen</h1>
        <p className="text-lg sm:text-xl text-foreground/80">Alles wat je moet weten over het STUDIENET</p>
      </div>

      <div className="relative z-10 bg-card rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl border-2 border-primary">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left hover:text-primary transition-colors">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="relative z-10 mt-8 sm:mt-12 text-center bg-card rounded-xl p-4 sm:p-6 border border-border shadow-md">
        <p className="text-sm sm:text-base text-foreground font-medium">Heb je een vraag die hier niet staat?</p>
        <p className="text-xs sm:text-sm text-foreground/90 mt-2">¯\_(ツ)_/¯</p>
      </div>
    </div>
  );
};
export default FAQ;
