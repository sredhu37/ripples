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

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

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
          "Vor langer Zeit gab es in Europa keine Kuehlschraenke, und das Essen war oft fade.",
          "Dawno temu w europejskich kuchniach nie było lodówek, a jedzenie bywało mdłe i szybko się psuło.",
        ),
        T(
          "Dried black peppercorns, cloves, and nutmeg preserved meats and added wonderful flavors.",
          "Getrocknete Pfefferkoerner, Nelken und Muskat machten Fleisch haltbar und gaben tollen Geschmack.",
          "Suszone ziarna czarnego pieprzu, goździki i gałka muszkatołowa konserwowały mięso i nadawały wspaniały aromat.",
        ),
        T(
          "Because spices only grew in distant tropical climates, they were precious luxuries.",
          "Weil Gewuerze nur in fernen tropischen Laendern wuchsen, waren sie kostbare Raritaeten.",
          "Ponieważ przyprawy rosły tylko w odległych, tropikalnych krainach, były rzadkim i kosztownym luksusem.",
        ),
        T(
          "A small pouch of black pepper could be traded for fine wool garments or silver coins.",
          "Ein kleiner Beutel schwarzer Pfeffer konnte gegen feine Wolle oder Silbermuenzen getauscht werden.",
          "Niewielki mieszek czarnego pieprzu można było wymienić na bele wełny lub monety z czystego srebra.",
        ),
      ],
      PepperCornDiagram,
    ),
    animatedBeat(
      [
        T(
          "For centuries, spices had to travel overland across the Silk Road on the backs of camels.",
          "Jahrhundertelang mussten Gewuerze auf Kamelruecken ueber die Seidenstrasse reisen.",
          "Przez stulecia przyprawy wędrowały lądem wzdłuż Jedwabnego Szlaku na grzbietach wielbłądów.",
        ),
        T(
          "The journey took over a full year across harsh mountain passes and dry deserts.",
          "Die Reise dauerte ueber ein ganzes Jahr durch eisige Gebirgspaesse und Wuesten.",
          "Podróż trwała ponad rok i wiodła przez mroźne przełęcze górskie oraz bezkresne pustynie.",
        ),
        T(
          "At every city and bridge along the route, local rulers demanded road tolls and protection fees.",
          "In jeder Stadt und an jeder Bruecke verlangten Herrscher Wegzoelle und Schutzgebuehren.",
          "W każdym napotkanym mieście i na każdym moście lokalni władcy żądali wysokich ceł i opłat.",
        ),
        T(
          "By the time a sack of pepper reached Venice or Hamburg, its price had multiplied twenty times.",
          "Bis ein Sack Pfeffer Venedig oder Hamburg erreichte, hatte sich sein Preis vervielfacht.",
          "Zanim wór pieprzu dotarł do Wenecji, Hamburga czy Gdańska, jego cena rosła dwudziestokrotnie.",
        ),
      ],
      SilkRoadCaravanDiagram,
    ),
    animatedBeat(
      [
        T(
          "Navigators studied the sea and discovered the predictable rhythm of the seasonal *monsoon*.",
          "Seefahrer erforschten das Meer und entdeckten den verlaesslichen Rhythmus des *Monsuns*.",
          "Żeglarze zbadali oceany i odkryli przewidywalny rytm sezonowych wiatrów zwanych *monsunami*.",
        ),
        T(
          "In summer, warm ocean winds blow steadily from the south-west across the Arabian Sea.",
          "Im Sommer weht der warme Seewind bestaendig von Suedwesten ueber das Arabische Meer.",
          "Latem ciepłe wiatry oceaniczne wieją jednostajnie z południowego zachodu przez Morze Arabskie.",
        ),
        T(
          "In winter, the wind turns around and blows cool air back from the north-east.",
          "Im Winter dreht der Wind und traegt kuehle Luft aus dem Nordosten zurueck.",
          "Zimą kierunek wiatru odwraca się, niosąc chłodniejsze powietrze z północnego wschodu.",
        ),
        T(
          "By catching these wind patterns, ocean caravels could travel between continents in a few months.",
          "Wer diesen Wind nutzte, konnte mit Segelschiffen Ozeane in wenigen Monaten ueberqueren.",
          "Łapiąc te wiatry w żagle, oceaniczne karawele mogły przebyć tę samą trasę w zaledwie kilka miesięcy.",
        ),
      ],
      MonsoonWindDiagram,
    ),
    animatedBeat(
      [
        T(
          "Sailing across open oceans required large crews, sturdy wooden ships, and expensive cannons.",
          "Fahrten ueber Weltmeere brauchten grosse Besatzungen, Schiffe und teure Ausruestung.",
          "Oceaniczne rejsy wymagały licznej załogi, mocnych drewnianych kadłubów i kosztownego wyposażenia.",
        ),
        T(
          "To fund these ventures, European merchants formed the first joint-stock corporations.",
          "Um dies zu finanzieren, gruendeten Kaufleute die ersten Aktiengesellschaften.",
          "Aby zebrać fundusze na te wyprawy, kupcy założyli pierwsze w historii spółki akcyjne.",
        ),
        T(
          "Monarchs granted these companies a royal *monopoly*, meaning no other merchant could trade in spices.",
          "Herrscher gaben diesen Gesellschaften ein koenigliches *Monopol*, das den Handel allein ihnen vorbehielt.",
          "Władcy nadali tym kompaniom królewski *monopol*, co oznaczało, że nikt inny nie miał prawa handlować przyprawami.",
        ),
        T(
          "Armed company fleets built stone fortresses along the coasts to control the shipping lanes.",
          "Bewaffnete Flotten der Handelskompanien bauten Kuestenfestungen, um die Seewege zu beherrschen.",
          "Uzbrojone floty wznosiły kamienne twierdze wzdłuż wybrzeży, by zbrojnie kontrolować szlaki morskie.",
        ),
      ],
      CaravelShipDiagram,
    ),
    animatedBeat(
      [
        T(
          "The global *spice trade* connected continents, cultures, and cooking pots as never before.",
          "Der weltweite *Gewuerzhandel* verband Kontinente, Kulturen und Kochtoepfe wie nie zuvor.",
          "Globalny *handel przyprawami* połączył kontynenty, kultury i kuchnie całego świata.",
        ),
        T(
          "In Hamburg, the grand *Speicherstadt* was constructed with red brick warehouses along canals.",
          "In Hamburg entstand die *Speicherstadt* mit Backsteinhaeusern direkt an den Fleeten.",
          "W wielkich portach, takich jak Gdańsk czy Hamburg, wznoszono nad kanałami potężne spichlerze.",
        ),
        T(
          "Millions of sacks of pepper, tea, and coffee were unloaded directly from sailing ships.",
          "Millionen Saecke Pfeffer, Tee und Kaffee wurden direkt von Segelschiffen entladen.",
          "Miliony worków pieprzu, herbaty i kawy wyładowywano ze statków wprost do nadrzecznych magazynów.",
        ),
        T(
          "Global trade enriched diets, but also taught humanity the danger of unchecked trade monopolies.",
          "Der Welthandel bereicherte die Welt, lehrte aber auch die Gefahren ruecksichtsloser Monopole.",
          "Światowy handel wzbogacił życie codzienne, lecz ukazał także wielkie zagrożenia zbrojnych monopoli.",
        ),
      ],
      SpeicherstadtWarehouseDiagram,
    ),
  ],
  toyIntro: T(
    "Choose between the overland caravan and the maritime caravel with summer monsoon winds.",
    "Waehle zwischen der Landkarawane und dem Segelschiff mit Sommermonsun.",
    "Wybierz między lądową karawaną a oceaniczną karawelą korzystającą z letnich wiatrów monsunowych.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "Why were spices like black pepper so valuable in historical Europe?",
        "Warum waren Gewuerze wie schwarzer Pfeffer im alten Europa so wertvoll?",
        "Dlaczego przyprawy, takie jak czarny pieprz, były dawniej tak cenne w Europie?",
      ),
      options: [
        {
          text: T(
            "They preserved meat before refrigerators existed and grew only in distant tropical lands",
            "Sie machten Fleisch vor Erfindung des Kuehlschranks haltbar und wuchsen nur in fernen Tropen",
            "Konserwowały żywność przed wynalezieniem lodówek i rosły wyłącznie w odległych krainach tropikalnych",
          ),
          correct: true,
        },
        {
          text: T(
            "They could be used to paint castles bright neon pink",
            "Man konnte damit Schloesser leuchtend neon-pink anstreichen",
            "Służyły do malowania zamków na jaskrawy, różowy kolor",
          ),
        },
        {
          text: T(
            "Eating pepper allowed sailors to fly through the clouds like birds",
            "Wenn man Pfeffer ass, konnte man wie ein Vogel durch die Wolken fliegen",
            "Zjedzenie pieprzu pozwalało marynarzom latać w chmurach jak ptaki",
          ),
        },
      ],
      hint: T(
        "Spices were essential food preservatives before modern electrical cooling.",
        "Gewuerze halfen, Lebensmittel haltbar zu machen, bevor es Kuehlschraenke gab.",
        "Przyprawy były kluczowym środkiem konserwującym zanim wynaleziono chłodziarki.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "How did seasonal monsoon winds assist ancient and early modern sea merchants?",
        "Wie halfen die saisonalen Monsunwinde den Seefahrern damals?",
        "W jaki sposób sezonowe wiatry monsunowe pomagały dawnym żeglarzom?",
      ),
      options: [
        {
          text: T(
            "They blew steadily in predictable directions, carrying sailing caravels across the ocean",
            "Sie wehten verlaesslich in feste Richtungen und trugen Segelschiffe ueber das Meer",
            "Wiały niezawodnie w stałych kierunkach zależnie od pory roku, niosąc żaglowce przez ocean",
          ),
          correct: true,
        },
        {
          text: T(
            "They dropped bags of fresh gold coins directly onto the ship decks",
            "Sie liessen Saecke voller Goldmuenzen direkt auf das Schiffsdeck regnen",
            "Zrzucały worki ze złotymi monetami prosto na pokład statku",
          ),
        },
        {
          text: T(
            "They turned the ocean water into warm strawberry lemonade",
            "Sie verwandelten das Meerwasser in warme Erdbeer-Limonade",
            "Zmieniały słoną wodę morską w ciepłą truskawkową lemoniadę",
          ),
        },
      ],
      hint: T(
        "Monsoon winds blow southwest in summer and northeast in winter.",
        "Der Monsun weht im Sommer nach Suedwesten und im Winter nach Nordosten.",
        "Monsun letni wieje z południowego zachodu, a zimowy z północnego wschodu.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Select the Maritime Ocean Route and set the Monsoon Wind to Summer South-West to deliver the cargo.",
        "Waehle den Seeweg und stelle den Monsun auf Sommer-Suedwest, um die Ladung abzuliefern.",
        "Wybierz morski szlak oceaniczny i ustaw wiatr monsunowy na letni południowo-zachodni.",
      ),
      Widget,
      hint: T(
        "Click Maritime Ocean Route, then click Summer South-West, then tap check.",
        "Klicke auf Seeweg, dann auf Sommer-Suedwest, und tippe auf pruefen.",
        "Wybierz szlak oceaniczny, kliknij letni monsun z wiatrem i naciśnij sprawdź.",
      ),
    },
  ],
  askDad: T(
    "Papa, what spices in our kitchen today traveled thousands of miles across the ocean to get here?",
    "Papa, welche Gewuerze in unserer Kueche sind tausende Kilometer ueber den Ozean zu uns gereist?",
    "Tato, jakie przyprawy w naszej kuchni przebyły tysiące kilometrów przez oceany, zanim trafiły na nasz stół?",
  ),
  realLife: {
    title: {
      en: "The Malabar Spice Coast of India",
      de: "Die Hamburger Speicherstadt",
      pl: "Gdańsk i spichlerze nad Motławą",
    },
    body: {
      en: "The Malabar Coast of Kerala in South-West India was known throughout antiquity as the spice capital of the world. Ancient ports like Muziris and Calicut shipped black pepper, cardamom, and cinnamon across the Indian Ocean to Rome, Egypt, and Europe. Today, Cochin remains a bustling international spice auction and shipping center.",
      de: "Die Hamburger Speicherstadt ist das groesste historische Lagerhaus-Ensemble der Welt, gebaut auf Eichenpfaehlen an den Fleeten. Ueber ein Jahrhundert lang entluden Schiffe hier Zimt, Kardamom, Kaffee und Pfeffer. Heute ist sie UNESCO-Welterbe und beherbergt das Deutsche Gewuerzmuseum.",
      pl: "W dawnej Polsce korzenie i przyprawy zamorskie docierały przez port w Gdańsku, najważniejsze okno handlowe Rzeczypospolitej. W spichlerzach na Wyspie Spichrzów i za pomocą Żurawia gdańskiego rozładowywano worki z pieprzem, imbirem i cynamonem, kupowane za polskie zboże. Przyprawy były tak cenne, że szlachta i mieszczanie zamykali je na klucz w ozdobnych szkatułkach ze srebra lub kości słoniowej.",
    },
  },
  factCard: {
    claims: [
      {
        text: {
          en: "The monsoon wind system reverses direction seasonally, enabling trans-oceanic navigation across the Indian Ocean since antiquity.",
          de: "Das Monsun-Windsystem wechselt saisonal die Richtung und ermoeglichte seit der Antike Seefahrt ueber den Indischen Ozean.",
          pl: "Sezonowy układ wiatrów monsunowych zmieniający kierunek latem i zimą umożliwił żeglugę oceaniczną na Oceanie Indyjskim już w czasach starożytnych.",
        },
        source: "https://www.britannica.com/science/monsoon",
      },
      {
        text: {
          en: "The Dutch East India Company (VOC) and English East India Company were established around 1600 as the world's first joint-stock corporations.",
          de: "Die Niederlaendische und Englische Ostindien-Kompanie wurden um 1600 als weltweit erste Aktiengesellschaften gegruendet.",
          pl: "Holenderska Kompania Wschodnioindyjska (VOC) i brytyjska Kompania Wschodnioindyjska (EIC) powstały około 1600 roku jako pierwsze w świecie nowożytne spółki akcyjne.",
        },
        source: "https://www.britannica.com/topic/Dutch-East-India-Company",
      },
      {
        text: {
          en: "Maritime spice warehouses such as Hamburg's Speicherstadt and Gdansk's Motlawa granaries stored global botanical commodities under specialized customs regimes.",
          de: "Die Hamburger Speicherstadt wurde zwischen 1883 und 1927 als zollfreies Lagerhausviertel fuer ueberseeische Waren erbaut.",
          pl: "Spichlerze portowe w Gdańsku nad Motławą oraz hamburska Speicherstadt stanowiły kluczowe węzły magazynowania przypraw korzennych i towarów kolonialnych w Europie.",
        },
        source: "https://nmm.pl",
      },
      {
        text: {
          en: "Black pepper accounted for more than half of the total volume of Asian spices imported into European harbors during the seventeenth century.",
          de: "Schwarzer Pfeffer machte im 17. Jahrhundert ueber die Haelfte aller nach Europa importierten asiatischen Gewuerze aus.",
          pl: "Czarny pieprz stanowił ponad połowę całkowitego wolumenu przypraw azjatyckich sprowadzanych do europejskich portów w XVII wieku.",
        },
        source: "https://www.cambridge.org/core/books/trade-and-civilisation-in-the-indian-ocean/7074E3BE79586BEBA85E2DF7D114FDDF",
      },
      {
        text: {
          en: "Chartered trading companies maintained private armies and forts under royal monopoly privileges granted by sovereign crowns.",
          de: "Handelskompanien unterhielten eigene Privatarmeen und Festungen unter koeniglich garantierten Handelsmonopolen.",
          pl: "Królewskie przywileje monopolowe pozwalały kompaniom handlowym utrzymywać własne armie, forty i floty wojenne w celu zwalczania konkurencji.",
        },
        source: "https://www.britannica.com/topic/chartered-company",
      },
    ],
    simplified: [
      {
        en: "We contrast the slow 12-month camel caravan overland with the faster maritime ocean route.",
        de: "Wir stellen die langsame Karawane dem schnelleren Seeweg gegenueber.",
        pl: "Porównujemy powolną 12-miesięczną karawanę lądową z szybszym oceanicznym szlakiem morskim.",
      },
      {
        en: "We explain the physics of monsoon seasonal winds powering wooden caravels.",
        de: "Wir erklaeren, wie Monsunwinde historische Segelschiffe ueber das Meer trieben.",
        pl: "Tłumaczymy, jak wiatry monsunowe pchały żagle karaweli przez ocean.",
      },
      {
        en: "We examine how commercial monopolies restricted competition and controlled sea passages.",
        de: "Wir zeigen, wie Handelsmonopole den Wettbewerb einschraenkten und Seewege sicherten.",
        pl: "Wyjaśniamy, jak handlowe monopole ograniczały konkurencję i kontrolowały szlaki handlowe.",
      },
    ],
  },
};
