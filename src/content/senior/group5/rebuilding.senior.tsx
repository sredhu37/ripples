import { useState } from "react";
import { animatedBeat } from "../../../lesson/toolkit";
import type { DiagramProps, Lesson, Text, ToyProps, WidgetProps } from "../../../lesson/types";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function RebuildingMarshallPlanDiagram({ lang, step }: DiagramProps) {
  const karanName = lang === "pl" ? "Kamil" : lang === "de" ? "Klaus" : "Karan";
  const label =
    lang === "pl"
      ? "Kamil bada powojenną odbudowę: Plan Marshalla, cud gospodarczy i integrację europejską"
      : lang === "de"
        ? "Klaus analysiert den Wiederaufbau: Marshallplan, Wirtschaftswunder und europaeische Einigung"
        : "Karan examining postwar reconstruction: the Marshall Plan, economic miracles, and European integration";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect
        x="10"
        y="10"
        width="380"
        height="220"
        rx="14"
        fill="#0f172a"
        stroke="#10b981"
        strokeWidth="2"
      />
      <g>
        <circle cx="80" cy="110" r="28" fill="#f3cfa6" stroke="#10b981" strokeWidth="2" />
        <path d="M 52 105 C 52 70 108 70 108 105" fill="#065f46" />
        <circle cx="72" cy="107" r="2.5" fill="#0f172a" />
        <circle cx="88" cy="107" r="2.5" fill="#0f172a" />
        <path d="M 76 119 Q 80 125 84 119" stroke="#0f172a" strokeWidth="2" fill="none" />
        <path
          d="M 56 185 L 62 140 Q 80 135 98 140 L 104 185 Z"
          fill="#059669"
          stroke="#10b981"
          strokeWidth="2"
        />
        <text x="80" y="205" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#a7f3d0">
          {karanName}
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
          stroke="#10b981"
          strokeWidth="1.5"
        />
        <text x="250" y="55" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#d1fae5">
          🏗️{" "}
          {lang === "pl"
            ? "Odbudowa Europy i Plan Marshalla"
            : lang === "de"
              ? "Europas Wiederaufbau & Marshallplan"
              : "Rebuilding Europe: The Marshall Plan"}
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
            stroke="#059669"
            strokeWidth="1.5"
          />
          <text x="250" y="102" textAnchor="middle" fontSize="16">
            💵 🚜 🇪🇺
          </text>
          <text x="250" y="122" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#34d399">
            {lang === "pl"
              ? "13 mld USD • Węgiel, Stal i Wspólny Rynek"
              : lang === "de"
                ? "13 Mrd. USD • Kohle, Stahl & Markt"
                : "$13B Aid • Coal, Steel & Common Market"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="135" y="145" width="230" height="60" rx="8" fill="#065f46" />
          <text
            x="250"
            y="170"
            textAnchor="middle"
            fontSize="11.5"
            fontWeight="bold"
            fill="#ffffff"
          >
            {lang === "pl"
              ? "Od zniszczeń do cudu gospodarczego"
              : lang === "de"
                ? "Vom Truemmerfeld zum Wirtschaftswunder"
                : "From rubble to economic miracle"}
          </text>
          <text x="250" y="190" textAnchor="middle" fontSize="10" fill="#a7f3d0">
            {lang === "pl"
              ? "Gospodarka rynkowa i integracja pokonały biedę"
              : lang === "de"
                ? "Soziale Marktwirtschaft und Kooperation"
                : "Social market economy & democratic unity"}
          </text>
        </g>
      )}
    </svg>
  );
}

function MarshallAidFlowDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Przepływ funduszy Planu Marshalla: maszyny, zboże i odbudowa mostów"
      : lang === "de"
        ? "Marshallplan-Hilfe: Maschinen, Weizen und Wiederaufbau der Bruecken"
        : "Marshall Plan aid flow: machinery, grain, and bridge reconstruction";

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
          y="55"
          width="120"
          height="65"
          rx="6"
          fill="#eff6ff"
          stroke="#2563eb"
          strokeWidth="1.5"
        />
        <text x="100" y="80" textAnchor="middle" fontSize="16">
          🇺🇸 🚢
        </text>
        <text x="100" y="100" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#1e40af">
          US Marshall Aid
        </text>
        <text x="100" y="112" textAnchor="middle" fontSize="7" fill="#1d4ed8">
          Capital & equipment
        </text>

        <rect
          x="240"
          y="55"
          width="120"
          height="65"
          rx="6"
          fill="#ecfdf5"
          stroke="#059669"
          strokeWidth="1.5"
        />
        <text x="300" y="80" textAnchor="middle" fontSize="16">
          🇪🇺 🏭
        </text>
        <text x="300" y="100" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#065f46">
          European Industry
        </text>
        <text x="300" y="112" textAnchor="middle" fontSize="7" fill="#047857">
          Steel, rail & power
        </text>

        <line
          x1="160"
          y1="85"
          x2="240"
          y2="85"
          stroke="#059669"
          strokeWidth="3"
          markerEnd="url(#arrow)"
        />
      </g>
      {step >= 2 && (
        <g>
          <rect x="40" y="135" width="320" height="42" rx="6" fill="#1e293b" />
          <text x="200" y="153" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#34d399">
            Reinvesting counterpart funds into factories and roads
          </text>
          <text x="200" y="168" textAnchor="middle" fontSize="8" fill="#cbd5e1">
            {lang === "pl"
              ? "Sprzedaż towarów z darów tworzyła fundusze obrotowe na nowe fabryki"
              : lang === "de"
                ? "Warenverkaeufe speisten revolvierende Kredite fuer den Mittelstand"
                : "Sales of donated goods generated revolving credit funds for small business"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="195" width="320" height="26" rx="6" fill="#065f46" />
          <text x="200" y="212" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl"
              ? "Warunkiem pomocy była ścisła współpraca i likwidacja ceł w Europie"
              : lang === "de"
                ? "Bedingung war enge Zusammenarbeit und Abbau innereuropaeischer Zoelle"
                : "Aid was explicitly conditioned on European nations lowering cross-border trade barriers"}
          </text>
        </g>
      )}
    </svg>
  );
}

function EuropeanIntegrationCoalSteelDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Europejska Wspólnota Węgla i Stali z 1951 roku: Robert Schuman i Jean Monnet"
      : lang === "de"
        ? "Europaeische Gemeinschaft fuer Kohle und Stahl 1951: Robert Schuman und Jean Monnet"
        : "The 1951 European Coal and Steel Community: Robert Schuman and Jean Monnet";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect
        x="10"
        y="10"
        width="380"
        height="220"
        rx="14"
        fill="#eff6ff"
        stroke="#2563eb"
        strokeWidth="2"
      />
      <g>
        <circle cx="100" cy="90" r="34" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
        <text x="100" y="85" textAnchor="middle" fontSize="18">
          ⛏️ 🏗️
        </text>
        <text x="100" y="105" textAnchor="middle" fontSize="7.5" fontWeight="bold" fill="#1e40af">
          Coal & Steel 1951
        </text>

        <rect x="230" y="65" width="130" height="55" rx="6" fill="#1e40af" />
        <text x="295" y="88" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#ffffff">
          Schuman Plan
        </text>
        <text x="295" y="104" textAnchor="middle" fontSize="8" fill="#dbeafe">
          War materially impossible
        </text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="40" y="135" width="320" height="44" rx="6" fill="#1e293b" />
          <text x="200" y="153" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#60a5fa">
            Pooling the raw ingredients of war to make conflict unthinkable
          </text>
          <text x="200" y="168" textAnchor="middle" fontSize="8" fill="#e2e8f0">
            {lang === "pl"
              ? "Połączenie zasobów węgla i stali Francji i Niemiec uniemożliwiło potajemną produkcję broni"
              : lang === "de"
                ? "Gemeinsame Aufsicht ueber Kohle und Stahl machte Geheimruestung unmoeglich"
                : "Joint oversight of coal and steel made secret military rearmament physically impossible"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="195" width="320" height="26" rx="6" fill="#1d4ed8" />
          <text x="200" y="212" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl"
              ? "Fundament pod dzisiejszą Unię Europejską i najdłuższy okres pokoju"
              : lang === "de"
                ? "Grundstein der EU und laengste Friedensperiode der europaeischen Geschichte"
                : "The genesis of the European Union, guaranteeing historic peace and trade"}
          </text>
        </g>
      )}
    </svg>
  );
}

function EconomicMiracleGermanyJapanDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Powojenny cud gospodarczy: Ludwig Erhard, społeczna gospodarka rynkowa i japoński skok jakości"
      : lang === "de"
        ? "Wirtschaftswunder: Ludwig Erhard, Soziale Marktwirtschaft und Japans Aufstieg"
        : "Postwar economic miracles: Ludwig Erhard's social market economy and Japan's industrial quality";

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
      <g>
        <rect
          x="50"
          y="55"
          width="125"
          height="65"
          rx="6"
          fill="#dcfce7"
          stroke="#16a34a"
          strokeWidth="1.5"
        />
        <text x="112" y="80" textAnchor="middle" fontSize="16">
          🇩🇪 🚗
        </text>
        <text x="112" y="100" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#15803d">
          German Miracle
        </text>
        <text x="112" y="112" textAnchor="middle" fontSize="7" fill="#14532d">
          Deutsche Mark & Mittelstand
        </text>

        <rect
          x="225"
          y="55"
          width="125"
          height="65"
          rx="6"
          fill="#dcfce7"
          stroke="#16a34a"
          strokeWidth="1.5"
        />
        <text x="287" y="80" textAnchor="middle" fontSize="16">
          🇯🇵 🚅
        </text>
        <text x="287" y="100" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#15803d">
          Japanese Miracle
        </text>
        <text x="287" y="112" textAnchor="middle" fontSize="7" fill="#14532d">
          Electronics, cars, high speed rail
        </text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="40" y="135" width="320" height="42" rx="6" fill="#14532d" />
          <text x="200" y="153" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#ffffff">
            Stable currencies, open markets, and technical education
          </text>
          <text x="200" y="168" textAnchor="middle" fontSize="8" fill="#bbf7d0">
            {lang === "pl"
              ? "Zniesienie kontroli cen w 1948 r. natychmiast zapełniło puste półki w sklepach"
              : lang === "de"
                ? "Waehrungsreform und Freigabe der Preise fuellten ueber Nacht die Geschaefte"
                : "Currency stabilization and price deregulation instantly repopulated empty shop windows"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="195" width="320" height="26" rx="6" fill="#1e293b" />
          <text x="200" y="212" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#f8fafc">
            {lang === "pl"
              ? "Edukacja inżynierska i uczciwa konkurencja odbudowały zniszczone kraje"
              : lang === "de"
                ? "Ingenieurkunst und ehrlicher Wettbewerb bauten zerstoerte Staaten auf"
                : "Engineering excellence and competitive private enterprise rebuilt thriving democracies"}
          </text>
        </g>
      )}
    </svg>
  );
}

function LegacyOfReconstructionDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Lekcje z powojennej odbudowy: hojność i integracja zamiast kar i reparacji"
      : lang === "de"
        ? "Die Lehre des Wiederaufbaus: Partnerschaft und Integration statt Demuetigung"
        : "The enduring lesson of reconstruction: generous partnership and integration over punitive vengeance";

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
        <circle cx="200" cy="80" r="34" fill="#f3e8ff" stroke="#7e22ce" strokeWidth="2" />
        <text x="200" y="75" textAnchor="middle" fontSize="18">
          🕊️ 🤝
        </text>
        <text x="200" y="95" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#581c87">
          Reconciliation
        </text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="40" y="130" width="320" height="46" rx="6" fill="#581c87" />
          <text x="200" y="148" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#ffffff">
            Unlike 1919 Versailles, 1947 chose economic partnership over humiliation
          </text>
          <text x="200" y="163" textAnchor="middle" fontSize="8" fill="#e9d5ff">
            {lang === "pl"
              ? "Pomoc pokonanym w odbudowie stworzyła trwałych sojuszników i przyjaciół"
              : lang === "de"
                ? "Ehemaligen Gegnern beim Wiederaufbau zu helfen, schuf treue Verbuendete"
                : "Helping former adversaries rebuild established trustworthy democratic allies"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="195" width="320" height="26" rx="6" fill="#1e293b" />
          <text x="200" y="212" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#f8fafc">
            {lang === "pl"
              ? "Inwestowanie w pokój i wspólny rynek przynosi największy zwrot w historii"
              : lang === "de"
                ? "Investitionen in gemeinsamen Frieden zahlen die hoechste Rendite"
                : "Investing in shared prosperity yields the highest institutional return in civilization"}
          </text>
        </g>
      )}
    </svg>
  );
}

