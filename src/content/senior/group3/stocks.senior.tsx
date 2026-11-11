import { useState } from "react";
import { animatedBeat } from "../../../lesson/toolkit";
import type { DiagramProps, Lesson, Text, ToyProps, WidgetProps } from "../../../lesson/types";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function StockCertificateLaunchDiagram({ lang, step }: DiagramProps) {
  const abhiName = lang === "pl" ? "Tymon" : lang === "de" ? "Tim" : "Abhi";
  const label =
    lang === "pl"
      ? "Tymon kupuje ułamkową część globalnej firmy technologicznej"
      : lang === "de"
        ? "Tim erwirbt Bruchteile eines Technologieunternehmens"
        : "Abhi purchasing fractional shares of innovative company";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect
        x="10"
        y="10"
        width="380"
        height="220"
        rx="14"
        fill="#0f172a"
        stroke="#3b82f6"
        strokeWidth="2"
      />
      <g>
        <circle cx="80" cy="110" r="28" fill="#f3cfa6" stroke="#3b82f6" strokeWidth="2" />
        <path d="M 52 105 C 52 70 108 70 108 105" fill="#1e293b" />
        <circle cx="72" cy="107" r="2.5" fill="#0f172a" />
        <circle cx="88" cy="107" r="2.5" fill="#0f172a" />
        <path d="M 76 119 Q 80 125 84 119" stroke="#0f172a" strokeWidth="2" fill="none" />
        <path
          d="M 56 185 L 62 140 Q 80 135 98 140 L 104 185 Z"
          fill="#2563eb"
          stroke="#3b82f6"
          strokeWidth="2"
        />
        <text x="80" y="205" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#60a5fa">
          {abhiName}
        </text>
      </g>
      <g>
        <rect
          x="135"
          y="35"
          width="230"
          height="32"
          rx="6"
          fill="#1e293b"
          stroke="#3b82f6"
          strokeWidth="1.5"
        />
        <text x="250" y="55" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#bfdbfe">
          📜{" "}
          {lang === "pl"
            ? "Certyfikat Akcji: Ułamek Własności"
            : lang === "de"
              ? "Aktie: Echtes Miteigentum"
              : "Stock Share: Real Fractional Ownership"}
        </text>
      </g>
      {step >= 2 && (
        <g>
          <rect
            x="135"
            y="80"
            width="230"
            height="52"
            rx="8"
            fill="#1e293b"
            stroke="#2563eb"
            strokeWidth="1.5"
          />
          <text x="250" y="102" textAnchor="middle" fontSize="18">
            🏢 💼 💰
          </text>
          <text
            x="250"
            y="122"
            textAnchor="middle"
            fontSize="10.5"
            fontWeight="bold"
            fill="#93c5fd"
          >
            {lang === "pl"
              ? "Prawo do zysków (dywidend) i głosowania"
              : lang === "de"
                ? "Anspruch auf Gewinnanteile & Stimmrecht"
                : "Claim on profits (dividends) and voting rights"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="135" y="145" width="230" height="60" rx="8" fill="#1d4ed8" />
          <text x="250" y="170" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#ffffff">
            {lang === "pl"
              ? "Nie jesteś tylko klientem, jesteś właścicielem!"
              : lang === "de"
                ? "Du bist Miteigentuemer, nicht nur Kunde!"
                : "You are a co-owner, not just a customer!"}
          </text>
          <text x="250" y="190" textAnchor="middle" fontSize="10.5" fill="#dbeafe">
            {lang === "pl"
              ? "Majątek rośnie wraz z sukcesem przedsiębiorstwa"
              : lang === "de"
                ? "Wachstum des Unternehmens vermehrt dein Kapital"
                : "Your capital grows with corporate cash flows"}
          </text>
        </g>
      )}
    </svg>
  );
}

function StockExchangeDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Giełda papierów wartościowych: płynność i wycena"
      : lang === "de"
        ? "Die Wertpapierboerse: Liquiditaet und Preisfindung"
        : "Stock exchange order matching and secondary liquidity";

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
      <g>
        <rect
          x="35"
          y="40"
          width="155"
          height="135"
          rx="8"
          fill="#eff6ff"
          stroke="#2563eb"
          strokeWidth="1.5"
        />
        <text x="112" y="65" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e40af">
          {lang === "pl"
            ? "Oferty Kupna (Bid)"
            : lang === "de"
              ? "Kaufgebote (Bid)"
              : "Buyers (Bid)"}
        </text>
        <text x="112" y="95" textAnchor="middle" fontSize="22">
          🟢 🙋‍♂️ 📈
        </text>
        <text x="112" y="120" textAnchor="middle" fontSize="10" fill="#1d4ed8">
          {lang === "pl"
            ? "Chcą kupić po cenie rynkowej"
            : lang === "de"
              ? "Kaufen zum Marktpreis"
              : "Willing buyers enter bids"}
        </text>
        <rect x="45" y="135" width="135" height="30" rx="4" fill="#dbeafe" />
        <text x="112" y="154" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#1e40af">
          Bid: $150.10
        </text>
      </g>
      {step >= 2 && (
        <g>
          <rect
            x="210"
            y="40"
            width="155"
            height="135"
            rx="8"
            fill="#fff1f2"
            stroke="#e11d48"
            strokeWidth="1.5"
          />
          <text x="287" y="65" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#be123c">
            {lang === "pl"
              ? "Oferty Sprzedaży (Ask)"
              : lang === "de"
                ? "Verkaufsgebote (Ask)"
                : "Sellers (Ask)"}
          </text>
          <text x="287" y="95" textAnchor="middle" fontSize="22">
            🔴 🙋‍♀️ 📉
          </text>
          <text x="287" y="120" textAnchor="middle" fontSize="10" fill="#9f1239">
            {lang === "pl"
              ? "Sprzedają akcje w ułamku sekundy"
              : lang === "de"
                ? "Verkauf in Millisekunden"
                : "Instant liquidity in seconds"}
          </text>
          <rect x="220" y="135" width="135" height="30" rx="4" fill="#fee2e2" />
          <text x="287" y="154" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#9f1239">
            Ask: $150.15
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="35" y="195" width="330" height="25" rx="4" fill="#334155" />
          <text
            x="200"
            y="212"
            textAnchor="middle"
            fontSize="10.5"
            fontWeight="bold"
            fill="#ffffff"
          >
            {lang === "pl"
              ? "Giełda zapewnia natychmiastową płynność: możesz spieniężyć akcje o każdej porze sesji"
              : lang === "de"
                ? "Die Boerse sichert Liquiditaet: Unternehmensanteile lassen sich sekundenschnell verkaufen"
                : "Exchanges provide liquidity: shares can be sold for cash within seconds"}
          </text>
        </g>
      )}
    </svg>
  );
}

function DividendVsReinvestmentDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Zyski przedsiębiorstwa: dywidenda czy reinwestycja"
      : lang === "de"
        ? "Unternehmensgewinne: Ausschuettung oder Reinvestition"
        : "Corporate profits: dividends payout vs internal reinvestment";

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
      <g>
        <rect
          x="35"
          y="45"
          width="150"
          height="85"
          rx="8"
          fill="#dcfce7"
          stroke="#16a34a"
          strokeWidth="1.5"
        />
        <text x="110" y="70" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#15803d">
          Cash Dividend
        </text>
        <text x="110" y="90" textAnchor="middle" fontSize="14">
          💵 🏦
        </text>
        <text x="110" y="112" textAnchor="middle" fontSize="9" fill="#166534">
          Quarterly cash deposit
        </text>
        <text x="110" y="124" textAnchor="middle" fontSize="8" fill="#15803d">
          Direct income for owners
        </text>
      </g>
      {step >= 2 && (
        <g>
          <rect
            x="215"
            y="45"
            width="150"
            height="85"
            rx="8"
            fill="#eff6ff"
            stroke="#2563eb"
            strokeWidth="1.5"
          />
          <text x="290" y="70" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e40af">
            Retained Earnings
          </text>
          <text x="290" y="90" textAnchor="middle" fontSize="14">
            🔬 🏭 🚀
          </text>
          <text x="290" y="112" textAnchor="middle" fontSize="9" fill="#1e40af">
            R&D and expansion
          </text>
          <text x="290" y="124" textAnchor="middle" fontSize="8" fill="#2563eb">
            Powers higher future stock price
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="150" width="320" height="55" rx="8" fill="#1e293b" />
          <text
            x="200"
            y="174"
            textAnchor="middle"
            fontSize="11.5"
            fontWeight="bold"
            fill="#ffffff"
          >
            {lang === "pl"
              ? "Zysk na akcję (EPS) napędza fundamentalną wartość w długim terminie"
              : lang === "de"
                ? "Gewinn je Aktie (EPS) bestimmt den langfristigen Unternehmenswert"
                : "Earnings Per Share (EPS) drives long-term shareholder returns"}
          </text>
          <text x="200" y="193" textAnchor="middle" fontSize="9.5" fill="#94a3b8">
            {lang === "pl"
              ? "Ceny akcji mogą falować z emocji, ale w końcu doganiają rosnące zyski"
              : lang === "de"
                ? "Kurse schwanken kurzfristig, folgen langfristig aber den realen Gewinnen"
                : "Market prices swing on emotion, but ultimately track underlying corporate earnings"}
          </text>
        </g>
      )}
    </svg>
  );
}

function DiversificationIndexDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Dywersyfikacja i fundusze indeksowe (np. S&P 500, MSCI World)"
      : lang === "de"
        ? "Breite Streuung und Indexfonds (z.B. MSCI World)"
        : "Broad market diversification and index investing";

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
      <circle cx="200" cy="95" r="42" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
      <text x="200" y="90" textAnchor="middle" fontSize="22">
        🧺 🌐
      </text>
      <text x="200" y="112" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#15803d">
        Global Index
      </text>
      <g>
        <circle cx="85" cy="70" r="28" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
        <text x="85" y="68" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#b91c1c">
          Single Stock
        </text>
        <text x="85" y="84" textAnchor="middle" fontSize="8" fill="#b91c1c">
          High Risk
        </text>
      </g>
      {step >= 2 && (
        <g>
          <circle cx="315" cy="70" r="28" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
          <text x="315" y="68" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e40af">
            1,500 Firms
          </text>
          <text x="315" y="84" textAnchor="middle" fontSize="8" fill="#2563eb">
            Diversified
          </text>
          <circle cx="200" cy="165" r="26" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
          <text x="200" y="163" textAnchor="middle" fontSize="14">
            🛡️
          </text>
          <text x="200" y="179" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#92400e">
            Zero Ruin Risk
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="198" width="320" height="24" rx="6" fill="#15803d" />
          <text
            x="200"
            y="214"
            textAnchor="middle"
            fontSize="10.5"
            fontWeight="bold"
            fill="#ffffff"
          >
            {lang === "pl"
              ? "Nie szukaj igły w stogu siana, kup cały stóg siana (John Bogle)"
              : lang === "de"
                ? "Suche nicht die Nadel, kaufe den ganzen Heuhaufen (John Bogle)"
                : "Don't look for the needle in the haystack. Just buy the haystack (John Bogle)"}
          </text>
        </g>
      )}
    </svg>
  );
}

function LongTermCompoundingDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Długoterminowy procent składany z globalnego rynku akcji"
      : lang === "de"
        ? "Langfristiger Zinseszins durch globale Produktivitaet"
        : "Long-term compounding from human innovation and enterprise";

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
      <g>
        <path d="M 60 180 Q 200 160 340 40" stroke="#7c3aed" strokeWidth="3.5" fill="none" />
        <circle cx="60" cy="180" r="5" fill="#7c3aed" />
        <circle cx="200" cy="155" r="5" fill="#7c3aed" />
        <circle cx="340" cy="40" r="6" fill="#7c3aed" />
        <text x="60" y="200" textAnchor="middle" fontSize="10" fill="#6b21a8">
          Year 0 ($1k)
        </text>
        <text x="200" y="180" textAnchor="middle" fontSize="10" fill="#6b21a8">
          Year 20 ($4k)
        </text>
        <text x="340" y="30" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#581c87">
          Year 40 ($15k+)
        </text>
      </g>
      {step >= 2 && (
        <g>
          <rect
            x="70"
            y="60"
            width="160"
            height="40"
            rx="6"
            fill="#ede9fe"
            stroke="#a855f7"
            strokeWidth="1"
          />
          <text x="150" y="78" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#581c87">
            ~7-10% Historical Return
          </text>
          <text x="150" y="92" textAnchor="middle" fontSize="8.5" fill="#7e22ce">
            Fueled by global GDP growth
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="202" width="320" height="22" rx="4" fill="#581c87" />
          <text x="200" y="217" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#ffffff">
            {lang === "pl"
              ? "Posiadanie akcji pozwala każdemu partycypować w bogactwie tworzonym przez geniusz ludzki"
              : lang === "de"
                ? "Aktien ermoeglichen jedem die Teilhabe an menschlichem Erfindungsgeist"
                : "Equities let everyday citizens own a stake in human ingenuity and progress"}
          </text>
        </g>
      )}
    </svg>
  );
}

function Toy({ onDone }: ToyProps) {
  const [years, setYears] = useState(0);
  const initial = 1000;
  const portfolio = Math.round(initial * Math.pow(1.08, years));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "center" }}>
      <p style={{ margin: 0, fontWeight: 700, fontSize: "1rem" }}>
        Years Invested: {years} | Portfolio Value: ${portfolio} (at 8% average return)
      </p>
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          type="button"
          className="btn"
          onClick={() => {
            setYears((y) => {
              const next = Math.min(40, y + 5);
              if (next >= 20) onDone?.();
              return next;
            });
          }}
        >
          Add 5 Years of Growth
        </button>
        <button type="button" className="btn btn-quiet" onClick={() => setYears(0)}>
          Reset
        </button>
      </div>
      <div
        style={{
          padding: "12px",
          background: years >= 20 ? "#eef8ef" : "#f1f5f9",
          borderRadius: "10px",
          width: "100%",
          textAlign: "center",
        }}
      >
        {years === 0
          ? "Start: $1,000 invested in a broad world equity index fund."
          : `Year ${years}: The miracle of compound interest has turned your $1,000 into $${portfolio}!` +
            (years >= 20 ? " Long-term patience beats timing the market!" : "")}
      </div>
    </div>
  );
}

function StocksWidget({ onAnswer }: WidgetProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
      <p style={{ margin: 0 }}>
        What does owning a common share of stock in a public company represent legally?
      </p>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>
        A loan that the company must repay to you next Friday
      </button>
      <button type="button" className="btn" onClick={() => onAnswer(true)}>
        True fractional equity ownership in the business and its future profits
      </button>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>
        A government lottery ticket that expires after 30 days
      </button>
    </div>
  );
}

