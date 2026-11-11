import { useState } from "react";
import { animatedBeat } from "../../../lesson/toolkit";
import type { DiagramProps, Lesson, Text, ToyProps, WidgetProps } from "../../../lesson/types";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

/**
 * Beat 1: Meet Kriti. Handcrafts exquisite organic artisan soap bars in small batches.
 * Step 1: Kriti at her craft table molding soap bars.
 * Step 2: Sells out 50 bars every Saturday at the local farmers market ($500).
 * Step 3: A major boutique hotel chain calls: "We want 5,000 bars every week!"
 */
function ArtisanBottleneckDiagram({ lang, step }: DiagramProps) {
  const kritiName = lang === "pl" ? "Kasia" : lang === "de" ? "Klara" : "Kriti";
  const label =
    lang === "pl"
      ? "Kasia produkuje rzemieślnicze mydła"
      : lang === "de"
        ? "Klara stellt handgemachte Naturseifen her"
        : "Kriti handcrafting organic soap";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect
        x="10"
        y="10"
        width="380"
        height="220"
        rx="14"
        fill="#fdf4ff"
        stroke="#a21caf"
        strokeWidth="2"
      />

      {/* Kriti avatar */}
      <g>
        <circle cx="80" cy="110" r="28" fill="#f3cfa6" stroke="#701a75" strokeWidth="2" />
        <path d="M 52 110 C 52 70 108 70 108 110" fill="#4a044e" />
        <circle cx="72" cy="107" r="2.5" fill="#701a75" />
        <circle cx="88" cy="107" r="2.5" fill="#701a75" />
        <path d="M 76 119 Q 80 125 84 119" stroke="#701a75" strokeWidth="2" fill="none" />
        <path
          d="M 56 185 L 62 140 Q 80 135 98 140 L 104 185 Z"
          fill="#c026d3"
          stroke="#701a75"
          strokeWidth="2"
        />
        <text x="80" y="205" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#701a75">
          {kritiName}
        </text>
      </g>

      {/* Workshop Badge */}
      <g>
        <rect
          x="135"
          y="35"
          width="230"
          height="32"
          rx="6"
          fill="#fae8ff"
          stroke="#c026d3"
          strokeWidth="1.5"
        />
        <text x="250" y="55" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#86198f">
          🧼{" "}
          {lang === "pl"
            ? "Mydlarnia Rzemieślnicza Kasi"
            : lang === "de"
              ? "Klaras Naturseifenmanufaktur"
              : "Kriti Botanical Soap Studio"}
        </text>
      </g>

      {/* Step 2: Farmers Market */}
      {step >= 2 && (
        <g>
          <rect
            x="135"
            y="80"
            width="230"
            height="52"
            rx="8"
            fill="#f5d0fe"
            stroke="#a21caf"
            strokeWidth="1.5"
          />
          <text x="250" y="102" textAnchor="middle" fontSize="18">
            🌸 🧺 🌿
          </text>
          <text
            x="250"
            y="122"
            textAnchor="middle"
            fontSize="10.5"
            fontWeight="bold"
            fill="#701a75"
          >
            {lang === "pl"
              ? "Targ eko: 50 szt. / tydz. (2 000 zł)"
              : lang === "de"
                ? "Wochenmarkt: 50 Stueck / Woche (500 €)"
                : "Market Stall: 50 bars/wk ($500)"}
          </text>
        </g>
      )}

      {/* Step 3: Massive Hotel Order */}
      {step >= 3 && (
        <g>
          <rect x="135" y="145" width="230" height="60" rx="8" fill="#4a044e" />
          <text x="250" y="170" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#ffffff">
            {lang === "pl"
              ? "Hotel: Chcemy 5 000 sztuk co tydzień!"
              : lang === "de"
                ? "Hotelkette: 5.000 Stueck pro Woche!"
                : "Luxury Hotel: 'We want 5,000 bars/wk!'"}
          </text>
          <text x="250" y="190" textAnchor="middle" fontSize="10" fill="#f0abfc">
            {lang === "pl"
              ? "Wąskie gardło: ręczna produkcja nie nadąża"
              : lang === "de"
                ? "Engpass: Reine Handarbeit stoeßt an Grenzen"
                : "Capacity bottleneck: 100x volume surge"}
          </text>
        </g>
      )}
    </svg>
  );
}

/**
 * Beat 2: The Scaling Bottleneck: Manual Labor vs Automation.
 * Step 1: Hand-stirring oils takes 4 hours per 20 bars.
 * Step 2: To make 5,000 bars manually would take 1,000 hours a week (impossible!).
 * Step 3: The scaling limit: businesses must transform their production process.
 */
function ProductionBottleneckDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Wąskie gardła skalowania: praca ręczna a maszyny"
      : lang === "de"
        ? "Skalierungsengpaesse: Handarbeit gegen Automatisierung"
        : "Scaling bottlenecks: manual labor constraints vs automation";

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

      {/* Manual Limit */}
      <g>
        <rect
          x="35"
          y="40"
          width="155"
          height="135"
          rx="8"
          fill="#fff1f2"
          stroke="#e11d48"
          strokeWidth="1.5"
        />
        <text x="112" y="65" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#be123c">
          {lang === "pl"
            ? "Praca Ręczna (Solo)"
            : lang === "de"
              ? "Manuelle Handarbeit"
              : "Solo Handcrafting"}
        </text>
        <text x="112" y="95" textAnchor="middle" fontSize="22">
          ⏱️ 🖐️
        </text>
        <text x="112" y="125" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#9f1239">
          Max: 200 bars / wk
        </text>
        <rect x="45" y="135" width="135" height="30" rx="4" fill="#fecdd3" />
        <text x="112" y="154" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#9f1239">
          {lang === "pl"
            ? "Wyczerpanie fizyczne"
            : lang === "de"
              ? "Zeitliche Grenze erreicht"
              : "Founder Burnout"}
        </text>
      </g>

      {/* Step 2: The Scaling Gap */}
      {step >= 2 && (
        <g>
          <rect
            x="210"
            y="40"
            width="155"
            height="135"
            rx="8"
            fill="#eff6ff"
            stroke="#2563eb"
            strokeWidth="1.5"
          />
          <text x="287" y="65" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e40af">
            {lang === "pl" ? "Popyt Klientów" : lang === "de" ? "Kundenbedarf" : "Hotel Order Need"}
          </text>
          <text x="287" y="95" textAnchor="middle" fontSize="22">
            🏨 📦
          </text>
          <text
            x="287"
            y="125"
            textAnchor="middle"
            fontSize="10.5"
            fontWeight="bold"
            fill="#1d4ed8"
          >
            5,000 bars / wk
          </text>
          <rect x="220" y="135" width="135" height="30" rx="4" fill="#dbeafe" />
          <text x="287" y="154" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#1e40af">
            {lang === "pl"
              ? "Brak 25 pracowników"
              : lang === "de"
                ? "25 Mitarbeiter noetig"
                : "25x Capacity Gap"}
          </text>
        </g>
      )}

      {/* Step 3: Summary Banner */}
      {step >= 3 && (
        <g>
          <rect x="40" y="190" width="320" height="28" rx="6" fill="#334155" />
          <text
            x="200"
            y="208"
            textAnchor="middle"
            fontSize="10.5"
            fontWeight="bold"
            fill="#ffffff"
          >
            {lang === "pl"
              ? "Skalowanie wymaga zmiany technologii, a nie tylko dłuższej pracy"
              : lang === "de"
                ? "Skalieren erfordert neue Systeme, nicht nur laengeres Arbeiten"
                : "Scaling requires restructuring systems, not just working more hours"}
          </text>
        </g>
      )}
    </svg>
  );
}

/**
 * Beat 3: Economies of Scale: Bulk purchasing and industrial tools.
 * Step 1: Bulk organic lavender oil orders drop unit raw cost from $3 to $0.80.
 * Step 2: Industrial mixing vat and hydraulic cutter produce 500 bars per hour.
 * Step 3: Average cost per bar plummets by 65%!
 */
function EconomiesOfScaleDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Korzyści skali: rabaty hurtowe i zautomatyzowane maszyny"
      : lang === "de"
        ? "Skaleneffekte: Mengenvorteile beim Einkauf und Maschinen"
        : "Economies of scale: bulk purchasing and automated machinery";

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

      {/* Step 1: Bulk Ingredients */}
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
            ? "Zakup Hurtowy Surowca"
            : lang === "de"
              ? "Grosspackungen im Einkauf"
              : "Bulk Raw Materials"}
        </text>
        <text x="112" y="90" textAnchor="middle" fontSize="22">
          🛢️ 📉
        </text>
        <text x="112" y="115" textAnchor="middle" fontSize="10" fill="#166534">
          {lang === "pl"
            ? "Beczki 200L olejków"
            : lang === "de"
              ? "200-Liter-Faesser Oel"
              : "55-Gallon drums"}
        </text>
        <text x="112" y="132" textAnchor="middle" fontSize="10" fill="#166534">
          {lang === "pl"
            ? "Koszt: 3 zł zamiast 12 zł"
            : lang === "de"
              ? "Kosten: 0,80 € statt 3 €"
              : "Cost: $0.80 instead of $3"}
        </text>
        <rect x="45" y="145" width="135" height="26" rx="4" fill="#bbf7d0" />
        <text x="112" y="162" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#14532d">
          -73% Raw Material Cost
        </text>
      </g>

      {/* Step 2: Specialized Machinery */}
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
            strokeWidth="2"
          />
          <text x="287" y="60" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e40af">
            {lang === "pl"
              ? "Kocioł i Nożyce Hydrauliczne"
              : lang === "de"
                ? "Industrieruehrwerk & Schneider"
                : "Industrial Vat & Cutter"}
          </text>
          <text x="287" y="90" textAnchor="middle" fontSize="22">
            ⚙️ ⚡
          </text>
          <text x="287" y="115" textAnchor="middle" fontSize="10" fill="#1d4ed8">
            {lang === "pl"
              ? "500 sztuk w godzinę"
              : lang === "de"
                ? "500 Stueck je Stunde"
                : "500 bars / hour"}
          </text>
          <text x="287" y="132" textAnchor="middle" fontSize="10" fill="#1d4ed8">
            {lang === "pl"
              ? "Perfekcyjna powtarzalność"
              : lang === "de"
                ? "Praezise Gleichmaessigkeit"
                : "Identical luxury quality"}
          </text>
          <rect x="220" y="145" width="135" height="26" rx="4" fill="#bfdbfe" />
          <text x="287" y="162" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1e3a8a">
            100x Productivity
          </text>
        </g>
      )}

      {/* Step 3: Margin Expansion */}
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
              ? "Korzyści skali obniżają koszt jednostkowy przy wzroście produkcji"
              : lang === "de"
                ? "Skaleneffekte senken die Stueckkosten bei hoeherer Stueckzahl"
                : "Economies of scale drive down unit cost as production expands"}
          </text>
        </g>
      )}
    </svg>
  );
}

/**
 * Beat 4: Diseases of Scale: Bureaucracy and quality drift.
 * Step 1: Big factory hiring 30 staff introduces coordination confusion.
 * Step 2: One bad chemical shipment ruins 2,000 bars (quality control defect).
 * Step 3: Smart scaling requires standard operating procedures (SOPs).
 */
function DiseconomiesOfScaleDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Niekorzyści skali: biurokracja, błędy jakościowe i procedury SOP"
      : lang === "de"
        ? "Nachteile der Groesse: Buerokratie, Qualitaetsverlust und SOPs"
        : "Diseconomies of scale: complexity, defect risks, and SOPs";

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

      {/* Diseconomies Danger */}
      <g>
        <rect
          x="35"
          y="40"
          width="155"
          height="135"
          rx="8"
          fill="#fff1f2"
          stroke="#e11d48"
          strokeWidth="1.5"
        />
        <text x="112" y="65" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#be123c">
          {lang === "pl"
            ? "Chaos Koordynacji"
            : lang === "de"
              ? "Koordinationschaos"
              : "Coordination Drag"}
        </text>
        <text x="112" y="95" textAnchor="middle" fontSize="22">
          📑 🤯
        </text>
        <text x="112" y="120" textAnchor="middle" fontSize="10" fill="#9f1239">
          {lang === "pl"
            ? "Niejasne obowiązki"
            : lang === "de"
              ? "Unklare Aufgaben"
              : "30 new staff confusion"}
        </text>
        <rect x="45" y="135" width="135" height="30" rx="4" fill="#fecdd3" />
        <text x="112" y="154" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#9f1239">
          {lang === "pl"
            ? "Wada partii mydeł"
            : lang === "de"
              ? "Fehlerhafte Charge"
              : "Defective 2,000 Batch"}
        </text>
      </g>

      {/* Step 2: Standard Operating Procedures (SOPs) */}
      {step >= 2 && (
        <g>
          <rect
            x="210"
            y="40"
            width="155"
            height="135"
            rx="8"
            fill="#f0fdf4"
            stroke="#16a34a"
            strokeWidth="2"
          />
          <text x="287" y="65" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#15803d">
            {lang === "pl"
              ? "Procedury Kontroli (SOP)"
              : lang === "de"
                ? "Qualitaetsstandards (SOP)"
                : "Strict Testing SOPs"}
          </text>
          <text x="287" y="95" textAnchor="middle" fontSize="22">
            📋 🔬
          </text>
          <text x="287" y="120" textAnchor="middle" fontSize="10" fill="#166534">
            {lang === "pl"
              ? "Test pH każdej partii"
              : lang === "de"
                ? "Labortest jeder Charge"
                : "pH testing every vat"}
          </text>
          <rect x="220" y="135" width="135" height="30" rx="4" fill="#bbf7d0" />
          <text x="287" y="154" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#14532d">
            {lang === "pl"
              ? "100% luksusowej jakości"
              : lang === "de"
                ? "100% Spitzenqualitaet"
                : "Zero Quality Drift"}
          </text>
        </g>
      )}

      {/* Step 3: Takeaway */}
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
              ? "Skaluj procesy i standardy, zanim zaczniesz skalować headcount"
              : lang === "de"
                ? "Skaliere Prozesse und Standards, bevor du Personal aufstockst"
                : "Scale clear systems and checklists before you scale headcount"}
          </text>
        </g>
      )}
    </svg>
  );
}

