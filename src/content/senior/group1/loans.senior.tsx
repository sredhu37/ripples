import { useState } from "react";
import { animatedBeat } from "../../../lesson/toolkit";
import type { DiagramProps, Lesson, Text, ToyProps, WidgetProps } from "../../../lesson/types";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

/**
 * Beat 1: Meet Aarav. Wants to buy a $300 3D printer for custom phone cases, has $50 saved, cousin offers $250 loan at 10% interest.
 * Step 1: Aarav with $50 savings.
 * Step 2: $300 3D printer goal.
 * Step 3: Cousin loan offers $250 with 10% interest.
 */
function PrinterLoanDiagram({ lang, step }: DiagramProps) {
  const aaravName = lang === "pl" ? "Stanisław" : lang === "de" ? "Jonas" : "Aarav";
  const label = lang === "pl" ? "Stanisław pożycza na drukarkę 3D" : lang === "de" ? "Jonas nimmt Kredit fuer 3D-Drucker auf" : "Aarav taking a loan for 3D printer";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#f8fafc" stroke="#0284c7" strokeWidth="2" />

      {/* Aarav avatar */}
      <g>
        <circle cx="75" cy="110" r="28" fill="#f3cfa6" stroke="#23383f" strokeWidth="2" />
        <path d="M 47 105 C 47 70 103 70 103 105" fill="#1e293b" />
        <circle cx="67" cy="107" r="2.5" fill="#23383f" />
        <circle cx="83" cy="107" r="2.5" fill="#23383f" />
        <path d="M 71 119 Q 75 125 79 119" stroke="#23383f" strokeWidth="2" fill="none" />
        <path d="M 51 185 L 57 140 Q 75 135 93 140 L 99 185 Z" fill="#0284c7" stroke="#23383f" strokeWidth="2" />
        <text x="75" y="205" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0369a1">{aaravName}</text>
      </g>

      {/* Step 1: Aarav's initial savings */}
      <g>
        <rect x="125" y="40" width="110" height="50" rx="6" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
        <text x="180" y="60" textAnchor="middle" fontSize="13">💰</text>
        <text x="180" y="78" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0369a1">
          {lang === "pl" ? "Wkład: 200 zł" : lang === "de" ? "Gespart: 50 €" : "Savings: $50"}
        </text>
      </g>

      {/* Step 2: 3D Printer cost */}
      {step >= 2 && (
        <g>
          <rect x="255" y="40" width="125" height="75" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
          <text x="317" y="68" textAnchor="middle" fontSize="20">🖨️ 📐</text>
          <text x="317" y="88" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#15803d">
            {lang === "pl" ? "Drukarka 3D: 1 200 zł" : lang === "de" ? "3D-Drucker: 300 €" : "3D Printer: $300"}
          </text>
          <text x="317" y="103" textAnchor="middle" fontSize="9" fill="#166534">Productive Machine</text>
        </g>
      )}

      {/* Step 3: Cousin loan offer */}
      {step >= 3 && (
        <g>
          <rect x="125" y="130" width="255" height="75" rx="8" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
          <text x="252" y="152" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#92400e">
            {lang === "pl" ? "Pożyczka od kuzyna: 1 000 zł" : lang === "de" ? "Kredit vom Cousin: 250 €" : "Cousin Loan: $250 Principal"}
          </text>
          <text x="252" y="172" textAnchor="middle" fontSize="10.5" fill="#b45309">
            {lang === "pl" ? "+10% odsetek (100 zł) • Spłata w 2 miesiące" : lang === "de" ? "+10% Zinsen (25 €) • Rueckzahlung in 2 Monaten" : "+10% Interest ($25) • Repaid over 2 months"}
          </text>
          <text x="252" y="192" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#78350f">
            {lang === "pl" ? "Dźwignia pozwala kupić narzędzie już dziś!" : lang === "de" ? "Kredit ermoeglicht den Kauf sofort!" : "Leverage unlocks equipment right now!"}
          </text>
        </g>
      )}
    </svg>
  );
}

