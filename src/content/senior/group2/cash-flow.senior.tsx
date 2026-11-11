import { useState } from "react";
import { animatedBeat } from "../../../lesson/toolkit";
import type { DiagramProps, Lesson, Text, ToyProps, WidgetProps } from "../../../lesson/types";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

/**
 * Beat 1: Meet Karan. Launches a boutique high school photography studio.
 * Step 1: Karan and his professional camera gear.
 * Step 2: Booked solid for prom and sports team photoshoots ($5,000 on paper).
 * Step 3: School yearbook committee says: "Net 60 payment terms".
 */
function PhotographyLaunchDiagram({ lang, step }: DiagramProps) {
  const karanName = lang === "pl" ? "Kamil" : lang === "de" ? "Klaus" : "Karan";
  const label =
    lang === "pl"
      ? "Kamil otwiera studio fotograficzne"
      : lang === "de"
        ? "Klaus startet sein Fotostudio"
        : "Karan launching photography business";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect
        x="10"
        y="10"
        width="380"
        height="220"
        rx="14"
        fill="#fafafa"
        stroke="#4b5563"
        strokeWidth="2"
      />

      {/* Karan avatar */}
      <g>
        <circle cx="80" cy="110" r="28" fill="#f3cfa6" stroke="#1f2937" strokeWidth="2" />
        <path d="M 52 105 C 52 70 108 70 108 105" fill="#111827" />
        <circle cx="72" cy="107" r="2.5" fill="#1f2937" />
        <circle cx="88" cy="107" r="2.5" fill="#1f2937" />
        <path d="M 76 119 Q 80 125 84 119" stroke="#1f2937" strokeWidth="2" fill="none" />
        <path
          d="M 56 185 L 62 140 Q 80 135 98 140 L 104 185 Z"
          fill="#4b5563"
          stroke="#1f2937"
          strokeWidth="2"
        />
        <text x="80" y="205" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#111827">
          {karanName}
        </text>
      </g>

      {/* Studio Header */}
      <g>
        <rect
          x="135"
          y="35"
          width="230"
          height="32"
          rx="6"
          fill="#f3f4f6"
          stroke="#4b5563"
          strokeWidth="1.5"
        />
        <text x="250" y="55" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#1f2937">
          📸{" "}
          {lang === "pl"
            ? "Studio Fotograficzne Kamila"
            : lang === "de"
              ? "Klaus Fotostudio"
              : "Karan Visuals Studio"}
        </text>
      </g>

      {/* Step 2: Booked Orders */}
      {step >= 2 && (
        <g>
          <rect
            x="135"
            y="80"
            width="230"
            height="52"
            rx="8"
            fill="#ecfdf5"
            stroke="#059669"
            strokeWidth="1.5"
          />
          <text x="250" y="102" textAnchor="middle" fontSize="18">
            🏆 🎓 📅
          </text>
          <text
            x="250"
            y="122"
            textAnchor="middle"
            fontSize="10.5"
            fontWeight="bold"
            fill="#065f46"
          >
            {lang === "pl"
              ? "Zlecenia na 20 000 zł podpisane!"
              : lang === "de"
                ? "Auftraege ueber 5.000 € gebucht!"
                : "Booked 50 Sessions: $5,000 on paper!"}
          </text>
        </g>
      )}

      {/* Step 3: Net 60 Delay */}
      {step >= 3 && (
        <g>
          <rect
            x="135"
            y="145"
            width="230"
            height="60"
            rx="8"
            fill="#fff1f2"
            stroke="#e11d48"
            strokeWidth="1.5"
          />
          <text x="250" y="170" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#be123c">
            {lang === "pl"
              ? "⚠️ Płatność za 60 dni (Net 60)"
              : lang === "de"
                ? "⚠️ Zahlungsziel: 60 Tage (Net 60)"
                : "⚠️ School pays in 60 days (Net 60)"}
          </text>
          <text x="250" y="190" textAnchor="middle" fontSize="10.5" fill="#9f1239">
            {lang === "pl"
              ? "Konto bankowe dzisiaj: 200 zł!"
              : lang === "de"
                ? "Aktueller Kontostand: nur 50 €!"
                : "Actual cash in bank today: $50!"}
          </text>
        </g>
      )}
    </svg>
  );
}

/**
 * Beat 2: Cash flow timing mismatch: Inflows vs Outflows.
 * Step 1: Upfront costs: Lab printing paper, assistant wage, studio rent ($2,000 due now).
 * Step 2: Client payment delay: 60 long days of waiting.
 * Step 3: Cash balance drops below zero!
 */
function CashTimingDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Niedopasowanie terminów przepływów pieniężnych"
      : lang === "de"
        ? "Zeitliche Verschiebung zwischen Einnahmen und Ausgaben"
        : "Timing mismatch between cash inflows and outflows";

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

      {/* Timeline line */}
      <line x1="40" y1="120" x2="360" y2="120" stroke="#94a3b8" strokeWidth="3" />
      <circle cx="50" cy="120" r="6" fill="#3b82f6" />
      <text x="50" y="140" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1e40af">
        Day 0
      </text>

      <circle cx="180" cy="120" r="6" fill="#ef4444" />
      <text x="180" y="140" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#b91c1c">
        Day 15
      </text>

      <circle cx="350" cy="120" r="6" fill="#10b981" />
      <text x="350" y="140" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#047857">
        Day 60
      </text>

      {/* Immediate Expenses */}
      <g>
        <rect
          x="35"
          y="40"
          width="130"
          height="60"
          rx="6"
          fill="#fee2e2"
          stroke="#ef4444"
          strokeWidth="1.5"
        />
        <text x="100" y="62" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#b91c1c">
          {lang === "pl"
            ? "Wydatki natychmiast"
            : lang === "de"
              ? "Sofortige Ausgaben"
              : "Due Today: -$2,000"}
        </text>
        <text x="100" y="80" textAnchor="middle" fontSize="9.5" fill="#991b1b">
          {lang === "pl"
            ? "Druk, studio, asystent"
            : lang === "de"
              ? "Fotolabor, Miete, Gehalt"
              : "Photo lab, rent, helper"}
        </text>
      </g>

      {/* Step 2: The Dry Desert */}
      {step >= 2 && (
        <g>
          <rect
            x="180"
            y="45"
            width="130"
            height="50"
            rx="6"
            fill="#fef3c7"
            stroke="#d97706"
            strokeWidth="1.5"
          />
          <text x="245" y="68" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#92400e">
            {lang === "pl"
              ? "Pusta kasa (Dolina Śmierci)"
              : lang === "de"
                ? "Liquiditaetsluecke"
                : "The Cash Desert"}
          </text>
          <text x="245" y="84" textAnchor="middle" fontSize="9" fill="#b45309">
            {lang === "pl"
              ? "Czekanie na przelew"
              : lang === "de"
                ? "Warten auf Geldeingang"
                : "Waiting 60 long days"}
          </text>
        </g>
      )}

      {/* Step 3: The Danger Zone */}
      {step >= 3 && (
        <g>
          <rect x="40" y="170" width="320" height="48" rx="8" fill="#7f1d1d" />
          <text
            x="200"
            y="192"
            textAnchor="middle"
            fontSize="11.5"
            fontWeight="bold"
            fill="#ffffff"
          >
            {lang === "pl"
              ? "Zysk na papierze nie zapłaci rachunków w terminie!"
              : lang === "de"
                ? "Buchgewinn zahlt keine Rechnungen am Monatsende!"
                : "Profit on paper cannot pay today's utility or rent bills!"}
          </text>
          <text x="200" y="208" textAnchor="middle" fontSize="9.5" fill="#fca5a5">
            {lang === "pl"
              ? "Bankructwo z braku płynności grozi nawet zyskownym firmom"
              : lang === "de"
                ? "Insolvenz droht durch Zahlungsunfaehigkeit, nicht durch Auftragsmangel"
                : "Cash insolvency bankrupts profitable businesses that run out of liquidity"}
          </text>
        </g>
      )}
    </svg>
  );
}

/**
 * Beat 3: The Working Capital solution: Deposits and Net 15 terms.
 * Step 1: Require 50% deposit upfront before picking up the camera ($2,500 cash in).
 * Step 2: Negotiate supplier payments to 30 days.
 * Step 3: Cash flow becomes positive from day one!
 */
function WorkingCapitalDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Kapitał obrotowy i zaliczki od klientów"
      : lang === "de"
        ? "Betriebskapital und Anzahlungen fuer gesunden Cashflow"
        : "Working capital optimization and client deposits";

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

      {/* Step 1: Upfront Deposit */}
      <g>
        <rect
          x="35"
          y="35"
          width="155"
          height="150"
          rx="8"
          fill="#dcfce7"
          stroke="#16a34a"
          strokeWidth="2"
        />
        <text x="112" y="60" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#15803d">
          {lang === "pl"
            ? "Zaliczka 50% z góry"
            : lang === "de"
              ? "50% Anzahlung vorab"
              : "50% Upfront Deposit"}
        </text>
        <text x="112" y="90" textAnchor="middle" fontSize="22">
          💵 🛡️
        </text>
        <text x="112" y="115" textAnchor="middle" fontSize="10" fill="#166534">
          {lang === "pl"
            ? "+10 000 zł w gotówce"
            : lang === "de"
              ? "+2.500 € auf dem Konto"
              : "+$2,500 cash received"}
        </text>
        <text x="112" y="132" textAnchor="middle" fontSize="10" fill="#166534">
          {lang === "pl"
            ? "Przed rozpoczęciem zdjęć"
            : lang === "de"
              ? "Vor dem ersten Foto"
              : "Before clicking shutter"}
        </text>
        <rect x="45" y="145" width="135" height="26" rx="4" fill="#bbf7d0" />
        <text x="112" y="162" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#14532d">
          {lang === "pl"
            ? "Brak ryzyka dziury"
            : lang === "de"
              ? "Keine Liquiditaetsnot"
              : "Fully funded runway"}
        </text>
      </g>

      {/* Step 2: Supplier Terms */}
      {step >= 2 && (
        <g>
          <rect
            x="210"
            y="35"
            width="155"
            height="150"
            rx="8"
            fill="#eff6ff"
            stroke="#2563eb"
            strokeWidth="1.5"
          />
          <text x="287" y="60" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e40af">
            {lang === "pl"
              ? "Kredyt kupiecki (30 dni)"
              : lang === "de"
                ? "30 Tage Lieferantenziel"
                : "Supplier 30-Day Terms"}
          </text>
          <text x="287" y="90" textAnchor="middle" fontSize="22">
            🤝 📑
          </text>
          <text x="287" y="115" textAnchor="middle" fontSize="10" fill="#1d4ed8">
            {lang === "pl"
              ? "Płatność za druk po sesji"
              : lang === "de"
                ? "Fotolabor spaeter zahlen"
                : "Pay lab after shoots"}
          </text>
          <text x="287" y="132" textAnchor="middle" fontSize="10" fill="#1d4ed8">
            {lang === "pl"
              ? "Pieniądze pracują dla Ciebie"
              : lang === "de"
                ? "Liquiditaet bleibt im Haus"
                : "Cash buffer stays intact"}
          </text>
          <rect x="220" y="145" width="135" height="26" rx="4" fill="#bfdbfe" />
          <text x="287" y="162" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1e3a8a">
            {lang === "pl"
              ? "Dodatni kapitał obrotowy"
              : lang === "de"
                ? "Positives Umlaufvermoegen"
                : "Positive Working Capital"}
          </text>
        </g>
      )}

      {/* Step 3: Cash is King */}
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
              ? "Przychód to próżność, zysk to rozsądek, ale gotówka to tlen"
              : lang === "de"
                ? "Umsatz ist Eitelkeit, Gewinn ist Vernunft, aber Cash ist Sauerstoff"
                : "Revenue is vanity, profit is sanity, but cash flow is king"}
          </text>
        </g>
      )}
    </svg>
  );
}

/**
 * Beat 4: Accounts Receivable vs Cash in Hand.
 * Step 1: Outstanding invoices sitting on the desk (Accounts Receivable).
 * Step 2: Automated payment reminders and small early-pay discount (2/10 net 30).
 * Step 3: Faster collections build an invincible safety cushion.
 */
function InvoicingSafetyDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Ściąganie należności i skonto za szybką płatność"
      : lang === "de"
        ? "Forderungsmanagement und Skonto fuer schnelle Zahlung"
        : "Accounts receivable and early payment discounts";

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

      {/* Invoice Stack */}
      <g>
        <rect
          x="35"
          y="45"
          width="105"
          height="85"
          rx="6"
          fill="#fef3c7"
          stroke="#b45309"
          strokeWidth="1.5"
        />
        <text x="87" y="70" textAnchor="middle" fontSize="18">
          📑
        </text>
        <text x="87" y="92" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#78350f">
          {lang === "pl" ? "Należności" : lang === "de" ? "Forderungen" : "Receivables"}
        </text>
        <text x="87" y="110" textAnchor="middle" fontSize="9" fill="#92400e">
          Owed: $2,500
        </text>
      </g>

      {/* Step 2: 2/10 Net 30 Term */}
      {step >= 2 && (
        <g>
          <path d="M 145 88 L 185 88" stroke="#d97706" strokeWidth="3" markerEnd="url(#arrow)" />
          <rect
            x="190"
            y="45"
            width="170"
            height="85"
            rx="6"
            fill="#dbeafe"
            stroke="#2563eb"
            strokeWidth="1.5"
          />
          <text x="275" y="70" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e40af">
            {lang === "pl"
              ? "Skonto 2% za wpłatę w 10 dni"
              : lang === "de"
                ? "2% Skonto bei Zahlung in 10 Tagen"
                : "2% Discount for Pay in 10 Days"}
          </text>
          <text x="275" y="92" textAnchor="middle" fontSize="18">
            ⚡ 💳
          </text>
          <text x="275" y="112" textAnchor="middle" fontSize="9.5" fill="#1d4ed8">
            {lang === "pl"
              ? "Klienci płacą natychmiast"
              : lang === "de"
                ? "Kunden zahlen sofort"
                : "Clients rush to pay early"}
          </text>
        </g>
      )}

      {/* Step 3: Cash runway protected */}
      {step >= 3 && (
        <g>
          <rect x="40" y="155" width="320" height="55" rx="8" fill="#1e3a8a" />
          <text x="200" y="178" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#ffffff">
            {lang === "pl"
              ? "Krótki cykl konwersji gotówki to wolność i spokój"
              : lang === "de"
                ? "Ein kurzer Cash-Conversion-Cycle schafft Unabhaengigkeit"
                : "A fast cash conversion cycle guarantees business resilience"}
          </text>
          <text x="200" y="196" textAnchor="middle" fontSize="10" fill="#bfdbfe">
            {lang === "pl"
              ? "Pieniądze na koncie dają odporność na każdy kryzys rynkowy"
              : lang === "de"
                ? "Echte Liquiditaet schuetzt vor jedem unvorhergesehenen Schock"
                : "Real bank liquidity lets you invest boldly and survive economic freezes"}
          </text>
        </g>
      )}
    </svg>
  );
}

/**
 * Beat 5: Cash Runway and Building a Corporate Reserve.
 * Step 1: Calculate monthly burn rate ($1,000 baseline).
 * Step 2: Keep 3 to 6 months of cash buffer in reserve ($6,000).
 * Step 3: Never panic during slow seasons.
 */
function CashRunwayDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Poduszka płynności i pas startowy gotówki"
      : lang === "de"
        ? "Liquiditaetsreserve und finanzielle Reichweite"
        : "Cash runway and enterprise emergency buffer";

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

      {/* Monthly Burn */}
      <g>
        <rect
          x="35"
          y="35"
          width="155"
          height="80"
          rx="8"
          fill="#fee2e2"
          stroke="#ef4444"
          strokeWidth="1.5"
        />
        <text x="112" y="60" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#b91c1c">
          {lang === "pl"
            ? "Miesięczny koszt (Burn)"
            : lang === "de"
              ? "Monatliche Kosten (Burn)"
              : "Monthly Burn Rate"}
        </text>
        <text x="112" y="82" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#991b1b">
          $1,000 / mo
        </text>
        <text x="112" y="100" textAnchor="middle" fontSize="9" fill="#7f1d1d">
          Studio, software, insurance
        </text>
      </g>

      {/* Step 2: 6 Month Reserve */}
      {step >= 2 && (
        <g>
          <rect
            x="210"
            y="35"
            width="155"
            height="80"
            rx="8"
            fill="#dcfce7"
            stroke="#16a34a"
            strokeWidth="2"
          />
          <text x="287" y="60" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#15803d">
            {lang === "pl"
              ? "Rezerwa 6 miesięcy"
              : lang === "de"
                ? "6 Monate Reserve"
                : "6-Month Cash Buffer"}
          </text>
          <text x="287" y="82" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#14532d">
            $6,000 in Bank
          </text>
          <text x="287" y="100" textAnchor="middle" fontSize="9" fill="#166534">
            Untouchable safety cushion
          </text>
        </g>
      )}

      {/* Step 3: Runway Independence */}
      {step >= 3 && (
        <g>
          <rect x="40" y="140" width="320" height="70" rx="8" fill="#047857" />
          <text x="200" y="168" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#ffffff">
            {lang === "pl"
              ? "6 miesięcy bezpiecznego pasa startowego (Runway)"
              : lang === "de"
                ? "6 Monate finanzielle Reichweite (Cash Runway)"
                : "6 Months of Bulletproof Runway"}
          </text>
          <text x="200" y="190" textAnchor="middle" fontSize="10.5" fill="#d1fae5">
            {lang === "pl"
              ? "Spokój w martwym sezonie i pewność podejmowania strategicznych decyzji"
              : lang === "de"
                ? "Gelassenheit bei saisonalen Flauten und kluge langfristige Entscheidungen"
                : "Total calm during summer droughts and power to negotiate top rates"}
          </text>
        </g>
      )}
    </svg>
  );
}

