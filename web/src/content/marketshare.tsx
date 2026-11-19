import { animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import {
  ClaraHoneyApplesDiagram,
  ClaraRedApplesDiagram,
  FinnGreenApplesDiagram,
  FruitMarketIntroDiagram,
  MarketDynamicsDiagram,
  MarketSharePieDiagram,
} from "./marketshare.diagrams";
import { MarketShareToy } from "./marketshare.toy";
import "./marketshare.css";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function Toy({ lang, onDone }: ToyProps) {
  return <MarketShareToy lang={lang} onDone={onDone} />;
}

function Widget({ lang, onAnswer }: WidgetProps) {
  return <MarketShareToy lang={lang} isWidget onWidgetAnswer={onAnswer} />;
}

export const lesson: Lesson = {
  id: "marketshare",
  story: [
    animatedBeat(
      [
        T(
          "Every morning, 10 hungry villagers walk to the town square to buy fruit.",
          "Jeden Morgen gehen 10 hungrige Dorfbewohner auf den Marktplatz, um Obst zu kaufen.",
          "Każdego ranka 10 głodnych mieszkańców przychodzi na rynek, aby kupić owoce.",
        ),
        T(
          "All the buyers who want a certain kind of good form a *market*.",
          "Alle Käuferinnen und Käufer für eine bestimmte Ware bilden einen *Markt*.",
          "Wszyscy kupujący, którzy potrzebują danego rodzaju towaru, tworzą *rynek*.",
        ),
        T(
          "These 10 fruit lovers are Ripple Town's entire fruit market.",
          "Diese 10 Obstliebhaber sind der gesamte Obstmarkt von Ripple Town.",
          "Tych 10 smakoszy owoców stanowi cały rynek owoców w Ripple Town.",
        ),
      ],
      FruitMarketIntroDiagram,
    ),
    animatedBeat(
      [
        T(
          "Finn sets up a wooden barrel filled with crisp green apples.",
          "Finn stellt ein Holzfass mit knackigen grünen Äpfeln auf.",
          "Finn stawia drewnianą beczkę pełną chrupiących zielonych jabłek.",
        ),
        T(
          "Seven villagers line up at Finn's stand to buy their morning snack.",
          "Sieben Leute stellen sich an Finns Stand an, um ihren Snack zu kaufen.",
          "Siedmiu mieszkańców ustawia się w kolejce do Finna, by kupić poranną przekąskę.",
        ),
        T(
          "Finn serves 7 out of the 10 fruit buyers in town.",
          "Finn bedient 7 von den 10 Obst-Käufern im Ort.",
          "Finn obsługuje 7 z 10 kupujących owoce w miasteczku.",
        ),
      ],
      FinnGreenApplesDiagram,
    ),
    animatedBeat(
      [
        T(
          "Across the path, Clara sets up a bright basket of sweet red apples.",
          "Gegenüber bietet Clara einen Korb mit süßen roten Äpfeln an.",
          "Po drugiej stronie ścieżki Clara rozkłada kosz pełen słodkich czerwonych jabłek.",
        ),
        T(
          "Three villagers walk over to Clara's stand to buy red apples.",
          "Drei Leute gehen zu Claras Stand, um rote Äpfel zu kaufen.",
          "Trzech mieszkańców podchodzi do stoiska Clary, aby kupić czerwone jabłka.",
        ),
        T(
          "Clara serves 3 out of the 10 fruit buyers in town.",
          "Clara bedient 3 von den 10 Obst-Käufern im Ort.",
          "Clara obsługuje 3 z 10 kupujących owoce w miasteczku.",
        ),
      ],
      ClaraRedApplesDiagram,
    ),
    animatedBeat(
      [
        T(
          "If we draw the 10 fruit buyers as a pie, Finn has a big slice and Clara has a small slice.",
          "Wenn wir die 10 Käufer als Kuchen zeichnen, hat Finn ein großes Stück und Clara ein kleines.",
          "Gdybyśmy narysowali 10 kupujących jako tort, Finn miałby duży kawałek, a Clara mały.",
        ),
        T(
          "The fraction or slice of all customers buying from one business is called *market share*.",
          "Den Anteil oder das Stück aller Kunden eines Betriebs nennt man *Marktanteil*.",
          "Część lub kawałek tortu wszystkich klientów kupujących w danej firmie to *udział w rynku*.",
        ),
        T(
          "Finn holds a 70 percent market share, while Clara holds 30 percent.",
          "Finn hält einen Marktanteil von 70 Prozent, während Clara 30 Prozent hält.",
          "Finn ma 70 procent udziału w rynku, a Clara ma 30 procent.",
        ),
      ],
      MarketSharePieDiagram,
    ),
    animatedBeat(
      [
        T(
          "Clara wants to win more fruit lovers to her stand.",
          "Clara möchte mehr Obst-Fans für ihren Stand gewinnen.",
          "Clara chce przyciągnąć do swojego stoiska więcej miłośników owoców.",
        ),
        T(
          "She begins baking warm honey-glazed apple slices for everyone to taste.",
          "Sie backt warme Honig-Apfelscheiben, die jeder probieren darf.",
          "Zaczyna piec ciepłe plasterki jabłek w miodowej glazurze na darmową degustację.",
        ),
        T(
          "Two villagers smell the honey and switch from Finn to Clara.",
          "Zwei Leute riechen den Honig und wechseln von Finn zu Clara hinüber.",
          "Dwoje mieszkańców czuje zapach miodu i przechodzi od Finna do Clary.",
        ),
        T(
          "Now each seller serves 5 customers: both have a 50 percent market share!",
          "Jetzt bedienen beide je 5 Kunden: beide haben 50 Prozent Marktanteil!",
          "Teraz każdy sprzedawca obsługuje po 5 klientów: oboje mają po 50 procent udziału w rynku!",
        ),
      ],
      ClaraHoneyApplesDiagram,
    ),
    animatedBeat(
      [
        T(
          "Market share is never frozen forever.",
          "Ein Marktanteil bleibt niemals für immer gleich.",
          "Udział w rynku nigdy nie jest dany raz na zawsze.",
        ),
        T(
          "Whenever a shop offers better taste, fairer prices, or a warmer smile, customers can switch.",
          "Wenn ein Laden besseren Geschmack, faire Preise oder Freundlichkeit bietet, wechseln Kunden.",
          "Gdy tylko sklep zaoferuje lepszy smak, uczciwsze ceny lub cieplejszy uśmiech, klienci mogą zmienić wybór.",
        ),
        T(
          "Listening to customers helps every business protect its share.",
          "Auf die Wünsche der Kundschaft zu hören, hilft jedem Betrieb, seinen Anteil zu sichern.",
          "Słuchanie potrzeb klientów pomaga każdej firmie chronić swój udział w rynku.",
        ),
      ],
      MarketDynamicsDiagram,
    ),
  ],
  toyIntro: T(
    "Explore how customers switching stalls changes market share slices on the chart!",
    "Erkunde, wie der Wechsel von Kundschaft die Kuchenstücke des Marktanteils verändert!",
    "Sprawdź, jak przechodzenie klientów zmienia kawałki tortu na wykresie udziału w rynku!",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "What does a company's market share tell us?",
        "Was sagt der Marktanteil eines Unternehmens aus?",
        "O czym informuje nas udział firmy w rynku?",
      ),
      options: [
        {
          text: T(
            "The slice or percentage of total sales it wins in that market",
            "Den Anteil oder Prozentsatz aller Verkäufe in diesem Markt",
            "O części lub procencie całej sprzedaży, jaki zdobywa na danym rynku",
          ),
          correct: true,
        },
        {
          text: T(
            "How many trees grow in the company garden",
            "Wie viele Bäume im Garten der Firma wachsen",
            "Ile drzew rośnie w ogrodzie firmy",
          ),
        },
        {
          text: T(
            "The time the shop opens each morning",
            "Um wie viel Uhr der Laden morgens öffnet",
            "O której godzinie sklep otwiera się rano",
          ),
        },
      ],
      hint: T(
        "Market share measures the portion of total buyers choosing a specific seller.",
        "Der Marktanteil misst, welchen Anteil aller Käufer ein bestimmter Händler gewinnt.",
        "Udział w rynku mierzy, jaka część wszystkich kupujących wybiera konkretnego sprzedawcę.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "If 10 fruit buyers shop in town and 4 buy from Clara, what is Clara's market share?",
        "Wenn 10 Leute im Ort Obst kaufen und 4 bei Clara kaufen, wie hoch ist Claras Marktanteil?",
        "Jeśli 10 klientów kupuje owoce w mieście, a 4 z nich kupuje u Clary, jaki jest udział Clary w rynku?",
      ),
      options: [
        { text: T("14 percent", "14 Prozent", "14 procent") },
        { text: T("40 percent", "40 Prozent", "40 procent"), correct: true },
        { text: T("60 percent", "60 Prozent", "60 procent") },
      ],
      hint: T(
        "4 out of 10 shoppers equals 40 percent of the total market.",
        "4 von 10 Käufern entsprechen 40 Prozent des gesamten Marktes.",
        "4 z 10 kupujących to 40 procent całego rynku.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "There are 10 fruit shoppers in town. Adjust the market so Clara holds a 60 percent market share (6 shoppers).",
        "Es gibt 10 Obst-Käufer im Ort. Stelle den Markt so ein, dass Clara 60 Prozent Marktanteil hält (6 Käufer).",
        "W miasteczku jest 10 kupujących owoce. Ustaw rynek tak, aby Clara miała 60 procent udziału w rynku (6 kupujących).",
      ),
      Widget,
      hint: T(
        "Move the slider so Finn has 4 shoppers, leaving 6 shoppers (60 percent) for Clara.",
        "Bewege den Schieber so, dass Finn 4 Käufer hat, sodass 6 Käufer (60 Prozent) bei Clara bleiben.",
        "Przesuń suwak tak, aby Finn miał 4 kupujących, co pozostawia 6 kupujących (60 procent) dla Clary.",
      ),
    },
  ],
  askDad: T(
    "Papa, how does the government make sure one giant company does not buy up all the grocery stores in our city?",
    "Papa, wie sorgt der Staat dafür, dass nicht ein einziger riesiger Konzern alle Supermärkte in unserer Stadt aufkauft?",
    "Tato, jak państwo dba o to, żeby jedna wielka sieć nie wykupiła wszystkich sklepów spożywczych w naszym mieście?",
  ),
  realLife: {
    title: {
      en: "Supermarkets and telecom market share in India",
      de: "Supermarktketten und Marktanteile in Deutschland",
      pl: "Sieci handlowe i ochrona rynku w Polsce",
    },
    body: {
      en: "In India, major retail and telecom companies compete for market share. The Competition Commission of India (CCI) reviews corporate mergers and prevents unfair monopolies so that consumers always retain choices, fair prices, and strong network quality.",
      de: "In Deutschland teilen große Supermarktketten wie Edeka, Rewe, Aldi und Lidl den Lebensmittelmarkt unter sich auf. Das Bundeskartellamt überwacht diese Marktanteile genau, damit keine einzelne Kette die totale Kontrolle über die Preise erlangt.",
      pl: "W Polsce duże sieci handlowe, takie jak Biedronka, Lidl, Dino czy Carrefour, dzielą między sobą rynek spożywczy. Urząd Ochrony Konkurencji i Konsumentów (UOKiK) stale bada udziały rynkowe i fuzje, aby żadna sieć nie zyskała pozycji monopolistycznej i nie narzucała cen konsumentom.",
    },
  },
  factCard: {
    claims: [
      {
        text: {
          en: "Antitrust and competition regulators conduct merger control and abuse of dominance investigations based on enterprise market shares.",
          de: "Kartellbehörden führen Fusionskontrollen und Untersuchungen zu marktbeherrschenden Stellungen anhand von Marktanteilen durch.",
          pl: "Urzędy antymonopolowe (takie jak UOKiK) prowadzą kontrolę koncentracji przedsiębiorstw i badają pozycję dominującą na podstawie udziałów w rynku.",
        },
        source: "https://www.bundeskartellamt.de/DE/Fusionskontrolle/fusionskontrolle_node.html",
      },
      {
        text: {
          en: "Independent monopoly commissions publish regular reports examining concentration across retail, food, and energy sectors.",
          de: "Unabhängige Monopolkommissionen veröffentlichen Hauptgutachten zur Marktkonzentration im Einzelhandel und Energiesektor.",
          pl: "Niezależne instytucje i urzędy publikują raporty badające poziom koncentracji i stan konkurencji w handlu detalicznym oraz energetyce.",
        },
        source: "https://www.monopolkommission.de/",
      },
      {
        text: {
          en: "In economics, market share denotes the percentage of total sales or unit volume in an industry earned by a specific firm.",
          de: "In der Wirtschaftswissenschaft bezeichnet der Marktanteil den prozentualen Anteil eines Unternehmens am gesamten Marktvolumen.",
          pl: "W ekonomii udział w rynku oznacza procentowy udział danego przedsiębiorstwa w całkowitej sprzedaży lub wolumenie całej branży.",
        },
        source: "https://wirtschaftslexikon.gabler.de/definition/marktanteil-39049",
      },
      {
        text: {
          en: "Regulatory enforcement activity documents actions preventing excessive concentration in regional consumer goods markets.",
          de: "Tätigkeitsberichte der Aufsichtsbehörden dokumentieren Maßnahmen gegen übermäßige Marktmacht auf regionalen Konsumgütermärkten.",
          pl: "Sprawozdania organów regulacyjnych dokumentują działania chroniące otwarty rynek i zapobiegające powstawaniu monopoli w handlu detalicznym.",
        },
        source: "https://www.bundeskartellamt.de/DE/UeberUns/Jahresbericht/jahresbericht_node.html",
      },
      {
        text: {
          en: "Economic ministries maintain competition policy frameworks to protect open markets, spur innovation, and safeguard consumer choice.",
          de: "Wirtschaftsministerien gestalten die Wettbewerbspolitik, um offene Märkte, Innovationen und Wahlfreiheit für Verbraucher zu sichern.",
          pl: "Ministerstwa gospodarki i urzędy państwowe realizują politykę ochrony konkurencji, wspierając innowacje i swobodę wyboru konsumentów.",
        },
        source: "https://www.bmwk.de/Redaktion/DE/Dossier/wettbewerbspolitik.html",
      },
    ],
    simplified: [
      {
        en: "In our lesson, the town fruit market has exactly 10 individual shoppers. In reality, national markets comprise millions of consumers and many competitors.",
        de: "In unserer Lektion hat der Obstmarkt genau 10 Käufer. In der Realität bestehen nationale Märkte aus Millionen Kunden und vielen Mitbewerbern.",
        pl: "W naszej lekcji rynek owoców tworzy dokładnie 10 kupujących. W rzeczywistości rynki krajowe składają się z milionów klientów i wielu konkurujących firm.",
      },
      {
        en: "Market share is measured here by shopper headcount, whereas economic authorities often calculate it by total sales revenue or unit turnover.",
        de: "Der Marktanteil wird hier nach Kundenzahl gemessen; Wirtschaftsbehörden berechnen ihn häufig nach Umsatz oder Transaktionsvolumen.",
        pl: "Udział w rynku mierzymy tu liczbą klientów; urzędy antymonopolowe najczęściej obliczają go na podstawie wartości sprzedaży lub liczby sprzedanych sztuk.",
      },
    ],
  },
};
