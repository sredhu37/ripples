import { useState } from "react";
import { animatedBeat } from "../../../lesson/toolkit";
import type { DiagramProps, Lesson, Text, ToyProps, WidgetProps } from "../../../lesson/types";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

/**
 * Beat 1: Meet Anjali. Invents a specialized robotic lawn mower for soccer fields.
 * Step 1: Anjali in her robotics workshop.
 * Step 2: The autonomous solar lawn mower mowing field lines perfectly.
 * Step 3: School athletic directors love the product.
 */
function RoboticsLaunchDiagram({ lang, step }: DiagramProps) {
  const anjaliName = lang === "pl" ? "Alicja" : lang === "de" ? "Anna" : "Anjali";
  const label =
    lang === "pl"
      ? "Alicja konstruuje robota koszącego"
      : lang === "de"
        ? "Anna baut ihren autonomen Rasenmaehroboter"
        : "Anjali building robotic sports mower";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect
        x="10"
        y="10"
        width="380"
        height="220"
        rx="14"
        fill="#f8fafc"
        stroke="#0284c7"
        strokeWidth="2"
      />

      {/* Anjali avatar */}
      <g>
        <circle cx="80" cy="110" r="28" fill="#f3cfa6" stroke="#0369a1" strokeWidth="2" />
        <path d="M 52 110 C 52 70 108 70 108 110" fill="#0f172a" />
        <circle cx="72" cy="107" r="2.5" fill="#0f172a" />
        <circle cx="88" cy="107" r="2.5" fill="#0f172a" />
        <path d="M 76 119 Q 80 125 84 119" stroke="#0f172a" strokeWidth="2" fill="none" />
        <path
          d="M 56 185 L 62 140 Q 80 135 98 140 L 104 185 Z"
          fill="#0284c7"
          stroke="#0369a1"
          strokeWidth="2"
        />
        <text x="80" y="205" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0369a1">
          {anjaliName}
        </text>
      </g>

      {/* Robotics Workshop Badge */}
      <g>
        <rect
          x="135"
          y="35"
          width="230"
          height="32"
          rx="6"
          fill="#e0f2fe"
          stroke="#0284c7"
          strokeWidth="1.5"
        />
        <text x="250" y="55" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#0369a1">
          🤖{" "}
          {lang === "pl"
            ? "Robot Koszący Boiska"
            : lang === "de"
              ? "Autonomer Sportplatz-Maeher"
              : "Robotic Turf Mower"}
        </text>
      </g>

      {/* Step 2: The Mower in Action */}
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
            ⚡ 🚜 🌱
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
              ? "Precyzyjne cięcie i zero hałasu"
              : lang === "de"
                ? "Praeziser Schnitt, emissionsfrei"
                : "Laser-straight lines with zero labor"}
          </text>
        </g>
      )}

      {/* Step 3: School Orders */}
      {step >= 3 && (
        <g>
          <rect x="135" y="145" width="230" height="60" rx="8" fill="#15803d" />
          <text x="250" y="170" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#ffffff">
            {lang === "pl"
              ? "Kluby sportowe kupują sprzęt!"
              : lang === "de"
                ? "Sportvereine bestellen begeistert!"
                : "High Schools & Clubs Line Up!"}
          </text>
          <text x="250" y="190" textAnchor="middle" fontSize="10.5" fill="#bbf7d0">
            {lang === "pl"
              ? "Zyskowna nowość na rynku"
              : lang === "de"
                ? "Profitable Innovation im Markt"
                : "Highly profitable new tech hardware"}
          </text>
        </g>
      )}
    </svg>
  );
}

/**
 * Beat 2: The Copycat Threat: Rivals copy features instantly.
 * Step 1: Big overseas factory sees her sales and builds a cheap clone.
 * Step 2: Copycats slash prices by 40%.
 * Step 3: Without a moat, profits evaporate into thin air!
 */
function CopycatThreatDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Zagrożenie klonami i wojna cenowa bez fosy rynkowej"
      : lang === "de"
        ? "Nachahmer-Gefahr und Preiskampf ohne Burggraben"
        : "Copycat threat and price erosion without an economic moat";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect
        x="10"
        y="10"
        width="380"
        height="220"
        rx="14"
        fill="#fafafa"
        stroke="#475569"
        strokeWidth="2"
      />

      {/* Original Product */}
      <g>
        <rect
          x="35"
          y="40"
          width="150"
          height="135"
          rx="8"
          fill="#f0fdf4"
          stroke="#16a34a"
          strokeWidth="1.5"
        />
        <text x="110" y="65" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#15803d">
          {lang === "pl"
            ? "Oryginalny Robot"
            : lang === "de"
              ? "Originales Geraet"
              : "Original Turf Mower"}
        </text>
        <text x="110" y="95" textAnchor="middle" fontSize="22">
          🤖 ✨
        </text>
        <text x="110" y="125" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#166534">
          Price: $3,000
        </text>
        <text x="110" y="145" textAnchor="middle" fontSize="9.5" fill="#15803d">
          {lang === "pl" ? "Zdrowa marża" : lang === "de" ? "Gute Marge" : "High initial margin"}
        </text>
      </g>

      {/* Step 2: Factory Clone */}
      {step >= 2 && (
        <g>
          <rect
            x="215"
            y="40"
            width="150"
            height="135"
            rx="8"
            fill="#fff1f2"
            stroke="#e11d48"
            strokeWidth="1.5"
          />
          <text x="290" y="65" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#be123c">
            {lang === "pl"
              ? "Tani Klon Fabryczny"
              : lang === "de"
                ? "Billiger Nachbau"
                : "Overseas Copycat"}
          </text>
          <text x="290" y="95" textAnchor="middle" fontSize="22">
            ⚠️ 📉
          </text>
          <text x="290" y="125" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#9f1239">
            Price: $1,800 (-40%)
          </text>
          <text x="290" y="145" textAnchor="middle" fontSize="9.5" fill="#be123c">
            {lang === "pl"
              ? "Cięcie cen niszczy zysk"
              : lang === "de"
                ? "Preiskampf vernichtet Marge"
                : "Price war starts"}
          </text>
        </g>
      )}

      {/* Step 3: Erosion lesson */}
      {step >= 3 && (
        <g>
          <rect x="40" y="190" width="320" height="28" rx="6" fill="#7f1d1d" />
          <text
            x="200"
            y="208"
            textAnchor="middle"
            fontSize="10.5"
            fontWeight="bold"
            fill="#ffffff"
          >
            {lang === "pl"
              ? "Dobre pomysły bez ochrony natychmiast przyciągają naśladowców"
              : lang === "de"
                ? "Gute Ideen ohne Schutz locken sofort Kopierer an"
                : "Any profitable product without a moat gets copied within months"}
          </text>
        </g>
      )}
    </svg>
  );
}

/**
 * Beat 3: The Economic Moat: Building competitive advantages.
 * Step 1: Proprietary GPS tracking algorithm (Patent / IP).
 * Step 2: High switching costs (fleet software integration).
 * Step 3: Network effects and brand reputation lock out competitors.
 */
function EconomicMoatDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Fosa rynkowa: patenty, oprogramowanie i bariera wyjścia"
      : lang === "de"
        ? "Der wirtschaftliche Burggraben: Patente, Software und Wechselkosten"
        : "The economic moat: patents, proprietary software, and switching costs";

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

      {/* Castle Moat Illustration */}
      <rect
        x="150"
        y="70"
        width="100"
        height="60"
        rx="8"
        fill="#dbeafe"
        stroke="#2563eb"
        strokeWidth="2"
      />
      <text x="200" y="98" textAnchor="middle" fontSize="18">
        🏰
      </text>
      <text x="200" y="118" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1e40af">
        {lang === "pl" ? "Twoja Firma" : lang === "de" ? "Dein Unternehmen" : "Your Core Firm"}
      </text>

      {/* Step 1: Moat 1: Proprietary Patent */}
      <g>
        <rect
          x="35"
          y="40"
          width="95"
          height="55"
          rx="6"
          fill="#fef3c7"
          stroke="#d97706"
          strokeWidth="1.5"
        />
        <text x="82" y="62" textAnchor="middle" fontSize="14">
          📜 🔒
        </text>
        <text x="82" y="80" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#92400e">
          {lang === "pl" ? "Patent na AI" : lang === "de" ? "KI-Patent" : "Patented GPS"}
        </text>
      </g>

      {/* Step 2: Moat 2: High Switching Costs */}
      {step >= 2 && (
        <g>
          <rect
            x="270"
            y="40"
            width="95"
            height="55"
            rx="6"
            fill="#ede9fe"
            stroke="#7c3aed"
            strokeWidth="1.5"
          />
          <text x="317" y="62" textAnchor="middle" fontSize="14">
            💻 🔗
          </text>
          <text x="317" y="80" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#5b21b6">
            {lang === "pl" ? "Bariera Zmiany" : lang === "de" ? "Wechselkosten" : "Fleet Software"}
          </text>
        </g>
      )}

      {/* Step 3: Moat 3: Brand Trust */}
      {step >= 3 && (
        <g>
          <rect
            x="35"
            y="145"
            width="95"
            height="55"
            rx="6"
            fill="#dcfce7"
            stroke="#16a34a"
            strokeWidth="1.5"
          />
          <text x="82" y="167" textAnchor="middle" fontSize="14">
            ⭐ 🛡️
          </text>
          <text x="82" y="185" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#15803d">
            {lang === "pl" ? "Marka i Zaufanie" : lang === "de" ? "Markenvertrauen" : "Brand Trust"}
          </text>

          <rect x="150" y="150" width="215" height="50" rx="8" fill="#1e3a8a" />
          <text x="257" y="172" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#ffffff">
            {lang === "pl"
              ? "Fosa rynkowa chroni marże"
              : lang === "de"
                ? "Burggraben schuetzt die Marge"
                : "The Moat Defends High Profits"}
          </text>
          <text x="257" y="188" textAnchor="middle" fontSize="9" fill="#bfdbfe">
            {lang === "pl"
              ? "Klienci nie przejdą do tańszego rywala"
              : lang === "de"
                ? "Kunden wechseln nicht zur Billigkopie"
                : "Rivals cannot easily steal your clients"}
          </text>
        </g>
      )}
    </svg>
  );
}

