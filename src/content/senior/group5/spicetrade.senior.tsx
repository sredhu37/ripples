import { useState } from "react";
import { animatedBeat } from "../../../lesson/toolkit";
import type { DiagramProps, Lesson, Text, ToyProps, WidgetProps } from "../../../lesson/types";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function SpiceTradeVoyageDiagram({ lang, step }: DiagramProps) {
  const anjaliName = lang === "pl" ? "Alicja" : lang === "de" ? "Anna" : "Anjali";
  const label =
    lang === "pl"
      ? "Alicja bada morską wyprawę VOC i szlak korzenny do Moluków"
      : lang === "de"
        ? "Anna erforscht die VOC-Gewuerzroute zu den Gewuerzinseln"
        : "Anjali charting the VOC maritime spice route to the Moluccas";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect
        x="10"
        y="10"
        width="380"
        height="220"
        rx="14"
        fill="#0f172a"
        stroke="#0ea5e9"
        strokeWidth="2"
      />
      <g>
        <circle cx="80" cy="110" r="28" fill="#f3cfa6" stroke="#0ea5e9" strokeWidth="2" />
        <path d="M 52 105 C 52 70 108 70 108 105" fill="#0369a1" />
        <circle cx="72" cy="107" r="2.5" fill="#0f172a" />
        <circle cx="88" cy="107" r="2.5" fill="#0f172a" />
        <path d="M 76 119 Q 80 125 84 119" stroke="#0f172a" strokeWidth="2" fill="none" />
        <path
          d="M 56 185 L 62 140 Q 80 135 98 140 L 104 185 Z"
          fill="#0284c7"
          stroke="#0ea5e9"
          strokeWidth="2"
        />
        <text x="80" y="205" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#bae6fd">
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
          stroke="#0ea5e9"
          strokeWidth="1.5"
        />
        <text x="250" y="55" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#e0f2fe">
          ⛵{" "}
          {lang === "pl"
            ? "VOC: Pierwsza Spółka Akcyjna (1602)"
            : lang === "de"
              ? "Die VOC: Erste Aktiengesellschaft"
              : "The VOC: First Joint-Stock Corporation"}
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
            stroke="#0284c7"
            strokeWidth="1.5"
          />
          <text x="250" y="102" textAnchor="middle" fontSize="16">
            📜 🌶️ 📈
          </text>
          <text x="250" y="122" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#38bdf8">
            {lang === "pl"
              ? "Akcje giełdowe • Monopol na gałkę i goździki"
              : lang === "de"
                ? "Handelbare Aktien • Monopol auf Muskat"
                : "Tradable Shares • Nutmeg & Clove Monopoly"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="135" y="145" width="230" height="60" rx="8" fill="#0369a1" />
          <text
            x="250"
            y="170"
            textAnchor="middle"
            fontSize="11.5"
            fontWeight="bold"
            fill="#ffffff"
          >
            {lang === "pl"
              ? "Kapitał rozproszony na giełdzie w Amsterdamie"
              : lang === "de"
                ? "Risikoteilung an der Boerse Amsterdam"
                : "Risk pooling on the Amsterdam Stock Exchange"}
          </text>
          <text x="250" y="190" textAnchor="middle" fontSize="10" fill="#bae6fd">
            {lang === "pl"
              ? "Tysiące obywateli sfinansowało ryzykowne rejsy"
              : lang === "de"
                ? "Tausende Buerger finanzierten grosse Flotten"
                : "Thousands of citizens funded massive ocean fleets"}
          </text>
        </g>
      )}
    </svg>
  );
}

function JointStockMechanismDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Mechanizm spółki akcyjnej: ograniczenie ryzyka katastrofy morskiej"
      : lang === "de"
        ? "Funktionsweise der Aktiengesellschaft: Risikobeschraenkung bei Schiffbruch"
        : "The joint-stock structure: shielding individuals from shipwreck ruin";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect
        x="10"
        y="10"
        width="380"
        height="220"
        rx="14"
        fill="#f0f9ff"
        stroke="#0284c7"
        strokeWidth="2"
      />
      <g>
        <circle cx="90" cy="100" r="32" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
        <text x="90" y="95" textAnchor="middle" fontSize="18">
          🧑‍🤝‍🧑
        </text>
        <text x="90" y="115" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#0369a1">
          Public Investors
        </text>

        <rect x="230" y="70" width="130" height="60" rx="8" fill="#0284c7" />
        <text x="295" y="95" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#ffffff">
          VOC Fleet Fund
        </text>
        <text x="295" y="115" textAnchor="middle" fontSize="8.5" fill="#e0f2fe">
          Diversified over 20 ships
        </text>

        <line
          x1="125"
          y1="100"
          x2="225"
          y2="100"
          stroke="#0284c7"
          strokeWidth="2.5"
          strokeDasharray="4 2"
        />
      </g>
      {step >= 2 && (
        <g>
          <rect x="40" y="150" width="320" height="42" rx="6" fill="#1e293b" />
          <text x="200" y="168" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#38bdf8">
            Before VOC: A single sinking ship meant instant personal bankruptcy
          </text>
          <text x="200" y="182" textAnchor="middle" fontSize="8.5" fill="#cbd5e1">
            {lang === "pl"
              ? "Z akcjami strata jednego statku była amortyzowana przez całą flotę"
              : lang === "de"
                ? "Mit Aktien verteilte sich der Verlust eines Schiffs auf viele"
                : "With tradable shares, individual risk was capped while upside was huge"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="200" width="320" height="26" rx="6" fill="#0369a1" />
          <text x="200" y="217" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl"
              ? "Płynna giełda w Amsterdamie umożliwiła handel udziałami w każdej chwili"
              : lang === "de"
                ? "Die Amsterdamer Boerse ermoeglichte jederzeitigen Anteilsverkauf"
                : "Liquid secondary markets allowed investors to buy or sell stakes anytime"}
          </text>
        </g>
      )}
    </svg>
  );
}

function CoerciveMonopolyDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Ciemna strona monopolu: przemoc, fortyfikacje i rzeź wysp Banda"
      : lang === "de"
        ? "Schattenseiten des Monopols: Militaergewalt und die Banda-Inseln"
        : "Dark side of monopoly: corporate warfare and the Banda islands tragedy";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect
        x="10"
        y="10"
        width="380"
        height="220"
        rx="14"
        fill="#fff1f2"
        stroke="#e11d48"
        strokeWidth="2"
      />
      <g>
        <rect
          x="50"
          y="50"
          width="120"
          height="65"
          rx="6"
          fill="#fee2e2"
          stroke="#dc2626"
          strokeWidth="1.5"
        />
        <text x="110" y="75" textAnchor="middle" fontSize="16">
          ⚔️ 💥
        </text>
        <text x="110" y="95" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#991b1b">
          Armed Force
        </text>
        <text x="110" y="108" textAnchor="middle" fontSize="7.5" fill="#7f1d1d">
          Private mercenaries
        </text>

        <rect
          x="230"
          y="50"
          width="120"
          height="65"
          rx="6"
          fill="#fef2f2"
          stroke="#dc2626"
          strokeWidth="1.5"
        />
        <text x="290" y="75" textAnchor="middle" fontSize="16">
          🔒 🏷️
        </text>
        <text x="290" y="95" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#991b1b">
          Enforced Monopoly
        </text>
        <text x="290" y="108" textAnchor="middle" fontSize="7.5" fill="#7f1d1d">
          Crushing local farmers
        </text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="40" y="135" width="320" height="44" rx="6" fill="#881337" />
          <text x="200" y="153" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#ffffff">
            Monopolies protected by violence distort free trade into tyranny
          </text>
          <text x="200" y="168" textAnchor="middle" fontSize="8" fill="#fecdd3">
            {lang === "pl"
              ? "Gubernator Coen brutalnie zmasakrował ludność wysp Banda w 1621 r."
              : lang === "de"
                ? "Gouverneur Coen unterwarf 1621 die Bevoelkerung der Banda-Inseln gewaltsam"
                : "In 1621 Governor Coen brutally purged Banda islanders to fix world nutmeg supply"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="195" width="320" height="26" rx="6" fill="#1e293b" />
          <text x="200" y="212" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#f8fafc">
            {lang === "pl"
              ? "Gdy korporacja łączy handel z prywatną armią, rynek zamienia się w ucisk"
              : lang === "de"
                ? "Verschmelzen Firmen mit Waffenmacht, stirbt der ehrliche Markt"
                : "Corporate powers armed with sovereign military charters distort honest commerce"}
          </text>
        </g>
      )}
    </svg>
  );
}

function SpicesPriceVolatilityDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Ceny gałki muszkatołowej w Europie a sztuczne niszczenie zapasów"
      : lang === "de"
        ? "Muskatpreise in Europa und kuenstliche Verbrennung von Bestaenden"
        : "Nutmeg prices in Europe and artificial burning of excess inventory";

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
          x="60"
          y="50"
          width="100"
          height="70"
          rx="6"
          fill="#eff6ff"
          stroke="#2563eb"
          strokeWidth="1.5"
        />
        <text x="110" y="75" textAnchor="middle" fontSize="18">
          🔥 📦
        </text>
        <text x="110" y="95" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#1e40af">
          Burning Spices
        </text>
        <text x="110" y="108" textAnchor="middle" fontSize="7" fill="#1d4ed8">
          Artificial scarcity
        </text>

        <rect
          x="240"
          y="50"
          width="100"
          height="70"
          rx="6"
          fill="#ecfdf5"
          stroke="#059669"
          strokeWidth="1.5"
        />
        <text x="290" y="75" textAnchor="middle" fontSize="18">
          📈 💰
        </text>
        <text x="290" y="95" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#065f46">
          High Monopoly Price
        </text>
        <text x="290" y="108" textAnchor="middle" fontSize="7" fill="#047857">
          1000% profit margin
        </text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="40" y="135" width="320" height="42" rx="6" fill="#1e293b" />
          <text x="200" y="153" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#f8fafc">
            VOC warehouses burned excess nutmeg harvests to prevent price collapse
          </text>
          <text x="200" y="168" textAnchor="middle" fontSize="8" fill="#94a3b8">
            {lang === "pl"
              ? "Zamiast obniżyć ceny dla konsumentów, woleli niszczyć cenne zbiory"
              : lang === "de"
                ? "Statt Preise zu senken, verbrannten sie Tonnen an Ernten"
                : "Instead of allowing prices to fall, they deliberately destroyed supply"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="195" width="320" height="26" rx="6" fill="#0f766e" />
          <text x="200" y="212" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl"
              ? "Brak konkurencji zawsze prowadzi do marnotrawstwa i sztucznej drożyzny"
              : lang === "de"
                ? "Fehlender Wettbewerb fuehrt stets zu Vergeudung und Monopolpreisen"
                : "Absence of market competition always breeds waste and extortionate prices"}
          </text>
        </g>
      )}
    </svg>
  );
}

function FinancialInnovationLegacyDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Spuścizna finansowa: narodziny nowoczesnych rynków kapitałowych"
      : lang === "de"
        ? "Das finanzielle Erbe: Entstehung moderner Kapitalmaerkte"
        : "Financial innovation legacy: the genesis of modern capital markets";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect
        x="10"
        y="10"
        width="380"
        height="220"
        rx="14"
        fill="#f8fafc"
        stroke="#475569"
        strokeWidth="2"
      />
      <g>
        <circle cx="200" cy="80" r="34" fill="#e2e8f0" stroke="#475569" strokeWidth="2" />
        <text x="200" y="75" textAnchor="middle" fontSize="18">
          🏛️ 📊
        </text>
        <text x="200" y="95" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#334155">
          Capitalism Roots
        </text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="40" y="130" width="320" height="46" rx="6" fill="#1e293b" />
          <text x="200" y="148" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#38bdf8">
            Joint-stock corporate charters unlocked unprecedented civil engineering and scale
          </text>
          <text x="200" y="163" textAnchor="middle" fontSize="8" fill="#94a3b8">
            {lang === "pl"
              ? "Nowoczesne firmy, linie kolejowe i rakiety kosmiczne korzystają z tego modelu"
              : lang === "de"
                ? "Eisenbahnen, Tech-Konzerne und Raumfahrt nutzen heute dasselbe Prinzip"
                : "Railroads, modern tech firms, and infrastructure projects still utilize this funding tool"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="195" width="320" height="26" rx="6" fill="#0284c7" />
          <text x="200" y="212" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl"
              ? "Konieczność oddzielenia państwowej siły zbrojnej od prywatnych monopoli"
              : lang === "de"
                ? "Trennung von militaerischer Staatsgewalt und privaten Firmeninteressen"
                : "The historical imperative to separate military force from private corporate ambition"}
          </text>
        </g>
      )}
    </svg>
  );
}

