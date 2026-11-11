import { useState } from "react";
import { animatedBeat } from "../../../lesson/toolkit";
import type { DiagramProps, Lesson, Text, ToyProps, WidgetProps } from "../../../lesson/types";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

/**
 * Beat 1: Meet Karan. Sells pizza at soccer field, counts $500 cash in box. But that is revenue, not profit!
 * Step 1: Karan and his soccer field sourdough pizza stand.
 * Step 2: Wooden money box fills with $500 cash.
 * Step 3: Total Revenue card: $500 gross sales != profit.
 */
function PizzaStandRevenueDiagram({ lang, step }: DiagramProps) {
  const karanName = lang === "pl" ? "Aleksander" : lang === "de" ? "Felix" : "Karan";
  const label =
    lang === "pl"
      ? "Stoisko z pizzą Aleksandra i przychód w kasetce"
      : lang === "de"
        ? "Felix Pizzastand und Barumsatz in der Kasse"
        : "Karan pizza stand and total cash revenue";

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

      {/* Karan avatar */}
      <g>
        <circle cx="80" cy="110" r="28" fill="#f3cfa6" stroke="#23383f" strokeWidth="2" />
        <path d="M 52 105 C 52 70 108 70 108 105" fill="#451a03" />
        {/* Chef hat */}
        <path
          d="M 60 88 C 50 65 110 65 100 88 Z"
          fill="#ffffff"
          stroke="#23383f"
          strokeWidth="1.5"
        />
        <circle cx="72" cy="107" r="2.5" fill="#23383f" />
        <circle cx="88" cy="107" r="2.5" fill="#23383f" />
        <path d="M 76 119 Q 80 125 84 119" stroke="#23383f" strokeWidth="2" fill="none" />
        <path
          d="M 56 185 L 62 140 Q 80 135 98 140 L 104 185 Z"
          fill="#dc2626"
          stroke="#23383f"
          strokeWidth="2"
        />
        <text x="80" y="205" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#991b1b">
          {karanName}
        </text>
      </g>

      {/* Stand badge */}
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
        <text x="250" y="55" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#92400e">
          🍕{" "}
          {lang === "pl"
            ? "Stoisko z pizzą przy boisku"
            : lang === "de"
              ? "Sauerteig-Pizzastand am Sportplatz"
              : "Artisan Pizza Pop-Up Stand"}
        </text>
      </g>

      {/* Step 2: Cash in Box */}
      {step >= 2 && (
        <g>
          <rect
            x="135"
            y="80"
            width="230"
            height="50"
            rx="8"
            fill="#ecfdf5"
            stroke="#059669"
            strokeWidth="1.5"
          />
          <text x="250" y="105" textAnchor="middle" fontSize="16">
            📦 💵 💵 💵
          </text>
          <text x="250" y="122" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#065f46">
            {lang === "pl"
              ? "Kasetka pełna gotówki: 2 000 zł"
              : lang === "de"
                ? "Volle Kasse: 500 € Bargeld"
                : "Cash Box Stuffed: $500 Cash"}
          </text>
        </g>
      )}

      {/* Step 3: Clarifying Revenue vs Profit */}
      {step >= 3 && (
        <g>
          <rect
            x="135"
            y="145"
            width="230"
            height="60"
            rx="8"
            fill="#dbeafe"
            stroke="#2563eb"
            strokeWidth="2"
          />
          <text x="250" y="170" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1e40af">
            {lang === "pl"
              ? "Przychód (Revenue): 2 000 zł"
              : lang === "de"
                ? "Umsatz (Revenue): 500 €"
                : "Total Revenue: $500"}
          </text>
          <text x="250" y="192" textAnchor="middle" fontSize="10.5" fill="#1e3a8a">
            {lang === "pl"
              ? "To łączna sprzedaż, jeszcze nie zysk!"
              : lang === "de"
                ? "Gesamteinnahme, noch KEIN Gewinn!"
                : "Total sales money before paying any bills!"}
          </text>
        </g>
      )}
    </svg>
  );
}

