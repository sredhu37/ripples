import { useState } from "react";
import { animatedBeat } from "../../../lesson/toolkit";
import type { DiagramProps, Lesson, Text, ToyProps, WidgetProps } from "../../../lesson/types";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

/**
 * Beat 1: Meet Aish. Starts a late night pizza delivery kitchen from home.
 * Step 1: Aish setting up her kitchen.
 * Step 2: Fresh artisan pizza boxed and ready.
 * Step 3: Orders start pouring in from neighborhood fans.
 */
function PizzaLaunchDiagram({ lang, step }: DiagramProps) {
  const aishName = lang === "pl" ? "Ania" : lang === "de" ? "Mia" : "Aish";
  const label =
    lang === "pl"
      ? "Ania uruchamia domową pizzerię"
      : lang === "de"
        ? "Mia startet ihre Pizzakueche"
        : "Aish launching late night pizza kitchen";

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

      {/* Aish avatar */}
      <g>
        <circle cx="80" cy="110" r="28" fill="#f3cfa6" stroke="#23383f" strokeWidth="2" />
        <path d="M 52 110 C 52 70 108 70 108 110" fill="#3b0764" />
        <circle cx="72" cy="107" r="2.5" fill="#23383f" />
        <circle cx="88" cy="107" r="2.5" fill="#23383f" />
        <path d="M 76 119 Q 80 125 84 119" stroke="#23383f" strokeWidth="2" fill="none" />
        <path
          d="M 56 185 L 62 140 Q 80 135 98 140 L 104 185 Z"
          fill="#d97706"
          stroke="#23383f"
          strokeWidth="2"
        />
        <text x="80" y="205" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#78350f">
          {aishName}
        </text>
      </g>

      {/* Step 1: Kitchen Banner */}
      <g>
        <rect
          x="135"
          y="35"
          width="230"
          height="32"
          rx="6"
          fill="#fef3c7"
          stroke="#d97706"
          strokeWidth="1.5"
        />
        <text x="250" y="55" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#92400e">
          🍕{" "}
          {lang === "pl"
            ? "Nocna Pizzeria Rzemieślnicza"
            : lang === "de"
              ? "Late-Night Pizza Lieferkueche"
              : "Artisan Late-Night Pizza Kitchen"}
        </text>
      </g>

      {/* Step 2: Fresh Pizza Boxed */}
      {step >= 2 && (
        <g>
          <rect
            x="135"
            y="80"
            width="230"
            height="52"
            rx="8"
            fill="#fff"
            stroke="#d97706"
            strokeWidth="1.5"
          />
          <text x="250" y="104" textAnchor="middle" fontSize="18">
            📦 🍕 ✨
          </text>
          <text
            x="250"
            y="122"
            textAnchor="middle"
            fontSize="10.5"
            fontWeight="bold"
            fill="#b45309"
          >
            {lang === "pl"
              ? "Cena menu: 60 zł za pizzę"
              : lang === "de"
                ? "Verkaufspreis: 15 € je Pizza"
                : "Menu Price: $15 per pizza"}
          </text>
        </g>
      )}

      {/* Step 3: Orders Flood In */}
      {step >= 3 && (
        <g>
          <rect
            x="135"
            y="145"
            width="230"
            height="60"
            rx="8"
            fill="#ecfdf5"
            stroke="#059669"
            strokeWidth="1.5"
          />
          <text x="250" y="170" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#065f46">
            {lang === "pl"
              ? "100 zamówień w pierwszy weekend!"
              : lang === "de"
                ? "100 Bestellungen am Wochenende!"
                : "100 Orders First Weekend!"}
          </text>
          <text x="250" y="190" textAnchor="middle" fontSize="10.5" fill="#047857">
            {lang === "pl"
              ? "Przychód: 6 000 zł w gotówce"
              : lang === "de"
                ? "Umsatz: 1.500 € in der Kasse"
                : "Top-line Revenue: $1,500"}
          </text>
        </g>
      )}
    </svg>
  );
}

/**
 * Beat 2: Direct ingredients (COGS) vs Gross Margin.
 * Step 1: $15 selling price per pizza.
 * Step 2: Subtract direct ingredients: $4 (flour, tomatoes, cheese, box).
 * Step 3: Gross profit: $11 per pizza (73% Gross Margin).
 */
function UnitEconomicsDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Ekonomika jednostkowa i marża brutto pizzy"
      : lang === "de"
        ? "Stueckkosten und Rohertrag je Pizza"
        : "Unit economics and gross profit per pizza";

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

      {/* Selling price */}
      <g>
        <rect
          x="35"
          y="35"
          width="330"
          height="42"
          rx="6"
          fill="#dbeafe"
          stroke="#2563eb"
          strokeWidth="2"
        />
        <text x="55" y="60" fontSize="12.5" fontWeight="bold" fill="#1e40af">
          {lang === "pl"
            ? "Cena sprzedaży za 1 pizzę: 60 zł"
            : lang === "de"
              ? "Verkaufspreis je Pizza: 15 €"
              : "Selling Price (1 Pizza): $15"}
        </text>
        <text x="345" y="60" textAnchor="end" fontSize="11" fill="#3b82f6">
          100%
        </text>
      </g>

      {/* Step 2: Direct Ingredients (COGS) */}
      {step >= 2 && (
        <g>
          <rect
            x="35"
            y="87"
            width="330"
            height="45"
            rx="6"
            fill="#fee2e2"
            stroke="#ef4444"
            strokeWidth="1.5"
          />
          <text x="55" y="108" fontSize="12" fontWeight="bold" fill="#b91c1c">
            {lang === "pl"
              ? "- Składniki bezpośrednie (COGS): 16 zł"
              : lang === "de"
                ? "- Direkte Zutaten (COGS): 4 €"
                : "- Direct Ingredients (COGS): $4"}
          </text>
          <text x="55" y="124" fontSize="10" fill="#991b1b">
            {lang === "pl"
              ? "Mąka, sos pomidorowy, ser mozzarella, karton"
              : lang === "de"
                ? "Mehl, San Marzano Tomaten, Mozzarella, Karton"
                : "Organic flour, San Marzano sauce, mozzarella, box"}
          </text>
          <text x="345" y="112" textAnchor="end" fontSize="11" fill="#dc2626">
            27%
          </text>
        </g>
      )}

      {/* Step 3: Gross Profit */}
      {step >= 3 && (
        <g>
          <rect
            x="35"
            y="145"
            width="330"
            height="55"
            rx="8"
            fill="#fef3c7"
            stroke="#d97706"
            strokeWidth="2"
          />
          <text x="55" y="172" fontSize="13" fontWeight="bold" fill="#92400e">
            {lang === "pl"
              ? "= Zysk brutto z 1 pizzy: 44 zł"
              : lang === "de"
                ? "= Rohgewinn je Pizza: 11 €"
                : "= Unit Gross Profit: $11"}
          </text>
          <text x="55" y="190" fontSize="10.5" fill="#b45309">
            {lang === "pl"
              ? "Marża brutto wynosi 73% (kwota na opłacenie kierowcy i pieca)"
              : lang === "de"
                ? "Rohmarge liegt bei 73% (Deckung fuer Fahrer und Ofen)"
                : "73% Gross Margin to cover delivery rider, gas, and kitchen rent"}
          </text>
          <text x="345" y="176" textAnchor="end" fontSize="16">
            🧀📈
          </text>
        </g>
      )}
    </svg>
  );
}

/**
 * Beat 3: Operating expenses: Delivery bike fuel, delivery rider, app platform fee.
 * Step 1: Gross profit from 100 pizzas ($1,100).
 * Step 2: OpEx: Rider wages $400, app listing fee $250, oven fuel $150 (-$800).
 * Step 3: Net profit: $300 (20% Net Margin). Real take home.
 */
function DeliveryOpExDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Koszty operacyjne dostaw i ostateczny zysk netto"
      : lang === "de"
        ? "Betriebsausgaben fuer Lieferung und Reingewinn"
        : "Operating delivery expenses and net bottom line";

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

      {/* Gross Profit bar */}
      <g>
        <rect
          x="35"
          y="30"
          width="330"
          height="38"
          rx="6"
          fill="#fef3c7"
          stroke="#d97706"
          strokeWidth="1.5"
        />
        <text x="55" y="54" fontSize="12" fontWeight="bold" fill="#92400e">
          {lang === "pl"
            ? "Zysk brutto ze 100 pizz: 4 400 zł"
            : lang === "de"
              ? "Rohertrag aus 100 Pizzen: 1.100 €"
              : "Gross Profit (100 Pizzas): $1,100"}
        </text>
      </g>

      {/* Step 2: OpEx details */}
      {step >= 2 && (
        <g>
          <rect
            x="35"
            y="78"
            width="330"
            height="52"
            rx="6"
            fill="#ffe4e6"
            stroke="#f43f5e"
            strokeWidth="1.5"
          />
          <text x="55" y="98" fontSize="11.5" fontWeight="bold" fill="#9f1239">
            {lang === "pl"
              ? "- Koszty operacyjne (OpEx): 3 200 zł"
              : lang === "de"
                ? "- Betriebskosten (OpEx): 800 €"
                : "- Delivery & Overhead OpEx: $800"}
          </text>
          <text x="55" y="117" fontSize="10" fill="#be123c">
            {lang === "pl"
              ? "🚴 Dostawca (1 600 zł) • 📱 Prowizja aplikacji (1 000 zł) • 🔥 Gaz (600 zł)"
              : lang === "de"
                ? "🚴 Kurier (400 €) • 📱 App-Gebuehr (250 €) • 🔥 Ofengas (150 €)"
                : "🚴 Courier ($400) • 📱 App fee ($250) • 🔥 Oven gas ($150)"}
          </text>
        </g>
      )}

      {/* Step 3: Net Profit */}
      {step >= 3 && (
        <g>
          <rect
            x="35"
            y="142"
            width="330"
            height="60"
            rx="8"
            fill="#dcfce7"
            stroke="#16a34a"
            strokeWidth="2.5"
          />
          <text x="55" y="170" fontSize="14" fontWeight="bold" fill="#15803d">
            {lang === "pl"
              ? "🎉 Zysk netto (Net Profit): 1 200 zł!"
              : lang === "de"
                ? "🎉 Reingewinn (Net Profit): 300 €!"
                : "🎉 Net Profit: $300 Clean Take-Home!"}
          </text>
          <text x="55" y="189" fontSize="10.5" fill="#166534">
            {lang === "pl"
              ? "Marża netto: 20% • Prawdziwe pieniądze należące do właściciela"
              : lang === "de"
                ? "Nettomarge: 20% • Das reale Geld auf deinem Geschaeftskonto"
                : "20% Net Margin • The bottom line after paying every provider"}
          </text>
          <text x="345" y="175" textAnchor="end" fontSize="18">
            💰✅
          </text>
        </g>
      )}
    </svg>
  );
}

/**
 * Beat 4: Margin safety: Price discounting trap vs premium quality.
 * Step 1: Bad strategy: $5 discount to compete with giant chains wipes out 100% net profit.
 * Step 2: Good strategy: Superior taste, custom packaging, loyal repeat fans.
 * Step 3: Protect your net margin or you go out of business.
 */
function PricingPowerDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Pułapka wojny cenowej a obrona marży zysku"
      : lang === "de"
        ? "Preiskampffalle versus Margensicherheit"
        : "Price discounting trap vs margin protection";

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

      {/* Step 1: Discount Trap */}
      <g>
        <rect
          x="35"
          y="35"
          width="155"
          height="150"
          rx="8"
          fill="#fff1f2"
          stroke="#e11d48"
          strokeWidth="1.5"
        />
        <text x="112" y="60" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#be123c">
          {lang === "pl"
            ? "Rabat 15 zł (-25%)"
            : lang === "de"
              ? "Rabatt 4 € (-27%)"
              : "Discounting Trap (-$4)"}
        </text>
        <text x="112" y="90" textAnchor="middle" fontSize="22">
          📉 ⚠️
        </text>
        <text x="112" y="115" textAnchor="middle" fontSize="10" fill="#9f1239">
          {lang === "pl"
            ? "Większy obrót"
            : lang === "de"
              ? "Mehr Bestellungen"
              : "More box volume"}
        </text>
        <text x="112" y="132" textAnchor="middle" fontSize="10" fill="#9f1239">
          {lang === "pl"
            ? "Zysk netto spada do 0 zł!"
            : lang === "de"
              ? "Gewinn faellt auf 0 €!"
              : "Net profit wiped to $0!"}
        </text>
        <rect x="45" y="145" width="135" height="26" rx="4" fill="#fecdd3" />
        <text x="112" y="162" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#9f1239">
          {lang === "pl"
            ? "Praca za darmo"
            : lang === "de"
              ? "Arbeiten fuer Nichts"
              : "Unprofitable Grind"}
        </text>
      </g>

      {/* Step 2: Quality & Pricing Power */}
      {step >= 2 && (
        <g>
          <rect
            x="210"
            y="35"
            width="155"
            height="150"
            rx="8"
            fill="#f0fdf4"
            stroke="#16a34a"
            strokeWidth="2"
          />
          <text x="287" y="60" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#15803d">
            {lang === "pl"
              ? "Jakość Rzemieślnicza"
              : lang === "de"
                ? "Premium-Qualitaet"
                : "Pricing Power"}
          </text>
          <text x="287" y="90" textAnchor="middle" fontSize="22">
            ⭐ 👑
          </text>
          <text x="287" y="115" textAnchor="middle" fontSize="10" fill="#166534">
            {lang === "pl"
              ? "Autorski sos i ciasto"
              : lang === "de"
                ? "Bester Geschmack"
                : "Unmatched flavor"}
          </text>
          <text x="287" y="132" textAnchor="middle" fontSize="10" fill="#166534">
            {lang === "pl"
              ? "Klienci płacą pełną cenę"
              : lang === "de"
                ? "Kunden zahlen gerne"
                : "Loyal repeat orders"}
          </text>
          <rect x="220" y="145" width="135" height="26" rx="4" fill="#bbf7d0" />
          <text x="287" y="162" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#14532d">
            {lang === "pl"
              ? "Trwałe 20% zysku"
              : lang === "de"
                ? "Sichere 20% Marge"
                : "Solid 20% Net Margin"}
          </text>
        </g>
      )}

      {/* Step 3: Rule */}
      {step >= 3 && (
        <g>
          <rect x="50" y="196" width="300" height="24" rx="4" fill="#334155" />
          <text
            x="200"
            y="212"
            textAnchor="middle"
            fontSize="10.5"
            fontWeight="bold"
            fill="#ffffff"
          >
            {lang === "pl"
              ? "Nie ścigaj się na najniższą cenę, chroń swoją marżę"
              : lang === "de"
                ? "Kämpfe nicht ueber Billigpreise, schuetze deine Marge"
                : "Never race to the bottom on price, defend your net margin"}
          </text>
        </g>
      )}
    </svg>
  );
}