/**
 * Beat 5: The Enterprise Champion: From kitchen sink to global brand.
 * Step 1: Automated cleanroom manufacturing facility.
 * Step 2: 50 luxury hotel partner accounts.
 * Step 3: Predictable, scalable recurring profits!
 */
function EnterpriseScaleDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Dojrzałe przedsiębiorstwo i skalowalny globalny sukces"
      : lang === "de"
        ? "Das skalierte Unternehmen und weltweiter Markterfolg"
        : "Mature enterprise scaling with recurring contracts";

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

      {/* Scaling Stage 1 */}
      <g>
        <rect
          x="35"
          y="45"
          width="95"
          height="75"
          rx="6"
          fill="#ede9fe"
          stroke="#7c3aed"
          strokeWidth="1.5"
        />
        <text x="82" y="70" textAnchor="middle" fontSize="18">
          🏡
        </text>
        <text x="82" y="90" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#5b21b6">
          Craft Table
        </text>
        <text x="82" y="106" textAnchor="middle" fontSize="9" fill="#6d28d9">
          50/wk
        </text>
      </g>

      {/* Step 2: Industrial Workshop */}
      {step >= 2 && (
        <g>
          <path d="M 135 82 L 165 82" stroke="#7e22ce" strokeWidth="3" markerEnd="url(#arrow)" />
          <rect
            x="170"
            y="45"
            width="95"
            height="75"
            rx="6"
            fill="#f3e8ff"
            stroke="#9333ea"
            strokeWidth="1.5"
          />
          <text x="217" y="70" textAnchor="middle" fontSize="18">
            🏭
          </text>
          <text x="217" y="90" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#6b21a8">
            Facility
          </text>
          <text x="217" y="106" textAnchor="middle" fontSize="9" fill="#7e22ce">
            5,000/wk
          </text>
        </g>
      )}

      {/* Step 3: Global Brand */}
      {step >= 3 && (
        <g>
          <path d="M 270 82 L 300 82" stroke="#7e22ce" strokeWidth="3" markerEnd="url(#arrow)" />
          <circle cx="335" cy="82" r="28" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
          <text x="335" y="80" textAnchor="middle" fontSize="16">
            🌐
          </text>
          <text x="335" y="96" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#15803d">
            Brand
          </text>

          <rect x="40" y="145" width="320" height="60" rx="8" fill="#581c87" />
          <text x="200" y="170" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#ffffff">
            {lang === "pl"
              ? "Prawdziwe skalowanie tworzy wartość bez utraty rzemieślniczej jakości"
              : lang === "de"
                ? "Echte Skalierung schafft Wert, ohne Qualitaet zu opfern"
                : "True scale unlocks immense value without sacrificing product excellence"}
          </text>
          <text x="200" y="188" textAnchor="middle" fontSize="10" fill="#e9d5ff">
            {lang === "pl"
              ? "Systemy, maszyny i standardy uwalniają czas przedsiębiorcy"
              : lang === "de"
                ? "Systeme, Maschinen und Standards schenken unternehmerische Freiheit"
                : "Industrial tools and robust procedures turn personal skills into enterprise wealth"}
          </text>
        </g>
      )}
    </svg>
  );
}

