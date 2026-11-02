import { animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import {
  PepperCornDiagram,
  SilkRoadCaravanDiagram,
  MonsoonWindDiagram,
  CaravelShipDiagram,
  SpeicherstadtWarehouseDiagram,
} from "./spicetrade.diagrams";
import { SpiceTradeToy } from "./spicetrade.toy";

const T = (en: string, de: string): Text => ({ en, de });

function Toy({ lang, onDone }: ToyProps) {
  return <SpiceTradeToy lang={lang} onDone={onDone} />;
}

function Widget({ lang, onAnswer }: WidgetProps) {
  return (
    <SpiceTradeToy
      lang={lang}
      mode="quiz"
      onDone={() => onAnswer(true)}
    />
  );
}

export const lesson: Lesson = {
  id: "spicetrade",
  story: [
    animatedBeat(
      [
        T(
          "Long ago, European cooks had no refrigerators, and food was often plain and bland.",
          "Vor langer Zeit gab es in Europa keine Kuehlschraenke, und das Essen war oft fade."
        ),
        T(
          "Dried black peppercorns, cloves, and nutmeg preserved meats and added wonderful flavors.",
          "Getrocknete Pfefferkoerner, Nelken und Muskat machten Fleisch haltbar und gaben tollen Geschmack."
        ),
        T(
          "Because spices only grew in distant tropical climates, they were precious luxuries.",
          "Weil Gewuerze nur in fernen tropischen Laendern wuchsen, waren sie kostbare Raritaeten."
        ),
        T(
          "A small pouch of black pepper could be traded for fine wool garments or silver coins.",
          "Ein kleiner Beutel schwarzer Pfeffer konnte gegen feine Wolle oder Silbermuenzen getauscht werden."
        ),
      ],
      PepperCornDiagram
    ),
    animatedBeat(
      [
        T(
          "For centuries, spices had to travel overland across the Silk Road on the backs of camels.",
          "Jahrhundertelang mussten Gewuerze auf Kamelruecken ueber die Seidenstrasse reisen."
        ),
        T(
          "The journey took over a full year across harsh mountain passes and dry deserts.",
          "Die Reise dauerte ueber ein ganzes Jahr durch eisige Gebirgspaesse und Wuesten."
        ),
        T(
          "At every city and bridge along the route, local rulers demanded road tolls and protection fees.",
          "In jeder Stadt und an jeder Bruecke verlangten Herrscher Wegzoelle und Schutzgebuehren."
        ),
        T(
          "By the time a sack of pepper reached Venice or Hamburg, its price had multiplied twenty times.",
          "Bis ein Sack Pfeffer Venedig oder Hamburg erreichte, hatte sich sein Preis vervielfacht."
        ),
      ],
      SilkRoadCaravanDiagram
    ),
    animatedBeat(
      [
        T(
          "Navigators studied the sea and discovered the predictable rhythm of the seasonal *monsoon*.",
          "Seefahrer erforschten das Meer und entdeckten den verlaesslichen Rhythmus des *Monsuns*."
        ),
        T(
          "In summer, warm ocean winds blow steadily from the south-west across the Arabian Sea.",
          "Im Sommer weht der warme Seewind bestaendig von Suedwesten ueber das Arabische Meer."
        ),
        T(
          "In winter, the wind turns around and blows cool air back from the north-east.",
          "Im Winter dreht der Wind und traegt kuehle Luft aus dem Nordosten zurueck."
        ),
        T(
          "By catching these wind patterns, ocean caravels could travel between continents in a few months.",
          "Wer diesen Wind nutzte, konnte mit Segelschiffen Ozeane in wenigen Monaten ueberqueren."
        ),
      ],
      MonsoonWindDiagram
    ),
    animatedBeat(
      [
        T(
          "Sailing across open oceans required large crews, sturdy wooden ships, and expensive cannons.",
          "Fahrten ueber Weltmeere brauchten grosse Besatzungen, Schiffe und teure Ausruestung."
        ),
        T(
          "To fund these ventures, European merchants formed the first joint-stock corporations.",
          "Um dies zu finanzieren, gruendeten Kaufleute die ersten Aktiengesellschaften."
        ),
        T(
          "Monarchs granted these companies a royal *monopoly*, meaning no other merchant could trade in spices.",
          "Herrscher gaben diesen Gesellschaften ein koenigliches *Monopol*, das den Handel allein ihnen vorbehielt."
        ),
        T(
          "Armed company fleets built stone fortresses along the coasts to control the shipping lanes.",
          "Bewaffnete Flotten der Handelskompanien bauten Kuestenfestungen, um die Seewege zu beherrschen."
        ),
      ],
      CaravelShipDiagram
    ),
    animatedBeat(
      [
        T(
          "The global *spice trade* connected continents, cultures, and cooking pots as never before.",
          "Der weltweite *Gewuerzhandel* verband Kontinente, Kulturen und Kochtoepfe wie nie zuvor."
        ),
        T(
          "In Hamburg, the grand *Speicherstadt* was constructed with red brick warehouses along canals.",
          "In Hamburg entstand die *Speicherstadt* mit Backsteinhaeusern direkt an den Fleeten."
        ),
        T(
          "Millions of sacks of pepper, tea, and coffee were unloaded directly from sailing ships.",
          "Millionen Saecke Pfeffer, Tee und Kaffee wurden direkt von Segelschiffen entladen."
        ),
        T(
          "Global trade enriched diets, but also taught humanity the danger of unchecked trade monopolies.",
          "Der Welthandel bereicherte die Welt, lehrte aber auch die Gefahren ruecksichtsloser Monopole."
        ),
      ],
      SpeicherstadtWarehouseDiagram
    ),
  ],
  toyIntro: T(
    "Choose between the overland caravan and the maritime caravel with summer monsoon winds.",
    "Waehle zwischen der Landkarawane und dem Segelschiff mit Sommermonsun."
  ),
  Toy: Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "Why were spices like black pepper so valuable in historical Europe?",
        "Warum waren Gewuerze wie schwarzer Pfeffer im alten Europa so wertvoll?"
      ),
      options: [
        {
          text: T(
            "They preserved meat before refrigerators existed and grew only in distant tropical lands",
            "Sie machten Fleisch vor Erfindung des Kuehlschranks haltbar und wuchsen nur in fernen Tropen"
          ),
          correct: true,
        },
        {
          text: T(
            "They could be used to paint castles bright neon pink",
            "Man konnte damit Schloesser leuchtend neon-pink anstreichen"
          ),
        },
        {
          text: T(
            "Eating pepper allowed sailors to fly through the clouds like birds",
            "Wenn man Pfeffer ass, konnte man wie ein Vogel durch die Wolken fliegen"
          ),
        },
      ],
      hint: T(
        "Spices were essential food preservatives before modern electrical cooling.",
        "Gewuerze halfen, Lebensmittel haltbar zu machen, bevor es Kuehlschraenke gab."
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "How did seasonal monsoon winds assist ancient and early modern sea merchants?",
        "Wie halfen die saisonalen Monsunwinde den Seefahrern damals?"
      ),
      options: [
        {
          text: T(
            "They blew steadily in predictable directions, carrying sailing caravels across the ocean",
            "Sie wehten verlaesslich in feste Richtungen und trugen Segelschiffe ueber das Meer"
          ),
          correct: true,
        },
        {
          text: T(
            "They dropped bags of fresh gold coins directly onto the ship decks",
            "Sie liessen Saecke voller Goldmuenzen direkt auf das Schiffsdeck regnen"
          ),
        },
        {
          text: T(
            "They turned the ocean water into warm strawberry lemonade",
            "Sie verwandelten das Meerwasser in warme Erdbeer-Limonade"
          ),
        },
      ],
      hint: T(
        "Monsoon winds blow southwest in summer and northeast in winter.",
        "Der Monsun weht im Sommer nach Suedwesten und im Winter nach Nordosten."
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Select the Maritime Ocean Route and set the Monsoon Wind to Summer South-West to deliver the cargo.",
        "Waehle den Seeweg und stelle den Monsun auf Sommer-Suedwest, um die Ladung abzuliefern."
      ),
      Widget: Widget,
      hint: T(
        "Click Maritime Ocean Route, then click Summer South-West, then tap check.",
        "Klicke auf Seeweg, dann auf Sommer-Suedwest, und tippe auf pruefen."
      ),
    },
  ],
  askDad: T(
    "Papa, what spices in our kitchen today traveled thousands of miles across the ocean to get here?",
    "Papa, welche Gewuerze in unserer Kueche sind tausende Kilometer ueber den Ozean zu uns gereist?"
  ),
  realLife: {
    title: T("Hamburg Speicherstadt", "Die Hamburger Speicherstadt"),
    body: T(
      "Hamburg's historic Speicherstadt is the largest warehouse district in the world, built on thousands of oak poles along tidal canals. For over a century, merchant ships unloaded cinnamon, cardamom, coffee, and pepper directly into its multi-story brick warehouses. Today it is a UNESCO World Heritage site and houses Germany's Spicy's Spice Museum.",
      "Die Hamburger Speicherstadt ist das groesste historische Lagerhaus-Ensemble der Welt, gebaut auf Eichenpfaehlen an den Fleeten. Ueber ein Jahrhundert lang entluden Schiffe hier Zimt, Kardamom, Kaffee und Pfeffer. Heute ist sie UNESCO-Welterbe und beherbergt das Deutsche Gewuerzmuseum."
    ),
  },
  factCard: {
    claims: [
      {
        text: "The monsoon wind system reverses direction seasonally, enabling trans-oceanic navigation across the Indian Ocean since antiquity.",
        source: "https://www.britannica.com/science/monsoon",
      },
      {
        text: "The Dutch East India Company (VOC) and English East India Company were established around 1600 as the world first joint-stock corporations.",
        source: "https://www.britannica.com/topic/Dutch-East-India-Company",
      },
      {
        text: "Hamburg Speicherstadt was constructed between 1883 and 1927 as a customs-free warehouse district dedicated to maritime commodities.",
        source: "https://whc.unesco.org/en/list/1363/",
      },
      {
        text: "Black pepper accounted for more than half of the total volume of Asian spices imported into European harbors during the seventeenth century.",
        source: "https://www.cambridge.org/core/books/trade-and-civilisation-in-the-indian-ocean/7074E3BE79586BEBA85E2DF7D114FDDF",
      },
      {
        text: "Chartered trading companies maintained private armies and forts under royal monopoly privileges granted by sovereign crowns.",
        source: "https://www.britannica.com/topic/chartered-company",
      },
    ],
    simplified: [
      "We contrast the slow 12-month camel caravan overland with the faster maritime ocean route.",
      "We explain the physical physics of monsoon seasonal winds powering wooden caravels.",
      "We examine how commercial monopolies restricted competition and controlled sea passages.",
    ],
  },
};