/**
 * Beat 5: Scaling the kitchen into multiple locations.
 * Step 1: Retain earnings from delivery kitchen.
 * Step 2: Open second prep kitchen near college campus.
 * Step 3: Fixed software & brand costs spread over 500 pizzas a day.
 */
function KitchenExpansionDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Skalowanie pizzerii na drugą lokalizację"
      : lang === "de"
        ? "Expansion der Pizzakueche auf zweiten Standort"
        : "Scaling kitchen across multiple locations";

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

      {/* Step 1: Location 1 */}
      <g>
        <rect
          x="35"
          y="45"
          width="100"
          height="75"
          rx="8"
          fill="#ede9fe"
          stroke="#7c3aed"
          strokeWidth="1.5"
        />
        <text x="85" y="70" textAnchor="middle" fontSize="18">
          🏠 🍕
        </text>
        <text x="85" y="90" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#5b21b6">
          Kitchen 1
        </text>
        <text x="85" y="105" textAnchor="middle" fontSize="9.5" fill="#6d28d9">
          100/wk
        </text>
      </g>

      {/* Step 2: Location 2 */}
      {step >= 2 && (
        <g>
          <path d="M 140 82 L 180 82" stroke="#7e22ce" strokeWidth="3" markerEnd="url(#arrow)" />
          <rect
            x="185"
            y="45"
            width="100"
            height="75"
            rx="8"
            fill="#f3e8ff"
            stroke="#9333ea"
            strokeWidth="1.5"
          />
          <text x="235" y="70" textAnchor="middle" fontSize="18">
            🏢 🍕
          </text>
          <text x="235" y="90" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#6b21a8">
            Kitchen 2
          </text>
          <text x="235" y="105" textAnchor="middle" fontSize="9.5" fill="#7e22ce">
            Campus Spot
          </text>
        </g>
      )}

      {/* Step 3: Multi-Unit Success */}
      {step >= 3 && (
        <g>
          <path d="M 290 82 L 320 82" stroke="#7e22ce" strokeWidth="3" markerEnd="url(#arrow)" />
          <circle cx="348" cy="82" r="28" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
          <text x="348" y="80" textAnchor="middle" fontSize="16">
            🚀
          </text>
          <text x="348" y="96" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#15803d">
            Brand
          </text>

          <rect x="40" y="145" width="320" height="60" rx="8" fill="#581c87" />
          <text x="200" y="170" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#ffffff">
            {lang === "pl"
              ? "Zdrowa ekonomika jednostkowa pozwala rosnąć w nieskończoność"
              : lang === "de"
                ? "Gesunde Stueckkosten ermoeglichen unbegrenztes Wachstum"
                : "Sound unit economics turns small kitchens into regional empires"}
          </text>
          <text x="200" y="190" textAnchor="middle" fontSize="10" fill="#e9d5ff">
            {lang === "pl"
              ? "Gdy każda sprzedana pizza generuje czysty zysk, rozwój sam się finansuje"
              : lang === "de"
                ? "Wenn jede Pizza Reingewinn abwirft, finanziert sich die Expansion selbst"
                : "When each pizza generates real net profit, scale fuels itself safely"}
          </text>
        </g>
      )}
    </svg>
  );
}

