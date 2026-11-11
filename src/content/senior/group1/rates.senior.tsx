import { useState } from "react";
import { animatedBeat } from "../../../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../../../lesson/types";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function CentralBankRateDiagram({ step }: { step: number }) {
  return (
    <svg
      viewBox="0 0 400 240"
      className="diagram-svg"
      role="img"
      aria-label="Central bank interest rate policy diagram"
    >
      <rect
        x="10"
        y="10"
        width="380"
        height="220"
        rx="14"
        fill="#f8fbfc"
        stroke="#1d3f47"
        strokeWidth="2"
      />
      <circle cx="200" cy="70" r="45" fill="#e3f2fd" stroke="#1971c2" strokeWidth="2.5" />
      <text x="200" y="68" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0c4a7e">
        Central Bank
      </text>
      <text x="200" y="84" textAnchor="middle" fontSize="11" fill="#1971c2">
        Policy Rate
      </text>

      {step >= 1 && (
        <g>
          {/* Rate Hikes: Cool inflation */}
          <rect
            x="35"
            y="135"
            width="150"
            height="75"
            rx="8"
            fill="#fff3bf"
            stroke="#f59f00"
            strokeWidth="2"
          />
          <text x="110" y="158" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#784e03">
            Rate Hikes (5%)
          </text>
          <text x="110" y="178" textAnchor="middle" fontSize="10" fill="#495057">
            Loans become pricey
          </text>
          <text x="110" y="195" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#2b8a3e">
            Cools Inflation
          </text>
          <path d="M 175 105 L 125 135" stroke="#f59f00" strokeWidth="2" markerEnd="url(#arrow)" />
        </g>
      )}

      {step >= 2 && (
        <g>
          {/* Rate Cuts: Stimulate growth */}
          <rect
            x="215"
            y="135"
            width="150"
            height="75"
            rx="8"
            fill="#d3f9d8"
            stroke="#2b8a3e"
            strokeWidth="2"
          />
          <text x="290" y="158" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#2b8a3e">
            Rate Cuts (1%)
          </text>
          <text x="290" y="178" textAnchor="middle" fontSize="10" fill="#495057">
            Cheap borrowing
          </text>
          <text x="290" y="195" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#107569">
            Spurs Jobs & Hiring
          </text>
          <path d="M 225 105 L 275 135" stroke="#2b8a3e" strokeWidth="2" markerEnd="url(#arrow)" />
        </g>
      )}
    </svg>
  );
}

function Toy({ onDone }: ToyProps) {
  const [policyRate, setPolicyRate] = useState(2);

  const borrowingCost = policyRate + 2.5;
  const inflationImpact =
    policyRate >= 4 ? "Falling (1.8%)" : policyRate <= 1 ? "Hot (5.5%)" : "Target (2.0%)";
  const economicPace = policyRate >= 4 ? "Cooling down" : policyRate <= 1 ? "Booming" : "Balanced";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "center" }}>
      <p style={{ margin: 0, fontWeight: 700, fontSize: "1rem" }}>
        Policy Rate: {policyRate}% | Mortgage Rate: {borrowingCost}% | Inflation: {inflationImpact}
      </p>
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          type="button"
          className="btn"
          onClick={() => {
            setPolicyRate((r) => {
              const next = r === 2 ? 5 : r === 5 ? 1 : 2;
              if (next === 5) onDone?.();
              return next;
            });
          }}
        >
          Adjust Central Bank Dial (
          {policyRate === 2 ? "5% (Hike)" : policyRate === 5 ? "1% (Cut)" : "2% (Neutral)"})
        </button>
      </div>
      <div
        style={{
          padding: "12px",
          background: policyRate >= 4 ? "#fff3bf" : policyRate <= 1 ? "#ffe3e3" : "#eef8ef",
          borderRadius: "10px",
          width: "100%",
          textAlign: "center",
        }}
      >
        Economic Climate: {economicPace}. The central bank uses benchmark rates like a thermostat
        for the national economy.
      </div>
    </div>
  );
}

function RatesWidget({ onAnswer }: WidgetProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
      <p style={{ margin: 0 }}>
        When inflation runs too high, what action does a central bank typically take?
      </p>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>
        Lower interest rates to zero to encourage debt
      </button>
      <button type="button" className="btn" onClick={() => onAnswer(true)}>
        Raise benchmark interest rates to increase borrowing costs and slow spending
      </button>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>
        Shut down all supermarkets for a month
      </button>
    </div>
  );
}

