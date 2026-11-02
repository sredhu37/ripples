import { animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import {
  AbacusGearsDiagram,
  AdaLovelaceEngineDiagram,
  KonradZuseZ3Diagram,
  TransistorSwitchesDiagram,
  DigitalPixelsAudioDiagram,
} from "./computers.diagrams";
import { ComputersToy } from "./computers.toy";

const T = (en: string, de: string): Text => ({ en, de });

function Toy({ lang, onDone }: ToyProps) {
  return <ComputersToy lang={lang} onDone={onDone} />;
}

function Widget({ lang, onAnswer }: WidgetProps) {
  return (
    <ComputersToy
      lang={lang}
      mode="quiz"
      onDone={() => onAnswer(true)}
    />
  );
}

export const lesson: Lesson = {
  id: "computers",
  story: [
    animatedBeat(
      [
        T(
          "Long before computers had colorful screens, people used wooden abacus frames to count.",
          "Lange bevor Computer bunte Bildschirme hatten, nutzten Menschen Rechenrahmen aus Holz zum Zaehlen."
        ),
        T(
          "Sliding wooden beads along metal rods helped merchants add and subtract coin totals quickly.",
          "Das Schieben von Holzperlen auf Stangen half Haendlern, Geldsummen schnell zusammenzuzaehlen."
        ),
        T(
          "Inventors built brass clockwork calculators with cogs, but each could only perform basic arithmetic.",
          "Erfinder bauten Rechenmaschinen aus Messing mit Zahnraedern, die aber nur einfache Rechnungen schafften."
        ),
      ],
      AbacusGearsDiagram
    ),
    animatedBeat(
      [
        T(
          "In the 1840s, English mathematician Ada Lovelace studied Charles Babbage's mechanical engine.",
          "In den 1840er-Jahren erforschte die Mathematikerin Ada Lovelace Charles Babbages Rechenmaschine."
        ),
        T(
          "She realized paper cards with punched holes could feed the machine a sequence of clear instructions.",
          "Sie erkannte, dass Lochkarten aus Papier der Maschine eine Folge von klaren Befehlen geben konnten."
        ),
        T(
          "Lovelace wrote the world's very first computer *algorithm*, becoming the first computer programmer.",
          "Lovelace schrieb den weltweit ersten *Algorithmus* und wurde so zur ersten Programmiererin der Geschichte."
        ),
      ],
      AdaLovelaceEngineDiagram
    ),
    animatedBeat(
      [
        T(
          "In 1941 in Berlin, inventor Konrad Zuse built the Z3 in his parents' living room.",
          "Im Jahr 1941 baute der Erfinder Konrad Zuse in Berlin die Z3 im Wohnzimmer seiner Eltern."
        ),
        T(
          "Using thousands of telephone relays, it was the first programmable digital *computer*.",
          "Mit tausenden ausrangierten Telefonrelais schuf er den ersten programmierbaren *Computer* der Welt."
        ),
        T(
          "Instead of decimal fingers, Zuse's machine calculated entirely using electrical on and off switches.",
          "Statt mit zehn Fingern rechnete Zuses Maschine vollstaendig mit elektrischen Ein- und Ausschaltern."
        ),
      ],
      KonradZuseZ3Diagram
    ),
    animatedBeat(
      [
        T(
          "Modern microchips replaced clunky mechanical switches with billions of microscopic transistors.",
          "Moderne Mikrochips ersetzten die lauten mechanischen Schalter durch Milliarden winziger Transistoren."
        ),
        T(
          "A switch turned on represents the number one, while a switch turned off represents zero.",
          "Ein eingeschalteter Schalter steht fuer die Zahl eins, ein ausgeschalteter fuer die Zahl null."
        ),
        T(
          "This two-digit counting system is called *binary*, forming the universal alphabet of all digital technology.",
          "Dieses Zaehlsystem mit nur zwei Ziffern heisst *Binaercode* und bildet die Sprache aller Digitaltechnik."
        ),
      ],
      TransistorSwitchesDiagram
    ),
    animatedBeat(
      [
        T(
          "Computers do not think like humans; they simply flip billions of binary switches at blinding speed.",
          "Computer denken nicht wie Menschen; sie schalten lediglich Milliarden Schalter blitzschnell um."
        ),
        T(
          "By arranging millions of zeros and ones, processors paint vibrant pictures on your screen.",
          "Aus Millionen von Nullen und Einsen zaubern Prozessoren leuchtende Bilder auf den Bildschirm."
        ),
        T(
          "Binary instructions play your favorite songs, render 3D video games, and steer spaceships safely.",
          "Binaere Befehle spielen deine Lieblingsmusik ab, berechnen Spiele und steuern Raumschiffe sicher."
        ),
      ],
      DigitalPixelsAudioDiagram
    ),
  ],
  toyIntro: T(
    "Flip the four binary switches (8, 4, 2, 1) to compose the target decimal number 5.",
    "Schalte die vier Binaerschalter (8, 4, 2, 1) um, damit sie zusammen die Zahl 5 ergeben."
  ),
  Toy: Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "Who wrote the very first computer algorithm for an automated calculating machine?",
        "Wer verfasste den allerersten Computeralgorithmus fuer eine Rechenmaschine?"
      ),
      options: [
        {
          text: T(
            "Ada Lovelace, who realized punched cards could program machines to handle complex tasks",
            "Ada Lovelace, die erkannte, dass Lochkarten Maschinen fuer komplexe Aufgaben anleiten koennen"
          ),
          correct: true,
        },
        {
          text: T(
            "A friendly owl who typed on a typewriter made of pinecones",
            "Eine freundliche Eule, die auf einer Schreibmaschine aus Tannenzapfen tippte"
          ),
        },
        {
          text: T(
            "Captain Blackbeard while steering his pirate ship across the Caribbean",
            "Kapitaen Schwarzbart, waehrend er sein Piratenschiff durch die Karibik steuerte"
          ),
        },
      ],
      hint: T(
        "Ada Lovelace pioneered computer programming in the 1840s working on Babbage's designs.",
        "Ada Lovelace entwickelte in den 1840er-Jahren die ersten Grundlagen der Computerprogrammierung."
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "What does binary code use to represent numbers, text, and pictures?",
        "Woraus besteht der Binaercode, mit dem Computer Zahlen, Texte und Bilder darstellen?"
      ),
      options: [
        {
          text: T(
            "Only two numbers, 0 and 1, represented by microscopic switches being off or on",
            "Aus nur zwei Ziffern, 0 und 1, dargestellt durch mikroskopische Aus- und Ein-Schalter"
          ),
          correct: true,
        },
        {
          text: T(
            "Alphabet soup noodles floating in a bowl of warm broth",
            "Aus Buchstabensuppen-Nudeln, die in einer Schuessel Gemuesebruehe schwimmen"
          ),
        },
        {
          text: T(
            "Secret handshakes practiced by mathematicians on mountain peaks",
            "Aus geheimen Handschlaegen, die Mathematiker auf Berggipfeln ueben"
          ),
        },
      ],
      hint: T(
        "Binary represents all digital information using patterns of 0 and 1.",
        "Der Binaercode drueckt alle digitalen Informationen durch Folgen von 0 und 1 aus."
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Flip the switches to compose binary 1010, which equals decimal 10 (8 + 2).",
        "Schalte die Bits so, dass sie binaer 1010 ergeben, was der Dezimalzahl 10 (8 + 2) entspricht."
      ),
      Widget: Widget,
      hint: T(
        "Turn on the +8 switch and the +2 switch, leaving +4 and +1 off, then tap check.",
        "Schalte die Schalter fuer +8 und +2 ein, lasse +4 und +1 aus und tippe auf pruefen."
      ),
    },
  ],
  askDad: T(
    "Papa, how can tiny silicon chips inside our phones remember our favorite songs and family photos?",
    "Papa, wie koennen winzige Siliziumchips in unseren Handys unsere Lieblingslieder und Fotos speichern?"
  ),
  realLife: {
    title: T("Konrad Zuse and the Z3 in Berlin", "Konrad Zuse und die Z3 in Berlin"),
    body: T(
      "In the Deutsches Technikmuseum in Berlin, visitors can see a working replica of Konrad Zuse's Z3 computer. Instead of silent microchips, this pioneering machine clicked loudly as thousands of telephone switches flipped back and forth to calculate numbers, demonstrating the mechanical origins of modern software.",
      "Im Deutschen Technikmuseum in Berlin koennen Besucher einen Nachbau von Konrad Zuses Z3 bestaunen. Statt lautloser Siliziumchips klackten bei dieser Pionier-Maschine tausende Telefonschalter lautstark hin und her, um Zahlen zu berechnen und die Anfaenge moderner Software zu begruenden."
    ),
  },
  factCard: {
    claims: [
      {
        text: "Ada Lovelace published the first algorithm designed to be carried out by Charles Babbage's Analytical Engine in 1843.",
        source: "https://www.bodleian.ox.ac.uk/about/media/ada-lovelace",
      },
      {
        text: "Konrad Zuse completed the Z3 in Berlin in May 1941, the world's first working programmable electromechanical digital computer.",
        source: "https://technikmuseum.berlin/en/exhibitions/permanent-exhibitions/the-network/",
      },
      {
        text: "The invention of the point-contact transistor at Bell Labs in 1947 revolutionized computing by replacing vacuum tubes.",
        source: "https://www.britannica.com/technology/transistor",
      },
      {
        text: "Modern microprocessors contain tens of billions of microscopic transistors fabricated on small silicon dies.",
        source: "https://www.computerhistory.org/siliconengine/semiconductor-technology-timeline/",
      },
      {
        text: "Binary logic in computing is based on Boolean algebra, developed by English mathematician George Boole in 1847.",
        source: "https://www.britannica.com/biography/George-Boole",
      },
    ],
    simplified: [
      "We explain computation through simple electronic light switches that are either off (0) or on (1).",
      "We celebrate Ada Lovelace and Konrad Zuse as historical pioneers of software and hardware.",
      "We show how combinations of binary bits form numbers, text letters, and screen pixels.",
    ],
  },
};
