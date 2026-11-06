import { useState } from "react";
import { animatedBeat } from "../../../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../../../lesson/types";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function CentralBankRateDiagram({ step }: { step: number }) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label="Central bank interest rate policy diagram">
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#f8fbfc" stroke="#1d3f47" strokeWidth="2" />
      <circle cx="200" cy="70" r="45" fill="#e3f2fd" stroke="#1971c2" strokeWidth="2.5" />
      <text x="200" y="68" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0c4a7e">Central Bank</text>
      <text x="200" y="84" textAnchor="middle" fontSize="11" fill="#1971c2">Policy Rate</text>

      {step >= 1 && (
        <g>
          {/* Rate Hikes: Cool inflation */}
          <rect x="35" y="135" width="150" height="75" rx="8" fill="#fff3bf" stroke="#f59f00" strokeWidth="2" />
          <text x="110" y="158" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#784e03">Rate Hikes (5%)</text>
          <text x="110" y="178" textAnchor="middle" fontSize="10" fill="#495057">Loans become pricey</text>
          <text x="110" y="195" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#2b8a3e">Cools Inflation</text>
          <path d="M 175 105 L 125 135" stroke="#f59f00" strokeWidth="2" markerEnd="url(#arrow)" />
        </g>
      )}

      {step >= 2 && (
        <g>
          {/* Rate Cuts: Stimulate growth */}
          <rect x="215" y="135" width="150" height="75" rx="8" fill="#d3f9d8" stroke="#2b8a3e" strokeWidth="2" />
          <text x="290" y="158" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#2b8a3e">Rate Cuts (1%)</text>
          <text x="290" y="178" textAnchor="middle" fontSize="10" fill="#495057">Cheap borrowing</text>
          <text x="290" y="195" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#107569">Spurs Jobs & Hiring</text>
          <path d="M 225 105 L 275 135" stroke="#2b8a3e" strokeWidth="2" markerEnd="url(#arrow)" />
        </g>
      )}
    </svg>
  );
}

function Toy({ onDone }: ToyProps) {
  const [policyRate, setPolicyRate] = useState(2);

  const borrowingCost = policyRate + 2.5;
  const inflationImpact = policyRate >= 4 ? "Falling (1.8%)" : policyRate <= 1 ? "Hot (5.5%)" : "Target (2.0%)";
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
          Adjust Central Bank Dial ({policyRate === 2 ? "5% (Hike)" : policyRate === 5 ? "1% (Cut)" : "2% (Neutral)"})
        </button>
      </div>
      <div style={{ padding: "12px", background: policyRate >= 4 ? "#fff3bf" : policyRate <= 1 ? "#ffe3e3" : "#eef8ef", borderRadius: "10px", width: "100%", textAlign: "center" }}>
        Economic Climate: {economicPace}. The central bank uses benchmark rates like a thermostat for the national economy.
      </div>
    </div>
  );
}

function RatesWidget({ onAnswer }: WidgetProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
      <p style={{ margin: 0 }}>When inflation runs too high, what action does a central bank typically take?</p>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>Lower interest rates to zero to encourage debt</button>
      <button type="button" className="btn" onClick={() => onAnswer(true)}>Raise benchmark interest rates to increase borrowing costs and slow spending</button>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>Shut down all supermarkets for a month</button>
    </div>
  );
}