export const lesson: Lesson = {
  id: "stocks",
  story: [
    animatedBeat(
      [
        T(
          "Meet Abhi. He uses a smartphone, wears running shoes from a global brand, and browses electric vehicle innovations.",
          "Das ist Tim. Er nutzt ein Smartphone, traegt Markensneaker und begeistert sich fuer moderne Elektroautos.",
          "Poznaj Tymona. Używa smartfona, nosi buty znanej marki i z zapartym tchem śledzi rozwój nowoczesnych samochodów elektrycznych.",
        ),
        T(
          "Instead of just spending money on their products, Abhi decides to buy a fractional share of stock in the companies making them.",
          "Statt nur sein Geld fuer deren Produkte auszugeben, kauft Tim echte Bruchteile von Aktien an diesen Unternehmen.",
          "Zamiast tylko wydawać kieszonkowe na ich wyroby, Tymon decyduje się kupić ułamkowe akcje firm, które je produkują.",
        ),
        T(
          "A single share of stock is not a lottery ticket: it is a legally binding certificate of *equity ownership* in an operating enterprise.",
          "Eine Aktie ist kein Lottoschein: Sie ist eine rechtsgueltige Urkunde ueber echtes *Miteigentum* an einem lebendigen Unternehmen.",
          "Pojedyncza akcja to nie los na loterii: to prawnie wiążące potwierdzenie *własności udziałowej* w działającym przedsiębiorstwie.",
        ),
      ],
      StockCertificateLaunchDiagram,
    ),
    animatedBeat(
      [
        T(
          "Public stock exchanges like the New York Stock Exchange, Frankfurt Xetra, or Warsaw GPW connect millions of buyers and sellers.",
          "Wertpapierboersen wie die New York Stock Exchange, Frankfurt Xetra oder Warschau GPW bringen Kaeufer und Verkaeufer zusammen.",
          "Giełdy papierów wartościowych, takie jak Wall Street, Frankfurt Xetra czy GPW w Warszawie, łączą miliony inwestorów.",
        ),
        T(
          "Electronic order books match willing buyers and sellers in milliseconds, ensuring high *market liquidity*.",
          "Elektronische Orderbuecher gleichen Kauf- und Verkaufsangebote in Millisekunden ab und sichern hohe *Liquiditaet*.",
          "Elektroniczne arkusze zleceń kojarzą oferty kupna i sprzedaży w ułamkach sekund, gwarantując wysoką *płynność rynku*.",
        ),
        T(
          "Liquidity means you can turn your shares into cash on any regular trading business day without haggling or delays.",
          "Hohe Liquiditaet bedeutet: Du kannst deine Anteile an jedem Boersentag sekundenschnell wieder in Bargeld tauschen.",
          "Płynność oznacza, że w każdy dzień sesyjny możesz w ułamku sekundy spieniężyć swoje udziały bez uciążliwego targowania się.",
        ),
      ],
      StockExchangeDiagram,
    ),
    animatedBeat(
      [
        T(
          "When a corporation earns profits, the board of directors can distribute cold cash to shareholders as *dividends*.",
          "Erwirtschaftet ein Unternehmen Gewinne, schuettet der Vorstand bares Geld als *Dividende* an die Aktionaere aus.",
          "Gdy korporacja wypracowuje zysk netto, zarząd może wypłacić akcjonariuszom gotówkę w formie *dywidendy*.",
        ),
        T(
          "Alternatively, the company retains earnings to build automated factories, hire researchers, and engineer new breakthroughs.",
          "Oder das Unternehmen behaelt die Gewinne ein, um neue Fabriken zu bauen, Forscher einzustellen und Innovationen voranzutreiben.",
          "Może też zatrzymać wypracowane środki, aby budować zautomatyzowane fabryki, zatrudniać inżynierów i finansować badania naukowe.",
        ),
        T(
          "Over decades, growth in fundamental *earnings per share* powers rising market stock valuations.",
          "Ueber die Jahre treibt das Wachstum des *Gewinns je Aktie* (EPS) den fundamentalen Boersenwert nach oben.",
          "W długim horyzoncie czasowym to stały wzrost *zysku przypadającego na jedną akcję* decyduje o wzroście notowań giełdowych.",
        ),
      ],
      DividendVsReinvestmentDiagram,
    ),
    animatedBeat(
      [
        T(
          "Betting all savings on a single company carries enormous risk of catastrophic failure or obsolescence.",
          "Wer sein ganzes Erspartes auf eine einzige Firma setzt, riskiert bei Fehlentscheidungen herbe Verluste.",
          "Postawienie wszystkich oszczędności na jedną firmę niesie ze sobą potężne ryzyko bankructwa lub utraty pozycji rynkowej.",
        ),
        T(
          "Smart investors protect themselves through *broad diversification*, owning low-cost index funds that hold thousands of world leaders.",
          "Kluge Anleger streuen ihr Geld ueber guenstige *Welt-Indexfonds*, die tausende Fuehrende Konzerne buendeln.",
          "Doświadczeni inwestorzy chronią kapitał poprzez *szeroką dywersyfikację*, wybierając tanie fundusze indeksowe skupiające tysiące spółek z całego świata.",
        ),
        T(
          "As legendary investor John Bogle taught: do not search for the elusive needle in the haystack, simply buy the entire haystack.",
          "Wie der legendaere John Bogle riet: Suche nicht nach der Stecknadel im Heuhaufen, kaufe einfach den ganzen Heuhaufen.",
          "Jak powtarzał legendarny inwestor John Bogle: nie szukaj igły w stogu siana, po prostu kup cały stóg siana.",
        ),
      ],
      DiversificationIndexDiagram,
    ),
    animatedBeat(
      [
        T(
          "Over the past century, a broad basket of global public equities has delivered roughly seven to ten percent annual returns.",
          "Ueber das letzte Jahrhundert erzielte ein breit gestreutes Weltaktienportfolio rund sieben bis zehn Prozent Rendite pro Jahr.",
          "Na przestrzeni ostatniego stulecia zdywersyfikowany koszyk globalnych akcji przynosił średnio od siedmiu do dziesięciu procent rocznie.",
        ),
        T(
          "Compounded over thirty or forty years, this steady return doubles purchasing power repeatedly through human innovation.",
          "Ueber Jahrzehnte verdoppelt dieser Zinseszins Vermoegen mehrfach durch die Innovationskraft der Menschheit.",
          "Dzięki potędze procentu składanego kapitał podwaja się wielokrotnie, czerpiąc z nieustannego rozwoju cywilizacji i nauki.",
        ),
        T(
          "Owning equities democratizes capitalism, giving everyday savers direct ownership of the engines of human prosperity.",
          "Aktien machen den Wohlstand der Welt fuer jeden Zugaenglich, der geduldig und klug spart.",
          "Posiadanie akcji demokratyzuje gospodarkę rynkową, dając zwykłym ludziom udział w zyskach najwspanialszych przedsiębiorstw na Ziemi.",
        ),
      ],
      LongTermCompoundingDiagram,
    ),
  ],
  toyIntro: T(
    "Test the compounding engine of equities: see how reinvested earnings multiply an initial investment over decades.",
    "Erlebe den Zinseszinseffekt bei Aktien: Beobachte, wie reinvestierte Ertraege ein Startkapital ueber Jahrzehnte vervielfachen.",
    "Przetestuj silnik procentu składanego na giełdzie: zobacz, jak reinwestowane zyski pomnażają kapitał początkowy na przestrzeni dekad.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "Why is owning a broad global stock index fund historically safer than picking an individual stock?",
        "Warum ist ein breit gestreuter Weltaktien-Indexfonds historisch sicherer als eine einzelne Aktie?",
        "Dlaczego inwestowanie w globalny fundusz indeksowy jest historycznie bezpieczniejsze niż zakup akcji jednej firmy?",
      ),
      options: [
        {
          text: T(
            "Diversification across hundreds of companies prevents a single bankruptcy from wiping out your entire life savings",
            "Breite Streuung ueber hunderte Firmen schuetzt davor, dass eine einzelne Insolvenz dein ganzes Vermoegen vernichtet",
            "Dywersyfikacja pomiędzy setki spółek sprawia, że upadłość pojedynczego przedsiębiorstwa nie zniszczy Twoich oszczędności",
          ),
          correct: true,
        },
        {
          text: T(
            "Governments legally outlaw all bankruptcies for companies listed in an index",
            "Gesetze verbieten Firmen in einem Index grundsaetzlich die Insolvenz",
            "Prawo bezwzględnie zakazuje bankructwa spółkom wchodzącym w skład indeksu",
          ),
          correct: false,
        },
        {
          text: T(
            "Index funds pay zero taxes to any country in the world",
            "Indexfonds zahlen in keinem Land der Welt jemals Steuern",
            "Fundusze indeksowe są na zawsze zwolnione ze wszystkich podatków na świecie",
          ),
          correct: false,
        },
      ],
      hint: T(
        "Think about what happens if one airline goes bankrupt versus owning shares in 1,500 different businesses across multiple industries.",
        "Ueberlege, was passiert, wenn eine Fluggesellschaft pleitegeht, verglichen mit Anteilen an 1.500 verschiedenen Firmen.",
        "Zastanów się, co się stanie, gdy zbankrutuje jedna linia lotnicza, w porównaniu do posiadania udziałów w 1500 różnych firmach.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "What is a corporate cash dividend?",
        "Was versteht man unter einer Dividende?",
        "Czym jest dywidenda wypłacana przez spółkę giełdową?",
      ),
      options: [
        {
          text: T(
            "A share of net business profits paid directly out in cash to registered equity shareholders",
            "Ein Teil des Unternehmensgewinns, der bar an die Aktionaere ausgezahlt wird",
            "Część wypracowanego zysku netto przekazywana bezpośrednio w gotówce akcjonariuszom spółki",
          ),
          correct: true,
        },
        {
          text: T(
            "An emergency fine paid by shareholders when the stock market goes down",
            "Eine Strafgebuehr, die Aktionaere bei fallenden Boersenkursen zahlen muessen",
            "Kary pieniężne płacone przez inwestorów podczas spadków na giełdzie",
          ),
          correct: false,
        },
        {
          text: T(
            "A free voucher for lunch in the company cafeteria",
            "Ein Gutschein fuer ein kostenloses Mittagessen in der Firmenkantine",
            "Kupon na bezpłatny obiad w zakładowej stołówce",
          ),
          correct: false,
        },
      ],
      hint: T(
        "Think of it as profit-sharing for being a fractional co-owner of the company.",
        "Denke an eine Gewinnbeteiligung dafuer, dass du Miteigentuemer des Unternehmens bist.",
        "Pomyśl o tym jak o wypłacie udziału w zyskach za to, że jesteś współwłaścicielem przedsiębiorstwa.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Identify what owning a common share of stock represents in modern finance.",
        "Bestimme, was der Besitz einer Stammaktie in der modernen Finanzwelt bedeutet.",
        "Wskaż, czym w nowoczesnych finansach jest posiadanie akcji zwykłej spółki.",
      ),
      Widget: StocksWidget,
      hint: T(
        "Focus on ownership, fractional equity, and claims on future earnings.",
        "Achte auf Eigentum, Firmenanteile und Anspruch auf kuenftige Gewinne.",
        "Zwróć uwagę na współwłasność, kapitał własny oraz prawo do udziału w przyszłych zyskach.",
      ),
    },
  ],
  askDad: T(
    "Ask your parent: Do they own index funds or retirement equity accounts (like ETF plans, 401k, or PPK/IKE), and when did they start?",
    "Frage deine Eltern: Besitzen sie Aktien-ETFs oder Vorsorgeplaene, und wann haben sie mit dem langfristigen Sparen begonnen?",
    "Zapytaj rodziców: Czy posiadają fundusze ETF lub konta emerytalne (takie jak PPK, IKE/IKZE), i kiedy zaczęli długoterminowo inwestować?",
  ),
  realLife: {
    title: T(
      "Real world: John Bogle, Vanguard, and the low-cost index revolution",
      "Echte Welt: John Bogle, Vanguard und der Siegeszug der guenstigen Indexfonds",
      "Prawdziwy świat: John Bogle, Vanguard i rewolucja tanich funduszy indeksowych",
    ),
    body: T(
      "In 1975, Jack Bogle founded Vanguard and created the first retail index fund tracking the S&P 500. Wall Street laughed, calling it 'un-American' to settle for average market returns. Today, low-cost index funds and ETFs hold tens of trillions of dollars globally, saving regular savers hundreds of billions in fees while outperforming the vast majority of active hedge fund managers over decades.",
      "1975 gruendete Jack Bogle Vanguard und schuf den ersten Indexfonds auf den S&P 500 fuer Privatanleger. Die Wall Street spottete zunaechst. Heute verwalten guenstige Indexfonds und ETFs weltweit zig Billionen Dollar und schlagen dank minimaler Gebuehren ueber lange Zeitraeume die meisten teuren Fondsmanager.",
      "W 1975 roku Jack Bogle założył Vanguard i uruchomił pierwszy fundusz indeksowy naśladujący indeks S&P 500. Choć maklerzy z Wall Street początkowo wyśmiewali ten pomysł, dziś tanie fundusze indeksowe i ETF zarządzają bilionami dolarów, bijąc na głowę większość drogich funduszy inwestycyjnych.",
    ),
  },
  factCard: {
    claims: [
      {
        text: T(
          "The Amsterdam Stock Exchange, established in 1602 by the Dutch East India Company (VOC), was the world's first official public equity trading exchange.",
          "Die 1602 von der Niederlaendischen Ostindien-Kompanie gegruendete Boerse in Amsterdam gilt als erste offizielle Wertpapierboerse.",
          "Założona w 1602 roku przez Holenderską Kompanię Wschodnioindyjską (VOC) giełda w Amsterdamie była pierwszą na świecie publiczną giełdą akcji.",
        ),
        source: "https://www.britannica.com/money/Dutch-East-India-Company",
      },
      {
        text: T(
          "S&P Dow Jones Indices SPIVA scorecards consistently demonstrate that over 85% of active large-cap equity managers underperform broad market benchmarks over 15-year periods.",
          "SPIVA-Studien von S&P belegen regelmaessig, dass ueber 85% der aktiven Fondsmanager ueber 15 Jahre hinter ihrem Vergleichsindex zurueckbleiben.",
          "Raporty SPIVA publikowane przez S&P wykazują, że ponad 85% aktywnie zarządzanych funduszy przegrywa w horyzoncie 15 lat z szerokim rynkiem indeksowym.",
        ),
        source: "https://www.spglobal.com/spdji/en/research-insights/spiva/",
      },
      {
        text: T(
          "The Warsaw Stock Exchange (Giełda Papierów Wartościowych w Warszawie - GPW) operates Central Europe's largest regulated cash equity trading market.",
          "Die Warschauer Wertpapierboerse GPW betreibt den groessten regulierten Aktienmarkt in Mittel- und Osteuropa.",
          "Giełda Papierów Wartościowych w Warszawie (GPW) jest największym rynkiem regulowanym akcji w Europie Środkowo-Wschodniej.",
        ),
        source: "https://www.gpw.pl/o-nas",
      },
      {
        text: T(
          "Deutsche Boerse AG operates Xetra, handling over 90% of all cash equity and ETF trading volume across all German trading venues.",
          "Die Deutsche Boerse AG betreibt das Xetra-System, ueber das ueber 90% des gesamten deutschen Boersenhandels mit Aktien und ETFs laeuft.",
          "Deutsche Boerse AG zarządza platformą transakcyjną Xetra, odpowiadającą za ponad 90% obrotu akcjami i funduszami ETF w Niemczech.",
        ),
        source: "https://www.deutsche-boerse.com/dbg-en/businesses/cash-market",
      },
      {
        text: T(
          "Jeremy Siegel's long-term research in 'Stocks for the Long Run' shows US equities delivered an annualized real real-return of approximately 6.7% after inflation from 1802 to 2021.",
          "Jeremy Siegels Standardwerk 'Stocks for the Long Run' belegt eine inflationsbereinigte Realrendite von rund 6,7% jaehrlich fuer US-Aktien seit 1802.",
          "Badania prof. Jeremy'ego Siegela opublikowane w 'Stocks for the Long Run' dowodzą, że amerykański rynek akcji przynosił średnio 6,7% realnego zysku rocznie ponad inflację w latach 1802-2021.",
        ),
        source:
          "https://www.mheducation.com/highered/product/stocks-long-run-sixth-edition-definitive-guide-financial-market-returns-long-term-investment-strategies-siegel/9781260463866.html",
      },
    ],
    simplified: [
      T(
        "Complex market microstructure concepts such as limit order books, bid-ask spreads, and dark pools are explained using accessible auction concepts.",
        "Komplexe Orderbuecher und Geld-Brief-Spannen (Spreads) wurden mit einfachen Auktionsprinzipien veranschaulicht.",
        "Złożone mechanizmy mikrostruktury rynku, takie jak arkusze zleceń i spready, przedstawiono za pomocą czytelnych reguł aukcyjnych.",
      ),
    ],
  },
};
