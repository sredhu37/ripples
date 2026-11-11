import { useState } from "react";
import { animatedBeat } from "../../../lesson/toolkit";
import type { DiagramProps, Lesson, Text, ToyProps, WidgetProps } from "../../../lesson/types";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function HarborContainerLaunchDiagram({ lang, step }: DiagramProps) {
  const kritiName = lang === "pl" ? "Kasia" : lang === "de" ? "Klara" : "Kriti";
  const label =
    lang === "pl"
      ? "Kasia obserwuje załadunek kontenerowca w porcie międzynarodowym"
      : lang === "de"
        ? "Klara beobachtet das Beladen eines Containerschiffs im Welthafen"
        : "Kriti watching container ship cargo operations at international seaport";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect
        x="10"
        y="10"
        width="380"
        height="220"
        rx="14"
        fill="#0f172a"
        stroke="#059669"
        strokeWidth="2"
      />
      <g>
        <circle cx="80" cy="110" r="28" fill="#f3cfa6" stroke="#059669" strokeWidth="2" />
        <path d="M 52 105 C 52 70 108 70 108 105" fill="#064e3b" />
        <circle cx="72" cy="107" r="2.5" fill="#0f172a" />
        <circle cx="88" cy="107" r="2.5" fill="#0f172a" />
        <path d="M 76 119 Q 80 125 84 119" stroke="#0f172a" strokeWidth="2" fill="none" />
        <path
          d="M 56 185 L 62 140 Q 80 135 98 140 L 104 185 Z"
          fill="#059669"
          stroke="#10b981"
          strokeWidth="2"
        />
        <text x="80" y="205" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#6ee7b7">
          {kritiName}
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
          stroke="#059669"
          strokeWidth="1.5"
        />
        <text x="250" y="55" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#a7f3d0">
          🚢{" "}
          {lang === "pl"
            ? "Handel Międzynarodowy i Specjalizacja"
            : lang === "de"
              ? "Welthandel und Spezialisierung"
              : "Global Trade & Comparative Advantage"}
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
            stroke="#10b981"
            strokeWidth="1.5"
          />
          <text x="250" y="102" textAnchor="middle" fontSize="18">
            📦 🌍 ✈️
          </text>
          <text
            x="250"
            y="122"
            textAnchor="middle"
            fontSize="10.5"
            fontWeight="bold"
            fill="#34d399"
          >
            {lang === "pl"
              ? "Koszty alternatywne i przewaga komparatywna"
              : lang === "de"
                ? "Opportunitaetskosten und komparativer Vorteil"
                : "Opportunity cost and comparative advantage"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="135" y="145" width="230" height="60" rx="8" fill="#065f46" />
          <text x="250" y="170" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#ffffff">
            {lang === "pl"
              ? "Wszyscy zyskują na uczciwej wymianie"
              : lang === "de"
                ? "Handel schafft Wohlstand fuer beide Seiten"
                : "Both trading partners gain from exchange"}
          </text>
          <text x="250" y="190" textAnchor="middle" fontSize="10.5" fill="#d1fae5">
            {lang === "pl"
              ? "Taryfy celne a dobrobyt konsumentów"
              : lang === "de"
                ? "Zoelle erhoehen Preise fuer Verbraucher"
                : "Tariffs raise domestic consumer costs"}
          </text>
        </g>
      )}
    </svg>
  );
}

function ComparativeAdvantageDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Przewaga komparatywna: samoloty i oliwa z oliwek"
      : lang === "de"
        ? "Komparativer Vorteil: Flugzeuge und Olivenoel"
        : "David Ricardo's comparative advantage: airplanes vs olive oil";

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
          x="40"
          y="45"
          width="145"
          height="85"
          rx="8"
          fill="#eff6ff"
          stroke="#2563eb"
          strokeWidth="1.5"
        />
        <text x="112" y="70" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e40af">
          Country A (High Tech)
        </text>
        <text x="112" y="90" textAnchor="middle" fontSize="14">
          ✈️ 💻
        </text>
        <text x="112" y="112" textAnchor="middle" fontSize="9" fill="#1e40af">
          Specializes in aircraft
        </text>
        <text x="112" y="124" textAnchor="middle" fontSize="8" fill="#2563eb">
          Lowest opportunity cost
        </text>
      </g>
      {step >= 2 && (
        <g>
          <rect
            x="215"
            y="45"
            width="145"
            height="85"
            rx="8"
            fill="#ecfdf5"
            stroke="#059669"
            strokeWidth="1.5"
          />
          <text x="287" y="70" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#065f46">
            Country B (Sunny Soils)
          </text>
          <text x="287" y="90" textAnchor="middle" fontSize="14">
            🫒 🍇
          </text>
          <text x="287" y="112" textAnchor="middle" fontSize="9" fill="#065f46">
            Specializes in olive oil
          </text>
          <text x="287" y="124" textAnchor="middle" fontSize="8" fill="#047857">
            Natural climatic advantage
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
              ? "Handel pozwala obu krajom konsumować poza granicami własnych możliwości produkcyjnych"
              : lang === "de"
                ? "Durch Handel koennen beide Laender mehr konsumieren als allein moeglich"
                : "Trade allows both nations to consume beyond their domestic production possibilities"}
          </text>
          <text x="200" y="193" textAnchor="middle" fontSize="9.5" fill="#94a3b8">
            {lang === "pl"
              ? "Specjalizacja w tym, co robimy najtaniej, powiększa globalne bogactwo"
              : lang === "de"
                ? "Spezialisierung auf geringste Opportunitaetskosten mehrt den Weltwohlstand"
                : "Specializing where relative opportunity costs are lowest expands the global pie"}
          </text>
        </g>
      )}
    </svg>
  );
}

function TariffDeadweightLossDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Cła i taryfy celne: martwa strata dobrobytu (deadweight loss)"
      : lang === "de"
        ? "Zoelle und Wohlstandsverlust (Deadweight Loss)"
        : "Tariff walls and economic deadweight loss for consumers";

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
      <g>
        <rect
          x="40"
          y="45"
          width="145"
          height="85"
          rx="8"
          fill="#ecfdf5"
          stroke="#059669"
          strokeWidth="1.5"
        />
        <text x="112" y="70" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#065f46">
          Free Trade Harbor
        </text>
        <text x="112" y="90" textAnchor="middle" fontSize="14">
          🚢 📦 💶
        </text>
        <text x="112" y="112" textAnchor="middle" fontSize="9" fill="#065f46">
          Affordable consumer goods
        </text>
        <text x="112" y="124" textAnchor="middle" fontSize="8" fill="#047857">
          Competitive open markets
        </text>
      </g>
      {step >= 2 && (
        <g>
          <rect
            x="215"
            y="45"
            width="145"
            height="85"
            rx="8"
            fill="#fee2e2"
            stroke="#ef4444"
            strokeWidth="1.5"
          />
          <text x="287" y="70" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#b91c1c">
            30% Tariff Wall
          </text>
          <text x="287" y="90" textAnchor="middle" fontSize="14">
            🧱 🛑 📈
          </text>
          <text x="287" y="112" textAnchor="middle" fontSize="9" fill="#991b1b">
            Domestic prices spike
          </text>
          <text x="287" y="124" textAnchor="middle" fontSize="8" fill="#ef4444">
            Consumers pay the tax surcharge
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="150" width="320" height="55" rx="8" fill="#78350f" />
          <text
            x="200"
            y="174"
            textAnchor="middle"
            fontSize="11.5"
            fontWeight="bold"
            fill="#ffffff"
          >
            {lang === "pl"
              ? "Cła nie są płacone przez obcy kraj: płacą je krajowi konsumenci w wyższych cenach"
              : lang === "de"
                ? "Zoelle zahlt nicht das Ausland: Es sind die eigenen Buerger an der Kasse"
                : "Tariffs are not paid by foreign states: they are a tax on domestic citizens"}
          </text>
          <text x="200" y="193" textAnchor="middle" fontSize="9.5" fill="#fde68a">
            {lang === "pl"
              ? "Wojny handlowe prowadzą do odwetu i ubożenia obu stron"
              : lang === "de"
                ? "Handelskriege fuehren zu Vergelturng und schaden beiden Laendern"
                : "Retaliatory trade wars shrink real purchasing power across the globe"}
          </text>
        </g>
      )}
    </svg>
  );
}

function SupplyChainInterdependenceDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Globalne łańcuchy dostaw: jak powstaje nowoczesny smartfon"
      : lang === "de"
        ? "Globale Wertschoepfungsketten: Wie ein Smartphone entsteht"
        : "Global supply chains: multi-country components in a single device";

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
        <circle cx="200" cy="90" r="34" fill="#eff6ff" stroke="#2563eb" strokeWidth="2" />
        <text x="200" y="85" textAnchor="middle" fontSize="18">
          📱
        </text>
        <text x="200" y="105" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#1e40af">
          Smartphone
        </text>

        <rect
          x="35"
          y="55"
          width="85"
          height="45"
          rx="6"
          fill="#f1f5f9"
          stroke="#64748b"
          strokeWidth="1"
        />
        <text x="77" y="75" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#334155">
          Chips (Taiwan)
        </text>
        <text x="77" y="90" textAnchor="middle" fontSize="7.5" fill="#64748b">
          3nm lithography
        </text>

        <rect
          x="280"
          y="55"
          width="85"
          height="45"
          rx="6"
          fill="#f1f5f9"
          stroke="#64748b"
          strokeWidth="1"
        />
        <text x="322" y="75" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#334155">
          Glass (USA)
        </text>
        <text x="322" y="90" textAnchor="middle" fontSize="7.5" fill="#64748b">
          Ceramic shield
        </text>

        <rect
          x="157"
          y="150"
          width="85"
          height="45"
          rx="6"
          fill="#f1f5f9"
          stroke="#64748b"
          strokeWidth="1"
        />
        <text x="200" y="170" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#334155">
          Sensors (EU/Japan)
        </text>
        <text x="200" y="185" textAnchor="middle" fontSize="7.5" fill="#64748b">
          Optics & lenses
        </text>
      </g>
      {step >= 2 && (
        <g>
          <line
            x1="120"
            y1="77"
            x2="166"
            y2="85"
            stroke="#2563eb"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />
          <line
            x1="280"
            y1="77"
            x2="234"
            y2="85"
            stroke="#2563eb"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />
          <line
            x1="200"
            y1="150"
            x2="200"
            y2="124"
            stroke="#2563eb"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="202" width="320" height="24" rx="6" fill="#1e293b" />
          <text x="200" y="218" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#ffffff">
            {lang === "pl"
              ? "Żaden kraj na świecie nie potrafi sam zbudować nowoczesnego smartfona od zera"
              : lang === "de"
                ? "Kein Land der Welt kann ein Smartphone allein von Grund auf bauen"
                : "No single nation possesses all the materials and machines to build a phone alone"}
          </text>
        </g>
      )}
    </svg>
  );
}

function GlobalCommercePeaceDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Współzależność handlowa jako fundament pokoju między narodami"
      : lang === "de"
        ? "Handelsverflechtung als Friedenssicherung zwischen Nationen"
        : "Commercial trade interdependence anchoring geopolitical peace";

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
        <circle cx="200" cy="90" r="38" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" />
        <text x="200" y="85" textAnchor="middle" fontSize="20">
          🕊️ 🚢
        </text>
        <text x="200" y="105" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#5b21b6">
          Peace & Trade
        </text>
        <rect
          x="40"
          y="45"
          width="105"
          height="65"
          rx="6"
          fill="#fdf4ff"
          stroke="#c084fc"
          strokeWidth="1"
        />
        <text x="92" y="70" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#7e22ce">
          Mutual Benefit
        </text>
        <text x="92" y="88" textAnchor="middle" fontSize="8" fill="#9333ea">
          Shared wealth
        </text>
        <rect
          x="255"
          y="45"
          width="105"
          height="65"
          rx="6"
          fill="#fdf4ff"
          stroke="#c084fc"
          strokeWidth="1"
        />
        <text x="307" y="70" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#7e22ce">
          Lower Poverty
        </text>
        <text x="307" y="88" textAnchor="middle" fontSize="8" fill="#9333ea">
          1B lifted up
        </text>
      </g>
      {step >= 2 && (
        <g>
          <rect
            x="50"
            y="140"
            width="300"
            height="42"
            rx="6"
            fill="#ede9fe"
            stroke="#a855f7"
            strokeWidth="1"
          />
          <text x="200" y="158" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#581c87">
            "When goods don't cross borders, soldiers will"
          </text>
          <text x="200" y="172" textAnchor="middle" fontSize="8.5" fill="#7e22ce">
            Frédéric Bastiat
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="198" width="320" height="24" rx="6" fill="#581c87" />
          <text
            x="200"
            y="214"
            textAnchor="middle"
            fontSize="10.5"
            fontWeight="bold"
            fill="#ffffff"
          >
            {lang === "pl"
              ? "Handel przekształca dawnych rywali w zaufanych partnerów gospodarczych"
              : lang === "de"
                ? "Handel verwandelt fruehere Rivalen in verlaessliche Wirtschaftspartner"
                : "Commerce turns former historical rivals into indispensable economic partners"}
          </text>
        </g>
      )}
    </svg>
  );
}