/**
 * Beat 2: Subtracting ingredients (COGS) to find Gross Profit.
 * Step 1: Revenue $500.
 * Step 2: Ingredients cost $150 (flour, tomatoes, mozzarella, boxes).
 * Step 3: Gross profit: $350 (70% gross margin).
 */
function GrossProfitDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Odliczenie kosztów składników i obliczenie zysku brutto"
      : lang === "de"
        ? "Abzug der Materialkosten und Rohertrag"
        : "Cost of goods sold and gross profit";

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

      {/* Revenue bar */}
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
        <text x="55" y="60" fontSize="12" fontWeight="bold" fill="#1e40af">
          {lang === "pl" ? "Przychód: 2 000 zł" : lang === "de" ? "Umsatz: 500 €" : "Revenue: $500"}
        </text>
        <text x="345" y="60" textAnchor="end" fontSize="11" fill="#3b82f6">
          100%
        </text>
      </g>

      {/* Step 2: Raw Ingredients / COGS */}
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
              ? "- Składniki (Mąka, ser, kartony): 600 zł"
              : lang === "de"
                ? "- Zutaten (Mehl, Tomaten, Kartons): 150 €"
                : "- Raw Ingredients & Boxes (COGS): $150"}
          </text>
          <text x="55" y="124" fontSize="10" fill="#991b1b">
            {lang === "pl"
              ? "Koszty bezpośrednie wytworzenia pizzy"
              : lang === "de"
                ? "Direkte Warenkosten je Pizza"
                : "Direct cost to make each pizza"}
          </text>
          <text x="345" y="112" textAnchor="end" fontSize="11" fill="#dc2626">
            30%
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
              ? "= Zysk brutto (Gross Profit): 1 400 zł"
              : lang === "de"
                ? "= Rohertrag (Gross Profit): 350 €"
                : "= Gross Profit: $350"}
          </text>
          <text x="55" y="190" fontSize="10.5" fill="#b45309">
            {lang === "pl"
              ? "Marża brutto: 70% (pieniądze na pokrycie kosztów stałych)"
              : lang === "de"
                ? "Rohmarge: 70% (Geld zur Deckung der Betriebskosten)"
                : "70% Gross Margin to cover oven, fuel, and helpers"}
          </text>
          <text x="345" y="176" textAnchor="end" fontSize="16">
            🧀✨
          </text>
        </g>
      )}
    </svg>
  );
}

/**
 * Beat 3: Operating expenses: Gas canisters, spot rent, brother's help -> Net Profit!
 * Step 1: Gross profit $350.
 * Step 2: OpEx: Gas $40, spot fee $40, brother's wage $30 (-$110 total).
 * Step 3: Net profit: $240 (48% Net margin). The real bottom line.
 */
function NetProfitBreakdownDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Koszty operacyjne i ostateczny zysk netto"
      : lang === "de"
        ? "Betriebskosten und Reingewinn"
        : "Operating expenses and net profit";

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
            ? "Zysk brutto ze sprzedaży: 1 400 zł"
            : lang === "de"
              ? "Rohertrag aus Pizza: 350 €"
              : "Gross Profit: $350"}
        </text>
      </g>

      {/* Step 2: OpEx Breakdown */}
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
              ? "- Koszty operacyjne: 400 zł"
              : lang === "de"
                ? "- Betriebskosten (OpEx): 110 €"
                : "- Operating Expenses (OpEx): $110"}
          </text>
          <text x="55" y="117" fontSize="10" fill="#be123c">
            {lang === "pl"
              ? "🔥 Gaz do pieca (140 zł) • ⚽ Miejsce (160 zł) • 👦 Pomoc brata (100 zł)"
              : lang === "de"
                ? "🔥 Gasflaschen (40 €) • ⚽ Standplatz (40 €) • 👦 Hilfe Bruder (30 €)"
                : "🔥 Oven gas ($40) • ⚽ Pitch rent ($40) • 👦 Brother helper ($30)"}
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
              ? "🎉 Zysk netto (Net Profit): 1 000 zł!"
              : lang === "de"
                ? "🎉 Reingewinn (Net Profit): 240 €!"
                : "🎉 Net Profit: $240 Real Take-Home!"}
          </text>
          <text x="55" y="189" fontSize="10.5" fill="#166534">
            {lang === "pl"
              ? "Prawdziwy wynik na czysto: należy w 100% do Ciebie"
              : lang === "de"
                ? "Das echte Endergebnis: Gehoert dem Gruender ganz allein"
                : "The bottom line: The only money you actually earned as owner"}
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
 * Beat 4: Protecting margins: Confusing revenue with profit vs healthy buffers against price hikes.
 * Step 1: Warning: Spending revenue as profit leads to bankruptcy.
 * Step 2: Ingredient price spike risk (cheese price jumps).
 * Step 3: Healthy profit margins absorb cost surges safely.
 */
function MarginSafetyDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Ochrona marży przed wzrostem kosztów"
      : lang === "de"
        ? "Margensicherheit gegen steigende Kosten"
        : "Margin protection against cost shocks";

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

      {/* Step 1: The Trap */}
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
          {lang === "pl" ? "Pułapka Przychodu" : lang === "de" ? "Die Umsatzfalle" : "Revenue Trap"}
        </text>
        <text x="112" y="90" textAnchor="middle" fontSize="22">
          💸 ⚠️
        </text>
        <text x="112" y="115" textAnchor="middle" fontSize="10" fill="#9f1239">
          {lang === "pl"
            ? "Wydajesz utarg"
            : lang === "de"
              ? "Geld ausgegeben"
              : "Spent sales cash"}
        </text>
        <text x="112" y="132" textAnchor="middle" fontSize="10" fill="#9f1239">
          {lang === "pl"
            ? "Brak kasy na mąkę"
            : lang === "de"
              ? "Kein Mehl naechste Woche"
              : "No flour next week"}
        </text>
        <rect x="45" y="145" width="135" height="26" rx="4" fill="#fecdd3" />
        <text x="112" y="162" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#9f1239">
          {lang === "pl"
            ? "Bankructwo stoiska"
            : lang === "de"
              ? "Insolvenzgefahr"
              : "Risk of Failure"}
        </text>
      </g>

      {/* Step 2: Ingredient Price Shock */}
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
            {lang === "pl" ? "Mądra Marża" : lang === "de" ? "Gesunde Marge" : "Protected Margin"}
          </text>
          <text x="287" y="90" textAnchor="middle" fontSize="22">
            🛡️ 📈
          </text>
          <text x="287" y="115" textAnchor="middle" fontSize="10" fill="#166534">
            {lang === "pl"
              ? "Ser podrożał o 20%"
              : lang === "de"
                ? "Kaesepreis steigt 20%"
                : "Cheese price rises 20%"}
          </text>
          <text x="287" y="132" textAnchor="middle" fontSize="10" fill="#166534">
            {lang === "pl"
              ? "Marża to amortyzuje"
              : lang === "de"
                ? "Marge faengt es auf"
                : "Buffer absorbs shock"}
          </text>
          <rect x="220" y="145" width="135" height="26" rx="4" fill="#bbf7d0" />
          <text x="287" y="162" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#14532d">
            {lang === "pl"
              ? "Firma nadal zyskuje!"
              : lang === "de"
                ? "Bleibt profitabel!"
                : "Always Profitable!"}
          </text>
        </g>
      )}

      {/* Step 3: Rule Banner */}
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
              ? "Chroń marżę, by nieprzewidziane koszty nie zniszczyły biznesu"
              : lang === "de"
                ? "Schuetze deine Marge, damit Preisschoecke dich nicht treffen"
                : "Healthy profit margins protect your enterprise from inflation"}
          </text>
        </g>
      )}
    </svg>
  );
}