function Toy({ onDone }: ToyProps) {
  const [volume, setVolume] = useState(100);
  const price = 15;
  const cogsPerPizza = 4;
  const fixedOverhead = 800;

  const revenue = volume * price;
  const grossProfit = volume * (price - cogsPerPizza);
  const netProfit = grossProfit - fixedOverhead;
  const netMargin = Math.round((netProfit / revenue) * 100);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "center" }}>
      <p style={{ margin: 0, fontWeight: 700, fontSize: "1rem" }}>
        Orders: {volume} pizzas | Revenue: ${revenue} | Net Profit: ${netProfit} ({netMargin}%)
      </p>
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          type="button"
          className="btn"
          onClick={() => {
            setVolume((v) => {
              const next = v + 50;
              if (next >= 200) onDone?.();
              return next;
            });
          }}
        >
          Increase Orders (+50 Pizzas)
        </button>
        <button type="button" className="btn btn-quiet" onClick={() => setVolume(100)}>
          Reset Baseline
        </button>
      </div>
      <div
        style={{
          padding: "12px",
          background: netProfit >= 300 ? "#eef8ef" : "#ffe3e3",
          borderRadius: "10px",
          width: "100%",
          textAlign: "center",
        }}
      >
        {netProfit >= 800
          ? "Exceptional: Fixed costs are diluted over huge volume, expanding net margins dramatically!"
          : "Healthy operations: Every unit contributes positive gross profit toward fixed expenses."}
      </div>
    </div>
  );
}

function ProfitWidget({ onAnswer }: WidgetProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
      <p style={{ margin: 0 }}>
        If a pizza sells for $20, direct ingredients cost $5, and delivery expenses take $11, what
        is the net profit?
      </p>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>
        $15 (75% margin)
      </button>
      <button type="button" className="btn" onClick={() => onAnswer(true)}>
        $4 (a 20% net margin)
      </button>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>
        $0 (breakeven)
      </button>
    </div>
  );
}

