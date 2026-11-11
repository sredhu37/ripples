import { useState } from "react";
import { animatedBeat } from "../../../lesson/toolkit";
import type { DiagramProps, Lesson, Text, ToyProps, WidgetProps } from "../../../lesson/types";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

/**
 * Beat 1: Meet Arjun. Pulls garden weeds for neighbors at $10/hour. High supply, low pay.
 * Step 1: Arjun ready for summer jobs.
 * Step 2: Arjun pulling weeds in the garden with basic trowel.
 * Step 3: High supply of neighbor helpers keeps rate at $10/hr.
 */
function WeedPullingDiagram({ lang, step }: DiagramProps) {
  const arjunName = lang === "pl" ? "Jan" : lang === "de" ? "Lukas" : "Arjun";
  const jobTitle =
    lang === "pl" ? "Pielenie chwastów" : lang === "de" ? "Unkraut jäten" : "Pulling Weeds";
  const label =
    lang === "pl"
      ? "Jan wyrywa chwasty za niską stawkę"
      : lang === "de"
        ? "Lukas jätet Unkraut fuer geringen Lohn"
        : "Arjun pulling weeds at low wage";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
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

      {/* Arjun avatar */}
      <g>
        <circle cx="90" cy="110" r="28" fill="#f3cfa6" stroke="#23383f" strokeWidth="2" />
        <path d="M 62 105 C 62 70 118 70 118 105" fill="#1e293b" />
        <circle cx="82" cy="107" r="2.5" fill="#23383f" />
        <circle cx="98" cy="107" r="2.5" fill="#23383f" />
        <path d="M 86 120 Q 90 126 94 120" stroke="#23383f" strokeWidth="2" fill="none" />
        <path
          d="M 66 185 L 72 140 Q 90 135 108 140 L 114 185 Z"
          fill="#0284c7"
          stroke="#23383f"
          strokeWidth="2"
        />
        <text x="90" y="205" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0369a1">
          {arjunName}
        </text>
      </g>

      {/* Step 1: Summer goal pill */}
      <g>
        <rect
          x="50"
          y="22"
          width="160"
          height="26"
          rx="6"
          fill="#e0f2fe"
          stroke="#0284c7"
          strokeWidth="1"
        />
        <text x="130" y="39" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0369a1">
          {lang === "pl" ? "Letnia praca" : lang === "de" ? "Sommerjob" : "Summer Earning"}
        </text>
      </g>

      {/* Step 2: Garden weeds & trowel */}
      {step >= 2 && (
        <g>
          <rect
            x="160"
            y="70"
            width="130"
            height="85"
            rx="8"
            fill="#f0fdf4"
            stroke="#16a34a"
            strokeWidth="1.5"
          />
          <text x="225" y="95" textAnchor="middle" fontSize="22">
            🌿 🌱
          </text>
          <text x="225" y="120" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#15803d">
            {jobTitle}
          </text>
          <text x="225" y="140" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#b91c1c">
            {lang === "pl" ? "40 zł / godz." : lang === "de" ? "10 € / Std." : "$10 / hr"}
          </text>
        </g>
      )}

      {/* Step 3: High supply crowd of helpers */}
      {step >= 3 && (
        <g>
          <rect
            x="150"
            y="175"
            width="230"
            height="42"
            rx="6"
            fill="#fff1f2"
            stroke="#f43f5e"
            strokeWidth="1"
          />
          <text
            x="265"
            y="193"
            textAnchor="middle"
            fontSize="10.5"
            fontWeight="bold"
            fill="#be123c"
          >
            {lang === "pl"
              ? "Mnóstwo chętnych: duża konkurencja"
              : lang === "de"
                ? "Hohes Angebot: Viele Teenager helfen"
                : "High Supply: Anyone can pull weeds"}
          </text>
          <text x="265" y="208" textAnchor="middle" fontSize="10" fill="#9f1239">
            {lang === "pl"
              ? "Stawka nie rośnie"
              : lang === "de"
                ? "Stundenlohn bleibt gering"
                : "Wages stay low"}
          </text>
        </g>
      )}
    </svg>
  );
}

