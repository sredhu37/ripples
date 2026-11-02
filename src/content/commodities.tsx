import { animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import {
  GrainSiloDiagram,
  IdenticalWheatDiagram,
  WeatherDroughtDiagram,
  SuperHarvestDiagram,
  CentralExchangeDiagram,
} from "./commodities.diagrams";
import { CommoditiesToy } from "./commodities.toy";

const T = (en: string, de: string): Text => ({ en, de });

function Toy({ lang, onDone }: ToyProps) {
  return <CommoditiesToy lang={lang} onDone={onDone} />;
}

function Widget({ lang, onAnswer }: WidgetProps) {
  return (
    <CommoditiesToy
      lang={lang}
      mode="quiz"
      onDone={() => onAnswer(true)}
    />
  );
}

export const lesson: Lesson = {
  id: "commodities",
  story: [
    animatedBeat(
      [
        T(
          "Farmer Maya and Farmer Tom harvest wheat from their valley fields.",
          "Bäuerin Maya und Bauer Tom ernten Weizen auf ihren Feldern im Tal."
        ),
        T(
          "They carry heavy sacks to Ripple Town's central grain silo.",
          "Sie tragen schwere Säcke zum zentralen Getreidesilo von Ripple Town."
        ),
        T(
          "Maya's golden wheat is the same quality as Tom's golden wheat.",
          "Mayas goldener Weizen hat die gleiche Qualität wie Toms Weizen."
        ),
        T(
          "Because raw materials are interchangeable, they are called *commodities*.",
          "Weil diese Grundstoffe austauschbar sind, nennt man sie *Rohstoffe*."
        ),
      ],
      GrainSiloDiagram
    ),
    animatedBeat(
      [
        T(
          "A bakery does not care whether the wheat grew in Maya's field or Tom's field.",
          "Einer Bäckerei ist es egal, ob der Weizen auf Mayas oder Toms Feld wuchs."
        ),
        T(
          "Flour mills grind it all together into pure white baking flour.",
          "Getreidemühlen mahlen alles zusammen zu reinem weißem Backmehl."
        ),
        T(
          "Raw goods are traded in bulk on a central *exchange*.",
          "Grundgüter werden in großen Mengen an einer zentralen *Warenbörse* gehandelt."
        ),
        T(
          "All sellers accept the same single market price for their standard goods.",
          "Alle Verkäufer akzeptieren denselben einheitlichen Marktpreis für ihre Standardware."
        ),
      ],
      IdenticalWheatDiagram
    ),
    animatedBeat(
      [
        T(
          "Unlike factory toys, farm crops depend entirely on nature.",
          "Anders als Spielzeug aus Fabriken hängen Feldfrüchte ganz von der Natur ab."
        ),
        T(
          "When a harsh summer drought dries up the soil, harvest shrinks to twenty sacks.",
          "Wenn eine harte Sommerdürre den Boden austrocknet, schrumpft die Ernte auf zwanzig Säcke."
        ),
        T(
          "Bakers compete urgently for the scarce flour, driving the price to eight coins.",
          "Bäcker wetteifern dringend um das knappe Mehl, was den Preis auf acht Münzen treibt."
        ),
        T(
          "Scarcity of essential raw materials pushes prices skyward.",
          "Knappheit bei lebenswichtigen Rohstoffen treibt die Preise in den Himmel."
        ),
      ],
      WeatherDroughtDiagram
    ),
    animatedBeat(
      [
        T(
          "The following year brings gentle rain and warm sunny days.",
          "Das folgende Jahr bringt sanften Regen und warme sonnige Tage."
        ),
        T(
          "The valley fields produce a bumper harvest of ninety sacks of wheat.",
          "Die Felder im Tal bringen eine Rekordernte von neunzig Säcken Weizen hervor."
        ),
        T(
          "The central silo overflows, and the price drops to only two coins per sack.",
          "Das Silo läuft über und der Preis sinkt auf nur zwei Münzen pro Sack."
        ),
        T(
          "Abundant supply makes flour cheap, so every family enjoys fresh bread.",
          "Reichliches Angebot macht Mehl günstig, sodass jede Familie frisches Brot genießt."
        ),
      ],
      SuperHarvestDiagram
    ),
    animatedBeat(
      [
        T(
          "Around the world, people trade grains, metals, and oil on commodity exchanges.",
          "Auf der ganzen Welt handeln Menschen Getreide, Metalle und Öl an Warenbörsen."
        ),
        T(
          "These exchanges help producers sell big harvests and keep factories running.",
          "Diese Börsen helfen Erzeugern, große Ernten zu verkaufen und Fabriken am Laufen zu halten."
        ),
        T(
          "Clear market prices tell farmers what to plant and warn factories of shortages.",
          "Klare Marktpreise zeigen Bauern, was sie anbauen sollen, und warnen Fabriken vor Mängeln."
        ),
        T(
          "Standard commodities form the foundation of everything our society builds.",
          "Standard-Rohstoffe bilden das Fundament von allem, was unsere Gesellschaft baut."
        ),
      ],
      CentralExchangeDiagram
    ),
  ],
  toyIntro: T(
    "Change the valley weather to see how drought and bumper crops change the silo price.",
    "Ändere das Talwetter, um zu sehen, wie Dürre und Rekordernten den Silopreis verändern."
  ),
  Toy: Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "Why is raw wheat from different farmers considered a commodity?",
        "Warum gilt Rohweizen von verschiedenen Bauern als Standard-Rohstoff?"
      ),
      options: [
        {
          text: T(
            "Because standard sacks of wheat are uniform and interchangeable",
            "Weil Standardsäcke Weizen einheitlich und austauschbar sind"
          ),
          correct: true,
        },
        {
          text: T(
            "Because each grain of wheat has a tiny artist signature painted on it",
            "Weil auf jedem Weizenkorn eine winzige Künstlersignatur gemalt ist"
          ),
        },
        {
          text: T(
            "Because wheat can only be eaten on Sundays",
            "Weil Weizen nur sonntags gegessen werden darf"
          ),
        },
      ],
      hint: T(
        "Think about why a bakery can mix Maya's wheat with Tom's wheat.",
        "Überlege, warum eine Bäckerei Mayas Weizen mit Toms Weizen mischen kann."
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "What happens to the price of wheat when a drought cuts the harvest in half?",
        "Was passiert mit dem Weizenpreis, wenn eine Dürre die Ernte halbiert?"
      ),
      options: [
        {
          text: T(
            "The price rises because wheat becomes scarce while bakers still need flour",
            "Der Preis steigt, weil Weizen knapp wird, Bäcker aber weiterhin Mehl brauchen"
          ),
          correct: true,
        },
        {
          text: T(
            "The price immediately drops to zero coins",
            "Der Preis sinkt sofort auf null Münzen"
          ),
        },
        {
          text: T(
            "The price never changes because weather has no effect on farms",
            "Der Preis ändert sich nie, da Wetter keinen Einfluss auf Bauernhöfe hat"
          ),
        },
      ],
      hint: T(
        "When raw goods are hard to find, buyers offer more coins to secure them.",
        "Wenn Rohstoffe schwer zu finden sind, bieten Käufer mehr Münzen, um sie zu bekommen."
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "A summer drought made wheat scarce. Set the weather to Normal Rain so the silo fills to 50 sacks at 4 coins.",
        "Eine Sommerdürre hat Weizen knapp gemacht. Schalte auf normalen Regen um, damit das Silo 50 Säcke zu 4 Münzen füllt."
      ),
      Widget: Widget,
      hint: T(
        "Tap the Normal Rain button and then check.",
        "Tippe auf den Knopf Normaler Regen und dann auf prüfen."
      ),
    },
  ],
  askDad: T(
    "Papa, where does Germany get raw materials like metals, oil, and timber to build cars and houses?",
    "Papa, woher bekommt Deutschland Rohstoffe wie Metalle, Öl und Holz, um Autos und Häuser zu bauen?"
  ),
  realLife: {
    title: T("Commodity Trading in Germany", "Rohstoffhandel in Deutschland"),
    body: T(
      "German industries rely heavily on imported and domestic commodities like copper, grain, and gas. Energy and raw materials are traded on specialized exchanges such as the European Energy Exchange (EEX) in Leipzig, where prices adjust transparently based on daily supply and demand.",
      "Deutsche Industrien sind stark auf importierte und heimische Rohstoffe wie Kupfer, Getreide und Gas angewiesen. Energie und Rohstoffe werden an spezialisierten Börsen wie der European Energy Exchange (EEX) in Leipzig gehandelt, wo sich Preise täglich transparent nach Angebot und Nachfrage bilden."
    ),
  },
  factCard: {
    claims: [
      {
        text: "Commodities are standardized interchangeable raw goods traded on specialized exchanges.",
        source: "https://wirtschaftslexikon.gabler.de/definition/rohstoffe-46814",
      },
      {
        text: "Agricultural commodities experience sharp price swings due to seasonal weather disruptions and harvest yields.",
        source: "https://www.destatis.de/DE/Themen/Wirtschaft/Preise/Erzeugerpreisindex-gewerbliche-Produkte/_inhalt.html",
      },
      {
        text: "The European Energy Exchange (EEX) in Leipzig operates major trading venues for energy and commodity contracts.",
        source: "https://www.deutsche-boerse.com/dbg-de/ueber-uns/deutsche-boerse-group/geschaeftsfelder",
      },
      {
        text: "Organized commodity exchanges provide central counterparty clearing to eliminate counterparty risk.",
        source: "https://www.deutsche-boerse.com/dbg-de/maerkte-services/handel",
      },
      {
        text: "Forward commodity contracts allow producers and industrial buyers to lock in prices against future price volatility.",
        source: "https://wirtschaftslexikon.gabler.de/definition/terminwaren-47561",
      },
    ],
    simplified: [
      "We use sacks of golden wheat in a town silo to explain interchangeable raw commodities without industrial jargon.",
      "We contrast natural crop cycles with manufactured goods to explain why commodity supplies cannot adjust overnight.",
      "We demonstrate weather shocks directly through a tactile drought and bumper harvest controller.",
    ],
  },
};
