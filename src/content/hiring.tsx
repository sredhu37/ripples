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

const T = (en: string, de: string): Text => ({ en, de });

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
        ),
        T(
          "Working alone from dawn to dusk, she can bake only 4 loaves of bread each day.",
          "Ganz allein von früh bis spät kann sie täglich nur 4 Laibe Brot backen.",
        ),
        T(
          "A long line of hungry villagers waits outside, but Bea has run out of time and hands.",
          "Draußen wartet eine lange Schlange, doch Bea fehlen Zeit und helfende Hände.",
        ),
      ],
      BeaAloneDiagram,
    ),
    animatedBeat(
      [
        T(
          "Bea decides to *hire* Leo as an assistant baker.",
          "Bea beschließt, Leo als Gesellen *einzustellen*.",
        ),
        T(
          "With Leo kneading dough and tending the oven, the bakery can produce 8 loaves a day.",
          "Weil Leo Teig knetet und den Ofen hütet, schafft die Backstube 8 Brote am Tag.",
        ),
        T(
          "Bea promises to pay Leo a guaranteed daily *wage* of 5 coins for his hard work.",
          "Bea verspricht Leo ein garantiertes tägliches *Gehalt* von 5 Münzen für seine Arbeit.",
        ),
      ],
      BeaHiresLeoDiagram,
    ),
    animatedBeat(
      [
        T(
          "On sunny days, villagers fill the square and buy all 8 fresh loaves.",
          "An sonnigen Tagen füllt sich der Marktplatz und alle 8 frischen Brote werden gekauft.",
        ),
        T(
          "Bea collects 32 coins in sales.",
          "Bea nimmt 32 Münzen durch Verkäufe ein.",
        ),
        T(
          "After paying 16 coins for flour and 5 coins for Leo's wage, Bea keeps 11 coins profit!",
          "Nach 16 Münzen für Mehl und 5 Münzen für Leos Lohn bleiben Bea 11 Münzen Reingewinn!",
        ),
      ],
      SunnyDayBusyDiagram,
    ),
    animatedBeat(
      [
        T(
          "The next morning, heavy rain and wind storm across the island.",
          "Am nächsten Morgen fegen schwerer Regen und stürmischer Wind über die Insel.",
        ),
        T(
          "Villagers stay indoors by their fireplaces.",
          "Die Leute bleiben drinnen an ihren gemütlichen Kaminfeuern.",
        ),
        T(
          "Bea and Leo only manage to sell 2 loaves of bread all day.",
          "Bea und Leo verkaufen den ganzen Tag über nur 2 Laibe Brot.",
        ),
      ],
      StormyDayQuietDiagram,
    ),
    animatedBeat(
      [
        T(
          "Even though sales were low, Leo worked his full hours in the hot kitchen.",
          "Obwohl wenig verkauft wurde, hat Leo seine volle Arbeitszeit in der Backstube verbracht.",
        ),
        T(
          "A worker is paid for their labor, not for how many people walked down the street.",
          "Ein Angestellter bekommt Lohn für seine Arbeit, nicht für den Kundenandrang auf der Straße.",
        ),
        T(
          "Paying fixed wages when income drops is called business *risk*.",
          "Feste Löhne zu zahlen, selbst wenn Einnahmen sinken, nennt man unternehmerisches *Risiko*.",
        ),
      ],
      RiskAndWageDiagram,
    ),
    animatedBeat(
      [
        T(
          "Wise business owners prepare for stormy days in advance.",
          "Kluge Unternehmerinnen und Unternehmer sorgen rechtzeitig für stürmische Tage vor.",
        ),
        T(
          "On busy sunny days, Bea saves a jar of spare coins as an emergency reserve.",
          "An sonnigen Tagen spart Bea Münzen in einem Notfallglas als Reserve an.",
        ),
        T(
          "When storms arrive, she pays Leo's wage safely without fear.",
          "Wenn Stürme kommen, zahlt sie Leos Lohn sicher und ohne Angst aus der Reserve.",
        ),
      ],
      EmergencyReserveDiagram,
    ),
  ],
  toyIntro: T(
    "Explore how hiring an assistant baker increases production, but brings wage commitments on rainy days!",
    "Erkunde, wie ein Mitarbeiter die Produktion verdoppelt, aber an Regentagen Lohnrisiken mit sich bringt!",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "What is a wage in a business?",
        "Was ist ein Gehalt in einem Unternehmen?",
      ),
      options: [
        {
          text: T(
            "A guaranteed agreed payment for an employee's working time",
            "Eine vereinbarte feste Bezahlung für die Arbeitszeit eines Mitarbeiters",
          ),
          correct: true,
        },
        {
          text: T(
            "A gift given only on birthdays",
            "Ein Geschenk, das es nur zum Geburtstag gibt",
          ),
        },
        {
          text: T(
            "The price of a bag of flour",
            "Der Preis für einen Sack Mehl",
          ),
        },
      ],
      hint: T(
        "A wage compensates a worker reliably for their labor and time.",
        "Ein Gehalt entschädigt Beschäftigte verlässlich für Zeit und geleistete Arbeit.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "Why does hiring an employee create business risk for the owner?",
        "Warum bedeutet das Einstellen von Mitarbeitern ein unternehmerisches Risiko?",
      ),
      options: [
        {
          text: T(
            "Wages must still be paid even if bad weather causes sales to drop",
            "Gehälter müssen auch gezahlt werden, wenn schlechtes Wetter den Umsatz drückt",
          ),
          correct: true,
        },
        {
          text: T(
            "Ovens stop working when two people enter the room",
            "Backöfen gehen kaputt, sobald zwei Personen im Raum stehen",
          ),
        },
        {
          text: T(
            "Employees are not allowed to touch bread",
            "Mitarbeiter dürfen niemals Brot anfassen",
          ),
        },
      ],
      hint: T(
        "Wages are a fixed obligation that must be honored regardless of sales fluctuations.",
        "Gehälter sind feste Pflichten, die unabhängig von Verkaufszahlen erfüllt werden müssen.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "On a stormy day, sales were low, but Leo worked his full shift. Honor Leo's guaranteed wage from the reserve jar.",
        "Am stürmischen Tag war der Verkauf schwach, doch Leo hat voll gearbeitet. Zahle Leos garantierten Lohn aus der Rücklage.",
      ),
      Widget,
      hint: T(
        "Tap the button to pay Leo his guaranteed 5 coins wage from the reserve and press Check.",
        "Tippe auf den Knopf, um Leos garantierten Lohn aus der Rücklage zu zahlen, und drücke Prüfen.",
      ),
    },
  ],
  askDad: T(
    "Papa, how does a shop owner decide when it is safe to hire an assistant without risking running out of money?",
    "Papa, wie entscheidet eine Ladenbesitzerin, wann es sicher ist, jemanden einzustellen, ohne dass das Geld ausgeht?",
  ),
  realLife: {
    title: T("Labor contracts and Betriebsrisiko in Germany", "Arbeitsverträge und Betriebsrisiko in Deutschland"),
    body: T(
      "In Germany, employment contracts guarantee workers their agreed wage regardless of temporary drop in customer traffic (known as Betriebsrisiko). Germany also mandates a statutory minimum wage (gesetzlicher Mindestlohn) so all employees receive fair compensation for their working hours.",
      "In Deutschland garantieren Arbeitsverträge Beschäftigten ihren Lohn, selbst wenn vorübergehend Kundschaft ausbleibt (sogenanntes Betriebsrisiko). Zudem gilt in Deutschland ein gesetzlicher Mindestlohn, damit alle Arbeitnehmer fair für ihre Zeit bezahlt werden.",
    ),
  },
  factCard: {
    claims: [
      {
        text: "The German Federal Ministry of Labour and Social Affairs oversees the statutory minimum wage ensuring fair minimum remuneration.",
        source: "https://www.bmas.de/DE/Arbeit/Arbeitsrecht/Mindestlohn/mindestlohn.html",
      },
      {
        text: "The German Federal Labour Court establishes established jurisprudence assigning operational business risk (Betriebsrisiko) to employers.",
        source: "https://www.bundesarbeitsgericht.de/",
      },
      {
        text: "The Institute for Employment Research (IAB) analyzes employment creation, wage development, and labor risk across German businesses.",
        source: "https://iab.de/",
      },
      {
        text: "The KfW Mittelstandspanel monitors small and medium enterprises regarding liquidity reserves, staffing plans, and economic resilience.",
        source: "https://www.kfw.de/",
      },
      {
        text: "The German Bundesbank evaluates corporate savings and liquidity cushions maintained by firms against cyclical downturns.",
        source: "https://www.bundesbank.de/",
      },
    ],
    simplified: [
      "In the lesson, Bea keeps a simple coin jar. In real businesses, companies maintain bank lines of credit, payroll insurance, and formal accounting reserves.",
      "Employment regulations in Germany also include social security contributions (health, pension, and unemployment insurance) shared by employers and employees.",
    ],
  },
};