function Toy({ onDone }: ToyProps) {
  const [scaleLevel, setScaleLevel] = useState(1); // 1 to 5
  const output = [50, 250, 1000, 3000, 10000][scaleLevel - 1];
  const unitCost = [6.0, 3.5, 2.1, 1.4, 0.95][scaleLevel - 1];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "center" }}>
      <p style={{ margin: 0, fontWeight: 700, fontSize: "1rem" }}>
        Weekly Production: {output.toLocaleString()} bars | Cost per Unit: ${unitCost.toFixed(2)}
      </p>
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          type="button"
          className="btn"
          onClick={() => {
            setScaleLevel((s) => {
              const next = Math.min(5, s + 1);
              if (next >= 4) onDone?.();
              return next;
            });
          }}
        >
          Scale Output (Bulk Supply + Automation)
        </button>
        <button type="button" className="btn btn-quiet" onClick={() => setScaleLevel(1)}>
          Reset Baseline
        </button>
      </div>
      <div
        style={{
          padding: "12px",
          background: scaleLevel >= 4 ? "#eef8ef" : "#fff9db",
          borderRadius: "10px",
          width: "100%",
          textAlign: "center",
        }}
      >
        {scaleLevel >= 4
          ? "Economies of Scale: Fixed machinery investments dilute over 10,000 units, driving unit cost below $1!"
          : "Artisan scale: High unit costs limit total margins when producing by hand."}
      </div>
    </div>
  );
}

function ScalingWidget({ onAnswer }: WidgetProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
      <p style={{ margin: 0 }}>
        What primarily causes 'economies of scale' as a factory increases its production volume?
      </p>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>
        Worker salaries are legally required to drop by half
      </button>
      <button type="button" className="btn" onClick={() => onAnswer(true)}>
        Bulk raw material purchasing discounts and spreading fixed equipment costs across millions
        of units
      </button>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>
        Customers agree to accept broken or damaged goods
      </button>
    </div>
  );
}

