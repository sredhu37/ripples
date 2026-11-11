import { useState } from "react";
import { animatedBeat } from "../../../lesson/toolkit";
import type { DiagramProps, Lesson, Text, ToyProps, WidgetProps } from "../../../lesson/types";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

/**
 * Beat 1: Meet Aarav. Develops an AI coding assistant app for high school robotics clubs.
 * Step 1: Aarav at his desk coding the robotics software.
 * Step 2: Creates a software product: copy costs almost zero to distribute ($0 marginal cost).
 * Step 3: School robotics teams across three states sign up for subscriptions.
 */
function SoftwareLaunchDiagram({ lang, step }: DiagramProps) {
  const aaravName = lang === "pl" ? "Adam" : lang === "de" ? "Arne" : "Aarav";
  const label =
    lang === "pl"
      ? "Adam tworzy oprogramowanie dla kół robotyki"
      : lang === "de"
        ? "Arne entwickelt Software fuer Robotik-Clubs"
        : "Aarav developing coding assistant software";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect
        x="10"
        y="10"
        width="380"
        height="220"
        rx="14"
        fill="#0f172a"
        stroke="#38bdf8"
        strokeWidth="2"
      />

      {/* Aarav avatar */}
      <g>
        <circle cx="80" cy="110" r="28" fill="#f3cfa6" stroke="#38bdf8" strokeWidth="2" />
        <path d="M 52 105 C 52 70 108 70 108 105" fill="#1e293b" />
        <circle cx="72" cy="107" r="2.5" fill="#0f172a" />
        <circle cx="88" cy="107" r="2.5" fill="#0f172a" />
        <path d="M 76 119 Q 80 125 84 119" stroke="#0f172a" strokeWidth="2" fill="none" />
        <path
          d="M 56 185 L 62 140 Q 80 135 98 140 L 104 185 Z"
          fill="#0284c7"
          stroke="#38bdf8"
          strokeWidth="2"
        />
        <text x="80" y="205" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#38bdf8">
          {aaravName}
        </text>
      </g>

      {/* App Badge */}
      <g>
        <rect
          x="135"
          y="35"
          width="230"
          height="32"
          rx="6"
          fill="#1e293b"
          stroke="#38bdf8"
          strokeWidth="1.5"
        />
        <text x="250" y="55" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#bae6fd">
          💻{" "}
          {lang === "pl"
            ? "Asystent Kodu dla Robotyki"
            : lang === "de"
              ? "Coding-Assistent fuer Robotik"
              : "RoboPilot Code Assistant"}
        </text>
      </g>

      {/* Step 2: Digital Asset Zero Marginal Cost */}
      {step >= 2 && (
        <g>
          <rect
            x="135"
            y="80"
            width="230"
            height="52"
            rx="8"
            fill="#1e293b"
            stroke="#0284c7"
            strokeWidth="1.5"
          />
          <text x="250" y="102" textAnchor="middle" fontSize="18">
            💾 ⚡ ☁️
          </text>
          <text
            x="250"
            y="122"
            textAnchor="middle"
            fontSize="10.5"
            fontWeight="bold"
            fill="#7dd3fc"
          >
            {lang === "pl"
              ? "Koszt dystrybucji kopii: 0 zł"
              : lang === "de"
                ? "Grenzkosten je Kopie: fast 0 €"
                : "Marginal cost per copy: near $0"}
          </text>
        </g>
      )}

      {/* Step 3: Multi-State School Clubs */}
      {step >= 3 && (
        <g>
          <rect x="135" y="145" width="230" height="60" rx="8" fill="#0369a1" />
          <text x="250" y="170" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#ffffff">
            {lang === "pl"
              ? "Kluby robotyki kupują subskrypcje!"
              : lang === "de"
                ? "Schulteams abonnieren die Software!"
                : "Robotics Clubs Sign Up!"}
          </text>
          <text x="250" y="190" textAnchor="middle" fontSize="10.5" fill="#e0f2fe">
            {lang === "pl"
              ? "100 zł / msc za licencję szkolną"
              : lang === "de"
                ? "25 € / Monat je Schullizenz"
                : "$25 / month per school club"}
          </text>
        </g>
      )}
    </svg>
  );
}

/**
 * Beat 2: Business Models: One-Time Sales vs SaaS Recurring Revenue.
 * Step 1: Traditional one-time sale ($100 once) starts from zero every month.
 * Step 2: Subscription recurring revenue ($25/mo) accumulates and compounds.
 * Step 3: Predictable monthly recurring revenue (MRR) changes everything!
 */
function BusinessModelsDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Modele biznesowe: sprzedaż jednorazowa a subskrypcja SaaS"
      : lang === "de"
        ? "Geschaeftsmodelle: Einmalkauf versus Abo-Modell (SaaS)"
        : "Business models: one-time sales vs recurring subscriptions";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect
        x="10"
        y="10"
        width="380"
        height="220"
        rx="14"
        fill="#f8fafc"
        stroke="#334155"
        strokeWidth="2"
      />

      {/* Model A: One-off */}
      <g>
        <rect
          x="35"
          y="40"
          width="150"
          height="135"
          rx="8"
          fill="#f1f5f9"
          stroke="#64748b"
          strokeWidth="1.5"
        />
        <text x="110" y="65" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#334155">
          {lang === "pl" ? "Sprzedaż Jednorazowa" : lang === "de" ? "Einmalkauf" : "One-Time Sale"}
        </text>
        <text x="110" y="95" textAnchor="middle" fontSize="22">
          🛒 ⏹️
        </text>
        <text x="110" y="125" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#475569">
          $100 once
        </text>
        <rect x="45" y="135" width="130" height="30" rx="4" fill="#e2e8f0" />
        <text x="110" y="154" textAnchor="middle" fontSize="9.5" fill="#334155">
          {lang === "pl"
            ? "Każdy miesiąc od zera"
            : lang === "de"
              ? "Jeder Monat beginnt bei 0"
              : "Start from zero every month"}
        </text>
      </g>

      {/* Step 2: Model B: SaaS */}
      {step >= 2 && (
        <g>
          <rect
            x="215"
            y="40"
            width="150"
            height="135"
            rx="8"
            fill="#ecfdf5"
            stroke="#059669"
            strokeWidth="2"
          />
          <text x="290" y="65" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#065f46">
            {lang === "pl"
              ? "Abonament (SaaS)"
              : lang === "de"
                ? "Abonnement (SaaS)"
                : "Recurring SaaS"}
          </text>
          <text x="290" y="95" textAnchor="middle" fontSize="22">
            🔄 📈
          </text>
          <text
            x="290"
            y="125"
            textAnchor="middle"
            fontSize="10.5"
            fontWeight="bold"
            fill="#047857"
          >
            $25 / month
          </text>
          <rect x="225" y="135" width="130" height="30" rx="4" fill="#a7f3d0" />
          <text x="290" y="154" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#065f46">
            {lang === "pl"
              ? "Przychód kumuluje się"
              : lang === "de"
                ? "Umsatz stapelt sich"
                : "Compounding MRR"}
          </text>
        </g>
      )}

      {/* Step 3: Stability Banner */}
      {step >= 3 && (
        <g>
          <rect x="40" y="190" width="320" height="28" rx="6" fill="#0f766e" />
          <text
            x="200"
            y="208"
            textAnchor="middle"
            fontSize="10.5"
            fontWeight="bold"
            fill="#ffffff"
          >
            {lang === "pl"
              ? "Przewidywalny przychód cykliczny pozwala planować i zatrudniać"
              : lang === "de"
                ? "Wiederkehrende Einnahmen bieten Planungssicherheit"
                : "Predictable recurring revenue creates stable foundations"}
          </text>
        </g>
      )}
    </svg>
  );
}

/**
 * Beat 3: Customer Acquisition Cost (CAC) vs Lifetime Value (LTV).
 * Step 1: Spending $50 on online ads to acquire one school club (CAC = $50).
 * Step 2: The school stays subscribed for 24 months paying $25/mo (LTV = $600).
 * Step 3: LTV:CAC ratio is 12:1 (a phenomenal business engine!).
 */
function UnitEconomicsCacLtvDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Relacja LTV do CAC w modelu biznesowym"
      : lang === "de"
        ? "LTV zu CAC Verhaeltnis im Geschaeftsmodell"
        : "Customer Acquisition Cost vs Lifetime Value";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect
        x="10"
        y="10"
        width="380"
        height="220"
        rx="14"
        fill="#f0fdf4"
        stroke="#16a34a"
        strokeWidth="2"
      />

      {/* CAC block */}
      <g>
        <rect
          x="35"
          y="35"
          width="155"
          height="150"
          rx="8"
          fill="#fee2e2"
          stroke="#ef4444"
          strokeWidth="2"
        />
        <text x="112" y="60" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#b91c1c">
          {lang === "pl"
            ? "Koszt Pozyskania (CAC)"
            : lang === "de"
              ? "Akquisekosten (CAC)"
              : "Customer Acquisition (CAC)"}
        </text>
        <text x="112" y="90" textAnchor="middle" fontSize="22">
          📢 🎯
        </text>
        <text x="112" y="115" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#991b1b">
          $50
        </text>
        <text x="112" y="132" textAnchor="middle" fontSize="9.5" fill="#7f1d1d">
          {lang === "pl"
            ? "Reklama i kontakt ze szkołą"
            : lang === "de"
              ? "Schulwerbung & Vorfuehrung"
              : "Ad spend & demo call"}
        </text>
        <rect x="45" y="145" width="135" height="26" rx="4" fill="#fecdd3" />
        <text x="112" y="162" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#991b1b">
          Upfront Cash Outflow
        </text>
      </g>

      {/* Step 2: LTV block */}
      {step >= 2 && (
        <g>
          <rect
            x="210"
            y="35"
            width="155"
            height="150"
            rx="8"
            fill="#dcfce7"
            stroke="#16a34a"
            strokeWidth="2"
          />
          <text x="287" y="60" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#15803d">
            {lang === "pl"
              ? "Wartość Życiowa (LTV)"
              : lang === "de"
                ? "Kundenwert (LTV)"
                : "Lifetime Value (LTV)"}
          </text>
          <text x="287" y="90" textAnchor="middle" fontSize="22">
            🏆 💰
          </text>
          <text x="287" y="115" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#14532d">
            $600
          </text>
          <text x="287" y="132" textAnchor="middle" fontSize="9.5" fill="#166534">
            {lang === "pl"
              ? "24 miesiące × 25 $"
              : lang === "de"
                ? "24 Monate × 25 €"
                : "24 months × $25/mo"}
          </text>
          <rect x="220" y="145" width="135" height="26" rx="4" fill="#bbf7d0" />
          <text x="287" y="162" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#14532d">
            12x Return on CAC!
          </text>
        </g>
      )}

      {/* Step 3: Golden Rule */}
      {step >= 3 && (
        <g>
          <rect x="40" y="196" width="320" height="24" rx="4" fill="#15803d" />
          <text
            x="200"
            y="212"
            textAnchor="middle"
            fontSize="10.5"
            fontWeight="bold"
            fill="#ffffff"
          >
            {lang === "pl"
              ? "Gdy LTV znacznie przewyższa CAC, firma rośnie bezpiecznie"
              : lang === "de"
                ? "Wenn LTV weit hoeher als CAC ist, waechst die Firma gesund"
                : "When LTV is 3x to 5x CAC, every customer fuels profitable scale"}
          </text>
        </g>
      )}
    </svg>
  );
}

/**
 * Beat 4: Value Creation vs Value Capture.
 * Step 1: The software saves each school team 100 hours of debugging ($2,000 value created).
 * Step 2: Aarav charges $300 a year for the subscription (value captured).
 * Step 3: Both parties win: the school saves $1,700, and Aarav earns a thriving profit.
 */
function ValueCreationDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Tworzenie wartości a przechwytywanie wartości"
      : lang === "de"
        ? "Wertschoepfung und Wertschoepfungsanteil"
        : "Value creation vs value capture";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect
        x="10"
        y="10"
        width="380"
        height="220"
        rx="14"
        fill="#fffbeb"
        stroke="#d97706"
        strokeWidth="2"
      />

      {/* Value Created: $2,000 */}
      <g>
        <rect
          x="35"
          y="40"
          width="330"
          height="50"
          rx="8"
          fill="#dbeafe"
          stroke="#2563eb"
          strokeWidth="2"
        />
        <text x="55" y="65" fontSize="12" fontWeight="bold" fill="#1e40af">
          {lang === "pl"
            ? "Wytworzona Wartość dla Klienta: 8 000 zł"
            : lang === "de"
              ? "Geschaffener Wert fuer die Schule: 2.000 €"
              : "Total Value Created: $2,000"}
        </text>
        <text x="55" y="80" fontSize="10" fill="#1d4ed8">
          {lang === "pl"
            ? "Oszczędność 100 godzin pracy nauczycieli i instruktorów"
            : lang === "de"
              ? "Spart 100 Stunden muehsame Fehlersuche im Team"
              : "Saves 100 hours of teacher and student mentor time"}
        </text>
      </g>

      {/* Step 2: Value Captured: $300 */}
      {step >= 2 && (
        <g>
          <rect
            x="35"
            y="102"
            width="160"
            height="45"
            rx="8"
            fill="#dcfce7"
            stroke="#16a34a"
            strokeWidth="2"
          />
          <text x="115" y="125" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#15803d">
            {lang === "pl"
              ? "Cena licencji: 1 200 zł"
              : lang === "de"
                ? "Preis: 300 € / Jahr"
                : "Price: $300 / year"}
          </text>
          <text x="115" y="140" textAnchor="middle" fontSize="9.5" fill="#166534">
            {lang === "pl"
              ? "Przechwycona wartość (15%)"
              : lang === "de"
                ? "Erloesanteil (15%)"
                : "Value Captured (15%)"}
          </text>
        </g>
      )}

      {/* Step 3: Win-Win surplus */}
      {step >= 3 && (
        <g>
          <rect
            x="205"
            y="102"
            width="160"
            height="45"
            rx="8"
            fill="#fef3c7"
            stroke="#d97706"
            strokeWidth="1.5"
          />
          <text x="285" y="125" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#92400e">
            {lang === "pl"
              ? "Zysk klienta: 6 800 zł"
              : lang === "de"
                ? "Kundenvorteil: 1.700 €"
                : "Customer Surplus: $1,700"}
          </text>
          <text x="285" y="140" textAnchor="middle" fontSize="9.5" fill="#b45309">
            {lang === "pl"
              ? "Klient zyskuje gigantyczną korzyść"
              : lang === "de"
                ? "Kunde spart enorm Geld"
                : "Huge ROI for school"}
          </text>

          <rect x="40" y="160" width="320" height="50" rx="8" fill="#78350f" />
          <text
            x="200"
            y="182"
            textAnchor="middle"
            fontSize="11.5"
            fontWeight="bold"
            fill="#ffffff"
          >
            {lang === "pl"
              ? "Najlepsze biznesy zostawiają większość wartości w rękach klienta"
              : lang === "de"
                ? "Grossartige Firmen ueberlassen dem Kunden den groessten Nutzen"
                : "Enduring enterprises create 5x to 10x more value than they capture"}
          </text>
          <text x="200" y="198" textAnchor="middle" fontSize="9.5" fill="#fde68a">
            {lang === "pl"
              ? "Klient, który zarabia dzięki tobie, nigdy od ciebie nie odejdzie"
              : lang === "de"
                ? "Ein Kunde, der durch dich profitiert, bleibt fuer immer treu"
                : "When customers clearly profit from your product, they never cancel"}
          </text>
        </g>
      )}
    </svg>
  );
}