/**
 * Beat 2: Arjun learns custom sneaker airbrush painting. Rare skill = $50/pair.
 * Step 1: Learns airbrush craft.
 * Step 2: Beautiful custom waterproof sneakers finished.
 * Step 3: Customers happily pay $50/pair. Human capital created!
 */
function SneakerCraftDiagram({ lang, step }: DiagramProps) {
  const arjunName = lang === "pl" ? "Jan" : lang === "de" ? "Lukas" : "Arjun";
  const banner =
    lang === "pl"
      ? "Kapitał ludzki: Rzadkie umiejętności"
      : lang === "de"
        ? "Humankapital: Seltene Faehigkeiten"
        : "Human Capital: Rare Skill";
  const label =
    lang === "pl"
      ? "Jan maluje buty aerografem i zarabia więcej"
      : lang === "de"
        ? "Lukas bemalt Sneaker mit Airbrush fuer hoeheren Lohn"
        : "Arjun painting sneakers with airbrush earning higher pay";

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

      {/* Header */}
      <rect
        x="60"
        y="20"
        width="280"
        height="26"
        rx="6"
        fill="#f3e8ff"
        stroke="#9333ea"
        strokeWidth="1"
      />
      <text x="200" y="37" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#6b21a8">
        {banner}
      </text>

      {/* Arjun with airbrush tool */}
      <g>
        <circle cx="85" cy="115" r="28" fill="#f3cfa6" stroke="#23383f" strokeWidth="2" />
        <path d="M 57 110 C 57 75 113 75 113 110" fill="#1e293b" />
        <circle cx="77" cy="112" r="2.5" fill="#23383f" />
        <circle cx="93" cy="112" r="2.5" fill="#23383f" />
        <path d="M 81 125 Q 85 131 89 125" stroke="#23383f" strokeWidth="2" fill="none" />
        <path
          d="M 61 185 L 67 145 Q 85 140 103 145 L 109 185 Z"
          fill="#9333ea"
          stroke="#23383f"
          strokeWidth="2"
        />
        <text x="85" y="205" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#581c87">
          {arjunName}
        </text>
      </g>

      {/* Step 1: Learning airbrush tool */}
      {step >= 1 && (
        <g>
          <rect
            x="135"
            y="70"
            width="100"
            height="45"
            rx="6"
            fill="#ede9fe"
            stroke="#8b5cf6"
            strokeWidth="1"
          />
          <text x="185" y="88" textAnchor="middle" fontSize="16">
            🎨 🖌️
          </text>
          <text x="185" y="105" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#5b21b6">
            {lang === "pl"
              ? "Nauka aerografu"
              : lang === "de"
                ? "Airbrush-Technik"
                : "Airbrush Skill"}
          </text>
        </g>
      )}

      {/* Step 2: Custom finished sneakers */}
      {step >= 2 && (
        <g>
          <rect
            x="255"
            y="70"
            width="115"
            height="75"
            rx="8"
            fill="#ffffff"
            stroke="#a855f7"
            strokeWidth="1.5"
          />
          <text x="312" y="98" textAnchor="middle" fontSize="24">
            👟✨
          </text>
          <text
            x="312"
            y="122"
            textAnchor="middle"
            fontSize="10.5"
            fontWeight="bold"
            fill="#6b21a8"
          >
            {lang === "pl" ? "Unikalne buty" : lang === "de" ? "Custom Sneaker" : "Custom Sneakers"}
          </text>
        </g>
      )}

      {/* Step 3: 5x pay jump */}
      {step >= 3 && (
        <g>
          <rect
            x="135"
            y="155"
            width="235"
            height="52"
            rx="8"
            fill="#dcfce7"
            stroke="#16a34a"
            strokeWidth="1.5"
          />
          <text x="252" y="176" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#15803d">
            {lang === "pl"
              ? "Zarobek: 200 zł za parę! (5x więcej)"
              : lang === "de"
                ? "Verdienst: 50 € pro Paar! (5x mehr)"
                : "Earns: $50 / pair! (5x jump)"}
          </text>
          <text x="252" y="195" textAnchor="middle" fontSize="10" fill="#166534">
            {lang === "pl"
              ? "Klienci chętnie płacą za rzadki talent"
              : lang === "de"
                ? "Kunden zahlen gerne fuer Kunstfertigkeit"
                : "Customers pay for rare talent"}
          </text>
        </g>
      )}
    </svg>
  );
}

