import { animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import {
  CastleDiagram,
  ComparisonDiagram,
  ModernRoleDiagram,
  TraditionDiagram,
  TwoKingsDiagram,
} from "./monarchy.diagrams";
import { MonarchyToy } from "./monarchy.toy";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function Toy({ lang, onDone }: ToyProps) {
  return <MonarchyToy lang={lang} onDone={onDone} />;
}

function Widget({ lang, onAnswer }: WidgetProps) {
  return <MonarchyToy lang={lang} mode="quiz" onDone={() => onAnswer(true)} />;
}

export const lesson: Lesson = {
  id: "monarchy",
  story: [
    animatedBeat(
      [
        T(
          "Across the water on Castle Island, leaders are not chosen by elections.",
          "Auf der Schlossinsel jenseits des Wassers werden die Anführer nicht durch Wahlen bestimmt.",
          "Po drugiej stronie zatoki, na Wyspie Zamkowej, przywódcy nie są wybierani w wyborach.",
        ),
        T(
          "Instead, leadership passes down within a single ruling family from parent to child.",
          "Stattdessen wird die Führung innerhalb einer Herrscherfamilie von den Eltern an das Kind vererbt.",
          "Zamiast tego władza przechodzi wewnątrz jednego panującego rodu z rodziców na dzieci.",
        ),
        T(
          "This system of hereditary rule by a king or queen is called a *monarchy*.",
          "Dieses System der Erbfolge durch einen König oder eine Königin nennt man *Monarchie*.",
          "Ten ustrój dziedzicznej władzy króla lub królowej nazywa się *monarchią*.",
        ),
        T(
          "For hundreds of years, many places in history were ruled by monarchs.",
          "Hunderte von Jahren lang wurden viele Orte in der Geschichte von Monarchen regiert.",
          "Przez setki lat wiele krain w historii świata było rządzonych przez monarchów.",
        ),
      ],
      CastleDiagram,
    ),
    animatedBeat(
      [
        T(
          "Long ago, Castle Island had an absolute king named Jasper who held total power alone.",
          "Vor langer Zeit hatte die Schlossinsel einen König namens Jasper, der die gesamte Macht allein besaß.",
          "Dawno temu Wyspą Zamkową rządził król Jasper, który skupiał w swoich rękach pełnię władzy.",
        ),
        T(
          "When King Jasper was wise and caring, the island flourished and bridges were repaired.",
          "Als König Jasper weise und fürsorglich war, blühte die Insel auf und Brücken wurden repariert.",
          "Gdy król Jasper rządził mądrze i odpowiedzialnie, wyspa rozkwitała, a kamienne mosty były naprawiane.",
        ),
        T(
          "But when his son Prince Leo inherited the crown, Leo cared only about hunting fancy peacocks.",
          "Doch als sein Sohn Prinz Leo die Krone erbte, kümmerte er sich nur noch um die Jagd nach Pfauen.",
          "Gdy jednak koronę odziedziczył jego syn, książę Leo, dbał on wyłącznie o polowania na rzadkie pawie.",
        ),
        T(
          "The town roads cracked and taxes spiked, but citizens had no vote to change their leader.",
          "Die Dorfstraßen bekamen Risse und Steuern stiegen, aber Bürger durften ihren Anführer nicht abwählen.",
          "Drogi niszczały, a podatki rosły, lecz mieszkańcy nie mieli prawa głosu, by zmienić swojego władcę.",
        ),
      ],
      TwoKingsDiagram,
    ),
    animatedBeat(
      [
        T(
          "The people of Castle Island realized: trusting power to luck of birth is very risky.",
          "Die Menschen auf der Schlossinsel erkannten: Macht dem Zufall der Geburt zu überlassen ist riskant.",
          "Mieszkańcy Wyspy Zamkowej zrozumieli: powierzenie władzy przypadkowi narodzin jest bardzo ryzykowne.",
        ),
        T(
          "An *absolute monarchy* gives one person total power without elections or courts to check them.",
          "Eine *absolute Monarchie* gibt einer Person die gesamte Macht ohne Wahlen oder Gerichte zur Kontrolle.",
          "*Monarchia absolutna* daje jednemu człowiekowi pełną władzę bez wyborów i bez sądów mogących go powstrzymać.",
        ),
        T(
          "A *constitutional monarchy* keeps the king or queen as a symbol of unity, while an elected parliament governs.",
          "Eine *konstitutionelle Monarchie* behält den Monarchen als Symbol, während ein gewähltes Parlament regiert.",
          "*Monarchia konstytucyjna* pozostawia monarchę jako symbol jedności, podczas gdy krajem rządzi wybrany parlament.",
        ),
        T(
          "In a constitutional system, written laws protect citizens and parliament manages the budget.",
          "In einem konstitutionellen System schützen geschriebene Gesetze die Bürger und das Parlament führt das Budget.",
          "W ustroju konstytucyjnym spisane prawa chronią obywateli, a parlament zarządza publicznymi pieniędzmi.",
        ),
      ],
      ComparisonDiagram,
    ),
    animatedBeat(
      [
        T(
          "Today, Queen Rosa wears the golden crown for festivals and welcomes visiting travelers.",
          "Heute trägt Königin Rosa die Krone bei Festen und begrüßt reisende Gäste.",
          "Dziś królowa Rosa zakłada złotą koronę podczas świąt i wita przybywających gości.",
        ),
        T(
          "She represents shared tradition, but she cannot pass laws or raise taxes on her own.",
          "Sie vertritt die Tradition, kann aber keine Gesetze erlassen oder Steuern eigenmächtig erhöhen.",
          "Reprezentuje wspólną tradycję, lecz nie może samodzielnie stanowić praw ani podnosić podatków.",
        ),
        T(
          "The island's freely elected council makes all decisions, ensuring stability and fairness.",
          "Der frei gewählte Rat der Insel trifft alle Entscheidungen und sichert Stabilität und Fairness.",
          "Wszystkie decyzje podejmuje wolno wybrana rada wyspy, gwarantując stabilność i sprawiedliwość.",
        ),
      ],
      ModernRoleDiagram,
    ),
    animatedBeat(
      [
        T(
          "Combining tradition with elected representation allows people to honor their history while governing fairly.",
          "Tradition mit gewählten Vertretern zu verbinden ermöglicht es, Geschichte zu ehren und gerecht zu regieren.",
          "Połączenie szacunku dla tradycji z wybieranymi przedstawicielami pozwala pielęgnować historię i rządzić sprawiedliwie.",
        ),
        T(
          "This balance ensures that governing decisions are always accountable to the citizens.",
          "Dieses Gleichgewicht stellt sicher, dass politische Entscheidungen stets den Bürgern gegenüber rechenschaftspflichtig sind.",
          "Taka równowaga sprawia, że decyzje rządzących podlegają nieustannej kontroli ze strony obywateli.",
        ),
      ],
      TraditionDiagram,
    ),
  ],
  toyIntro: T(
    "Explore the Castle Island simulator to compare an absolute monarchy with a constitutional monarchy.",
    "Erkunde den Schlossinsel-Simulator, um absolute und konstitutionelle Monarchie zu vergleichen.",
    "Wypróbuj symulator Wyspy Zamkowej, aby porównać monarchię absolutną z monarchią konstytucyjną.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "What defines how leaders are chosen in a monarchy?",
        "Wie werden Anführer in einer Monarchie bestimmt?",
        "W jaki sposób wyłania się przywódców w tradycyjnej monarchii?",
      ),
      options: [
        {
          text: T(
            "Leadership is hereditary and passes down within a ruling royal family",
            "Die Herrschaft ist erblich und wird innerhalb einer königlichen Familie weitergegeben",
            "Władza jest dziedziczna i przechodzi z pokolenia na pokolenie w rodzie królewskim",
          ),
          correct: true,
        },
        {
          text: T(
            "All citizens vote every four weeks in secret booths",
            "Alle Bürger wählen alle vier Wochen in geheimen Kabinen",
            "Wszyscy obywatele głosują co cztery tygodnie w tajnych kabinach",
          ),
        },
        {
          text: T(
            "The fastest runner in the village gets the crown",
            "Der schnellste Läufer des Dorfes bekommt die Krone",
            "Koronę otrzymuje ten, kto najszybciej przebiegnie dystans wokół miasteczka",
          ),
        },
      ],
      hint: T(
        "In a monarchy, titles and leadership are inherited by birth within a family line.",
        "In einer Monarchie werden Titel und Führung durch Geburt in einer Familie vererbt.",
        "W monarchii tytuły i władzę dziedziczy się przez urodzenie w rodzie panującym.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "What is the key difference between an absolute and a constitutional monarchy?",
        "Was ist der Hauptunterschied zwischen einer absoluten und einer konstitutionellen Monarchie?",
        "Jaka jest kluczowa różnica między monarchią absolutną a konstytucyjną?",
      ),
      options: [
        {
          text: T(
            "In a constitutional monarchy, real lawmaking power belongs to an elected parliament bound by laws",
            "In einer konstitutionellen Monarchie liegt die Gesetzgebung bei einem gewählten Parlament unter Gesetzen",
            "W monarchii konstytucyjnej rzeczywista władza ustawodawcza należy do wybranego parlamentu związanego prawem",
          ),
          correct: true,
        },
        {
          text: T(
            "In an absolute monarchy, the king must ask permission from cats",
            "In einer absoluten Monarchie muss der König Katzen um Erlaubnis bitten",
            "W monarchii absolutnej król musi pytać o zgodę koty",
          ),
        },
        {
          text: T(
            "There is no difference between them",
            "Es gibt überhaupt keinen Unterschied zwischen ihnen",
            "Nie ma między nimi żadnej różnicy",
          ),
        },
      ],
      hint: T(
        "Constitutional monarchies place governing power in an elected parliament and written constitution.",
        "Konstitutionelle Monarchien legen die Regierungsmacht in ein gewähltes Parlament und eine Verfassung.",
        "Monarchie konstytucyjne powierzają realną władzę wybranemu parlamentowi i spisanej konstytucji.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "In a modern constitutional monarchy, who makes the laws and taxes?",
        "Wer beschließt in einer modernen konstitutionellen Monarchie die Gesetze und Steuern?",
        "Kto w nowoczesnej monarchii konstytucyjnej uchwala ustawy i podatki?",
      ),
      Widget,
      hint: T(
        "Remember: In a constitutional monarchy, governing power rests with the elected parliament.",
        "Denke daran: In einer konstitutionellen Monarchie liegt die Regierungsmacht beim gewählten Parlament.",
        "Pamiętaj: W monarchii konstytucyjnej władza rządzenia spoczywa w rękach wybranego parlamentu.",
      ),
    },
  ],
  askDad: T(
    "Papa, why did most modern countries decide that people should vote for their leaders instead of inheriting power?",
    "Papa, warum haben die meisten modernen Länder entschieden, dass Menschen ihre Anführer wählen sollten statt Macht zu erben?",
    "Tato, dlaczego większość współczesnych krajów uznała, że ludzie powinni wybierać przywódców, zamiast dziedziczyć władzę?",
  ),
  realLife: {
    title: {
      en: "From Princely States to Constitutional Republic in India",
      de: "Vom Kaiserreich zur Republik in Deutschland",
      pl: "Od monarchii do republiki w Polsce",
    },
    body: {
      en: "India was historically divided into hundreds of princely kingdoms ruled by Maharajas and Nawabs. After independence in 1947, India united into a sovereign democratic republic where all citizens vote. Meanwhile, several modern democracies like the United Kingdom, Spain, and Sweden maintain constitutional monarchies where kings or queens serve as ceremonial heads of state while elected parliaments govern.",
      de: "Deutschland hatte bis 1918 Monarchen (Kaiser und Könige). Nach dem Ersten Weltkrieg wurde Deutschland eine demokratische Republik. Heute sind Nachbarn wie Großbritannien, die Niederlande und Schweden konstitutionelle Monarchien mit gewählten Parlamenten.",
      pl: "W dawnej Polsce panowali królowie: początkowo w monarchii dziedzicznej Piastów, a od 1573 r. wybierani przez szlachtę podczas wolnych elekcji w I Rzeczypospolitej. Po odzyskaniu niepodległości w 1918 r. Polska przyjęła ustrój republikański. Dziś państwa takie jak Wielka Brytania, Hiszpania czy Szwecja to monarchie konstytucyjne, w których monarcha pełni rolę symbolu jedności i tradycji, a realną władzę sprawuje wybrany parlament i rząd.",
    },
  },
  factCard: {
    claims: [
      {
        text: {
          en: "Constitutional history marks the transition from hereditary dynastic rule to parliamentary republics across Europe and Asia after major 20th-century geopolitical transformations.",
          de: "Das Deutsche Kaiserreich endete im November 1918 mit der Abdankung Wilhelms II. und der Ausrufung der Weimarer Republik.",
          pl: "Konstytucja marcowa z 1921 r. definitywnie potwierdziła republikański ustrój odrodzonej Polski, znosząc wszelkie przywileje rodowe i tytuły szlacheckie.",
        },
        source: "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU19210440267",
      },
      {
        text: {
          en: "Republican constitutional law vests sovereignty exclusively in the nation, exercising power through elected representatives or direct referenda.",
          de: "Die Weimarer Reichsverfassung von 1919 begründete die parlamentarische Demokratie in Deutschland.",
          pl: "Art. 4 Konstytucji RP stanowi, że władza zwierzchnia w Rzeczypospolitej Polskiej należy do Narodu, sprawującego ją przez swoich przedstawicieli lub bezpośrednio.",
        },
        source: "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU19970780483",
      },
      {
        text: {
          en: "Contemporary constitutional monarchies in Europe maintain strict separation between ceremonial heads of state and democratically elected parliaments.",
          de: "Mehrere europäische Demokratien wie das Vereinigte Königreich, Schweden, Dänemark und die Niederlande funktionieren als konstitutionelle Monarchien.",
          pl: "Współczesne europejskie monarchie konstytucyjne (m.in. Wielka Brytania, Szwecja, Norwegia, Hiszpania) ograniczają rolę monarchy do funkcji reprezentacyjnych, oddając władzę parlamentom.",
        },
        source: "https://www.parliament.uk/about/how/role/monarchy/",
      },
      {
        text: {
          en: "Historical political science studies demonstrate high governance volatility in absolute systems where succession depends on biological inheritance rather than merit.",
          de: "Historische Analysen zeigen die Anfälligkeit absoluter Erbmonarchien bei ungeeigneten Thronfolgern ohne parlamentarische Kontrollorgane.",
          pl: "Badania politologiczne i historyczne wskazują na wysokie ryzyko kryzysów państwowych w monarchiach absolutnych, w których sukcesja zależy od biologicznego przypadku, a nie kompetencji.",
        },
        source: "https://www.dhm.de/lemo/kapitel/kaiserreich.html",
      },
      {
        text: {
          en: "Comparative institutional archives trace how modern parliamentary supremacy established ministerial responsibility to elected legislative bodies.",
          de: "Das Archiv des Deutschen Bundestages dokumentiert den langen Weg vom monarchischen Obrigkeitsstaat zur parlamentarischen Volkssouveränität.",
          pl: "Zbiory Biblioteki Sejmowej i Archiwum Akt Nowych dokumentują ewolucję od rządów monarchicznych do pełnej suwerenności narodu i odpowiedzialności rządu przed Sejmem.",
        },
        source: "https://biblioteka.sejm.gov.pl",
      },
    ],
    simplified: [
      {
        en: "We contrast wise King Jasper with careless Prince Leo so children understand the risk of relying purely on birth inheritance.",
        de: "Wir vergleichen den weisen König Jasper mit dem leichtsinnigen Prinzen Leo, damit Kinder das Risiko reiner Erbfolge verstehen.",
        pl: "Porównujemy mądrego króla Jaspera z beztroskim księciem Leo, aby dzieci zrozumiały ryzyko opierania rządów wyłącznie na dziedziczeniu.",
      },
      {
        en: "We distinguish absolute power from constitutional figurehead roles using friendly castle and parliament comparisons.",
        de: "Wir unterscheiden absolute Macht von konstitutionellen Symbolrollen anhand anschaulicher Schloss- und Parlamentsbeispiele.",
        pl: "Odróżniamy władzę absolutną od roli symbolicznej w monarchii konstytucyjnej, posługując się prostymi przykładami zamku i rady.",
      },
      {
        en: "We explain modern monarchies as cultural symbols alongside democratic parliaments.",
        de: "Wir erklären moderne Monarchien als kulturelle Traditionssymbole neben frei gewählten demokratischen Parlamenten.",
        pl: "Tłumaczymy, że we współczesnych monarchiach konstytucyjnych królowie są symbolem tradycji, a rządzi demokratyczny parlament.",
      },
    ],
  },
};
