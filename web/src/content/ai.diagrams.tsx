import type { DiagramProps } from "../lesson/types";

export function RigidRulesIfElseDiagram({ lang, step }: DiagramProps) {
  const title =
    lang === "pl"
      ? "Tradycyjne reguły: Jeżeli to, wtedy tamto"
      : lang === "de"
        ? "Klassische Regeln: Wenn-Dann"
        : "Traditional Rules: If This, Then That";

  const condition =
    lang === "pl" ? "Kolor = Czerwony?" : lang === "de" ? "Farbe = Rot?" : "Color = Red?";

  const labelTrue = lang === "pl" ? "Jabłko" : lang === "de" ? "Apfel" : "Apple";

  const labelFalse = lang === "pl" ? "Inne" : lang === "de" ? "Anderes" : "Other";

  const sub =
    lang === "pl"
      ? "Klasyczne programy wykonywały wyłącznie sztywne instrukcje napisane wprost przez człowieka"
      : lang === "de"
        ? "Klassische Software gehorchte nur starren Regeln, die Menschen programmiert hatten"
        : "Classical software only obeyed rigid lines written directly by human programmers";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="Classical Rules Flowchart">
      <rect
        x="30"
        y="30"
        width="340"
        height="180"
        rx="12"
        fill="#f8fafc"
        stroke="#cbd5e1"
        strokeWidth="2"
      />
      <text x="200" y="58" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0f172a">
        {title}
      </text>

      {/* Decision diamond */}
      <polygon
        points="200,85 260,115 200,145 140,115"
        fill="#e0f2fe"
        stroke="#0284c7"
        strokeWidth="2"
      />
      <text x="200" y="118" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0369a1">
        {condition}
      </text>

      {/* True path */}
      <line x1="260" y1="115" x2="310" y2="115" stroke="#0284c7" strokeWidth="2" />
      <rect x="310" y="100" width="55" height="30" rx="4" fill="#dcfce7" stroke="#16a34a" />
      <text x="337" y="118" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#15803d">
        {labelTrue}
      </text>

      {/* False path */}
      <line x1="140" y1="115" x2="90" y2="115" stroke="#0284c7" strokeWidth="2" />
      <rect x="35" y="100" width="55" height="30" rx="4" fill="#fef9c3" stroke="#ca8a04" />
      <text x="62" y="118" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#854d0e">
        {labelFalse}
      </text>

      {step >= 2 && (
        <text x="200" y="198" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e293b">
          {sub}
        </text>
      )}
    </svg>
  );
}

export function TrainingExamplesDatasetDiagram({ lang, step }: DiagramProps) {
  const title =
    lang === "pl"
      ? "Uczenie się wzorców na oznaczonych przykładach"
      : lang === "de"
        ? "Lernen von Mustern aus Beispielen"
        : "Learning Patterns from Labeled Examples";

  const appleLabel = lang === "pl" ? "Jabłko" : lang === "de" ? "Apfel" : "Apple";

  const pearLabel = lang === "pl" ? "Gruszka" : lang === "de" ? "Birne" : "Pear";

  const sub =
    lang === "pl"
      ? "Algorytm bada tysiące zdjęć, aby samodzielnie odkryć cechy rozpoznawcze"
      : lang === "de"
        ? "Der Algorithmus prueft tausende Bilder, um Erkennungsmerkmale zu finden"
        : "The algorithm inspects thousands of pictures to discover distinguishing clues";

  return (
    <svg
      viewBox="0 0 400 240"
      className="diagram-svg"
      aria-label="Machine Learning Training Examples"
    >
      <rect
        x="30"
        y="30"
        width="340"
        height="180"
        rx="12"
        fill="#eff6ff"
        stroke="#bfdbfe"
        strokeWidth="2"
      />
      <text x="200" y="55" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#1e40af">
        {title}
      </text>

      {/* Apple cards */}
      {[70, 130, 190].map((x, i) => (
        <g key={`apple-${x}`}>
          <rect
            x={x}
            y="85"
            width="45"
            height="55"
            rx="5"
            fill="#fee2e2"
            stroke="#ef4444"
            strokeWidth="1.5"
          />
          <circle cx={x + 22} cy={108} r="12" fill="#dc2626" />
          <text
            x={x + 22}
            y={132}
            textAnchor="middle"
            fontSize="8"
            fontWeight="bold"
            fill="#991b1b"
          >
            {appleLabel} #{i + 1}
          </text>
        </g>
      ))}

      {/* Pear cards */}
      {[250, 310].map((x, i) => (
        <g key={`pear-${x}`}>
          <rect
            x={x}
            y="85"
            width="45"
            height="55"
            rx="5"
            fill="#ecfdf5"
            stroke="#10b981"
            strokeWidth="1.5"
          />
          <circle cx={x + 22} cy={108} r="12" fill="#16a34a" />
          <text
            x={x + 22}
            y={132}
            textAnchor="middle"
            fontSize="8"
            fontWeight="bold"
            fill="#166534"
          >
            {pearLabel} #{i + 1}
          </text>
        </g>
      ))}

      {step >= 2 && (
        <text x="200" y="198" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e3a8a">
          {sub}
        </text>
      )}
    </svg>
  );
}