export const lesson: Lesson = {
  id: "scaling",
  story: [
    animatedBeat(
      [
        T(
          "Meet Kriti. She handcrafts exquisite organic botanical soap bars in small fragrant batches at her kitchen table.",
          "Das ist Klara. Sie stellt in ihrer Kueche duftende biologische Kraeuterseifen in liebevoller Handarbeit her.",
          "Poznaj Kasię. Tworzy w swojej kuchni pachnące, naturalne mydła ziołowe w małych, starannych partiach.",
        ),
        T(
          "Every Saturday she sells out all fifty bars at the neighborhood farmers market, earning five hundred dollars in cash.",
          "Jeden Samstag verkauft sie auf dem Wochenmarkt alle 50 Stueck und verdient 500 Euro bar.",
          "W każdą sobotę wyprzedaje wszystkie pięćdziesiąt sztuk na targu ekologicznym, zarabiając dwa tysiące złotych.",
        ),
        T(
          "Then a luxury boutique hotel chain tests her soap and calls with an offer: 'We want five thousand bars every single week.'",
          "Dann testet eine Boutique-Hotelkette ihre Seife und bestellt sofort: 'Wir brauchen 5.000 Stueck jede Woche.'",
          "Wtedy luksusowa sieć hoteli testuje jej mydło i składa zamówienie: 'Chcemy pięć tysięcy sztuk w każdym tygodniu.'",
        ),
      ],
      ArtisanBottleneckDiagram,
    ),
    animatedBeat(
      [
        T(
          "Kriti immediately confronts the severe difference between small-scale handcrafting and industrial *scaling*.",
          "Klara begreift sofort den gewaltigen Unterschied zwischen kleiner Handarbeit und industrieller *Skalierung*.",
          "Kasia natychmiast uświadamia sobie ogromną różnicę między małym rzemiosłem a przemysłowym *skalowaniem*.",
        ),
        T(
          "Stirring and curing fifty bars by hand takes ten hours of physical labor; making five thousand bars would take one thousand hours.",
          "50 Seifen per Hand anzuruehren dauert zehn Stunden; fuer 5,000 Stueck braeuchte sie 1.000 Arbeitsstunden pro Woche.",
          "Ręczne wymieszanie 50 mydeł zajmuje dziesięć godzin; wyprodukowanie pięciu tysięcy wymagałoby tysiąca godzin tygodniowo.",
        ),
        T(
          "She cannot scale simply by working harder: she must fundamentally re-engineer her production system.",
          "Mehr arbeiten reicht nicht mehr aus: Sie muss ihren gesamten Herstellungsprozess grundlegend neu erfinden.",
          "Nie da się przeskalować firmy, po prostu pracując ciężej: trzeba od podstaw przeprojektować system produkcji.",
        ),
      ],
      ProductionBottleneckDiagram,
    ),
    animatedBeat(
      [
        T(
          "By transforming her operation, Kriti unlocks the magic of *economies of scale*.",
          "Durch den Umbau erschliesst Klara die enorme Kraft der *Skaleneffekte* (Economies of Scale).",
          "Przekształcając warsztat, Kasia odkrywa niezwykłą potęgę *korzyści skali* (economies of scale).",
        ),
        T(
          "Ordering organic lavender oil by the industrial drum cuts her raw ingredient cost from three dollars to eighty cents per bar.",
          "Bestellt sie Rapsoel im Grossfass, sinken die Materialkosten von drei Euro auf nur noch 80 Cent je Seife.",
          "Zamawiając olejki eteryczne w 200-litrowych beczkach, obniża koszt składników z dwunastu złotych do trzech złotych za sztukę.",
        ),
        T(
          "Investing in a stainless-steel mixing vat and pneumatic soap cutter lets two operators produce five hundred uniform bars an hour.",
          "Ein professionelles Ruehrwerk ermoeglicht es zwei Mitarbeitern, 500 gleichmaessige Seifen in einer Stunde zu giesen.",
          "Zakup kotła ze stali nierdzewnej i krajarki pneumatycznej pozwala dwóm pracownikom wytworzyć 500 mydeł na godzinę.",
        ),
      ],
      EconomiesOfScaleDiagram,
    ),
    animatedBeat(
      [
        T(
          "However, rapid growth brings dangerous *diseconomies of scale*: organizational confusion and quality defects.",
          "Doch schnelles Wachstum birgt Risiken durch *Nachteile der Groesse*: Buerokratie, Koordinationsprobleme und Qualitaetsverlust.",
          "Szybki wzrost niesie jednak ryzyko *niekorzyści skali*: chaos organizacyjny i spadek jakości.",
        ),
        T(
          "When she hires twenty new factory helpers without clear instructions, one wrong chemical batch ruins two thousand bars.",
          "Als sie 20 Helfer ohne klare Anweisungen anstellt, ruiniert eine falsch gemischte Charge 2.000 Seifen.",
          "Gdy zatrudnia dwudziestu pracowników bez jasnych instrukcji, jedna pomyłka w proporcjach niszczy całą partię towaru.",
        ),
        T(
          "Kriti implements strict *Standard Operating Procedures* (SOPs) and batch testing to guarantee flawless luxury quality at high volume.",
          "Klara fuehrt praezise *Standardverfahren* (SOPs) ein, um Spitzenqualitaet auch bei riesigen Stueckzahlen zu garantieren.",
          "Kasia wprowadza rygorystyczne *standardowe procedury operacyjne* (SOP) i testy laboratoryjne, gwarantując luksusową jakość każdej partii.",
        ),
      ],
      DiseconomiesOfScaleDiagram,
    ),
    animatedBeat(
      [
        T(
          "With optimized machinery, bulk supplier terms, and disciplined quality procedures, Kriti fulfills the hotel contract profitably.",
          "Dank moderner Geraete, guenstiger Einkaufspreise und fester Ablaeufe beliefert Klara das Hotel hochprofitabel.",
          "Dzięki nowoczesnym maszynom, hurtowym cenom surowców i procedurom kontroli Kasia z sukcesem realizuje wielki kontrakt.",
        ),
        T(
          "Scaling transforms a tiring individual job into an enduring enterprise that creates employment and serves thousands.",
          "Erfolgreiches Skalieren verwandelt muehsame Einzelarbeit in ein stabiles Unternehmen, das Arbeitsplaetze schafft.",
          "Właściwe skalowanie przekształca wyczerpującą pracę rzemieślnika w dojrzałe przedsiębiorstwo dające pracę wielu ludziom.",
        ),
        T(
          "Design reliable systems, eliminate bottlenecks, and your business can scale to meet any market opportunity.",
          "Baue zuverlaessige Systeme, loese Engpaesse, und dein Unternehmen waechst an jeder neuen Chance.",
          "Projektuj stabilne systemy, usuwaj wąskie gardła, a Twoja firma sprosta każdemu rynkowemu wyzwaniu.",
        ),
      ],
      EnterpriseScaleDiagram,
    ),
  ],
  toyIntro: T(
    "Explore economies of scale by increasing production volume to see how automation and bulk purchasing slash per-unit costs.",
    "Erkunde Skaleneffekte: Erhoehe die Stueckzahl und beobachte, wie Automation die Stueckkosten drueckt.",
    "Zbadaj korzyści skali: zwiększaj wielkość produkcji i obserwuj, jak automatyzacja obniża koszt wytworzenia sztuki.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "What are 'economies of scale' in business economics?",
        "Was versteht man unter 'Skaleneffekten' (Economies of Scale) in der Betriebswirtschaft?",
        "Czym są 'korzyści skali' (economies of scale) w ekonomii?",
      ),
      options: [
        {
          text: T(
            "Cost advantages that enterprises obtain due to their scale of operation, where per-unit costs drop as output rises",
            "Kostenvorteile, bei denen die Durchschnittskosten je Stueck mit steigender Produktionsmenge sinken",
            "Przewagi kosztowe, w których jednostkowy koszt wytworzenia spada wraz ze wzrostem wielkości produkcji",
          ),
          correct: true,
        },
        {
          text: T(
            "The physical scale used by doctors to weigh medical patients",
            "Die Personenwaage in einer Arztpraxis zur Messung des Koerpergewichts",
            "Waga lekarska służąca do ważenia pacjentów w gabinecie",
          ),
        },
        {
          text: T(
            "A special tax levied only on very small startup operations",
            "Eine Sondersteuer, die ausschliesslich von Kleinstunternehmen gezahlt wird",
            "Specjalny podatek nakładany wyłącznie na najmniejsze firmy",
          ),
        },
      ],
      hint: T(
        "Think about spreading large upfront investments over huge numbers of sold items.",
        "Bedenke die Verteilung grosser Fixkosten auf riesige Stueckzahlen.",
        "Pomyśl o rozkładaniu kosztów maszyn na setki tysięcy wyprodukowanych sztuk.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "What are 'diseconomies of scale' that can hurt an expanding company?",
        "Welche Nachteile der Groesse (Diseconomies of Scale) koennen ein wachsendes Unternehmen belasten?",
        "Czym są 'niekorzyści skali' (diseconomies of scale), które mogą osłabić rosnącą firmę?",
      ),
      options: [
        {
          text: T(
            "Messy communication, confusing rules, and sloppy quality when a business grows too large",
            "Kommunikationsprobleme, buerokratischer Mehraufwand und Qualitaetsmaengel bei zu schnellem Wachstum",
            "Problemy z komunikacją, za dużo przepisów i spadek jakości przy zbyt dużym wzroście",
          ),
          correct: true,
        },
        {
          text: T(
            "A mandatory legal requirement to destroy half of all finished goods",
            "Die gesetzliche Pflicht, die Haelfte aller hergestellten Waren zu vernichten",
            "Prawny nakaz niszczenia połowy wyprodukowanych towarów",
          ),
        },
        {
          text: T(
            "Suppliers giving away free machinery to competitor firms",
            "Lieferanten, die Konkurrenten ploetzlich kostenlose Maschinen schenken",
            "Dostawcy rozdający darmowe maszyny firmom konkurencyjnym",
          ),
        },
      ],
      hint: T(
        "Focus on organizational overhead, coordination delays, and managerial complexity.",
        "Achte auf organisatorische Reibungsverluste, Abstimmungsaufwand und Verwaltungsbuerokratie.",
        "Zwróć uwagę na koszty zarządzania, zamieszanie decyzyjne i trudności w zespole.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Identify the primary economic mechanism that produces economies of scale.",
        "Erkenne den zentralen wirtschaftlichen Mechanismus, der Skaleneffekte erzeugt.",
        "Wskaż główny mechanizm ekonomiczny odpowiadający za powstawanie korzyści skali.",
      ),
      Widget: ScalingWidget,
      hint: T(
        "Think about buying ingredients in big sacks and sharing one oven for fifty pies.",
        "Denke an Mengenvorteile beim Einkauf und die Verteilung von Maschinenkosten.",
        "Pomyśl o rabatach przy zakupach hurtowych i rozkładaniu kosztu maszyn na dużą liczbę sztuk.",
      ),
    },
  ],
  askDad: T(
    "Ask your parent: How does their company or industry handle scaling up when customer demand suddenly surges?",
    "Frage deine Eltern: Wie bewaltigt ihr Unternehmen das Wachstum, wenn die Kundennachfrage ploetzlich sprunghaft steigt?",
    "Zapytaj rodziców: Jak w ich przedsiębiorstwie radzą sobie ze skalowaniem pracy przy gwałtownym wzroście zamówień?",
  ),
  realLife: {
    title: T(
      "Real world: Automotive gigafactories and semiconductor foundries",
      "Echte Welt: Automobil-Gigafactories und Halbleiter-Chipwerke",
      "Prawdziwy świat: Gigafabryki samochodowe i huty procesorów krzemowych",
    ),
    body: T(
      "Modern semiconductor chip plants (like TSMC in Taiwan) cost upwards of twenty billion dollars to construct. However, once operational, they manufacture hundreds of millions of microprocessors at marginal production costs of just dollars per chip. Without massive scale, consumer electronics like smartphones, medical scanners, and electric vehicles would cost tens of thousands more per unit.",
      "Moderne Chipfabriken (wie TSMC in Taiwan) kosten im Bau ueber 20 Milliarden Dollar. Einmal errichtet, fertigen sie Hunderte Millionen Computerchips zu Grenzkosten von wenigen Dollar je Stueck. Ohne diese gewaltige Skalierung waeren Laptops und Elektroautos unbezahlbar teuer.",
      "Nowoczesne fabryki procesorów (jak TSMC na Tajwanie) kosztują ponad dwadzieścia miliardów dolarów. Po uruchomieniu wytwarzają jednak setki milionów chipów przy jednostkowym koszcie kilku dolarów za sztukę. Bez gigantycznej skali smartfony i komputery byłyby wielokrotnie droższe.",
    ),
  },
  factCard: {
    claims: [
      {
        text: T(
          "Alfred Marshall detailed internal and external economies of scale in his 1890 work 'Principles of Economics'.",
          "Alfred Marshall beschrieb interne und externe Skaleneffekte 1890 in seinem Grundlagenwerk 'Principles of Economics'.",
          "Alfred Marshall opisał wewnętrzne i zewnętrzne korzyści skali w swoim dziele 'Zasady ekonomii' z 1890 roku.",
        ),
        source: "https://www.britannica.com/topic/Principles-of-Economics-by-Marshall",
      },
      {
        text: T(
          "The experience curve effect, pioneered by the Boston Consulting Group (BCG) in 1968, demonstrates that value-added costs decline by 20% to 30% each time cumulative production doubles.",
          "Die Erfahrungskurve der Boston Consulting Group (BCG) von 1968 zeigt, dass Stueckkosten bei jeder Verdopplung der Produktionsmenge um 20 bis 30 Prozent sinken.",
          "Krzywa doświadczenia opracowana przez Boston Consulting Group (BCG) w 1968 roku dowodzi, że jednostkowy koszt spada o 20 do 30 procent przy każdym podwojeniu skumulowanej produkcji.",
        ),
        source: "https://www.bcg.com/about/overview/our-history/growth-share-matrix",
      },
      {
        text: T(
          "Henry Ford's introduction of the moving assembly line in 1913 reduced the production time of a Model T car from 12 hours to 93 minutes, driving dramatic price decreases.",
          "Henry Fords Fliessbandfertigung von 1913 senkte die Montagezeit des Model T von zwoelf Stunden auf 93 Minuten und machte Autos fuer Millionen erschwinglich.",
          "Wprowadzenie przez Henry'ego Forda ruchomej taśmy montażowej w 1913 roku skróciło czas produkcji samochodu Model T z 12 godzin do 93 minut, drastycznie obniżając ceny.",
        ),
        source:
          "https://www.thehenryford.org/explore/stories-of-innovation/press-room/moving-assembly-line-press-kit",
      },
      {
        text: T(
          "Destatis monitors manufacturing industrial output indices showing high capital intensity and automation across German Mittelstand manufacturing firms.",
          "Destatis veroeffentlicht regelmaessig Produktionsindizes zur hohen Kapitalintensitaet und Automatisierung im deutschen Industrie-Mittelstand.",
          "Destatis regularnie publikuje wskaźniki produkcji przemysłowej potwierdzające wysoki poziom automatyzacji w niemieckim sektorze wytwórczym.",
        ),
        source:
          "https://www.destatis.de/DE/Themen/Wirtschaft/Industrie-Verarbeitendes-Gewerbe/_inhalt.html",
      },
      {
        text: T(
          "International Organization for Standardization (ISO 9001) provides globally recognized frameworks for quality management systems in scaling manufacturing businesses.",
          "Die ISO-9001-Norm definiert weltweite Standards fuer Qualitaetsmanagementsysteme in wachsenden Industriebetrieben.",
          "Norma ISO 9001 określa międzynarodowe standardy systemów zarządzania jakością w rozwijających się przedsiębiorstwach produkcyjnych.",
        ),
        source: "https://www.iso.org/iso-9001-quality-management.html",
      },
    ],
    simplified: [
      T(
        "Complex supply chain linear programming algorithms are simplified into intuitive bulk ordering principles.",
        "Komplexe mathematische Optimierungsmodelle fuer Lieferketten wurden zu verstaendlichen Prinzipien fuer den Grosseinkauf vereinfacht.",
        "Złożone algorytmy logistyczne łańcuchów dostaw uproszczono do czytelnych reguł zakupów hurtowych i rabatów ilościowych.",
      ),
    ],
  },
};
