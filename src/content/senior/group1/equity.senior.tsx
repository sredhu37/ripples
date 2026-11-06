import { useState } from "react";
import { animatedBeat } from "../../../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../../../lesson/types";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function CapTableDiagram({ step }: { step: number }) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label="Cap table and equity dilution diagram">
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#f8fbfc" stroke="#1d3f47" strokeWidth="2" />
      <circle cx="120" cy="120" r="70" fill="#e3f2fd" stroke="#1971c2" strokeWidth="2.5" />
      <text x="120" y="125" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0c4a7e">Founder 100%</text>

      {step >= 1 && (
        <g>
          <path d="M 120 120 L 120 50 A 70 70 0 0 1 190 120 Z" fill="#ffd43b" stroke="#f59f00" strokeWidth="2" />
          <text x="145" y="95" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#d9480f">25% Investor</text>
          <text x="100" y="145" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1971c2">75% Founder</text>
        </g>
      )}

      {step >= 2 && (
        <g>
          <rect x="230" y="55" width="145" height="130" rx="10" fill="#fff" stroke="#107569" strokeWidth="2" />
          <text x="302" y="80" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#107569">Valuation Growth</text>
          <text x="302" y="110" textAnchor="middle" fontSize="11" fill="#495057">Round 1: $1M Val</text>
          <text x="302" y="135" textAnchor="middle" fontSize="11" fill="#495057">Round 2: $10M Val</text>
          <text x="302" y="165" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#2b8a3e">75% of $10M = $7.5M</text>
        </g>
      )}
    </svg>
  );
}

function Toy({ onDone }: ToyProps) {
  const [rounds, setRounds] = useState(0);

  const valuation = rounds === 0 ? 1000000 : rounds === 1 ? 5000000 : 20000000;
  const founderEquity = rounds === 0 ? 100 : rounds === 1 ? 80 : 64;
  const founderWealth = (founderEquity / 100) * valuation;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "center" }}>
      <p style={{ margin: 0, fontWeight: 700, fontSize: "1rem" }}>
        Founder Ownership: {founderEquity}% | Company Valuation: ${valuation.toLocaleString()}
      </p>
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          type="button"
          className="btn"
          onClick={() => {
            setRounds((r) => {
              const next = Math.min(2, r + 1);
              if (next >= 1) onDone?.();
              return next;
            });
          }}
        >
          Raise Next Funding Round (+1)
        </button>
        <button
          type="button"
          className="btn btn-quiet"
          onClick={() => setRounds(0)}
        >
          Reset to Bootstrap
        </button>
      </div>
      <div style={{ padding: "12px", background: "#eef8ef", borderRadius: "10px", width: "100%", textAlign: "center" }}>
        Founder Value: ${founderWealth.toLocaleString()}. Owning a smaller slice of a much larger pie creates enormous wealth!
      </div>
    </div>
  );
}

function EquityWidget({ onAnswer }: WidgetProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
      <p style={{ margin: 0 }}>If you sell 20% of your company for $200,000, what is the post-money valuation of your company?</p>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>$200,000</button>
      <button type="button" className="btn" onClick={() => onAnswer(true)}>$1,000,000 ($200,000 / 0.20)</button>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>$50,000</button>
    </div>
  );
}

