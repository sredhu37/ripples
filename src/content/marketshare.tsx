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

const T = (en: string, de: string): Text => ({ en, de });

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
        ),
        T(
          "All the buyers who want a certain kind of good form a *market*.",
          "Alle Käuferinnen und Käufer für eine bestimmte Ware bilden einen *Markt*.",
        ),
        T(
          "These 10 fruit lovers are Ripple Town's entire fruit market.",
          "Diese 10 Obstliebhaber sind der gesamte Obstmarkt von Ripple Town.",
        ),
      ],
      FruitMarketIntroDiagram,
    ),
    animatedBeat(
      [
        T(
          "Finn sets up a wooden barrel filled with crisp green apples.",
          "Finn stellt ein Holzfass mit knackigen grünen Äpfeln auf.",
        ),
        T(
          "Seven villagers line up at Finn's stand to buy their morning snack.",
          "Sieben Leute stellen sich an Finns Stand an, um ihren Snack zu kaufen.",
        ),
        T(
          "Finn serves 7 out of the 10 fruit buyers in town.",
          "Finn bedient 7 von den 10 Obst-Käufern im Ort.",
        ),
      ],
      FinnGreenApplesDiagram,
    ),
    animatedBeat(
      [
        T(
          "Across the path, Clara sets up a bright basket of sweet red apples.",
          "Gegenüber bietet Clara einen Korb mit süßen roten Äpfeln an.",
        ),
        T(
          "Three villagers walk over to Clara's stand to buy red apples.",
          "Drei Leute gehen zu Claras Stand, um rote Äpfel zu kaufen.",
        ),
        T(
          "Clara serves 3 out of the 10 fruit buyers in town.",
          "Clara bedient 3 von den 10 Obst-Käufern im Ort.",
        ),
      ],
      ClaraRedApplesDiagram,
    ),
    animatedBeat(
      [
        T(
          "If we draw the 10 fruit buyers as a pie, Finn has a big slice and Clara has a small slice.",
          "Wenn wir die 10 Käufer als Kuchen zeichnen, hat Finn ein großes Stück und Clara ein kleines.",
        ),
        T(
          "The fraction or slice of all customers buying from one business is called *market share*.",
          "Den Anteil oder das Stück aller Kunden eines Betriebs nennt man *Marktanteil*.",
        ),
        T(
          "Finn holds a 70 percent market share, while Clara holds 30 percent.",
          "Finn hält einen Marktanteil von 70 Prozent, während Clara 30 Prozent hält.",
        ),
      ],
      MarketSharePieDiagram,
    ),
    animatedBeat(
      [
        T(
          "Clara wants to win more fruit lovers to her stand.",
          "Clara möchte mehr Obst-Fans für ihren Stand gewinnen.",
        ),
        T(
          "She begins baking warm honey-glazed apple slices for everyone to taste.",
          "Sie backt warme Honig-Apfelscheiben, die jeder probieren darf.",
        ),
        T(
          "Two villagers smell the honey and switch from Finn to Clara.",
          "Zwei Leute riechen den Honig und wechseln von Finn zu Clara hinüber.",
        ),
        T(
          "Now each seller serves 5 customers: both have a 50 percent market share!",
          "Jetzt bedienen beide je 5 Kunden: beide haben 50 Prozent Marktanteil!",
        ),
      ],
      ClaraHoneyApplesDiagram,
    ),
    animatedBeat(
      [
        T(
          "Market share is never frozen forever.",
          "Ein Marktanteil bleibt niemals für immer gleich.",
        ),
        T(
          "Whenever a shop offers better taste, fairer prices, or a warmer smile, customers can switch.",
          "Wenn ein Laden besseren Geschmack, faire Preise oder Freundlichkeit bietet, wechseln Kunden.",
        ),
        T(
          "Listening to customers helps every business protect its share.",
          "Auf die Wünsche der Kundschaft zu hören, hilft jedem Betrieb, seinen Anteil zu sichern.",
        ),
      ],
      MarketDynamicsDiagram,
    ),
  ],
  toyIntro: T(
    "Explore how customers switching stalls changes market share slices on the chart!",
    "Erkunde, wie der Wechsel von Kundschaft die Kuchenstücke des Marktanteils verändert!",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "What does a company's market share tell us?",
        "Was sagt der Marktanteil eines Unternehmens aus?",
      ),
      options: [
        {
          text: T(
            "The slice or percentage of total sales it wins in that market",
            "Den Anteil oder Prozentsatz aller Verkäufe in diesem Markt",
          ),
          correct: true,
        },
        {
          text: T(
            "How many trees grow in the company garden",
            "Wie viele Bäume im Garten der Firma wachsen",
          ),
        },
        {
          text: T(
            "The time the shop opens each morning",
            "Um wie viel Uhr der Laden morgens öffnet",
          ),
        },
      ],
      hint: T(
        "Market share measures the portion of total buyers choosing a specific seller.",
        "Der Marktanteil misst, welchen Anteil aller Käufer ein bestimmter Händler gewinnt.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "If 10 fruit buyers shop in town and 4 buy from Clara, what is Clara's market share?",
        "Wenn 10 Leute im Ort Obst kaufen und 4 bei Clara kaufen, wie hoch ist Claras Marktanteil?",
      ),
      options: [
        { text: T("14 percent", "14 Prozent") },
        { text: T("40 percent", "40 Prozent"), correct: true },
        { text: T("60 percent", "60 Prozent") },
      ],
      hint: T(
        "4 out of 10 shoppers equals 40 percent of the total market.",
        "4 von 10 Käufern entsprechen 40 Prozent des gesamten Marktes.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "There are 10 fruit shoppers in town. Adjust the market so Clara holds a 60 percent market share (6 shoppers).",
        "Es gibt 10 Obst-Käufer im Ort. Stelle den Markt so ein, dass Clara 60 Prozent Marktanteil hält (6 Käufer).",
      ),
      Widget,
      hint: T(
        "Move the slider so Finn has 4 shoppers, leaving 6 shoppers (60 percent) for Clara.",
        "Bewege den Schieber so, dass Finn 4 Käufer hat, sodass 6 Käufer (60 Prozent) bei Clara bleiben.",
      ),
    },
  ],
  askDad: T(
    "Papa, how does the government make sure one giant company does not buy up all the grocery stores in our city?",
    "Papa, wie sorgt der Staat dafür, dass nicht ein einziger riesiger Konzern alle Supermärkte in unserer Stadt aufkauft?",
  ),
  realLife: {
    title: T("Supermarket chains and market share in Germany", "Supermarktketten und Marktanteile in Deutschland"),
    body: T(
      "In Germany, major supermarket chains like Edeka, Rewe, Aldi, and Lidl divide the food market among themselves. The Federal Cartel Office (Bundeskartellamt) closely tracks these market shares so that no single giant chain gains total control over food prices.",
      "In Deutschland teilen große Supermarktketten wie Edeka, Rewe, Aldi und Lidl den Lebensmittelmarkt unter sich auf. Das Bundeskartellamt überwacht diese Marktanteile genau, damit keine einzelne Kette die totale Kontrolle über die Preise erlangt.",
    ),
  },
  factCard: {
    claims: [
      {
        text: "The German Federal Cartel Office conducts merger control and market dominance investigations based on enterprise market shares.",
        source: "https://www.bundeskartellamt.de/DE/Fusionskontrolle/fusionskontrolle_node.html",
      },
      {
        text: "The German Monopolies Commission publishes biannual main reports examining market concentration across retail food and energy markets.",
        source: "https://www.monopolkommission.de/",
      },
      {
        text: "In industrial economics, market share denotes the percentage of total sales or volume in an industry earned by a specific firm.",
        source: "https://wirtschaftslexikon.gabler.de/definition/marktanteil-39049",
      },
      {
        text: "The Bundeskartellamt annual activity report documents enforcement actions preventing excessive concentration in regional consumer goods markets.",
        source: "https://www.bundeskartellamt.de/DE/UeberUns/Jahresbericht/jahresbericht_node.html",
      },
      {
        text: "The Federal Ministry for Economic Affairs and Climate Action maintains competition rules to protect open markets and consumer choice.",
        source: "https://www.bmwk.de/Redaktion/DE/Dossier/wettbewerbspolitik.html",
      },
    ],
    simplified: [
      "In our lesson, the town fruit market has exactly 10 individual shoppers. In reality, national markets comprise millions of consumers and hundreds of regional competitors.",
      "Market share is measured here by shopper headcount, whereas economic authorities often calculate it by revenue or transaction turnover.",
    ],
  },
};