export const lesson: Lesson = {
  id: "rates",
  story: [
    animatedBeat(
      [
        T("Every major economy possesses an institution that functions as the monetary thermostat: the *central bank*.", "Jede Volkswirtschaft besitzt eine Institution als monetaeres Thermostat: die *Zentralbank*.", "Każda duża gospodarka ma instytucję działającą niczym monetarny termostat: *bank centralny*."),
        T("Examples include the European Central Bank, the US Federal Reserve, and the National Bank of Poland.", "Beispiele sind die Europaeische Zentralbank, die US-Notenbank Fed oder die polnische NBP.", "Przykładami są Europejski Bank Centralny, amerykańska Rezerwa Federalna czy Narodowy Bank Polski."),
        T("Unlike commercial retail banks, central banks do not handle ordinary checking accounts for individual citizens.", "Anders als Geschaeftsbanken fuehren Zentralbanken keine Girokonten fuer Privatkunden.", "W przeciwieństwie do banków komercyjnych, banki centralne nie prowadzą kont dla zwykłych klientów."),
      ],
      CentralBankRateDiagram,
    ),
    animatedBeat(
      [
        T("The primary steering wheel of a central bank is the *benchmark interest rate* (policy rate).", "Der wichtigste Hebel der Zentralbank ist der *Leitzins*.", "Główną dźwignią banku centralnego jest *podstawowa stopa procentowa* (stopa referencyjna)."),
        T("This rate dictates the cost for commercial banks to borrow reserves from the central bank overnight.", "Er bestimmt, wie teuer es fuer Banken ist, sich ueber Nacht Geld bei der Notenbank zu leihen.", "Ta stopa określa, jak drogie dla banków jest pożyczanie rezerw od banku centralnego."),
        T("Commercial banks pass this cost directly along to mortgages, auto loans, and corporate credit lines.", "Geschaeftsbanken geben diesen Zins direkt an Bauherren und Unternehmenskredite weiter.", "Banki komercyjne przenoszą ten koszt bezpośrednio na kredyty hipoteczne czy linie firmowe."),
      ],
      CentralBankRateDiagram,
    ),
    animatedBeat(
      [
        T("When an economy overheats and inflation surges, the central bank initiates *rate hikes*.", "Ueberhitzt die Wirtschaft und klettert die Inflation, startet die Zentralbank *Zinserhoehungen*.", "Gdy gospodarka się przegrzewa i inflacja szybuje, bank centralny rozpoczyna *podwyżki stóp*."),
        T("Higher interest rates make borrowing expensive, discouraging businesses from over-leveraging.", "Hoehere Zinsen verteuern Kredite und bremsen uebermaessige Verschuldung.", "Wyższe stopy podrażają kredyty, zniechęcając firmy do nadmiernego zadłużania się."),
        T("Consumers buy fewer houses and cars on credit, slowing demand and bringing inflation back toward 2%.", "Konsumenten kaufen weniger auf Pump, was die Nachfrage daempft und Preise stabilisiert.", "Konsumenci kupują mniej domów i aut na kredyt, co studzi popyt i sprowadza inflację do celu 2%."),
      ],
      CentralBankRateDiagram,
    ),
    animatedBeat(
      [
        T("Conversely, when an economy falls into a recession and unemployment rises, the central bank cuts rates.", "Im Abschwung mit steigender Arbeitslosigkeit senkt die Notenbank dagegen den Leitzins.", "Z kolei gdy gospodarka wpada w recesję i rośnie bezrobocie, bank centralny obniża stopy."),
        T("Lower borrowing costs encourage entrepreneurs to finance new ventures and hire workers.", "Niedrige Zinsen ermutigen Firmen, neue Projekte zu starten und Arbeitsplaetze zu schaffen.", "Niższy koszt kapitału zachęca przedsiębiorców do inwestycji i tworzenia nowych miejsc pracy."),
        T("Central banks balance their *dual mandate*: price stability and maximum sustainable employment.", "Zentralbanken balancieren ihr *Doppelmandat*: Preisstabilitaet und Beschaeftigung.", "Banki centralne dbają o swój mandat: stabilność cen oraz wspieranie zatrudnienia."),
      ],
      CentralBankRateDiagram,
    ),
    animatedBeat(
      [
        T("Interest rate decisions affect every asset class: stocks, bond yields, real estate, and foreign exchange.", "Zinsentscheide beeinflussen alle Maerkte: Aktien, Anleihen, Immobilien und Waehrungen.", "Decyzje o stopach procentowych rzutują na wszystkie rynki: akcje, obligacje, nieruchomości i waluty."),
        T("Understanding central bank monetary policy gives you the macro lens to interpret global financial news.", "Die Geldpolitik zu verstehen gibt dir den Weitblick fuer globale Finanznachrichten.", "Zrozumienie polityki banku centralnego daje makroekonomiczny kompas do interpretacji wiadomości ze świata."),
        T("A stable currency with steady interest rates forms the bedrock of prosperity and predictable commerce.", "Eine stabile Waehrung mit verlaesslichen Zinsen ist das Fundament fuer Wohlstand.", "Stabilna waluta z przewidywalnymi stopami procentowymi tworzy fundament dobrobytu i handlu."),
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
        "Why does a central bank raise its policy interest rate when inflation is elevated?",
        "Warum erhoeht eine Zentralbank den Leitzins bei hoher Inflation?",
        "Dlaczego bank centralny podnosi stopy procentowe przy wysokiej inflacji?",
      ),
      options: [
        { text: T("To increase borrowing costs, cool down excessive demand, and stabilize prices", "Um Kredite zu verteuern, uebermaessige Nachfrage zu daempfen und Preise zu stabilisieren", "Aby podnieść koszt kredytu, ostudzić nadmierny popyt i ustabilizować ceny"), correct: true },
        { text: T("To make all bank employees wear formal evening suits", "Damit alle Bankangestellten abends im Frack arbeiten muessen", "Aby wszyscy pracownicy banków musieli nosić fraki wieczorowe") },
        { text: T("To completely ban international airline travel", "Um Flugreisen ins Ausland dauerhaft gesetzlich zu verbieten", "Aby trwale zakazać międzynarodowych podróży lotniczych") },
      ],
      hint: T(
        "Higher loan costs slow down money circulation across the economy.",
        "Teurere Kredite verlangsamen den Geldumlauf in der gesamten Wirtschaft.",
        "Droższe kredyty spowalniają obieg pieniądza w całej gospodarce.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "How do central bank rate cuts stimulate an economy experiencing a downturn?",
        "Wie kurbeln Zinssenkungen der Zentralbank eine schwaechelnde Wirtschaft an?",
        "Jak obniżki stóp procentowych pobudzają osłabioną gospodarkę?",
      ),
      options: [
        { text: T("By making credit cheaper, incentivizing business investment and hiring", "Indem sie Kredite verbilligen und Investitionen sowie Neueinstellungen anregen", "Czyniąc kredyt tańszym, co zachęca firmy do inwestycji i zatrudniania pracowników"), correct: true },
        { text: T("By doubling the cost of every kilowatt of electricity", "Indem sie die Strompreise fuer Industrie und Buerger verdoppeln", "Podwajając ceny każdej kilowatogodziny energii elektrycznej") },
        { text: T("By ordering every office building to remain dark on Mondays", "Indem Buerogebaeude montags komplett unbeleuchtet bleiben muessen", "Nakazując wyłączanie światła w biurowcach w każdy poniedziałek") },
      ],
      hint: T(
        "Cheap borrowing lowers hurdles for companies to fund expansion.",
        "Guenstiges Geld senkt die Huerden fuer Firmenerweiterungen.",
        "Tani pieniądz obniża bariery dla rozwoju przedsiębiorstw.",
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
      { text: T("The European Central Bank sets three key policy rates: the deposit facility, main refinancing operations, and marginal lending facility.", "Die EZB steuert drei Leitzinsen: Einlagesatz, Hauptrefinanzierungssatz und Spitzenrefinanzierungssatz.", "Europejski Bank Centralny wyznacza trzy kluczowe stopy: depozytową, podstawowych operacji refinansujących i kredytu w banku centralnym."), source: "https://www.ecb.europa.eu/mopo/intro/html/index.en.html" },
      { text: T("The Federal Reserve Act mandates the Federal Reserve to promote maximum employment and stable prices (dual mandate).", "Das US-Federal-Reserve-Gesetz verpflichtet die Fed auf Preisstabilitaet und maximale Beschaeftigung.", "Ustawa o Rezerwie Federalnej zobowiązuje Fed do wspierania maksymalnego zatrudnienia i stabilności cen (podwójny mandat)."), source: "https://www.federalreserve.gov/aboutthefed/fract.htm" },
      { text: T("The Bank of England's Monetary Policy Committee meets eight times a year to set the Bank Rate.", "Der geldpolitische Ausschuss der Bank of England tagt achtmal jaehrlich zur Festlegung des Leitzinses.", "Komitet Polityki Pieniężnej Banku Anglii spotyka się osiem razy w roku, aby decydować o stopie Bank Rate."), source: "https://www.bankofengland.co.uk/monetary-policy" },
      { text: T("The Bank for International Settlements (BIS) serves as a cooperative forum and bank for central banks worldwide.", "Die Bank fuer Internationalen Zahlungsausgleich (BIZ) fungiert als Bank der Notenbanken weltweit.", "Bank Rozrachunków Międzynarodowych (BIS) służy jako platforma współpracy i bank dla banków centralnych na świecie."), source: "https://www.bis.org/about/index.htm" },
      { text: T("The Taylor Rule, developed by John B. Taylor in 1993, provides a formula linking benchmark interest rates to inflation gaps and output gaps.", "Die Taylor-Regel von 1993 verknuepft Zinsaenderungen mathematisch mit Inflation und Auslastung.", "Reguła Taylora z 1993 roku łączy poziom stóp procentowych z luką inflacyjną i luką popytową w gospodarce."), source: "https://web.stanford.edu/~johntayl/Papers/Discretion.PDF" },
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