/**
 * Beat 3: Scarcity of talent dictates compensation.
 * Step 1: 15-minute task -> huge labor supply -> low wage.
 * Step 2: Multi-year specialized craft -> tiny labor supply.
 * Step 3: Employers compete and bid up wages.
 */
function ScarcityAndWagesDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Wycena rzadkości umiejętności na rynku"
      : lang === "de"
        ? "Knappheit von Faehigkeiten bestimmt den Lohn"
        : "Scarcity of skills drives wages";

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

      {/* Step 1: Easy task card */}
      <g>
        <rect
          x="30"
          y="45"
          width="155"
          height="150"
          rx="10"
          fill="#fff"
          stroke="#94a3b8"
          strokeWidth="1.5"
        />
        <rect x="40" y="55" width="135" height="24" rx="4" fill="#f1f5f9" />
        <text x="107" y="71" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#475569">
          {lang === "pl"
            ? "Zadanie w 15 minut"
            : lang === "de"
              ? "15-Minuten-Aufgabe"
              : "15-Minute Task"}
        </text>
        <text x="107" y="105" textAnchor="middle" fontSize="18">
          👥👥👥
        </text>
        <text x="107" y="125" textAnchor="middle" fontSize="10.5" fill="#64748b">
          {lang === "pl" ? "Ogromna podaż" : lang === "de" ? "Riesiges Angebot" : "Huge Supply"}
        </text>
        <rect
          x="50"
          y="145"
          width="115"
          height="28"
          rx="6"
          fill="#fee2e2"
          stroke="#ef4444"
          strokeWidth="1"
        />
        <text x="107" y="163" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#b91c1c">
          {lang === "pl" ? "Niska stawka" : lang === "de" ? "Geringer Lohn" : "Low Wage"}
        </text>
      </g>

      {/* Step 2: Rare craft card */}
      {step >= 2 && (
        <g>
          <rect
            x="215"
            y="45"
            width="155"
            height="150"
            rx="10"
            fill="#f0fdfa"
            stroke="#0d9488"
            strokeWidth="2"
          />
          <rect x="225" y="55" width="135" height="24" rx="4" fill="#ccfbf1" />
          <text x="292" y="71" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#0f766e">
            {lang === "pl"
              ? "Lata ćwiczeń i pasji"
              : lang === "de"
                ? "Jahrelange Uebung"
                : "Years of Mastery"}
          </text>
          <text x="292" y="105" textAnchor="middle" fontSize="18">
            ⭐ 🎯
          </text>
          <text x="292" y="125" textAnchor="middle" fontSize="10.5" fill="#0f766e">
            {lang === "pl" ? "Rzadki talent" : lang === "de" ? "Seltenes Talent" : "Scarce Talent"}
          </text>
          <rect
            x="235"
            y="145"
            width="115"
            height="28"
            rx="6"
            fill="#dcfce7"
            stroke="#22c55e"
            strokeWidth="1"
          />
          <text x="292" y="163" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#15803d">
            {lang === "pl" ? "Wysoka stawka!" : lang === "de" ? "Hoher Stundenlohn!" : "High Bids!"}
          </text>
        </g>
      )}

      {/* Step 3: Market arrow between them */}
      {step >= 3 && (
        <g>
          <rect
            x="80"
            y="16"
            width="240"
            height="22"
            rx="4"
            fill="#e0f2fe"
            stroke="#0284c7"
            strokeWidth="1"
          />
          <text x="200" y="31" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#0369a1">
            {lang === "pl"
              ? "Rzadkość tworzy siłę przetargową"
              : lang === "de"
                ? "Seltenheit schafft Verhandlungsmacht"
                : "Scarcity creates pricing power"}
          </text>
        </g>
      )}
    </svg>
  );
}

/**
 * Beat 4: Gross earnings vs Net pay.
 * Step 1: Gross earnings total invoice / paycheck.
 * Step 2: Taxes and contributions subtracted.
 * Step 3: Net pay lands in bank account to keep and spend.
 */
function GrossVsNetDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Różnica między wynagrodzeniem brutto a netto"
      : lang === "de"
        ? "Unterschied zwischen Brutto- und Nettolohn"
        : "Gross earnings versus net pay";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect
        x="10"
        y="10"
        width="380"
        height="220"
        rx="14"
        fill="#f8fafc"
        stroke="#1e293b"
        strokeWidth="2"
      />

      {/* Step 1: Gross Pay */}
      <g>
        <rect
          x="35"
          y="35"
          width="330"
          height="45"
          rx="8"
          fill="#dbeafe"
          stroke="#2563eb"
          strokeWidth="2"
        />
        <text x="55" y="62" fontSize="13" fontWeight="bold" fill="#1e40af">
          {lang === "pl"
            ? "Brutto (Całość): 1 000 zł"
            : lang === "de"
              ? "Brutto (Gesamt): 1.000 €"
              : "Gross Pay (Total): $1,000"}
        </text>
        <text x="345" y="62" textAnchor="end" fontSize="11" fill="#3b82f6">
          📄 100%
        </text>
      </g>

      {/* Step 2: Deductions */}
      {step >= 2 && (
        <g>
          <rect
            x="35"
            y="95"
            width="330"
            height="45"
            rx="8"
            fill="#fee2e2"
            stroke="#dc2626"
            strokeWidth="1.5"
          />
          <text x="55" y="122" fontSize="12" fontWeight="bold" fill="#991b1b">
            {lang === "pl"
              ? "- Podatki i składki: 250 zł"
              : lang === "de"
                ? "- Steuern und Abgaben: 250 €"
                : "- Taxes & Contributions: $250"}
          </text>
          <text x="345" y="122" textAnchor="end" fontSize="11" fill="#ef4444">
            🏛️ -25%
          </text>
        </g>
      )}

      {/* Step 3: Net Cash */}
      {step >= 3 && (
        <g>
          <rect
            x="35"
            y="155"
            width="330"
            height="55"
            rx="8"
            fill="#dcfce7"
            stroke="#16a34a"
            strokeWidth="2.5"
          />
          <text x="55" y="184" fontSize="14" fontWeight="bold" fill="#15803d">
            {lang === "pl"
              ? "Netto (Twój portfel): 750 zł"
              : lang === "de"
                ? "Netto (Auf dein Konto): 750 €"
                : "Net Pay (In Your Bank): $750"}
          </text>
          <text x="55" y="200" fontSize="10" fill="#166534">
            {lang === "pl"
              ? "Pieniądze gotowe do wydania lub oszczędzania"
              : lang === "de"
                ? "Geld, das dir wirklich zur Verfuegung steht"
                : "Actual money you keep to spend or save"}
          </text>
          <text x="345" y="190" textAnchor="end" fontSize="18">
            💰
          </text>
        </g>
      )}
    </svg>
  );
}

/**
 * Beat 5: Youth learning flywheel. Invest early in capabilities that compound.
 * Step 1: Learning new tools as a teenager.
 * Step 2: Skills compound into a powerful toolkit.
 * Step 3: Flywheel creates lifelong freedom and opportunity.
 */
function LearningFlywheelDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Koło zamachowe nauki i rozwoju kapitału ludzkiego"
      : lang === "de"
        ? "Schwungrad des Lernens und Humankapital"
        : "Learning flywheel and human capital";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect
        x="10"
        y="10"
        width="380"
        height="220"
        rx="14"
        fill="#f0fdf4"
        stroke="#15803d"
        strokeWidth="2"
      />

      {/* Center circle */}
      <circle cx="200" cy="120" r="38" fill="#bbf7d0" stroke="#16a34a" strokeWidth="2" />
      <text x="200" y="117" textAnchor="middle" fontSize="16">
        🚀
      </text>
      <text x="200" y="133" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#166534">
        {lang === "pl" ? "Rozwój" : lang === "de" ? "Wachstum" : "Growth"}
      </text>

      {/* Step 1: Skills nodes */}
      <g>
        <circle cx="90" cy="75" r="28" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
        <text x="90" y="73" textAnchor="middle" fontSize="13">
          💻
        </text>
        <text x="90" y="89" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#0369a1">
          Code / Tech
        </text>
      </g>

      {/* Step 2: Design and languages */}
      {step >= 2 && (
        <g>
          <circle cx="310" cy="75" r="28" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
          <text x="310" y="73" textAnchor="middle" fontSize="13">
            🎨
          </text>
          <text x="310" y="89" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#b45309">
            Design
          </text>

          <circle cx="90" cy="170" r="28" fill="#fce7f3" stroke="#db2777" strokeWidth="1.5" />
          <text x="90" y="168" textAnchor="middle" fontSize="13">
            🗣️
          </text>
          <text x="90" y="184" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#9d174d">
            Languages
          </text>
        </g>
      )}

      {/* Step 3: Lifetime leverage banner */}
      {step >= 3 && (
        <g>
          <circle cx="310" cy="170" r="28" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
          <text x="310" y="168" textAnchor="middle" fontSize="13">
            ⚡
          </text>
          <text x="310" y="184" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#5b21b6">
            Leverage
          </text>

          <rect x="60" y="200" width="280" height="24" rx="6" fill="#15803d" />
          <text x="200" y="216" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#ffffff">
            {lang === "pl"
              ? "Inwestuj w umiejętności, które procentują całe życie"
              : lang === "de"
                ? "Investiere frueh in Faehigkeiten mit Hebelwirkung"
                : "Invest early in skills that compound for life"}
          </text>
        </g>
      )}
    </svg>
  );
}

function Toy({ onDone }: ToyProps) {
  const [skillLevel, setSkillLevel] = useState(1);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "center" }}>
      <p style={{ margin: 0, fontWeight: 700, fontSize: "1rem" }}>
        Skill Level: {skillLevel} | Value generated: ${skillLevel * 45}/hr
      </p>
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          type="button"
          className="btn"
          onClick={() => {
            setSkillLevel((s) => {
              const next = Math.min(5, s + 1);
              if (next >= 3) onDone?.();
              return next;
            });
          }}
        >
          Study & Upgrade Skills (+1)
        </button>
        <button type="button" className="btn btn-quiet" onClick={() => setSkillLevel(1)}>
          Reset to Baseline
        </button>
      </div>
      <div
        style={{
          padding: "12px",
          background: "#eef8ef",
          borderRadius: "10px",
          width: "100%",
          textAlign: "center",
        }}
      >
        Hourly productivity multiplier: {skillLevel}x. Specialized knowledge creates leverage.
      </div>
    </div>
  );
}

function WorkWidget({ onAnswer }: WidgetProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
      <p style={{ margin: 0 }}>What primary factor drives sustained higher wages for a career?</p>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>
        Working 80 hours doing repetitive manual tasks
      </button>
      <button type="button" className="btn" onClick={() => onAnswer(true)}>
        High productivity backed by scarce specialized skills
      </button>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>
        Requesting higher bonuses from employers
      </button>
    </div>
  );
}