export function PatternScatterFeatureDiagram({ lang, step }: DiagramProps) {
  const title =
    lang === "pl"
      ? "Statystyczne grupowanie cech"
      : lang === "de"
        ? "Statistische Merkmalserkennung"
        : "Statistical Feature Clustering";

  const xLabel = lang === "pl" ? "Okrągłość →" : lang === "de" ? "Rundung →" : "Roundness →";

  const yLabel = lang === "pl" ? "Czerwień ↑" : lang === "de" ? "Roete ↑" : "Redness ↑";

  const appleCluster =
    lang === "pl" ? "Grupa jabłek" : lang === "de" ? "Apfel-Cluster" : "Apple Cluster";

  const pearCluster =
    lang === "pl" ? "Grupa gruszek" : lang === "de" ? "Birnen-Cluster" : "Pear Cluster";

  const sub =
    lang === "pl"
      ? "Granice matematyczne rozdzielają kształty, barwy i słowa w przestrzeni danych"
      : lang === "de"
        ? "Mathematische Grenzen trennen Formen, Farben und Woerter im Datenraum"
        : "Mathematical boundaries separate shapes, colors, and words in high dimensional space";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="Feature Pattern Recognition">
      <rect
        x="30"
        y="30"
        width="340"
        height="180"
        rx="12"
        fill="#fdf4ff"
        stroke="#f5d0fe"
        strokeWidth="2"
      />
      <text x="200" y="55" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#86198f">
        {title}
      </text>

      {/* Axes */}
      <line x1="80" y1="160" x2="320" y2="160" stroke="#a21caf" strokeWidth="2" />
      <line x1="80" y1="160" x2="80" y2="80" stroke="#a21caf" strokeWidth="2" />
      <text x="320" y="175" textAnchor="end" fontSize="9" fill="#701a75">
        {xLabel}
      </text>
      <text x="75" y="85" textAnchor="end" fontSize="9" fill="#701a75">
        {yLabel}
      </text>

      {/* Apple cluster (high round, high red) */}
      <circle cx="260" cy="100" r="6" fill="#dc2626" />
      <circle cx="280" cy="95" r="5" fill="#dc2626" />
      <circle cx="250" cy="115" r="7" fill="#dc2626" />
      <text x="270" y="130" textAnchor="middle" fontSize="8" fill="#991b1b">
        {appleCluster}
      </text>

      {/* Pear cluster (lower round, green) */}
      <circle cx="130" cy="140" r="6" fill="#16a34a" />
      <circle cx="150" cy="135" r="5" fill="#16a34a" />
      <circle cx="120" cy="145" r="7" fill="#16a34a" />
      <text x="140" y="125" textAnchor="middle" fontSize="8" fill="#166534">
        {pearCluster}
      </text>

      {/* Decision boundary line */}
      <line
        x1="180"
        y1="85"
        x2="210"
        y2="160"
        stroke="#c026d3"
        strokeWidth="2"
        strokeDasharray="4 4"
      />

      {step >= 2 && (
        <text x="200" y="198" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#701a75">
          {sub}
        </text>
      )}
    </svg>
  );
}

