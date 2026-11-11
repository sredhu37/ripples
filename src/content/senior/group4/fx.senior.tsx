import { useState } from "react";
import { animatedBeat } from "../../../lesson/toolkit";
import type { DiagramProps, Lesson, Text, ToyProps, WidgetProps } from "../../../lesson/types";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function FxTerminalLaunchDiagram({ lang, step }: DiagramProps) {
  const anjaliName = lang === "pl" ? "Alicja" : lang === "de" ? "Anna" : "Anjali";
  const label =
    lang === "pl"
      ? "Alicja bada kursy walut na rynku walutowym (Forex)"
      : lang === "de"
        ? "Anna beobachtet Wechselkurse am Forex-Markt"
        : "Anjali monitoring exchange rates on global forex currency terminal";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect
        x="10"
        y="10"
        width="380"
        height="220"
        rx="14"
        fill="#0f172a"
        stroke="#06b6d4"
        strokeWidth="2"
      />
      <g>
        <circle cx="80" cy="110" r="28" fill="#f3cfa6" stroke="#06b6d4" strokeWidth="2" />
        <path d="M 52 110 C 52 70 108 70 108 110" fill="#164e63" />
        <circle cx="72" cy="107" r="2.5" fill="#0f172a" />
        <circle cx="88" cy="107" r="2.5" fill="#0f172a" />
        <path d="M 76 119 Q 80 125 84 119" stroke="#0f172a" strokeWidth="2" fill="none" />
        <path
          d="M 56 185 L 62 140 Q 80 135 98 140 L 104 185 Z"
          fill="#0891b2"
          stroke="#06b6d4"
          strokeWidth="2"
        />
        <text x="80" y="205" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#a5f3fc">
          {anjaliName}
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
          stroke="#06b6d4"
          strokeWidth="1.5"
        />
        <text x="250" y="55" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#cffafe">
          💱{" "}
          {lang === "pl"
            ? "Rynek Walutowy (Forex / FX)"
            : lang === "de"
              ? "Der Devisenmarkt (Forex / FX)"
              : "Foreign Exchange (FX) Markets"}
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
            stroke="#0891b2"
            strokeWidth="1.5"
          />
          <text x="250" y="102" textAnchor="middle" fontSize="18">
            💶 ⇄ 💵 ⇄ 💷
          </text>
          <text
            x="250"
            y="122"
            textAnchor="middle"
            fontSize="10.5"
            fontWeight="bold"
            fill="#67e8f9"
          >
            {lang === "pl"
              ? "Płynne kursy wymiany: EUR/USD, PLN/EUR"
              : lang === "de"
                ? "Flexible Wechselkurse im weltweiten Handel"
                : "Floating exchange rates in 24-hour global trading"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="135" y="145" width="230" height="60" rx="8" fill="#0e7490" />
          <text x="250" y="170" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#ffffff">
            {lang === "pl"
              ? "Aprecjacja i deprecjacja waluty"
              : lang === "de"
                ? "Aufwertung vs Abwertung"
                : "Currency appreciation vs depreciation"}
          </text>
          <text x="250" y="190" textAnchor="middle" fontSize="10.5" fill="#e0f2fe">
            {lang === "pl"
              ? "Wpływ stóp procentowych i bilansu handlowego"
              : lang === "de"
                ? "Einfluss von Zinsen und Aussenhandel"
                : "Driven by interest rates and trade flows"}
          </text>
        </g>
      )}
    </svg>
  );
}

function SupplyDemandCurrencyDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Podaż i popyt na walutę kształtują kurs rynkowy"
      : lang === "de"
        ? "Angebot und Nachfrage nach Waehrungen bestimmen den Kurs"
        : "Supply and demand determining currency exchange rates";

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
          fill="#ecfdf5"
          stroke="#059669"
          strokeWidth="1.5"
        />
        <text x="112" y="70" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#065f46">
          High Demand for EUR
        </text>
        <text x="112" y="90" textAnchor="middle" fontSize="14">
          📈 💶 ⬆️
        </text>
        <text x="112" y="112" textAnchor="middle" fontSize="9" fill="#065f46">
          Foreigners buy exports
        </text>
        <text x="112" y="124" textAnchor="middle" fontSize="8" fill="#047857">
          Euro strengthens (Appreciation)
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
            Excess EUR Supply
          </text>
          <text x="287" y="90" textAnchor="middle" fontSize="14">
            📉 💶 ⬇️
          </text>
          <text x="287" y="112" textAnchor="middle" fontSize="9" fill="#991b1b">
            High foreign imports
          </text>
          <text x="287" y="124" textAnchor="middle" fontSize="8" fill="#ef4444">
            Euro weakens (Depreciation)
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
              ? "Kurs waluty to nic innego jak cena jednej waluty wyrażona w innej"
              : lang === "de"
                ? "Ein Wechselkurs ist schlicht der relative Preis zweier Waehrungen zueinander"
                : "An exchange rate is simply the market price of one currency priced in another"}
          </text>
          <text x="200" y="193" textAnchor="middle" fontSize="9.5" fill="#94a3b8">
            {lang === "pl"
              ? "Kapitał płynie tam, gdzie stopy procentowe i bezpieczeństwo są wyższe"
              : lang === "de"
                ? "Kapital fliesst dorthin, wo Rendite und Sicherheit am attraktivsten sind"
                : "Global funds flow toward higher interest yields and economic stability"}
          </text>
        </g>
      )}
    </svg>
  );
}

function ExportersVsImportersDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Wpływ silnej i słabej waluty na eksporterów i importerów"
      : lang === "de"
        ? "Starke vs schwache Waehrung: Gewinner und Verlierer"
        : "Currency shifts: exporters vs importers impact";

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
          fill="#eff6ff"
          stroke="#2563eb"
          strokeWidth="1.5"
        />
        <text x="112" y="70" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e40af">
          Strong Home Currency
        </text>
        <text x="112" y="90" textAnchor="middle" fontSize="14">
          🏖️ 📱 👍
        </text>
        <text x="112" y="112" textAnchor="middle" fontSize="9" fill="#1e40af">
          Cheap foreign travel
        </text>
        <text x="112" y="124" textAnchor="middle" fontSize="8" fill="#2563eb">
          Imported smartphones cheaper
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
            fill="#fef3c7"
            stroke="#d97706"
            strokeWidth="1.5"
          />
          <text x="287" y="70" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#92400e">
            Weak Home Currency
          </text>
          <text x="287" y="90" textAnchor="middle" fontSize="14">
            🚢 🏭 👍
          </text>
          <text x="287" y="112" textAnchor="middle" fontSize="9" fill="#92400e">
            Exporters boom
          </text>
          <text x="287" y="124" textAnchor="middle" fontSize="8" fill="#b45309">
            Domestic goods cheaper abroad
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
              ? "Żadna waluta nie jest 'za silna' ani 'za słaba' we wszystkich wymiarach"
              : lang === "de"
                ? "Es gibt kein pauschales 'Besser': Stark hilft Urlaubern, schwach hilft Export"
                : "There is no single 'good' rate: strength aids travelers, softness aids export sales"}
          </text>
          <text x="200" y="193" textAnchor="middle" fontSize="9.5" fill="#fde68a">
            {lang === "pl"
              ? "Płynny kurs działa jak naturalny amortyzator wstrząsów makroekonomicznych"
              : lang === "de"
                ? "Flexible Kurse wirken als automatische Stossdaempfer fuer die Wirtschaft"
                : "Floating rates absorb asymmetric trade shocks across countries automatically"}
          </text>
        </g>
      )}
    </svg>
  );
}

function PurchasingPowerParityDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Parytet siły nabywczej (PPP) i wskaźnik Big Maca"
      : lang === "de"
        ? "Kaufkraftparitaet (KKP) und der Big-Mac-Index"
        : "Purchasing Power Parity (PPP) and real exchange rate valuation";

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
        <circle cx="120" cy="90" r="38" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
        <text x="120" y="85" textAnchor="middle" fontSize="20">
          🍔
        </text>
        <text x="120" y="105" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#92400e">
          Same Burger
        </text>

        <circle cx="280" cy="90" r="38" fill="#eff6ff" stroke="#2563eb" strokeWidth="2" />
        <text x="280" y="85" textAnchor="middle" fontSize="20">
          ⚖️ 🌍
        </text>
        <text x="280" y="105" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#1e40af">
          PPP Basket
        </text>

        <line x1="160" y1="90" x2="240" y2="90" stroke="#0ea5e9" strokeWidth="2.5" />
      </g>
      {step >= 2 && (
        <g>
          <rect x="50" y="145" width="300" height="40" rx="6" fill="#1e293b" />
          <text
            x="200"
            y="163"
            textAnchor="middle"
            fontSize="10.5"
            fontWeight="bold"
            fill="#ffffff"
          >
            {lang === "pl"
              ? "Parytet Siły Nabywczej (PPP) porównuje realny koszt życia"
              : lang === "de"
                ? "Kaufkraftparitaet (KKP) vergleicht die realen Lebenshaltungskosten"
                : "Purchasing Power Parity benchmarks identical consumption baskets globally"}
          </text>
          <text x="200" y="177" textAnchor="middle" fontSize="8.5" fill="#94a3b8">
            {lang === "pl"
              ? "Rynkowe kursy walut podlegają spekulacji i różnicom stóp procentowych"
              : lang === "de"
                ? "Marktwechselkurse schwanken oft staerker als fundamentale Preisniveaus"
                : "Market rates fluctuate rapidly with capital flows, deviating from real costs"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="198" width="320" height="24" rx="6" fill="#0369a1" />
          <text
            x="200"
            y="214"
            textAnchor="middle"
            fontSize="10.5"
            fontWeight="bold"
            fill="#ffffff"
          >
            {lang === "pl"
              ? "Długoterminowo kursy walut mają tendencję do zbliżania się do poziomu PPP"
              : lang === "de"
                ? "Langfristig bewegen sich Waehrungskurse oft in Richtung der Kaufkraft"
                : "Over long horizons, exchange rates tend to drift toward relative price parities"}
          </text>
        </g>
      )}
    </svg>
  );
}

function GlobalForexFlowsDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Globalny rynek walutowy: 7,5 biliona dolarów obrotu dziennie"
      : lang === "de"
        ? "Der groesste Finanzmarkt: 7,5 Billionen Dollar taeglicher Devisenumsatz"
        : "Global forex network: 7.5 trillion dollars daily turnover connecting economies";

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
          🌐 💱
        </text>
        <text x="200" y="105" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#5b21b6">
          Forex Market
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
          Hedging
        </text>
        <text x="92" y="88" textAnchor="middle" fontSize="8" fill="#9333ea">
          Lock future rates
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
          Tourism & Trade
        </text>
        <text x="307" y="88" textAnchor="middle" fontSize="8" fill="#9333ea">
          Direct settlement
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
            The foreign exchange market is the largest and most liquid financial market on Earth
          </text>
          <text x="200" y="172" textAnchor="middle" fontSize="8.5" fill="#7e22ce">
            Bank for International Settlements (BIS Triennial Survey)
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
              ? "Forex to most łączący niezależne gospodarki w jeden globalny krwioobieg handlowy"
              : lang === "de"
                ? "Devisenmaerkte verbinden nationale Wirtschaften zu einem globalen Handelsnetz"
                : "Currency markets form the vascular network connecting sovereign economies into global trade"}
          </text>
        </g>
      )}
    </svg>
  );
}