/**
 * Beat 5: The Enterprise Flywheel.
 * Step 1: Customer feedback refines the AI coding models.
 * Step 2: Word-of-mouth referral expands to 500 high schools.
 * Step 3: A sustainable, ethical, and highly profitable business engine.
 */
function EnterpriseFlywheelDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Koło zamachowe rozwoju przedsiębiorstwa"
      : lang === "de"
        ? "Das unternehmerische Schwungrad fuer nachhaltigen Erfolg"
        : "The sustainable enterprise flywheel";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect
        x="10"
        y="10"
        width="380"
        height="220"
        rx="14"
        fill="#faf5ff"
        stroke="#7e22ce"
        strokeWidth="2"
      />

      {/* Center node */}
      <circle cx="200" cy="115" r="38" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" />
      <text x="200" y="112" textAnchor="middle" fontSize="16">
        🚀
      </text>
      <text x="200" y="128" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#5b21b6">
        RoboPilot
      </text>

      {/* Step 1: Delighted Users */}
      <g>
        <circle cx="90" cy="70" r="28" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
        <text x="90" y="68" textAnchor="middle" fontSize="14">
          💡
        </text>
        <text x="90" y="84" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#15803d">
          Huge ROI
        </text>
      </g>

      {/* Step 2: Referrals */}
      {step >= 2 && (
        <g>
          <circle cx="310" cy="70" r="28" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
          <text x="310" y="68" textAnchor="middle" fontSize="14">
            📢
          </text>
          <text x="310" y="84" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#1e40af">
            Referrals
          </text>

          <circle cx="90" cy="165" r="28" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
          <text x="90" y="163" textAnchor="middle" fontSize="14">
            🔄
          </text>
          <text x="90" y="179" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#92400e">
            Low Churn
          </text>
        </g>
      )}

      {/* Step 3: Reinvestment & Champion Banner */}
      {step >= 3 && (
        <g>
          <circle cx="310" cy="165" r="28" fill="#fce7f3" stroke="#db2777" strokeWidth="1.5" />
          <text x="310" y="163" textAnchor="middle" fontSize="14">
            ⭐
          </text>
          <text x="310" y="179" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#9d174d">
            500 Clubs
          </text>

          <rect x="50" y="200" width="300" height="24" rx="6" fill="#581c87" />
          <text
            x="200"
            y="216"
            textAnchor="middle"
            fontSize="10.5"
            fontWeight="bold"
            fill="#ffffff"
          >
            {lang === "pl"
              ? "Prawdziwa przedsiębiorczość łączy tworzenie wartości i dyscyplinę"
              : lang === "de"
                ? "Echtes Unternehmertum verbindet Nutzen mit finanzieller Disziplin"
                : "True entrepreneurship pairs deep value creation with disciplined unit economics"}
          </text>
        </g>
      )}
    </svg>
  );
}