function Toy({ onDone }: ToyProps) {
  const [sharesIssued, setSharesIssued] = useState(100);
  const [fleetSize, setFleetSize] = useState(10);
  const capitalRaised = sharesIssued * 50;
  const riskPerShare = Math.round(1000 / sharesIssued);
  const isHealthy = sharesIssued >= 200 && fleetSize >= 15;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "center" }}>
      <p style={{ margin: 0, fontWeight: 700, fontSize: "1rem" }}>
        Shares: {sharesIssued} | Fleet: {fleetSize} Ships | Capital: {capitalRaised} Florins |
        Risk/Share: {riskPerShare}%
      </p>
      <div style={{ display: "flex", gap: "8px" }}>
        <button
          type="button"
          className="btn"
          onClick={() => {
            setSharesIssued(300);
            setFleetSize(20);
            onDone?.();
          }}
        >
          Issue Broad Public Shares (300)
        </button>
        <button
          type="button"
          className="btn btn-quiet"
          onClick={() => {
            setSharesIssued(20);
            setFleetSize(4);
          }}
        >
          Concentrated Few Partners (High Risk)
        </button>
      </div>
      <div
        style={{
          padding: "12px",
          background: isHealthy ? "#eef8ef" : "#fef2f2",
          borderRadius: "10px",
          width: "100%",
          textAlign: "center",
        }}
      >
        {isHealthy
          ? "Broad Joint-Stock Success: Risk is widely dispersed across thousands of shareholders while raising vast capital to equip a massive trading fleet!"
          : "Fragile Partnership: Sinking one ship inflicts financial ruin upon the handful of exposed partners."}
      </div>
    </div>
  );
}

function SpiceTradeWidget({ onAnswer }: WidgetProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
      <p style={{ margin: 0 }}>
        What revolutionary financial mechanism made the Dutch East India Company (VOC) able to
        mobilize unprecedented capital in 1602?
      </p>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>
        They required sailors to pay for the privilege of scrubbing wooden ship decks
      </button>
      <button type="button" className="btn" onClick={() => onAnswer(true)}>
        It issued publicly tradable fractional shares of stock with limited liability, allowing
        thousands of ordinary citizens to pool capital and spread maritime risk
      </button>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>
        Dutch tulip petals were melted into liquid fuel to propel sailing ships faster
      </button>
    </div>
  );
}