export function ScientificAssistantScansDiagram({ lang, step }: DiagramProps) {
  const title =
    lang === "pl"
      ? "Pomocnik w nauce, medycynie i językach"
      : lang === "de"
        ? "Helfer fuer Wissenschaft, Medizin und Sprache"
        : "Helper for Science, Medicine, and Language";

  const exoplanetLabel =
    lang === "pl"
      ? "Wykrywanie planet"
      : lang === "de"
        ? "Exoplaneten-Finder"
        : "Exoplanet Spotter";

  const greetingFrom =
    lang === "pl" ? "Cześć przyjacielu!" : lang === "de" ? "Hallo Freund!" : "Hello friend!";

  const greetingTo =
    lang === "pl" ? "Hello friend!" : lang === "de" ? "Hallo Freund!" : "Hallo Freund!";

  const translatorLabel =
    lang === "pl"
      ? "Tłumacz natychmiastowy"
      : lang === "de"
        ? "Sofort-Uebersetzer"
        : "Instant Translator";

  const sub =
    lang === "pl"
      ? "Sztuczna inteligencja działa jak potężne szkło powiększające dla lekarzy i badaczy"
      : lang === "de"
        ? "KI wirkt wie eine Lupe, die Forschern und Aerzten hilft"
        : "AI acts as a powerful magnifying glass helping human doctors and scientists";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="AI Assisting Scientific Scans">
      <rect
        x="30"
        y="30"
        width="340"
        height="180"
        rx="12"
        fill="#f0fdfa"
        stroke="#99f6e4"
        strokeWidth="2"
      />
      <text x="200" y="55" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0f766e">
        {title}
      </text>

      {/* Telescope scan screen */}
      <rect x="80" y="80" width="110" height="75" rx="6" fill="#0f172a" />
      <circle cx="120" cy="110" r="3" fill="#ffffff" />
      <circle cx="150" cy="130" r="2" fill="#ffffff" />
      <circle cx="160" cy="100" r="4" fill="#38bdf8" />
      <circle
        cx="160"
        cy="100"
        r="12"
        fill="none"
        stroke="#22d3ee"
        strokeWidth="1.5"
        strokeDasharray="3 3"
      />
      <text x="135" y="170" textAnchor="middle" fontSize="9" fill="#134e4a">
        {exoplanetLabel}
      </text>

      {/* Translation dialog */}
      <rect
        x="220"
        y="80"
        width="110"
        height="75"
        rx="6"
        fill="#ffffff"
        stroke="#14b8a6"
        strokeWidth="1.5"
      />
      <rect x="230" y="92" width="90" height="18" rx="3" fill="#ccfbf1" />
      <text x="275" y="105" textAnchor="middle" fontSize="8" fill="#0f766e">
        {greetingFrom}
      </text>
      <line x1="275" y1="112" x2="275" y2="120" stroke="#0d9488" strokeWidth="2" />
      <rect x="230" y="122" width="90" height="18" rx="3" fill="#ccfbf1" />
      <text x="275" y="135" textAnchor="middle" fontSize="8" fill="#0f766e">
        {greetingTo}
      </text>
      <text x="275" y="170" textAnchor="middle" fontSize="9" fill="#134e4a">
        {translatorLabel}
      </text>

      {step >= 2 && (
        <text x="200" y="198" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#115e59">
          {sub}
        </text>
      )}
    </svg>
  );
}

export function MathematicalCalculatorNoFeelingsDiagram({ lang, step }: DiagramProps) {
  const title =
    lang === "pl"
      ? "Sprytny kalkulator wzorców: Bez świadomości"
      : lang === "de"
        ? "Musterrechner: Kein Bewusstsein"
        : "Clever Pattern Calculator: No Sentience";

  const statsLabel =
    lang === "pl"
      ? "Statystyka matematyczna"
      : lang === "de"
        ? "Mathematische Statistik"
        : "Mathematical Statistics";

  const sub =
    lang === "pl"
      ? "Sztuczna inteligencja nie ma uczuć ani świadomości: to po prostu wspaniałe narzędzie stworzone przez człowieka"
      : lang === "de"
        ? "KI hat keine Gefuehle oder Bewusstsein: Sie ist ein wunderbares menschliches Werkzeug"
        : "AI has no feelings, consciousness, or conscience: it is a wonderful human-built tool";

  return (
    <svg
      viewBox="0 0 400 240"
      className="diagram-svg"
      aria-label="Pattern Spotter Without Consciousness"
    >
      <rect
        x="30"
        y="30"
        width="340"
        height="180"
        rx="12"
        fill="#f8fafc"
        stroke="#cbd5e1"
        strokeWidth="2"
      />
      <text x="200" y="55" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0f172a">
        {title}
      </text>

      {/* Mathematical matrices */}
      <rect
        x="100"
        y="85"
        width="200"
        height="70"
        rx="8"
        fill="#ffffff"
        stroke="#64748b"
        strokeWidth="2"
      />
      <text x="200" y="112" textAnchor="middle" fontSize="12" fontFamily="monospace" fill="#0284c7">
        [0.82 × 0.14 + 0.91 = 0.98]
      </text>
      <text x="200" y="135" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#64748b">
        {statsLabel}
      </text>

      {step >= 2 && (
        <text x="200" y="198" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#334155">
          {sub}
        </text>
      )}
    </svg>
  );
}
