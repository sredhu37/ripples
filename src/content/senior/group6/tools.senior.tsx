import { useState } from "react";
import { animatedBeat } from "../../../lesson/toolkit";
import type { DiagramProps, Lesson, Text, ToyProps, WidgetProps } from "../../../lesson/types";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function ToolsLeverageDiagram({ lang, step }: DiagramProps) {
  const name = lang === "pl" ? "Aarav" : lang === "de" ? "Arne" : "Aarav";
  const label =
    lang === "pl"
      ? "Aarav i mechaniczna dźwignia: od mięśni ludzkich do maszyn parowych"
      : lang === "de"
        ? "Arne und mechanische Hebelwirkung: Von Muskelkraft zu Dampfmaschinen"
        : "Aarav and mechanical leverage: from human muscle to steam power";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect
        x="10"
        y="10"
        width="380"
        height="220"
        rx="14"
        fill="#0f172a"
        stroke="#f59e0b"
        strokeWidth="2"
      />
      <g>
        <circle cx="80" cy="110" r="28" fill="#f3cfa6" stroke="#f59e0b" strokeWidth="2" />
        <path d="M 52 105 C 52 70 108 70 108 105" fill="#78350f" />
        <circle cx="72" cy="107" r="2.5" fill="#0f172a" />
        <circle cx="88" cy="107" r="2.5" fill="#0f172a" />
        <path d="M 76 119 Q 80 125 84 119" stroke="#0f172a" strokeWidth="2" fill="none" />
        <path
          d="M 56 185 L 62 140 Q 80 135 98 140 L 104 185 Z"
          fill="#d97706"
          stroke="#f59e0b"
          strokeWidth="2"
        />
        <text x="80" y="205" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#fde68a">
          {name}
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
          stroke="#f59e0b"
          strokeWidth="1.5"
        />
        <text x="250" y="55" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#fef3c7">
          ⚙️{" "}
          {lang === "pl"
            ? "Dźwignia Technologiczna"
            : lang === "de"
              ? "Technologischer Hebel"
              : "Technological Multiplier"}
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
            stroke="#d97706"
            strokeWidth="1.5"
          />
          <text x="250" y="102" textAnchor="middle" fontSize="16">
            🪓 ➡️ ⚙️ ➡️ 🚂
          </text>
          <text x="250" y="122" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#fbbf24">
            {lang === "pl"
              ? "Energia biologiczna ➡️ Silnik Watta"
              : lang === "de"
                ? "Muskelkraft ➡️ Watt-Dampfmaschine"
                : "Muscle Power ➡️ Watt Steam Engine"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="135" y="145" width="230" height="60" rx="8" fill="#78350f" />
          <text
            x="250"
            y="170"
            textAnchor="middle"
            fontSize="11.5"
            fontWeight="bold"
            fill="#ffffff"
          >
            {lang === "pl"
              ? "Przełamanie ograniczeń organicznych"
              : lang === "de"
                ? "Ueberwindung biologischer Grenzen"
                : "Overcoming Biological Limits"}
          </text>
          <text x="250" y="190" textAnchor="middle" fontSize="10" fill="#fef3c7">
            {lang === "pl"
              ? "Węgiel i maszyny zwiększyły produkcję 100-krotnie"
              : lang === "de"
                ? "Kohle und Dampf vervielfachten die Produktivitaet"
                : "Fossil energy multiplied output by orders of magnitude"}
          </text>
        </g>
      )}
    </svg>
  );
}

function HandcraftVsMechanizationDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Rzemiosło kontra mechanizacja: wydajność produkcji tkanin"
      : lang === "de"
        ? "Handwerk gegen Mechanisierung: Produktivitaet im Textilgewerbe"
        : "Handicraft versus mechanization: productivity in textile weaving";

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
          y="40"
          width="140"
          height="70"
          rx="8"
          fill="#fef3c7"
          stroke="#d97706"
          strokeWidth="1.5"
        />
        <text x="110" y="65" textAnchor="middle" fontSize="16">
          🧵 ✋
        </text>
        <text x="110" y="85" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#92400e">
          Traditional Artisan
        </text>
        <text x="110" y="100" textAnchor="middle" fontSize="8" fill="#78350f">
          1 meter / 4 hours
        </text>

        <rect
          x="220"
          y="40"
          width="140"
          height="70"
          rx="8"
          fill="#e0e7ff"
          stroke="#4338ca"
          strokeWidth="1.5"
        />
        <text x="290" y="65" textAnchor="middle" fontSize="16">
          🏭 ⚙️
        </text>
        <text x="290" y="85" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#312e81">
          Power Loom (1785)
        </text>
        <text x="290" y="100" textAnchor="middle" fontSize="8" fill="#4338ca">
          40 meters / 4 hours
        </text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="40" y="130" width="320" height="46" rx="6" fill="#1e293b" />
          <text x="200" y="150" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#60a5fa">
            Capital Investment Collapses Marginal Cost
          </text>
          <text x="200" y="165" textAnchor="middle" fontSize="8" fill="#cbd5e1">
            {lang === "pl"
              ? "Maszyny parowe wymagały fabryk i kapitału, ale drastycznie obniżyły ceny towarów"
              : lang === "de"
                ? "Fabriken erforderten Kapital, senkten aber Stueckkosten dramatisch"
                : "High fixed machinery investment drives marginal production costs to historical lows"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="190" width="320" height="26" rx="6" fill="#047857" />
          <text x="200" y="207" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl"
              ? "Ubrania stały się dostępne dla milionów zwykłych rodzin"
              : lang === "de"
                ? "Kleidung wurde fuer breite Bevoelkerungsschichten erschwinglich"
                : "Abundant clothing became accessible to working-class families globally"}
          </text>
        </g>
      )}
    </svg>
  );
}

function WattEngineThermodynamicsDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Kondensator pary Jamesa Watta: sprawność termodynamiczna"
      : lang === "de"
        ? "James Watts separater Kondensator: Thermodynamische Effizienz"
        : "James Watt's separate condenser: thermodynamic efficiency jump";

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
        <circle cx="100" cy="90" r="34" fill="#fee2e2" stroke="#dc2626" strokeWidth="2" />
        <text x="100" y="85" textAnchor="middle" fontSize="18">
          🔥 💨
        </text>
        <text x="100" y="105" textAnchor="middle" fontSize="7.5" fontWeight="bold" fill="#991b1b">
          Boiler Heat
        </text>

        <rect x="230" y="65" width="130" height="55" rx="6" fill="#0369a1" />
        <text x="295" y="88" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#ffffff">
          Separate Condenser
        </text>
        <text x="295" y="104" textAnchor="middle" fontSize="8" fill="#e0f2fe">
          75% coal fuel savings
        </text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="40" y="135" width="320" height="44" rx="6" fill="#1e293b" />
          <text x="200" y="153" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#38bdf8">
            Decoupling Manufacturing From Running Rivers
          </text>
          <text x="200" y="168" textAnchor="middle" fontSize="8" fill="#e2e8f0">
            {lang === "pl"
              ? "Przed silnikiem parowym młyny musiały stać przy rzekach; maszyna Watta uwolniła fabryki"
              : lang === "de"
                ? "Vor Watt brauchte man Fluesse; Dampfmaschinen ermoeglichten Fabriken ueberall"
                : "Steam engines untethered factories from rural waterways, creating industrial cities"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="195" width="320" height="26" rx="6" fill="#0f766e" />
          <text x="200" y="212" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl"
              ? "Narodziny nowoczesnej sieci kolejowej i transportu morskiego"
              : lang === "de"
                ? "Entstehung von Eisenbahnen und globalen Dampfschifflinien"
                : "Laying the structural foundation for transcontinental rail and steam shipping"}
          </text>
        </g>
      )}
    </svg>
  );
}

function DivisionOfLaborSmithDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Adam Smith i fabryka szpilek: podział pracy"
      : lang === "de"
        ? "Adam Smith und die Stecknadelfabrik: Arbeitsteilung"
        : "Adam Smith and the pin factory: division of labor multiplier";

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
      <g>
        <circle cx="80" cy="85" r="26" fill="#fae8ff" stroke="#a21caf" strokeWidth="1.5" />
        <text x="80" y="90" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#701a75">
          Wire Cut
        </text>

        <circle cx="160" cy="85" r="26" fill="#fae8ff" stroke="#a21caf" strokeWidth="1.5" />
        <text x="160" y="90" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#701a75">
          Point
        </text>

        <circle cx="240" cy="85" r="26" fill="#fae8ff" stroke="#a21caf" strokeWidth="1.5" />
        <text x="240" y="90" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#701a75">
          Head
        </text>

        <circle cx="320" cy="85" r="26" fill="#fae8ff" stroke="#a21caf" strokeWidth="1.5" />
        <text x="320" y="90" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#701a75">
          Pack
        </text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="40" y="130" width="320" height="44" rx="6" fill="#701a75" />
          <text x="200" y="148" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#ffffff">
            Specialization: From 20 Pins to 48,000 Pins per Day
          </text>
          <text x="200" y="163" textAnchor="middle" fontSize="8" fill="#f5d0fe">
            {lang === "pl"
              ? "Jeden człowiek robiłby 20 szpilek; 10 wyspecjalizowanych robotników produkuje 48 000"
              : lang === "de"
                ? "Ein Arbeiter allein schafft 20 Nadeln; 10 Spezialisten fertigen 48.000 am Tag"
                : "Dividing a craft into distinct operations yields explosive output gains"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="190" width="320" height="26" rx="6" fill="#1e293b" />
          <text x="200" y="207" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#f8fafc">
            {lang === "pl"
              ? "Organizacja pracy jest równie potężną technologią jak żelazo i węgiel"
              : lang === "de"
                ? "Arbeitsorganisation ist eine ebenso maechtige Erfindung wie Maschinen"
                : "Process organization is as foundational a technology as physical hardware"}
          </text>
        </g>
      )}
    </svg>
  );
}

function ModernCapitalDeepeningDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Pogłębianie kapitału: inwestycje w zaawansowane narzędzia podnoszą płace realne"
      : lang === "de"
        ? "Kapitalintensivierung: Bessere Werkzeuge steigern Realloehne"
        : "Capital deepening: superior equipment driving real wage growth";

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
        <circle cx="200" cy="80" r="34" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
        <text x="200" y="75" textAnchor="middle" fontSize="18">
          📈 🚜
        </text>
        <text x="200" y="95" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#15803d">
          Capital Deepening
        </text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="40" y="130" width="320" height="46" rx="6" fill="#15803d" />
          <text x="200" y="148" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#ffffff">
            Productivity is the Ultimate Foundation of Human Well-Being
          </text>
          <text x="200" y="163" textAnchor="middle" fontSize="8" fill="#bbf7d0">
            {lang === "pl"
              ? "Robotnik z koparką zarabia więcej niż robotnik z łopatą, bo tworzy większą wartość"
              : lang === "de"
                ? "Ein Baggerfahrer verdient mehr als ein Schaufler, weil er mehr bewegt"
                : "High capital per worker enables higher living standards and reduced work hours"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="195" width="320" height="26" rx="6" fill="#1e293b" />
          <text x="200" y="212" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#f8fafc">
            {lang === "pl"
              ? "Rozwój narzędzi uwalnia czas na edukację, naukę i wypoczynek"
              : lang === "de"
                ? "Werkzeugfortschritt schenkt Freizeit, Bildung und Kultur"
                : "Technological leverage liberated humanity from 80-hour agricultural drudgery"}
          </text>
        </g>
      )}
    </svg>
  );
}