/**
 * Beat 4: Pricing Power: The Ultimate Moat Test.
 * Step 1: Inflation raises lithium battery prices by 10%.
 * Step 2: A company without a moat cannot raise prices without losing buyers.
 * Step 3: Anjali raises prices by 12% and retains 100% of her clients!
 */
function PricingPowerMoatDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Siła ustalania cen jako ostateczny sprawdzian fosy"
      : lang === "de"
        ? "Preissetzungsmacht als Beweis des Burggrabens"
        : "Pricing power as the ultimate test of a business moat";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect
        x="10"
        y="10"
        width="380"
        height="220"
        rx="14"
        fill="#fffbeb"
        stroke="#b45309"
        strokeWidth="2"
      />

      {/* Commodity seller */}
      <g>
        <rect
          x="35"
          y="40"
          width="155"
          height="140"
          rx="8"
          fill="#fff1f2"
          stroke="#e11d48"
          strokeWidth="1.5"
        />
        <text x="112" y="65" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#be123c">
          {lang === "pl"
            ? "Zwykły Towar (Brak Fosy)"
            : lang === "de"
              ? "Ohne Burggraben"
              : "No Moat Commodity"}
        </text>
        <text x="112" y="95" textAnchor="middle" fontSize="22">
          🚫 😰
        </text>
        <text x="112" y="120" textAnchor="middle" fontSize="10" fill="#9f1239">
          {lang === "pl"
            ? "Podwyżka o 5%?"
            : lang === "de"
              ? "Preise um 5% erhoeht?"
              : "Raise price +5%?"}
        </text>
        <rect x="45" y="135" width="135" height="30" rx="4" fill="#fecdd3" />
        <text x="112" y="154" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#9f1239">
          {lang === "pl"
            ? "Klienci natychmiast uciekają"
            : lang === "de"
              ? "Kunden springen sofort ab"
              : "Clients flee to rivals"}
        </text>
      </g>

      {/* Step 2: Moat with Pricing Power */}
      {step >= 2 && (
        <g>
          <rect
            x="210"
            y="40"
            width="155"
            height="140"
            rx="8"
            fill="#f0fdf4"
            stroke="#16a34a"
            strokeWidth="2"
          />
          <text x="287" y="65" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#15803d">
            {lang === "pl"
              ? "Firma z Silną Fosą"
              : lang === "de"
                ? "Mit starkem Burggraben"
                : "Protected by Moat"}
          </text>
          <text x="287" y="95" textAnchor="middle" fontSize="22">
            👑 📈
          </text>
          <text x="287" y="120" textAnchor="middle" fontSize="10" fill="#166534">
            {lang === "pl"
              ? "Podwyżka o 12%"
              : lang === "de"
                ? "Preise um 12% erhoeht"
                : "Price raised +12%"}
          </text>
          <rect x="220" y="135" width="135" height="30" rx="4" fill="#bbf7d0" />
          <text x="287" y="154" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#14532d">
            {lang === "pl"
              ? "100% klientów zostaje"
              : lang === "de"
                ? "100% Kundentreue"
                : "100% Retention"}
          </text>
        </g>
      )}

      {/* Step 3: Buffett quote */}
      {step >= 3 && (
        <g>
          <rect x="35" y="195" width="330" height="25" rx="4" fill="#78350f" />
          <text
            x="200"
            y="212"
            textAnchor="middle"
            fontSize="10.5"
            fontWeight="bold"
            fill="#ffffff"
          >
            {lang === "pl"
              ? "Siła ustalania cen to najważniejszy wyznacznik świetnego biznesu"
              : lang === "de"
                ? "Preissetzungsmacht ist das wichtigste Kriterium fuer Qualitaet"
                : "Pricing power is the single most important metric of business quality"}
          </text>
        </g>
      )}
    </svg>
  );
}