function Toy({ onDone }: ToyProps) {
  const [cashBalance, setCashBalance] = useState(1000);
  const [inflowDelay, setInflowDelay] = useState(60); // days

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "center" }}>
      <p style={{ margin: 0, fontWeight: 700, fontSize: "1rem" }}>
        Cash in Bank: ${cashBalance} | Payment Collection Delay: {inflowDelay} Days
      </p>
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          type="button"
          className="btn"
          onClick={() => {
            setInflowDelay((d) => {
              const next = Math.max(10, d - 20);
              setCashBalance((c) => c + 1500);
              if (next <= 20) onDone?.();
              return next;
            });
          }}
        >
          Collect 50% Deposit (+Quick Cash)
        </button>
        <button
          type="button"
          className="btn btn-quiet"
          onClick={() => {
            setCashBalance(1000);
            setInflowDelay(60);
          }}
        >
          Reset Baseline
        </button>
      </div>
      <div
        style={{
          padding: "12px",
          background: inflowDelay <= 30 ? "#eef8ef" : "#ffe3e3",
          borderRadius: "10px",
          width: "100%",
          textAlign: "center",
        }}
      >
        {inflowDelay <= 20
          ? "Mastery: Collecting upfront cash cushions you against supplier deadlines and seasonal droughts!"
          : "Cash squeeze: Long payment delays starve the business even while accounting records show big profits."}
      </div>
    </div>
  );
}

function CashFlowWidget({ onAnswer }: WidgetProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
      <p style={{ margin: 0 }}>
        A business books $10,000 in sales this month on Net 90 terms, but has $4,000 in immediate
        wage bills. Can it pay its staff today?
      </p>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>
        Yes, because it earned $6,000 in accounting profit
      </button>
      <button type="button" className="btn" onClick={() => onAnswer(true)}>
        Only if it already holds at least $4,000 in existing cash reserves
      </button>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>
        Yes, the bank automatically credits unpaid client invoices
      </button>
    </div>
  );
}