function Toy({ onDone }: ToyProps) {
  const [subscribers, setSubscribers] = useState(20);
  const mrr = subscribers * 25;
  const arr = mrr * 12;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "center" }}>
      <p style={{ margin: 0, fontWeight: 700, fontSize: "1rem" }}>
        Active Subscriptions: {subscribers} | Monthly Revenue: ${mrr} | Annual Run-Rate: $
        {arr.toLocaleString()}
      </p>
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          type="button"
          className="btn"
          onClick={() => {
            setSubscribers((s) => {
              const next = s + 25;
              if (next >= 75) onDone?.();
              return next;
            });
          }}
        >
          Acquire Clubs (+25 Subscriptions)
        </button>
        <button type="button" className="btn btn-quiet" onClick={() => setSubscribers(20)}>
          Reset Baseline
        </button>
      </div>
      <div
        style={{
          padding: "12px",
          background: subscribers >= 50 ? "#eef8ef" : "#fff9db",
          borderRadius: "10px",
          width: "100%",
          textAlign: "center",
        }}
      >
        {subscribers >= 70
          ? "Compound SaaS Engine: Predictable monthly subscriptions provide dependable cash flow to fund new product features!"
          : "Subscription power: Adding recurring customers builds compounding wealth without starting from scratch each month."}
      </div>
    </div>
  );
}

function BusinessBasicsWidget({ onAnswer }: WidgetProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
      <p style={{ margin: 0 }}>
        If acquiring one corporate customer costs $100 in advertising (CAC), and that customer
        generates $500 in total gross profit over their lifetime (LTV), what is the LTV:CAC ratio?
      </p>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>
        1:5 (losing money on acquisition)
      </button>
      <button type="button" className="btn" onClick={() => onAnswer(true)}>
        5:1 (a highly profitable customer acquisition engine)
      </button>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>
        50:1
      </button>
    </div>
  );
}