/**
 * Beat 5: Sustaining the Advantage.
 * Step 1: Reinvest profits into cutting-edge R&D.
 * Step 2: Widening the moat year after year.
 * Step 3: An invincible long-term market leader!
 */
function WideningMoatDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Poszerzanie fosy rynkowej i długoterminowa dominacja"
      : lang === "de"
        ? "Vertiefung des Burggrabens und langfristige Marktleitung"
        : "Widening the moat through continuous reinvestment";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect
        x="10"
        y="10"
        width="380"
        height="220"
        rx="14"
        fill="#f5f3ff"
        stroke="#6d28d9"
        strokeWidth="2"
      />

      {/* Moat progression */}
      <g>
        <rect
          x="35"
          y="45"
          width="90"
          height="75"
          rx="6"
          fill="#ede9fe"
          stroke="#7c3aed"
          strokeWidth="1.5"
        />
        <text x="80" y="70" textAnchor="middle" fontSize="18">
          🌱
        </text>
        <text x="80" y="90" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#5b21b6">
          Year 1
        </text>
        <text x="80" y="106" textAnchor="middle" fontSize="9" fill="#6d28d9">
          Narrow moat
        </text>
      </g>

      {/* Step 2: Year 3 */}
      {step >= 2 && (
        <g>
          <path d="M 130 82 L 165 82" stroke="#6d28d9" strokeWidth="3" markerEnd="url(#arrow)" />
          <rect
            x="170"
            y="45"
            width="90"
            height="75"
            rx="6"
            fill="#ddd6fe"
            stroke="#6d28d9"
            strokeWidth="1.5"
          />
          <text x="215" y="70" textAnchor="middle" fontSize="18">
            🌿
          </text>
          <text x="215" y="90" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#4c1d95">
            Year 3
          </text>
          <text x="215" y="106" textAnchor="middle" fontSize="9" fill="#5b21b6">
            Software lock
          </text>
        </g>
      )}

      {/* Step 3: Year 5 Unstoppable */}
      {step >= 3 && (
        <g>
          <path d="M 265 82 L 300 82" stroke="#6d28d9" strokeWidth="3" markerEnd="url(#arrow)" />
          <rect
            x="305"
            y="45"
            width="65"
            height="75"
            rx="6"
            fill="#c4b5fd"
            stroke="#4c1d95"
            strokeWidth="2"
          />
          <text x="337" y="70" textAnchor="middle" fontSize="18">
            🌳 🏆
          </text>
          <text x="337" y="90" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#2e1065">
            Year 5
          </text>
          <text x="337" y="106" textAnchor="middle" fontSize="9" fill="#4c1d95">
            Fortress
          </text>

          <rect x="40" y="145" width="320" height="60" rx="8" fill="#4c1d95" />
          <text x="200" y="170" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#ffffff">
            {lang === "pl"
              ? "Świetne firmy stale poszerzają swoją fosę rynkową"
              : lang === "de"
                ? "Erfolgreiche Unternehmen vertiefen ihren Burggraben unaufhoerlich"
                : "Great enterprises widen their moat continuously every single year"}
          </text>
          <text x="200" y="188" textAnchor="middle" fontSize="10" fill="#e9d5ff">
            {lang === "pl"
              ? "Innowacja i relacje z klientami dają trwałą niezależność"
              : lang === "de"
                ? "Innovation und Kundenbindung sichern ueberlegene Renditen"
                : "High return on capital creates permanent business compounding"}
          </text>
        </g>
      )}
    </svg>
  );
}

