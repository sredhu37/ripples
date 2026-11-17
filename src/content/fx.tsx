import { animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import {
  DayOneDiagram,
  DayThreeDiagram,
  DayTwoDiagram,
  NoHomeCoinsDiagram,
  OnlyRateMovedDiagram,
  TripDiagram,
} from "./fx.diagrams";
import { ShoppingTripToy } from "./fx.toy";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function Toy({ lang, onDone }: ToyProps) {
  return <ShoppingTripToy lang={lang} onDone={onDone} />;
}

function Widget({ lang, onAnswer }: WidgetProps) {
  return <ShoppingTripToy lang={lang} mode="quiz" onAnswer={onAnswer} />;
}

export const lesson: Lesson = {
  id: "fx",
  story: [
    animatedBeat(
      [
        T(
          "Aarav lives in India. He pays with rupees.",
          "Lena wohnt in Deutschland. Sie zahlt mit Euro.",
          "Zofia mieszka w Polsce. Płaci złotymi.",
        ),
        T(
          "Today he flies to Germany. He brings 600 rupees.",
          "Heute fliegt sie nach Indien. Sie nimmt 6 Euro mit.",
          "Dziś leci do Indii. Zabiera 30 złotych.",
        ),
        T(
          "In a shop he spots a toy car. The price tag says 6 euros.",
          "In einem Laden sieht sie ein Spielzeugauto. Auf dem Preisschild stehen 600 Rupien.",
          "W sklepie widzi samochodzik. Na metce jest cena 600 rupii.",
        ),
      ],
      TripDiagram,
    ),
    animatedBeat(
      [
        T(
          "In Germany people pay with euros, not rupees.",
          "In Indien zahlen die Leute mit Rupien, nicht mit Euro.",
          "W Indiach ludzie płacą rupiami, a nie złotymi.",
        ),
        T(
          "The shop will not take Aarav's rupees.",
          "Der Laden nimmt Lenas Euro nicht.",
          "Sklep nie weźmie złotych Zofii.",
        ),
        T(
          "So he goes to a swap desk. There you swap one money for another.",
          "Also geht sie zu einem Tauschschalter. Dort tauscht man ein Geld in ein anderes.",
          "Idzie więc do kantoru. Tam wymienia się jedne pieniądze na drugie.",
        ),
      ],
      NoHomeCoinsDiagram,
      "think",
    ),
    animatedBeat(
      [
        T(
          "The desk says: 100 rupees for 1 euro.",
          "Der Schalter sagt: 1 Euro für 100 Rupien.",
          "Kantor mówi: 1 złoty za 20 rupii.",
        ),
        T(
          "That swap price has a name. It is called the *exchange rate*.",
          "Dieser Tauschpreis hat einen Namen: *Wechselkurs*.",
          "Ta cena wymiany ma nazwę. To *kurs walutowy*.",
        ),
        T(
          "Aarav swaps 600 rupees. He gets 6 euros.",
          "Lena tauscht 6 Euro. Sie bekommt 600 Rupien.",
          "Zofia wymienia 30 złotych. Dostaje 600 rupii.",
        ),
        T(
          "6 euros is the price. He buys the toy car!",
          "600 Rupien sind der Preis. Sie kauft das Spielzeugauto!",
          "600 rupii to cena. Kupuje samochodzik!",
        ),
      ],
      DayOneDiagram,
    ),
    animatedBeat(
      [
        T(
          "A week later Aarav comes back with 600 rupees.",
          "Eine Woche später kommt Lena mit 6 Euro zurück.",
          "Tydzień później Zofia wraca z 30 złotymi.",
        ),
        T(
          "Today the desk says: 120 rupees for 1 euro.",
          "Heute sagt der Schalter: 1 Euro für 80 Rupien.",
          "Dziś kantor mówi: 1 złoty za 16 rupii.",
        ),
        T(
          "Now 600 rupees give only 5 euros.",
          "Jetzt geben 6 Euro nur 480 Rupien.",
          "Teraz 30 złotych daje tylko 480 rupii.",
        ),
        T(
          "The toy costs 6 euros. He is one euro short!",
          "Das Spielzeug kostet 600 Rupien. Es fehlen 120 Rupien!",
          "Zabawka kosztuje 600 rupii. Brakuje 120 rupii!",
        ),
      ],
      DayTwoDiagram,
      "think",
    ),
    animatedBeat(
      [
        T(
          "Look: same rupees, same toy, same price tag.",
          "Schau: gleiche Euro, gleiches Spielzeug, gleiches Preisschild.",
          "Zobacz: te same złote, ta sama zabawka, ta sama cena.",
        ),
        T(
          "Nobody tricked Aarav. The exchange rate moved.",
          "Niemand hat Lena betrogen. Der Wechselkurs hat sich bewegt.",
          "Nikt nie oszukał Zofii. Kurs walutowy się zmienił.",
        ),
        T(
          "Exchange rates go up and down. Sometimes they change every day.",
          "Wechselkurse gehen rauf und runter. Manchmal ändern sie sich jeden Tag.",
          "Kursy rosną i spadają. Czasem zmieniają się każdego dnia.",
        ),
      ],
      OnlyRateMovedDiagram,
    ),
    animatedBeat(
      [
        T(
          "Another week passes. Aarav checks the desk again.",
          "Wieder vergeht eine Woche. Lena schaut wieder am Schalter.",
          "Mija kolejny tydzień. Zofia znów zagląda do kantoru.",
        ),
        T(
          "Now it says: 80 rupees for 1 euro.",
          "Jetzt heißt es: 1 Euro für 120 Rupien.",
          "Teraz kurs to: 1 złoty za 24 rupie.",
        ),
        T(
          "600 rupees now give 7 euros. That is enough for the toy.",
          "6 Euro geben jetzt 720 Rupien. Das reicht für das Spielzeug.",
          "30 złotych daje teraz 720 rupii. To wystarczy na zabawkę.",
        ),
        T(
          "He even has 1 euro left. Same rupees, a better day!",
          "Sie hat sogar 120 Rupien übrig. Gleiche Euro, ein besserer Tag!",
          "Zostaje jej nawet 120 rupii. Te same złote, lepszy dzień!",
        ),
      ],
      DayThreeDiagram,
    ),
  ],
  toyIntro: T(
    "Go shopping with the same coins on three days. Watch the rate change.",
    "Geh mit denselben Münzen an drei Tagen einkaufen. Sieh, wie sich der Kurs ändert.",
    "Idź na zakupy z tymi samymi monetami przez trzy dni. Zobacz, jak zmienia się kurs.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "Same coins, same toy. Why could Aarav not buy it on day 2?",
        "Gleiche Münzen, gleiches Spielzeug. Warum konnte Lena es an Tag 2 nicht kaufen?",
        "Te same monety, ta sama zabawka. Dlaczego Zofia nie mogła jej kupić drugiego dnia?",
      ),
      options: [
        {
          text: T("The toy got bigger", "Das Spielzeug wurde größer", "Zabawka stała się większa"),
        },
        {
          text: T(
            "The exchange rate moved",
            "Der Wechselkurs hat sich bewegt",
            "Kurs walutowy się zmienił",
          ),
          correct: true,
        },
        {
          text: T(
            "The shop played a trick",
            "Der Laden hat einen Trick gespielt",
            "Sklep zrobił sztuczkę",
          ),
        },
      ],
      hint: T(
        "The coins and the toy stayed the same. Only the swap price, the exchange rate, moved.",
        "Die Münzen und das Spielzeug blieben gleich. Nur der Tauschpreis, der Wechselkurs, hat sich bewegt.",
        "Monety i zabawka były te same. Zmieniła się tylko cena wymiany, czyli kurs walutowy.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Find the day your coins come up short. Swap, buy, then press Check.",
        "Finde den Tag, an dem deine Münzen nicht reichen. Tausche, kaufe, dann tippe auf Prüfen.",
        "Znajdź dzień, w którym monet nie starcza. Wymień, kup i naciśnij Sprawdź.",
      ),
      Widget,
      hint: T(
        "Try each day. On one day the swap gives too few coins for the toy.",
        "Probiere jeden Tag aus. An einem Tag reichen die getauschten Münzen nicht für das Spielzeug.",
        "Wypróbuj każdy dzień. Jednego dnia po wymianie monet jest za mało na zabawkę.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "The desk gives you more of the other country's money than last week. What does that mean?",
        "Der Schalter gibt dir mehr Geld des anderen Landes als letzte Woche. Was bedeutet das?",
        "Kantor daje ci więcej pieniędzy drugiego kraju niż tydzień temu. Co to znaczy?",
      ),
      options: [
        {
          text: T(
            "Your coins now buy more in the shop",
            "Deine Münzen kaufen jetzt mehr im Laden",
            "Twoje monety kupują teraz więcej w sklepie",
          ),
          correct: true,
        },
        {
          text: T(
            "Your coins now buy less in the shop",
            "Deine Münzen kaufen jetzt weniger im Laden",
            "Twoje monety kupują teraz mniej w sklepie",
          ),
        },
        {
          text: T(
            "Nothing changes in the shop",
            "Im Laden ändert sich nichts",
            "W sklepie nic się nie zmienia",
          ),
        },
      ],
      hint: T(
        "More of the other money for the same coins means your coins reach further in the shop.",
        "Mehr fremdes Geld für dieselben Münzen heißt: Deine Münzen reichen im Laden weiter.",
        "Więcej obcych pieniędzy za te same monety znaczy, że twoje monety wystarczą na więcej.",
      ),
    },
  ],
  askDad: T(
    "If we visited another country, how would we get its money? Can we look up today's exchange rate together?",
    "Wenn wir in ein anderes Land reisen, wie kommen wir an dessen Geld? Können wir den heutigen Wechselkurs zusammen nachschauen?",
    "Gdybyśmy pojechali do innego kraju, jak zdobylibyśmy tamtejsze pieniądze? Sprawdźmy razem dzisiejszy kurs walutowy.",
  ),
  realLife: {
    title: {
      en: "Rupees and euros",
      de: "Euro und Rupien",
      pl: "Złote i rupie",
    },
    body: {
      en: "India uses rupees. Germany uses euros. The European Central Bank posts the euro rate every working day. In November 2026 one euro was about 103 rupees.",
      de: "Deutschland nutzt den Euro. Indien nutzt Rupien. Die Europäische Zentralbank veröffentlicht den Eurokurs an jedem Arbeitstag. Im November 2026 war ein Euro etwa 103 Rupien wert.",
      pl: "Polska używa złotych. Indie używają rupii. Europejski Bank Centralny podaje kurs euro w każdy dzień roboczy. W listopadzie 2026 jedno euro kosztowało około 4,40 złotego, czyli około 103 rupie.",
    },
  },
  factCard: {
    claims: [
      {
        text: {
          en: "The ECB publishes euro foreign exchange reference rates, usually updated around 16:00 CET every working day.",
          de: "Die EZB veröffentlicht Euro-Referenzkurse, in der Regel an jedem Arbeitstag gegen 16:00 Uhr MEZ aktualisiert.",
          pl: "EBC publikuje referencyjne kursy euro, zwykle aktualizowane w każdy dzień roboczy około 16:00 czasu środkowoeuropejskiego.",
        },
        source:
          "https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html",
      },
      {
        text: {
          en: "On 16 November 2026 the ECB reference rate was 103.4520 Indian rupees per euro.",
          de: "Am 16. November 2026 lag der EZB-Referenzkurs bei 103,4520 indischen Rupien je Euro.",
          pl: "16 listopada 2026 roku referencyjny kurs EBC wynosił 103,4520 rupii indyjskich za euro.",
        },
        source:
          "https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html",
      },
      {
        text: {
          en: "On 16 November 2026 the ECB reference rate was 4.4030 Polish zloty per euro.",
          de: "Am 16. November 2026 lag der EZB-Referenzkurs bei 4,4030 polnischen Zloty je Euro.",
          pl: "16 listopada 2026 roku referencyjny kurs EBC wynosił 4,4030 złotego za euro.",
        },
        source:
          "https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html",
      },
      {
        text: {
          en: "The ECB reference rates are for information only and are not meant for transactions, so a real desk rate can differ.",
          de: "Die EZB-Referenzkurse dienen nur der Information und nicht für Geschäfte, ein echter Schalterkurs kann also abweichen.",
          pl: "Referencyjne kursy EBC służą tylko informacji i nie są przeznaczone do transakcji, więc kurs w kantorze może się różnić.",
        },
        source:
          "https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html",
      },
      {
        text: {
          en: "The euro was launched on 1 January 1999 and Germany is one of the countries that use it.",
          de: "Der Euro wurde am 1. Januar 1999 eingeführt, und Deutschland gehört zu den Ländern, die ihn nutzen.",
          pl: "Euro zostało wprowadzone 1 stycznia 1999 roku, a Niemcy należą do krajów, które go używają.",
        },
        source: "https://www.ecb.europa.eu/euro/intro/html/index.en.html",
      },
      {
        text: {
          en: "The Deutsche Bundesbank publishes exchange rate statistics, and its euro reference rates come from the ECB.",
          de: "Die Deutsche Bundesbank veröffentlicht Wechselkursstatistiken, und ihre Euro-Referenzkurse stammen von der EZB.",
          pl: "Bundesbank publikuje statystyki kursów walutowych, a jego referencyjne kursy euro pochodzą od EBC.",
        },
        source: "https://www.bundesbank.de/en/statistics/exchange-rates",
      },
      {
        text: {
          en: "The Reserve Bank of India regulates the issue of banknotes to secure monetary stability in India, and shows rupee exchange rates on its site.",
          de: "Die Reserve Bank of India regelt die Ausgabe von Banknoten, um die Geldwertstabilität in Indien zu sichern, und zeigt Rupien-Wechselkurse auf ihrer Seite.",
          pl: "Reserve Bank of India reguluje emisję banknotów, aby zapewnić stabilność monetarną w Indiach, i pokazuje na swojej stronie kursy rupii.",
        },
        source: "https://www.rbi.org.in/",
      },
      {
        text: {
          en: "Narodowy Bank Polski publishes table A of middle exchange rates of foreign currencies against the zloty.",
          de: "Die Narodowy Bank Polski veröffentlicht Tabelle A mit mittleren Wechselkursen ausländischer Währungen zum Zloty.",
          pl: "Narodowy Bank Polski publikuje tabelę A średnich kursów walut obcych wobec złotego.",
        },
        source: "https://api.nbp.pl/en.html",
      },
    ],
    simplified: [
      {
        en: "The rates in the story and toy are made-up round numbers of a realistic size. Real rates have many decimals and change during the day.",
        de: "Die Kurse in Geschichte und Spielzeug sind erfundene runde Zahlen in realistischer Größe. Echte Kurse haben viele Nachkommastellen und ändern sich im Lauf des Tages.",
        pl: "Kursy w opowieści i zabawce to wymyślone okrągłe liczby o realistycznej wielkości. Prawdziwe kursy mają wiele miejsc po przecinku i zmieniają się w ciągu dnia.",
      },
      {
        en: "The swap desk gives one rate and no part coins. Real desks have a buy rate, a sell rate and sometimes a fee.",
        de: "Der Tauschschalter nennt einen Kurs und gibt keine Teilmünzen. Echte Schalter haben einen Ankaufs- und einen Verkaufskurs und manchmal eine Gebühr.",
        pl: "Kantor podaje jeden kurs i nie wydaje części monet. Prawdziwe kantory mają kurs kupna, kurs sprzedaży i czasem opłatę.",
      },
      {
        en: "The lesson does not say why rates move. Trade, interest rates and what people expect all play a part; that comes later.",
        de: "Die Lektion sagt nicht, warum sich Kurse bewegen. Handel, Zinsen und Erwartungen spielen eine Rolle; das kommt später.",
        pl: "Lekcja nie mówi, dlaczego kursy się zmieniają. Handel, stopy procentowe i oczekiwania ludzi mają wpływ; to przyjdzie później.",
      },
      {
        en: "Aarav, Lena, Zofia, the shop and the swap desk are made up. Only the countries and money are real.",
        de: "Lena, Aarav, Zofia, der Laden und der Tauschschalter sind erfunden. Nur die Länder und das Geld sind echt.",
        pl: "Zofia, Aarav, Lena, sklep i kantor są wymyśleni. Prawdziwe są tylko kraje i pieniądze.",
      },
    ],
  },
};