/**
 * Beat 2: Productive debt vs Consumptive debt.
 * Step 1: Productive debt: Buys asset that earns cash flow.
 * Step 2: Consumptive debt: Buys temporary item that produces $0.
 * Step 3: Math decides safety.
 */
function DebtClassificationDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Dług produktywny a dług konsumpcyjny" : lang === "de" ? "Produktive Schulden im Vergleich zu Konsumschulden" : "Productive debt vs consumptive debt";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#fafafa" stroke="#334155" strokeWidth="2" />

      {/* Step 1: Productive Debt */}
      <g>
        <rect x="35" y="40" width="155" height="150" rx="10" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />
        <rect x="45" y="50" width="135" height="24" rx="4" fill="#dcfce7" />
        <text x="112" y="66" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#15803d">
          {lang === "pl" ? "Dług Produktywny" : lang === "de" ? "Produktive Schulden" : "Productive Debt"}
        </text>
        <text x="112" y="105" textAnchor="middle" fontSize="22">🖨️ ⚙️ 📈</text>
        <text x="112" y="130" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#15803d">
          {lang === "pl" ? "Kupuje narzędzia" : lang === "de" ? "Kauft Werkzeuge" : "Buys Cash Machines"}
        </text>
        <rect x="45" y="145" width="135" height="30" rx="4" fill="#bbf7d0" />
        <text x="112" y="164" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#14532d">
          {lang === "pl" ? "Spłaca się sam!" : lang === "de" ? "Tilgt sich von selbst!" : "Pays for Itself!"}
        </text>
      </g>

      {/* Step 2: Consumptive Debt */}
      {step >= 2 && (
        <g>
          <rect x="210" y="40" width="155" height="150" rx="10" fill="#fff1f2" stroke="#ef4444" strokeWidth="2" />
          <rect x="220" y="50" width="135" height="24" rx="4" fill="#fee2e2" />
          <text x="287" y="66" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#b91c1c">
            {lang === "pl" ? "Dług Konsumpcyjny" : lang === "de" ? "Konsumschulden" : "Consumptive Debt"}
          </text>
          <text x="287" y="105" textAnchor="middle" fontSize="22">🎮 🍔 👟</text>
          <text x="287" y="130" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#dc2626">
            {lang === "pl" ? "Kupuje zachcianki" : lang === "de" ? "Kauft Luxus / Spass" : "Buys Zero-Income Items"}
          </text>
          <rect x="220" y="145" width="135" height="30" rx="4" fill="#fca5a5" />
          <text x="287" y="164" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#7f1d1d">
            {lang === "pl" ? "Czyste obciążenie" : lang === "de" ? "Reine Belastung" : "Zero ROI Drain"}
          </text>
        </g>
      )}

      {/* Step 3: Math banner */}
      {step >= 3 && (
        <g>
          <rect x="60" y="16" width="280" height="22" rx="4" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1" />
          <text x="200" y="31" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#6d28d9">
            {lang === "pl" ? "Czy zysk z inwestycji przewyższy koszt odsetek?" : lang === "de" ? "Uebersteigt der Ertrag die Zinskosten?" : "Does asset cash flow exceed interest cost?"}
          </text>
        </g>
      )}
    </svg>
  );
}

/**
 * Beat 3: Phone stands sell for $15, loan repaid in 2 months with interest.
 * Step 1: 3D printer operating: turning plastic into $15 phone stands.
 * Step 2: Customer orders flood in.
 * Step 3: Loan + $25 interest fully repaid; Aarav owns the machine free and clear!
 */
function LoanRepaymentSuccessDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Spłata pożyczki z zysków i własność maszyny" : lang === "de" ? "Darlehenstilgung aus Gewinnen und freies Eigentum" : "Loan repayment from earnings and full ownership";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />

      {/* Step 1: Production */}
      <g>
        <rect x="35" y="35" width="105" height="80" rx="8" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
        <text x="87" y="60" textAnchor="middle" fontSize="20">📱✨</text>
        <text x="87" y="80" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0369a1">
          {lang === "pl" ? "Stojaki na telefon" : lang === "de" ? "Handyhalter" : "Phone Stands"}
        </text>
        <text x="87" y="98" textAnchor="middle" fontSize="10" fill="#0284c7">$15 / each</text>
      </g>

      {/* Step 2: Strong Sales */}
      {step >= 2 && (
        <g>
          <path d="M 145 75 L 185 75" stroke="#16a34a" strokeWidth="3" markerEnd="url(#arrow)" />
          <rect x="190" y="35" width="175" height="80" rx="8" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
          <text x="277" y="60" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#15803d">
            {lang === "pl" ? "Zyski ze sprzedaży" : lang === "de" ? "Verkaufsgewinne" : "Strong Cash Flow"}
          </text>
          <text x="277" y="80" textAnchor="middle" fontSize="10.5" fill="#166534">
            {lang === "pl" ? "30 sprzedanych sztuk = 1 800 zł" : lang === "de" ? "30 Stueck verkauft = 450 €" : "30 stands sold = $450 revenue"}
          </text>
          <text x="277" y="98" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#14532d">
            {lang === "pl" ? "Wystarcza na spłatę i zysk!" : lang === "de" ? "Deckt Tilgung & Zins locker!" : "Comfortably covers repayment!"}
          </text>
        </g>
      )}

      {/* Step 3: Full Debt Free Ownership */}
      {step >= 3 && (
        <g>
          <rect x="35" y="135" width="330" height="75" rx="10" fill="#ffffff" stroke="#16a34a" strokeWidth="2" />
          <text x="60" y="162" fontSize="13" fontWeight="bold" fill="#15803d">
            {lang === "pl" ? "✅ Kredyt 1 000 zł + 100 zł odsetek spłacone w całości!" : lang === "de" ? "✅ Kredit 250 € + 25 € Zinsen komplett getilgt!" : "✅ $250 Loan + $25 Interest Paid in Full!"}
          </text>
          <text x="60" y="185" fontSize="11" fill="#166534">
            {lang === "pl" ? "Drukarka 3D należy w 100% do niego i przynosi czysty zysk" : lang === "de" ? "Drucker gehoert ihm nun schuldenfrei und druckt puren Gewinn" : "Aarav now owns an income-producing asset 100% debt free"}
          </text>
          <text x="340" y="175" textAnchor="end" fontSize="20">🏆</text>
        </g>
      )}
    </svg>
  );
}

/**
 * Beat 4: Sneaker debt horror: What if he borrowed $250 for limited sneakers?
 * Step 1: Borrowing for luxury sneakers ($250).
 * Step 2: Rain scuffs shoes, value collapses to $50.
 * Step 3: Stuck doing months of boring chores just to service debt on ruined shoes.
 */
function SneakerDebtTrapDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Pułapka kredytu na drogie buty konsumpcyjne" : lang === "de" ? "Die Schuldenfalle durch Konsumkaeufe" : "Consumer debt trap on non-productive items";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#fff1f2" stroke="#e11d48" strokeWidth="2" />

      {/* Step 1: Designer Sneakers */}
      <g>
        <rect x="35" y="35" width="105" height="80" rx="8" fill="#ffe4e6" stroke="#f43f5e" strokeWidth="1.5" />
        <text x="87" y="60" textAnchor="middle" fontSize="20">👟</text>
        <text x="87" y="80" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#9f1239">
          {lang === "pl" ? "Modne buty" : lang === "de" ? "Designer Sneaker" : "Designer Shoes"}
        </text>
        <text x="87" y="98" textAnchor="middle" fontSize="9.5" fill="#be123c">Kredyt: $250</text>
      </g>

      {/* Step 2: Ruined and Depreciated */}
      {step >= 2 && (
        <g>
          <path d="M 145 75 L 185 75" stroke="#e11d48" strokeWidth="3" markerEnd="url(#arrow)" />
          <rect x="190" y="35" width="175" height="80" rx="8" fill="#fff" stroke="#f43f5e" strokeWidth="1.5" />
          <text x="277" y="58" textAnchor="middle" fontSize="14">🌧️ 💥 📉</text>
          <text x="277" y="78" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#9f1239">
            {lang === "pl" ? "Błoto, zniszczenie i spadek wartości" : lang === "de" ? "Dreck, Kratzer und Wertverlust" : "Zero Income & Worn Out"}
          </text>
          <text x="277" y="96" textAnchor="middle" fontSize="10" fill="#be123c">
            {lang === "pl" ? "Przychód: 0 zł" : lang === "de" ? "Ertrag: 0 €" : "Earns exactly $0"}
          </text>
        </g>
      )}

      {/* Step 3: Debt Trap Chores */}
      {step >= 3 && (
        <g>
          <rect x="35" y="135" width="330" height="75" rx="10" fill="#881337" />
          <text x="60" y="162" fontSize="13" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "⛓️ Niewolnik długu: Miesiące nudnych prac" : lang === "de" ? "⛓️ Schuldenfalle: Monate muehsamer Pflichten" : "⛓️ Debt Trap: Months of tedious chores"}
          </text>
          <text x="60" y="185" fontSize="10.5" fill="#fecdd3">
            {lang === "pl" ? "Musisz harować, by spłacić odsetki od rzeczy, która już dawno straciła urok" : lang === "de" ? "Muehsam arbeiten, nur um Zinsen fuer alte Schuhe abzubezahlen" : "Working grueling chores just to pay interest on shoes rotting in the closet"}
          </text>
        </g>
      )}
    </svg>
  );
}

/**
 * Beat 5: High voltage electricity: dangerous carelessly, super powerful with math.
 * Step 1: Debt is like high voltage.
 * Step 2: Careless borrowing causes shocks.
 * Step 3: Engineered math powers massive growth.
 */
function HighVoltageLeverageDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Dług jak wysokie napięcie: potężny z matematyką" : lang === "de" ? "Schulden wie Hochspannung: stark mit klugem Plan" : "Debt like high voltage electricity";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#faf5ff" stroke="#7e22ce" strokeWidth="2" />

      {/* Center High Voltage Icon */}
      <circle cx="200" cy="80" r="32" fill="#ede9fe" stroke="#9333ea" strokeWidth="2" />
      <text x="200" y="88" textAnchor="middle" fontSize="24">⚡</text>

      {/* Step 1: Warning header */}
      <g>
        <rect x="50" y="18" width="300" height="26" rx="6" fill="#f3e8ff" stroke="#9333ea" strokeWidth="1" />
        <text x="200" y="35" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#6b21a8">
          {lang === "pl" ? "Kredyt = Wysokie napięcie ⚡" : lang === "de" ? "Kredit = Hochspannung ⚡" : "Debt = High-Voltage Electricity ⚡"}
        </text>
      </g>

      {/* Step 2: Without Math vs With Math */}
      {step >= 2 && (
        <g>
          <rect x="35" y="125" width="155" height="40" rx="6" fill="#fee2e2" stroke="#dc2626" strokeWidth="1" />
          <text x="112" y="145" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#991b1b">
            {lang === "pl" ? "Bez planu: Porażenie 💥" : lang === "de" ? "Ohne Plan: Stromschlag 💥" : "Without Math: Shock 💥"}
          </text>
          <text x="112" y="158" textAnchor="middle" fontSize="9" fill="#b91c1c">Debt spiral</text>

          <rect x="210" y="125" width="155" height="40" rx="6" fill="#dcfce7" stroke="#16a34a" strokeWidth="1" />
          <text x="287" y="145" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#15803d">
            {lang === "pl" ? "Z matematyką: Napęd 🚀" : lang === "de" ? "Mit Plan: Turbostart 🚀" : "With Math: Rocket 🚀"}
          </text>
          <text x="287" y="158" textAnchor="middle" fontSize="9" fill="#166534">Productive leverage</text>
        </g>
      )}

      {/* Step 3: Golden rule */}
      {step >= 3 && (
        <g>
          <rect x="35" y="180" width="330" height="40" rx="8" fill="#581c87" />
          <text x="200" y="198" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Zawsze pytaj: czy to narzędzie samo spłaci ten dług?" : lang === "de" ? "Frage immer: Kauft das Darlehen ein Werkzeug, das sich bezahlt?" : "Always ask: Does this loan buy a tool that pays for itself?"}
          </text>
          <text x="200" y="212" textAnchor="middle" fontSize="9.5" fill="#e9d5ff">
            {lang === "pl" ? "W ten sposób budowniczowie tworzą wspaniałe rzeczy" : lang === "de" ? "So bauen Macher grosse Dinge ohne jahrzehntelanges Warten" : "That is how smart builders scale without waiting decades"}
          </text>
        </g>
      )}
    </svg>
  );
}