/**
 * Beat 5: Reinvesting retained earnings into a second pizza stone oven.
 * Step 1: Half of net profits saved ($120).
 * Step 2: Buying second fast pizza stone oven.
 * Step 3: Baking capacity doubles: kitchen project becomes a local legend!
 */
function ReinvestmentFlywheelDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Reinwestycja zysku w drugi piec i podwojenie mocy"
      : lang === "de"
        ? "Reinvestition des Gewinns in zweiten Ofen"
        : "Reinvesting retained earnings into equipment";

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

      {/* Step 1: Retained Earnings */}
      <g>
        <rect
          x="35"
          y="45"
          width="95"
          height="75"
          rx="8"
          fill="#fce7f3"
          stroke="#db2777"
          strokeWidth="1.5"
        />
        <text x="82" y="70" textAnchor="middle" fontSize="18">
          💰
        </text>
        <text x="82" y="90" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#9d174d">
          {lang === "pl" ? "Zatrzymany zysk" : lang === "de" ? "Gewinnruecklage" : "Retained"}
        </text>
        <text x="82" y="105" textAnchor="middle" fontSize="9.5" fill="#be185d">
          +$120
        </text>
      </g>

      {/* Step 2: New Second Oven */}
      {step >= 2 && (
        <g>
          <path d="M 135 82 L 175 82" stroke="#a21caf" strokeWidth="3" markerEnd="url(#arrow)" />
          <rect
            x="180"
            y="45"
            width="100"
            height="75"
            rx="8"
            fill="#ede9fe"
            stroke="#7c3aed"
            strokeWidth="1.5"
          />
          <text x="230" y="72" textAnchor="middle" fontSize="20">
            🔥 🍕
          </text>
          <text x="230" y="92" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#6d28d9">
            {lang === "pl" ? "Drugi piec" : lang === "de" ? "Zweiter Ofen" : "Second Oven"}
          </text>
          <text x="230" y="106" textAnchor="middle" fontSize="9" fill="#5b21b6">
            2x Capacity
          </text>
        </g>
      )}

      {/* Step 3: Enterprise Scale */}
      {step >= 3 && (
        <g>
          <path d="M 285 82 L 315 82" stroke="#a21caf" strokeWidth="3" markerEnd="url(#arrow)" />
          <circle cx="345" cy="82" r="28" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
          <text x="345" y="80" textAnchor="middle" fontSize="16">
            🚀
          </text>
          <text x="345" y="96" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#15803d">
            Scale
          </text>

          <rect x="40" y="145" width="320" height="60" rx="8" fill="#701a75" />
          <text x="200" y="170" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#ffffff">
            {lang === "pl"
              ? "Reinwestycja zysku tworzy machinę wzrostu"
              : lang === "de"
                ? "Reinvestition verwandelt Ideen in Grossunternehmen"
                : "Reinvesting profits builds long-term economic power"}
          </text>
          <text x="200" y="190" textAnchor="middle" fontSize="10" fill="#f5d0fe">
            {lang === "pl"
              ? "Lepszy sprzęt = podwojona sprzedaż = trwała niezależność"
              : lang === "de"
                ? "Bessere Geraete = doppelte Produktion = nachhaltiges Wachstum"
                : "Better tools bake twice as many pizzas in the same weekend hours"}
          </text>
        </g>
      )}
    </svg>
  );
}

