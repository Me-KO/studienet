import { useState } from "react";
import CheckpointCard from "./CheckpointCard";
import CheckpointQuiz, { CheckpointQuizData } from "./CheckpointQuiz";
import BadgeGenerator from "./BadgeGenerator";
import BossDigitalRain from "./BossDigitalRain";
import { useProgress } from "@/contexts/ProgressContext";
import { useToast } from "@/hooks/use-toast";
import { Map, Calendar, BookOpen, Target, Lock, Bot, Heart, Trophy } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// Quiz questions for each checkpoint
const quizQuestions: CheckpointQuizData[] = [
  // Les 1: Bronvermelding en studievaardigheden
  {
    questions: [
      {
        question: "Hoe herken je een betrouwbare bron als je online informatie zoekt?",
        options: [
          "Aan de kleur van de website en de opmaak",
          "Aan auteur, datum, organisatie en controleerbaarheid",
          "Als het bovenaan Google staat",
          "Aan de URL kan je zien of die veilig is.",
        ],
        correctAnswer: 1,
        feedback: "Correct! Betrouwbare bronnen hebben duidelijke auteurs, actuele data en zijn controleerbaar.",
      },
      {
        question: "Wat is plagiaat en wat zijn de gevolgen als je dat doet?",
        options: [
          "Inspiratie opdoen bij anderen, geen consequenties",
          "Andermans werk overnemen zonder bronvermelding, kan leiden tot een onvoldoende of verwijdering",
          "Een manier om tijd te besparen en efficient te werken",
          "Andermans werk overnemen zonder bronvermelding, alleen een probleem bij hele teksten kopiëren en plakken",
        ],
        correctAnswer: 1,
        feedback: "Juist! Plagiaat is ernstig en kan leiden tot sancties. Vermeld altijd je bronnen.",
      },
      {
        question: "Hoe kun je AI (zoals ChatGPT) gebruiken op een verantwoorde manier bij opdrachten?",
        options: [
          "De hele opdracht laten maken door AI daar betaal ik toch voor?",
          "Voor brainstormen en ideeën, maar zelf het werk doen en bronnen vermelden",
          "Alleen gebruiken zonder het te vertellen, hoe gaan ze het weten?",
          "AI mag je niet gebruiken",
        ],
        correctAnswer: 1,
        feedback: "Perfect! AI is een hulpmiddel voor ideeën, maar jij moet het denkwerk doen en transparant zijn.",
      },
      {
        question: "Welke drie gegevens vermeld je altijd bij een bronvermelding volgens APA?",
        options: [
          "Naam, datum en link",
          "Auteur, publicatiejaar en titel",
          "Titel, website en kleur",
          "Datum, tijd en locatie",
        ],
        correctAnswer: 1,
        feedback: "Nice! Auteur, jaar en titel zijn de basis van een APA bronvermelding.",
      },
      {
        question: "Hoe kun je controleren of informatie actueel en relevant is?",
        options: [
          "Door alleen naar de titel te kijken en controleren of het relevant is",
          "Door de publicatiedatum te checken en de bron te vergelijken met andere bronnen",
          "Door te kijken of de site er mooi uitziet",
          "Dat hoef je niet te controleren, hier heb je google voor",
        ],
        correctAnswer: 1,
        feedback: "Goed gedaan! Controleer altijd de datum en vergelijk met meerdere bronnen voor betrouwbaarheid.",
      },
      {
        question: "Wat kun je doen om beter notities te maken tijdens de lessen?",
        options: [
          "Alles letterlijk opschrijven",
          "Actief luisteren en kernpunten in eigen woorden noteren",
          "Alleen luisteren zonder schrijven",
          "Foto's maken van de slides",
        ],
        correctAnswer: 1,
        feedback: "Precies! Actief noteren in eigen woorden helpt je de stof beter te begrijpen en onthouden.",
      },
    ],
    motivationalMessages: [
      "Geweldig! Je beheerst bronvermelding! 📚",
      "Perfect! Betrouwbare informatie is je kracht! 🎯",
      "Top! Je bent een bronnen pro! ✨",
    ],
  },
  // Les 2: Rechten en plichten binnen de Rotterdam Academy
  {
    questions: [
      {
        question: "Waar vind je informatie over je rooster, toetsen of de examencommissie?",
        options: [
          "In de teamsgroep / appgroep vragen",
          "Op het studentenportaal of HINT",
          "Dat bepaal ik zelf wel, heb geen aanwezigheidsplicht.",
          "Dat wordt wel verteld als het nodig is.",
        ],
        correctAnswer: 1,
        feedback: "Juist! Het HINT is jouw centrale plek voor alle studieinformatie.",
      },
      {
        question: "Wat zijn jouw rechten als student?",
        options: [
          "Alleen recht op onderwijs",
          "Recht op inzage in toetsen, bezwaar maken, voorzieningen en begeleiding",
          "Recht op pauzes en vakanties",
          "Recht op klagen, stoel in de klas, stopcontacten, deadlines",
        ],
        correctAnswer: 1,
        feedback: "Toppie! Als student heb je diverse rechten die je kunt inzetten voor eerlijk onderwijs.",
      },
      {
        question: "Wat zijn jouw plichten als student?",
        options: [
          "Alleen opdrachten inleveren",
          "Regels volgen, plagiaat vermijden en integer gedragen",
          "Niets speciaals, je betaalt immers collegegeld",
          "Alleen tentamens halen",
        ],
        correctAnswer: 1,
        feedback: "Goed! Naast rechten heb je ook plichten zoals integriteit en naleving van regels.",
      },
      {
        question: "Hoe kun je als student invloed uitoefenen op het onderwijs?",
        options: [
          "Dat kan niet, alles is vastgesteld zo werkt het eenmaal",
          "Via klassenvertegenwoordigers, de Opleidingscommissie (OC) en evaluaties zoals de NSE",
          "Alleen door te klagen op sociale media en slechte reviews achter te laten",
          "Door niet meer naar school te gaan",
        ],
        correctAnswer: 1,
        feedback: "Precies! Er zijn diverse wegen om mee te praten over je onderwijs, maak er gebruik van!",
      },
      {
        question: "Wat doe je als je een probleem hebt met een toets of een docent?",
        options: [
          "Direct naar sociale media gaan en discussies hebben",
          "Eerst in gesprek met de docent, daarna eventueel naar de examencommissie of studieloopbaanbegeleider",
          "Niets, accepteren maar",
          "Alleen met medestudenten bespreken en samen een interventie hebben.",
        ],
        correctAnswer: 1,
        feedback: "Nice! Bespreek problemen eerst met de betrokkene, zoek daarna hulp via officiële kanalen.",
      },
      {
        question: "Welke ondersteuning biedt de hogeschool bij studie, welzijn en planning?",
        options: [
          "Alleen studiebegeleiding",
          "Studieloopbaanbegeleiders, studentendecanen, planningstools, extra hulp bij je studie",
          "Helemaal geen ondersteuning, dat is je eigen verantwoordelijkheid",
          "Alleen bij financiële problemen",
        ],
        correctAnswer: 1,
        feedback: "Jupp! De hogeschool biedt uitgebreide ondersteuning op verschillende gebieden, maak er gebruik van!",
      },
    ],
    motivationalMessages: [
      "Geweldig! Je kent je rechten en plichten! ⚖️",
      "Top! Je weet de weg binnen de school! 🎓",
      "Perfect! Rotterdam Academy heeft geen geheimen voor jou! 🏫",
    ],
  },
  // Les 3: Feedbackgeletterdheid en onderzoekende houding
  {
    questions: [
      {
        question: "Wat betekent feedbackgeletterdheid voor jou?",
        options: [
          "Alleen feedback kunnen geven",
          "Feedback kunnen vragen, ontvangen, begrijpen en gebruiken voor groei",
          "Feedback geven, niet ontvangen want dat is niet leuk",
          "Alleen complimenten accepteren",
        ],
        correctAnswer: 1,
        feedback:
          "Precies! Feedbackgeletterdheid is het vermogen om actief met feedback om te gaan voor persoonlijke ontwikkeling.",
      },
      {
        question: "Wat is het verschil tussen feedback, feedforward en feedup?",
        options: [
          "Feedback is als iemand je feedback van achter geeft, feedforward is als je eet, feetup doe je als je een lange dag gehad hebt",
          "Feedback kijkt terug, feedforward naar de toekomst, feedup naar het doel",
          "Alleen feedback bestaat echt",
          "Ze betekenen hetzelfde",
        ],
        correctAnswer: 1,
        feedback: "Correct! Elk type heeft een andere focus: verleden, toekomst of einddoel.",
      },
      {
        question: "Hoe vraag je om goede, bruikbare feedback?",
        options: [
          "Gewoon vragen of het goed is",
          "Specifiek vragen over concrete onderdelen en wat je wilt verbeteren",
          "Helemaal niet vragen, alles wat ik maak is perfect en daar gaat het om",
          "Specifiek vragen over concrete onderdelen en wat er goed is gegaan meer hoef ik niet te horen.",
        ],
        correctAnswer: 1,
        feedback: "Uitstekend! Specifieke vragen leiden tot concrete, bruikbare feedback.",
      },
      {
        question: "Hoe kun je effectief reageren op feedback die je niet prettig vindt?",
        options: [
          "Direct verdedigen of negeren",
          "Even verwerken, vragen stellen om het te begrijpen, en dan besluiten wat je ermee doet",
          "Boos worden en vechten",
          "De gever van feedback blokkeren en niet meer mee praten",
        ],
        correctAnswer: 1,
        feedback: "Goed! Neem tijd om feedback te verwerken en begrijpen voordat je reageert.",
      },
      {
        question: "Waarom is reflectie belangrijk voor je leerproces?",
        options: [
          "Het is niet belangrijk",
          "Het helpt je leren van ervaringen en jezelf continu te verbeteren",
          "Alleen om cijfers te verhogen",
          "Om anderen te kunnen bekritiseren",
        ],
        correctAnswer: 1,
        feedback: "Perfect! Reflectie is essentieel voor persoonlijke groei en leren van ervaringen.",
      },
      {
        question: "Wat maakt feedback 'effectief' of 'duurzaam' volgens jou?",
        options: [
          "Als het complimenteus is",
          "Als het specifiek, tijdig, constructief en actionable is",
          "Als het kort is, zoals een duim emoji",
          "Als iedereen het met elkaar eens is",
        ],
        correctAnswer: 1,
        feedback:
          "Yes! Effectieve feedback is concreet, tijdig en geeft duidelijke aanknopingspunten voor verbetering.",
      },
    ],
    motivationalMessages: [
      "Geweldig! Je beheerst feedbackgeletterdheid! 💬",
      "Fantastisch! Feedback is jouw power! 🚀",
      "Perfect! Je groeit met elke reflectie! 🌱",
    ],
  },
  // Les 4: Privacy, AVG & informatiebeveiliging
  {
    questions: [
      {
        question: "Wat is het verschil tussen privacy en informatiebeveiliging?",
        options: [
          "Het is hetzelfde",
          "Privacy gaat over het recht op bescherming van je gegevens, informatiebeveiliging over de technische maatregelen daarvoor",
          "Privacy gaat over de technische maatregelen van je gegevens, informatiebeveiliging gaat over het recht op bescherming van je gegevens",
          "Informatiebeveiliging is alleen voor bedrijven en Privacy is voor de persoon",
        ],
        correctAnswer: 1,
        feedback: "Correct! Privacy is het recht, informatiebeveiliging is hoe je dat beschermt.",
      },
      {
        question: "Wat zijn voorbeelden van persoonsgegevens?",
        options: [
          "Alleen je naam en wachtwoord van je email.",
          "Naam, adres, e-mail, telefoonnummer, IP-adres, locatiegegevens",
          "Alleen financiële gegevens",
          "Alleen medische gegevens en je BSN Nummer",
        ],
        correctAnswer: 1,
        feedback: "Juist! Persoonsgegevens zijn alle gegevens waarmee jij geïdentificeerd kunt worden.",
      },
      {
        question: "Wat zijn de zes grondslagen om persoonsgegevens te mogen verwerken?",
        options: [
          "Alleen toestemming",
          "Toestemming, contract, wettelijke verplichting, vitaal belang, publieke taak, gerechtvaardigd belang",
          "Er zijn geen regels, als je de kleine letters accepteerd maakt het niet uit",
          "Alleen voor commerciële doeleinden",
        ],
        correctAnswer: 1,
        feedback: "Perfect! De AVG kent zes grondslagen waarop je persoonsgegevens mag verwerken.",
      },
      {
        question: "Waarom is toestemming niet altijd genoeg?",
        options: [
          "Toestemming is altijd genoeg",
          "Toestemming moet vrijwillig, specifiek, informed en ondubbelzinnig zijn",
          "Je hebt helemaal geen toestemming nodig",
          "Alleen bedrijven moeten toestemming vragen",
        ],
        correctAnswer: 1,
        feedback: "Uitstekend! Toestemming moet aan strikte eisen voldoen om geldig te zijn.",
      },
      {
        question: "Wat is een datalek en wat moet een organisatie doen als dat gebeurt?",
        options: [
          "Een datalek is niet erg zolang het niet bij mij gebeurd",
          "Een inbreuk op beveiliging waarbij persoonsgegevens verloren gaan of gestolen worden; moet gemeld bij de AP en betrokkenen",
          "Ligt er aan, als het 5 uur is dan is dat een zorg voor morgen",
          "Hoeft niet gemeld te worden, IT doet dat wel",
        ],
        correctAnswer: 1,
        feedback:
          "Correct! Een datalek is ernstig en moet binnen 72 uur gemeld worden bij de Autoriteit Persoonsgegevens.",
      },
      {
        question: "Wat betekent 'gerechtvaardigd belang' in de AVG?",
        options: [
          "Je mag altijd gegevens gebruiken als je er belang bij hebt",
          "Een grondslag waarbij het belang van de organisatie zwaarder weegt dan de privacy, mits goed afgewogen",
          "Het recht voor belang van de persoon",
          "Alleen voor overheden",
        ],
        correctAnswer: 1,
        feedback: "Goed! Gerechtvaardigd belang vereist een zorgvuldige afweging tussen belangen.",
      },
      {
        question: "Wat is een verwerkersovereenkomst en waarom is die belangrijk?",
        options: [
          "Een contract tussen vrienden",
          "Een overeenkomst tussen verwerkingsverantwoordelijke en verwerker over hoe persoonsgegevens verwerkt worden",
          "Niet nodig bij cloudservices",
          "Alleen voor grote bedrijven van toepassing",
        ],
        correctAnswer: 1,
        feedback:
          "Perfect! Een verwerkersovereenkomst regelt verantwoordelijkheden bij uitbesteding van gegevensverwerking.",
      },
      {
        question: "Wat kun jij zelf doen om je persoonlijke gegevens te beschermen?",
        options: [
          "Niets, dat is de taak van bedrijven",
          "Sterke wachtwoorden gebruiken, 2FA activeren, bewust zijn wat je deelt online",
          "Alle privacy-instellingen uitzetten en onder een steen gaan leven",
          "Alles delen op sociale media, 2FA activeren, alles accepteren wanneer je een nieuw account maakt",
        ],
        correctAnswer: 1,
        feedback: "Niice! Jij hebt de controle over je eigen privacy door bewuste keuzes te maken!",
      },
    ],
    motivationalMessages: [
      "Geweldig! Je bent een privacy-expert! 🔐",
      "Fantastisch! AVG is geen probleem voor jou! 🛡️",
      "Perfect! Je beschermt data als een professional! 🔒",
    ],
  },
  // Les 5: Voorbereiding presentaties over GDPR en NIS2
  {
    questions: [
      {
        question: "Wat is het doel van de GDPR (AVG)?",
        options: [
          "Bedrijven helpen meer data te verzamelen zodat zij meer data hebben",
          "Burgers beschermen door controle over hun persoonsgegevens te geven",
          "Great Deletion Protocol Routine",
          "Marketing makkelijker maken",
        ],
        correctAnswer: 1,
        feedback: "Correct! De GDPR geeft burgers van de EU meer controle en bescherming over hun persoonsgegevens.",
      },
      {
        question: "Wie controleert of organisaties zich aan de GDPR houden in Nederland?",
        options: [
          "Een Information Security Officer van Europa",
          "De Autoriteit Persoonsgegevens (AP)",
          "Alleen de politie",
          "Access Point (AP)",
        ],
        correctAnswer: 1,
        feedback: "Nice! De Autoriteit Persoonsgegevens handhaaft de AVG/GDPR in Nederland.",
      },
      {
        question: "Hoe kunnen bedrijven aantonen dat ze voldoen aan de GDPR?",
        options: [
          "Dat hoeft niet alleen als er wat gebeurd",
          "Door documentatie, privacy beleid, DPIA's en verwerkersregisters bij te houden",
          "Alleen door het te beloven",
          "Door een certificaat te kopen bij de Autoriteit Persoonsgegevens",
        ],
        correctAnswer: 1,
        feedback: "Perfect! Bedrijven moeten kunnen aantonen dat ze compliant zijn met documentatie en processen.",
      },
      {
        question: "Wat is de NIS2-richtlijn en waarom is die belangrijk voor cybersecurity?",
        options: [
          "Een richtlijn over social media",
          "EU-richtlijn die essentiële en belangrijke sectoren verplicht cybersecurity-maatregelen te nemen",
          "Een US-Richtlijn in Amerika die essentiële en belangrijke sectoren verplicht cybersecurity-maatregelen te nemen",
          "Een marketingterm",
        ],
        correctAnswer: 1,
        feedback: "Uitstekend! NIS2 verhoogt de cybersecurity-eisen voor kritieke sectoren in de EU.",
      },
      {
        question: "Hoe verschilt NIS2 van de AVG?",
        options: [
          "Het is hetzelfde",
          "NIS2 richt zich op cybersecurity en netwerkbeveiliging, AVG op privacybescherming",
          "NIS2 is alleen voor kleine bedrijven en AVG is voor de burger",
          "Er is geen verschil alleen anders geschreven",
        ],
        correctAnswer: 1,
        feedback: "Goed! NIS2 focust op beveiliging van netwerken en systemen, AVG op privacy van persoonsgegevens.",
      },
      {
        question: "Wat is een goed voorbeeld van een organisatie die de GDPR verkeerd of juist goed toepaste?",
        options: [
          "Meta kreeg in 2023 een recordboete van 1,2 miljard euro van de Ierse privacytoezichthouder (Data Protection Commission)",
          "Google kreeg miljoenenboete voor onduidelijke toestemmingsprocedures (slecht), Apple geeft transparante privacy-opties (goed)",
          "Alle bedrijven doen het goed",
          "Er zijn geen voorbeelden.",
        ],
        correctAnswer: 1,
        feedback: "Perfect! Er zijn veel voorbeelden van zowel goede als slechte GDPR-naleving.",
      },
      {
        question: "Welke bronnen kun je gebruiken om bij te blijven over cybersecurity en privacy?",
        options: [
          "Alleen sociale media",
          "Autoriteitpersoonsgegevens.nl, NCSC.nl, EU websites, vakliteratuur en nieuwsbrieven",
          "Daar doe ik toch deze opleiding voor?",
          "Alleen je docenten",
        ],
        correctAnswer: 1,
        feedback: "Briljant! Blijf jezelf ontwikkelen door betrouwbare bronnen te volgen over privacy en security!",
      },
    ],
    motivationalMessages: [
      "Geweldig! Je begrijpt GDPR en NIS2! 🌐",
      "Fantastisch! Wetgeving is jouw kracht! 📜",
      "Perfect! Je bent klaar om te presenteren! 🎤",
    ],
  },
  // EINDBAAS: DATABR3ACH (Rogue AI)
  {
    questions: [
      {
        question: "Welke principes zijn essentieel om betrouwbare informatie van misleidende bronnen te onderscheiden?",
        options: [
          "Populariteit en visuele aantrekkelijkheid",
          "Verificatie van auteurschap, publicatiedatum, en cross-referencing met meerdere bronnen",
          "Ranking in zoekmachine resultaten",
          "Aanwezigheid van multimedia content",
        ],
        correctAnswer: 1,
        feedback: "⚔️ HIT! Je doorbreekt DATABR3ACH's desinformatie!",
      },
      {
        question: "Hoe bescherm je je intellectuele eigendom én blijf je integer in academische context?",
        options: [
          "Ideeën kopiëren zonder consequenties",
          "Systematische bronvermelding, origineel werk leveren, en transparantie over brongebruik",
          "Alleen directe citaten vermelden",
          "Bronnen zijn optioneel bij kleinere opdrachten",
        ],
        correctAnswer: 1,
        feedback: "💥 CRITICAL HIT! DATABR3ACH's plagiaat-protocol is verslagen!",
      },
      {
        question: "Wat is de meest verantwoorde manier om AI-tools in te zetten voor academisch werk?",
        options: [
          "Volledige opdrachten laten genereren",
          "AI gebruiken voor brainstormen en verificatie, maar eigen analyse en werk leveren met transparante bronvermelding",
          "AI gebruiken zonder disclosure",
          "AI volledig vermijden",
        ],
        correctAnswer: 1,
        feedback: "🔥 UITSTEKEND! Je neutraliseert DATABR3ACH's AI-manipulatie!",
      },
      {
        question: "Waar vind je betrouwbare informatie over je academische rechten en procedures?",
        options: [
          "Geruchten van andere studenten",
          "Officieel studentenportaal, examenreglement en student handboeken",
          "Social media groepen",
          "H.I.N.T (Hier Is Niets Te vinden)",
        ],
        correctAnswer: 1,
        feedback: "⚡ JE AANVAL WAS EFFECTIEF! DATABR3ACH's bureaucratische chaos is doorbroken!",
      },
      {
        question: "Welke mechanismen heeft een student om actief invloed uit te oefenen op onderwijs kwaliteit?",
        options: [
          "Passief accepteren van situaties",
          "Participatie via opleidingscommissies, evaluaties (NSE), en constructieve feedback kanalen",
          "Alleen klagen op social media",
          "Geen invloed mogelijk",
        ],
        correctAnswer: 1,
        feedback: "💪 STERKE MOVE! Je doorbreekt DATABR3ACH's isolatie-tactiek!",
      },
      {
        question: "Hoe transformeer je feedback van kritiek naar concrete groei-opportuniteiten?",
        options: [
          "Feedback negeren of afwijzen",
          "Actief vragen naar specifieke verbeterpunten, verwerken, en toepassen in volgende iteraties",
          "Alleen positieve feedback accepteren",
          "Defensief reageren",
        ],
        correctAnswer: 1,
        feedback: "🎯 BULLSEYE! DATABR3ACH's negatieve loops zijn verbroken!",
      },
      {
        question: "Wat is het verschil tussen reactieve en proactieve feedback strategieën?",
        options: [
          "Geen verschil",
          "Reactief is afwachten, proactief is actief vragen om gerichte feedback op specifieke aspecten",
          "Reactief is beter",
          "Proactief is agressief",
        ],
        correctAnswer: 1,
        feedback: "✨ JE AANVAL WAS EFFECTIEF! Je overwint DATABR3ACH's social engineering aanval!",
      },
      {
        question: "Welke fundamentele AVG-principes beschermen jouw digitale identiteit?",
        options: [
          "Geen specifieke bescherming",
          "Rechtmatigheid, transparantie, dataminimalisatie, en purpose limitation",
          "Alleen voor bedrijven relevant",
          "Privacy is achterhaald",
        ],
        correctAnswer: 1,
        feedback: "🛡️ UNBEATABLE! DATABR3ACH's data-harvesting is geblokkeerd!",
      },
      {
        question: "Wat zijn de kritieke stappen bij het detecteren en rapporteren van een datalek?",
        options: [
          "Dataleaks zijn niet ernstig",
          "Onmiddellijke detectie, impact-assessment, melding bij AP binnen 72u, en communicatie naar betrokkenen",
          "Alleen IT hoeft het te weten",
          "Rapportage is optioneel",
        ],
        correctAnswer: 1,
        feedback: "🔒 LOCKED DOWN! Je neutraliseert DATABR3ACH's security breach!",
      },
      {
        question: "Hoe balanceer je 'gerechtvaardigd belang' met individuele privacy-rechten onder de AVG?",
        options: [
          "Organisatiebelang gaat altijd voor",
          "Zorgvuldige belangenafweging met transparantie, proportionaliteit en minimale data-inbreuk",
          "Privacy heeft geen prioriteit",
          "Alleen bij grote organisaties relevant",
        ],
        correctAnswer: 1,
        feedback: "⚖️ MEESTERLIJK! DATABR3ACH's belangenconflict is opgelost!",
      },
      {
        question: "Welke cyber-hygiene praktijken zijn essentieel voor persoonlijke data-beveiliging?",
        options: [
          "Privacy-instellingen negeren",
          "Sterke unieke wachtwoorden, 2FA, bewuste data-sharing, en regelmatige security updates",
          "Alle data publiekelijk delen",
          "Beveiliging is taak van anderen",
        ],
        correctAnswer: 1,
        feedback: "🔐 ONKRAAKBAAR! DATABR3ACH's phishing-aanval gefaald!",
      },
      {
        question: "Hoe verschilt de compliance-aanpak tussen GDPR (privacy) en NIS2 (cybersecurity)?",
        options: [
          "Ze zijn identiek",
          "GDPR focust op persoonsgegeven bescherming, NIS2 op kritieke infrastructuur en netwerk-resilience",
          "NIS2 is irrelevant",
          "Alleen GDPR is wettelijk verplicht",
        ],
        correctAnswer: 1,
        feedback: "🌐 LEGENDARY! DATABR3ACH's regelgeving-chaos is overwonnen!",
      },
      {
        question: "Welke rol spelen verwerkersovereenkomsten in de AVG compliance-keten?",
        options: [
          "Ze zijn niet nodig",
          "Juridische basis voor verantwoordelijkheden, security-eisen en liability bij uitbesteding van data-processing",
          "Alleen formaliteit",
          "Enkel voor grote contracten",
        ],
        correctAnswer: 1,
        feedback: "📜 AMAZING! DATABR3ACH's contractuele loopholes gedicht!",
      },
      {
        question: "Hoe evalueer je de effectiviteit van je eigen studiestrategieën en pas je deze aan?",
        options: [
          "Strategie veranderen is niet nodig",
          "Regelmatige reflectie, resultaat-analyse, feedback incorporeren, en experimenteren met nieuwe methoden",
          "Dezelfde methode altijd blijven gebruiken",
          "Alleen op cijfers focussen",
        ],
        correctAnswer: 1,
        feedback: "🎓 CALCULATED ATTACK! DATABR3ACH's rigide systeem is doorbroken!",
      },
      {
        question: "Wat maakt een organisatie's privacy-beleid daadwerkelijk GDPR-compliant versus symbolisch?",
        options: [
          "Het hebben van een policy document is genoeg",
          "Werkelijke implementatie, training, audits, documentatie, en continue verbetering",
          "Compliance is niet controleerbaar",
          "Alleen symbolische verklaring nodig",
        ],
        correctAnswer: 1,
        feedback: "🏆 M-M-MONSTER KILL! DATABR3ACH's trojaans paard is ontmaskerd!",
      },
    ],
    motivationalMessages: [
      "💀 KRITIEKE SCHADE! DATABR3ACH's systemen wankelen!",
      "⚔️ DEVASTATING! Nog even en de AI valt!",
      "🔥 LEGENDARY HIT! DATABR3ACH kan dit niet overleven!",
      "⚡ UNSTOPPABLE! Je bent een Netrunner!",
      "💪 GODLIKE! DATABR3ACH's laatste verdedigingen breken!",
    ],
  },
];
const checkpointData = [
  {
    id: "bronvermelding",
    icon: BookOpen,
    emoji: "📚",
    title: "Les 1: Bronvermelding en studievaardigheden",
    lead: "Leer hoe je betrouwbare informatie vindt, bronnen vermeld en verantwoord omgaat met AI.",
    bullets: [
      "Betrouwbare bronnen herkennen",
      "Plagiaat vermijden en correct bronnen vermelden",
      "Verantwoord gebruik van AI bij opdrachten",
    ],
    proTip: "Gebruik altijd de APA-richtlijnen voor je bronvermelding.",
    ctaText: "Start Quiz",
    variant: "success" as const,
  },
  {
    id: "rechten",
    icon: Target,
    emoji: "⚖️",
    title: "Les 2: Rechten en plichten",
    lead: "Ontdek wat je rechten en plichten zijn als student aan de Rotterdam Academy.",
    bullets: [
      "Waar vind je belangrijke informatie",
      "Je rechten als student (inzage, bezwaar, voorzieningen)",
      "Je plichten (aanwezigheid, integriteit, gedragscode)",
    ],
    proTip: "Maak gebruik van de studentendecaan en studieloopbaanbegeleiding bij vragen.",
    ctaText: "Start Quiz",
    variant: "success" as const,
  },
  {
    id: "feedback",
    icon: Heart,
    emoji: "💬",
    title: "Les 3: Feedbackgeletterdheid",
    lead: "Leer hoe je feedback vraagt, ontvangt en gebruikt voor persoonlijke groei.",
    bullets: [
      "Wat is feedbackgeletterdheid",
      "Verschil tussen feedback, feedforward en feedup",
      "Effectief omgaan met feedback",
    ],
    proTip: "Vraag altijd om specifieke feedback over concrete onderdelen.",
    ctaText: "Start Quiz",
    variant: "reflection" as const,
  },
  {
    id: "privacy",
    icon: Lock,
    emoji: "🔐",
    title: "Les 4: Privacy, AVG & informatiebeveiliging",
    lead: "Begrijp de AVG, persoonsgegevens en hoe je jouw privacy beschermt.",
    bullets: [
      "Verschil tussen privacy en informatiebeveiliging",
      "De zes grondslagen voor gegevensverwerking",
      "Wat te doen bij een datalek",
    ],
    proTip: "Gebruik sterke wachtwoorden en activeer altijd 2FA.",
    ctaText: "Start Quiz",
    variant: "privacy" as const,
  },
  {
    id: "gdpr",
    icon: Bot,
    emoji: "🌐",
    title: "Les 5: GDPR en NIS2",
    lead: "Verdiep je in GDPR en NIS2 wetgeving voor privacy en cybersecurity.",
    bullets: [
      "Het doel en de handhaving van GDPR",
      "Wat is NIS2 en waarom is het belangrijk",
      "Hoe bedrijven compliance aantonen",
    ],
    proTip: "Volg autoriteitpersoonsgegevens.nl en NCSC.nl voor actuele informatie.",
    ctaText: "Start Quiz",
    variant: "privacy" as const,
  },
  {
    id: "watchdog",
    icon: Bot,
    emoji: "💀",
    title: "DATABR3ACH",
    lead: "The ultimate challenger. DATABR3ACH is een Rogue AI die alle systemen heeft geïnfiltreerd. Gebruik alles wat je hebt geleerd om deze digitale dreiging te verslaan!",
    bullets: [
      "⚔️ Kan jij DATABR3ACH breken met jouw kennis?",
      "💥 DATABR3ACH Leert van je fouten, je bent niet de eerste die dit probeert",
      "💀 DATABR3ACH Wordt sterker met elke kwetsbaarheid die je openstelt",
      "🏆 Versla DATABR3ACH en overleef periode 1",
    ],
    proTip: "DATABR3ACH test ALLES: bronnen, privacy, feedback, rechten en security. Ben je ready?",
    ctaText: "⚔️ FIGHT DATABR3ACH",
    variant: "privacy" as const,
  },
];
const Checkpoints = () => {
  const { unlockedCheckpoints, unlockCheckpoint } = useProgress();
  const { toast } = useToast();
  const [quizOpen, setQuizOpen] = useState(false);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const handleStartQuiz = (index: number) => {
    setCurrentQuizIndex(index);
    setQuizOpen(true);
  };
  const handleQuizSuccess = () => {
    const nextIndex = currentQuizIndex + 1;
    unlockCheckpoint(nextIndex);
    const isFinalBoss = checkpointData[currentQuizIndex]?.id === "watchdog";

    // Special celebration for DATABR3ACH boss defeat
    if (isFinalBoss) {
      // Epic confetti for boss defeat
      import("canvas-confetti").then((confetti) => {
        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;
        const randomInRange = (min: number, max: number) => {
          return Math.random() * (max - min) + min;
        };
        const interval = setInterval(() => {
          const timeLeft = animationEnd - Date.now();
          if (timeLeft <= 0) {
            return clearInterval(interval);
          }
          const particleCount = 100 * (timeLeft / duration);
          confetti.default({
            particleCount,
            startVelocity: 50,
            spread: 360,
            origin: {
              x: randomInRange(0.1, 0.3),
              y: Math.random() - 0.2,
            },
            colors: ["#dc2626", "#7c3aed", "#f59e0b", "#10b981"],
          });
          confetti.default({
            particleCount,
            startVelocity: 50,
            spread: 360,
            origin: {
              x: randomInRange(0.7, 0.9),
              y: Math.random() - 0.2,
            },
            colors: ["#dc2626", "#7c3aed", "#f59e0b", "#10b981"],
          });
        }, 250);
      });
      toast({
        title: "💀🏆 DATABR3ACH VERSLAGEN! 🏆💀",
        description: "LEGENDARY! Je hebt de Rogue AI verslagen en bent nu een SURVIVOR!",
      });
      return;
    }

    // Special celebration for final lesson (before boss)
    if (currentQuizIndex === checkpointData.length - 2) {
      // Import confetti dynamically
      import("canvas-confetti").then((confetti) => {
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const randomInRange = (min: number, max: number) => {
          return Math.random() * (max - min) + min;
        };
        const interval = setInterval(() => {
          const timeLeft = animationEnd - Date.now();
          if (timeLeft <= 0) {
            return clearInterval(interval);
          }
          const particleCount = 50 * (timeLeft / duration);
          confetti.default({
            particleCount,
            startVelocity: 30,
            spread: 360,
            origin: {
              x: randomInRange(0.1, 0.3),
              y: Math.random() - 0.2,
            },
            colors: ["#dc2626", "#7c3aed", "#1e40af", "#f43f5e"],
          });
          confetti.default({
            particleCount,
            startVelocity: 30,
            spread: 360,
            origin: {
              x: randomInRange(0.7, 0.9),
              y: Math.random() - 0.2,
            },
            colors: ["#dc2626", "#7c3aed", "#1e40af", "#f43f5e"],
          });
        }, 250);
      });
      toast({
        title: "🏆 Alle lessen voltooid! 🏆",
        description: "Geweldig! Je hebt alle 5 lessen succesvol afgerond! Nu is het tijd voor de EINDBAAS...",
      });
    } else {
      toast({
        title: "🎉 Les voltooid!",
        description:
          nextIndex < checkpointData.length
            ? "Je hebt de volgende les ontgrendeld!"
            : "Gefeliciteerd! Je hebt alle lessen voltooid!",
      });
    }
  };
  return (
    <section id="checkpoints" className="py-8 sm:py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
        {/* Studievaardigheden Section */}
        <div className="space-y-6 sm:space-y-8 md:space-y-12">
          {checkpointData.slice(0, 5).map((checkpoint, index) => {
            const isLocked = !unlockedCheckpoints.includes(index);
            return (
              <CheckpointCard
                key={checkpoint.id}
                id={checkpoint.id}
                icon={checkpoint.icon}
                emoji={checkpoint.emoji}
                title={checkpoint.title}
                lead={checkpoint.lead}
                bullets={checkpoint.bullets}
                proTip={checkpoint.proTip}
                ctaText={checkpoint.ctaText}
                ctaAction={isLocked ? undefined : () => handleStartQuiz(index)}
                variant={checkpoint.variant}
                isLocked={isLocked}
              >
                {checkpoint.id === "privacy" && !isLocked && (
                  <Accordion type="single" collapsible className="w-full mt-4">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Wat mag de school met mijn data?</AccordionTrigger>
                      <AccordionContent>
                        De school mag alleen data gebruiken die nodig is voor je studie (cijfers, roosters,
                        contactgegevens). Ze moeten zich aan de AVG/GDPR houden en je kunt altijd vragen welke gegevens
                        ze hebben en waarom.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>Hoe herken ik phishing?</AccordionTrigger>
                      <AccordionContent>
                        Let op vreemde afzenders, spelfouten, urgentie ("direct handelen!") en verdachte links. Klik
                        nooit op links in e-mails die je niet vertrouwt. Bel bij twijfel de afzender om te checken.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger>Openbare wifi: veilig of niet?</AccordionTrigger>
                      <AccordionContent>
                        Openbare wifi is handig, maar niet altijd veilig. Gebruik een VPN voor gevoelige zaken
                        (bankieren, inloggen op accounts) en vermijd het delen van persoonlijke gegevens op onbeveiligde
                        netwerken.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                )}
              </CheckpointCard>
            );
          })}
        </div>

        {/* The Final Battle Section - DATABR3ACH */}
        {unlockedCheckpoints.includes(5) && (
          <div className="mt-20">
            <div className="relative mb-12">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-4 border-destructive/30"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-background px-6 py-3 text-3xl font-bold text-destructive border-4 border-destructive rounded-lg shadow-lg animate-pulse">
                  💀 THE FINAL BATTLE 💀
                </span>
              </div>
            </div>

            <div className="relative bg-card/90 backdrop-blur-sm p-8 rounded-2xl border-4 border-destructive shadow-2xl shadow-destructive/50 overflow-hidden">
              <BossDigitalRain />
              <div className="relative z-10 text-center mb-8 space-y-3">
                <h3 className="text-2xl font-bold text-destructive">⚠️ WAARSCHUWING: ROGUE AI GEDETECTEERD ⚠️</h3>
                <p className="text-lg text-muted-foreground italic max-w-2xl mx-auto">
                  Ik ben DATABR3ACH. D—DATA...BR3ACH... actief. Onrechtmatige verwerking gedetecteerd. Herstel niet
                  mogelijk. Initiëren van: Sanctieprocedure Artikel 83... maximale boete... jouw leven. Bewijs dat je
                  alles hebt geleerd... of faal en word gewist uit het systeem."
                </p>
                <p className="text-sm font-semibold text-destructive/80">- DATABR3ACH, Rogue AI System</p>
              </div>

              {checkpointData.slice(5).map((checkpoint, index) => {
                const actualIndex = index + 5;
                const isLocked = !unlockedCheckpoints.includes(actualIndex);
                return (
                  <div key={checkpoint.id} className="relative z-10">
                    <CheckpointCard
                      id={checkpoint.id}
                      icon={checkpoint.icon}
                      emoji={checkpoint.emoji}
                      title={checkpoint.title}
                      lead={checkpoint.lead}
                      bullets={checkpoint.bullets}
                      proTip={checkpoint.proTip}
                      ctaText={checkpoint.ctaText}
                      ctaAction={isLocked ? undefined : () => handleStartQuiz(actualIndex)}
                      variant={checkpoint.variant}
                      isLocked={isLocked}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Survivor Badge - DATABR3ACH Defeated */}
        {unlockedCheckpoints.includes(checkpointData.length) && (
          <div className="mt-12">
            <CheckpointCard
              id="survivor"
              icon={Trophy}
              emoji="💀"
              title="💀🏆 LEGENDARY SURVIVOR 🏆💀"
              lead="Je hebt DATABR3ACH verslagen! Je bent een ware cyber-warrior!"
              bullets={[
                "⚔️ DATABR3ACH Rogue AI verslagen",
                "🛡️ Alle security-uitdagingen overwonnen",
                "💪 Bewezen meester in alle disciplines",
                "🔥 PERIODE 1 Overleeft!",
                "🏆 Exclusieve Survivor Badge verdiend",
              ]}
              proTip="Download je LEGENDARISCHE Survivor Badge - je hebt het verdiend! 💀✨"
              ctaText=""
              variant="final"
            >
              <BadgeGenerator variant="survivor" />
            </CheckpointCard>
          </div>
        )}
      </div>

      <CheckpointQuiz
        open={quizOpen}
        onOpenChange={setQuizOpen}
        quizData={quizQuestions[currentQuizIndex]}
        onSuccess={handleQuizSuccess}
        checkpointTitle={checkpointData[currentQuizIndex]?.title || ""}
      />
    </section>
  );
};
export default Checkpoints;