function Toy({ onDone }: ToyProps) {
  const [leverage, setLeverage] = useState(1);

  const capital = 10000;
  const totalAssets = capital * leverage;
  const debt = totalAssets - capital;
  const returnOnAssets = totalAssets * 0.15;
  const interestCost = debt * 0.06;
  const netEarnings = returnOnAssets - interestCost;
  const returnOnEquity = Math.round((netEarnings / capital) * 100);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "center" }}>
      <p style={{ margin: 0, fontWeight: 700, fontSize: "1rem" }}>
        Leverage: {leverage}x | Debt: ${debt.toLocaleString()} | Return on Capital: {returnOnEquity}%
      </p>
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          type="button"
          className="btn"
          onClick={() => {
            setLeverage((l) => {
              const next = Math.min(4, l + 1);
              if (next >= 3) onDone?.();
              return next;
            });
          }}
        >
          Increase Leverage (+1x)
        </button>
        <button
          type="button"
          className="btn btn-quiet"
          onClick={() => setLeverage(1)}
        >
          Reset to 1x (No Debt)
        </button>
      </div>
      <div style={{ padding: "12px", background: leverage > 2 ? "#fff9db" : "#eef8ef", borderRadius: "10px", width: "100%", textAlign: "center" }}>
        {leverage > 2 ? "High leverage amplifies gains when things go well, but magnifies downside risk during downturns!" : "Prudent balance: Debt service is comfortably covered by earnings."}
      </div>
    </div>
  );
}

function LoanWidget({ onAnswer }: WidgetProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
      <p style={{ margin: 0 }}>What defines productive leverage compared to bad debt?</p>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>Borrowing at 25% APR for designer clothes</button>
      <button type="button" className="btn" onClick={() => onAnswer(true)}>Borrowing to acquire productive assets whose cash flow exceeds the debt cost</button>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>Never repaying borrowed funds</button>
    </div>
  );
}