function Toy({ onDone }: ToyProps) {
  const [moatStrength, setMoatStrength] = useState(1); // 1 to 5
  const price = 100 + moatStrength * 25;
  const customerLoss = Math.max(0, 30 - moatStrength * 6);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "center" }}>
      <p style={{ margin: 0, fontWeight: 700, fontSize: "1rem" }}>
        Moat Level: {moatStrength}/5 | Price: ${price} | Customer Churn on Price Hike:{" "}
        {customerLoss}%
      </p>
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          type="button"
          className="btn"
          onClick={() => {
            setMoatStrength((m) => {
              const next = Math.min(5, m + 1);
              if (next >= 4) onDone?.();
              return next;
            });
          }}
        >
          Widen Moat (Add Software & Patents)
        </button>
        <button type="button" className="btn btn-quiet" onClick={() => setMoatStrength(1)}>
          Reset Baseline
        </button>
      </div>
      <div
        style={{
          padding: "12px",
          background: moatStrength >= 4 ? "#eef8ef" : "#fff9db",
          borderRadius: "10px",
          width: "100%",
          textAlign: "center",
        }}
      >
        {moatStrength >= 4
          ? "Fortress Moat: You hold tremendous pricing power! Rivals cannot easily take your customer base."
          : "Vulnerable: Competitors can easily match your features and drive your prices down."}
      </div>
    </div>
  );
}

function MoatWidget({ onAnswer }: WidgetProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
      <p style={{ margin: 0 }}>
        Which of the following creates a genuine economic moat with high switching costs?
      </p>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>
        Selling identical bottles of plain tap water
      </button>
      <button type="button" className="btn" onClick={() => onAnswer(true)}>
        An integrated medical records software system storing 10 years of patient hospital history
      </button>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>
        Offering a 10% coupon code on social media
      </button>
    </div>
  );
}

