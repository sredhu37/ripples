import { animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import {
  BeaRollsDiagram,
  BusinessChoiceDiagram,
  EqualEarningsDiagram,
  MorningMarketDiagram,
  SamBootsDiagram,
  TicketSizeConceptDiagram,
} from "./ticketsize.diagrams";
import { TicketBalanceToy } from "./ticketsize.toy";
import "./ticketsize.css";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function Toy({ lang, onDone }: ToyProps) {
  return <TicketBalanceToy lang={lang} onDone={onDone} />;
}

function Widget({ lang, onAnswer }: WidgetProps) {
  return <TicketBalanceToy lang={lang} isWidget onWidgetAnswer={onAnswer} />;
}

export const lesson: Lesson = {
  id: "ticketsize",
  story: [
    animatedBeat(
      [
        T(
          "On Saturday morning, Bea and Sam open their shops side by side.",
          "Am Samstagmorgen öffnen Bea und Sam ihre Läden nebeneinander.",
          "W sobotni poranek Bea i Sam otwierają swoje sklepy tuż obok siebie.",
        ),
        T(
          "Bea has trays of warm sweet rolls ready for breakfast.",
          "Bea hat Bleche voller warmer Brötchen fürs Frühstück parat.",
          "Bea ma przygotowane na śniadanie blachy pełne ciepłych, słodkich bułek.",
        ),
        T(
          "Sam finishes polishing sturdy leather boots in his workshop.",
          "Sam poliert in seiner Werkstatt feste Stiefel aus Leder.",
          "Sam kończy polerować w swoim warsztacie solidne skórzane buty.",
        ),
      ],
      MorningMarketDiagram,
    ),
    animatedBeat(
      [
        T(
          "A long line of villagers stops by Bea's counter.",
          "Eine lange Schlange von Leuten hält an Beas Theke.",
          "Przed ladą Bei ustawia się długa kolejka mieszkańców.",
        ),
        T(
          "Each sweet roll costs only 1 coin.",
          "Jedes süße Brötchen kostet nur 1 Münze.",
          "Każda słodka bułka kosztuje tylko 1 monetę.",
        ),
        T(
          "Bea greets 30 customers and sells 30 rolls, earning 30 coins in total.",
          "Bea bedient 30 Leute und verkauft 30 Brötchen für insgesamt 30 Münzen.",
          "Bea wita 30 klientów i sprzedaje 30 bułek, zarabiając łącznie 30 monet.",
        ),
      ],
      BeaRollsDiagram,
    ),
    animatedBeat(
      [
        T(
          "Across the lane, Sam works quietly at his bench.",
          "Gegenüber arbeitet Sam ruhig an seiner Werkbank.",
          "Po drugiej stronie uliczki Sam spokojnie pracuje przy swoim stole.",
        ),
        T(
          "Mayor Moss walks in looking for sturdy riding boots.",
          "Bürgermeister Moss kommt herein und sucht feste Reitstiefel.",
          "Burmistrz Moss wchodzi w poszukiwaniu solidnych butów do jazdy konnej.",
        ),
        T(
          "Sam sells one custom pair to Moss for 30 coins.",
          "Sam verkauft ein maßgefertigtes Paar an Moss für 30 Münzen.",
          "Sam sprzedaje Mossowi jedną parę butów na zamówienie za 30 monet.",
        ),
      ],
      SamBootsDiagram,
    ),
    animatedBeat(
      [
        T(
          "At sunset, Bea and Sam count up their day's sales.",
          "Bei Sonnenuntergang zählen Bea und Sam ihren Tagesumsatz.",
          "O zachodzie słońca Bea i Sam podliczają swój dzienny utarg.",
        ),
        T(
          "Bea earned 30 coins. Sam earned 30 coins.",
          "Bea hat 30 Münzen eingenommen. Sam hat 30 Münzen eingenommen.",
          "Bea zarobiła 30 monet. Sam zarobił 30 monet.",
        ),
        T(
          "Both businesses made the exact same total money from very different items!",
          "Beide Betriebe haben genau dieselbe Summe mit ganz anderen Waren erzielt!",
          "Obie firmy zarobiły dokładnie taką samą kwotę na zupełnie innych towarach!",
        ),
      ],
      EqualEarningsDiagram,
    ),
    animatedBeat(
      [
        T(
          "The price of a single purchase is called the *ticket size*.",
          "Der Preis eines einzelnen Einkaufs heißt *Ticketgröße*.",
          "Cena pojedynczego zakupu to *wartość transakcji* (cena jednostkowa).",
        ),
        T(
          "Bea had a small ticket size of 1 coin; Sam had a big ticket size of 30 coins.",
          "Bea hatte eine kleine Ticketgröße von 1 Münze; Sam eine große von 30 Münzen.",
          "Bea miała małą wartość transakcji (1 moneta), a Sam dużą (30 monet).",
        ),
        T(
          "The total number of items sold is called the *volume*.",
          "Die Gesamtzahl aller verkauften Stücke nennt man *Menge*.",
          "Łączna liczba sprzedanych sztuk to *wolumen* (ilość).",
        ),
        T(
          "Bea had high volume of 30 rolls, while Sam had low volume of 1 pair.",
          "Bea hatte eine hohe Menge von 30 Brötchen, Sam eine niedrige von 1 Paar.",
          "Bea miała wysoki wolumen (30 bułek), podczas gdy Sam miał niski wolumen (1 para butów).",
        ),
      ],
      TicketSizeConceptDiagram,
    ),
    animatedBeat(
      [
        T(
          "Selling with small prices means serving a huge crowd quickly.",
          "Kleine Preise bedeuten, dass man viele Leute schnell bedienen muss.",
          "Sprzedaż tanich produktów oznacza szybką obsługę dużej rzeszy klientów.",
        ),
        T(
          "Selling with big prices means taking time to build exceptional quality.",
          "Große Preise verlangen Zeit, Sorgfalt und besonders hohe Qualität.",
          "Sprzedaż drogich produktów wymaga czasu na stworzenie wyjątkowej jakości.",
        ),
        T(
          "Both business models can thrive when planned carefully.",
          "Beide Geschäftsmodelle können gut funktionieren, wenn man sie klug plant.",
          "Oba modele biznesowe mogą doskonale działać, jeśli są mądrze zaplanowane.",
        ),
      ],
      BusinessChoiceDiagram,
    ),
  ],
  toyIntro: T(
    "Explore how small prices and big prices reach the same sales goal!",
    "Erkunde, wie kleine und große Preise dasselbe Umsatzziel erreichen können!",
    "Sprawdź, jak małe ceny i duże ceny mogą osiągnąć ten sam cel sprzedażowy!",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "What is the difference between ticket size and volume in business?",
        "Was ist der Unterschied zwischen Ticketgröße und Menge im Geschäft?",
        "Jaka jest różnica między ceną jednostkową (ticket size) a wolumenem (volume) w biznesie?",
      ),
      options: [
        {
          text: T(
            "Ticket size is price per sale, volume is how many are sold",
            "Ticketgröße ist der Preis pro Verkauf, Menge ist die Verkaufszahl",
            "Cena jednostkowa to cena za sztukę, a wolumen to liczba sprzedanych sztuk",
          ),
          correct: true,
        },
        {
          text: T(
            "Ticket size is the shop size, volume is how loud the music is",
            "Ticketgröße ist die Ladengröße, Menge ist die Musiklautstärke",
            "Ticket size to rozmiar sklepu, a wolumen to głośność muzyki",
          ),
        },
        {
          text: T(
            "Volume is the price, ticket size is the customer age",
            "Menge ist der Preis, Ticketgröße ist das Alter der Kunden",
            "Wolumen to cena, a ticket size to wiek klienta",
          ),
        },
      ],
      hint: T(
        "Ticket size is the average price of one sale. Volume is the count of items sold.",
        "Die Ticketgröße ist der Preis eines einzelnen Verkaufs. Menge ist die Stückzahl.",
        "Cena jednostkowa to średnia wartość jednej sprzedaży. Wolumen to liczba sprzedanych produktów.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "Bea sells 20 rolls for 2 coins each. Sam sells 2 pairs of boots for 20 coins each. Who has higher sales?",
        "Bea verkauft 20 Brötchen für je 2 Münzen. Sam verkauft 2 Stiefel für je 20 Münzen. Wer hat mehr Umsatz?",
        "Bea sprzedaje 20 bułek po 2 monety każda. Sam sprzedaje 2 pary butów po 20 monet każda. Kto osiągnął wyższy przychód?",
      ),
      options: [
        {
          text: T("Bea has higher sales", "Bea hat mehr Umsatz", "Bea ma wyższy przychód"),
        },
        {
          text: T("Sam has higher sales", "Sam hat mehr Umsatz", "Sam ma wyższy przychód"),
        },
        {
          text: T(
            "Both have the same sales",
            "Beide haben den gleichen Umsatz",
            "Oboje osiągnęli taki sam przychód",
          ),
          correct: true,
        },
      ],
      hint: T(
        "Bea: 20 times 2 equals 40 coins. Sam: 2 times 20 equals 40 coins. Both reach 40 coins.",
        "Bea: 20 mal 2 ergibt 40 Münzen. Sam: 2 mal 20 ergibt 40 Münzen. Beide erreichen 40 Münzen.",
        "Bea: 20 razy 2 to 40 monet. Sam: 2 razy 20 to 40 monet. Oboje osiągają 40 monet.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Sam wants to earn 18 coins by selling 3 pairs of shoes. What price must he charge for each pair?",
        "Sam will 18 Münzen einnehmen und verkauft 3 Paar Schuhe. Welchen Preis muss er pro Paar verlangen?",
        "Sam chce zarobić 18 monet, sprzedając 3 pary butów. Jaką cenę musi ustalić za każdą parę?",
      ),
      Widget,
      hint: T(
        "Divide 18 coins by 3 pairs of shoes: Sam must set the price slider to 6 coins.",
        "Teile 18 Münzen durch 3 Paar Schuhe: Sam muss den Schieberegler auf 6 Münzen stellen.",
        "Podziel 18 monet przez 3 pary butów: Sam musi ustawić suwak ceny na 6 monet.",
      ),
    },
  ],
  askDad: T(
    "Papa, would you rather run a shop that sells hundreds of small snacks or one that sells a few big bicycles each week?",
    "Papa, würdest du lieber einen Laden mit Hunderten kleinen Snacks oder einen mit wenigen teuren Fahrrädern betreiben?",
    "Tato, wolałbyś prowadzić sklep sprzedający setki drobnych przekąsek, czy taki, który sprzedaje kilka drogich rowerów tygodniowo?",
  ),
  realLife: {
    title: {
      en: "Supermarkets and specialized showrooms in India",
      de: "Supermärkte und Fahrradläden in Deutschland",
      pl: "Piekarnie i salony specjalistyczne w Polsce",
    },
    body: {
      en: "In India, local kirana stores sell thousands of small everyday essentials like tea, spices, and biscuits for ₹10 to ₹50 each. A specialized scooter showroom might sell only three electric scooters for ₹90,000 each in a week, yet both business models can generate substantial and sustainable turnover.",
      de: "Ein deutscher Supermarkt verkauft täglich Tausende kleine Artikel wie Äpfel und Milch für 1 oder 2 Euro. Ein lokaler Fahrradladen verkauft vielleicht nur zwei hochwertige E-Bikes für je 2.000 Euro, doch beide Betriebe können einen ähnlichen Tagesumsatz erzielen.",
      pl: "W Polsce osiedlowa piekarnia lub sklep spożywczy sprzedaje codziennie tysiące drobnych produktów (bułki, mleko, owoce) po 2 do 5 zł. Specjalistyczny salon rowerowy może sprzedać w tym samym czasie zaledwie dwa rowery elektryczne po 5 000 zł, a oba te biznesy osiągną zbliżony dzienny obrót.",
    },
  },
  factCard: {
    claims: [
      {
        text: {
          en: "Central banking and economic research explain how commercial enterprises balance price per transaction and transaction volume to reach their revenue targets.",
          de: "Zentralbanken und Wirtschaftsforschungsinstitute erklären, wie Unternehmen Ticketgröße und Transaktionsvolumen steuern, um Umsatzziele zu erreichen.",
          pl: "Ekonomiści i analitycy rynku wyjaśniają, jak przedsiębiorstwa równoważą cenę jednostkową z wolumenem sprzedaży, aby zrealizować plan przychodów.",
        },
        source: "https://www.bundesbank.de/de/service/schule-und-bildung",
      },
      {
        text: {
          en: "Antitrust and competition authorities analyze market structures, contrasting high-frequency grocery retail with durable goods and bespoke manufacturing.",
          de: "Kartell- und Wettbewerbsbehörden untersuchen Marktstrukturen und vergleichen hochfrequenten Einzelhandel mit langlebigen Investitionsgütern.",
          pl: "Urzędy ochrony konkurencji (UOKiK) badają rynki, odróżniając handel artykułami częstego zakupu od rynków dóbr trwałego użytku.",
        },
        source: "https://www.bundeskartellamt.de/DE/Wirtschaftsbereiche/Handel/handel_node.html",
      },
      {
        text: {
          en: "Economic research institutes study structural differences between fast-moving mass consumer goods (FMCG) and craft or luxury goods.",
          de: "Wirtschaftsinstitute analysieren strukturelle Unterschiede zwischen schnelldrehenden Konsumgütern und maßgefertigtem Handwerk.",
          pl: "Instytuty badań rynkowych analizują różnice między produktami szybkozbywalnymi (FMCG) a produkcją rzemieślniczą i dobrami luksusowymi.",
        },
        source: "https://www.iwkoeln.de/",
      },
      {
        text: {
          en: "Statistical bureaus record consumer spending across frequent small-ticket grocery purchases and periodic major household durable investments.",
          de: "Statistische Ämter erfassen Konsumausgaben sowohl für alltägliche Kleinbeträge als auch für seltene, größere Anschaffungen.",
          pl: "Główny Urząd Statystyczny (GUS) bada wydatki gospodarstw domowych, dzieląc je na codzienne zakupy żywności oraz rzadkie zakupy dóbr trwałych.",
        },
        source:
          "https://www.destatis.de/DE/Themen/Gesellschaft-Umwelt/Einkommen-Konsum-Lebensbedingungen/Konsumausgaben/_inhalt.html",
      },
      {
        text: {
          en: "Retail federations report that operating margins and stock turnover rates differ drastically between high-volume, low-margin food retail and low-volume, high-margin specialty shops.",
          de: "Handelsverbände belegen, dass Handelsspannen und Lagerumschlag zwischen Massengütern und margenstarken Spezialgeschäften stark variieren.",
          pl: "Izby handlowe wskazują, że marże handlowe oraz rotacja zapasów diametralnie różnią się między dyskontami a sklepami specjalistycznymi.",
        },
        source: "https://einzelhandel.de/presse/zahlen-fakten",
      },
    ],
    simplified: [
      {
        en: "In the lesson, both business models produce the exact same revenue. In real life, costs, inventory risks, and profit margins vary substantially.",
        de: "In der Lektion erzielen beide Modelle denselben Umsatz. In der Praxis unterscheiden sich Kosten, Lagerrisiken und Margen deutlich.",
        pl: "W lekcji oba modele przynoszą dokładnie taki sam obrót. W praktyce koszty, ryzyko magazynowania i marże zysku znacznie się różnią.",
      },
      {
        en: "Inventory storage costs for high-ticket goods and spoilage risks for fresh foods are simplified here to highlight the direct price times volume formula.",
        de: "Lagerkosten für teure Waren und Verderblichkeit bei frischen Lebensmitteln sind vereinfacht, um die Formel Preis mal Menge zu betonen.",
        pl: "Koszty magazynowania drogich towarów i psucie się świeżej żywności uproszczono, by uwypuklić podstawową zależność: cena razy wolumen.",
      },
    ],
  },
};