function Toy({ onDone }: ToyProps) {
  const [aidAmount, setAidAmount] = useState(5);
  const [tradeOpenness, setTradeOpenness] = useState(50);
  const recoveryIndex = Math.min(100, Math.round(aidAmount * 4 + tradeOpenness * 0.6));
  const isComplete = aidAmount >= 12 && tradeOpenness >= 75;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "center" }}>
      <p style={{ margin: 0, fontWeight: 700, fontSize: "1rem" }}>
        Marshall Aid: ${aidAmount}B | European Market Openness: {tradeOpenness}% | Recovery Index:{" "}
        {recoveryIndex}%
      </p>
      <div style={{ display: "flex", gap: "8px" }}>
        <button
          type="button"
          className="btn"
          onClick={() => {
            setAidAmount(13);
            setTradeOpenness(85);
            onDone?.();
          }}
        >
          Enact Full Marshall Plan ($13B + Open Trade)
        </button>
        <button
          type="button"
          className="btn btn-quiet"
          onClick={() => {
            setAidAmount(2);
            setTradeOpenness(20);
          }}
        >
          Protectionist Retribution Policy
        </button>
      </div>
      <div
        style={{
          padding: "12px",
          background: isComplete ? "#eef8ef" : "#fef2f2",
          borderRadius: "10px",
          width: "100%",
          textAlign: "center",
        }}
      >
        {isComplete
          ? "Spectacular Postwar Miracle: Bold capital assistance combined with open borders, currency reform, and cooperative trade turns devastated cities into engines of freedom!"
          : "Stagnation and Despair: Low recovery aid and retaliatory tariffs keep factories shuttered and families in poverty."}
      </div>
    </div>
  );
}

function RebuildingWidget({ onAnswer }: WidgetProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
      <p style={{ margin: 0 }}>
        Why was the post-1945 reconstruction policy (Marshall Plan and European integration) vastly
        more successful than the post-1919 Versailles approach?
      </p>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>
        They required all European locomotives to be painted bright orange
      </button>
      <button type="button" className="btn" onClick={() => onAnswer(true)}>
        Instead of extracting punitive financial reparations that generated resentment, leaders
        provided investment capital, stabilized currencies, and tied coal and steel industries
        together so war became materially impossible
      </button>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>
        Architects built all replacement factories entirely out of recycled gingerbread cookies
      </button>
    </div>
  );
}