function Toy({ onDone }: ToyProps) {
  const [steamPowerLevel, setSteamPowerLevel] = useState(1);
  const unitsPerDay = steamPowerLevel * 100;
  const isIndustrialized = steamPowerLevel >= 5;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "center" }}>
      <p style={{ margin: 0, fontWeight: 700, fontSize: "1rem" }}>
        Engine Power: {steamPowerLevel}x Steam Engines | Daily Production: {unitsPerDay} Bolts of
        Cloth
      </p>
      <div style={{ display: "flex", gap: "8px" }}>
        <button
          type="button"
          className="btn"
          onClick={() => {
            const next = Math.min(5, steamPowerLevel + 1);
            setSteamPowerLevel(next);
            if (next >= 5) onDone?.();
          }}
        >
          Add Watt Steam Engine (+Power)
        </button>
        <button type="button" className="btn btn-quiet" onClick={() => setSteamPowerLevel(1)}>
          Reset to Manual Loom
        </button>
      </div>
      <div
        style={{
          padding: "12px",
          background: isIndustrialized ? "#eef8ef" : "#fef9c3",
          borderRadius: "10px",
          width: "100%",
          textAlign: "center",
        }}
      >
        {isIndustrialized
          ? "Industrial Revolution Achieved: Powered by Watt's condenser, your textile factory produces 500 bolts of cloth per day at fractional cost, making clothing universally affordable!"
          : "Manual Handicraft: Output is strictly bounded by human metabolic limits and muscle fatigue."}
      </div>
    </div>
  );
}

function ToolsWidget({ onAnswer }: WidgetProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
      <p style={{ margin: 0 }}>
        What was the revolutionary economic impact of James Watt's separate steam condenser in the
        late 18th century?
      </p>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>
        It created a machine that could turn iron ore into strawberry ice cream
      </button>
      <button type="button" className="btn" onClick={() => onAnswer(true)}>
        It reduced coal fuel consumption by roughly 75% compared to the Newcomen engine and
        untethered industrial manufacturing from rural riverbanks, allowing factories to operate
        anywhere
      </button>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>
        It forced coal mines to be abandoned and replaced entirely with carrier pigeons
      </button>
    </div>
  );
}