function Toy({ onDone }: ToyProps) {
  const [price, setPrice] = useState(20);
  const costPerUnit = 8;
  const fixedCosts = 500;
  const units = 100;

  const revenue = price * units;
  const variableCosts = costPerUnit * units;
  const grossProfit = revenue - variableCosts;
  const netProfit = grossProfit - fixedCosts;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "center" }}>
      <p style={{ margin: 0, fontWeight: 700, fontSize: "1rem" }}>
        Price: ${price} | Revenue: ${revenue} | Net Profit: ${netProfit}
      </p>
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          type="button"
          className="btn"
          onClick={() => {
            setPrice((p) => {
              const next = p + 5;
              if (next >= 30) onDone?.();
              return next;
            });
          }}
        >
          Increase Price (+$5)
        </button>
        <button type="button" className="btn btn-quiet" onClick={() => setPrice(20)}>
          Reset Baseline
        </button>
      </div>
      <div
        style={{
          padding: "12px",
          background: netProfit > 0 ? "#eef8ef" : "#ffe3e3",
          borderRadius: "10px",
          width: "100%",
          textAlign: "center",
        }}
      >
        Gross Margin: {Math.round((grossProfit / revenue) * 100)}% | Net Margin:{" "}
        {Math.round((netProfit / revenue) * 100)}%
      </div>
    </div>
  );
}

function BusinessWidget({ onAnswer }: WidgetProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
      <p style={{ margin: 0 }}>
        If a company makes $1,000,000 in sales but spends $950,000 in total expenses, what is its
        net profit?
      </p>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>
        $950,000
      </button>
      <button type="button" className="btn" onClick={() => onAnswer(true)}>
        $50,000 (a 5% net margin)
      </button>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>
        $1,000,000
      </button>
    </div>
  );
}