export const lesson: Lesson = {
  id: "cash-flow",
  story: [
    animatedBeat(
      [
        T(
          "Meet Karan. He launches a photography studio taking sports and portrait photos for regional high schools.",
          "Das ist Klaus. Er gruendet ein Fotostudio fuer Sport- und Abschlussfotos an Schulen in der Region.",
          "Poznaj Kamila. Otwiera studio fotograficzne wykonujące zdjęcia portretowe i sportowe dla okolicznych szkół.",
        ),
        T(
          "In his first month, the school committee books fifty photo sessions totaling five thousand dollars.",
          "Im ersten Monat bucht das Schulkomitee 50 Termine fuer insgesamt 5.000 Euro.",
          "W pierwszym miesiącu dyrekcja zamawia pięćdziesiąt sesji zdjęciowych o łącznej wartości dwudziestu tysięcy złotych.",
        ),
        T(
          "Karan celebrates his huge book of business until the school sends contract terms: payment will arrive in sixty days.",
          "Klaus jubelt ueber den Grossauftrag, bis er den Vertrag liest: die Zahlung erfolgt erst in 60 Tagen.",
          "Kamil cieszy się z wielkich zleceń, dopóki nie czyta umowy: przelew nastąpi dopiero za sześćdziesiąt dni.",
        ),
      ],
      PhotographyLaunchDiagram,
    ),
    animatedBeat(
      [
        T(
          "Karan immediately encounters the dangerous difference between paper profit and *cash flow timing*.",
          "Klaus erlebt sofort den gefaehrlichen Unterschied zwischen Buchgewinn und echtem *Zahlungsfluss* (Cashflow).",
          "Kamil natychmiast poznaje niebezpieczną różnicę między zyskiem na papierze a *przepływem gotówki*.",
        ),
        T(
          "He must pay two thousand dollars right now for photo lab paper, studio rent, and his assistant hourly wage.",
          "Er muss sofort 2.000 Euro fuer Fotopapier, Studiomiete und den Lohn seines Assistenten bar auslegen.",
          "Musi natychmiast wydać osiem tysięcy złotych na papier fotograficzny, czynsz za studio i wypłatę dla asystenta.",
        ),
        T(
          "With only fifty dollars in his bank account, his business faces bankruptcy before receiving a single school dollar.",
          "Mit nur 50 Euro auf dem Konto droht ihm die Zahlungsunfaehigkeit, noch bevor der erste Euro der Schule fliesst.",
          "Mając na koncie zaledwie dwieście złotych, stoi na krawędzi bankructwa, zanim wpłynie choćby grosz z kontraktu.",
        ),
      ],
      CashTimingDiagram,
    ),
    animatedBeat(
      [
        T(
          "To survive, Karan masters *working capital management*: matching cash inflows to cash outflows.",
          "Um zu ueberleben, lernt Klaus *Working-Capital-Management*: Einnahmen und Ausgaben zeitlich abzustimmen.",
          "Aby przetrwać, Kamil opanowuje *zarządzanie kapitałem obrotowym*: synchronizuje wpływy z wydatkami.",
        ),
        T(
          "He rewrites contracts to require a fifty percent deposit upfront before touching his camera shutter.",
          "Er aendert seine Vertraege: 50 Prozent Anzahlung werden sofort faellig, bevor das erste Foto geschossen wird.",
          "Wprowadza wymóg pięćdziesięcioprocentowej zaliczki przed naciśnięciem spustu migawki aparatu.",
        ),
        T(
          "He also negotiates thirty-day payment terms with the photo printing lab, ensuring cash comes in before expenses go out.",
          "Zudem vereinbart er mit dem Labor 30 Tage Zahlungsziel, sodass Geld eingeht, bevor Rechnungen faellig werden.",
          "Uzgadnia także z drukarnią 30-dniowy termin płatności, dzięki czemu pieniądze od klientów wpływają przed opłaceniem faktur.",
        ),
      ],
      WorkingCapitalDiagram,
    ),
    animatedBeat(
      [
        T(
          "Karan manages his *accounts receivable*: the money clients owe his business for completed work.",
          "Klaus steuert aktiv seine *offenen Forderungen*: das Geld, das Kunden ihm fuer getane Arbeit noch schulden.",
          "Kamil aktywnie zarządza swoimi *należnościami*: pieniędzmi, które klienci są mu winni za wykonane zdjęcia.",
        ),
        T(
          "He offers a two percent early-payment discount if clients wire funds within ten days instead of sixty.",
          "Er bietet zwei Prozent Skonto an, wenn Kunden die Rechnung innerhalb von zehn statt 60 Tagen ueberweisen.",
          "Oferuje dwa procent rabatu (skonto) za wpłatę w ciągu dziesięciu dni zamiast czekania dwóch miesięcy.",
        ),
        T(
          "Clients rush to save money by paying early, converting slow paper invoices into immediate cold bank cash.",
          "Kunden zahlen begeistert sofort, um Geld zu sparen, was papierene Rechnungen in echtes Bankguthaben verwandelt.",
          "Klienci chętnie płacą od ręki, by zaoszczędzić, co zamienia papierowe faktury w natychmiastową gotówkę na koncie.",
        ),
      ],
      InvoicingSafetyDiagram,
    ),
    animatedBeat(
      [
        T(
          "Finally, Karan builds a six-month *cash runway*: a dedicated bank reserve covering all ongoing baseline costs.",
          "Schliesslich baut Klaus eine *Liquiditaetsreserve* fuer sechs Monate auf: ein Schutzpolster fuer alle Fixkosten.",
          "Wreszcie Kamil gromadzi sześciomiesięczną *poduszkę płynności*: rezerwę gotówkową pokrywającą wszystkie koszty stałe.",
        ),
        T(
          "When slow winter months arrive with few events, his cash buffer keeps the studio lights on effortlessly.",
          "Wenn im ruhigen Winter weniger Feste stattfinden, ueberbrueckt das Polster die Flaute voellig stressfrei.",
          "Gdy przychodzą ciche zimowe miesiące z mniejszą liczbą wydarzeń, rezerwa bez trudu utrzymuje studio.",
        ),
        T(
          "Profitability shows whether your business model works, but disciplined cash flow keeps you alive forever.",
          "Gewinn zeigt, ob dein Geschaeftsmodell funktioniert, aber disziplinierter Cashflow haelt dich dauerhaft am Leben.",
          "Zysk pokazuje, czy Twój model biznesowy ma sens, ale zdyscyplinowany przepływ gotówki pozwala firmie przetrwać każdy kryzys.",
        ),
      ],
      CashRunwayDiagram,
    ),
  ],
  toyIntro: T(
    "Experience the cash conversion cycle: shorten client payment delays and collect deposits to protect bank reserves.",
    "Erlebe den Cash-Conversion-Cycle: Verkuerze Zahlungsziele und sammle Anzahlungen, um Reserven zu schuetzen.",
    "Doświadcz cyklu konwersji gotówki: skracaj terminy płatności i pobieraj zaliczki, by chronić rezerwy bankowe.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "Why can a highly profitable business still go bankrupt?",
        "Warum kann ein hochprofitables Unternehmen trotzdem insolvent gehen?",
        "Dlaczego wysoce zyskowna firma może zbankrutować?",
      ),
      options: [
        {
          text: T(
            "Cash timing mismatch: cash runs out to pay immediate expenses before clients pay their invoices",
            "Liquiditaetsluecke: Das Bargeld geht aus, bevor Kunden ihre Rechnungen begleichen",
            "Niedopasowanie terminów płatności: zabraknie gotówki na bieżące wydatki, zanim klienci opłacą faktury",
          ),
          correct: true,
        },
        {
          text: T(
            "Profitable companies are legally required to shut down after one year",
            "Profitable Unternehmen muessen per Gesetz nach einem Jahr schliessen",
            "Rentowne przedsiębiorstwa mają prawny obowiązek zakończenia działalności po roku",
          ),
        },
        {
          text: T(
            "Banks confiscate all profits made by photographers",
            "Banken ziehen saemtliche Gewinne von Fotografen automatisch ein",
            "Banki automatycznie przejmują zyski firm fotograficznych",
          ),
        },
      ],
      hint: T(
        "Focus on the difference between revenue earned on paper versus cash available today.",
        "Achte auf den Unterschied zwischen verbuchtem Ertrag und heute verfuegbarem Bargeld.",
        "Zwróć uwagę na różnicę między przychodem na papierze a gotówką dostępną na koncie dzisiaj.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "What does 'Net 30' or 'Net 60' mean on a business invoice?",
        "Was bedeutet 'Netto 30' oder 'Netto 60' auf einer geschaeftlichen Rechnung?",
        "Co oznacza termin 'Net 30' lub 'Net 60' na fakturze handlowej?",
      ),
      options: [
        {
          text: T(
            "The buyer has 30 or 60 days from invoice date to remit full payment",
            "Der Kaeufer hat 30 oder 60 Tage Zeit, den Betrag vollstaendig zu ueberweisen",
            "Kupujący ma 30 lub 60 dni od daty wystawienia faktury na uregulowanie należności",
          ),
          correct: true,
        },
        {
          text: T(
            "The buyer receives a 30% or 60% permanent discount",
            "Der Kaeufer erhaelt einen dauerhaften Nachlass von 30 oder 60 Prozent",
            "Kupujący otrzymuje stały rabat w wysokości 30 lub 60 procent",
          ),
        },
        {
          text: T(
            "The product will be shipped in 30 or 60 years",
            "Das Produkt wird erst in 30 oder 60 Jahren geliefert",
            "Towar zostanie doręczony za 30 lub 60 lat",
          ),
        },
      ],
      hint: T(
        "It refers to the payment window granted to corporate purchasers.",
        "Es beschreibt das Zahlungsziel fuer gewerbliche Kunden.",
        "Określa termin zapłaty przyznany klientowi biznesowemu.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Evaluate whether a profitable company can pay staff wages when client payments are delayed.",
        "Bewerte, ob ein profitables Unternehmen Gehaelter zahlen kann, wenn Kundengelder spaeter eintreffen.",
        "Oceń, czy zyskowna firma może wypłacić pensje pracownikom przy odroczonych płatnościach od klientów.",
      ),
      Widget: CashFlowWidget,
      hint: T(
        "Remember that wages require actual cash in the bank, not paper accounts receivable.",
        "Bedenke, dass Loehne reales Geld auf dem Konto erfordern, keine offenen Forderungen.",
        "Pamiętaj, że pensje wymagają żywej gotówki na rachunku, a nie papierowych faktur z odroczonym terminem.",
      ),
    },
  ],
  askDad: T(
    "Ask your parent: How does their company manage unpaid customer invoices and make sure cash is ready for payroll?",
    "Frage deine Eltern: Wie geht ihr Arbeitgeber mit offenen Kundenrechnungen um, damit Gehaelter puenktlich gezahlt werden koennen?",
    "Zapytaj rodziców: Jak w ich firmie dba się o spływ należności od kontrahentów, by zawsze wystarczało na pensje pracownicze?",
  ),
  realLife: {
    title: T(
      "Real world: Working capital cycles in aerospace and construction",
      "Echte Welt: Liquiditaetszyklen im Anlagenbau und in der Luftfahrt",
      "Prawdziwy świat: Cykle kapitału obrotowego w budownictwie i lotnictwie",
    ),
    body: T(
      "Companies that build complex products like passenger airplanes or skyscrapers (Boeing, Airbus, or commercial builders) operate on multi-year working capital cycles. They require customers to pay staged milestone payments as construction proceeds. Without these progress deposits, a company would run out of billions in cash before finishing the first vehicle or building.",
      "Hersteller komplexer Grossgueter wie Flugzeuge oder Hochhaeuser (Airbus oder Baukonzerne) arbeiten mit mehrjaehrigen Liquiditaetszyklen. Sie verlangen Meilensteinzahlungen waehrend der Bauphase. Ohne diese Anzahlungen wuerde ihnen das Geld ausgehen, bevor das erste Projekt fertig ist.",
      "Producenci skomplikowanych maszyn lub wieżowców (np. Airbus czy wielkie firmy budowlane) funkcjonują w wieloletnich cyklach kapitału obrotowego. Wymagają płatności ratalnych po ukończeniu kolejnych etapów budowy. Bez tych zaliczek zabrakłoby im miliardów na dokończenie inwestycji.",
    ),
  },
  factCard: {
    claims: [
      {
        text: T(
          "The Cash Conversion Cycle (CCC) measures the time (in days) it takes for a company to convert investments in inventory back into cash inflows from sales.",
          "Der Cash-Conversion-Cycle misst die Dauer in Tagen, bis gebundenes Vorratsvermoegen wieder als Bareinzahlung zurueckfliesst.",
          "Cykl konwersji gotówki (CCC) mierzy czas w dniach, jaki mija od wydania pieniędzy na zapasy do odzyskania gotówki ze sprzedaży.",
        ),
        source: "https://www.investopedia.com/terms/c/cashconversioncycle.asp",
      },
      {
        text: T(
          "A 2020 US Federal Reserve survey of small businesses found that over 60% experienced cash flow difficulties, with delayed client payments cited as a leading driver.",
          "Eine Umfrage der US-Notenbank Federal Reserve ergab, dass ueber 60 Prozent der Kleinbetriebe Liquiditaetsprobleme durch spaete Kundenzahlungen haben.",
          "Badanie Rezerwy Federalnej USA wykazało, że ponad 60 procent małych firm boryka się z problemami z płynnością z powodu opóźnionych wpłat od klientów.",
        ),
        source: "https://www.fedsmallbusiness.org/survey/2021/report-on-employer-firms",
      },
      {
        text: T(
          "Standard commercial payment terms in German B2B commerce (Skonto) frequently offer a 2% or 3% deduction for payment within 10 to 14 days.",
          "Im deutschen Geschaeftsverkehr ist Skonto von 2 bis 3 Prozent bei Zahlung innerhalb von 10 bis 14 Tagen ein ueblicher Standard.",
          "W niemieckim obrocie gospodarczym standardem jest skonto w wysokości 2 do 3 procent przy zapłacie w ciągu 10 do 14 dni.",
        ),
        source: "https://www.gesetze-im-internet.de/bgb/__286.html",
      },
      {
        text: T(
          "International Financial Reporting Standards (IFRS 15) govern the strict separation between revenue recognition and actual cash receipt.",
          "Rechnungslegungsstandards (IFRS 15) regeln die strikte Trennung von Ertragsrealisierung und tatsaechlichem Geldeingang.",
          "Międzynarodowe Standardy Sprawozdawczości Finansowej (MSSF 15) precyzyjnie rozróżniają moment rozpoznania przychodu od rzeczywistego wpływu gotówki.",
        ),
        source:
          "https://www.ifrs.org/issued-standards/list-of-standards/ifrs-15-revenue-from-contracts-with-customers/",
      },
      {
        text: T(
          "Working capital is formally defined on the corporate balance sheet as current assets minus current liabilities.",
          "Das Working Capital ist in der Bilanz definiert als Umlaufvermoegen abzueglich kurzfristiger Verbindlichkeiten.",
          "Kapitał obrotowy netto w bilansie przedsiębiorstwa definiuje się jako aktywa obrotowe pomniejszone o zobowiązania krótkoterminowe.",
        ),
        source: "https://www.britannica.com/money/working-capital",
      },
    ],
    simplified: [
      T(
        "Complex non-cash depreciation and deferred tax assets are omitted to focus on cash timing.",
        "Komplexe bucherische Abschreibungen und latente Steuern wurden weggelassen, um den zeitlichen Zahlungsfluss zu verdeutlichen.",
        "Pominięto księgową amortyzację i odroczony podatek dochodowy, aby skupić uwagę na terminowości przepływu gotówki.",
      ),
    ],
  },
};