export const lesson: Lesson = {
  id: "loans",
  story: [
    animatedBeat(
      [
        T("Meet Aarav. He has an ambitious plan to print custom gaming phone cases and desk stands for classmates.", "Das ist Jonas. Er will fuer Mitschueler coole Smartphone-Hüllen und Headset-Halter drucken.", "Poznaj Stanisława. Ma ambitny plan: chce drukować etui na telefony i stojaki na słuchawki dla znajomych ze szkoły."),
        T("A professional 3D printer costs three hundred dollars, but Aarav only has fifty dollars in savings.", "Ein professioneller 3D-Drucker kostet 300 Euro, aber Jonas hat nur 50 Euro gespart.", "Profesjonalna drukarka 3D kosztuje tysiąc dwieście złotych, ale Stanisław ma tylko dwieście złotych oszczędności."),
        T("His older cousin agrees to lend him the remaining two hundred and fifty dollars as a *loan* with ten percent *interest*.", "Sein aelterer Cousin leiht ihm 250 Euro als *Kredit* mit zehn Prozent *Zinsen*.", "Jego starszy kuzyn zgadza się pożyczyć mu brakujący tysiąc złotych jako *kredyt* na 10 procent *odsetek*."),
      ],
      PrinterLoanDiagram,
    ),
    animatedBeat(
      [
        T("Economists divide borrowing into two very different categories: *productive debt* and *consumptive debt*.", "Oekonomen teilen Kredite in zwei Gruppen: *produktive Schulden* und *Konsumschulden*.", "Ekonomiści dzielą pożyczki na dwie zupełnie różne grupy: *dług produktywny* i *dług konsumpcyjny*."),
        T("Productive debt buys tools or equipment that generate new money to pay back the loan automatically.", "Produktive Schulden kaufen Werkzeuge, die neues Geld verdienen und den Kredit von selbst tilgen.", "Dług produktywny kupuje narzędzia lub sprzęt, które zarabiają na własną spłatę."),
        T("Consumptive debt buys stuff that immediately loses value: video game loot boxes, takeout food, or clothes.", "Konsumschulden finanzieren Dinge ohne Ertrag: In-Game-Skins, Fast Food oder teure Kleidung.", "Dług konsumpcyjny kupuje rzeczy, które natychmiast tracą wartość: skórki w grach, fast food czy drogie ciuchy."),
      ],
      DebtClassificationDiagram,
    ),
    animatedBeat(
      [
        T("Aarav printer turns cheap plastic spools into beautiful phone stands that sell for fifteen dollars each.", "Jonas Drucker verwandelt guenstigen Kunststoff in tolle Halter, die er fuer 15 Euro verkauft.", "Drukarka Stanisława zamienia tani filament w designerskie stojaki, które sprzedaje po sześćdziesiąt złotych."),
        T("Within two months, he earns enough profit to pay back the entire loan plus the twenty-five dollar interest fee.", "In zwei Monaten verdient er genug Gewinn, um den Kredit samt 25 Euro Zinsen komplett abzuzahlen.", "W dwa miesiące zarabia tyle, że bez trudu spłaca cały dług wraz ze stu złotymi odsetek."),
        T("Now he owns a valuable, income-producing 3D printer completely free and clear.", "Jetzt gehoert ihm der 3D-Drucker komplett selbst und bringt ihm weiter Geld ein.", "Teraz drukarka 3D należy całkowicie do niego i przynosi mu czysty zysk każdego tygodnia."),
      ],
      LoanRepaymentSuccessDiagram,
    ),
    animatedBeat(
      [
        T("Now imagine if Aarav had borrowed two hundred and fifty dollars just to buy rare limited designer sneakers.", "Stell dir vor, Jonas haette das Geld geliehen, nur um sich teure Designer-Sneaker zu kaufen.", "A teraz wyobraź sobie, że Stanisław pożyczył te pieniądze tylko po to, by kupić modne buty z limitowanej edycji."),
        T("The sneakers produce zero income, get scuffed in the rain, and lose half their value in a month.", "Die Schuhe bringen keinen Cent ein, bekommen Flecken und verlieren sofort ihren Wert.", "Buty nie zarabiają ani grosza, brudzą się na deszczu i po miesiącu nikt ich drogo nie odkupi."),
        T("He would be stuck working boring chores for months just to pay off shoes that sit in his closet.", "Er muesste monatelang muehsam Rasen maehen, nur um Zinsen fuer alte Schuhe abzubezahlen.", "Musiałby tygodniami wykonywać nudne prace domowe tylko po to, by spłacić odsetki od butów stojących w szafie."),
      ],
      SneakerDebtTrapDiagram,
    ),
    animatedBeat(
      [
        T("Smart creators treat debt like high-voltage electricity: dangerous when used carelessly, but super powerful when engineered with math.", "Kluge Macher nutzen Kredite wie Strom: gefaehrlich bei Unachtsamkeit, genial bei durchdachtem Plan.", "Mądrzy ludzie traktują dług jak prąd wysokiego napięcia: niebezpieczny przy braku wiedzy, lecz potężny w rękach inżyniera."),
        T("Always ask: will this loan buy a productive tool that pays for itself, or just a temporary thrill?", "Frage dich immer: Kauft dieser Kredit ein Werkzeug, das sich bezahlt, oder nur kurzen Spass?", "Zawsze pytaj siebie: czy ten kredyt kupuje narzędzie, które zarobi na siebie, czy tylko chwilową zachciankę?"),
        T("Mastering the math of debt is how builders launch great ventures without waiting decades.", "Wer Schulden klug rechnet, kann grossartige Projekte starten, ohne Jahrzehnte zu warten.", "Kto rozumie matematykę długu, potrafi budować wielkie przedsięwzięcia bez czekania całymi latami."),
      ],
      HighVoltageLeverageDiagram,
    ),
  ],
  toyIntro: T(
    "Experiment with leverage ratios and observe how debt magnifies capital returns and risks.",
    "Experimentiere mit dem Verschuldungsgrad und beobachte, wie Fremdkapital Rendite und Risiko hebelt.",
    "Poeksperymentuj ze wskaźnikami dźwigni i zobacz, jak dług zwielokrotnia zyski oraz ryzyko.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "What is the definition of the loan principal?",
        "Was ist die Definition der Kreditsumme (Tilgungsstamm)?",
        "Jaka jest definicja kapitału głównego pożyczki (principal)?",
      ),
      options: [
        { text: T("The original amount of money borrowed before interest charges", "Der urspruenglich geliehene Geldbetrag vor Anfall von Zinsen", "Pierwotna pożyczona kwota pieniędzy przed naliczeniem odsetek"), correct: true },
        { text: T("The monthly penalty fee charged by the bank", "Die monatliche Mahngebuehr der Bank", "Miesięczna opłata karna naliczana przez bank") },
        { text: T("The total tax paid to the local government", "Die gesamte an die Gemeinde gezahlte Steuer", "Całkowity podatek zapłacony władzom lokalnym") },
      ],
      hint: T(
        "It is the baseline sum you received on day one.",
        "Es ist die Basissumme, die du am ersten Tag erhalten hast.",
        "To bazowa suma, którą otrzymałeś w pierwszym dniu umowy.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "Why is financial leverage described as a double-edged sword?",
        "Warum wird der finanzielle Hebel als zweischneidiges Schwert bezeichnet?",
        "Dlaczego dźwignia finansowa jest nazywana mieczem obosiecznym?",
      ),
      options: [
        { text: T("It amplifies both potential percentage gains and potential catastrophic losses", "Es verstaerkt sowohl prozentuale Gewinne als auch verheerende Verluste", "Powiększa zarówno potencjalne zyski procentowe, jak i dotkliwe straty"), correct: true },
        { text: T("It is manufactured from polished titanium and steel", "Es wird aus poliertem Titan und Stahl geschmiedet", "Jest produkowana z polerowanego tytanu i stali") },
        { text: T("It cuts tax payments exactly in half", "Es halbiert die Steuerzahlungen exakt", "Obcina płatności podatkowe dokładnie o połowę") },
      ],
      hint: T(
        "Debt magnifies results in both positive and negative directions.",
        "Schulden verstaerken Ergebnisse sowohl nach oben als auch nach unten.",
        "Dług zwielokrotnia wyniki zarówno na korzyść, jak i na niekorzyść.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Identify what distinguishes productive leverage from consumer borrowing.",
        "Waehle aus, was produktiven Hebel von reinem Konsumkredit unterscheidet.",
        "Wskaż, co odróżnia dźwignię produktywną od pożyczki konsumpcyjnej.",
      ),
      Widget: LoanWidget,
      hint: T(
        "The asset must generate returns exceeding the cost of capital.",
        "Der Vermoegenswert muss Ertraege ueber den Kapitalkosten abwerfen.",
        "Aktywo musi przynosić dochody przewyższające koszt kapitału.",
      ),
    },
  ],
  askDad: T(
    "Ask your parent: What is the difference between a fixed-rate mortgage and a variable-rate loan?",
    "Frage deine Eltern: Was ist der Unterschied zwischen einem Festzinsdarlehen und einem variablen Kredit?",
    "Zapytaj rodziców: Jaka jest różnica między kredytem hipotecznym o stałym a zmiennym oprocentowaniu?",
  ),
  realLife: {
    title: T(
      "Real world: Corporate bonds and credit rating agencies",
      "Echte Welt: Unternehmensanleihen und Ratingagenturen",
      "Prawdziwy świat: Obligacje korporacyjne i agencje ratingowe",
    ),
    body: T(
      "Global corporations borrow billions of dollars by issuing debt bonds. Credit rating agencies (like Moody's, S&P, and Fitch) evaluate the borrower's default risk, assigning credit grades from AAA (ultra-safe) down to junk status, which dictates the interest rate the company must pay to investors.",
      "Globale Konzerne leihen Milliarden ueber Unternehmensanleihen. Ratingagenturen bewerten das Ausfallrisiko und vergeben Noten von AAA bis Ramsch-Status, was die Hoehe der Zinsen bestimmt.",
      "Globalne korporacje pożyczają miliardy, emitując obligacje. Agencje ratingowe oceniają ryzyko niewypłacalności i przyznają oceny od AAA do poziomu spekulacyjnego, co decyduje o wysokości płaconych odsetek.",
    ),
  },
  factCard: {
    claims: [
      { text: T("The World Bank tracks global sovereign and corporate debt levels to monitor systemic financial stability.", "Die Weltbank erfasst weltweite Staats- und Unternehmensschulden zur Ueberwachung der Stabilitaet.", "Bank Światowy monitoruje globalne zadłużenie publiczne i przedsiębiorstw w celu oceny stabilności finansowej."), source: "https://www.worldbank.org/en/topic/debt" },
      { text: T("Amortization schedules outline the division of each debt payment between interest and principal reduction.", "Tilgungsplaene stellen die Aufteilung jeder Kreditrate in Zins und Tilgungsanteil dar.", "Plany amortyzacji rozpisują podział każdej raty kredytowej na odsetki i spłatę kapitału."), source: "https://www.consumerfinance.gov/ask-cfpb/what-is-an-amortization-schedule-en-193/" },
      { text: T("Deutsche Bundesbank reports on credit standards and collateral requirements in European lending operations.", "Die Deutsche Bundesbank berichtet ueber Kreditrichtlinien und Besicherungsstandards im europaeischen Bankengeschaeft.", "Niemiecki Bank Federalny (Bundesbank) raportuje o standardach kredytowych i wymogach dotyczących zabezpieczeń w Europie."), source: "https://www.bundesbank.de/en/tasks/monetary-policy/bank-lending-survey" },
      { text: T("The International Monetary Fund (IMF) analyzes financial leverage and debt sustainability across world economies.", "Der Internationale Waehrungsfonds (IWF) analysiert Verschuldungsgrade und Schuldentragfaehigkeit weltweit.", "Międzynarodowy Fundusz Walutowy (MFW) analizuje poziom dźwigni finansowej i stabilność zadłużenia w gospodarkach świata."), source: "https://www.imf.org/en/Publications/GFSR" },
      { text: T("Default risk represents the probability that a borrower fails to meet contractual principal and interest commitments.", "Ausfallrisiko beschreibt die Wahrscheinlichkeit, dass ein Schuldner Zins- und Tilgungspflichten nicht erfuellt.", "Ryzyko niewypłacalności oznacza prawdopodobieństwo, że pożyczkobiorca nie wywiąże się z umownych zobowiązań odsetkowych i kapitałowych."), source: "https://www.britannica.com/money/default-risk" },
    ],
    simplified: [
      T(
        "Complex debt covenants, subordinated tranches, and cross-default clauses are modeled through fundamental loan leverage mechanics.",
        "Komplexe Kreditvereinbarungen und nachrangige Tranchen werden ueber grundlegende Hebelmechaniken abgebildet.",
        "Złożone klauzule kredytowe i transze długu podporządkowanego uproszczono do fundamentalnych mechanizmów dźwigni finansowej.",
      ),
    ],
  },
};