export const lesson: Lesson = {
  id: "profit",
  story: [
    animatedBeat(
      [
        T(
          "Meet Aish. She starts a late-night artisan pizza delivery kitchen from her family back kitchen on weekends.",
          "Das ist Mia. Sie startet an Wochenenden eine Late-Night Pizza-Lieferkueche aus der heimischen Backstube.",
          "Poznaj Anię. W weekendy uruchamia domową, nocną pizzerię z dostawą do okolicznych domów.",
        ),
        T(
          "She bakes thin-crust personal pizzas, wraps them in custom printed boxes, and charges fifteen dollars each.",
          "Sie baeckt knusprige Steinofenpizzen, verpackt sie liebevoll und verlangt 15 Euro pro Karton.",
          "Piecze chrupiącą pizzę rzemieślniczą, pakuje w estetyczne kartony i wycenia na sześćdziesiąt złotych za sztukę.",
        ),
        T(
          "Over her first weekend, eager neighborhood fans order one hundred pizzas, handing her fifteen hundred dollars in cash.",
          "Am ersten Wochenende bestellen begeisterte Nachbarn 100 Pizzen und zahlen 1.500 Euro bar.",
          "W pierwszy weekend zachwyceni sąsiedzi zamawiają sto pizz, wręczając jej sześć tysięcy złotych w gotówce.",
        ),
      ],
      PizzaLaunchDiagram,
    ),
    animatedBeat(
      [
        T(
          "Before celebrating her total sales, Aish analyzes her *unit economics*: the money behind a single pizza.",
          "Bevor Mia feiert, berechnet sie ihre *Stueckkosten*: die genaue Rechnung hinter einer einzigen Pizza.",
          "Zanim Ania zacznie świętować, analizuje *ekonomikę jednostkową*: koszty pojedynczej upieczonej pizzy.",
        ),
        T(
          "Flour, San Marzano tomato sauce, fresh mozzarella cheese, and the cardboard box cost exactly four dollars per unit.",
          "Mehl, San-Marzano-Tomaten, frischer Mozzarella und der Karton kosten exakt vier Euro je Einheit.",
          "Mąka, sos pomidorowy, świeża mozzarella oraz kartonowe pudełko kosztują dokładnie szesnaście złotych za sztukę.",
        ),
        T(
          "Subtracting four dollars from fifteen dollars leaves eleven dollars of *gross profit*, a healthy seventy-three percent *gross margin*.",
          "Zieht sie vier von 15 Euro ab, bleiben elf Euro *Rohertrag*, eine starke *Rohmarge* von 73 Prozent.",
          "Odejmując szesnaście złotych od sześćdziesięciu, uzyskuje czterdzieści cztery złote *zysku brutto*, czyli 73 procent *marży brutto*.",
        ),
      ],
      UnitEconomicsDiagram,
    ),
    animatedBeat(
      [
        T(
          "Next, Aish pays her operating delivery expenses: her friend bike courier wage, phone app fees, and oven gas.",
          "Dann zahlt Mia die Betriebskosten: den Lohn des Fahrradkuriers, App-Gebuehren und Ofengas.",
          "Następnie Ania pokrywa koszty operacyjne: wynagrodzenie kuriera na rowerze, prowizję aplikacji i gaz do pieca.",
        ),
        T(
          "For one hundred pizzas, these overhead costs total eight hundred dollars across the weekend.",
          "Fuer 100 Pizzen summieren sich diese laufenden Kosten auf insgesamt 800 Euro am Wochenende.",
          "Przy stu zamówionych pizzach te koszty stałe wynoszą łącznie trzy tysiące dwieście złotych za weekend.",
        ),
        T(
          "Subtracting overhead leaves three hundred dollars of real *net profit*, giving her business a solid twenty percent *net margin*.",
          "Nach Abzug aller Kosten bleiben 300 Euro echter *Reingewinn*, was einer soliden *Nettomarge* von 20 Prozent entspricht.",
          "Po odliczeniu wszystkich wydatków zostaje jej tysiąc dwieście złotych czystego *zysku netto*, dając dwadzieścia procent *marży netto*.",
        ),
      ],
      DeliveryOpExDiagram,
    ),
    animatedBeat(
      [
        T(
          "A common beginner mistake is cutting menu prices by four dollars to undercut massive national pizza chains.",
          "Ein typischer Anfaengerfehler ist es, Preise um vier Euro zu senken, um Grossketten zu unterbieten.",
          "Częstym błędem początkujących jest obniżanie ceny o kilkanaście złotych, by konkurować z wielkimi sieciówkami.",
        ),
        T(
          "Because four dollars was her entire net profit per pizza, that discount wipes out one hundred percent of her earnings.",
          "Weil vier Euro ihr gesamter Reingewinn waren, loescht dieser Rabatt 100 Prozent ihres Gewinns aus.",
          "Ponieważ kilkanaście złotych stanowiło cały jej zysk netto z pizzy, taki rabat kasuje cały jej dochód do zera.",
        ),
        T(
          "Smart founders never compete in a race to the bottom: they protect their profit margin through outstanding quality and loyalty.",
          "Kluge Gruender meiden Preiskaempfe nach unten: sie schuetzen ihre Gewinnmarge durch Spitzenqualitaet und treue Fans.",
          "Mądrzy przedsiębiorcy unikają wojny na najniższe ceny: chronią swoją marżę najwyższą jakością i lojalnością klientów.",
        ),
      ],
      PricingPowerDiagram,
    ),
    animatedBeat(
      [
        T(
          "With her healthy twenty percent net profit margin, Aish can reliably save money to expand into a second campus kitchen.",
          "Mit ihrer gesunden 20-Prozent-Marge kann Mia Ruecklagen bilden, um eine zweite Kueche am Campus zu eroeffnen.",
          "Dzięki zdrowej dwudziestoprocentowej marży netto Ania może bezpiecznie odkładać zysk na otwarcie drugiego punktu przy uczelni.",
        ),
        T(
          "When each unit of product earns positive net cash, scaling up the business multiplies your wealth safely.",
          "Wenn jedes verkaufte Produkt echten Reingewinn bringt, vervielfacht Expansion deinen Wohlstand ohne Risiko.",
          "Gdy każda sprzedana sztuka towaru generuje czysty zysk, rozwój firmy bezpiecznie pomnaża Twój kapitał.",
        ),
        T(
          "Master unit economics first, and your business can grow into an unstoppable regional champion.",
          "Meistere zuerst die Stueckkosten, und dein Unternehmen kann zu einem echten Champion heranwachsen.",
          "Opanuj najpierw ekonomikę jednostkową, a Twoje przedsięwzięcie rozwinie się w stabilną i zyskowną markę.",
        ),
      ],
      KitchenExpansionDiagram,
    ),
  ],
  toyIntro: T(
    "Simulate pizza delivery volume and watch how gross and net margins behave as fixed costs dilute.",
    "Simuliere das Bestellvolumen und beobachte, wie sich Roh- und Nettomargen bei steigender Stueckzahl veraendern.",
    "Zasymuluj liczbę zamówień pizzy i zobacz, jak marża brutto i netto reagują na rozkładanie kosztów stałych.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "What does unit economics examine in a business model?",
        "Was untersucht die Stueckkalkulation in einem Geschaeftsmodell?",
        "Co bada ekonomika jednostkowa w modelu biznesowym?",
      ),
      options: [
        {
          text: T(
            "Revenues and direct costs associated with producing one single unit of product",
            "Erloese und direkte Kosten bezogen auf eine einzelne produzierte Einheit",
            "Przychody i bezpośrednie koszty powiązane z wytworzeniem pojedynczej sztuki produktu",
          ),
          correct: true,
        },
        {
          text: T(
            "The total tax bracket of the company founders",
            "Die persoenliche Steuerklasse der Unternehmensgruender",
            "Stawkę podatkową właścicieli przedsiębiorstwa",
          ),
        },
        {
          text: T(
            "The number of square feet in the main company warehouse",
            "Die Gesamtflaeche der Firmenlagerhalle in Quadratmetern",
            "Powierzchnię magazynu firmowego w metrach kwadratowych",
          ),
        },
      ],
      hint: T(
        "Focus on the economics of an individual item sold.",
        "Konzentriere dich auf die Wirtschaftlichkeit eines einzelnen verkauften Artikels.",
        "Skup się na zyskowności pojedynczego sprzedawanego artykułu.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "Why can cutting prices by even a small dollar amount destroy a company profitability?",
        "Warum kann selbst ein kleiner Preisnachlass die Rentabilitaet eines Unternehmens zerstoeren?",
        "Dlaczego nawet niewielka obniżka ceny może zniszczyć rentowność firmy?",
      ),
      options: [
        {
          text: T(
            "Price cuts come directly out of net profit, not out of ingredient or direct costs",
            "Rabatte gehen voll vom Reingewinn ab, nicht von den Material- oder Fixkosten",
            "Obniżka ceny uderza bezpośrednio w zysk netto, a nie w koszty składników czy koszty stałe",
          ),
          correct: true,
        },
        {
          text: T(
            "Customers legally refuse to buy discounted food items",
            "Kunden weigern sich gesetzlich, rabattierte Speisen zu kaufen",
            "Klienci prawnie odmawiają zakupu przecenionej żywności",
          ),
        },
        {
          text: T(
            "Banks immediately cancel the business account upon seeing discounts",
            "Banken kuendigen das Geschaeftskonto sofort bei Rabattaktionen",
            "Banki natychmiast zamykają rachunek firmowy na widok promocji",
          ),
        },
      ],
      hint: T(
        "Think about which slice of the revenue dollar shrinks when price drops.",
        "Bedenke, welcher Teil des Euros schrumpft, wenn der Preis faellt.",
        "Zastanów się, która część przychodu znika w pierwszej kolejności przy obniżce ceny.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Calculate the net profit per unit given the selling price, COGS, and operating expenses.",
        "Berechne den Reingewinn je Einheit aus Verkaufspreis, Materialkosten und Betriebskosten.",
        "Oblicz zysk netto na sztuce na podstawie ceny sprzedaży, kosztu wytworzenia i wydatków operacyjnych.",
      ),
      Widget: ProfitWidget,
      hint: T(
        "Subtract both ingredients and operating delivery expenses from the selling price.",
        "Ziehe sowohl Zutaten als auch Lieferkosten vom Verkaufspreis ab.",
        "Odejmij od ceny sprzedaży zarówno koszt składników, jak i koszty dostawy.",
      ),
    },
  ],
  askDad: T(
    "Ask your parent: What is the typical net profit margin in their company or field of work?",
    "Frage deine Eltern: Wie hoch ist die typische Nettogewinnmarge in ihrem Unternehmen oder ihrer Branche?",
    "Zapytaj rodziców: Ile wynosi typowa marża zysku netto w ich firmie lub branży, w której pracują?",
  ),
  realLife: {
    title: T(
      "Real world: Fast-casual restaurant unit economics",
      "Echte Welt: Stueckkosten in der modernen Systemgastronomie",
      "Prawdziwy świat: Ekonomika jednostkowa w nowoczesnej gastronomii",
    ),
    body: T(
      "Major restaurant brands like Domino's or Chipotle track store-level unit economics down to fractions of a cent per ingredient portion. A 1% change in cheese or poultry costs can swing company-wide annual operating earnings by tens of millions of dollars.",
      "Grosse Ketten wie Domino's oder Chipotle analysieren Stueckkosten bis auf den Bruchteil eines Cents je Zutat. Eine Schwankung von nur 1% bei Kaese oder Fleisch veraendert den Konzerngewinn um Millionenbetraege.",
      "Duże marki restauracyjne takie jak Domino's czy Chipotle analizują ekonomikę jednostkową z dokładnością do ułamków grosza za porcję składnika. Zmiana cen sera lub mięsa o zaledwie 1% wpływa na roczny zysk operacyjny firmy w skali milionów.",
    ),
  },
  factCard: {
    claims: [
      {
        text: T(
          "The US National Restaurant Association reports that the average independent restaurant operates on a pre-tax net profit margin of 3% to 5%.",
          "Die US-Gastronomievereinigung berichtet, dass unabhaengige Restaurants mit Vorsteuer-Nettomargen von nur 3 bis 5 Prozent arbeiten.",
          "Amerykańskie Stowarzyszenie Restauratorów podaje, że przeciętna niezależna restauracja działa na marży zysku netto przed opodatkowaniem wynoszącej zaledwie od 3 do 5 procent.",
        ),
        source: "https://restaurant.org/research-and-media/research/economists-notebook/",
      },
      {
        text: T(
          "Contribution margin is defined in managerial accounting as revenue minus all variable expenses.",
          "Der Deckungsbeitrag ist im internen Rechnungswesen definiert als Umsatz abzueglich aller variablen Kosten.",
          "Marża pokrycia w rachunkowości zarządczej to przychód pomniejszony o wszystkie koszty zmienne.",
        ),
        source: "https://www.accountingtools.com/articles/contribution-margin.html",
      },
      {
        text: T(
          "Destatis collects annual corporate turnover and operational profitability statistics across Germany's food and hospitality sector.",
          "Destatis veroeffentlicht regelmaessig Ertragsstatistiken fuer das deutsche Gastgewerbe.",
          "Destatis regularnie publikuje dane o przychodach i rentowności operacyjnej przedsiębiorstw w niemieckim sektorze gastronomicznym.",
        ),
        source:
          "https://www.destatis.de/DE/Themen/Wirtschaft/Binnenhandel-Gastgewerbe/_inhalt.html",
      },
      {
        text: T(
          "Unit economics modeling forms a foundational requirement for venture capital pitch decks when evaluating early-stage business models.",
          "Die Analyse der Stueckkosten bildet eine Kernanforderung fuer Investoren bei der Pruefung junger Unternehmen.",
          "Analiza ekonomiki jednostkowej stanowi kluczowy element prezentacji dla funduszy venture capital przy ocenie modeli biznesowych.",
        ),
        source: "https://hbr.org/2021/04/how-to-calculate-customer-lifetime-value",
      },
      {
        text: T(
          "The breakeven point occurs at the sales volume where total revenues exactly equal the sum of fixed and variable costs.",
          "Der Break-even-Punkt ist erreicht, wenn der Gesamtumsatz genau der Summe aus Fixkosten und variablen Kosten entspricht.",
          "Próg rentowności (break-even point) to poziom sprzedaży, przy którym łączne przychody dokładnie pokrywają sumę kosztów stałych i zmiennych.",
        ),
        source: "https://www.britannica.com/money/break-even-point",
      },
    ],
    simplified: [
      T(
        "Complex multi-tiered sales taxes and commercial lease amortizations are grouped into standard operating expense lines.",
        "Komplexe Gewerbesteuern und Pachtabschreibungen werden zu einheitlichen Betriebsausgaben zusammengefasst.",
        "Złożone podatki obrotowe i odpisy amortyzacyjne lokalu uproszczono do jednolitej pozycji kosztów operacyjnych.",
      ),
    ],
  },
};