export const lesson: Lesson = {
  id: "competition",
  story: [
    animatedBeat(
      [
        T(
          "Meet Anjali. She invents a specialized autonomous robotic lawn mower designed specifically for school athletic fields.",
          "Das ist Anna. Sie entwickelt einen spezialisierten Maehroboter fuer die Rasenflaechen von Schulsportplaetzen.",
          "Poznaj Alicję. Konstruuje wyspecjalizowanego, autonomicznego robota koszącego płyty boisk szkolnych.",
        ),
        T(
          "Her prototype works flawlessly: cutting grass with laser accuracy while saving schools thousands in groundskeeping costs.",
          "Ihr Prototyp maeht mit Laserpraezision und spart den Schulen Tausende Euro an Personalkosten.",
          "Jej prototyp działa bezbłędnie: tnie trawę z laserową precyzją, oszczędzając szkołom tysiące złotych na obsłudze.",
        ),
        T(
          "Athletic directors immediately place orders, and Anjali earns handsome profits on every machine she delivers.",
          "Die Schulleitungen bestellen begeistert, und Anna erzielt hohe Gewinne mit jedem gelieferten Geraet.",
          "Dyrektorzy szkół natychmiast składają zamówienia, a Alicja notuje wysoki zysk na każdej dostarczonej maszynie.",
        ),
      ],
      RoboticsLaunchDiagram,
    ),
    animatedBeat(
      [
        T(
          "High profit margins act as a giant beacon attracting competitors, copycats, and overseas factories.",
          "Hohe Gewinnspannen wirken wie ein Magnet auf Konkurrenten, Nachahmer und auslaendische Fabriken.",
          "Wysokie marże działają jak magnes na konkurentów, naśladowców i wielkie zagraniczne fabryki.",
        ),
        T(
          "Within six months, a mass-market hardware company copies her chassis and sells a clone at a forty percent discount.",
          "Nach sechs Monaten kopiert ein Grosshersteller ihr Gehaeuse und wirft einen Nachbau mit 40% Rabatt auf den Markt.",
          "Po pół roku masowy producent kopiuje jej obudowę i wypuszcza podobny model z 40-procentowym rabatem.",
        ),
        T(
          "Without protection, Anjali faces a brutal price war that threatens to destroy her young robotics business.",
          "Ohne Schutz droht Anna ein brutaler Preiskampf, der ihr junges Unternehmen zu zerstoeren droht.",
          "Bez odpowiedniej ochrony Alicja staje przed brutalną wojną cenową, która może zniszczyć jej firmę.",
        ),
      ],
      CopycatThreatDiagram,
    ),
    animatedBeat(
      [
        T(
          "To survive and flourish, Anjali builds an *economic moat*: a structural barrier that protects her profits from rivals.",
          "Um dauerhaft erfolgreich zu sein, baut Anna einen *Burggraben* (Economic Moat): einen Schutzwall gegen Rivalen.",
          "Aby przetrwać i wygrywać, Alicja buduje *fosę rynkową* (economic moat): barierę chroniącą jej zyski przed konkurencją.",
        ),
        T(
          "She patents her proprietary turf-density sensor algorithms, preventing competitors from duplicating her neat cut quality.",
          "Sie laesst ihre Sensorik patentieren, sodass Nachahmer die Schnittqualitaet rechtlich nicht kopieren duerfen.",
          "Patentuje algorytm czujników gęstości darni, uniemożliwiając rywalom osiągnięcie tak doskonałego cięcia.",
        ),
        T(
          "She builds fleet management software into schools' maintenance schedules, creating high *switching costs*.",
          "Sie integriert Steuerungssoftware in den Schulbetrieb, was hohe *Wechselkosten* fuer die Kunden schafft.",
          "Wprowadza oprogramowanie zintegrowane z harmonogramem szkoły, tworząc wysokie *bariery wyjścia* (switching costs).",
        ),
      ],
      EconomicMoatDiagram,
    ),
    animatedBeat(
      [
        T(
          "Investor Warren Buffett taught that the single most important test of a business moat is its *pricing power*.",
          "Starinvestor Warren Buffett lehrte: Der ultimative Beweis fuer einen Burggraben ist die *Preissetzungsmacht*.",
          "Inwestor Warren Buffett mawiał: ostatecznym testem fosy rynkowej jest *siła ustalania cen* (pricing power).",
        ),
        T(
          "When battery costs rise by ten percent, a weak commodity maker cannot raise prices without losing buyers.",
          "Steigen die Akkupreise, kann ein gewoehnlicher Hersteller die Preise nicht erhoehen, ohne Kunden zu verlieren.",
          "Gdy drożeją akumulatory, przeciętny producent nie może podnieść cen, bo natychmiast straci klientów.",
        ),
        T(
          "Because schools depend on Anjali's software and reliable service, she raises prices twelve percent without losing a single school.",
          "Weil die Schulen Annas Software schaetzen, erhoeht sie um zwoelf Prozent und behaelt alle Kunden.",
          "Ponieważ szkoły cenią system i wsparcie Alicji, podnosi cenę o dwanaście procent, nie tracąc ani jednego klienta.",
        ),
      ],
      PricingPowerMoatDiagram,
    ),
    animatedBeat(
      [
        T(
          "An economic moat is not static: successful founders reinvest their profits every year to widen their defensive moat.",
          "Ein Burggraben ist nicht starr: Erfolgreiche Gruender investieren ihre Gewinne staendig, um ihn zu verbreitern.",
          "Fosa rynkowa nie jest wieczna: najlepsi założyciele co roku reinwestują zyski, by jeszcze bardziej ją poszerzać.",
        ),
        T(
          "By adding automated fertilizer sprayers, solar recharging docks, and university sports contracts, she stays years ahead.",
          "Mit Solar-Ladestationen und erweiterten Vertraegen sichert sie sich jahrelangen Vorsprung vor allen Nachahmern.",
          "Dodając stacje ładowania solarnego i kontrakty z ligami akademickimi, wyprzedza konkurencję o całe lata.",
        ),
        T(
          "Do not merely build a great product: build an enduring economic fortress that protects your hard-earned value.",
          "Baue nicht nur ein gutes Produkt: errichte eine wirtschaftliche Festung, die deinen geschaffenen Wert schuetzt.",
          "Nie buduj jedynie dobrego produktu: stwórz ekonomiczną twierdzę, która trwale obroni wypracowaną wartość.",
        ),
      ],
      WideningMoatDiagram,
    ),
  ],
  toyIntro: T(
    "Test how strengthening your economic moat grants pricing power and shields your enterprise from copycat price wars.",
    "Teste, wie ein starker Burggraben Preissetzungsmacht verleiht und dein Unternehmen vor Billigkopien schuetzt.",
    "Sprawdź, jak budowa fosy rynkowej daje siłę kształtowania cen i chroni firmę przed wojnami cenowymi.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "What is an 'economic moat' in enterprise strategy?",
        "Was versteht man unter einem 'wirtschaftlichen Burggraben' (Economic Moat)?",
        "Czym jest 'fosa rynkowa' (economic moat) w strategii biznesowej?",
      ),
      options: [
        {
          text: T(
            "A sustainable competitive advantage that protects a company's profits and market share from rivals",
            "Ein dauerhafter Wettbewerbsvorteil, der Gewinne und Marktanteile vor Rivalen schuetzt",
            "Trwała przewaga konkurencyjna chroniąca zyski i udział firmy w rynku przed rywalami",
          ),
          correct: true,
        },
        {
          text: T(
            "A deep water trench dug around the corporate headquarters building",
            "Ein tiefer Wassergraben rund um das Hauptgebaeude der Firmenzentrale",
            "Głęboki rów z wodą wykopany wokół biurowca firmy",
          ),
        },
        {
          text: T(
            "A short-term temporary clearance sale discount banner",
            "Ein kurzfristiges Rabattbanner fuer den saisonalen Raeumungsverkauf",
            "Tymczasowy baner reklamujący posezonową wyprzedaż",
          ),
        },
      ],
      hint: T(
        "Think about long-term defenses against competitors matching your offerings.",
        "Denke an langfristige Schutzmechanismen gegen konkurrierende Nachahmer.",
        "Pomyśl o trwałych barierach uniemożliwiających konkurencji skopiowanie oferty.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "Why are high switching costs a powerful form of economic moat?",
        "Warum stellen hohe Wechselkosten (Switching Costs) einen starken Burggraben dar?",
        "Dlaczego wysokie koszty zmiany dostawcy (switching costs) tworzą silną fosę?",
      ),
      options: [
        {
          text: T(
            "Customers face high expense, technical friction, or retraining time if they switch to a rival",
            "Kunden muessten viel Zeit, Muehe oder Geld aufwenden, um zu einem Konkurrenten zu wechseln",
            "Klienci musieliby ponieść duże koszty finansowe, czasowe lub organizacyjne przy przejściu do konkurenta",
          ),
          correct: true,
        },
        {
          text: T(
            "Government regulations forbid consumers from ever buying from a second vendor",
            "Gesetze verbieten es Verbrauchern streng, jemals bei einem zweiten Anbieter zu kaufen",
            "Przepisy prawne kategorycznie zabraniają klientom kupowania u innego dostawcy",
          ),
        },
        {
          text: T(
            "Rival companies automatically go bankrupt whenever a new competitor enters",
            "Konkurrenten gehen automatisch pleite, sobald ein neuer Anbieter den Markt betritt",
            "Firmy konkurencyjne automatycznie bankrutują po pojawieniu się rywala",
          ),
        },
      ],
      hint: T(
        "Consider how painful or disruptive it is for an organization to replace an embedded software system.",
        "Ueberlege, wie aufwaendig der Austausch eines eingespielten Softwaresystems fuer Kunden waere.",
        "Zastanów się, jak uciążliwa dla klienta jest zmiana wdrożonego systemu oprogramowania.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Identify which business model possesses an authentic economic moat with high switching costs.",
        "Erkenne, welches Geschaeftsmodell einen echten Burggraben mit hohen Wechselkosten besitzt.",
        "Wskaż, który model biznesowy opiera się na rzeczywistej fosie rynkowej o wysokich kosztach zmiany dostawcy.",
      ),
      Widget: MoatWidget,
      hint: T(
        "Look for deep integration and difficult-to-replace stored historical data.",
        "Achte auf tiefe Integration und schwer ersetzbare historische Daten.",
        "Szukaj głębokiej integracji operacyjnej i trudnych do przeniesienia danych historycznych.",
      ),
    },
  ],
  askDad: T(
    "Ask your parent: What competitive advantages or moats stop other companies from replacing their product or service?",
    "Frage deine Eltern: Welche Wettbewerbsvorteile oder Burggraeben hindern Rivalen daran, ihr Angebot zu verdraengen?",
    "Zapytaj rodziców: Jakie przewagi konkurencyjne lub fosy rynkowe chronią ich firmę przed zastąpieniem przez rywali?",
  ),
  realLife: {
    title: T(
      "Real world: Enterprise software switching costs and the Apple ecosystem",
      "Echte Welt: Hohe Wechselkosten bei Software und im Apple-Oekosystem",
      "Prawdziwy świat: Koszty zmiany dostawcy w systemach korporacyjnych i ekosystemie Apple",
    ),
    body: T(
      "Companies like Microsoft or Apple command tremendous economic moats. Once a hospital or corporation trains thousands of employees on specific database infrastructure, switching to an alternative would cost millions in downtime and retraining. Similarly, users with iCloud photos, iMessage history, and Apple Watches face friction when trying to switch to another smartphone.",
      "Unternehmen wie Microsoft oder Apple besitzen gigantische Burggraeben. Hat ein Krankenhaus Tausende Mitarbeiter auf eine Software geschult, wuerde ein Wechsel Millionen kosten. Ebenso bleiben Smartphone-Nutzer durch iCloud, Chatverlaeufe und Zubehoer treu, weil der Wechsel muehsam waere.",
      "Giganci technologiczni tacy jak Microsoft czy Apple dysponują potężnymi fosami rynkowymi. Gdy szpital przeszkoli personel z obsługi bazy danych, zmiana systemu kosztowałaby miliony w przestojach. Podobnie użytkownicy korzystający z chmury, komunikatorów i akcesoriów rzadko zmieniają markę telefonu z uwagi na uciążliwość przenosin.",
    ),
  },
  factCard: {
    claims: [
      {
        text: T(
          "Warren Buffett popularized the concept of the 'economic moat' during his 1995 Berkshire Hathaway annual shareholder address.",
          "Warren Buffett praegte den Begriff des 'wirtschaftlichen Burggrabens' (Economic Moat) auf der Hauptversammlung 1995.",
          "Warren Buffett spopularyzował pojęcie 'fosy rynkowej' (economic moat) podczas walnego zgromadzenia Berkshire Hathaway w 1995 roku.",
        ),
        source: "https://www.berkshirehathaway.com/letters/1995.html",
      },
      {
        text: T(
          "Michael Porter formulated the Five Forces framework in 1979 to analyze competitive intensity and attractive industry profit margins.",
          "Michael Porter entwickelte 1979 das 'Five Forces'-Modell zur Analyse von Branchenstrukturen und Wettbewerbsintensitaet.",
          "Michael Porter opublikował w 1979 roku model pięciu sił służący do analizy atrakcyjności i natężenia konkurencji w sektorze.",
        ),
        source: "https://hbr.org/1979/03/how-competitive-forces-shape-strategy",
      },
      {
        text: T(
          "Morningstar classifies company moats into five categories: network effects, switching costs, cost advantages, intangible assets, and efficient scale.",
          "Morningstar unterteilt Burggraeben in fuenf Kategorien: Netzwerkeffekte, Wechselkosten, Kostenvorteile, immaterielle Werte und Groessenvorteile.",
          "Agencja Morningstar dzieli fosy rynkowe na pięć filarów: efekty sieciowe, koszty zmiany, przewagi kosztowe, aktywa niematerialne i korzyści skali.",
        ),
        source: "https://www.morningstar.com/articles/864385/the-concept-of-economic-moat",
      },
      {
        text: T(
          "The German Patent and Trademark Office (DPMA) grants 20-year legal protection against unauthorized copying of industrial inventions.",
          "Das Deutsche Patent- und Markenamt (DPMA) gewaehrt 20 Jahre rechtlichen Schutz vor Nachahmung technischer Erfindungen.",
          "Niemiecki Urząd Patentów i Znaków Towarowych (DPMA) przyznaje 20-letnią ochronę prawną przed kopiowaniem innowacji technicznych.",
        ),
        source: "https://www.dpma.de/patente/patentschutz/index.html",
      },
      {
        text: T(
          "Return on Invested Capital (ROIC) sustained consistently above the Weighted Average Cost of Capital (WACC) serves as empirical proof of an economic moat.",
          "Eine Gesamtkapitalrendite (ROIC) dauerhaft ueber den Kapitalkosten (WACC) gilt als empirischer Nachweis eines echten Burggrabens.",
          "Stopa zwrotu z zainwestowanego kapitału (ROIC) trwale przewyższająca średni ważony koszt kapitału (WACC) stanowi empiryczny dowód istnienia fosy rynkowej.",
        ),
        source: "https://www.investopedia.com/terms/e/economicmoat.asp",
      },
    ],
    simplified: [
      T(
        "Complex antitrust monopolistic litigation standards are simplified into basic competitive dynamics between innovators and copycats.",
        "Komplexe kartellrechtliche Verfahren wurden auf verstaendliche Marktmechanismen zwischen Pionieren und Nachahmern reduziert.",
        "Złożone postępowania antymonopolowe uproszczono do czytelnych reguł rywalizacji rynkowej między innowatorem a naśladowcami.",
      ),
    ],
  },
};