function Toy({ onDone }: ToyProps) {
  const [tariffRate, setTariffRate] = useState(0);
  const shoePrice = 60 + tariffRate * 0.8;
  const variety = Math.max(10, 100 - tariffRate * 2);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "center" }}>
      <p style={{ margin: 0, fontWeight: 700, fontSize: "1rem" }}>
        Import Tariff on Shoes: {tariffRate}% | Pair Price: {shoePrice.toFixed(0)} € | Store
        Variety: {variety} models
      </p>
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          type="button"
          className="btn"
          onClick={() => {
            setTariffRate((t) => {
              const next = Math.min(50, t + 10);
              if (next >= 30) onDone?.();
              return next;
            });
          }}
        >
          Raise Import Tariffs (+10%)
        </button>
        <button
          type="button"
          className="btn btn-quiet"
          onClick={() => {
            setTariffRate((t) => {
              const next = Math.max(0, t - 10);
              if (next === 0) onDone?.();
              return next;
            });
          }}
        >
          Cut Tariffs (Free Trade)
        </button>
      </div>
      <div
        style={{
          padding: "12px",
          background: tariffRate === 0 ? "#eef8ef" : "#fff1f2",
          borderRadius: "10px",
          width: "100%",
          textAlign: "center",
        }}
      >
        {tariffRate >= 30
          ? "Heavy Protectionism: Running shoes cost 100€ instead of 60€! Domestic consumers pay more for fewer choices, and trading partners threaten retaliatory barriers."
          : tariffRate > 0
            ? "Moderate Trade Barriers: Domestic shoe factories enjoy some shield from competition, but families pay slightly higher prices."
            : "Free Open Trade: High competition keeps prices low and gives consumers access to the best running shoes and designs from across the globe!"}
      </div>
    </div>
  );
}

function TradeWidget({ onAnswer }: WidgetProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
      <p style={{ margin: 0 }}>
        According to David Ricardo's principle of comparative advantage, why should two countries
        trade even if one country is better at producing everything?
      </p>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>
        Because international trade is legally required by the United Nations space program
      </button>
      <button type="button" className="btn" onClick={() => onAnswer(true)}>
        Because both countries become wealthier by specializing in the goods where their relative
        opportunity cost is lowest and trading for the rest
      </button>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>
        Because container ships need exercise to keep their diesel engines warm
      </button>
    </div>
  );
}

