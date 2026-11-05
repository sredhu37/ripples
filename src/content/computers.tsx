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

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

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
          "Lange bevor Computer bunte Bildschirme hatten, nutzten Menschen Rechenrahmen aus Holz zum Zaehlen.",
          "Długo zanim komputery zyskały kolorowe ekrany, ludzie używali do liczenia drewnianych liczysk i abakusów.",
        ),
        T(
          "Sliding wooden beads along metal rods helped merchants add and subtract coin totals quickly.",
          "Das Schieben von Holzperlen auf Stangen half Haendlern, Geldsummen schnell zusammenzuzaehlen.",
          "Przesuwanie drewnianych koralików na metalowych prętach pomagało kupcom błyskawicznie dodawać i odejmować sumy monet.",
        ),
        T(
          "Inventors built brass clockwork calculators with cogs, but each could only perform basic arithmetic.",
          "Erfinder bauten Rechenmaschinen aus Messing mit Zahnraedern, die aber nur einfache Rechnungen schafften.",
          "Wynalazcy konstruowali mosiężne maszyny liczące z kołami zębatymi, lecz potrafiły one wykonywać tylko proste działania arytmetyczne.",
        ),
      ],
      AbacusGearsDiagram,
    ),
    animatedBeat(
      [
        T(
          "In the 1840s, English mathematician Ada Lovelace studied Charles Babbage's mechanical engine.",
          "In den 1840er-Jahren erforschte die Mathematikerin Ada Lovelace Charles Babbages Rechenmaschine.",
          "W latach czterdziestych XIX wieku angielska matematyczka Ada Lovelace badała mechaniczną maszynę Charlesa Babbage'a.",
        ),
        T(
          "She realized paper cards with punched holes could feed the machine a sequence of clear instructions.",
          "Sie erkannte, dass Lochkarten aus Papier der Maschine eine Folge von klaren Befehlen geben konnten.",
          "Zrozumiała, że papierowe karty z dziurkowanymi otworami mogą przekazywać maszynie ciąg precyzyjnych instrukcji krok po kroku.",
        ),
        T(
          "Lovelace wrote the world's very first computer *algorithm*, becoming the first computer programmer.",
          "Lovelace schrieb den weltweit ersten *Algorithmus* und wurde so zur ersten Programmiererin der Geschichte.",
          "Lovelace napisała pierwszy na świecie *algorytm* komputerowy, stając się pierwszą programistką w historii ludzkości.",
        ),
      ],
      AdaLovelaceEngineDiagram,
    ),
    animatedBeat(
      [
        T(
          "In 1941 in Berlin, inventor Konrad Zuse built the Z3 in his parents' living room.",
          "Im Jahr 1941 baute der Erfinder Konrad Zuse in Berlin die Z3 im Wohnzimmer seiner Eltern.",
          "W 1941 roku w Berlinie wynalazca Konrad Zuse skonstruował maszynę Z3 w salonie swoich rodziców.",
        ),
        T(
          "Using thousands of telephone relays, it was the first programmable digital *computer*.",
          "Mit tausenden ausrangierten Telefonrelais schuf er den ersten programmierbaren *Computer* der Welt.",
          "Wykorzystując tysiące przekaźników telefonicznych, zbudował pierwszy na świecie w pełni programowalny *komputer* cyfrowy.",
        ),
        T(
          "Instead of decimal fingers, Zuse's machine calculated entirely using electrical on and off switches.",
          "Statt mit zehn Fingern rechnete Zuses Maschine vollstaendig mit elektrischen Ein- und Ausschaltern.",
          "Zamiast liczenia na dziesięciu palcach, maszyna Zusego liczyła wyłącznie za pomocą elektrycznych przełączników włącz-wyłącz.",
        ),
      ],
      KonradZuseZ3Diagram,
    ),
    animatedBeat(
      [
        T(
          "Modern microchips replaced clunky mechanical switches with billions of microscopic transistors.",
          "Moderne Mikrochips ersetzten die lauten mechanischen Schalter durch Milliarden winziger Transistoren.",
          "Współczesne mikrochipy zastąpiły głośne przełączniki mechaniczne miliardami mikroskopijnych tranzystorów.",
        ),
        T(
          "A switch turned on represents the number one, while a switch turned off represents zero.",
          "Ein eingeschalteter Schalter steht fuer die Zahl eins, ein ausgeschalteter fuer die Zahl null.",
          "Przełącznik włączony reprezentuje cyfrę jeden, podczas gdy przełącznik wyłączony oznacza zero.",
        ),
        T(
          "This two-digit counting system is called *binary*, forming the universal alphabet of all digital technology.",
          "Dieses Zaehlsystem mit nur zwei Ziffern heisst *Binaercode* und bildet die Sprache aller Digitaltechnik.",
          "Ten dwójkowy system liczenia nazywamy *kodem binarnym*, który tworzy uniwersalny alfabet całej technologii cyfrowej.",
        ),
      ],
      TransistorSwitchesDiagram,
    ),
    animatedBeat(
      [
        T(
          "Computers do not think like humans; they simply flip billions of binary switches at blinding speed.",
          "Computer denken nicht wie Menschen; sie schalten lediglich Milliarden Schalter blitzschnell um.",
          "Komputery nie myślą jak ludzie; po prostu przełączają miliardy binarnych styków z zawrotną prędkością.",
        ),
        T(
          "By arranging millions of zeros and ones, processors paint vibrant pictures on your screen.",
          "Aus Millionen von Nullen und Einsen zaubern Prozessoren leuchtende Bilder auf den Bildschirm.",
          "Układając miliony zer i jedynek w ułamku sekundy, procesory malują barwne obrazy na twoim ekranie.",
        ),
        T(
          "Binary instructions play your favorite songs, render 3D video games, and steer spaceships safely.",
          "Binaere Befehle spielen deine Lieblingsmusik ab, berechnen Spiele und steuern Raumschiffe sicher.",
          "Instrukcje binarne odtwarzają twoje ulubione piosenki, generują gry trójwymiarowe i bezpiecznie sterują rakietami w kosmosie.",
        ),
      ],
      DigitalPixelsAudioDiagram,
    ),
  ],
  toyIntro: T(
    "Flip the four binary switches (8, 4, 2, 1) to compose the target decimal number 5.",
    "Schalte die vier Binaerschalter (8, 4, 2, 1) um, damit sie zusammen die Zahl 5 ergeben.",
    "Przestaw cztery binarne przełączniki (8, 4, 2, 1), aby złożyć docelową liczbę dziesiętną 5.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "Who wrote the very first computer algorithm for an automated calculating machine?",
        "Wer verfasste den allerersten Computeralgorithmus fuer eine Rechenmaschine?",
        "Kto napisał pierwszy w historii algorytm komputerowy dla maszyny liczącej?",
      ),
      options: [
        {
          text: T(
            "Ada Lovelace, who realized punched cards could program machines to handle complex tasks",
            "Ada Lovelace, die erkannte, dass Lochkarten Maschinen fuer komplexe Aufgaben anleiten koennen",
            "Ada Lovelace, która zrozumiała, że karty perforowane mogą programować maszyny do złożonych zadań",
          ),
          correct: true,
        },
        {
          text: T(
            "A friendly owl who typed on a typewriter made of pinecones",
            "Eine freundliche Eule, die auf einer Schreibmaschine aus Tannenzapfen tippte",
            "Sympatyczna sowa pisząca na maszynie do pisania zrobionej z szyszek",
          ),
        },
        {
          text: T(
            "Captain Blackbeard while steering his pirate ship across the Caribbean",
            "Kapitaen Schwarzbart, waehrend er sein Piratenschiff durch die Karibik steuerte",
            "Kapitan Czarnobrody podczas sterowania statkiem pirackim po Karaibach",
          ),
        },
      ],
      hint: T(
        "Ada Lovelace pioneered computer programming in the 1840s working on Babbage's designs.",
        "Ada Lovelace entwickelte in den 1840er-Jahren die ersten Grundlagen der Computerprogrammierung.",
        "Ada Lovelace zapoczątkowała programowanie komputerowe w latach czterdziestych XIX wieku przy projektach Babbage'a.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "What does binary code use to represent numbers, text, and pictures?",
        "Woraus besteht der Binaercode, mit dem Computer Zahlen, Texte und Bilder darstellen?",
        "Czego używa kod binarny do przedstawiania liczb, tekstu i obrazów?",
      ),
      options: [
        {
          text: T(
            "Only two numbers, 0 and 1, represented by microscopic switches being off or on",
            "Aus nur zwei Ziffern, 0 und 1, dargestellt durch mikroskopische Aus- und Ein-Schalter",
            "Tylko dwóch cyfr, 0 i 1, odpowiadających wyłączonym lub włączonym mikroskopijnym przełącznikom",
          ),
          correct: true,
        },
        {
          text: T(
            "Alphabet soup noodles floating in a bowl of warm broth",
            "Aus Buchstabensuppen-Nudeln, die in einer Schuessel Gemuesebruehe schwimmen",
            "Literek makaronu pływających w misce ciepłego rosołu",
          ),
        },
        {
          text: T(
            "Secret handshakes practiced by mathematicians on mountain peaks",
            "Aus geheimen Handschlaegen, die Mathematiker auf Berggipfeln ueben",
            "Sekretnych uścisków dłoni ćwiczonych przez matematyków na szczytach gór",
          ),
        },
      ],
      hint: T(
        "Binary represents all digital information using patterns of 0 and 1.",
        "Der Binaercode drueckt alle digitalen Informationen durch Folgen von 0 und 1 aus.",
        "Kod binarny wyraża wszystkie informacje cyfrowe za pomocą wzorców złożonych z 0 i 1.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Flip the switches to compose binary 1010, which equals decimal 10 (8 + 2).",
        "Schalte die Bits so, dass sie binaer 1010 ergeben, was der Dezimalzahl 10 (8 + 2) entspricht.",
        "Przestaw bity, aby uzyskać liczbę binarną 1010, co odpowiada liczbie dziesiętnej 10 (8 + 2).",
      ),
      Widget,
      hint: T(
        "Turn on the +8 switch and the +2 switch, leaving +4 and +1 off, then tap check.",
        "Schalte die Schalter fuer +8 und +2 ein, lasse +4 und +1 aus und tippe auf pruefen.",
        "Włącz przełączniki +8 i +2, pozostawiając +4 i +1 wyłączone, a następnie kliknij sprawdź.",
      ),
    },
  ],
  askDad: T(
    "Papa, how can tiny silicon chips inside our phones remember our favorite songs and family photos?",
    "Papa, wie koennen winzige Siliziumchips in unseren Handys unsere Lieblingslieder und Fotos speichern?",
    "Tato, jak małe chipy krzemowe w telefonie mieszczą nasze ulubione piosenki i rodzinne zdjęcia?",
  ),
  realLife: {
    title: {
      en: "Konrad Zuse and the Z3 in Berlin",
      de: "Konrad Zuse und die Z3 in Berlin",
      pl: "Polscy kryptolodzy i pierwsze polskie komputery",
    },
    body: {
      en: "In the Deutsches Technikmuseum in Berlin, visitors can see a working replica of Konrad Zuse's Z3 computer. Instead of silent microchips, this pioneering machine clicked loudly as thousands of telephone switches flipped back and forth to calculate numbers, demonstrating the mechanical origins of modern software.",
      de: "Im Deutschen Technikmuseum in Berlin koennen Besucher einen Nachbau von Konrad Zuses Z3 bestaunen. Statt lautloser Siliziumchips klackten bei dieser Pionier-Maschine tausende Telefonschalter lautstark hin und her, um Zahlen zu berechnen und die Anfaenge moderner Software zu begruenden.",
      pl: "Zanim powstały pierwsze mikroprocesory, polscy matematycy Marian Rejewski, Jerzy Różycki i Henryk Zygalski w 1932 roku złamali kod niemieckiej maszyny szyfrującej Enigma za pomocą matematyki i bomb kryptologicznych. W powojennej Polsce w 1958 roku w Warszawie zbudowano pierwszy polski komputer cyfrowy XYZ, a w zakładach Elwro we Wrocławiu seryjnie wytwarzano słynne komputery Odra.",
    },
  },
  factCard: {
    claims: [
      {
        text: {
          en: "Ada Lovelace published the first algorithm designed to be carried out by Charles Babbage's Analytical Engine in 1843.",
          de: "Ada Lovelace veroeffentlichte 1843 den ersten Algorithmus fuer Charles Babbages mechanische Rechenmaschine.",
          pl: "Ada Lovelace opublikowała w 1843 roku pierwszy algorytm przeznaczony dla maszyny analitycznej Charlesa Babbage'a.",
        },
        source: "https://www.bodleian.ox.ac.uk/about/media/ada-lovelace",
      },
      {
        text: {
          en: "Konrad Zuse completed the Z3 in Berlin in May 1941, the world's first working programmable electromechanical digital computer.",
          de: "Konrad Zuse vollendete im Mai 1941 in Berlin die Z3, den weltweit ersten programmierbaren elektromechanischen Rechner.",
          pl: "Konrad Zuse ukończył w Berlinie w maju 1941 roku maszynę Z3, pierwszy działający programowalny komputer cyfrowy.",
        },
        source: "https://technikmuseum.berlin/en/exhibitions/permanent-exhibitions/the-network/",
      },
      {
        text: {
          en: "The invention of the point-contact transistor at Bell Labs in 1947 revolutionized computing by replacing vacuum tubes.",
          de: "Die Erfindung des Transistors in den Bell Labs 1947 revolutionierte die Computertechnik und ersetzte die Vakuumroehren.",
          pl: "Wynalezienie tranzystora w Bell Labs w 1947 roku zrewolucjonizowało informatykę, zastępując zawodne lampy próżniowe.",
        },
        source: "https://www.britannica.com/technology/transistor",
      },
      {
        text: {
          en: "Modern microprocessors contain tens of billions of microscopic transistors fabricated on small silicon dies.",
          de: "Moderne Mikroprozessoren enthalten zig Milliarden mikroskopischer Transistoren auf kleinen Silizium-Plaettchen.",
          pl: "Nowoczesne mikroprocesory mieszczą dziesiątki miliardów mikroskopijnych tranzystorów wytrawionych na płytkach krzemowych.",
        },
        source: "https://www.computerhistory.org/siliconengine/semiconductor-technology-timeline/",
      },
      {
        text: {
          en: "Binary logic in computing is based on Boolean algebra, developed by English mathematician George Boole in 1847.",
          de: "Die binaere Logik basiert auf der Booleschen Algebra, die George Boole 1847 begruendete.",
          pl: "Polscy matematycy Marian Rejewski, Jerzy Różycki i Henryk Zygalski złamali kod maszyny Enigma w 1932 r., tworząc podwaliny kryptologii matematycznej.",
        },
        source: "https://dzieje.pl/aktualnosci/90-lat-temu-polscy-kryptolodzy-zlamali-szyfr-enigmy",
      },
    ],
    simplified: [
      {
        en: "We explain computation through simple electronic light switches that are either off (0) or on (1).",
        de: "Wir erklaeren das Rechnen anhand einfacher Lichtschalter, die entweder aus (0) oder ein (1) sind.",
        pl: "Wyjaśniamy obliczenia komputerowe poprzez proste przełączniki światła, które są wyłączone (0) lub włączone (1).",
      },
      {
        en: "We celebrate Ada Lovelace and Konrad Zuse as historical pioneers of software and hardware.",
        de: "Wir wuerdigen Ada Lovelace und Konrad Zuse als Pioniere von Software und Hardware.",
        pl: "Przedstawiamy Adę Lovelace i Konrada Zusego jako historycznych pionierów oprogramowania i sprzętu.",
      },
      {
        en: "We show how combinations of binary bits form numbers, text letters, and screen pixels.",
        de: "Wir zeigen, wie Kombinationen aus Bits Zahlen, Buchstaben und Bildpunkte auf Bildschirmen erzeugen.",
        pl: "Pokazujemy, jak kombinacje bitów tworzą liczby, litery tekstu i piksele na ekranach.",
      },
    ],
  },
};