export const lesson: Lesson = {
  id: "tools",
  story: [
    animatedBeat(
      [
        T(
          "Meet Aarav. He stands in an old iron forge, fascinated by how human civilization escaped the trap of physical muscle limits.",
          "Das ist Arne. Er steht in einer historischen Eisengiesserei und staunt, wie die Menschheit den Fesseln reiner Muskelkraft entkam.",
          "Poznaj Aarava. Stoi w dawnej kuźni żelaza i zastanawia się, jak ludzkość zdołała przełamać biologiczne ograniczenia siły mięśni.",
        ),
        T(
          "For over ten thousand years of settled civilization, human economic output was rigidly restricted by biological calories.",
          "Zehntausend Jahre lang war die Wirtschaft streng an die verfuegbare Muskelkraft von Mensch und Nutztier gebunden.",
          "Przez dziesięć tysięcy lat rozwój gospodarczy był ściśle ograniczony liczbą kalorii, jaką człowiek i wół mogli spalić w ciągu dnia.",
        ),
        T(
          "Whether harvesting wheat or cutting stone, the power available to any society was bounded by the daylight hours and physical stamina of living bodies.",
          "Ob bei Ernte oder Steinbruch: Die Produktivitaet endete dort, wo menschliche und tierische Ermuedung begann.",
          "Niezależnie od tego, czy żęto zboże, czy cięto kamień, możliwości każdego społeczeństwa kończyły się tam, gdzie pojawiało się zmęczenie mięśni.",
        ),
      ],
      ToolsLeverageDiagram,
    ),
    animatedBeat(
      [
        T(
          "The Industrial Revolution fundamentally altered the human condition by converting thermal chemical energy into continuous mechanical work.",
          "Die Industrielle Revolution veraenderte alles: Sie verwandelte thermische Energie erstmals in kontinuierliche mechanische Arbeit.",
          "Rewolucja przemysłowa odmieniła los ludzkości, po raz pierwszy przekształcając energię cieplną w ciągłą pracę mechaniczną.",
        ),
        T(
          "In traditional textile workshops, skilled artisans took days of meticulous manual labor to spin and weave a single bolt of linen cloth.",
          "Im traditionellen Handwerk brauchte ein Meister Tage muehsamer Handarbeit fuer ein einzelnes Stueck Tuch.",
          "W tradycyjnym rzemiośle wytrawny tkacz potrzebował wielu dni mozolnej pracy, by utkać jedną belę płótna.",
        ),
        T(
          "With Edmund Cartwright's power loom and steam-driven spindles, mechanical factories produced forty times more fabric per worker, collapsing prices.",
          "Mit mechanischen Webstuehlen produzierten Fabriken das Vierzigfache pro Arbeiter und machten Stoffe fuer alle erschwinglich.",
          "Dzięki mechanicznym krosnom i wrzecionom fabryki wytwarzały czterdziestokrotnie więcej materiału na robotnika, gwałtownie obniżając ceny.",
        ),
      ],
      HandcraftVsMechanizationDiagram,
    ),
    animatedBeat(
      [
        T(
          "The true turning point occurred when James Watt perfected the separate condenser for steam engines in 1769.",
          "Der eigentliche Wendepunkt kam 1769, als James Watt den separaten Kondensator fuer Dampfmaschinen patentierte.",
          "Prawdziwym punktem zwrotnym było opatentowanie przez Jamesa Watta wydzielonego skraplacza pary w 1769 roku.",
        ),
        T(
          "Earlier Newcomen atmospheric engines consumed massive piles of coal because the entire cylinder had to be repeatedly heated and cooled.",
          "Fruehere Newcomen-Maschinen verschwendeten riesige Kohlemengen, weil ihr Zylinder staendig abkuehlen und neu aufheizen musste.",
          "Wcześniejsze maszyny atmosferyczne Newcomena pożerały góry węgla, ponieważ ich cylinder musiał być nieustannie chłodzony i na nowo rozgrzewany.",
        ),
        T(
          "Watt's separate condenser cut coal fuel consumption by 75% and enabled rotary motion, untethering factories from remote river rapids.",
          "Watts Kondensator sparte 75% der Kohle ein und ermoeglichte Drehbewegungen: Fabriken brauchten keine Fluesse mehr.",
          "Osobny skraplacz Watta zredukował zużycie węgla o 75% i umożliwił ruch obrotowy, uniezależniając fabryki od wartkich nurtów rzecznych.",
        ),
      ],
      WattEngineThermodynamicsDiagram,
    ),
    animatedBeat(
      [
        T(
          "Alongside mechanical iron and steam, economists discovered that organizational specialization was an equally formidable technology.",
          "Neben Eisen und Dampf erwies sich auch die organisatorische Arbeitsteilung als revolutionaere Technologie.",
          "Obok żelaza i pary równie potężną innowacją okazała się nowoczesna organizacja pracy i specjalizacja.",
        ),
        T(
          "In 1776, philosopher Adam Smith famously analyzed a pin factory in 'The Wealth of Nations'.",
          "1776 beschrieb Adam Smith in 'Der Wohlstand der Nationen' die Arbeitsteilung am Beispiel einer Stecknadelfabrik.",
          "W 1776 roku Adam Smith opisał w 'Bogactwie narodów' słynny przykład manufaktury szpilek.",
        ),
        T(
          "A single craftsman doing all eighteen distinct operations might make twenty pins a day; ten specialized workers produced over 48,000 pins daily.",
          "Ein Handwerker allein schaffte 20 Nadeln am Tag; zehn spezialisierte Arbeiter fertigten gemeinsam ueber 48.000 Stueck.",
          "Rzemieślnik wykonujący samodzielnie wszystkie osiemnaście czynności robił ledwie dwadzieścia szpilek dziennie; dziesięciu robotników produkowało ich 48 000.",
        ),
      ],
      DivisionOfLaborSmithDiagram,
    ),
    animatedBeat(
      [
        T(
          "Economists call this 'capital deepening': giving human workers stronger tools and machines.",
          "Oekonomen nennen diesen Prozess 'Kapitalintensivierung': Menschliche Arbeit wird mit immer besseren Werkzeugen ausgestattet.",
          "Ekonomiści określają ten proces mianem 'pogłębiania kapitału': wyposażania ludzkich rąk w coraz doskonalsze maszyny.",
        ),
        T(
          "When an operator drives a 40-ton excavator instead of wielding a shovel, their hourly productivity multiplies by a factor of hundreds.",
          "Ein Baggerfahrer bewegt in einer Stunde mehr Erde als hundert Arbeiter mit Schaufeln, was hoehere Realloehne ermoeglicht.",
          "Operator 40-tonowej koparki przenosi w godzinę więcej ziemi niż stu robotników z łopatami, co pozwala na wypłatę wyższych pensji.",
        ),
        T(
          "By multiplying the leverage of human effort, tools and steam dismantled famine-level poverty and laid the groundwork for modern society.",
          "Dieser technologische Hebel befreite die Menschheit von bitterer Not und schuf das Fundament unseres heutigen Wohlstands.",
          "Zwiększając wydajność ludzkich rąk, narzędzia i maszyny parowe wyrwały miliony ludzi ze skrajnej nędzy i stworzyły podwaliny nowoczesności.",
        ),
      ],
      ModernCapitalDeepeningDiagram,
    ),
  ],
  toyIntro: T(
    "Experiment with mechanical leverage: install Watt steam engines to multiply textile factory output and observe how capital investment collapses unit costs.",
    "Experimentiere mit dem mechanischen Hebel: Installiere Watt-Dampfmaschinen, vervielfache die Stoffproduktion und senke die Stueckkosten.",
    "Eksperymentuj z dźwignią technologiczną: zainstaluj silniki parowe Watta, by zwielokrotnić produkcję i zobaczyć, jak inwestycje obniżają koszty.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "Why was the switch from muscle power to steam power such a historic turning point?",
        "Warum war der Uebergang von Muskelkraft zur Dampfkraft ein beispielloser Bruch in der Menschheitsgeschichte?",
        "Dlaczego przejście od energii biologicznej do pary wodnej było bezprecedensowym przełomem w dziejach gospodarki?",
      ),
      options: [
        {
          text: T(
            "Because output was no longer constrained by the physical muscle limits of humans and draft animals, but could draw continuously on fossil thermal energy",
            "Weil die Produktion nicht mehr durch menschliche Muskelkraft limitiert war, sondern kontinuierlich fossile thermische Energie nutzte",
            "Ponieważ produkcja przestała być ograniczona wytrzymałością mięśni ludzi i zwierząt pociągowych, czerpiąc nieprzerwanie z energii termicznej",
          ),
          correct: true,
        },
        {
          text: T(
            "Because steam engines were fueled by fresh garden strawberries and apple cider",
            "Weil Dampfmaschinen mit frischen Erdbeeren und Apfelsaft betrieben wurden",
            "Ponieważ maszyny parowe napędzane były świeżymi truskawkami i sokiem jabłkowym",
          ),
          correct: false,
        },
        {
          text: T(
            "Because horses immediately went on a nationwide strike and refused to walk on dirt roads",
            "Weil Pferde reichsweit in den Streik traten und sich weigerten, Heukarren zu ziehen",
            "Ponieważ konie ogłosiły strajk generalny i odmówiły ciągnięcia wozów",
          ),
          correct: false,
        },
      ],
      hint: T(
        "Think about what constrained ancient farm production versus continuous coal energy.",
        "Denke an die Grenzen biologischer Muskeln gegenueber fossiler Verbrennungsenergie.",
        "Pomyśl o różnicy między biologicznym zmęczeniem mięśni a nieprzerwaną pracą maszyn.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "How did Adam Smith's famous example of the pin factory demonstrate the power of the division of labor?",
        "Wie veranschaulichte Adam Smiths Stecknadel-Beispiel die enorme Kraft der Arbeitsteilung?",
        "W jaki sposób przykład manufaktury szpilek Adama Smitha ukazał potęgę podziału pracy?",
      ),
      options: [
        {
          text: T(
            "By breaking the manufacturing process into specialized repetitive steps, ten workers produced over 4,800 pins per person daily compared to perhaps 20 per day working alone",
            "Indem der Arbeitsprozess in Teilschritte zerlegt wurde, schufen zehn Arbeiter 4.800 Nadeln pro Kopf statt nur 20 im Alleingang",
            "Dzięki podzieleniu procesu na wyspecjalizowane operacje dziesięciu robotników produkowało po 4 800 szpilek na głowę dziennie zamiast zaledwie 20 w pojedynkę",
          ),
          correct: true,
        },
        {
          text: T(
            "By proving that pins grow naturally on trees if watered with warm vinegar",
            "Indem er bewies, dass Stecknadeln auf Baeumen wachsen, wenn man sie mit Essig giesst",
            "Dowodząc, że szpilki rosną na drzewach, o ile podlewa się je ciepłym octem",
          ),
          correct: false,
        },
        {
          text: T(
            "By demonstrating that customers prefer sewing their clothes together using thorn bushes",
            "Indem er zeigte, dass Kunden ihre Kleidung lieber mit Dornenzweigen zusammenstecken",
            "Wykazując, że klienci wolą zszywać ubrania gałązkami ciernistych krzewów",
          ),
          correct: false,
        },
      ],
      hint: T(
        "Focus on how specialization explodes output per worker per day.",
        "Achte darauf, wie Spezialisierung den taeglichen Ausstoss pro Arbeiter vervielfacht.",
        "Zwróć uwagę na to, jak specjalizacja zwielokrotnia wydajność każdego pracownika.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Analyze the thermodynamic and geographical breakthrough introduced by James Watt's separate steam condenser.",
        "Analysiere den thermodynamischen und geografischen Durchbruch von James Watts separatem Kondensator.",
        "Zbadaj przełom termodynamiczny i geograficzny, jaki przyniosło wynalezienie osobnego skraplacza Jamesa Watta.",
      ),
      Widget: ToolsWidget,
      hint: T(
        "Focus on fuel economy, rotary motion, and freedom from riverbanks.",
        "Achte auf Kohleersparnis, Drehbewegung und Unabhaengigkeit von Flusslaeufen.",
        "Skup się na oszczędności węgla, ruchu obrotowym i uniezależnieniu fabryk od rzek.",
      ),
    },
  ],
  askDad: T(
    "Ask your parent: Which modern digital or mechanical tool saves you the most hours of work every week?",
    "Frage deine Eltern: Welches moderne Werkzeug spart euch im Alltag oder Beruf die meiste Arbeitszeit?",
    "Zapytaj rodziców: Jakie współczesne narzędzie cyfrowe lub mechaniczne oszczędza Wam najwięcej godzin pracy w tygodniu?",
  ),
  realLife: {
    title: T(
      "Real world: James Watt and Matthew Boulton's Soho Manufactory in Birmingham (1775)",
      "Echte Welt: James Watt und Matthew Boultons Soho-Manufaktur in Birmingham (1775)",
      "Prawdziwy świat: James Watt i Matthew Boulton w Soho Manufactory w Birmingham (1775)",
    ),
    body: T(
      "In 1775, inventor James Watt partnered with entrepreneur Matthew Boulton at the Soho Manufactory in Birmingham, England. Boulton famously proclaimed to King George III, 'I sell here, Sir, what all the world desires to have: Power!' Their commercial steam engines did not just drain flooded Cornish tin mines; they powered breweries, textile mills, and iron forges across the globe, sparking the transition from craft shops to modern industrial civilization.",
      "1775 schloss sich der Erfinder James Watt mit dem Unternehmer Matthew Boulton in Birmingham zusammen. Boulton praegte gegenueber Koenig George III. das beruehmte Zitat: 'Ich verkaufe hier, Sire, was alle Welt begehrt: Kraft!' Ihre Dampfmaschinen entwässerten nicht nur Minen, sondern trieben Webereien, Brauereien und Eisenhuetten weltweit an und leiteten das moderne Industriezeitalter ein.",
      "W 1775 roku wynalazca James Watt połączył siły z przedsiębiorcą Matthew Boultonem w fabryce Soho w Birmingham. Boulton powiedział wówczas królowi Jerzemu III: 'Sprzedaję tu, Wasza Wysokość, to, czego pragnie cały świat: Siłę!'. Ich silniki parowe nie tylko odwadniały kopalnie cyny w Kornwalii, ale zasilały tkalnie, browary i huty żelaza na całym globie, dając początek współczesnej cywilizacji przemysłowej.",
    ),
  },
  factCard: {
    claims: [
      {
        text: T(
          "James Watt received British Patent 913 in 1769 for 'A New Invented Method of Lessening the Consumption of Steam and Fuel in Fire Engines' featuring the separate condenser.",
          "James Watt erhielt 1769 das britische Patent 913 fuer den separaten Dampfkondensator.",
          "James Watt otrzymał w 1769 r. brytyjski patent nr 913 na metodę zmniejszania zużycia pary i paliwa dzięki osobnemu skraplaczowi.",
        ),
        source:
          "https://www.oxforddnb.com/view/10.1093/ref:odnb/9780198614128.001.0001/odnb-9780198614128-e-28880",
      },
      {
        text: T(
          "Adam Smith published 'An Inquiry into the Nature and Causes of the Wealth of Nations' on March 9, 1776, outlining the division of labor in pin-making.",
          "Adam Smith veroeffentlichte 'Der Wohlstand der Nationen' am 9. Maerz 1776 mit der Analyse der Stecknadelmanufaktur.",
          "Adam Smith opublikował 'Bogactwo narodów' 9 marca 1776 r., przedstawiając rewolucję podziału pracy na przykładzie fabryki szpilek.",
        ),
        source: "https://www.gutenberg.org/ebooks/3300",
      },
      {
        text: T(
          "Edmund Cartwright patented the mechanical power loom in 1785, automating textile weaving and sparking factory mechanization.",
          "Edmund Cartwright patentierte 1785 den mechanischen Webstuhl und trieb die industrielle Weberei voran.",
          "Edmund Cartwright opatentował mechaniczne krosno tkackie w 1785 r., automatyzując produkcję tkanin.",
        ),
        source: "https://www.britannica.com/biography/Edmund-Cartwright",
      },
      {
        text: T(
          "Robert Solow won the Nobel Prize in Economics in 1987 for his neoclassical growth model demonstrating that technological progress drives long-term economic expansion.",
          "Robert Solow erhielt 1987 den Nobelpreis fuer Oekonomie fuer den Nachweis, dass technologischer Fortschritt das langfristige Wachstum treibt.",
          "Robert Solow otrzymał Nagrodę Nobla z ekonomii w 1987 r. za model wykazujący, że to postęp techniczny jest głównym motorem długofalowego wzrostu.",
        ),
        source: "https://www.nobelprize.org/prizes/economic-sciences/1987/solow/facts/",
      },
      {
        text: T(
          "Matthew Boulton and James Watt established the Soho Foundry in Smethwick in 1795 to manufacture commercial steam engines.",
          "Boulton und Watt gruendeten 1795 die Soho Foundry zur industriellen Serienfertigung von Dampfmaschinen.",
          "Matthew Boulton i James Watt uruchomili w 1795 r. odlewnię Soho Foundry, budującą silniki parowe na skalę przemysłową.",
        ),
        source: "https://www.revolutionaryplayers.org.uk/the-soho-foundry/",
      },
    ],
    simplified: [
      T(
        "Thermodynamic Carnot cycle equations, neoclassical production functions, and historical capital-output ratios are presented through intuitive steam engine multipliers and clear historical storytelling.",
        "Thermodynamische Wirkungsgrade und neoklassische Produktionsfunktionen wurden in anschauliche Dampfkraft-Simulationen und verstaendliche Wirtschaftsgeschichte uebersetzt.",
        "Złożone równania termodynamiczne i neoklasyczne funkcje produkcji przedstawiono za pomocą intuicyjnych symulacji maszyn parowych i przystępnej narracji historycznej.",
      ),
    ],
  },
};