export const lesson: Lesson = {
  id: "trade",
  story: [
    animatedBeat(
      [
        T(
          "Meet Kriti. She stands at a busy maritime container port, watching towering gantry cranes unload thousands of steel shipping containers from a massive ocean vessel.",
          "Das ist Klara. Sie steht an den Kaikanten eines Seehafens und beobachtet riesige Kraene, die bunte Stahlcontainer von einem Frachter heben.",
          "Poznaj Kasię. Stoi na nabrzeżu morskiego portu kontenerowego i patrzy, jak gigantyczne suwnice rozładowują tysiące stalowych kontenerów z oceanicznego statku.",
        ),
        T(
          "Inside those metal boxes are electronics from Taiwan, fair-trade coffee from Colombia, textiles from Portugal, and surgical instruments from Germany.",
          "In diesen Boxen liegen Chips aus Taiwan, Kaffee aus Kolumbien, Stoffe aus Portugal und Praezisionsgeraete aus Deutschland.",
          "W środku znajdują się procesory z Tajwanu, kawa z Kolumbii, tkaniny z Portugalii oraz instrumenty medyczne z Niemiec.",
        ),
        T(
          "Global trade is the living engine that allows eight billion human beings to share their unique skills, climates, and technological breakthroughs.",
          "Der Welthandel ist der Motor, der es acht Milliarden Menschen ermoeglicht, ihre Faehigkeiten und Rohstoffe zu teilen.",
          "Handel międzynarodowy to krwioobieg cywilizacji, umożliwiający miliardom ludzi wymianę talentów, surowców i innowacji.",
        ),
      ],
      HarborContainerLaunchDiagram,
    ),
    animatedBeat(
      [
        T(
          "In 1817, British economist David Ricardo formulated one of the most brilliant insights in human thought: *comparative advantage*.",
          "1817 formulierte der britische Oekonom David Ricardo eine der schaerfsten Erkenntnisse des Denkens: den *komparativen Vorteil*.",
          "W 1817 roku brytyjski ekonomista David Ricardo sformułował jedną z najbardziej genialnych zasad ekonomii: *przewagę komparatywną*.",
        ),
        T(
          "Even if one nation possesses an absolute advantage, meaning it can produce both aircraft and olive oil faster than its neighbor, trade is still mutually enriching.",
          "Selbst wenn ein Land Flugzeuge UND Olivenoel produktiver herstellen kann als das Nachbarland, lohnt sich Handel fuer beide.",
          "Nawet jeśli dany kraj potrafi wyprodukować zarówno samoloty, jak i oliwę z oliwek wydajniej niż sąsiad, handel wciąż opłaca się obu stronom.",
        ),
        T(
          "By specializing in whatever good it produces at the lowest *opportunity cost* and trading for everything else, both nations consume more than they ever could in isolation.",
          "Wenn sich jedes Land auf das spezialisiert, was es mit den geringsten *Opportunitaetskosten* baut, waechst der Wohlstand beider.",
          "Gdy każdy naród skupia się na towarach o najniższym *koszcie alternatywnym* i wymienia nadwyżki, oba kraje osiągają poziom konsumpcji nieosiągalny w izolacji.",
        ),
      ],
      ComparativeAdvantageDiagram,
    ),
    animatedBeat(
      [
        T(
          "When politicians attempt to block trade by imposing *tariffs* (taxes on imported goods), domestic consumers pay the price.",
          "Wenn Regierungen den Handel durch *Zoelle* (Einfuhrsteuern) behindern, zahlen die heimischen Verbraucher die Zeche.",
          "Gdy politycy próbują powstrzymać import za pomocą *ceł* (taryf celnych), najwyższą cenę płacą właśni obywatele.",
        ),
        T(
          "Tariffs do not penalize the foreign country: they act as a sales tax paid at the border by domestic importers and passed directly to retail consumers.",
          "Zoelle zahlt nicht das Ausland: Sie sind eine Sondersteuer, die der Importeur aufschlaegt und der Kunde im Laden bezahlt.",
          "Cła nie są płacone przez obce rządy: stanowią podatek graniczny, który importer dolicza do ceny na sklepowej półce.",
        ),
        T(
          "While a tariff protects a handful of uncompetitive domestic factories, it raises prices for millions of families and destroys economic efficiency through deadweight loss.",
          "Sie schuetzen einzelne unproduktive Betriebe, doch Millionen Familien muessen dafuer spuerbar mehr Geld ausgeben.",
          "Chroniąc kilka nieefektywnych zakładów, cła drenują kieszenie milionów rodzin i niszczą dobrobyt społeczny.",
        ),
      ],
      TariffDeadweightLossDiagram,
    ),
    animatedBeat(
      [
        T(
          "Modern manufacturing relies on intricate *global supply chains* spanning dozens of specialized sovereign nations.",
          "Moderne Industriegueter basieren auf weltweiten *Wertschoepfungsketten*, die dutzende spezialisierte Laender verbinden.",
          "Nowoczesny przemysł opiera się na złożonych *globalnych łańcuchach dostaw*, obejmujących dziesiątki wyspecjalizowanych państw.",
        ),
        T(
          "A single smartphone contains microchips designed in California, etched in Taiwan using Dutch ultraviolet lithography mirrors, assembled with Korean memory and South American lithium.",
          "Ein Smartphone enthaelt Chips aus Taiwan, niederlaendische Laseroptik, koreanische Displays und suedamerikanisches Lithium.",
          "Jeden smartfon mieści w sobie procesory zaprojektowane w Kalifornii, wytrawione na Tajwanie przy użyciu holenderskich laserów, ekrany z Korei i lit z Ameryki Płd.",
        ),
        T(
          "No single country on Earth has the resources, expertise, and mineral deposits to build high technology completely alone.",
          "Kein einziges Land besitzt alle Rohstoffe, Maschinen und Patente, um moderne Spitzentechnik im Alleingang zu bauen.",
          "Żadne państwo na świecie nie dysponuje wszystkimi surowcami, patentami i fabrykami, by zbudować taką technologię w pojedynkę.",
        ),
      ],
      SupplyChainInterdependenceDiagram,
    ),
    animatedBeat(
      [
        T(
          "Beyond cheap electronics and fresh fruit in winter, international commerce serves as a profound civilizational peacekeeper.",
          "Ueber guenstige Geraete und frisches Obst hinaus ist der Welthandel das wirksamste Friedensprojekt der Geschichte.",
          "Poza dostępem do tańszej technologii i owoców cytrusowych w zimie, handel międzynarodowy stanowi potężną tarczę pokoju.",
        ),
        T(
          "When countries are deeply intertwined through trade, investment, and joint research, the economic cost of armed conflict becomes ruinously catastrophic for all.",
          "Wenn Laender ueber Lieferketten eng verflochten sind, wird ein Krieg fuer alle Beteiligten zum wirtschaftlichen Selbstmord.",
          "Gdy gospodarki są ściśle powiązane dostawami, inwestycjami i wspólnymi badaniami, wojna staje się ekonomicznym samobójstwem.",
        ),
        T(
          "Trade builds bridges of mutual respect, reduces extreme poverty, and connects our diverse planet into an interdependent human community.",
          "Handel baut Bruecken des Respekts, besiegt Armut und verbindet unsere Welt zu einer friedlichen Gemeinschaft.",
          "Handel buduje mosty wzajemnego szacunku, wyciąga miliardy ludzi z biedy i jednoczy planetę w pokojowej współpracy.",
        ),
      ],
      GlobalCommercePeaceDiagram,
    ),
  ],
  toyIntro: T(
    "Test the impact of import tariffs: simulate raising trade barriers on athletic shoes and watch consumer prices rise while variety collapses.",
    "Erprobe die Wirkung von Einfuhrzoellen: Hebe Zoelle auf Sportschuhe an und beobachte steigende Preise und sinkende Auswahl.",
    "Zbadaj skutki nakładania ceł: podnoś stawki taryf na obuwie sportowe i zobacz, jak rosną ceny w sklepach, a wybór modeli dramatycznie spada.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "What is David Ricardo's principle of 'comparative advantage'?",
        "Was besagt David Ricardos Prinzip des 'komparativen Vorteils'?",
        "Na czym polega zasada 'przewagi komparatywnej' Davida Ricardo?",
      ),
      options: [
        {
          text: T(
            "Nations gain from trade by specializing in goods they can produce at a lower relative opportunity cost, even if another nation is absolutely more productive at everything",
            "Laender profitieren vom Handel, wenn sie sich auf Gueter mit den geringsten relativen Opportunitaetskosten spezialisieren",
            "Kraje odnoszą korzyści z handlu, specjalizując się w produkcji dóbr o niższym względnym koszcie alternatywnym, nawet jeśli partner jest bezwzględnie wydajniejszy we wszystkim",
          ),
          correct: true,
        },
        {
          text: T(
            "Countries must only trade items that begin with the same letter as their prime minister's surname",
            "Laender duerfen nur Waren tauschen, die denselben Anfangsbuchstaben wie der Regierungschef haben",
            "Państwa mogą handlować wyłącznie towarami zaczynającymi się na tę samą literę co nazwisko premiera",
          ),
          correct: false,
        },
        {
          text: T(
            "Only countries with snow-covered mountains are allowed to manufacture winter coats",
            "Nur Laender mit verschneiten Bergen duerfen Wintermaentel herstellen",
            "Wyłącznie państwa posiadające ośnieżone góry mają prawo do szycia zimowych płaszczy",
          ),
          correct: false,
        },
      ],
      hint: T(
        "Focus on relative opportunity costs rather than absolute production speeds.",
        "Achte auf relative Opportunitaetskosten statt auf absolute Produktionsmengen.",
        "Zwróć uwagę na względne koszty alternatywne, a nie na bezwzględną szybkość wytwarzania.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "Who directly pays an import tariff when a foreign product crosses the national border?",
        "Wer zahlt den Einfuhrzoll direkt, wenn eine auslaendische Ware die Grenze passiert?",
        "Kto bezpośrednio płaci cło importowe, gdy towar z zagranicy przekracza granicę państwową?",
      ),
      options: [
        {
          text: T(
            "The domestic importing business at the customs port, which then passes the cost along to domestic shoppers in higher retail prices",
            "Das heimische Importunternehmen beim Zoll, welches die Mehrkosten ueber hoehere Ladenpreise an die Verbraucher weitergibt",
            "Krajowa firma importująca towar w urzędzie celnym, która następnie przerzuca ten koszt na klientów w wyższej cenie detalicznej",
          ),
          correct: true,
        },
        {
          text: T(
            "The foreign head of state pays out of their private piggy bank in cash",
            "Der auslaendische Praesident zahlt die Summe persoenlich aus seiner privaten Spardose",
            "Prezydent obcego państwa wpłaca gotówkę z własnej prywatnej skarbonki",
          ),
          correct: false,
        },
        {
          text: T(
            "Dolphins swimming beside the cargo vessel deliver pearls to customs guards",
            "Delfine neben dem Containerschiff ueberreichen Perlen an die Zollbeamten",
            "Delfiny płynące obok kontenerowca wręczają perły strażnikom granicznym",
          ),
          correct: false,
        },
      ],
      hint: T(
        "Think about who pays customs duties when ordering an overseas package online.",
        "Ueberlege, wer Zollgebuehren zahlt, wenn du ein Paket aus den USA oder Asien bestellst.",
        "Zastanów się, kto uiszcza opłatę celną, gdy zamawiasz paczkę ze sklepu internetowego w Azji czy USA.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Analyze why international trade creates mutual economic wealth across borders.",
        "Analysiere, warum internationaler Handel beidseitigen Wohlstand ueber Grenzen hinweg schafft.",
        "Przeanalizuj, dlaczego handel międzynarodowy tworzy obopólny dobrobyt ponad granicami państw.",
      ),
      Widget: TradeWidget,
      hint: T(
        "Focus on specialization, opportunity cost minimization, and expanded consumption possibilities.",
        "Achte auf Spezialisierung, Minimierung von Opportunitaetskosten und hoehere Gueterverfuegbarkeit.",
        "Zwróć uwagę na specjalizację, minimalizację kosztów alternatywnych i powiększenie puli dostępnych dóbr.",
      ),
    },
  ],
  askDad: T(
    "Ask your parent: Look around your living room and kitchen together: how many everyday items (coffee, smartphone, television, shoes) were manufactured abroad?",
    "Frage deine Eltern: Schaut euch gemeinsam im Wohnzimmer um: Wie viele Alltagsgegenstaende (Kaffee, Fernseher, Smartphone, Schuhe) wurden im Ausland gefertigt?",
    "Zapytaj rodziców: Rozejrzyjcie się po salonie i kuchni: jak wiele codziennych przedmiotów (kawa, telewizor, telefon, buty) wyprodukowano za granicą?",
  ),
  realLife: {
    title: T(
      "Real world: The invention of the intermodal shipping container (1956) and the World Trade Organization (WTO)",
      "Echte Welt: Die Erfindung des Schiffscontainers 1956 und die Entstehung der Welthandelsorganisation (WTO)",
      "Prawdziwy świat: Wynalazek kontenera morskiego w 1956 r. i powstanie Światowej Organizacji Handlu (WTO)",
    ),
    body: T(
      "In 1956, American trucking entrepreneur Malcolm McLean launched the world's first standardized steel intermodal shipping container on the vessel Ideal X. Standardized containers slashed cargo loading costs by over 90% and shortened harbor turnarounds from weeks to hours, making the modern global economy possible. In 1995, nations established the World Trade Organization (WTO) in Geneva to arbitrate international trade disputes and lower tariff barriers through rule of law.",
      "1956 revolutionierte der US-Spediteur Malcolm McLean die Weltwirtschaft mit dem genormten ISO-Schiffscontainer auf der 'Ideal X'. Standardisierte Container senkten die Ladekosten um ueber 90% und verkuerzten Hafenliegezeiten von Wochen auf Stunden. 1995 gruendeten die Staaten die Welthandelsorganisation (WTO) in Genf, um Handelsstreitigkeiten friedlich vor Schiedsgerichten beizulegen.",
      "W 1956 roku amerykański przedsiębiorca Malcolm McLean zrewolucjonizował gospodarkę, wprowadzając znormalizowany stalowy kontener morski na statku Ideal X. Standaryzacja kontenerów obniżyła koszty przeładunku o ponad 90% i skróciła postój statków w portach z tygodni do godzin. W 1995 roku utworzono Światową Organizację Handlu (WTO) w Genewie, aby rozstrzygać spory handlowe w oparciu o prawo.",
    ),
  },
  factCard: {
    claims: [
      {
        text: T(
          "David Ricardo formulated the law of comparative advantage in 'On the Principles of Political Economy and Taxation' in 1817.",
          "David Ricardo formulierte das Gesetz des komparativen Vorteils 1817 in seinem Hauptwerk.",
          "David Ricardo sformułował prawo przewagi komparatywnej w dziele 'Zasady ekonomii politycznej i opodatkowania' w 1817 roku.",
        ),
        source: "https://www.econlib.org/library/Ricardo/ricP.html",
      },
      {
        text: T(
          "Malcolm McLean patented the standard intermodal shipping container system in 1956, launching the modern era of containerized globalization.",
          "Malcolm McLean etablierte 1956 den genormten Container, was die Frachtkosten weltweit um ueber 90% senkte.",
          "Malcolm McLean opatentował znormalizowany system kontenerów w 1956 roku, redukując koszty transportu morskiego o ponad 90%.",
        ),
        source:
          "https://www.smithsonianmag.com/history/how-the-shipping-container-changed-the-world-180977237/",
      },
      {
        text: T(
          "The World Trade Organization (WTO) was officially established on January 1, 1995 under the 1994 Marrakesh Agreement, replacing GATT.",
          "Die Welthandelsorganisation (WTO) nahm am 1. Januar 1995 ihre Arbeit auf, basierend auf dem Abkommen von Marrakesch.",
          "Światowa Organizacja Handlu (WTO) powstała 1 stycznia 1995 roku na mocy Porozumienia z Marrakeszu, zastępując układ GATT.",
        ),
        source: "https://www.wto.org/english/thewto_e/whatis_e/who_we_are_e.htm",
      },
      {
        text: T(
          "The Smoot-Hawley Tariff Act of June 1930 raised US tariffs on over 20,000 imported goods, sparking retaliatory duties that collapsed global trade by 66% during the Great Depression.",
          "Der US-Smoot-Hawley-Zollakt von 1930 loeste weltweite Vergeltungszoelle aus und liess den Welthandel um zwei Drittel einbrechen.",
          "Ustawa celna Smoota-Hawleya z 1930 r. wywołała odwetowe taryfy na całym świecie i doprowadziła do załamania światowego handlu o 66%.",
        ),
        source:
          "https://www.senate.gov/artandhistory/history/common/generic/SmootHawleyTariffAct.htm",
      },
      {
        text: T(
          "Paul Krugman won the 2008 Nobel Memorial Prize in Economic Sciences for New Trade Theory, explaining intra-industry trade and economies of scale.",
          "Paul Krugman erhielt 2008 den Wirtschaftsnobelpreis fuer seine 'Neue Handelstheorie' ueber Skaleneffekte und Guetervielfalt.",
          "Paul Krugman otrzymał w 2008 roku Nagrodę Nobla za nową teorię handlu, wyjaśniającą korzyści skali i handel wewnątrzgałęziowy.",
        ),
        source: "https://www.nobelprize.org/prizes/economic-sciences/2008/press-release/",
      },
    ],
    simplified: [
      T(
        "Complex multilateral tariff schedules and Heckscher-Ohlin factor endowment models are translated into intuitive port crane loading scenes and running shoe price choices.",
        "Komplexe Zollziffern und Aussenhandelsmodelle wurden durch Hafenverladungen und den praktischen Vergleich von Laufschuhen zugaenglich erklaert.",
        "Skomplikowane taryfy celne i modele wymiany międzynarodowej Hecks chera-Ohlina przedstawiono za pomocą czytelnej sceny załadunku w porcie i cen butów do biegania.",
      ),
    ],
  },
};