export const lesson: Lesson = {
  id: "equity",
  story: [
    animatedBeat(
      [
        T("When an entrepreneur creates a new company, they initially own one hundred percent of its *equity*.", "Gruendet eine Unternehmerin eine Firma, gehoeren ihr anfaenglich einhundert Prozent der *Anteile*.", "Gdy przedsiębiorca zakłada spółkę, początkowo posiada sto procent jej *kapitału własnego*."),
        T("Equity represents ownership: rights to future profits and voting control over decisions.", "Anteile repraesentieren Eigentum: Anspruch auf zukuenftige Gewinne und Stimmrechte.", "Udziały oznaczają własność: prawo do przyszłych zysków oraz głos przy podejmowaniu decyzji."),
        T("To scale rapidly, hiring top engineers and buying servers requires more cash than the founder has.", "Um schnell zu wachsen, braucht man mehr Kapital fuer Entwickler und Server, als man selbst besitzt.", "Aby szybko rosnąć, zatrudnienie inżynierów i zakup serwerów wymaga większych środków, niż ma założyciel."),
      ],
      CapTableDiagram,
    ),
    animatedBeat(
      [
        T("The founder can raise venture capital by issuing new shares to investors.", "Die Gruenderin kann Risikokapital aufnehmen, indem sie neue Anteile an Investoren ausgibt.", "Założyciel może pozyskać kapitał podwyższając kapitał i emitując nowe udziały dla inwestorów."),
        T("A *capitalization table* (cap table) tracks who owns which percentage of the company.", "Eine *Gesellschafterliste* (Cap Table) fuehrt auf, wer wie viel Prozent am Unternehmen haelt.", "Tabela struktury udziałów (cap table) rejestruje, kto posiada jaki procent udziałów w firmie."),
        T("If an investor injects two hundred thousand dollars for twenty percent, the *post-money valuation* is one million dollars.", "Gibt ein Investor 200.000 Dollar fuer zwanzig Prozent, betraegt die *Post-Money-Bewertung* eine Million Dollar.", "Jeśli inwestor wnosi dwieście tysięcy dolarów za dwadzieścia procent, *wycena post-money* wynosi milion dolarów."),
      ],
      CapTableDiagram,
    ),
    animatedBeat(
      [
        T("Issuing new shares creates *dilution*: the founder's percentage of total ownership drops from 100% to 80%.", "Neue Anteile fuehren zur *Verwaesserung*: Der Gruenderanteil sinkt von 100% auf 80%.", "Emisja nowych udziałów powoduje *rozwodnienie*: udział założyciela spada ze 100% do 80%."),
        T("However, eighty percent of a million-dollar company is worth eight hundred thousand dollars.", "Doch achtzig Prozent von einer Million Dollar sind achthunderttausend Dollar wert.", "Jednak osiemdziesiąt procent z miliona dolarów to aż osiemset tysięcy dolarów wartości."),
        T("Would you rather own 100% of a grape, or 80% of a giant watermelon?", "Besitzt du lieber 100% einer Weintraube oder 80% einer riesigen Wassermelone?", "Wolisz mieć 100% małego winogrona czy 80% ogromnego arbuza?"),
      ],
      CapTableDiagram,
    ),
    animatedBeat(
      [
        T("Later, early employees may receive stock options to align incentives with company success.", "Spaeter erhalten fruehe Mitarbeiter oft Mitarbeiteraktien, um am Erfolg beteiligt zu sein.", "Później kluczowi pracownicy otrzymują opcje na udziały, aby dzielić sukces przedsiębiorstwa."),
        T("If the company eventually launches an *Initial Public Offering* (IPO), shares trade on public stock exchanges.", "Geht die Firma spaeter an die Boerse (*IPO*), koennen jedermann die Aktien an der Boerse handeln.", "Jeśli spółka zadebiutuje na giełdzie (*IPO*), jej akcje stają się dostępne do obrotu publicznego."),
        T("Public equity provides liquidity, allowing founders and investors to sell shares for cash.", "Boersengang schafft Liquiditaet, sodass Gruender und Investoren Anteile in Geld tauschen koennen.", "Publiczny obrót daje płynność, pozwalając założycielom i inwestorom na spieniężenie udziałów."),
      ],
      CapTableDiagram,
    ),
    animatedBeat(
      [
        T("Owning equity in growing businesses is one of the most powerful mechanisms for building long-term wealth.", "Unternehmensbeteiligungen sind einer der wirksamsten Hebel fuer langfristigen Vermoegensaufbau.", "Posiadanie udziałów w rosnących firmach to jeden z najpotężniejszych mechanizmów budowania majątku."),
        T("Wages reward you only while working, but equity compounds around the clock.", "Loehne belohnen dich nur bei der Arbeit, aber Unternehmensanteile wachsen rund um die Uhr.", "Pensja wynagradza Cię tylko wtedy, gdy pracujesz, ale kapitał własny pracuje przez całą dobę."),
        T("Learn to be an owner of productive capital, not merely a consumer of products.", "Lerne, Eigentuemer produktiven Kapitals zu sein und nicht nur reiner Konsument von Guetern.", "Ucz się być właścicielem produktywnego kapitału, a nie tylko konsumentem produktów."),
      ],
      CapTableDiagram,
    ),
  ],
  toyIntro: T(
    "Simulate equity rounds, dilution, and the expanding value of the founder's ownership.",
    "Simuliere Finanzierungsrunden, Verwaesserung und den wachsenden Wert der Gruenderanteile.",
    "Zasymuluj rundy finansowania, rozwodnienie i rosnącą wartość udziałów założyciela.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "What does equity dilution mean when new investors buy into a company?",
        "Was bedeutet Verwaesserung (Dilution), wenn neue Investoren Anteile kaufen?",
        "Co oznacza rozwodnienie kapitału (dilution), gdy nowi inwestorzy wchodzą do spółki?",
      ),
      options: [
        { text: T("Existing shareholders own a smaller percentage of the total company", "Bestehende Eigentuemer besitzen einen kleineren Prozentsatz am Gesamtunternehmen", "Dotychczasowi właściciele mają mniejszy procentowy udział w całej spółce"), correct: true },
        { text: T("The company pours water into its factory products", "Das Unternehmen verduennt seine physischen Produkte mit Wasser", "Przedsiębiorstwo dosłownie rozcieńcza swoje produkty wodą") },
        { text: T("The government seizes fifty percent of corporate bank accounts", "Der Staat beschlagnahmt die Haelfte aller Bankkonten der Firma", "Państwo przejmuje połowę wszystkich kont bankowych firmy") },
      ],
      hint: T(
        "Your percentage share of the company's total pie decreases.",
        "Dein prozentualer Anteil am gesamten Unternehmenskuchen wird kleiner.",
        "Twój procentowy kawałek całego firmowego tortu staje się mniejszy.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "Why do founders accept equity dilution during venture funding?",
        "Warum akzeptieren Gruender eine Verwaesserung ihrer Anteile bei Finanzierungsrunden?",
        "Dlaczego założyciele godzą się na rozwodnienie udziałów przy pozyskiwaniu kapitału?",
      ),
      options: [
        { text: T("Capital allows the business to grow faster, making a smaller percentage worth far more", "Das Kapital ermoeglicht schnelleres Wachstum, wodurch ein kleinerer Anteil viel mehr wert wird", "Kapitał pozwala na szybszy wzrost, dzięki czemu mniejszy udział staje się wart o wiele więcej"), correct: true },
        { text: T("Investors force founders to work without salary permanently", "Investoren zwingen Gruender dauerhaft ohne Gehalt zu arbeiten", "Inwestorzy zmuszają założycieli do dożywotniej pracy bez pensji") },
        { text: T("It is required to change the company logo every month", "Es ist gesetzlich vorgeschrieben, das Firmenlogo monatlich zu aendern", "Jest to wymóg konieczny do comiesięcznej zmiany logo spółki") },
      ],
      hint: T(
        "A smaller slice of a giant pie is much bigger than a whole crumb.",
        "Ein kleineres Stueck eines riesigen Kuchens ist groesser als ein ganzer Kruemel.",
        "Mniejszy kawałek ogromnego tortu jest znacznie większy niż całe małe ziarenko.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Calculate the post-money valuation when 20% equity is sold for $200,000.",
        "Berechne die Post-Money-Bewertung, wenn 20% Firmenanteile fuer 200.000 Dollar verkauft werden.",
        "Oblicz wycenę post-money, gdy 20% udziałów sprzedawane jest za 200 000 dolarów.",
      ),
      Widget: EquityWidget,
      hint: T(
        "Divide the investment amount by the fractional ownership purchased.",
        "Teile die Investitionssumme durch den erworbenen Anteilsbruchteil.",
        "Podziel kwotę inwestycji przez ułamek nabytego udziału w kapitale.",
      ),
    },
  ],
  askDad: T(
    "Ask your parent: Do they or their employer hold equity or stock options, and how does it work?",
    "Frage deine Eltern: Besitzen sie oder ihr Arbeitgeber Firmenanteile oder Mitarbeiteraktien und wie funktioniert das?",
    "Zapytaj rodziców: Czy oni lub ich pracodawca posiadają udziały lub opcje na akcje i jak to działa?",
  ),
  realLife: {
    title: T(
      "Real world: Tech startup cap tables and liquidity events",
      "Echte Welt: Beteiligungsstrukturen bei Start-ups und Boerseingaenge",
      "Prawdziwy świat: Struktura kapitałowa startupów i debiuty giełdowe",
    ),
    body: T(
      "Before going public, tech companies like Spotify, Airbnb, or Stripe go through multiple funding rounds (Seed, Series A, B, C). By tracking every option pool and preferred share class on a cap table, founders maintain corporate governance and plan for a future liquidity event like an acquisition or IPO.",
      "Vor dem Boersengang durchlaufen Technologieunternehmen wie Spotify oder Airbnb mehrere Finanzierungsrunden. Mit einer genauen Gesellschafterliste behalten Gruender die Kontrolle und bereiten den Boersengang vor.",
      "Przed wejściem na giełdę spółki technologiczne takie jak Spotify czy Airbnb przechodzą przez kolejne rundy finansowania. Dzięki dokładnej tabeli cap table założyciele zachowują kontrolę i przygotowują debiut na giełdzie.",
    ),
  },
  factCard: {
    claims: [
      { text: T("The National Venture Capital Association (NVCA) publishes model legal agreements for startup equity financing rounds.", "Die National Venture Capital Association (NVCA) veroeffentlicht Mustervertraege fuer Beteiligungsrunden.", "Amerykańskie stowarzyszenie NVCA publikuje wzorcowe umowy prawne dla rund finansowania udziałowego w startupach."), source: "https://nvca.org/model-legal-documents/" },
      { text: T("Post-money valuation is mathematically defined as investment amount divided by percentage equity acquired.", "Die Post-Money-Bewertung ist definiert als Investitionsbetrag geteilt durch den erworbenen Eigentumsanteil.", "Wycena post-money jest definiowana matematycznie jako kwota inwestycji podzielona przez nabyty udział procentowy."), source: "https://www.investopedia.com/terms/p/postmoneyvaluation.asp" },
      { text: T("The European Investment Fund (EIF) supports venture capital ecosystems across European Union member states.", "Der Europaeische Investitionsfonds (EIF) foerdert Risikokapitalmaerkte in der Europaeischen Union.", "Europejski Fundusz Inwestycyjny (EFI) wspiera rynki kapitału wysokiego ryzyka w krajach Unii Europejskiej."), source: "https://www.eif.org/what_we_do/equity/index.htm" },
      { text: T("Dilution occurs when a company issues additional stock, reducing the ownership percentage of existing shareholders.", "Verwaesserung tritt ein, wenn eine Firma neue Aktien ausgibt und damit den Anteil der Altaktionaere senkt.", "Rozwodnienie zachodzi, gdy spółka emituje dodatkowe akcje, zmniejszając udział dotychczasowych akcjonariuszy."), source: "https://www.sec.gov/oiea/investor-alerts-bulletins/ib_dilution" },
      { text: T("German corporate law (GmbHG / AktG) governs shareholder registries and capital increases.", "Das deutsche Gesellschaftsrecht (GmbHG und AktG) regelt Gesellschafterlisten und Kapitalerhoehungen.", "Niemieckie prawo spółek handlowych reguluje listy udziałowców oraz procedury podwyższania kapitału."), source: "https://www.gesetze-im-internet.de/gmbhg/" },
    ],
    simplified: [
      T(
        "Complex convertible instruments such as SAFEs and liquidation preferences are represented via direct priced equity rounds.",
        "Komplexe Wandeldarlehen (SAFEs) und Liquidationspraeferenzen werden als direkte bewertete Eigenkapitalrunden dargestellt.",
        "Złożone instrumenty dłużne zamienne na udziały (SAFE) i preferencje likwidacyjne uproszczono do bezpośrednich wycenionych rund kapitałowych.",
      ),
    ],
  },
};