export const lesson: Lesson = {
  id: "spicetrade",
  story: [
    animatedBeat(
      [
        T(
          "Meet Anjali. She explores a museum displaying nutmeg, cloves, and centuries-old parchment stock certificates.",
          "Das ist Anna. Sie besucht ein Museum mit getrocknetem Muskat, Gewuerznelken und uralten handgeschriebenen Aktienzertifikaten.",
          "Poznaj Alicję. Odwiedza muzeum pełne suszonej gałki muszkatołowej, goździków i kilkusetletnich pergaminowych certyfikatów giełdowych.",
        ),
        T(
          "In the early 1600s, culinary spices like nutmeg and black pepper fetched astronomical prices in cold European cities.",
          "Um 1600 erzielten Muskatnuss und Pfeffer in den kalten Staedten Europas astronomische Preise.",
          "Na początku XVII wieku korzenne przyprawy, takie jak gałka muszkatołowa i czarny pieprz, osiągały w Europie astronomiczne ceny.",
        ),
        T(
          "Yet undertaking a 20,000-kilometer round-trip sea voyage to the Indonesian Spice Islands took up to three years and was fraught with shipwrecks and storms.",
          "Doch die 20.000 Kilometer lange Schiffsreise nach Indonesien dauerte Jahre und endete oft in Sturm und Schiffbruch.",
          "Jednak podróż morska do indonezyjskich Wysp Korzennych liczyła 20 tysięcy kilometrów, trwała do trzech lat i niosła ogromne ryzyko katastrofy morskiej.",
        ),
      ],
      SpiceTradeVoyageDiagram,
    ),
    animatedBeat(
      [
        T(
          "Before 1602, single merchants funded single ships; if their vessel sank, the merchant faced immediate debt prison.",
          "Vor 1602 finanzierte ein Kaufmann ein einzelnes Schiff; sank es, drohte der sofortige Schuldturm.",
          "Przed 1602 r. pojedynczy kupiec finansował jeden statek; jeśli ten poszedł na dno, kupcowi groziło natychmiastowe bankructwo.",
        ),
        T(
          "To solve this vulnerability, the Dutch established the *Vereenigde Oostindische Compagnie* (VOC), creating the world's first public joint-stock company.",
          "Die Niederlaender loesten das Problem mit der VOC: Sie erfanden die weltweit erste oeffentliche Aktiengesellschaft.",
          "Aby rozwiązać ten problem, Holendrzy utworzyli Zjednoczoną Kompanię Wschodnioindyjską (VOC), tworząc pierwszą publiczną spółkę akcyjną na świecie.",
        ),
        T(
          "Instead of a few wealthy oligarchs, thousands of everyday citizens in Amsterdam bought fractional shares, pooling risk and creating a permanent capital pool.",
          "Tausende Buerger kauften Aktienanteile an der Amsterdamer Boerse, streuten das Risiko und schufen enormes Dauerkapital.",
          "Zamiast kilku bogaczy tysiące zwykłych mieszkańców Amsterdamu kupiło udziały na giełdzie, rozpraszając ryzyko i tworząc trwały kapitał zakładowy.",
        ),
      ],
      JointStockMechanismDiagram,
    ),
    animatedBeat(
      [
        T(
          "Armed with immense capital, the VOC built heavily armed naval fleets and was granted a royal charter to wage war and sign treaties.",
          "Mit diesem Riesenkapital baute die VOC Kriegsschiffe und erhielt das staatliche Recht, eigene Kriege zu fuehren.",
          "Dysponując gigantycznym kapitałem, VOC budowała uzbrojoną flotę i otrzymała od rządu prawo do wypowiadania wojen i zawierania traktatów.",
        ),
        T(
          "This corporate power had a dark, violent side: in 1621, Governor-General Jan Pieterszoon Coen subjugated the Banda Islands.",
          "Diese Firmenmacht zeigte grausame Haerte: 1621 unterwarf Generalgouverneur Coen die Banda-Inseln mit roher Gewalt.",
          "Ta potęga miała swoje krwawe oblicze: w 1621 r. gubernator generalny Jan Pieterszoon Coen brutalnie spacyfikował wyspy Banda.",
        ),
        T(
          "To secure a global monopoly on nutmeg, the VOC executed or expelled almost the entire native population, replacing them with company-owned plantations.",
          "Um das weltweite Muskat-Monopol zu erzwingen, wurde die einheimische Bevoelkerung fast voellig vertrieben oder getoetet.",
          "Aby wymusić światowy monopol na gałkę muszkatołową, niemal cała rdzenna ludność została wymordowana lub wygnana, a wyspy zamieniono w plantacje.",
        ),
      ],
      CoerciveMonopolyDiagram,
    ),
    animatedBeat(
      [
        T(
          "Having captured monopoly control over production, the VOC zealously guarded high prices in European markets.",
          "Nachdem sie das Monopol besass, manipulierte die VOC die Preise in den europaeischen Maerkten.",
          "Po zdobyciu monopolu VOC bezwzględnie kontrolowała wysokie ceny na rynkach europejskich.",
        ),
        T(
          "When harvests were overly abundant, company directors routinely ordered tons of spices burned at port warehouses to engineer artificial scarcity.",
          "Bei Rekordernten liessen die Direktoren Saecke voller Gewuerze oeffentlich verbrennen, um kuenstliche Knappheit zu erzeugen.",
          "Gdy zbiory były zbyt obfite, dyrektorzy zarządzali palenie ton przypraw w magazynach portowych, by utrzymać sztuczną drożyznę.",
        ),
        T(
          "Monopolies suppress fair competition, transfer wealth upward, and destroy economic efficiency through artificial output restrictions.",
          "Monopole ersticken Wettbewerb, verteuern Gueter kuenstlich und vernichten Werte durch erzwungene Verknappung.",
          "Monopole dławią uczciwą konkurencję, drenują kieszenie konsumentów i niszczą efektywność poprzez sztuczne ograniczanie podaży.",
        ),
      ],
      SpicesPriceVolatilityDiagram,
    ),
    animatedBeat(
      [
        T(
          "The rise and fall of the spice monopolies taught civilization enduring economic and institutional lessons.",
          "Der Aufstieg und Fall der Gewuerzmonopole hinterliess grundlegende institutionelle Lehren.",
          "Historia monopoli handlu przyprawami dała cywilizacji fundamentalne lekcje gospodarcze i instytucjonalne.",
        ),
        T(
          "The invention of tradable equity, stock exchanges, and fractional ownership revolutionized human capacity to finance large-scale ventures.",
          "Die Erfindung handelbarer Aktien und der Boerse ermoeglichte erstmals gewaltige globale Infrastrukturprojekte.",
          "Wynalezienie zbywalnych akcji giełdowych, giełd papierów wartościowych i ograniczonej odpowiedzialności zrewolucjonizowało finansowanie wielkich projektów.",
        ),
        T(
          "Simultaneously, history proved that corporate entities must never be permitted to command private armies or wield unconstrained state power.",
          "Gleichzeitig zeigte sich: Firmen duerfen niemals eigene Privatarmeen fuehren oder staatliche Hoheitsgewalt missbrauchen.",
          "Jednocześnie historia dowiodła, że prywatnym korporacjom nigdy nie wolno powierzać armii ani niekontrolowanej władzy państwowej.",
        ),
      ],
      FinancialInnovationLegacyDiagram,
    ),
  ],
  toyIntro: T(
    "Simulate the 1602 VOC share issuance: distribute equity shares to finance an overseas spice fleet while dispersing catastrophic maritime risk.",
    "Simuliere die VOC-Aktienemission von 1602: Gib Anteile aus, um eine Gewuerzflotte zu finanzieren und das Schiffbruchrisiko breit zu streuen.",
    "Zasymuluj emisję akcji VOC z 1602 r.: emituj udziały giełdowe, aby sfinansować flotę handlową i bezpiecznie rozproszyć ryzyko morskie.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "Why was the creation of the joint-stock corporation in 1602 such a pivotal breakthrough in financial history?",
        "Warum war die Erfindung der Aktiengesellschaft 1602 ein epochaler Durchbruch der Finanzgeschichte?",
        "Dlaczego powstanie spółki akcyjnej w 1602 roku było epokowym przełomem w historii finansów?",
      ),
      options: [
        {
          text: T(
            "Because it enabled thousands of diverse investors to pool capital and trade fractional shares, spreading high catastrophic risk without risking personal bankruptcy",
            "Weil sie tausenden Anlegern erlaubte, Kapital zu buendeln und Anteile frei zu handeln, wodurch existenzbedrohende Risiken gestreut wurden",
            "Ponieważ umożliwiła tysiącom inwestorów połączenie kapitału i wolny obrót akcjami, skutecznie rozpraszając ryzyko katastrofy morskiej bez groźby osobistego bankructwa",
          ),
          correct: true,
        },
        {
          text: T(
            "Because it made wooden ship planks taste like freshly baked Dutch waffles",
            "Weil Schiffsbohlen dadurch nach frisch gebackenen Stroopwafels schmeckten",
            "Ponieważ sprawiła, że drewniane deski okrętowe smakowały jak świeże holenderskie gofry",
          ),
          correct: false,
        },
        {
          text: T(
            "Because the King of Spain personally signed every single spice barrel with a quill",
            "Weil der spanische Koenig jedes Gewuerzfass persoenlich mit Tinte signierte",
            "Ponieważ król Hiszpanii osobiście podpisywał gęsim piórem każdą beczkę z pieprzem",
          ),
          correct: false,
        },
      ],
      hint: T(
        "Focus on risk diversification, fractional public investment, and the Amsterdam Stock Exchange.",
        "Achte auf Risikoteilung, oeffentliche Kapitalbeteiligung und die Boerse Amsterdam.",
        "Zwróć uwagę na rozproszenie ryzyka, publiczny handel akcjami i giełdę papierów wartościowych.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "Why did the VOC periodically burn massive warehouse supplies of nutmeg and cloves in Amsterdam?",
        "Warum verbrannte die VOC regelmaessig tonnenweise Muskat und Nelken in Lagerhaeusern?",
        "Dlaczego VOC regularnie paliła w magazynach portowych całe tony gałki muszkatołowej i goździków?",
      ),
      options: [
        {
          text: T(
            "To enforce artificial scarcity in the market and prevent bumper crops from lowering retail prices and profit margins",
            "Um ein kuenstliches Angebot herbeizufuehren und zu verhindern, dass gute Ernten die Monopolpreise senkten",
            "Aby wywołać sztuczny niedobór na rynku i nie dopuścić do spadku wysokich cen monopolowych przy obfitych zbiorach",
          ),
          correct: true,
        },
        {
          text: T(
            "Because the warehouse heating furnaces ran exclusively on fragrant holiday spices",
            "Weil die Lagerhaus-Heizung im Winter ausschliesslich mit Zimt und Nelken geheizt werden durfte",
            "Ponieważ piecyki w magazynach wolno było opalać wyłącznie pachnącymi przyprawami",
          ),
          correct: false,
        },
        {
          text: T(
            "To ward off invading swarms of mythical flying sea serpents",
            "Um Schwaerme von fliegenden Seeschlangen mit Rauchwolken zu vertreiben",
            "Aby odstraszyć chmary mitycznych latających węży morskich",
          ),
          correct: false,
        },
      ],
      hint: T(
        "Think about supply and demand dynamics under strict monopoly control.",
        "Denke an Angebot und Nachfrage bei absolutem Monopolbesitz.",
        "Pomyśl o mechanizmie podaży i popytu w warunkach pełnego monopolu rynkowego.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Examine the core financial innovation behind the Dutch East India Company (VOC).",
        "Untersuche die fundamentale finanzielle Neuerung hinter der niederlaendischen VOC.",
        "Zbadaj fundamentalną innowację finansową leżącą u podstaw sukcesu VOC.",
      ),
      Widget: SpiceTradeWidget,
      hint: T(
        "Consider how public share offerings transformed capital raising and personal risk.",
        "Beachte, wie oeffentliche Aktienemissionen die Kapitalbeschaffung revolutionierten.",
        "Zwróć uwagę na to, jak publiczna emisja udziałów zrewolucjonizowała pozyskiwanie kapitału.",
      ),
    },
  ],
  askDad: T(
    "Ask your parent: Did you know that the modern stock market where people buy shares of Apple or Microsoft began over 400 years ago in Amsterdam with the spice trade?",
    "Frage deine Eltern: Wusstet ihr, dass der moderne Aktienmarkt, an dem man Anteile an Firmen kauft, vor ueber 400 Jahren in Amsterdam mit dem Gewuerzhandel begann?",
    "Zapytaj rodziców: Czy wiedzieliście, że współczesna giełda papierów wartościowych narodziła się ponad 400 lat temu w Amsterdamie w handlu przyprawami?",
  ),
  realLife: {
    title: T(
      "Real world: The birth of the Amsterdam Stock Exchange (Beurs van Berlage)",
      "Echte Welt: Die Geburt der Amsterdamer Boerse im Jahr 1602",
      "Prawdziwy świat: Narodziny giełdy w Amsterdamie w 1602 roku",
    ),
    body: T(
      "In 1602, the VOC became the world's first publicly traded company when it invited Dutch citizens from all walks of life, from rich merchants to domestic maids, to purchase shares. The Amsterdam Stock Exchange was founded specifically to allow investors to trade these VOC shares on a secondary market. At its height during the 1630s, the VOC's market valuation reached the equivalent of over 7 trillion modern US dollars, making it the most valuable corporation in recorded history.",
      "1602 wurde die VOC das erste boersennotierte Unternehmen der Welt: Buerger jeder Schicht konnten Aktien zeichnen. Die Amsterdamer Boerse entstand eigens fuer den Handel mit VOC-Papieren. Auf ihrem Hoehepunkt in den 1630er-Jahren erreichte die VOC einen inflationsbereinigten Marktwert von ueber 7 Billionen US-Dollar und gilt als wertvollster Konzern der Geschichte.",
      "W 1602 r. VOC stała się pierwszą spółką publiczną na świecie, umożliwiając zakup akcji każdemu obywatelowi. Giełdę w Amsterdamie założono specjalnie z myślą o obrocie akcjami VOC na rynku wtórnym. W szczytowym momencie w latach 30. XVII w. rynkowa wycena VOC osiągnęła równowartość ponad 7 bilionów współczesnych dolarów, co czyni ją najcenniejszą korporacją w dziejach ludzkości.",
    ),
  },
  factCard: {
    claims: [
      {
        text: T(
          "The VOC was chartered by the States-General of the Netherlands on March 20, 1602, establishing the world's first permanent corporate capital base.",
          "Die niederlaendischen Generalstaaten erteilten der VOC am 20. Maerz 1602 ihre historische Gruendungsurkunde.",
          "Stany Generalne Niderlandów nadały VOC statut 20 marca 1602 r., tworząc pierwszy w historii stały kapitał zakładowy spółki.",
        ),
        source: "https://www.nationaalarchief.nl/en/explore/history-of-the-netherlands/voc",
      },
      {
        text: T(
          "Lodewijk Petram's study 'The World's First Stock Exchange' (2014) documented that over 1,100 investors subscribed to the initial Amsterdam share offering.",
          "Lodewijk Petram belegte 2014, dass ueber 1.100 Buerger an der ersten VOC-Aktienzeichnung teilnahmen.",
          "Lodewijk Petram w książce z 2014 r. udokumentował, że ponad 1100 inwestorów zapisało się na pierwszą emisję akcji VOC w Amsterdamie.",
        ),
        source: "https://cup.columbia.edu/book/the-worlds-first-stock-exchange/9780231163781",
      },
      {
        text: T(
          "Economic historian Ron Harris (2020) analyzed how VOC institutional features, such as legal personality and entity shielding, solved the collective action problem.",
          "Ron Harris analysierte 2020, wie die juristische Persoenlichkeit der VOC das Problem kollektiven Handelns loeste.",
          "Historyk prawa i ekonomii Ron Harris (2020) przeanalizował, jak odrębna osobowość prawna VOC uchroniła kapitał przed roszczeniami osobistymi wierzycieli wspólników.",
        ),
        source:
          "https://www.cambridge.org/core/books/going-the-distance/D3EBBC8F2964998781745E67DCDD0958",
      },
      {
        text: T(
          "Vincent Houben and Peter Carey (2001) chronicled the 1621 Banda massacre conducted under Governor-General Jan Pieterszoon Coen to secure the nutmeg monopoly.",
          "Houben und Carey dokumentierten das Massaker von 1621 auf den Banda-Inseln zur Durchsetzung des Muskat-Monopols.",
          "Vincent Houben i Peter Carey (2001) opisali pacyfikację wysp Banda z 1621 r. przeprowadzoną przez VOC w celu narzucenia monopolu na gałkę muszkatołową.",
        ),
        source: "https://www.jstor.org/stable/20779929",
      },
      {
        text: T(
          "The Amsterdam Stock Exchange (Beurs van Hendrik de Keyser) commenced operations in 1611 as the world's first purpose-built secondary equity market.",
          "Die Amsterdamer Boerse nahm 1611 ihren Betrieb als erste spezialisierte Wertpapierboerse der Welt auf.",
          "Giełda w Amsterdamie rozpoczęła działalność w specjalnie wzniesionym budynku w 1611 r. jako pierwszy rynek wtórny akcji.",
        ),
        source: "https://www.amsterdam.nl/en/culture-leisure/monuments/beurs-van-berlage/",
      },
    ],
    simplified: [
      T(
        "Complex early-modern maritime insurance actuarial schedules and corporate governance charters are translated into interactive risk-pooling toys and clear monopoly-critique narratives.",
        "Komplexe maritime Versicherungstabellen und historische Unternehmensstatuten wurden in interaktive Risikostreuungs-Spiele und verstaendliche Monopolanalysen uebersetzt.",
        "Skomplikowane dawne tabele aktuarialne ubezpieczeń morskich i statuty korporacyjne przedstawiono w formie czytelnych symulacji rozproszenia ryzyka i analizy monopolu rynkowego.",
      ),
    ],
  },
};