function Toy({ onDone }: ToyProps) {
  const [exchangeRate, setExchangeRate] = useState(1.1);
  const foreignPhoneCostInEur = Math.round(990 / exchangeRate);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "center" }}>
      <p style={{ margin: 0, fontWeight: 700, fontSize: "1rem" }}>
        EUR / USD Rate: {exchangeRate.toFixed(2)} | 990 $ Laptop in Euros: {foreignPhoneCostInEur} €
      </p>
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          type="button"
          className="btn"
          onClick={() => {
            setExchangeRate((r) => {
              const next = Math.min(1.4, r + 0.05);
              if (next >= 1.25) onDone?.();
              return next;
            });
          }}
        >
          Euro Strengthens (Appreciates)
        </button>
        <button
          type="button"
          className="btn btn-quiet"
          onClick={() => {
            setExchangeRate((r) => {
              const next = Math.max(0.85, r - 0.05);
              if (next <= 0.95) onDone?.();
              return next;
            });
          }}
        >
          Euro Weakens (Depreciates)
        </button>
      </div>
      <div
        style={{
          padding: "12px",
          background: exchangeRate >= 1.2 ? "#eef8ef" : "#fffbeb",
          borderRadius: "10px",
          width: "100%",
          textAlign: "center",
        }}
      >
        {exchangeRate >= 1.25
          ? "Strong Euro: Great for vacations to California and buying American gadgets, but harder for German car factories to sell overseas!"
          : exchangeRate <= 0.95
            ? "Weak Euro: American laptops get expensive for European students, but European export companies see record sales abroad!"
            : "Balanced FX Rate: Predictable trade flow between European exporters and international consumers!"}
      </div>
    </div>
  );
}

function FxWidget({ onAnswer }: WidgetProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
      <p style={{ margin: 0 }}>
        When a country's currency experiences significant 'appreciation' (strengthens), what is the
        direct economic effect?
      </p>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>
        All trees in that country grow twice as tall overnight
      </button>
      <button type="button" className="btn" onClick={() => onAnswer(true)}>
        Foreign imported goods and overseas travel become cheaper for domestic consumers, while
        domestic exports become more expensive for foreign buyers
      </button>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>
        The country is immediately banned from playing international soccer
      </button>
    </div>
  );
}