export const lesson: Lesson = {
  id: "business-basics",
  story: [
    animatedBeat(
      [
        T(
          "Meet Aarav. He programs an AI coding assistant app designed to help high school robotics teams debug their robot software.",
          "Das ist Arne. Er programmiert einen KI-Coding-Assistenten, der Schuelerteams bei der Fehlersuche an Robotern hilft.",
          "Poznaj Adama. Tworzy aplikację ze sztuczną inteligencją ułatwiającą szkolnym zespołom robotyki pisanie i poprawianie kodu.",
        ),
        T(
          "Because software is digital, creating another copy costs almost nothing, giving his product near-zero *marginal cost*.",
          "Weil Software digital ist, kostet jede weitere Kopie fast nichts: die *Grenzkosten* liegen nahe null.",
          "Ponieważ oprogramowanie jest cyfrowe, stworzenie kolejnej kopii nic nie kosztuje: produkt ma niemal zerowy *koszt krańcowy*.",
        ),
        T(
          "Robotics clubs across three states discover his tool and immediately ask how they can buy licenses for their teams.",
          "Robotik-Teams aus mehreren Schulen entdecken das Tool und wollen sofort Schullizenzen kaufen.",
          "Kluby robotyki z wielu szkół odkrywają narzędzie i natychmiast pytają o możliwość zakupu licencji.",
        ),
      ],
      SoftwareLaunchDiagram,
    ),
    animatedBeat(
      [
        T(
          "Aarav evaluates different *business models* to monetize his creation sustainably.",
          "Arne vergleicht verschiedene *Geschaeftsmodelle*, um seine Software dauerhaft rentabel zu machen.",
          "Adam porównuje różne *modele biznesowe*, aby zapewnić swojemu projektowi trwałą rentowność.",
        ),
        T(
          "Selling the software for a one-time fee of one hundred dollars means he must hunt for brand-new customers every month to pay his rent.",
          "Ein Einmalkauf fuer 100 Euro wuerde bedeuten, jeden Monat von vorn nach neuen Kaeufern suchen zu muessen.",
          "Sprzedaż programu za jednorazową opłatą czterystu złotych zmusiłaby go do ciągłego szukania nowych klientów co miesiąc.",
        ),
        T(
          "Instead, he adopts a subscription model: charging twenty-five dollars a month for continuous updates, creating predictable *recurring revenue*.",
          "Stattdessen waehlt er ein Abo-Modell: 25 Euro monatlich fuer Updates bringen verlaessliche *wiederkehrende Einnahmen*.",
          "Wybiera model subskrypcyjny: pobiera sto złotych miesięcznie za stałe aktualizacje, tworząc przewidywalny *przychód cykliczny*.",
        ),
      ],
      BusinessModelsDiagram,
    ),
    animatedBeat(
      [
        T(
          "Next, Aarav analyzes his *Customer Acquisition Cost* (CAC) compared to *Lifetime Value* (LTV).",
          "Als Naechstes vergleicht Arne die *Kundenakquisekosten* (CAC) mit dem gesamten *Kundenwert* (LTV).",
          "Następnie Adam porównuje *koszt pozyskania klienta* (CAC) z łączną *wartością życiową klienta* (LTV).",
        ),
        T(
          "He spends fifty dollars on targeted community sponsorships to convince a school robotics coach to sign up.",
          "Er investiert 50 Euro in gezielte Foerderpreise, um einen Schullehrer von der Software zu ueberzeugen.",
          "Wydaje dwieście złotych na patronat nad lokalnymi zawodami, by przekonać opiekuna koła do zakupu.",
        ),
        T(
          "Because the average club stays subscribed for two full years, each customer generates six hundred dollars, yielding a phenomenal twelve-to-one LTV-to-CAC ratio.",
          "Da ein Team im Schnitt zwei Jahre lang Kunde bleibt, bringt es 600 Euro ein: ein fantastisches Verhaeltnis von Zwoelf zu Eins.",
          "Ponieważ przeciętne koło korzysta z licencji przez dwa lata, przynosi dwa tysiące czterysta złotych, dając znakomity stosunek LTV do CAC dwanaście do jednego.",
        ),
      ],
      UnitEconomicsCacLtvDiagram,
    ),
    animatedBeat(
      [
        T(
          "A vital insight every entrepreneur must master is the difference between *value creation* and *value capture*.",
          "Eine Kernlektion fuer Gruender ist der Unterschied zwischen *Wertschoepfung* und *Einnahmenanteil*.",
          "Kluczową lekcją dla każdego przedsiębiorcy jest różnica między *tworzeniem wartości* a jej *przechwytywaniem*.",
        ),
        T(
          "Aarav's tool saves each team one hundred hours of frustrating debugging, creating over two thousand dollars of real educational value.",
          "Arnes Programm spart jedem Team 100 Stunden Frust, was einem echten Bildungswert von ueber 2.000 Euro entspricht.",
          "Narzędzie Adama oszczędza zespołowi sto godzin żmudnej pracy, tworząc ponad osiem tysięcy złotych realnej wartości.",
        ),
        T(
          "By capturing only three hundred dollars a year in subscription fees, his customers happily stay because they receive far more than they pay.",
          "Weil er nur 300 Euro jaehrlich verlangt, bleiben die Kunden begeistert: Sie sparen ein Vielfaches ihrer Ausgaben.",
          "Pobierając jedynie tysiąc dwieście złotych rocznie, zyskuje wiernych klientów, bo otrzymują oni wielokrotnie więcej, niż płacą.",
        ),
      ],
      ValueCreationDiagram,
    ),
    animatedBeat(
      [
        T(
          "When customer delight is high and unit economics are disciplined, an enterprise flywheel begins to spin.",
          "Wenn Kunden begeistert sind und die Zahlen stimmen, geraet das unternehmerische Schwungrad in Bewegung.",
          "Gdy zadowolenie klientów jest wysokie, a finanse uporządkowane, koło zamachowe biznesu zaczyna przyspieszać.",
        ),
        T(
          "Coaches recommend the tool to rival districts, driving down acquisition costs while expanding ARR automatically.",
          "Lehrer empfehlen das Programm an Nachbarschulen weiter, was neue Kunden fast kostenlos gewinnt.",
          "Nauczyciele polecają program innym szkołom, co obniża koszty pozyskania i automatycznie powiększa przychody.",
        ),
        T(
          "Build products that solve urgent problems, charge fairly for your value, and you create an enduring business.",
          "Loese echte, dringende Probleme, verlange faire Preise, und du schaffst ein dauerhaft erfolgreiches Unternehmen.",
          "Rozwiązuj realne, trudne problemy, wyceniaj swoją pracę uczciwie, a zbudujesz przedsiębiorstwo o trwałych fundamentach.",
        ),
      ],
      EnterpriseFlywheelDiagram,
    ),
  ],
  toyIntro: T(
    "Simulate SaaS recurring revenue growth: accumulate subscribers to watch monthly recurring revenue and run-rate expand.",
    "Simuliere das Wachstum wiederkehrender Abo-Einnahmen: Baue Abonnenten auf und beobachte den jaehrlichen Umsatz.",
    "Zasymuluj wzrost przychodów w modelu subskrypcyjnym: zdobywaj użytkowników i obserwuj, jak rośnie roczny przychód.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "What is the difference between 'value creation' and 'value capture' in business?",
        "Was ist der Unterschied zwischen 'Wertschoepfung' und 'Einnahmenanteil' (Value Capture)?",
        "Jaka jest różnica między 'tworzeniem wartości' a 'przechwytywaniem wartości' w biznesie?",
      ),
      options: [
        {
          text: T(
            "Value creation is the total benefit delivered to customers; value capture is the fraction of that benefit retained as company revenue",
            "Wertschoepfung ist der Gesamtnutzen fuer Kunden; Einnahmenanteil ist der Teil dieses Nutzens, der als Umsatz im Betrieb bleibt",
            "Tworzenie wartości to łączna korzyść dostarczona klientowi, a przechwytywanie to część tej korzyści zamieniona w przychód firmy",
          ),
          correct: true,
        },
        {
          text: T(
            "Value creation is printing paper banknotes; value capture is locking them in a safe",
            "Wertschoepfung ist das Drucken von Scheinen; Einnahmenanteil ist das Einschliessen im Tresor",
            "Tworzenie wartości to drukowanie banknotów, a przechwytywanie to zamykanie ich w sejfie",
          ),
        },
        {
          text: T(
            "Value creation happens only on weekends, while value capture happens on weekdays",
            "Wertschoepfung findet nur am Wochenende statt, Einnahmen nur werktags",
            "Tworzenie wartości zachodzi tylko w weekendy, a przechwytywanie w dni powszednie",
          ),
        },
      ],
      hint: T(
        "Think about why a customer happily pays $100 for something that saves them $1,000.",
        "Ueberlege, warum ein Kunde gerne 100 Euro zahlt, wenn er dadurch 1.000 Euro spart.",
        "Zastanów się, dlaczego klient chętnie zapłaci 100 zł za rozwiązanie, które oszczędza mu 1 000 zł.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "Why is a high LTV-to-CAC ratio (such as 3:1 or higher) critical for an expanding company?",
        "Warum ist ein hohes LTV-zu-CAC-Verhaeltnis (wie 3:1 oder mehr) fuer ein wachsendes Unternehmen entscheidend?",
        "Dlaczego wysoki stosunek LTV do CAC (np. 3:1 lub wyższy) jest kluczowy dla rozwoju firmy?",
      ),
      options: [
        {
          text: T(
            "It ensures the money generated by each client easily covers marketing and sales costs while leaving ample profit for reinvestment",
            "Es stellt sicher, dass Kundeneinnahmen die Werbekosten weit uebersteigen und Gewinn fuer Investitionen bleibt",
            "Gwarantuje, że przychód od każdego klienta z nawiązką pokrywa koszty marketingu i zostawia zysk na rozwój",
          ),
          correct: true,
        },
        {
          text: T(
            "Tax authorities immediately confiscate businesses with low ratios",
            "Finanzbehoerden schliessen Betriebe mit niedrigen Quoten umgehend",
            "Urzędy skarbowe zamykają firmy o niskim współczynniku",
          ),
        },
        {
          text: T(
            "It legally requires bank employees to perform software coding work",
            "Es verpflichtet Bankangestellte gesetzlich dazu, Programmierarbeiten zu uebernehmen",
            "Zmusza prawnie pracowników banku do pisania kodu dla aplikacji",
          ),
        },
      ],
      hint: T(
        "Compare the cost to bring a user in versus the total profit they generate over time.",
        "Vergleiche die Kosten der Kundenwerbung mit den Gesamteinnahmen ueber die Nutzungsdauer.",
        "Porównaj koszt pozyskania użytkownika z łącznym zyskiem, jaki przynosi w czasie współpracy.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Calculate the LTV:CAC ratio given the customer acquisition expense and lifetime gross contribution.",
        "Berechne das Verhaeltnis von LTV zu CAC aus den Akquisekosten und dem gesamten Deckungsbeitrag.",
        "Oblicz stosunek LTV do CAC na podstawie kosztu pozyskania i całkowitego zysku życiowego klienta.",
      ),
      Widget: BusinessBasicsWidget,
      hint: T(
        "Divide the Lifetime Value by the Customer Acquisition Cost.",
        "Teile den Kundenwert (LTV) durch die Akquisekosten (CAC).",
        "Podziel wartość życiową klienta (LTV) przez koszt jego pozyskania (CAC).",
      ),
    },
  ],
  askDad: T(
    "Ask your parent: What is the primary business model of their organization (subscriptions, hourly services, or product sales)?",
    "Frage deine Eltern: Welches Geschaeftsmodell nutzt ihr Arbeitgeber (Abonnements, Stundenhonorare oder Warenverkauf)?",
    "Zapytaj rodziców: Jaki jest główny model biznesowy w ich firmie (subskrypcje, rozliczenia godzinowe czy sprzedaż produktów)?",
  ),
  realLife: {
    title: T(
      "Real world: Software-as-a-Service (SaaS) and digital transformation",
      "Echte Welt: Software-as-a-Service (SaaS) und die digitale Wirtschaft",
      "Prawdziwy świat: Model Software-as-a-Service (SaaS) i gospodarka cyfrowa",
    ),
    body: T(
      "In the early 2000s, software giants like Adobe sold boxed CDs for several hundred dollars. In 2013, Adobe transitioned entirely to Creative Cloud monthly subscriptions. While controversial initially, the recurring SaaS model transformed Adobe into a predictable cash engine with over 90% gross margins, providing steady capital to continuously build AI features without feast-or-famine release cycles.",
      "Frueher verkaufte Adobe Software auf CDs fuer Hunderte Euro. 2013 stellte der Konzern komplett auf monatliche Creative-Cloud-Abos um. Dieses SaaS-Modell schuf verlaessliche Einnahmen mit ueber 90 Prozent Rohmarge, was kontinuierliche Milliarden-Investitionen in neue KI-Funktionen ermoeglichte.",
      "Na początku lat 2000. firmy takie jak Adobe sprzedawały programy w pudełkach za setki dolarów. W 2013 roku przeszły całkowicie na subskrypcje Creative Cloud. Model SaaS zapewnił stały strumień gotówki z ponad 90-procentową marżą brutto, co pozwoliło na nieustanne inwestycje bez obaw o wahania sprzedaży.",
    ),
  },
  factCard: {
    claims: [
      {
        text: T(
          "Peter Drucker famously stated in 1954: 'Because the purpose of business is to create a customer, the business enterprise has two, and only two, basic functions: marketing and innovation.'",
          "Peter Drucker schrieb 1954: 'Weil der Zweck eines Unternehmens darin besteht, Kunden zu gewinnen, hat es genau zwei Grundfunktionen: Marketing und Innovation.'",
          "Peter Drucker napisał w 1954 roku: 'Ponieważ celem przedsiębiorstwa jest tworzenie klienta, ma ono tylko dwie podstawowe funkcje: marketing i innowację.'",
        ),
        source: "https://www.drucker.institute/about-peter-drucker/",
      },
      {
        text: T(
          "Alexander Osterwalder and Yves Pigneur published the Business Model Canvas in 2010, formalizing nine core building blocks of enterprise value generation.",
          "Alexander Osterwalder und Yves Pigneur veroeffentlichten 2010 das 'Business Model Canvas' mit neun Bausteinen der unternehmerischen Wertschoepfung.",
          "Alexander Osterwalder i Yves Pigneur opublikowali w 2010 roku Business Model Canvas, definiując dziewięć kluczowych elementów tworzenia wartości w biznesie.",
        ),
        source: "https://www.strategyzer.com/library/the-business-model-canvas",
      },
      {
        text: T(
          "In financial economics, the Magic Number in SaaS measures sales efficiency by comparing net new ARR to sales and marketing expenditure.",
          "Die 'SaaS Magic Number' misst im Finanzbereich die Vertriebseffizienz, indem sie den Zuwachs an wiederkehrendem Umsatz mit den Werbeausgaben vergleicht.",
          "Wskaźnik SaaS Magic Number mierzy efektywność sprzedaży, zestawiając przyrost rocznych powtarzalnych przychodów (ARR) z wydatkami na marketing.",
        ),
        source: "https://www.investopedia.com/terms/s/saas.asp",
      },
      {
        text: T(
          "Destatis surveys reveal that over 40% of German companies utilize cloud software services, reflecting rapid migration toward subscription computing infrastructure.",
          "Erhebungen von Destatis zeigen, dass ueber 40 Prozent der deutschen Unternehmen Cloud-Software nutzen, was den Trend zu Abomodellen bestaetigt.",
          "Dane Destatis wskazują, że ponad 40 procent niemieckich przedsiębiorstw korzysta z oprogramowania w chmurze, co potwierdza dynamiczny rozwój modeli subskrypcyjnych.",
        ),
        source:
          "https://www.destatis.de/DE/Themen/Wirtschaft/Unternehmen/Digitalisierung-IKT-Nutzung/_inhalt.html",
      },
      {
        text: T(
          "Customer Acquisition Cost payback period represents the number of months required for a company to recover the capital spent acquiring a customer.",
          "Die CAC-Payback-Periode gibt an, wie viele Monate vergehen, bis die Akquisekosten eines Neukunden durch Rohertraege wieder eingespielt sind.",
          "Okres zwrotu kosztów pozyskania (CAC payback period) określa liczbę miesięcy potrzebnych do odzyskania kapitału wydanego na pozyskanie klienta.",
        ),
        source: "https://hbr.org/2021/04/how-to-calculate-customer-lifetime-value",
      },
    ],
    simplified: [
      T(
        "Complex equity vesting schedules and deferred revenue amortizations are simplified into intuitive recurring monthly cash flow.",
        "Komplexe Rueckstellungen und abgegrenzte Umsaetze wurden zu einem verstaendlichen monatlichen Zahlungsfluss vereinfacht.",
        "Złożone rozliczenia międzyokresowe przychodów i vesting udziałów uproszczono do czytelnych, comiesięcznych przepływów gotówki.",
      ),
    ],
  },
};