export const lesson: Lesson = {
  id: "business",
  story: [
    animatedBeat(
      [
        T(
          "Meet Karan. On weekends, he sets up a fresh sourdough pizza pop-up stand at the neighborhood soccer field.",
          "Das ist Felix. Am Wochenende betreibt er einen Sauerteig-Pizzastand am oertlichen Sportplatz.",
          "Poznaj Aleksandra. W weekendy rozstawia stoisko ze świeżą pizzą rzemieślniczą przy boisku osiedlowym.",
        ),
        T(
          "After a bustling Saturday match, his wooden money box is stuffed with five hundred dollars in cash.",
          "Nach einem spannenden Fussballspiel zaehlt er stolze 500 Euro bar in seiner Kasse.",
          "Po zaciętym meczu jego drewniana kasetka pęka w szwach: zebrał dwa tysiące złotych w gotówce.",
        ),
        T(
          "Many beginners think Karan just made five hundred dollars of pure profit. But that is only his *revenue*.",
          "Viele denken, Felix haette 500 Euro Gewinn gemacht. Aber das ist nur sein *Umsatz*.",
          "Wielu myśli, że Aleksander zarobił na czysto całą tę sumę. Ale to zaledwie jego *przychód*.",
        ),
      ],
      PizzaStandRevenueDiagram,
    ),
    animatedBeat(
      [
        T(
          "First, Karan has to pay for the raw ingredients: imported flour, crushed tomatoes, mozzarella, and cardboard pizza boxes.",
          "Zuerst muss Felix die Zutaten bezahlen: Mehl, Tomatensauce, Mozzarella und Kartons.",
          "Najpierw Aleksander musi opłacić składniki: włoską mąkę, sos pomidorowy, ser mozzarella i kartonowe pudełka.",
        ),
        T(
          "These direct ingredients cost one hundred and fifty dollars.",
          "Diese direkten Zutaten kosten ihn 150 Euro.",
          "Te bezpośrednie składniki kosztowały go sześćset złotych.",
        ),
        T(
          "When he subtracts ingredients from revenue, he gets three hundred and fifty dollars in *gross profit*.",
          "Zieht er das Mehl vom Umsatz ab, bleiben 350 Euro *Rohertrag* (Gross Profit).",
          "Gdy odejmie koszt składników od przychodu, zostaje mu tysiąc czterysta złotych *zysku brutto*.",
        ),
      ],
      GrossProfitDiagram,
    ),
    animatedBeat(
      [
        T(
          "Next come operating expenses: five gas canisters for his portable oven and renting the field table spot.",
          "Dazu kommen laufende Kosten: Gasflaschen fuer den Pizzaofen und Standgebuehr am Sportplatz.",
          "Następnie dochodzą koszty operacyjne: butle z gazem do pieca oraz opłata za miejsce przy boisku.",
        ),
        T(
          "He also pays his younger brother thirty dollars for washing dough bowls and folding boxes.",
          "Zudem gibt er seinem Bruder 30 Euro dafuer, Schuesseln zu spuelen und Kartons zu falten.",
          "Płaci też młodszemu bratu sto złotych za zmywanie misek i składanie kartonów.",
        ),
        T(
          "After subtracting these overhead costs, Karan is left with two hundred and forty dollars in *net profit*.",
          "Zieht er all das ab, bleiben Felix am Ende 240 Euro echter *Reingewinn* (Net Profit).",
          "Dopiero po odliczeniu wszystkich kosztów stałych zostaje mu tysiąc złotych prawdziwego *zysku netto*.",
        ),
      ],
      NetProfitBreakdownDiagram,
    ),
    animatedBeat(
      [
        T(
          "Net profit is the real bottom line: the only money that actually belongs to the business owner.",
          "Der Reingewinn ist das Endergebnis: das einzige Geld, das dem Gruender wirklich gehoert.",
          "Zysk netto to prawdziwy wynik na czysto: jedyne pieniądze, które faktycznie należą do twórcy.",
        ),
        T(
          "If you confuse revenue with net profit, you might spend money that was meant for next week flour and go broke.",
          "Verwechselt man Umsatz mit Gewinn, gibt man Geld aus, das fuer Mehl gedacht war, und geht pleite.",
          "Gdyby pomylić przychód z zyskiem, można wydać pieniądze potrzebne na mąkę na kolejny tydzień i zbankrutować.",
        ),
        T(
          "Smart entrepreneurs protect their profit margin so unexpected ingredient price hikes do not crush them.",
          "Kluge Gruender kalkulieren gesunde Margen, damit steigende Kaesepreise sie nicht ruinieren.",
          "Mądrzy przedsiębiorcy dbają o bezpieczną marżę, by nagły wzrost cen sera nie zniszczył ich stoiska.",
        ),
      ],
      MarginSafetyDiagram,
    ),
    animatedBeat(
      [
        T(
          "Karan uses half his net profit to buy a second pizza stone oven that bakes pizzas twice as fast.",
          "Felix nutzt die Haelfte des Gewinns fuer einen zweiten Ofen, der doppelt so schnell backt.",
          "Aleksander przeznacza połowę zysku netto na zakup drugiego pieca, który piecze dwa razy szybciej.",
        ),
        T(
          "This is called *reinvesting retained earnings*: putting your profits back into tools that expand your capacity.",
          "Das nennt man *Reinvestition*: Gewinne in bessere Werkzeuge stecken, um mehr zu schaffen.",
          "To nazywa się *reinwestycją zysku*: wkładaniem zarobionych pieniędzy w narzędzia podwajające możliwości.",
        ),
        T(
          "That is how small kitchen projects transform into thriving, legendary neighborhood enterprises.",
          "So verwandeln sich kleine Garagenideen in erfolgreiche, gesunde Unternehmen.",
          "Właśnie tak małe projekty domowe przekształcają się w prężne, lubiane firmy z perspektywami.",
        ),
      ],
      ReinvestmentFlywheelDiagram,
    ),
  ],
  toyIntro: T(
    "Adjust prices and see how gross margin and net margin respond.",
    "Passe Preise an und beobachte, wie Rohmarge und Nettomarge reagieren.",
    "Dostosuj ceny i zobacz, jak reagują marża brutto oraz marża netto.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "What is the difference between revenue and net profit?",
        "Was ist der Unterschied zwischen Umsatz und Reingewinn?",
        "Jaka jest różnica między przychodem a zyskiem netto?",
      ),
      options: [
        {
          text: T(
            "Revenue is total sales; net profit is what remains after all costs and taxes",
            "Umsatz ist die Gesamteinnahme; Reingewinn bleibt nach allen Kosten und Steuern",
            "Przychód to łączna sprzedaż; zysk netto to kwota po odliczeniu wszystkich kosztów i podatków",
          ),
          correct: true,
        },
        {
          text: T(
            "Revenue is always smaller than net profit",
            "Umsatz ist immer kleiner als der Reingewinn",
            "Przychód jest zawsze mniejszy niż zysk netto",
          ),
        },
        {
          text: T(
            "Net profit only includes physical cash in the cash register",
            "Reingewinn umfasst nur Bargeld in der Ladenkasse",
            "Zysk netto obejmuje wyłącznie gotówkę w kasie fiskalnej",
          ),
        },
      ],
      hint: T(
        "Profit accounts for all expenses incurred to generate that revenue.",
        "Gewinn beruecksichtigt alle Ausgaben zur Erzielung des Umsatzes.",
        "Zysk uwzględnia wszystkie wydatki poniesione na wygenerowanie przychodu.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "Why can software companies often achieve higher gross margins than supermarkets?",
        "Warum erzielen Softwarefirmen oft hoehere Rohmargen als Supermaerkte?",
        "Dlaczego firmy technologiczne osiągają wyższe marże brutto niż supermarkety?",
      ),
      options: [
        {
          text: T(
            "Digital products have near-zero marginal replication and material costs",
            "Digitale Produkte haben nahezu keine Grenzkosten fuer Kopie und Material",
            "Produkty cyfrowe nie generują niemal żadnych kosztów kopiowania ani materiałów",
          ),
          correct: true,
        },
        {
          text: T(
            "Software companies are legally forbidden from paying taxes",
            "Softwarefirmen muessen gesetzlich keine Steuern zahlen",
            "Firmom informatycznym prawo zabrania płacenia podatków",
          ),
        },
        {
          text: T(
            "Supermarkets never sell food items at a markup",
            "Supermaerkte verkaufen Lebensmittel nie mit Aufschlag",
            "Supermarkety nigdy nie nakładają marży na sprzedawaną żywność",
          ),
        },
      ],
      hint: T(
        "Distributing code to another user costs almost nothing extra.",
        "Code an einen weiteren Nutzer auszuliefern kostet fast nichts zusaetzlich.",
        "Wysłanie kodu kolejnemu użytkownikowi praktycznie nic dodatkowo nie kosztuje.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Calculate the net profit from the given sales and expense figures.",
        "Berechne den Reingewinn aus den angegebenen Umsatz- und Kostenzahlen.",
        "Oblicz zysk netto na podstawie podanych danych o sprzedaży i kosztach.",
      ),
      Widget: BusinessWidget,
      hint: T(
        "Subtract total expenses from total revenue.",
        "Ziehe die Gesamtkosten vom Gesamtumsatz ab.",
        "Odejmij łączne koszty od całkowitych przychodów.",
      ),
    },
  ],
  askDad: T(
    "Ask your parent: What are the main operating expenses in their workplace or industry?",
    "Frage deine Eltern: Was sind die wichtigsten Betriebskosten in ihrem Unternehmen oder ihrer Branche?",
    "Zapytaj rodziców: Jakie są główne koszty operacyjne w ich miejscu pracy lub branży?",
  ),
  realLife: {
    title: T(
      "Real world: Public company quarterly 10-Q earnings reports",
      "Echte Welt: Quartalsberichte oeffentlicher Aktiengesellschaften",
      "Prawdziwy świat: Kwartalne raporty finansowe spółek giełdowych",
    ),
    body: T(
      "Publicly traded companies like Apple, Microsoft, or BMW must publish audited financial statements every three months. Wall Street analysts dissect gross margin, operating margin, and free cash flow to evaluate whether executive management is deploying capital efficiently.",
      "Boersennotierte Firmen wie Apple, Microsoft oder BMW muessen alle drei Monate gepruefte Finanzberichte veroeffentlichen. Analysten pruefen Rohmargen, operative Margen und den freien Cashflow genau, um die Kapitaleffizienz zu bewerten.",
      "Spółki giełdowe takie jak Apple, Microsoft czy BMW muszą co kwartał publikować audytowane sprawozdania finansowe. Analitycy drobiazgowo badają marżę brutto, marżę operacyjną i przepływy pieniężne, aby ocenić efektywność zarządu.",
    ),
  },
  factCard: {
    claims: [
      {
        text: T(
          "The US Securities and Exchange Commission (SEC) mandates standardized income statements under GAAP accounting rules.",
          "Die US-Boersenaufsicht SEC schreibt standardisierte Gewinn- und Verlustrechnungen nach GAAP vor.",
          "Amerykańska Komisja Papierów Wartościowych i Giełd (SEC) wymaga ustandaryzowanych rachunków zysków i strat według zasad GAAP.",
        ),
        source: "https://www.sec.gov/fast-answers/answers-readahtm.html",
      },
      {
        text: T(
          "International Financial Reporting Standards (IFRS) provide global frameworks for reporting revenue and profit margins.",
          "Die IFRS-Standards bieten weltweite Richtlinien zur Erfassung von Umsaetzen und Gewinnmargen.",
          "Międzynarodowe Standardy Sprawozdawczości Finansowej (MSSF/IFRS) wyznaczają globalne ramy raportowania przychodów i marż zysku.",
        ),
        source: "https://www.ifrs.org/issued-standards/list-of-standards/",
      },
      {
        text: T(
          "Destatis records corporate profit margin distributions across the German manufacturing and services sectors.",
          "Destatis erfasst die Verteilung von Unternehmensgewinnmargen in Industrie und Dienstleistung in Deutschland.",
          "Destatis rejestruje rozkład marż zysku przedsiębiorstw w niemieckim sektorze przemysłowym i usługowym.",
        ),
        source: "https://www.destatis.de/DE/Themen/Wirtschaft/Unternehmen/_inhalt.html",
      },
      {
        text: T(
          "Unit economics evaluates revenues and costs associated with an individual business unit or customer.",
          "Die Einheitsoekonomie bewertet Erloese und Kosten bezogen auf eine einzelne Produkteinheit oder einen Kunden.",
          "Ekonomika jednostkowa analizuje przychody i koszty powiązane z pojedynczą sztuką towaru lub pojedynczym klientem.",
        ),
        source: "https://hbr.org/2021/04/how-to-calculate-customer-lifetime-value",
      },
      {
        text: T(
          "Gross margin is calculated as gross profit divided by net sales revenue multiplied by one hundred.",
          "Die Rohertragsmarge berechnet sich aus dem Rohertrag geteilt durch den Nettoumsatz mal einhundert.",
          "Marżę brutto oblicza się, dzieląc zysk brutto przez przychody ze sprzedaży i mnożąc przez sto.",
        ),
        source: "https://www.britannica.com/money/gross-margin",
      },
    ],
    simplified: [
      T(
        "Complex non-cash accounting adjustments like depreciation schedules and stock-based compensation are simplified to standard OpEx deductions.",
        "Komplexe buchhalterische Posten wie Abschreibungen und aktienbasierte Verguetungen werden auf regulaere Betriebsausgaben vereinfacht.",
        "Złożone pozycje księgowe bezgotówkowe, takie jak amortyzacja i wynagrodzenia w akcjach, uproszczono do standardowych kosztów operacyjnych.",
      ),
    ],
  },
};
