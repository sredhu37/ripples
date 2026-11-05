import { animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import {
  RigidRulesIfElseDiagram,
  TrainingExamplesDatasetDiagram,
  PatternScatterFeatureDiagram,
  ScientificAssistantScansDiagram,
  MathematicalCalculatorNoFeelingsDiagram,
} from "./ai.diagrams";
import { AiToy } from "./ai.toy";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function Toy({ lang, onDone }: ToyProps) {
  return <AiToy lang={lang} onDone={onDone} />;
}

function Widget({ lang, onAnswer }: WidgetProps) {
  return (
    <AiToy
      lang={lang}
      mode="quiz"
      onDone={() => onAnswer(true)}
    />
  );
}

export const lesson: Lesson = {
  id: "ai",
  story: [
    animatedBeat(
      [
        T(
          "For decades, computer programs only followed rigid step-by-step instructions written by humans.",
          "Jahrzehntelang folgten Computerprogramme nur starren Anweisungen, die Menschen aufgeschrieben hatten.",
          "Przez dziesięciolecia programy komputerowe wykonywały wyłącznie sztywne instrukcje krok po kroku napisane przez ludzi.",
        ),
        T(
          "A programmer had to write an explicit rule for every single scenario the computer might encounter.",
          "Programmierer mussten fuer jeden denkbaren Fall eine feste Regel wie Wenn-Dann formulieren.",
          "Programista musiał zapisać wyraźną regułę dla każdej pojedynczej sytuacji, na jaką mógł natrafić komputer.",
        ),
        T(
          "If an unforeseen situation arose, the traditional software broke down or gave up with an error.",
          "Tauchte eine unerwartete Situation auf, brach die klassische Software mit einem Fehler ab.",
          "Gdy pojawiła się nieprzewidziana sytuacja, tradycyjne oprogramowanie zawieszało się lub wyświetlało błąd.",
        ),
      ],
      RigidRulesIfElseDiagram,
    ),
    animatedBeat(
      [
        T(
          "A revolutionary method called *machine learning* changed how computers solve complex problems.",
          "Ein neuer Ansatz namens *maschinelles Lernen* veraenderte, wie Computer Probleme loesen.",
          "Przełomowa metoda zwana *uczeniem maszynowym* zmieniła sposób, w jaki komputery rozwiązują złożone problemy.",
        ),
        T(
          "Instead of writing thousands of strict rules, researchers feed algorithms vast libraries of examples.",
          "Statt tausende starre Regeln zu tippen, fuettern Forscher den Algorithmus mit Millionen Beispielen.",
          "Zamiast pisać tysiące sztywnych reguł, naukowcy dostarczają algorytmom ogromne zbiory przykładów.",
        ),
        T(
          "By studying thousands of photos, the computer figures out its own mathematical guide to identify things.",
          "Durch das Betrachten vieler Fotos lernt der Computer selbststaendig, Dinge zu unterscheiden.",
          "Analizując tysiące zdjęć, komputer samodzielnie buduje matematyczny przewodnik do rozpoznawania obiektów.",
        ),
      ],
      TrainingExamplesDatasetDiagram,
    ),
    animatedBeat(
      [
        T(
          "This statistical technique is known as *pattern recognition*.",
          "Dieses mathematische Verfahren heisst *Mustererkennung*.",
          "Ta technika statystyczna nosi nazwę *rozpoznawania wzorców*.",
        ),
        T(
          "To tell an apple from a pear, the model measures curves, color gradients, and pixel distributions.",
          "Um einen Apfel von einer Birne zu unterscheiden, vergleicht das Modell Rundung und Farbtone.",
          "Aby odróżnić jabłko od gruszki, model mierzy zaokrąglenia, odcienie kolorów i układ pikseli.",
        ),
        T(
          "When fed enough clean examples, the model correctly sorts new fruits it has never seen before.",
          "Mit genuegend guten Trainingsdaten sortiert das Modell auch neue Fruechte treffsicher ein.",
          "Gdy otrzyma wystarczająco dużo czystych danych, model trafnie rozpoznaje nowe owoce, których nigdy wcześniej nie widział.",
        ),
      ],
      PatternScatterFeatureDiagram,
    ),
    animatedBeat(
      [
        T(
          "Doctors use these pattern finders to spot tiny early tumors in medical X-ray scans.",
          "Aerzte nutzen diese Musterfinder, um fruehe Spuren von Krankheiten in Roentgenbildern zu erkennen.",
          "Lekarze wykorzystują wykrywacze wzorców, by zauważyć wczesne zmiany chorobowe na zdjęciach rentgenowskich.",
        ),
        T(
          "Astronomers analyze petabytes of starlight data to discover new exoplanets orbiting distant suns.",
          "Astronomen durchkaemmen riesige Datenmengen, um ferne Planeten um fremde Sonnen zu entdecken.",
          "Astronomowie analizują petabajty danych ze stacji kosmicznych, odkrywając planety krążące wokół odległych gwiazd.",
        ),
        T(
          "Translation systems allow people speaking different languages to communicate across borders instantly.",
          "Uebersetzungsprogramme ermoeglichen Menschen weltweit den sofortigen Austausch ohne Sprachbarriere.",
          "Systemy tłumaczące pozwalają ludziom mówiącym różnymi językami porozumiewać się bez barier w czasie rzeczywistym.",
        ),
      ],
      ScientificAssistantScansDiagram,
    ),
    animatedBeat(
      [
        T(
          "Modern *artificial intelligence* is a brilliant mathematical calculator, not a conscious creature.",
          "Moderne *Kuenstliche Intelligenz* ist ein Rechenwerkzeug fuer Muster, kein fuehlendes Lebewesen.",
          "Współczesna *sztuczna inteligencja* to błyskotliwy kalkulator matematyczny, a nie istota obdarzona świadomością.",
        ),
        T(
          "An AI does not possess feelings, hopes, pain, personal intentions, or moral judgment.",
          "Eine KI hat weder Gefuehle noch Traeume, Absichten oder ein eigenes Gewissen.",
          "Sztuczna inteligencja nie ma uczuć, marzeń, bólu, własnych zamiarów ani zmysłu moralnego.",
        ),
        T(
          "Humans remain the thoughtful inventors and caring guides responsible for using these tools wisely.",
          "Wir Menschen bleiben die Erfinder und Entscheider, die diese Werkzeuge verantwortungsvoll lenken.",
          "To ludzie pozostają mądrymi twórcami i opiekunami odpowiedzialnymi za rozsądne używanie tych narzędzi.",
        ),
      ],
      MathematicalCalculatorNoFeelingsDiagram,
    ),
  ],
  toyIntro: T(
    "Train the pattern model by selecting 10 cards with verified labels to achieve over 90% accuracy.",
    "Trainiere das Modell mit 10 Karten und sauberen Daten, um ueber 90% Erkennungsgenauigkeit zu erreichen.",
    "Wytrenuj model, wybierając 10 kart ze zweryfikowanymi etykietami, aby uzyskać ponad 90% dokładności.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "How does machine learning differ from classical rule-based computer programming?",
        "Wie unterscheidet sich maschinelles Lernen von klassischer Programmierung?",
        "Czym różni się uczenie maszynowe od klasycznego programowania opartego na regułach?",
      ),
      options: [
        {
          text: T(
            "It learns mathematical patterns from examples instead of needing humans to code every single rule",
            "Es lernt Muster aus vielen Beispielen, statt jede einzelne Regel vom Menschen vorgeschrieben zu bekommen",
            "Uczy się wzorców na podstawie przykładów, zamiast wymagać ręcznego pisania każdej reguły przez człowieka",
          ),
          correct: true,
        },
        {
          text: T(
            "It requires feeding the computer chocolate pudding every twenty minutes",
            "Es verlangt, dass man dem Rechner alle zwanzig Minuten Schokoladenpudding serviert",
            "Wymaga karmienia komputera budyniem czekoladowym co dwadzieścia minut",
          ),
        },
        {
          text: T(
            "It only works on rainy Sundays when thunder strikes the roof",
            "Es funktioniert nur an regnerischen Sonntagen, wenn der Blitz ins Dach einschlaegt",
            "Działa tylko w deszczowe niedziele, gdy piorun uderza w dach budynku",
          ),
        },
      ],
      hint: T(
        "Machine learning discovers patterns from training examples rather than rigid manual rules.",
        "Maschinelles Lernen erkennt statistische Muster aus Beispielen statt aus starren Vorschriften.",
        "Uczenie maszynowe wykrywa wzorce z przykładów treningowych zamiast sztywnych reguł pisanych ręcznie.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "Does an artificial intelligence model have feelings, emotions, or consciousness?",
        "Hat ein kuenstliches Intelligenzmodell Gefuehle, Emotionen oder ein echtes Bewusstsein?",
        "Czy model sztucznej inteligencji posiada uczucia, emocje lub świadomość?",
      ),
      options: [
        {
          text: T(
            "No, it is a sophisticated mathematical pattern calculator built and guided by humans",
            "Nein, es ist ein mathematischer Musterrechner, der von Menschen gebaut und gesteuert wird",
            "Nie, jest zaawansowanym kalkulatorem wzorców matematycznych stworzonym i kierowanym przez ludzi",
          ),
          correct: true,
        },
        {
          text: T(
            "Yes, computers get sad when they lose a game of checkers",
            "Ja, Computer sind traurig, wenn sie eine Partie Dame verlieren",
            "Tak, komputery smucą się, kiedy przegrywają partię warcabów",
          ),
        },
        {
          text: T(
            "Yes, algorithms dream of eating strawberry ice cream at the park",
            "Ja, Algorithmen traeumen nachts davon, im Park Erdbeereis zu essen",
            "Tak, algorytmy marzą nocami o jedzeniu lodów truskawkowych w parku",
          ),
        },
      ],
      hint: T(
        "AI is a powerful computational tool that calculates probabilities without feelings or sentience.",
        "KI ist ein mathematisches Werkzeug zur Wahrscheinlichkeitsrechnung ohne Gefuehle oder Bewusstsein.",
        "Sztuczna inteligencja to narzędzie do obliczania prawdopodobieństwa bez uczuć i świadomości.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Select 10 Cards and make sure Verified Labels are active to achieve over 90% pattern accuracy.",
        "Waehle 10 Karten und saubere Daten, um ueber 90% Mustererkennungs-Genauigkeit zu erreichen.",
        "Wybierz 10 kart i włącz zweryfikowane etykiety, aby osiągnąć ponad 90% dokładności rozpoznawania wzorców.",
      ),
      Widget,
      hint: T(
        "Tap 10 Cards, ensure clean labels are active, and tap check when the meter turns green.",
        "Tippe auf 10 Karten, aktiviere saubere Daten und druecke pruefen, wenn die Anzeige gruen wird.",
        "Wybierz 10 kart, upewnij się, że czyste etykiety są aktywne, i kliknij sprawdź, gdy wskaźnik zmieni kolor na zielony.",
      ),
    },
  ],
  askDad: T(
    "Papa, if an AI can compose a poem or draw a picture, does that mean it has feelings or imagination?",
    "Papa, wenn eine KI ein Gedicht schreibt oder ein Bild malt, hat sie dann echte Gefuehle oder Fantasie?",
    "Tato, jeśli sztuczna inteligencja potrafi napisać wiersz lub narysować obraz, czy to znaczy, że ma uczucia lub wyobraźnię?",
  ),
  realLife: {
    title: {
      en: "Weather Forecasting at DWD Offenbach",
      de: "Wettervorhersage beim DWD in Offenbach",
      pl: "Sztuczna inteligencja w polskiej medycynie i diagnostyce",
    },
    body: {
      en: "At the German Meteorological Service (Deutscher Wetterdienst, DWD) in Offenbach, supercomputers analyze petabytes of satellite imagery, atmospheric pressure readings, and wind measurements. Deep learning models help meteorologists predict severe storms, flash floods, and heatwaves hours earlier, saving lives and protecting communities.",
      de: "Beim Deutschen Wetterdienst (DWD) in Offenbach verarbeiten Supercomputer gewaltige Datenmengen aus Satellitenbildern, Luftdruck- und Windmessungen. Deep-Learning-Modelle helfen Meteorologen, Unwetter und Hitzewellen fruehzeitig vorherzusagen und Menschen rechtzeitig zu warnen.",
      pl: "W Polsce rozwijane są innowacyjne systemy medyczne oparte na sztucznej inteligencji, takie jak wrocławski Infermedica czy poznański BrainScan. Algorytmy uczenia maszynowego analizują skany tomografii komputerowej mózgu oraz wywiady lekarskie, pomagając lekarzom w szpitalach błyskawicznie wykrywać udary i ratować ludzkie życie.",
    },
  },
  factCard: {
    claims: [
      {
        text: {
          en: "Alan Turing proposed the foundational question 'Can machines think?' in his famous 1950 paper 'Computing Machinery and Intelligence'.",
          de: "Alan Turing stellte 1950 in seiner Abhandlung 'Computing Machinery and Intelligence' die Frage 'Koennen Maschinen denken?'.",
          pl: "Alan Turing postawił fundamentalne pytanie 'Czy maszyny mogą myśleć?' w słynnej pracy z 1950 roku.",
        },
        source: "https://www.turing.ac.uk/about-us/alan-turing",
      },
      {
        text: {
          en: "The term 'Artificial Intelligence' was officially coined at the Dartmouth Summer Research Project on Artificial Intelligence in 1956.",
          de: "Der Begriff 'Kuenstliche Intelligenz' wurde 1956 beim Dartmouth Summer Research Project gepraegt.",
          pl: "Termin 'Sztuczna Inteligencja' został oficjalnie ukuty podczas konferencji w Dartmouth w 1956 roku.",
        },
        source: "https://www.britannica.com/technology/artificial-intelligence",
      },
      {
        text: {
          en: "Deep neural networks trained on the ImageNet visual dataset in 2012 triggered a major boom in modern computer vision and deep learning.",
          de: "Auf dem ImageNet-Datensatz trainierte tiefe neuronale Netze loesten 2012 den weltweiten Boom des Deep Learnings aus.",
          pl: "Głębokie sieci neuronowe trenowane na zbiorze ImageNet w 2012 roku zapoczątkowały rewolucję głębokiego uczenia.",
        },
        source: "https://cacm.acm.org/magazines/2017/6/217743-imagenet/fulltext",
      },
      {
        text: {
          en: "The Stanford Institute for Human-Centered AI publishes an annual AI Index detailing the global progress and research of machine learning systems.",
          de: "Das Stanford Institute for Human-Centered AI veroeffentlicht jaehrlich den AI Index zur weltweiten Entwicklung.",
          pl: "Stanford Institute for Human-Centered AI publikuje doroczny raport AI Index dokumentujący globalny rozwój uczenia maszynowego.",
        },
        source: "https://aiindex.stanford.edu/report/",
      },
      {
        text: {
          en: "Germany adopted its national Artificial Intelligence Strategy in 2018 to foster responsible, trustworthy AI research and European innovation.",
          de: "Deutschland beschloss 2018 seine nationale Strategie Kuenstliche Intelligenz fuer verantwortungsvolle Forschung.",
          pl: "Polska przyjęła Politykę Rozwoju Sztucznej Inteligencji, wspierając etyczny rozwój AI i europejski akt o sztucznej inteligencji (AI Act).",
        },
        source: "https://www.gov.pl/web/ai/polityka-dla-rozwoju-sztucznej-inteligencji-w-polsce-od-roku-2020",
      },
    ],
    simplified: [
      {
        en: "We explain machine learning as finding statistical patterns in examples rather than writing rules by hand.",
        de: "Wir erklaeren maschinelles Lernen als Erkennen statistischer Muster aus Beispielen statt handgeschriebener Regeln.",
        pl: "Tłumaczymy uczenie maszynowe jako odnajdywanie statystycznych wzorców na przykładach zamiast pisania reguł ręcznie.",
      },
      {
        en: "We show how AI recognizes patterns across images, speech, and medical scans.",
        de: "Wir zeigen, wie KI Muster in Bildern, Sprache und medizinischen Scans erkennt.",
        pl: "Pokazujemy, jak sztuczna inteligencja rozpoznaje wzorce w obrazach, mowie i badaniach medycznych.",
      },
      {
        en: "We emphasize that AI models are human-created mathematical tools without feelings, soul, or consciousness.",
        de: "Wir betonen, dass KI-Modelle mathematische Werkzeuge ohne Gefuehle, Seele oder Bewusstsein sind.",
        pl: "Podkreślamy, że modele sztucznej inteligencji to matematyczne narzędzia bez uczuć, duszy i świadomości.",
      },
    ],
  },
};