export const lesson: Lesson = {
  id: "rates",
  story: [
    animatedBeat(
      [
        T(
          "Meet Anjali. Her family is thinking about getting a loan to expand their home bakery, while Anjali wants to put her lawn-mowing earnings into a savings account.",
          "Das ist Lena. Ihre Familie moechte einen Kredit fuer die Backstube aufnehmen, waehrend Lena ihr Erspartes gut anlegen will.",
          "Poznaj Maję. Jej rodzina planuje wziąć kredyt na powiększenie domowej piekarni, a Maja chce wpłacić swoje oszczędności na lokatę.",
        ),
        T(
          "Both of their financial plans depend on one single dial controlled by the central bank: the *interest rate*.",
          "Beide Plaene haengen von einem einzigen Hebel der Zentralbank ab: dem *Leitzins*.",
          "Oba te plany zależą od jednego pokrętła regulowanego przez bank centralny: *stopy procentowej*.",
        ),
        T(
          "Think of the central bank interest rate like the master thermostat of the entire economy.",
          "Stell dir den Zinssatz wie das zentrale Heizungsthermostat der gesamten Wirtschaft vor.",
          "Pomyśl o stopie procentowej jak o głównym termostacie sterującym temperaturą całej gospodarki.",
        ),
      ],
      CentralBankRateDiagram,
    ),
    animatedBeat(
      [
        T(
          "When stores are quiet and businesses are nervous to hire, the central bank turns the dial down: they *cut interest rates*.",
          "Wenn Geschaefte leer sind und Firmen zoegern einzustellen, dreht die Bank den Zins nach unten: sie *senkt die Zinsen*.",
          "Gdy w sklepach panuje cisza, a firmy boją się inwestować, bank centralny przekręca pokrętło: *obniża stopy procentowe*.",
        ),
        T(
          "Suddenly bank loans become cheap and easy to pay back.",
          "Ploetzlich werden Kredite guenstig und einfach abzuzahlen.",
          "Kredyty w bankach nagle stają się tanie i łatwe do spłaty.",
        ),
        T(
          "Anjali family takes the cheap loan to buy a bigger commercial oven, hiring two assistant bakers and firing up sales.",
          "Lenas Familie nimmt den Kredit fuer einen grossen Profi-Ofen, stellt Helfer ein und steigert den Verkauf.",
          "Rodzina Mai bierze tani kredyt na profesjonalny piec, zatrudnia pomocników i rozwija sprzedaż wypieków.",
        ),
      ],
      CentralBankRateDiagram,
    ),
    animatedBeat(
      [
        T(
          "But if interest rates stay super low for too long, the economy starts running too hot.",
          "Bleiben Zinsen aber zu lange zu niedrig, laeuft der Wirtschaftsmotor heiss.",
          "Lecz jeśli stopy pozostają zbyt niskie przez zbyt długi czas, silnik gospodarki zaczyna się przegrzewać.",
        ),
        T(
          "Everyone wants to borrow money to buy supplies at the exact same moment, causing prices everywhere to spike.",
          "Jeder will gleichzeitig Kredite fuer Waren aufnehmen, sodass Preise ueberall in die Hoehe schiessen.",
          "Wszyscy naraz biorą pożyczki i rzucają się na zakupy, co winduje ceny we wszystkich sklepach.",
        ),
        T(
          "To cool down rising prices, the central bank steps on the brake: they *raise interest rates*.",
          "Um die Teuerung abzukuehlen, tritt die Zentralbank auf die Bremse: Sie *erhoeht die Zinsen*.",
          "Aby ostudzić gorączkę cenową, bank centralny wciska hamulec: *podnosi stopy procentowe*.",
        ),
      ],
      CentralBankRateDiagram,
    ),
    animatedBeat(
      [
        T(
          "When rates go up, borrowing becomes more expensive, so businesses borrow more cautiously.",
          "Bei hoeheren Zinsen werden Kredite teurer, sodass Firmen vorsichtiger wirtschaften.",
          "Gdy stopy rosną, kredyty stają się droższe, więc firmy ostrożniej podejmują decyzje o zadłużeniu.",
        ),
        T(
          "At the same time, high-yield savings accounts start paying awesome returns to patient savers like Anjali.",
          "Gleichzeitig werfen Sparkonten fuer geduldige Sparer wie Lena ploetzlich tolle Zinsen ab.",
          "Jednocześnie lokaty bankowe zaczynają wypłacać wspaniałe odsetki cierpliwym oszczędzającym, takim jak Maja.",
        ),
        T(
          "People choose to put money in the bank instead of overbidding on goods, bringing price inflation back under control.",
          "Die Menschen sparen lieber auf der Bank statt blind einzukaufen, was die Teuerung bremst.",
          "Ludzie wolą trzymać pieniądze w banku niż przepłacać w sklepach, co skutecznie uspokaja wzrost cen.",
        ),
      ],
      CentralBankRateDiagram,
    ),
    animatedBeat(
      [
        T(
          "This continuous adjustment between heating up growth and cooling down inflation is the central bank balancing act.",
          "Dieser Balanceakt zwischen Wachstums-Gaspedal und Inflations-Bremse ist die Kernaufgabe.",
          "To nieustanne balansowanie między pobudzaniem wzrostu a chłodzeniem inflacji jest misją banku centralnego.",
        ),
        T(
          "Understanding interest rates tells you when it is smart to borrow for great tools and when it is prime time to save.",
          "Zinsen zu verstehen zeigt dir, wann Kredite schlau sind und wann beste Sparzeiten herrschen.",
          "Zrozumienie stóp procentowych podpowiada, kiedy warto pożyczać na rozwój, a kiedy najlepiej cierpliwie oszczędzać.",
        ),
        T(
          "Knowing how the economic thermostat works gives you an edge in every business decision you make.",
          "Wer dieses Thermostat versteht, hat bei jeder finanziellen Entscheidung die Nase vorn.",
          "Znajomość działania tego termostatu daje ogromną przewagę przy każdej życiowej decyzji finansowej.",
        ),
      ],
      CentralBankRateDiagram,
    ),
  ],
  toyIntro: T(
    "Experiment with central bank policy rates and observe their effect on inflation and economic activity.",
    "Experimentiere mit dem Leitzins und beobachte die Wirkung auf Inflation und Wirtschaftsaktivitaet.",
    "Poeksperymentuj ze stopą referencyjną i zobacz jej wpływ na inflację oraz tempo gospodarki.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "Why does a central bank raise interest rates when prices are rising fast?",
        "Warum erhoeht eine Zentralbank die Zinsen, wenn Preise zu schnell steigen?",
        "Dlaczego bank centralny podnosi stopy, gdy ceny rosną zbyt szybko?",
      ),
      options: [
        {
          text: T(
            "To make loans more expensive, cooling down spending and stabilizing prices",
            "Um Kredite zu verteuern, Ausgaben zu bremsen und Preise zu stabilisieren",
            "Aby podnieść koszt kredytów, ostudzić wydatki i ustabilizować ceny",
          ),
          correct: true,
        },
        {
          text: T(
            "To make bank employees wear fancy formal evening suits",
            "Damit Bankangestellte abends im Frack arbeiten muessen",
            "Aby pracownicy banków musieli nosić fraki wieczorowe",
          ),
        },
        {
          text: T(
            "To ban all international airplane flights forever",
            "Um alle Fluege ins Ausland fuer immer zu verbieten",
            "Aby trwale zakazać międzynarodowych lotów pasażerskich",
          ),
        },
      ],
      hint: T(
        "Higher loan costs slow down fast spending across the economy.",
        "Teurere Kredite bremsen den schnellen Konsum in der Wirtschaft.",
        "Droższe kredyty hamują szybkie wydawanie pieniędzy w sklepach.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "How do central bank interest rate cuts help a slow economy?",
        "Wie helfen Zinssenkungen der Zentralbank einer lahmenden Wirtschaft?",
        "Jak obniżki stóp banku centralnego pomagają spowolnionej gospodarce?",
      ),
      options: [
        {
          text: T(
            "By making loans cheaper, encouraging businesses to invest and hire workers",
            "Indem sie Kredite verbilligen und Firmen zum Investieren und Einstellen ermutigen",
            "Czyniąc kredyty tańszymi, co zachęca firmy do inwestycji i zatrudniania ludzi",
          ),
          correct: true,
        },
        {
          text: T(
            "By doubling the electric bill for all schools and hospitals",
            "Indem sie die Stromrechnung fuer alle Schulen verdoppeln",
            "Podwajając rachunki za prąd dla szkół i szpitali",
          ),
        },
        {
          text: T(
            "By ordering every office building to stay completely dark on Mondays",
            "Indem Buerogebaeude montags komplett dunkel bleiben muessen",
            "Nakazując wyłączanie prądu w biurach w każdy poniedziałek",
          ),
        },
      ],
      hint: T(
        "Cheaper loans make it easy for businesses to buy better tools.",
        "Guenstige Kredite machen es Firmen leicht, bessere Werkzeuge zu kaufen.",
        "Tańsze pożyczki ułatwiają firmom zakup lepszych maszyn i narzędzi.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Select the primary monetary policy action used to cool down high inflation.",
        "Waehle die primaere geldpolitische Massnahme zur Daempfung hoher Inflation aus.",
        "Wskaż podstawowe działanie polityki pieniężnej stosowane do walki z wysoką inflacją.",
      ),
      Widget: RatesWidget,
      hint: T(
        "Raising benchmark borrowing rates cools spending throughout the economy.",
        "Das Anheben der Leitzinsen verteuert Kredite und bremst den Konsum.",
        "Podwyżka stóp referencyjnych podraża pożyczki i hamuje wydatki w gospodarce.",
      ),
    },
  ],
  askDad: T(
    "Ask your parent: How did recent central bank interest rate changes affect mortgage rates or bond yields in your area?",
    "Frage deine Eltern: Wie haben die juengsten Leitzinsaenderungen Bauzinsen oder Sparbuchrenditen bei euch beeinflusst?",
    "Zapytaj rodziców: Jak niedawne zmiany stóp banku centralnego wpłynęły na raty kredytów lub lokaty w Waszej okolicy?",
  ),
  realLife: {
    title: T(
      "Real world: Central bank policy meetings and global market reactions",
      "Echte Welt: Zinsentscheide der Zentralbanken und Boersenreaktionen",
      "Prawdziwy świat: Posiedzenia banków centralnych i reakcje rynków",
    ),
    body: T(
      "Eight times each year, the US Federal Open Market Committee (FOMC) and the Governing Council of the European Central Bank meet to set benchmark interest rates. Trillions of dollars in global bond and equity markets fluctuate in seconds based on single-word changes in central bank policy statements.",
      "Achtmal im Jahr entscheiden das US-FOMC und der Rat der EZB ueber die Leitzinsen. Billionen an den Boersen bewegen sich in Sekundenschnelle nach jedem Satz in der Pressekonferenz.",
      "Osiem razy w roku Komitet FOMC amerykańskiego Fedu oraz Rada Prezesów EBC decydują o stopach referencyjnych. Biliony dolarów na rynkach obligacji i akcji reagują w ułamku sekundy na każde słowo z konferencji prasowej.",
    ),
  },
  factCard: {
    claims: [
      {
        text: T(
          "The European Central Bank sets three key policy rates: the deposit facility, main refinancing operations, and marginal lending facility.",
          "Die EZB steuert drei Leitzinsen: Einlagesatz, Hauptrefinanzierungssatz und Spitzenrefinanzierungssatz.",
          "Europejski Bank Centralny wyznacza trzy kluczowe stopy: depozytową, podstawowych operacji refinansujących i kredytu w banku centralnym.",
        ),
        source: "https://www.ecb.europa.eu/mopo/intro/html/index.en.html",
      },
      {
        text: T(
          "The Federal Reserve Act mandates the Federal Reserve to promote maximum employment and stable prices (dual mandate).",
          "Das US-Federal-Reserve-Gesetz verpflichtet die Fed auf Preisstabilitaet und maximale Beschaeftigung.",
          "Ustawa o Rezerwie Federalnej zobowiązuje Fed do wspierania maksymalnego zatrudnienia i stabilności cen (podwójny mandat).",
        ),
        source: "https://www.federalreserve.gov/aboutthefed/fract.htm",
      },
      {
        text: T(
          "The Bank of England's Monetary Policy Committee meets eight times a year to set the Bank Rate.",
          "Der geldpolitische Ausschuss der Bank of England tagt achtmal jaehrlich zur Festlegung des Leitzinses.",
          "Komitet Polityki Pieniężnej Banku Anglii spotyka się osiem razy w roku, aby decydować o stopie Bank Rate.",
        ),
        source: "https://www.bankofengland.co.uk/monetary-policy",
      },
      {
        text: T(
          "The Bank for International Settlements (BIS) serves as a cooperative forum and bank for central banks worldwide.",
          "Die Bank fuer Internationalen Zahlungsausgleich (BIZ) fungiert als Bank der Notenbanken weltweit.",
          "Bank Rozrachunków Międzynarodowych (BIS) służy jako platforma współpracy i bank dla banków centralnych na świecie.",
        ),
        source: "https://www.bis.org/about/index.htm",
      },
      {
        text: T(
          "The Taylor Rule, developed by John B. Taylor in 1993, provides a formula linking benchmark interest rates to inflation gaps and output gaps.",
          "Die Taylor-Regel von 1993 verknuepft Zinsaenderungen mathematisch mit Inflation und Auslastung.",
          "Reguła Taylora z 1993 roku łączy poziom stóp procentowych z luką inflacyjną i luką popytową w gospodarce.",
        ),
        source: "https://web.stanford.edu/~johntayl/Papers/Discretion.PDF",
      },
    ],
    simplified: [
      T(
        "Quantitative tightening (QT) operations and reverse repo facilities are abstracted into the benchmark interest rate mechanism.",
        "Quantitative Straffung (QT) und Reverse-Repo-Fazilitaeten werden auf den zentralen Leitzinshebel vereinfacht.",
        "Operacje zacieśniania ilościowego (QT) i transakcje reverse repo uproszczono do kluczowego mechanizmu stóp procentowych.",
      ),
    ],
  },
};