export const lesson: Lesson = {
  id: "rebuilding",
  story: [
    animatedBeat(
      [
        T(
          "Meet Karan. He examines photographs of European cities in the summer of 1945: mountains of shattered brick, twisted rails, and homeless families.",
          "Das ist Klaus. Er sieht Fotos von 1945: Berge aus Schutt, zerstoerte Bruecken und Millionen obdachloser Menschen.",
          "Poznaj Kamila. Ogląda zdjęcia europejskich miast z lata 1945 roku: góry gruzów, zerwane mosty i miliony bezdomnych rodzin.",
        ),
        T(
          "World War 2 left the industrial heartlands of Europe and Asia completely devastated, with coal output down by half and rampant inflation.",
          "Ganze Industriegebiete lagen in Truemmern, die Kohlefoerderung war halbiert und der Schwarzmarkt bluehte.",
          "Wojna obróciła w perzynę przemysłowe serce Europy i Azji: wydobycie węgla spadło o połowę, a inflacja zniszczyła waluty.",
        ),
        T(
          "Famine threatened tens of millions during the bitter winter of 1946-1947, posing an urgent threat to human survival.",
          "Im harten Nachkriegswinter drohten Hunger und Kaelte die gesamte Zivilisation erneut ins Chaos zu stuerzen.",
          "W mroźną zimę 1946/1947 milionom ludzi zajrzało w oczy widmo głodu i upadku elementarnego porządku społecznego.",
        ),
      ],
      RebuildingMarshallPlanDiagram,
    ),
    animatedBeat(
      [
        T(
          "In June 1947, US Secretary of State George C. Marshall proposed an unprecedented solution in a historic address at Harvard University.",
          "Im Juni 1947 schlug US-Aussenminister George C. Marshall in Harvard eine historische Rettung vor.",
          "W czerwcu 1947 r. sekretarz stanu USA George Marshall przedstawił na Uniwersytecie Harvarda bezprecedensowy plan pomocy.",
        ),
        T(
          "Rather than demanding harsh reparations like the failed 1919 Treaty of Versailles, the United States provided over $13 billion in economic assistance.",
          "Statt wie 1919 Strafzahlungen zu verlangen, stellten die USA ueber 13 Milliarden Dollar fuer den Wiederaufbau bereit.",
          "Zamiast żądać rujnujących reparacji wojennych jak w 1919 r., Stany Zjednoczone przekazały ponad 13 miliardów dolarów na odbudowę.",
        ),
        T(
          "Crucially, European nations were required to cooperate, drop mutual trade barriers, and form a joint committee to distribute the aid equitably.",
          "Bedingung war: Die europaeischen Laender mussten zusammenarbeiten und Zoelle untereinander abbauen.",
          "Warunkiem pomocy było zacieśnienie współpracy międzynarodowej, likwidacja ceł i wspólne planowanie inwestycji.",
        ),
      ],
      MarshallAidFlowDiagram,
    ),
    animatedBeat(
      [
        T(
          "In 1950, French Foreign Minister Robert Schuman and planner Jean Monnet took a revolutionary step to make future war impossible.",
          "1950 machten Robert Schuman und Jean Monnet einen revolutionaeren Schritt, um Kriege fuer immer auszuschliessen.",
          "W 1950 roku francuski minister Robert Schuman i Jean Monnet podjęli rewolucyjny krok, by na zawsze wykluczyć wojnę w Europie.",
        ),
        T(
          "They founded the European Coal and Steel Community (ECSC), placing the essential raw materials of military production under a joint supranational High Authority.",
          "Sie gruendeten die Montanunion (EGKS), die Kohle und Stahl der Kriegsgegner unter eine gemeinsame Aufsicht stellte.",
          "Powołali Europejską Wspólnotę Węgla i Stali, oddając surowce niezbędne do zbrojeń pod wspólny, ponadnarodowy zarząd.",
        ),
        T(
          "By legally and economically binding France, Germany, Italy, and the Benelux together, starting another war became physically impossible.",
          "Indem Frankreich und Deutschland ihre Rohstoffe teilten, wurde ein heimlicher Ruetungswettlauf materiell unmoeglich.",
          "Wspólna kontrola zasobów Francji, Niemiec i Włoch sprawiła, że potajemne przygotowania do wojny stały się technicznie niewykonalne.",
        ),
      ],
      EuropeanIntegrationCoalSteelDiagram,
    ),
    animatedBeat(
      [
        T(
          "Paired with Ludwig Erhard's 1948 currency reform in West Germany, which replaced worthless reichsmarks with the stable Deutsche Mark, prosperity exploded.",
          "Ludwig Erhards Waehrungsreform von 1948 und die neue D-Mark loesten das deutsche Wirtschaftswunder aus.",
          "Reforma walutowa Ludwiga Erharda z 1948 r., wprowadzająca markę niemiecką i wolne ceny, zapoczątkowała niemiecki 'cud gospodarczy'.",
        ),
        T(
          "Shop windows filled with food overnight; factories retooled to produce high-precision machines, automobiles, and pharmaceuticals.",
          "Ueber Nacht fuellten sich die Schaufenster mit Waren; Fabriken bauten Maschinen und Autos von Weltruf.",
          "Półki sklepowe zapełniły się z dnia na dzień, a fabryki zaczęły wytwarzać precyzyjne maszyny i samochody poszukiwane na całym świecie.",
        ),
        T(
          "In Japan, sweeping land reforms, quality control methodologies, and high-speed rail produced an equally staggering industrial miracle.",
          "In Japan fuehrten Qualitaetskontrolle und Hightech-Zuege zu einem ebenso beispiellosen Aufstieg.",
          "W Japonii reformy rolne, kultura kontroli jakości i pociągi Shinkansen zapoczątkowały spektakularny awans technologiczny.",
        ),
      ],
      EconomicMiracleGermanyJapanDiagram,
    ),
    animatedBeat(
      [
        T(
          "The post-1945 reconstruction demonstrated the greatest geopolitical lesson in human history.",
          "Der Wiederaufbau nach 1945 lehrte die Menschheit die vielleicht wichtigste Lektion der Weltgeschichte.",
          "Powojenna odbudowa przyniosła najważniejszą lekcję geopolityczną w nowożytnej historii świata.",
        ),
        T(
          "True security and enduring peace are not achieved through the humiliation of defeated foes, but through shared economic opportunity and mutual respect.",
          "Dauerhafter Frieden entsteht nicht durch Demuetigung von Verlierern, sondern durch gemeinsame wirtschaftliche Perspektiven.",
          "Trwały pokój i bezpieczeństwo nie rodzą się z poniżania pokonanych wrogów, lecz ze wspólnego rozwoju gospodarczego i wzajemnego szacunku.",
        ),
        T(
          "When nations trade freely and build open, democratic institutions together, they transform former adversaries into indispensable friends.",
          "Wenn freie Nationen handeln und demokratische Werte teilen, werden aus ehemaligen Feinden unersetzliche Freunde.",
          "Gdy narody handlują bez barier i wspólnie budują instytucje demokratyczne, dawni wrogowie stają się niezawodnymi sojusznikami.",
        ),
      ],
      LegacyOfReconstructionDiagram,
    ),
  ],
  toyIntro: T(
    "Calibrate the European Reconstruction policy: balance Marshall Plan capital aid with open common market policies to spur rapid postwar economic recovery.",
    "Steuere den Wiederaufbau: Kombiniere Marshallplan-Kredite mit offenen Maerkten fuer ein rasches Wirtschaftswunder.",
    "Zarządzaj powojenną odbudową: połącz kapitał Planu Marshalla z otwarciem wspólnego rynku, by przyspieszyć cud gospodarczy.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "Why was the Marshall Plan's requirement that European nations cooperate and lower trade barriers so historically significant?",
        "Warum war die Bedingung des Marshallplans, dass europaeische Laender zusammenarbeiten und Zoelle abbauen mussten, so bedeutsam?",
        "Dlaczego warunek Planu Marshalla, wymagający współpracy państw europejskich i obniżenia ceł, miał tak przełomowe znaczenie?",
      ),
      options: [
        {
          text: T(
            "Because it incentivized former wartime adversaries to integrate their economies and lay the institutional foundation for the European Union, preventing renewed conflict",
            "Weil es ehemalige Kriegsgegner dazu brachte, ihre Maerkte zu verflechten und den Grundstein fuer die EU zu legen",
            "Ponieważ skłonił dawnych wrogów do integracji gospodarczej i stworzenia fundamentów pod Unię Europejską, wykluczając kolejną wojnę",
          ),
          correct: true,
        },
        {
          text: T(
            "Because European trains could only run if all border ticket conductors spoke fluent Esperanto",
            "Weil Zuege nur fahren durften, wenn Schaffner an Grenzen fliessend Esperanto sprachen",
            "Ponieważ pociągi mogły jeździć tylko wtedy, gdy wszyscy konduktorzy na granicach mówili płynnie w esperanto",
          ),
          correct: false,
        },
        {
          text: T(
            "Because the US Congress insisted that all European bridges be repainted bright yellow",
            "Weil die USA verlangten, dass alle Bruecken in Europa gelb gestrichen werden mussten",
            "Ponieważ Kongres USA zażądał przemalowania wszystkich mostów w Europie na jaskrawożółty kolor",
          ),
          correct: false,
        },
      ],
      hint: T(
        "Think about the path leading from the Marshall Plan to the European Coal and Steel Community.",
        "Denke an den Weg vom Marshallplan zur Montanunion und zur Europaeischen Union.",
        "Zastanów się nad drogą prowadzącą od pomocy gospodarczej do Europejskiej Wspólnoty Węgla i Stali.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "What was the core strategic insight behind the 1950 Schuman Declaration that created the European Coal and Steel Community?",
        "Was war der strategische Grundgedanke der Schuman-Erklaerung von 1950 zur Montanunion?",
        "Jaka była kluczowa idea deklaracji Roberta Schumana z 1950 roku, powołującej Europejską Wspólnotę Węgla i Stali?",
      ),
      options: [
        {
          text: T(
            "By pooling the essential raw materials of military weapons (coal and steel) under a joint supranational authority, war between historic enemies became materially impossible",
            "Indem Kohle und Stahl unter gemeinsame europaeische Aufsicht gestellt wurden, wurde ein neuer Krieg materiell unmoeglich",
            "Poprzez oddanie kluczowych surowców zbrojeniowych (węgla i stali) pod wspólny zarząd ponadnarodowy, wojna stała się technicznie niewykonalna",
          ),
          correct: true,
        },
        {
          text: T(
            "To ensure that coal miners were given free brass harmonicas every Sunday",
            "Damit Bergleute an jedem Sonntag kostenlose Mundharmonikas erhielten",
            "Aby zagwarantować górnikom darmowe harmonijki ustne w każdą niedzielę",
          ),
          correct: false,
        },
        {
          text: T(
            "To build a gigantic steel roof over the entire Alps mountain range",
            "Um ein riesiges Stahldach ueber den gesamten Alpenbogen zu spannen",
            "Aby zbudować wielki stalowy dach nad całym łańcuchem Alp",
          ),
          correct: false,
        },
      ],
      hint: T(
        "Focus on how shared industrial control prevents covert national rearmament.",
        "Achte darauf, wie gemeinsame Rohstoffkontrolle heimliche Aufruestung verhindert.",
        "Zwróć uwagę na to, jak wspólna kontrola surowców uniemożliwia potajemne zbrojenia.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Analyze why the post-1945 reconstruction succeeded in creating durable peace compared to post-1919.",
        "Analysiere, warum der Wiederaufbau nach 1945 im Vergleich zu 1919 einen dauerhaften Frieden schuf.",
        "Przeanalizuj, dlaczego odbudowa po 1945 roku przyniosła trwały pokój w odróżnieniu od traktatu z 1919 roku.",
      ),
      Widget: RebuildingWidget,
      hint: T(
        "Contrast cooperative investment and economic integration with punitive financial reparations.",
        "Vergleiche partnerschaftliche Investitionen mit zerstoererischen Strafzahlungen.",
        "Zestaw partnerskie inwestycje i integrację rynkową z rujnującymi odszkodowaniami wojennymi.",
      ),
    },
  ],
  askDad: T(
    "Ask your parent: Why was helping former enemies rebuild their countries after World War 2 so much wiser than punishing them with huge fines?",
    "Frage deine Eltern: Warum war es nach 1945 so viel klueger, ehemaligen Kriegsgegnern beim Wiederaufbau zu helfen, statt sie mit hohen Strafen zu belegen?",
    "Zapytaj rodziców: Dlaczego pomoc pokonanym w odbudowie po 1945 roku okazała się o wiele mądrzejsza niż nakładanie na nich mściwych kar finansowych?",
  ),
  realLife: {
    title: T(
      "Real world: Tony Judt's 'Postwar: A History of Europe Since 1945'",
      "Echte Welt: Tony Judts Meisterwerk 'Geschichte Europas von 1945 bis zur Gegenwart'",
      "Prawdziwy świat: Tony Judt i 'Powojnie: Historia Europy od roku 1945'",
    ),
    body: T(
      "In his monumental 2005 work 'Postwar', the renowned British-American historian Tony Judt chronicled Europe's extraordinary journey from physical devastation and mass dislocation in 1945 to unprecedented freedom and wealth. Judt demonstrated that the deliberate pairing of American financial aid, currency stabilization, and Franco-German economic reconciliation forged an unprecedented era of peace and social market democracy across the continent.",
      "In seinem Jahrhundertwerk 'Postwar' (2005) beschreibt der Historiker Tony Judt Europas beispiellosen Weg von der totalen Zerstoerung 1945 zu beispiellosem Wohlstand und Freiheit. Judt belegt, wie die Verbindung von Marshall-Hilfe, stabilen Waehrungen und deutsch-franzoesischer Versoehnung das Fundament fuer Frieden und die soziale Marktwirtschaft legte.",
      "W monumentalnym dziele 'Powojnie' (2005) wybitny historyk Tony Judt opisał drogę Europy od zgliszcz i milionów uchodźców w 1945 r. do bezprecedensowego dobrobytu. Judt wykazał, że połączenie amerykańskiego kapitału, reform walutowych i pojednania francusko-niemieckiego stworzyło najtrwalszy okres pokoju i rozwoju w dziejach kontynentu.",
    ),
  },
  factCard: {
    claims: [
      {
        text: T(
          "The European Recovery Program (Marshall Plan) was signed into US law by President Harry Truman on April 3, 1948, delivering $13.3 billion over four years.",
          "Praesident Harry Truman unterzeichnete das Marshallplan-Gesetz am 3. April 1948 mit 13,3 Milliarden Dollar Budget.",
          "Prezydent Harry Truman podpisał ustawę o Europejskim Programie Odbudowy (Planie Marshalla) 3 kwietnia 1948 r., przyznając 13,3 mld dolarów pomocy.",
        ),
        source: "https://www.archives.gov/milestone-documents/marshall-plan",
      },
      {
        text: T(
          "Robert Schuman presented the Schuman Declaration on May 9, 1950, proposing joint Franco-German coal and steel administration (celebrated today as Europe Day).",
          "Robert Schuman stellte seinen historischen Plan am 9. Mai 1950 vor, der heute als Europatag gefeiert wird.",
          "Robert Schuman ogłosił deklarację 9 maja 1950 r., proponując wspólny zarząd nad węglem i stalą (dzień ten obchodzony jest jako Dzień Europy).",
        ),
        source:
          "https://european-union.europa.eu/principles-countries-history/history-eu/1945-59/schuman-declaration-may-1950_en",
      },
      {
        text: T(
          "Historian Tony Judt published 'Postwar: A History of Europe Since 1945' with Penguin Press in 2005, winning the Arthur Goodhart Prize.",
          "Tony Judts monumentales Werk 'Postwar' erschien 2005 bei Penguin Press.",
          "Wybitna praca Tony'ego Judta 'Postwar' ukazała się w 2005 r. nakładem wydawnictwa Penguin Press.",
        ),
        source: "https://www.penguinrandomhouse.com/books/296245/postwar-by-tony-judt/",
      },
      {
        text: T(
          "West Germany replaced the Reichsmark with the Deutsche Mark on June 20, 1948, while Ludwig Erhard simultaneously dismantled price controls.",
          "Am 20. Juni 1948 fuehrte Westdeutschland die D-Mark ein und schaffte Preisbindungen ab.",
          "20 czerwca 1948 r. w zachodnich Niemczech wprowadzono markę niemiecką, a Ludwig Erhard zniósł państwową kontrolę cen.",
        ),
        source:
          "https://www.bundesbank.de/en/tasks/topics/70th-anniversary-of-the-currency-reform-667794",
      },
      {
        text: T(
          "The Treaty of Paris established the European Coal and Steel Community on April 18, 1951, signed by France, West Germany, Italy, Belgium, Netherlands, and Luxembourg.",
          "Der Vertrag von Paris gruendete am 18. April 1951 die Montanunion mit sechs Gruenderstaaten.",
          "Traktat paryski powołujący Europejską Wspólnotę Węgla i Stali został podpisany 18 kwietnia 1951 r. przez sześć państw założycielskich.",
        ),
        source: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=LEGISSUM:xy0022",
      },
    ],
    simplified: [
      T(
        "Complex multilateral aid allocation formulas, sovereign counterpart fund accounting ledgers, and trade tariff schedules are translated into interactive reconstruction balancing toys and clear historical narratives.",
        "Komplexe Hilfsfondsabrechnungen und historische Zoelle wurden in interaktive Wiederaufbau-Spiele und packende Berichte verstaendlich aufbereitet.",
        "Skomplikowane formuły podziału funduszy pomocowych i taryfy celne przedstawiono w formie przystępnych symulatorów odbudowy i przejrzystej narracji historycznej.",
      ),
    ],
  },
};
