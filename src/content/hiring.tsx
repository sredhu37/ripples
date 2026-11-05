import { animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import {
  BeaAloneDiagram,
  BeaHiresLeoDiagram,
  EmergencyReserveDiagram,
  RiskAndWageDiagram,
  StormyDayQuietDiagram,
  SunnyDayBusyDiagram,
} from "./hiring.diagrams";
import { HiringToy } from "./hiring.toy";
import "./hiring.css";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function Toy({ lang, onDone }: ToyProps) {
  return <HiringToy lang={lang} onDone={onDone} />;
}

function Widget({ lang, onAnswer }: WidgetProps) {
  return <HiringToy lang={lang} isWidget onWidgetAnswer={onAnswer} />;
}

export const lesson: Lesson = {
  id: "hiring",
  story: [
    animatedBeat(
      [
        T(
          "Bea's bakery has become very popular in Ripple Town.",
          "Beas Bäckerei ist in Ripple Town sehr beliebt geworden.",
          "Piekarnia Bei stała się bardzo popularna w Ripple Town.",
        ),
        T(
          "Working alone from dawn to dusk, she can bake only 4 loaves of bread each day.",
          "Ganz allein von früh bis spät kann sie täglich nur 4 Laibe Brot backen.",
          "Pracując sama od świtu do zmierzchu, jest w stanie upiec zaledwie 4 bochenki dziennie.",
        ),
        T(
          "A long line of hungry villagers waits outside, but Bea has run out of time and hands.",
          "Draußen wartet eine lange Schlange, doch Bea fehlen Zeit und helfende Hände.",
          "Na zewnątrz czeka długa kolejka głodnych mieszkańców, ale Bei brakuje czasu i rąk do pracy.",
        ),
      ],
      BeaAloneDiagram,
    ),
    animatedBeat(
      [
        T(
          "Bea decides to *hire* Leo as an assistant baker.",
          "Bea beschließt, Leo als Gesellen *einzustellen*.",
          "Bea postanawia *zatrudnić* Leo jako pomocnika piekarza.",
        ),
        T(
          "With Leo kneading dough and tending the oven, the bakery can produce 8 loaves a day.",
          "Weil Leo Teig knetet und den Ofen hütet, schafft die Backstube 8 Brote am Tag.",
          "Gdy Leo wyrabia ciasto i pilnuje pieca, piekarnia może wyprodukować 8 bochenków dziennie.",
        ),
        T(
          "Bea promises to pay Leo a guaranteed daily *wage* of 5 coins for his hard work.",
          "Bea verspricht Leo ein garantiertes tägliches *Gehalt* von 5 Münzen für seine Arbeit.",
          "Bea obiecuje wypłacać Leo gwarantowaną stałą dzienną *płacę* w wysokości 5 monet za jego pracę.",
        ),
      ],
      BeaHiresLeoDiagram,
    ),
    animatedBeat(
      [
        T(
          "On sunny days, villagers fill the square and buy all 8 fresh loaves.",
          "An sonnigen Tagen füllt sich der Marktplatz und alle 8 frischen Brote werden gekauft.",
          "W słoneczne dni mieszkańcy wypełniają rynek i kupują wszystkie 8 świeżych bochenków.",
        ),
        T(
          "Bea collects 32 coins in sales.",
          "Bea nimmt 32 Münzen durch Verkäufe ein.",
          "Bea zbiera 32 monety ze sprzedaży.",
        ),
        T(
          "After paying 16 coins for flour and 5 coins for Leo's wage, Bea keeps 11 coins profit!",
          "Nach 16 Münzen für Mehl und 5 Münzen für Leos Lohn bleiben Bea 11 Münzen Reingewinn!",
          "Po opłaceniu 16 monet za mąkę i 5 monet płacy Leo, Bei zostaje 11 monet czystego zysku!",
        ),
      ],
      SunnyDayBusyDiagram,
    ),
    animatedBeat(
      [
        T(
          "The next morning, heavy rain and wind storm across the island.",
          "Am nächsten Morgen fegen schwerer Regen und stürmischer Wind über die Insel.",
          "Następnego ranka nad wyspę nadciąga ulewny deszcz i porywisty wiatr.",
        ),
        T(
          "Villagers stay indoors by their fireplaces.",
          "Die Leute bleiben drinnen an ihren gemütlichen Kaminfeuern.",
          "Mieszkańcy zostają w ciepłych domach przy swoich kominkach.",
        ),
        T(
          "Bea and Leo only manage to sell 2 loaves of bread all day.",
          "Bea und Leo verkaufen den ganzen Tag über nur 2 Laibe Brot.",
          "Bea i Leo przez cały dzień sprzedają tylko 2 bochenki chleba.",
        ),
      ],
      StormyDayQuietDiagram,
    ),
    animatedBeat(
      [
        T(
          "Even though sales were low, Leo worked his full hours in the hot kitchen.",
          "Obwohl wenig verkauft wurde, hat Leo seine volle Arbeitszeit in der Backstube verbracht.",
          "Mimo że sprzedaż była znikoma, Leo przepracował pełne godziny w gorącej piekarni.",
        ),
        T(
          "A worker is paid for their labor, not for how many people walked down the street.",
          "Ein Angestellter bekommt Lohn für seine Arbeit, nicht für den Kundenandrang auf der Straße.",
          "Pracownik otrzymuje wynagrodzenie za wykonaną pracę, a nie za to, ilu przechodniów spacerowało po ulicy.",
        ),
        T(
          "Paying fixed wages when income drops is called business *risk*.",
          "Feste Löhne zu zahlen, selbst wenn Einnahmen sinken, nennt man unternehmerisches *Risiko*.",
          "Konieczność wypłaty stałych pensji przy spadku dochodów to *ryzyko gospodarcze* przedsiębiorcy.",
        ),
      ],
      RiskAndWageDiagram,
    ),
    animatedBeat(
      [
        T(
          "Wise business owners prepare for stormy days in advance.",
          "Kluge Unternehmerinnen und Unternehmer sorgen rechtzeitig für stürmische Tage vor.",
          "Mądrzy przedsiębiorcy przygotowują się na trudniejsze dni ze sporym wyprzedzeniem.",
        ),
        T(
          "On busy sunny days, Bea saves a jar of spare coins as an emergency reserve.",
          "An sonnigen Tagen spart Bea Münzen in einem Notfallglas als Reserve an.",
          "W pogodne dni Bea odkłada część monet do słoika jako rezerwę awaryjną.",
        ),
        T(
          "When storms arrive, she pays Leo's wage safely without fear.",
          "Wenn Stürme kommen, zahlt sie Leos Lohn sicher und ohne Angst aus der Reserve.",
          "Gdy nadchodzą burze, wypłaca pensję Leo bez obaw z odłożonych oszczędności.",
        ),
      ],
      EmergencyReserveDiagram,
    ),
  ],
  toyIntro: T(
    "Explore how hiring an assistant baker increases production, but brings wage commitments on rainy days!",
    "Erkunde, wie ein Mitarbeiter die Produktion verdoppelt, aber an Regentagen Lohnrisiken mit sich bringt!",
    "Sprawdź, jak zatrudnienie pomocnika zwiększa produkcję, lecz niesie zobowiązanie płacowe w deszczowe dni!",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "What is a wage in a business?",
        "Was ist ein Gehalt in einem Unternehmen?",
        "Czym jest wynagrodzenie za pracę?",
      ),
      options: [
        {
          text: T(
            "A guaranteed agreed payment for an employee's working time",
            "Eine vereinbarte feste Bezahlung für die Arbeitszeit eines Mitarbeiters",
            "Gwarantowaną, umówioną zapłatą za czas i wysiłek włożony w pracę",
          ),
          correct: true,
        },
        {
          text: T(
            "A gift given only on birthdays",
            "Ein Geschenk, das es nur zum Geburtstag gibt",
            "Prezentem wręczanym wyłącznie w dniu urodzin",
          ),
        },
        {
          text: T(
            "The price of a bag of flour",
            "Der Preis für einen Sack Mehl",
            "Ceną worka mąki",
          ),
        },
      ],
      hint: T(
        "A wage compensates a worker reliably for their labor and time.",
        "Ein Gehalt entschädigt Beschäftigte verlässlich für Zeit und geleistete Arbeit.",
        "Wynagrodzenie jest pewną zapłatą dla pracownika za przepracowany czas i wysiłek.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "Why does hiring an employee create business risk for the owner?",
        "Warum bedeutet das Einstellen von Mitarbeitern ein unternehmerisches Risiko?",
        "Dlaczego zatrudnienie pracownika wiąże się z ryzykiem gospodarczym dla właściciela?",
      ),
      options: [
        {
          text: T(
            "Wages must still be paid even if bad weather causes sales to drop",
            "Gehälter müssen auch gezahlt werden, wenn schlechtes Wetter den Umsatz drückt",
            "Wynagrodzenie musi zostać wypłacone nawet wtedy, gdy zła pogoda obniży sprzedaż",
          ),
          correct: true,
        },
        {
          text: T(
            "Ovens stop working when two people enter the room",
            "Backöfen gehen kaputt, sobald zwei Personen im Raum stehen",
            "Piec przestaje działać, gdy w pomieszczeniu znajdują się dwie osoby",
          ),
        },
        {
          text: T(
            "Employees are not allowed to touch bread",
            "Mitarbeiter dürfen niemals Brot anfassen",
            "Pracownikom nie wolno dotykać pieczywa",
          ),
        },
      ],
      hint: T(
        "Wages are a fixed obligation that must be honored regardless of sales fluctuations.",
        "Gehälter sind feste Pflichten, die unabhängig von Verkaufszahlen erfüllt werden müssen.",
        "Płaca to stałe zobowiązanie, które należy uregulować niezależnie od wahań utargu.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "On a stormy day, sales were low, but Leo worked his full shift. Honor Leo's guaranteed wage from the reserve jar.",
        "Am stürmischen Tag war der Verkauf schwach, doch Leo hat voll gearbeitet. Zahle Leos garantierten Lohn aus der Rücklage.",
        "W burzowy dzień sprzedaż była niska, ale Leo przepracował całą zmianę. Wypłać gwarantowaną płacę Leo z rezerwy.",
      ),
      Widget,
      hint: T(
        "Tap the button to pay Leo his guaranteed 5 coins wage from the reserve and press Check.",
        "Tippe auf den Knopf, um Leos garantierten Lohn aus der Rücklage zu zahlen, und drücke Prüfen.",
        "Naciśnij przycisk, aby wypłacić Leo 5 monet gwarantowanej pensji z rezerwy, a następnie kliknij Sprawdź.",
      ),
    },
  ],
  askDad: T(
    "Papa, how does a shop owner decide when it is safe to hire an assistant without risking running out of money?",
    "Papa, wie entscheidet eine Ladenbesitzerin, wann es sicher ist, jemanden einzustellen, ohne dass das Geld ausgeht?",
    "Tato, skąd właściciel sklepu wie, kiedy może bezpiecznie zatrudnić pracownika, by nie zabrakło mu pieniędzy na pensje?",
  ),
  realLife: {
    title: {
      en: "Employment contracts and labor law in India",
      de: "Arbeitsverträge und Betriebsrisiko in Deutschland",
      pl: "Umowy o pracę i ryzyko pracodawcy w Polsce",
    },
    body: {
      en: "In India, employment contracts and workers' rights are governed by laws such as the Code on Wages, 2019, Minimum Wages Act, and Industrial Disputes regulations. When a business hires employees, wages must be paid reliably regardless of business cycles or rainy seasons. Responsible employers keep cash reserves and working capital to ensure workers receive timely pay and statutory benefits.",
      de: "In Deutschland garantieren Arbeitsverträge Beschäftigten ihren Lohn, selbst wenn vorübergehend Kundschaft ausbleibt (sogenanntes Betriebsrisiko). Zudem gilt in Deutschland ein gesetzlicher Mindestlohn, damit alle Arbeitnehmer fair für ihre Zeit bezahlt werden.",
      pl: "W Polsce prawa pracowników reguluje Kodeks pracy. Zgodnie z art. 81 Kodeksu pracy pracownikowi za czas gotowości do pracy przysługuje wynagrodzenie, nawet jeśli z powodu braku klientów czy przestoju nie mógł jej wykonywać (tzw. ryzyko gospodarcze pracodawcy). Ponadto obowiązuje ustawowa płaca minimalna, gwarantująca godną zapłatę za przepracowane godziny.",
    },
  },
  factCard: {
    claims: [
      {
        text: {
          en: "Labor ministries oversee the statutory minimum wage regulations ensuring fair guaranteed compensation for working time.",
          de: "Das Bundesministerium für Arbeit und Soziales überwacht den gesetzlichen Mindestlohn zur Sicherung angemessener Mindestentgelte.",
          pl: "Ministerstwo Rodziny, Pracy i Polityki Społecznej ustala ustawowe wynagrodzenie minimalne, gwarantując minimalną stawkę za pracę.",
        },
        source: "https://www.gov.pl/web/rodzina/minimalne-wynagrodzenie-za-prace",
      },
      {
        text: {
          en: "Labor courts and statutory labor codes establish established jurisprudence placing economic and operational business risk on employers.",
          de: "Das Bundesarbeitsgericht weist das Betriebs- und Wirtschaftsrisiko der Unternehmensführung rechtlich den Arbeitgebern zu.",
          pl: "Kodeks pracy (art. 81) i orzecznictwo Sądu Najwyższego obciążają pracodawcę ryzykiem gospodarczym, nakazując wypłatę pensji za czas przestoju.",
        },
        source: "https://sip.lex.pl/akty-prawne/dzu-dziennik-ustaw/kodeks-pracy-16785942/art-81",
      },
      {
        text: {
          en: "Labor research institutes study employment creation, minimum wage effects, and enterprise labor liquidity across the economy.",
          de: "Das Institut für Arbeitsmarkt- und Berufsforschung (IAB) untersucht Beschäftigungseffekte, Lohnentwicklungen und unternehmerische Liquidität.",
          pl: "Instytut Badań Strukturalnych (IBS) bada tworzenie miejsc pracy, wpływ płacy minimalnej oraz stabilność zatrudnienia w gospodarce.",
        },
        source: "https://ibs.org.pl/",
      },
      {
        text: {
          en: "Public development and enterprise agencies advise small businesses on maintaining liquidity cushions against seasonal downswings.",
          de: "Die Förderbank KfW überwacht im Mittelstandspanel Liquiditätspuffer und Beschäftigungspläne kleiner Unternehmen.",
          pl: "Polska Agencja Rozwoju Przedsiębiorczości (PARP) doradza małym i średnim firmom w zakresie zarządzania płynnością finansową i buforami rezerwowymi.",
        },
        source: "https://www.parp.gov.pl/",
      },
      {
        text: {
          en: "Central banking authorities monitor business savings and liquidity buffers maintained by firms to withstand cyclical contractions.",
          de: "Die Deutsche Bundesbank analysiert die Ersparnisse und Liquiditätsreserven der Unternehmen zur Krisenbewältigung.",
          pl: "Narodowy Bank Polski (NBP) monitoruje kondycję finansową sektora przedsiębiorstw oraz rezerwy płynnościowe firm na wypadek kryzysu.",
        },
        source: "https://nbp.pl/publikacje/materialy-i-studia/",
      },
    ],
    simplified: [
      {
        en: "In the lesson, Bea keeps a simple coin jar. In real businesses, companies maintain bank credit lines, payroll insurance, and formal reserves.",
        de: "In der Lektion nutzt Bea ein einfaches Münzglas. In echten Unternehmen sichern Firmenkredite und Rücklagen die Gehaltszahlungen ab.",
        pl: "W lekcji Bea odkłada monety do słoika. W rzeczywistości przedsiębiorstwa utrzymują linie kredytowe, kapitał obrotowy i formalne rezerwy finansowe.",
      },
      {
        en: "Employment regulations in Europe and India also include mandatory social security contributions (pension, health, and accident protections) shared by employers and employees.",
        de: "Arbeitsverhältnisse beinhalten gesetzliche Sozialabgaben (Kranken-, Renten- und Arbeitslosenversicherung), die sich Betrieb und Beschäftigte teilen.",
        pl: "Zatrudnienie w Polsce wiąże się także z obowiązkowymi składkami na ubezpieczenia społeczne ZUS (emerytalne, rentowe, chorobowe i wypadkowe) dzielonymi między pracownika a firmę.",
      },
    ],
  },
};