export const lesson: Lesson = {
  id: "fx",
  story: [
    animatedBeat(
      [
        T(
          "Meet Anjali. She is planning a vacation trip to London and Tokyo and visits a foreign currency exchange kiosk at the airport.",
          "Das ist Anna. Sie plant eine Reise nach London und Tokio und wechselt am Flughafen Geld an der Devisenkasse.",
          "Poznaj Alicję. Planuje wakacyjny wyjazd do Londynu i Tokio i podchodzi do kantoru wymiany walut na lotnisku.",
        ),
        T(
          "On the illuminated electronic board, numbers constantly flicker: 1 Euro buys 0.86 British Pounds, but 160 Japanese Yen.",
          "Auf der digitalen Anzeigetafel flimmern die Kurse: 1 Euro entspricht 0,86 Britischen Pfund, aber 160 Japanischen Yen.",
          "Na świecącej tablicy kursowej cyfry nieustannie migają: za 1 euro otrzymuje 0,86 funta brytyjskiego, ale aż 160 jenów japońskich.",
        ),
        T(
          "This 24-hour marketplace is the *foreign exchange market* (Forex or FX), which is the largest financial arena on the planet.",
          "Dieser weltumspannende Markt ist der *Devisenmarkt* (Forex / FX), der groesste Finanzplatz unseres Planeten.",
          "Ten całodobowy globalny rynek to *rynek walutowy* (Forex lub FX), czyli najpotężniejsza arena finansowa świata.",
        ),
      ],
      FxTerminalLaunchDiagram,
    ),
    animatedBeat(
      [
        T(
          "Just like apples or concert tickets, exchange rates are determined by global *supply and demand*.",
          "Wie bei Aepfeln oder Konzertkarten wird der Wechselkurs durch weltweites *Angebot und Nachfrage* bestimmt.",
          "Podobnie jak w przypadku jabłek czy biletów na koncert, kursy walut zależą od globalnego *popytu i podaży*.",
        ),
        T(
          "When international companies rush to buy German high-speed trains or French cosmetics, they must first exchange their local money for Euros, driving up the Euro's market value.",
          "Wollen auslaendische Firmen europaeische Maschinen kaufen, muessen sie zuerst Euro nachfragen, was den Euro staerkt.",
          "Gdy zagraniczne przedsiębiorstwa kupują europejskie pociągi, maszyny czy kosmetyki, muszą najpierw kupić euro, co podbija kurs wspólnej waluty.",
        ),
        T(
          "When an exchange rate rises so that one unit buys more foreign currency, we call it *currency appreciation*; when it falls, it is *depreciation*.",
          "Wenn eine Waehrung an Wert gewinnt, spricht man von *Aufwertung* (Appreciation); verliert sie an Wert, von *Abwertung*.",
          "Gdy waluta zyskuje na wartości i pozwala kupić więcej obcych dewiz, mówimy o *aprecjacji*; gdy traci na wartości, następuje *deprecjacja*.",
        ),
      ],
      SupplyDemandCurrencyDiagram,
    ),
    animatedBeat(
      [
        T(
          "Currency movements create immediate winners and losers between *exporters* and *importers*.",
          "Wechselkursschwankungen schaffen sofort Gewinner und Verlierer zwischen *Exporteuren* und *Importeuren*.",
          "Wahania kursów walutowych natychmiast wyłaniają wygranych i przegranych wśród *eksporterów* i *importerów*.",
        ),
        T(
          "A strong, appreciated Euro makes overseas holidays and imported American laptops cheaper for European families.",
          "Ein starker Euro verguenstigt Auslandsurlaube und importierte Laptops fuer europaeische Verbraucher.",
          "Silne, umocnione euro sprawia, że wakacje w Kalifornii i importowane laptopy stają się tańsze dla europejskich rodzin.",
        ),
        T(
          "However, that same strong Euro makes European cars and pharmaceuticals more expensive for buyers in Asia and America, hurting export factory jobs at home.",
          "Gleichzeitig verteuert ein starker Euro deutsche Autos im Ausland, was den Absatz der heimischen Industrie daempfen kann.",
          "Z drugiej strony silna waluta podraża europejskie samochody i leki za granicą, utrudniając sprzedaż fabrykom nastawionym na eksport.",
        ),
      ],
      ExportersVsImportersDiagram,
    ),
    animatedBeat(
      [
        T(
          "To compare the true cost of living across borders without currency noise, economists use *Purchasing Power Parity* (PPP).",
          "Um den realen Lebensstandard Laender-uebergreifend zu vergleichen, nutzen Oekonomen die *Kaufkraftparitaet* (KKP).",
          "Aby porównać realny poziom życia między państwami bez szumu rynkowego, ekonomiści posługują się *Parytetem Siły Nabywczej* (PPP).",
        ),
        T(
          "A famous intuitive benchmark is The Economist magazine's *Big Mac Index*, comparing the price of an identical burger across fifty nations.",
          "Ein beruehmtes anschauliches Beispiel ist der *Big-Mac-Index*, der den Preis desselben Burgers weltweit vergleicht.",
          "Słynnym, intuicyjnym przykładem jest publikowany przez The Economist *Indeks Big Maca*, porównujący cenę identycznej kanapki w 50 krajach.",
        ),
        T(
          "If a burger costs 5 dollars in New York but only 3 dollars converted in Tokyo, PPP theory suggests the Japanese Yen is fundamentally undervalued against the dollar.",
          "Kostet ein Burger in New York 5 Dollar, in Tokio umgerechnet aber nur 3 Dollar, gilt der Yen nach KKP als unterbewertet.",
          "Jeśli kanapka kosztuje 5 dolarów w Nowym Jorku, a po przeliczeniu tylko 3 dolary w Tokio, teoria PPP wskazuje, że jen jest niedowartościowany.",
        ),
      ],
      PurchasingPowerParityDiagram,
    ),
    animatedBeat(
      [
        T(
          "With over 7.5 trillion dollars traded every single day, the FX market seamlessly bridges national economies into a unified world market.",
          "Mit ueber 7,5 Billionen Dollar Tagesumsatz verknuepft der Devisenmarkt unabhaengige Volkswirtschaften zum Weltmarkt.",
          "Z obrotami sięgającymi 7,5 biliona dolarów dziennie, rynek walutowy łączy narodowe gospodarki w jeden globalny rynek.",
        ),
        T(
          "Companies use FX forward contracts to lock in exchange rates months in advance, protecting worker salaries from sudden currency crashes.",
          "Unternehmen nutzen Terminkontrakte, um Wechselkurse im Voraus abzusichern und Arbeitsplaetze vor Waehrungskrisen zu schuetzen.",
          "Przedsiębiorstwa zawierają kontrakty terminowe forward, zabezpieczając kursy walut na wiele miesięcy naprzód przed gwałtownymi załamaniami.",
        ),
        T(
          "Understanding foreign exchange gives you the lens to decipher global business news, international trade tensions, and travels around the globe.",
          "Wer Wechselkurse versteht, blickt souveran auf globale Wirtschaftsnachrichten, Aussenhandel und internationale Reisen.",
          "Zrozumienie mechanizmów rynku walutowego pozwala ze spokojem analizować wiadomości ze świata, spory handlowe i planować podróże.",
        ),
      ],
      GlobalForexFlowsDiagram,
    ),
  ],
  toyIntro: T(
    "Drive the exchange rate: adjust the EUR/USD exchange rate to discover how currency appreciation lowers import costs while challenging export factories.",
    "Steuere den Wechselkurs: Veraendere das EUR/USD-Verhaeltnis und erlebe, wie eine starke Waehrung Importe verbilligt, aber Exporte bremst.",
    "Steruj kursem walutowym: zmieniaj relację EUR/USD i zobacz, jak umocnienie waluty obniża koszty importu, lecz utrudnia życie rodzimym eksporterom.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "What happens to a nation's trade balance when its currency significantly appreciates (strengthens)?",
        "Was geschieht mit dem Aussenhandel eines Landes, wenn seine Waehrung spuerbar aufwertet?",
        "Co dzieje się z bilansem handlowym kraju, gdy jego waluta ulega silnej aprecjacji (umacnia się)?",
      ),
      options: [
        {
          text: T(
            "Imported goods become cheaper for domestic consumers, while domestic exported products become more expensive for foreign buyers",
            "Importgueter werden fuer Inlaender guenstiger, waehrend eigene Exportprodukte fuer auslaendische Kunden teurer werden",
            "Towary importowane stają się tańsze dla krajowych konsumentów, podczas gdy rodzime produkty eksportowe drożeją dla klientów zagranicznych",
          ),
          correct: true,
        },
        {
          text: T(
            "All factories immediately start manufacturing golden skateboards exclusively",
            "Saemtliche Fabriken stellen sofort die Produktion auf goldene Skateboards um",
            "Wszystkie fabryki natychmiast przestawiają się na produkcję złotych deskorolek",
          ),
          correct: false,
        },
        {
          text: T(
            "Foreign languages are automatically erased from world dictionaries",
            "Fremdsprachen verschwinden automatisch aus allen internationalen Woerterbuechern",
            "Języki obce zostają automatycznie usunięte z międzynarodowych słowników",
          ),
          correct: false,
        },
      ],
      hint: T(
        "Think about European tourists shopping in the US versus Americans buying German machinery.",
        "Denke an europaeische Urlauber beim Einkaufen in den USA im Vergleich zu Amerikanern, die deutsche Maschinen kaufen.",
        "Pomyśl o europejskim turyście robiącym zakupy w USA w porównaniu z Amerykaninem kupującym niemieckie obrabiarki.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "What does 'Purchasing Power Parity' (PPP) measure in international economics?",
        "Was misst die 'Kaufkraftparitaet' (KKP) in der internationalen Wirtschaft?",
        "Co mierzy 'Parytet Siły Nabywczej' (PPP) w gospodarce międzynarodowej?",
      ),
      options: [
        {
          text: T(
            "The theoretical exchange rate at which an identical basket of goods and services costs the exact same amount in two different countries",
            "Der theoretische Wechselkurs, bei dem ein identischer Warenkorb in zwei Laendern exakt denselben Preis haette",
            "Teoretyczny kurs walutowy, przy którym identyczny koszyk dóbr i usług kosztowałby dokładnie tyle samo w dwóch różnych krajach",
          ),
          correct: true,
        },
        {
          text: T(
            "The number of push-ups a foreign minister can do in sixty seconds",
            "Die Anzahl Liegestuetze, die ein Aussenminister in sechzig Sekunden schafft",
            "Liczbę pompek, jaką minister spraw zagranicznych jest w stanie wykonać w minutę",
          ),
          correct: false,
        },
        {
          text: T(
            "The total weight of paper banknotes stored in the cargo hold of an airplane",
            "Das Gesamtgewicht aller im Frachtraum eines Flugzeugs transportierten Banknoten",
            "Łączną wagę banknotów papierowych przewożonych w luku bagażowym samolotu",
          ),
          correct: false,
        },
      ],
      hint: T(
        "Remember the Big Mac Index comparison.",
        "Erinnere dich an den Big-Mac-Vergleich zwischen New York und Tokio.",
        "Przypomnij sobie porównanie ceny Big Maca w Nowym Jorku i Tokio.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Evaluate the consequences of currency appreciation on consumers and producers.",
        "Bewerte die Folgen einer Waehrungsaufwertung fuer Verbraucher und Unternehmen.",
        "Oceń konsekwencje aprecjacji waluty dla konsumentów i przedsiębiorstw.",
      ),
      Widget: FxWidget,
      hint: T(
        "Focus on how purchasing power for imported goods rises while export price competitiveness abroad falls.",
        "Achte darauf, wie die Kaufkraft fuer Importe steigt, waehrend die preisliche Wettbewerbsfaehigkeit im Ausland sinkt.",
        "Zwróć uwagę na wzrost siły nabywczej wobec dóbr z importu przy jednoczesnym pogorszeniu konkurencyjności cenowej eksportu.",
      ),
    },
  ],
  askDad: T(
    "Ask your parent: Have they ever exchanged currency for an international vacation, and did they notice things feeling cheaper or more expensive than at home?",
    "Frage deine Eltern: Haben sie schon einmal Devisen fuer einen Auslandsurlaub getauscht und bemerkt, dass Dinge dort billiger oder teurer waren als zu Hause?",
    "Zapytaj rodziców: Czy wymieniali kiedyś walutę przed wyjazdem za granicę i czy odnieśli wrażenie, że ceny na miejscu były wyższe czy niższe niż w domu?",
  ),
  realLife: {
    title: T(
      "Real world: George Soros breaking the Bank of England in 1992 and the Swiss Franc peg uncoupling in 2015",
      "Echte Welt: George Soros wetten gegen das Pfund 1992 und das Ende der Franken-Bindung 2015",
      "Prawdziwy świat: George Soros i Czarna Środa w Banku Anglii (1992) oraz uwolnienie franka szwajcarskiego w 2015 r.",
    ),
    body: T(
      "On September 16, 1992 ('Black Wednesday'), investor George Soros recognized that the British Pound was artificially overvalued inside the European Exchange Rate Mechanism (ERM). His massive short position overwhelmed Bank of England currency reserves, forcing Britain to withdraw from the peg and let the Pound float freely. In January 2015, the Swiss National Bank similarly surprised global markets by abandoning its three-year peg to the Euro, causing the Swiss Franc to surge by 30% against the Euro in a single trading day.",
      "Am 16. September 1992 ('Schwarzer Mittwoch') erkannte George Soros, dass das britische Pfund im Europaeischen Waehrungssystem kuenstlich ueberbewertet war. Seine Spekulation zwang die Bank of England zur Freigabe des Wechselkurses. Im Januar 2015 verblueffte die Schweizerische Nationalbank die Weltmaerkte, als sie den Mindestkurs von 1,20 Franken je Euro aufhob, woraufhin der Franken an einem einzigen Tag um 30% emporschnellte.",
      "16 września 1992 roku ('Czarna Środa') George Soros dostrzegł, że funt brytyjski jest sztucznie przewartościowany w europejskim mechanizmie kursowym ERM. Jego spekulacja wyczerpała rezerwy Banku Anglii, zmuszając Wielką Brytanię do urynkowienia kursu funta. W styczniu 2015 roku Narodowy Bank Szwajcarii zaszokował rynki finansowe, rezygnując ze sztywnego kursu franka wobec euro, co doprowadziło do natychmiastowego skoku notowań franka o 30% w ciągu jednego dnia.",
    ),
  },
  factCard: {
    claims: [
      {
        text: T(
          "The Bank for International Settlements (BIS) Triennial Central Bank Survey recorded global foreign exchange market turnover of 7.5 trillion dollars per day in 2022.",
          "Die BIZ ermittelte 2022 einen taeglichen weltweiten Devisenumsatz von 7,5 Billionen US-Dollar.",
          "Bank Rozrachunków Międzynarodowych (BIS) w badaniu z 2022 roku oszacował dzienny obrót na rynku walutowym na 7,5 biliona dolarów.",
        ),
        source: "https://www.bis.org/statistics/rpfx22_fx.htm",
      },
      {
        text: T(
          "Gustav Cassel formally formulated the concept of Purchasing Power Parity (PPP) in 1918 to evaluate post-WWI equilibrium exchange rates.",
          "Gustav Cassel begruendete 1918 das Konzept der Kaufkraftparitaet zur Bestimmung von Gleichgewichtskursen nach dem Ersten Weltkrieg.",
          "Gustav Cassel sformułował w 1918 roku teorię parytetu siły nabywczej (PPP) do oceny równowagi kursowej po I wojnie światowej.",
        ),
        source: "https://www.jstor.org/stable/2222623",
      },
      {
        text: T(
          "The Economist magazine created the Big Mac Index in September 1986 as a lighthearted guide to whether global currencies are at their correct PPP level.",
          "Das Magazin The Economist erfand 1986 den Big-Mac-Index als anschaulichen Massstab fuer Kaufkraftparitaet.",
          "Tygodnik The Economist stworzył w 1986 roku Indeks Big Maca jako przystępny miernik wyceny walut w oparciu o parytet siły nabywczej.",
        ),
        source: "https://www.economist.com/big-mac-index",
      },
      {
        text: T(
          "The Plaza Accord of September 1985 saw the G5 nations (US, UK, France, Germany, Japan) agree to coordinate the depreciation of an overvalued US dollar.",
          "Im Plaza-Abkommen von 1985 einigten sich fuenf fuehrende Wirtschaftsnationen auf eine kontrollierte Abwertung des ueberbewerteten US-Dollars.",
          "Porozumienie z Plaza (1985) doprowadziło do skoordynowanej przez kraje G5 deprecjacji przewartościowanego dolara amerykańskiego.",
        ),
        source: "https://www.federalreservehistory.org/essays/plaza-accord",
      },
      {
        text: T(
          "Milton Friedman published 'The Case for Flexible Exchange Rates' in 1953, arguing floating rates act as an automatic shock absorber against international imbalances.",
          "Milton Friedman plaedierte 1953 fuer flexible Wechselkurse als automatische Puffer gegen weltwirtschaftliche Schocks.",
          "Milton Friedman w 1953 roku opublikował esej postulujący płynne kursy walutowe jako automatyczny amortyzator wstrząsów gospodarczych.",
        ),
        source: "https://www.jstor.org/stable/2550130",
      },
    ],
    simplified: [
      T(
        "Complex uncovered interest parity equations and multi-currency cross-rate matrixes are distilled into intuitive airport kiosk exchange boards and export-import balancing scales.",
        "Komplexe Zinsparitaeten und Kreuzkursmatrizen wurden durch Flughafen-Anzeigetafeln und Import-Export-Waagen verstaendlich gemacht.",
        "Złożone zależności parytetu stóp procentowych i macierze kursów krzyżowych wyjaśniono za pomocą lotniskowej tablicy wymiany walut i wagi równoważącej eksport z importem.",
      ),
    ],
  },
};
