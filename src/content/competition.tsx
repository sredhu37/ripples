import { animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import {
  BeaImprovesDiagram,
  BothBakeriesBusyDiagram,
  CompetitionBenefitsAllDiagram,
  CustomersSwitchDiagram,
  NewBakerArrivesDiagram,
  SoleBakerDiagram,
} from "./competition.diagrams";
import { CompetitionToy } from "./competition.toy";
import "./competition.css";

const T = (en: string, de: string): Text => ({ en, de });

function Toy({ lang, onDone }: ToyProps) {
  return <CompetitionToy lang={lang} onDone={onDone} />;
}

function Widget({ lang, onAnswer }: WidgetProps) {
  return <CompetitionToy lang={lang} isWidget onWidgetAnswer={onAnswer} />;
}

export const lesson: Lesson = {
  id: "competition",
  story: [
    animatedBeat(
      [
        T(
          "For years, Bea was the only baker in Ripple Town.",
          "Jahrelang war Bea die einzige Bäckerin in Ripple Town.",
        ),
        T(
          "Her bread was plain and often cold by morning.",
          "Ihr Brot war einfach und morgens oft schon abgekühlt.",
        ),
        T(
          "Because villagers had nowhere else to buy bread, they bought Bea's loaves anyway.",
          "Weil die Dorfbewohner nirgendwo anders Brot bekamen, kauften sie trotzdem bei Bea.",
        ),
      ],
      SoleBakerDiagram,
    ),
    animatedBeat(
      [
        T(
          "One spring morning, Luca opens a second bakery across the street.",
          "Eines Frühlingsmorgens eröffnet Luca eine zweite Bäckerei gegenüber.",
        ),
        T(
          "Luca bakes warm sesame rolls with a crisp golden crust.",
          "Luca backt ofenwarme Sesambrötchen mit goldener Kruste.",
        ),
        T(
          "Luca is Bea's *competitor*: another business offering similar goods to the same crowd.",
          "Luca ist Beas *Konkurrent*: ein Betrieb, der ähnliche Waren für dieselben Kunden anbietet.",
        ),
      ],
      NewBakerArrivesDiagram,
    ),
    animatedBeat(
      [
        T(
          "Villagers smell Luca's warm sesame rolls and cross the street.",
          "Die Leute riechen Lucas warme Sesambrötchen und laufen hinüber.",
        ),
        T(
          "Pip and Sam rush to buy from Luca instead of Bea.",
          "Pip und Sam kaufen sofort bei Luca statt bei Bea.",
        ),
        T(
          "Bea's shop suddenly stands quiet with unsold loaves on her counter.",
          "Beas Laden steht plötzlich still mit unverkaufte Broten auf der Theke.",
        ),
      ],
      CustomersSwitchDiagram,
    ),
    animatedBeat(
      [
        T(
          "Instead of giving up, Bea gets creative in her kitchen.",
          "Statt aufzugeben, wird Bea in ihrer Backstube erfinderisch.",
        ),
        T(
          "She mixes honey and sweet raisins into fresh warm dough.",
          "Sie mischt Honig und süße Rosinen in frischen warmen Teig.",
        ),
        T(
          "She sets out warm sample slices on a wooden plate for everyone walking by.",
          "Sie stellt Teller mit warmen Kostproben für alle Vorbeigehenden bereit.",
        ),
        T(
          "This race between businesses to win customers is called *competition*.",
          "Dieses Wetteifern um zufriedene Kundschaft nennt man *Wettbewerb*.",
        ),
      ],
      BeaImprovesDiagram,
    ),
    animatedBeat(
      [
        T(
          "Soon, customers divide their morning visits between the two shops.",
          "Bald teilen die Dorfbewohner ihre Besuche auf beide Läden auf.",
        ),
        T(
          "Some villagers love Bea's sweet honey bread; others love Luca's crusty sesame rolls.",
          "Einige lieben Beas süßes Honigbrot, andere Lucas knusprige Sesambrötchen.",
        ),
        T(
          "Both bakeries are busy, and both bakers earn enough coins to thrive.",
          "Beide Bäckereien haben gut zu tun und verdienen genug Münzen zum Leben.",
        ),
      ],
      BothBakeriesBusyDiagram,
    ),
    animatedBeat(
      [
        T(
          "Competition makes businesses try their best every single day.",
          "Wettbewerb bringt Unternehmen dazu, jeden Tag ihr Bestes zu geben.",
        ),
        T(
          "It leads to better quality, fair prices, and friendly service.",
          "Er sorgt für bessere Qualität, faire Preise und freundlichen Service.",
        ),
        T(
          "When businesses compete fairly, the entire town wins!",
          "Wenn Betriebe fair miteinander wetteifern, gewinnt der ganze Ort!",
        ),
      ],
      CompetitionBenefitsAllDiagram,
    ),
  ],
  toyIntro: T(
    "Test how changing prices and upgrading recipes shifts customers between bakeries!",
    "Teste, wie Preisänderungen und Rezept-Upgrades die Kundschaft zwischen den Bäckereien bewegen!",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "What happens when businesses compete fairly for customers?",
        "Was geschieht, wenn Unternehmen fair um Kundschaft wetteifern?",
      ),
      options: [
        {
          text: T(
            "Customers get better choices, higher quality, and fair prices",
            "Kunden erhalten mehr Auswahl, bessere Qualität und faire Preise",
          ),
          correct: true,
        },
        {
          text: T(
            "All shops must close down immediately",
            "Alle Läden müssen sofort schließen",
          ),
        },
        {
          text: T(
            "Bread stops being baked entirely",
            "Es wird überhaupt kein Brot mehr gebacken",
          ),
        },
      ],
      hint: T(
        "Competition pushes sellers to improve products and keep prices attractive.",
        "Wettbewerb spornt Verkäufer an, Waren zu verbessern und Preise fair zu halten.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "Why did Bea improve her bread recipe after Luca opened his bakery?",
        "Warum hat Bea ihr Brotrezept verbessert, nachdem Luca seine Bäckerei eröffnete?",
      ),
      options: [
        {
          text: T(
            "To win back customers who might choose her competitor",
            "Um Kunden zurückzugewinnen, die sonst zum Konkurrenten gehen",
          ),
          correct: true,
        },
        {
          text: T(
            "Because the mayor ordered her to stop baking",
            "Weil der Bürgermeister ihr das Backen verboten hatte",
          ),
        },
        {
          text: T(
            "Because she ran out of flour",
            "Weil ihr das Mehl ausgegangen war",
          ),
        },
      ],
      hint: T(
        "When a competitor offers something fresh, sellers must step up to retain buyers.",
        "Wenn ein Konkurrent Frisches anbietet, muss man sich anstrengen, um Kunden zu halten.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Luca charges 4 coins for dry bread. Bea charges 3 coins for warm honey bread. Which bakery will Pip choose?",
        "Luca verlangt 4 Münzen für trockenes Brot. Bea verlangt 3 Münzen für warmes Honigbrot. Welche Bäckerei wählt Pip?",
      ),
      Widget,
      hint: T(
        "Pip wants tasty warm bread at a fair price: choose Bea's bakery!",
        "Pip möchte leckeres warmes Brot zu einem fairen Preis: wähle Beas Bäckerei!",
      ),
    },
  ],
  askDad: T(
    "Papa, how does having more than one bakery or supermarket in our town help our family get better food?",
    "Papa, wie hilft es unserer Familie, dass es mehr als eine Bäckerei oder einen Supermarkt in unserer Stadt gibt?",
  ),
  realLife: {
    title: T("Competition in Germany's social market economy", "Wettbewerb in Deutschlands sozialer Marktwirtschaft"),
    body: T(
      "Germany's economic system is a Social Market Economy (Soziale Marktwirtschaft). The Act against Restraints of Competition (GWB) ensures companies compete honestly on quality and price. Secret agreements between companies to fix high prices are strictly forbidden.",
      "Deutschlands Wirtschaftsordnung ist die Soziale Marktwirtschaft. Das Gesetz gegen Wettbewerbsbeschränkungen (GWB) sorgt dafür, dass Unternehmen ehrlich über Qualität und Preis konkurrieren. Geheime Preisabsprachen zwischen Firmen sind streng verboten.",
    ),
  },
  factCard: {
    claims: [
      {
        text: "The German Act against Restraints of Competition (GWB) forms the legal bedrock protecting fair commercial competition in Germany.",
        source: "https://www.gesetze-im-internet.de/gwb/",
      },
      {
        text: "The Federal Cartel Office (Bundeskartellamt) actively prosecutes illegal cartels and price-fixing agreements to safeguard consumers.",
        source: "https://www.bundeskartellamt.de/DE/Kartellverbot/kartellverbot_node.html",
      },
      {
        text: "The European Commission enforces antitrust rules across the European Union single market to keep markets competitive and accessible.",
        source: "https://competition-policy.ec.europa.eu/index_en",
      },
      {
        text: "The Federal Ministry for Economic Affairs (BMWK) sets framework policies grounding Germany in social market competition principles.",
        source: "https://www.bmwk.de/Redaktion/DE/Dossier/wettbewerbspolitik.html",
      },
      {
        text: "The Ludwig Erhard Foundation preserves the foundations of the Social Market Economy, emphasizing competition as the driver of broad prosperity.",
        source: "https://www.ludwig-erhard.de/",
      },
    ],
    simplified: [
      "In the story, Luca and Bea compete in a small town. In reality, competition takes place among thousands of companies, regulated by national and European antitrust authorities.",
      "The lesson focuses on product quality and price; in mature markets, customer service, warranties, and supply chains also shape competition.",
    ],
  },
};
