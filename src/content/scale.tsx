import { animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import {
  BothThriveDiagram,
  GrandHarborFactoryDiagram,
  MayaBulkOrderDiagram,
  MossCustomOrderDiagram,
  SamWorkshopDiagram,
  ScaleDiscountDiagram,
} from "./scale.diagrams";
import { ScaleToy } from "./scale.toy";
import "./scale.css";

const T = (en: string, de: string): Text => ({ en, de });

function Toy({ lang, onDone }: ToyProps) {
  return <ScaleToy lang={lang} onDone={onDone} />;
}

function Widget({ lang, onAnswer }: WidgetProps) {
  return <ScaleToy lang={lang} isWidget onWidgetAnswer={onAnswer} />;
}

export const lesson: Lesson = {
  id: "scale",
  story: [
    animatedBeat(
      [
        T(
          "Sam crafts sturdy leather boots in his small town workshop.",
          "Sam stellt in seiner kleinen Werkstatt feste Lederstiefel her.",
        ),
        T(
          "He measures each customer's foot carefully and carves each sole by hand.",
          "Er misst jeden Fuß sorgfältig aus und schnitzt jede Sohle von Hand.",
        ),
        T(
          "His shop is a *small business*: flexible, personal, and focused on custom craft.",
          "Sein Laden ist ein *Kleinbetrieb*: flexibel, persönlich und auf Maßarbeit bedacht.",
        ),
      ],
      SamWorkshopDiagram,
    ),
    animatedBeat(
      [
        T(
          "Across the bay, Grand Harbor opens a shoe *factory*.",
          "Auf der anderen Seite der Bucht eröffnet im Großen Hafen eine Schuh-*Fabrik*.",
        ),
        T(
          "Inside the factory, large mechanical cutting machines stamp out identical boot shapes.",
          "In der Fabrik stanzen große mechanische Schneidemaschinen gleiche Stiefelformen aus.",
        ),
        T(
          "Teams of workers assemble hundreds of identical brown work boots every single week.",
          "Teams von Beschäftigten fertigen jede Woche Hunderte identische Arbeitsstiefel.",
        ),
      ],
      GrandHarborFactoryDiagram,
    ),
    animatedBeat(
      [
        T(
          "When the factory buys leather, it orders an entire ship cargo at once.",
          "Wenn die Fabrik Leder kauft, bestellt sie gleich eine ganze Schiffsladung auf einmal.",
        ),
        T(
          "Tanneries give them a wholesale discount: 1 coin per sheet instead of 2 coins.",
          "Die Gerbereien geben Mengenrabatt: 1 Münze pro Lederstück statt 2 Münzen.",
        ),
        T(
          "Making items cheaper by producing huge quantities is called *scale*.",
          "Dinge durch große Mengen billiger herzustellen, nennt man *Größenvorteil*.",
        ),
      ],
      ScaleDiscountDiagram,
    ),
    animatedBeat(
      [
        T(
          "Maya needs 40 pairs of identical boots for her orchard harvesting team.",
          "Maya braucht 40 Paar gleiche Arbeitsstiefel für ihre Plantagenernte.",
        ),
        T(
          "She does not need custom embroidery; she needs sturdy boots at a fair low price.",
          "Sie braucht keine Ziernähte, sondern feste Stiefel zu einem günstigen Preis.",
        ),
        T(
          "Maya orders from the factory, which delivers all 40 pairs quickly.",
          "Maya bestellt in der Fabrik, die alle 40 Paare schnell und günstig liefert.",
        ),
      ],
      MayaBulkOrderDiagram,
    ),
    animatedBeat(
      [
        T(
          "Later that week, Mayor Moss visits Sam's workshop.",
          "Später in der Woche besucht Bürgermeister Moss Sams Werkstatt.",
        ),
        T(
          "Moss has wide feet and wants formal riding boots carved with delicate leaf patterns.",
          "Moss hat breite Füße und wünscht sich feine Reitstiefel mit Blattmustern.",
        ),
        T(
          "A factory machine cannot do that, but Sam's artisan hands craft the perfect pair.",
          "Eine Fabrikmaschine kann das nicht, aber Sams Handwerk schafft das perfekte Paar.",
        ),
      ],
      MossCustomOrderDiagram,
    ),
    animatedBeat(
      [
        T(
          "Both small craft shops and large factories are essential to a thriving community.",
          "Sowohl kleine Werkstätten als auch große Fabriken sind wichtig für eine Gemeinschaft.",
        ),
        T(
          "Small businesses give personal care, unique repairs, and custom fits.",
          "Kleinbetriebe bieten persönliche Beratung, Reparaturen und Sonderanfertigungen.",
        ),
        T(
          "Factories make everyday necessities affordable for thousands of families.",
          "Fabriken machen Dinge des Alltags für Tausende von Familien bezahlbar.",
        ),
      ],
      BothThriveDiagram,
    ),
  ],
  toyIntro: T(
    "Explore how scale discounts lower costs for factories and route custom versus bulk orders!",
    "Erkunde, wie Mengenvorteile Kosten senken, und leite Maß- und Großaufträge richtig weiter!",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "What is the main advantage of large factories producing at scale?",
        "Was ist der Hauptvorteil großer Fabriken mit Größenvorteilen?",
      ),
      options: [
        {
          text: T(
            "They produce large volumes of standard goods at lower unit costs",
            "Sie stellen große Mengen von Standardwaren zu niedrigen Stückkosten her",
          ),
          correct: true,
        },
        {
          text: T(
            "They make every single boot a different color and size",
            "Sie machen jeden einzelnen Schuh in einer anderen Farbe und Größe",
          ),
        },
        {
          text: T(
            "They do not require any materials or tools",
            "Sie brauchen überhaupt keine Materialien oder Werkzeuge",
          ),
        },
      ],
      hint: T(
        "Factories gain economies of scale by purchasing in bulk and utilizing machinery.",
        "Fabriken erzielen Größenvorteile durch Großeinkauf und spezialisierte Maschinen.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "What is a special strength of a small artisan business?",
        "Was ist eine besondere Stärke eines kleinen Handwerksbetriebs?",
      ),
      options: [
        {
          text: T(
            "Crafting custom goods tailored to individual customer needs",
            "Maßgeschneiderte Produkte für individuelle Kundenwünsche anzufertigen",
          ),
          correct: true,
        },
        {
          text: T(
            "Operating hundreds of steam engines in one room",
            "Hunderte Dampfmaschinen in einem Raum zu betreiben",
          ),
        },
        {
          text: T(
            "Selling only to people from other islands",
            "Nur an Menschen von anderen Inseln zu verkaufen",
          ),
        },
      ],
      hint: T(
        "Small workshops excel at custom requests, personal relationships, and unique designs.",
        "Kleine Werkstätten glänzen bei Sonderwünschen, persönlichem Kontakt und Unikaten.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Maya needs 30 standard boots quickly at the lowest price for her crew. Select the business best suited for low-cost bulk production.",
        "Maya braucht 30 Standardstiefel schnell zum besten Preis. Wähle den Betrieb für günstige Massenfertigung.",
      ),
      Widget,
      hint: T(
        "Select Grand Harbor Factory for standard bulk boots at low unit cost, then click Check.",
        "Wähle die Schuhfabrik Großer Hafen für günstige Großserien und klicke auf Prüfen.",
      ),
    },
  ],
  askDad: T(
    "Papa, why does Germany have so many family-owned Mittelstand companies making specialized tools instead of just a few giant factories?",
    "Papa, warum gibt es in Deutschland so viele familiengeführte Mittelstandsbetriebe statt nur weniger riesiger Fabriken?",
  ),
  realLife: {
    title: T("The German Mittelstand and industrial scale", "Der deutsche Mittelstand und industrielle Fabriken"),
    body: T(
      "Germany's economy relies heavily on the 'Mittelstand': hundreds of thousands of small and medium family-owned companies that lead the world in specialized engineering. At the same time, large industrial factories build vehicles and machines efficiently at massive scale.",
      "Deutschlands Wirtschaft stützt sich stark auf den Mittelstand: Hunderttausende kleiner und mittlerer Familienunternehmen, die weltweit führend in Spezialbereichen sind. Gleichzeitig fertigen große Industriefabriken Fahrzeuge und Maschinen effizient in riesigen Serien.",
    ),
  },
  factCard: {
    claims: [
      {
        text: "The Institute for SME Research (IfM Bonn) defines and documents the economic contribution of small and medium enterprises (Mittelstand) in Germany.",
        source: "https://www.ifm-bonn.org/",
      },
      {
        text: "The Federal Statistical Office (Destatis) business register categorizes firms across micro-enterprises, small firms, and large industrial producers.",
        source: "https://www.destatis.de/DE/Themen/Branchen-Unternehmen/Unternehmen/_inhalt.html",
      },
      {
        text: "The Federal Ministry for Economic Affairs (BMWK) develops policy frameworks supporting innovative Mittelstand businesses alongside industrial scale.",
        source: "https://www.bmwk.de/Redaktion/DE/Dossier/mittelstand.html",
      },
      {
        text: "The Federation of German Industries (BDI) represents industrial manufacturers achieving global scale through automation and modern factories.",
        source: "https://bdi.eu/",
      },
      {
        text: "The Association of German Chambers of Commerce (DIHK) emphasizes the complementary roles of regional craftsmanship and industrial mass production.",
        source: "https://www.dihk.de/",
      },
    ],
    simplified: [
      "In the lesson, Sam makes custom boots while a single factory makes standard ones. In reality, modern companies often combine automated production with modular customization.",
      "Economies of scale also involve transport logistics, specialized software, and capital financing beyond simple bulk material discounts.",
    ],
  },
};