export const lesson: Lesson = {
  id: "work",
  story: [
    animatedBeat(
      [
        T(
          "Meet Arjun. Over summer break, he wants to earn money to upgrade his gaming desk and chair.",
          "Das ist Lukas. In den Sommerferien will er Geld verdienen, um seinen Gaming-Schreibtisch aufzuruesten.",
          "Poznaj Jana. W wakacje chce zarobić na nowy fotel i biurko do gier.",
        ),
        T(
          "At first, Arjun offers basic garden weed pulling for neighbors at ten dollars an hour.",
          "Zuerst zupft Lukas fuer Nachbarn Unkraut im Garten fuer zehn Euro die Stunde.",
          "Początkowo Jan plewi chwasty w ogródkach sąsiadów za czterdzieści złotych na godzinę.",
        ),
        T(
          "Because any kid on the block can pull weeds, neighbors have endless choices, so pay stays low.",
          "Weil jeder Teenager Unkraut zupfen kann, gibt es viele Helfer und der Stundenlohn bleibt niedrig.",
          "Ponieważ każdy może wyrywać chwasty, sąsiedzi mają duży wybór i stawka nie rośnie.",
        ),
      ],
      WeedPullingDiagram,
    ),
    animatedBeat(
      [
        T(
          "Then Arjun teaches himself how to paint custom waterproof artwork on sneakers using special airbrush tools.",
          "Dann bringt sich Lukas bei, wie man Sneaker mit einer Airbrush-Pistole wasserfest bemalt.",
          "Następnie Jan uczy się malowania wodoodpornych grafik na butach za pomocą aerografu.",
        ),
        T(
          "Suddenly people are offering him fifty dollars for every pair he customizes.",
          "Ploetzlich zahlen ihm Kunden fuenfzig Euro fuer jedes individuell gestaltete Paar.",
          "Nagle ludzie zaczynają płacić mu dwieście złotych za każdą ozdobioną parę butów.",
        ),
        T(
          "His time became five times more valuable because he built *human capital*: rare and useful skills.",
          "Seine Zeit wurde fuenfmal wertvoller, weil er *Humankapital* aufgebaut hat: seltene Faehigkeiten.",
          "Jego czas stał się pięciokrotnie cenniejszy, ponieważ rozwinął *kapitał ludzki*: rzadkie umiejętności.",
        ),
      ],
      SneakerCraftDiagram,
    ),
    animatedBeat(
      [
        T(
          "When an employer or customer hires you, they pay for the scarcity of what you know how to do.",
          "Wenn dich jemand bezahlt, honoriert er vor allem die Seltenheit deines Koennens.",
          "Gdy ktoś płaci Ci za pracę, wycenia przede wszystkim rzadkość tego, co potrafisz zrobić.",
        ),
        T(
          "If anyone can learn a chore in ten minutes, many people want the job and the pay drops.",
          "Wenn jeder eine Aufgabe in zehn Minuten lernen kann, gibt es viele Bewerber und der Lohn sinkt.",
          "Gdy każdy może nauczyć się zadania w dziesięć minut, chętnych jest wielu, a stawka spada.",
        ),
        T(
          "When a craft requires years of creative practice, employers must bid aggressively for your talent.",
          "Erfordert ein Handwerk jahrelange Uebung, muessen Kunden und Firmen um dein Talent bieten.",
          "Gdy fach wymaga lat ćwiczeń i pasji, zleceniodawcy muszą konkurować o Twoje usługi.",
        ),
      ],
      ScarcityAndWagesDiagram,
    ),
    animatedBeat(
      [
        T(
          "There is also a key difference between *gross earnings* and *net pay*.",
          "Ausserdem gibt es einen wichtigen Unterschied zwischen *Brutto* und *Netto*.",
          "Istnieje także kluczowa różnica między kwotą *brutto* a wynagrodzeniem *netto*.",
        ),
        T(
          "Gross pay is the headline total before taxes and contributions are subtracted.",
          "Brutto ist der vereinbarte Gesamtbetrag, bevor Steuern und Abgaben abgezogen werden.",
          "Brutto to całkowita kwota na rachunku, zanim zostaną potrącone podatki i składki.",
        ),
        T(
          "Net pay is the actual cash that lands in your bank account to spend or save.",
          "Netto ist das Geld, das am Ende wirklich auf deinem Bankkonto landet.",
          "Netto to realna kwota pieniędzy, która ostatecznie trafia na Twoje konto bankowe.",
        ),
      ],
      GrossVsNetDiagram,
    ),
    animatedBeat(
      [
        T(
          "Your biggest economic lever as a teenager is your ability to learn new things.",
          "Dein groesster Hebel als Jugendlicher ist deine Faehigkeit, Neues zu lernen.",
          "Twoją największą siłą za młodu jest łatwość i ciekawość w zdobywaniu nowej wiedzy.",
        ),
        T(
          "Every technical skill, design tool, or language you master adds permanent value to your work.",
          "Jedes Werkzeug, jeder Code und jede Sprache steigert dauerhaft deinen Marktwert.",
          "Każde nowe narzędzie, kod czy język, który opanujesz, trwale podnosi wartość Twojej pracy.",
        ),
        T(
          "Invest early in capabilities that are rare, rewarding, and exciting to build.",
          "Investiere frueh in Faehigkeiten, die selten, gefragt und spannend sind.",
          "Inwestuj od najmłodszych lat w umiejętności, które są rzadkie, poszukiwane i dają Ci frajdę.",
        ),
      ],
      LearningFlywheelDiagram,
    ),
  ],
  toyIntro: T(
    "Explore how developing scarce skills multiplies your hourly productivity.",
    "Untersuche, wie der Aufbau seltener Faehigkeiten deine Stuendliche Produktivitaet vervielfacht.",
    "Zobacz, jak rozwijanie rzadkich umiejętności pomnaża Twoją produktywność na godzinę.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "What does the term human capital refer to in economics?",
        "Worauf bezieht sich der Begriff Humankapital in der Volkswirtschaftslehre?",
        "Do czego odnosi się pojęcie kapitału ludzkiego w ekonomii?",
      ),
      options: [
        {
          text: T(
            "The collective skills, knowledge, and experience of a person",
            "Die Gesamtheit der Faehigkeiten, Kenntnisse und Erfahrungen eines Menschen",
            "Zbiór umiejętności, wiedzy i doświadczenia danego człowieka",
          ),
          correct: true,
        },
        {
          text: T(
            "The physical bank balance a person holds in cash",
            "Das physische Bankguthaben, das eine Person in bar haelt",
            "Fizyczne środki pieniężne zgromadzone na koncie bankowym",
          ),
        },
        {
          text: T(
            "The machinery and real estate owned by a company",
            "Die Maschinen und Immobilien im Besitz eines Unternehmens",
            "Maszyny i nieruchomości będące własnością przedsiębiorstwa",
          ),
        },
      ],
      hint: T(
        "It is built through study, apprenticeship, and practice.",
        "Es entsteht durch Lernen, Ausbildung und praktische Erfahrung.",
        "Powstaje poprzez naukę, zdobywanie kwalifikacji i praktykę.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "What is the difference between gross pay and net pay?",
        "Was ist der Unterschied zwischen Brutto- und Nettogehalt?",
        "Jaka jest różnica między wynagrodzeniem brutto a netto?",
      ),
      options: [
        {
          text: T(
            "Gross is total earnings; net is what remains after taxes and contributions",
            "Brutto ist das Gesamtentgelt; Netto bleibt nach Steuern und Beitraegen uebrig",
            "Brutto to całość zarobków; netto to kwota po potrąceniu podatków i składek",
          ),
          correct: true,
        },
        {
          text: T(
            "Net pay is always higher than gross pay",
            "Das Nettogehalt ist immer hoeher als das Bruttogehalt",
            "Pensja netto jest zawsze wyższa niż pensja brutto",
          ),
        },
        {
          text: T(
            "Gross pay only applies to overtime hours",
            "Brutto gilt ausschliesslich fuer Ueberstunden",
            "Brutto dotyczy wyłącznie godzin nadliczbowych",
          ),
        },
      ],
      hint: T(
        "Taxes and social contributions are withheld from gross pay.",
        "Steuern und Sozialabgaben werden vom Bruttogehalt einbehalten.",
        "Podatki i składki społeczne są potrącane z pensji brutto.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Identify the primary driver of sustained career compensation.",
        "Waehle die Hauptursache fuer dauerhaft hoehere Berufsgehaelter aus.",
        "Wskaż główną przyczynę trwale wyższych zarobków w karierze zawodowej.",
      ),
      Widget: WorkWidget,
      hint: T(
        "Scarce, high-value skills command stronger market demand.",
        "Seltene und wertvolle Faehigkeiten geniessen hoehere Marktnachfrage.",
        "Rzadkie i wartościowe umiejętności cieszą się wyższym popytem rynkowym.",
      ),
    },
  ],
  askDad: T(
    "Ask your parent: Which skills or certifications created the biggest boost in their career path?",
    "Frage deine Eltern: Welche Faehigkeiten oder Qualifikationen haben ihrem Karriereweg den groessten Schub gegeben?",
    "Zapytaj rodziców: Jakie umiejętności lub kwalifikacje dały największy impuls ich karierze zawodowej?",
  ),
  realLife: {
    title: T(
      "Real world: The wage premium for specialized expertise",
      "Echte Welt: Die Gehaltspraemie fuer spezialisiertes Fachwissen",
      "Prawdziwy świat: Premia płacowa za specjalistyczną wiedzę",
    ),
    body: T(
      "Data from the OECD and national labor bureaus show that individuals with specialized technical, medical, or analytical skills earn significantly higher median lifetime earnings compared to general labor, because their marginal economic output is substantially higher.",
      "Daten der OECD und nationaler Arbeitsaemter zeigen, dass Fachkraefte mit technischen, medizinischen oder analytischen Kenntnissen ein deutlich hoeheres Lebenszeiteinkommen erzielen, da ihre Grenzproduktivitaet wesentlich hoeher liegt.",
      "Dane OECD i krajowych urzędów pracy dowodzą, że specjaliści z wiedzą techniczną, medyczną lub analityczną osiągają znacznie wyższe łączne dochody w życiu, ponieważ ich krańcowa wydajność jest znacznie wyższa.",
    ),
  },
  factCard: {
    claims: [
      {
        text: T(
          "Gary Becker received the Nobel Memorial Prize in Economic Sciences in 1992 for his foundational work on human capital theory.",
          "Gary Becker erhielt 1992 den Nobelpreis fuer Wirtschaftswissenschaften fuer seine Arbeiten zur Humankapitaltheorie.",
          "Gary Becker otrzymał Nagrodę Nobla w dziedzinie ekonomii w 1992 roku za fundamentalne prace nad teorią kapitału ludzkiego.",
        ),
        source: "https://www.nobelprize.org/prizes/economic-sciences/1992/becker/facts/",
      },
      {
        text: T(
          "OECD studies confirm that educational attainment strongly correlates with higher median earnings and lower unemployment risk.",
          "OECD-Studien bestaetigen, dass hoehere Bildungsabschluesse mit hoeheren Medianeinkommen und geringerer Arbeitslosigkeit korrelieren.",
          "Badania OECD potwierdzają, że poziom wykształcenia silnie koreluje z wyższymi medianami zarobków i niższym ryzykiem bezrobocia.",
        ),
        source: "https://www.oecd.org/education/education-at-a-glance/",
      },
      {
        text: T(
          "The US Bureau of Labor Statistics tracks earnings differentials across occupations based on specialized skill requirements.",
          "Das US Bureau of Labor Statistics erfasst Gehaltsunterschiede nach Berufen auf Basis von Qualifikationsanforderungen.",
          "Amerykańskie Biuro Statystyki Pracy rejestruje zróżnicowanie płac w zawodach w oparciu o wymagane kwalifikacje.",
        ),
        source: "https://www.bls.gov/emp/chart-unemployment-earnings-education.htm",
      },
      {
        text: T(
          "German Federal Statistical Office (Destatis) records mandatory social security contributions and income taxes that create the wedge between gross and net pay.",
          "Das Statistische Bundesamt (Destatis) erfasst Abgaben und Steuern, die den Unterschied zwischen Brutto- und Nettolohn bilden.",
          "Niemiecki Federalny Urząd Statystyczny (Destatis) rejestruje składki i podatki tworzące różnicę między pensją brutto a netto.",
        ),
        source: "https://www.destatis.de/DE/Themen/Arbeit/Verdienste/_inhalt.html",
      },
      {
        text: T(
          "Marginal productivity theory posits that employers pay wages matching the marginal revenue product generated by each worker.",
          "Die Grenzproduktivitaetstheorie besagt, dass Loehne dem durch die Arbeitskraft zusaetzlich erzeugten Ertrag entsprechen.",
          "Teoria krańcowej produktywności zakłada, że pracodawcy płacą pensje odpowiadające wartości dodanej wygenerowanej przez pracownika.",
        ),
        source: "https://www.britannica.com/money/marginal-productivity-theory",
      },
    ],
    simplified: [
      T(
        "Complex labor union collective bargaining agreements and regional tax schedules are simplified to show the core gross vs net relationship.",
        "Komplexe Tarifvertraege und regionale Steuertabellen werden vereinfacht, um den Zusammenhang zwischen Brutto und Netto zu veranschaulichen.",
        "Złożone układy zbiorowe i regionalne tabele podatkowe uproszczono, aby pokazać podstawową relację brutto do netto.",
      ),
    ],
  },
};
