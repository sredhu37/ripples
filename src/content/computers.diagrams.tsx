import type { DiagramProps } from "../lesson/types";

export function AbacusGearsDiagram({ lang, step }: DiagramProps) {
  const title =
    lang === "pl"
      ? "Wczesne narzędzia liczące: liczydło"
      : lang === "de"
        ? "Fruehe Rechenhilfen: Der Abakus"
        : "Early Counting Tools: The Abacus";

  const sub =
    lang === "pl"
      ? "Zanim powstały ekrany, ludzie liczyli za pomocą koralików na prętach i mechanicznych kół zębatych"
      : lang === "de"
        ? "Lange vor Bildschirmen rechneten Menschen mit Perlen und Zahnraedern"
        : "Before screens existed, humans calculated numbers with beads and mechanical gears";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="Counting Abacus and Gears">
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
      <text x="200" y="60" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#86198f">
        {title}
      </text>

      {/* Abacus frame */}
      <rect x="100" y="85" width="200" height="90" rx="6" fill="#701a75" />
      <rect x="110" y="95" width="180" height="70" rx="3" fill="#fdf4ff" />
      <line x1="110" y1="115" x2="290" y2="115" stroke="#701a75" strokeWidth="3" />

      {/* Rods and beads */}
      {[130, 165, 200, 235, 270].map((x) => (
        <g key={x}>
          <line x1={x} y1="95" x2={x} y2="165" stroke="#a21caf" strokeWidth="2" />
          {/* Upper bead */}
          <circle cx={x} cy="105" r="6" fill="#c026d3" />
          {/* Lower beads */}
          <circle cx={x} cy="130" r="6" fill="#c026d3" />
          <circle cx={x} cy="145" r="6" fill="#c026d3" />
        </g>
      ))}

      {step >= 2 && (
        <text x="200" y="200" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#701a75">
          {sub}
        </text>
      )}
    </svg>
  );
}

export function AdaLovelaceEngineDiagram({ lang, step }: DiagramProps) {
  const title =
    lang === "pl"
      ? "Ada Lovelace: pierwszy algorytm"
      : lang === "de"
        ? "Ada Lovelace: Der erste Algorithmus"
        : "Ada Lovelace: The First Algorithm";

  const step1 = lang === "pl" ? "1. Wczytaj" : lang === "de" ? "1. Laden" : "1. Load";
  const step2 = lang === "pl" ? "2. Dodaj" : lang === "de" ? "2. Addieren" : "2. Add";
  const step3 = lang === "pl" ? "3. Drukuj" : lang === "de" ? "3. Drucken" : "3. Print";

  const sub =
    lang === "pl"
      ? "Lovelace zrozumiała, że maszyny mogą przetwarzać liczby, nuty i idee według ściśle określonych reguł"
      : lang === "de"
        ? "Lovelace erkannte, dass Maschinen Regeln fuer Zahlen, Noten und Ideen ausfuehren koennen"
        : "Lovelace realized machines could follow rules to manipulate numbers, music, and ideas";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="Ada Lovelace and Algorithms">
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
      <text x="200" y="58" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#1e40af">
        {title}
      </text>

      {/* Punched paper card */}
      <rect
        x="90"
        y="90"
        width="130"
        height="70"
        rx="4"
        fill="#f8fafc"
        stroke="#64748b"
        strokeWidth="2"
      />
      {[110, 130, 150, 170, 190].map((x) => (
        <g key={x}>
          <circle cx={x} cy="105" r="4" fill="#0f172a" />
          <circle cx={x} cy="120" r="4" fill={x === 130 || x === 170 ? "#0f172a" : "#cbd5e1"} />
          <circle cx={x} cy="135" r="4" fill={x === 150 ? "#0f172a" : "#cbd5e1"} />
        </g>
      ))}

      {/* Step by step instruction flow */}
      <rect x="250" y="85" width="85" height="24" rx="4" fill="#dbeafe" stroke="#3b82f6" />
      <text x="292" y="101" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1e40af">
        {step1}
      </text>
      <rect x="250" y="115" width="85" height="24" rx="4" fill="#dbeafe" stroke="#3b82f6" />
      <text x="292" y="131" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1e40af">
        {step2}
      </text>
      <rect x="250" y="145" width="85" height="24" rx="4" fill="#dbeafe" stroke="#3b82f6" />
      <text x="292" y="161" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1e40af">
        {step3}
      </text>

      {step >= 2 && (
        <text x="200" y="200" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e3a8a">
          {sub}
        </text>
      )}
    </svg>
  );
}

export function KonradZuseZ3Diagram({ lang, step }: DiagramProps) {
  const title =
    lang === "pl"
      ? "Konrad Zuse: komputer Z3 (Berlin, 1941)"
      : lang === "de"
        ? "Konrad Zuse Z3 (Berlin, 1941)"
        : "Konrad Zuse Z3 (Berlin, 1941)";

  const sub =
    lang === "pl"
      ? "Tysiące klikających przekaźników telefonicznych stworzyło pierwszy programowalny komputer"
      : lang === "de"
        ? "Tausende klackende Telefonrelais bildeten den ersten programmierbaren Rechner der Welt"
        : "Thousands of clicking telephone relays formed the world first programmable computer";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="Konrad Zuse Z3 Computer">
      <rect
        x="30"
        y="30"
        width="340"
        height="180"
        rx="12"
        fill="#f1f5f9"
        stroke="#cbd5e1"
        strokeWidth="2"
      />
      <text x="200" y="55" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0f172a">
        {title}
      </text>

      {/* Relay cabinet */}
      <rect x="110" y="80" width="180" height="90" rx="6" fill="#334155" />
      {/* Grid of mechanical relays */}
      {[130, 165, 200, 235, 270].map((x) =>
        [100, 125, 150].map((y) => (
          <g key={`${x}-${y}`}>
            <rect
              x={x - 10}
              y={y - 8}
              width="20"
              height="16"
              rx="2"
              fill="#475569"
              stroke="#94a3b8"
            />
            <circle cx={x} cy={y} r="3" fill="#38bdf8" />
          </g>
        )),
      )}

      {step >= 2 && (
        <text x="200" y="195" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e293b">
          {sub}
        </text>
      )}
    </svg>
  );
}

export function TransistorSwitchesDiagram({ lang, step }: DiagramProps) {
  const title =
    lang === "pl"
      ? "Tranzystory: miniaturowe przełączniki"
      : lang === "de"
        ? "Transistoren: Winzige elektronische Schalter"
        : "Transistors: Tiny Electronic Switches";

  const offLabel = lang === "pl" ? "WYŁ = 0" : lang === "de" ? "AUS = 0" : "OFF = 0";
  const onLabel = lang === "pl" ? "WŁ = 1" : lang === "de" ? "EIN = 1" : "ON = 1";

  const sub =
    lang === "pl"
      ? "Miliardy mikroskopijnych przełączników włączają się i wyłączają miliony razy na sekundę"
      : lang === "de"
        ? "Milliarden mikroskopischer Schalter schalten millionenfach pro Sekunde um"
        : "Billions of microscopic switches turn on and off millions of times per second";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="Microscopic Transistor Switches">
      <rect
        x="30"
        y="30"
        width="340"
        height="180"
        rx="12"
        fill="#ecfdf5"
        stroke="#a7f3d0"
        strokeWidth="2"
      />
      <text x="200" y="55" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#065f46">
        {title}
      </text>

      {/* Switch OFF = 0 */}
      <g transform="translate(100, 85)">
        <rect
          x="0"
          y="0"
          width="80"
          height="75"
          rx="8"
          fill="#ffffff"
          stroke="#cbd5e1"
          strokeWidth="2"
        />
        <line x1="15" y1="50" x2="35" y2="50" stroke="#64748b" strokeWidth="3" />
        <line x1="35" y1="50" x2="60" y2="30" stroke="#ef4444" strokeWidth="3" />
        <line x1="60" y1="50" x2="70" y2="50" stroke="#64748b" strokeWidth="3" />
        <text x="40" y="24" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#64748b">
          {offLabel}
        </text>
      </g>

      {/* Switch ON = 1 */}
      <g transform="translate(220, 85)">
        <rect
          x="0"
          y="0"
          width="80"
          height="75"
          rx="8"
          fill="#ffffff"
          stroke="#10b981"
          strokeWidth="2"
        />
        <line x1="15" y1="50" x2="35" y2="50" stroke="#10b981" strokeWidth="3" />
        <line x1="35" y1="50" x2="60" y2="50" stroke="#10b981" strokeWidth="3" />
        <line x1="60" y1="50" x2="70" y2="50" stroke="#10b981" strokeWidth="3" />
        <text x="40" y="24" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#047857">
          {onLabel}
        </text>
      </g>

      {step >= 2 && (
        <text x="200" y="195" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#064e3b">
          {sub}
        </text>
      )}
    </svg>
  );
}

export function DigitalPixelsAudioDiagram({ lang, step }: DiagramProps) {
  const title =
    lang === "pl"
      ? "Piksele, dźwięki i gry z zer i jedynek"
      : lang === "de"
        ? "Pixel, Musik und Spiele aus 0 und 1"
        : "Pixels, Songs, and Games from 0s and 1s";

  const screenLabel =
    lang === "pl" ? "0110 1100 = Ekran" : lang === "de" ? "0110 1100 = Bild" : "0110 1100 = Screen";
  const soundLabel =
    lang === "pl" ? "1001 0011 = Dźwięk" : lang === "de" ? "1001 0011 = Ton" : "1001 0011 = Sound";
  const letterLabel =
    lang === "pl"
      ? "1110 0101 = Litera"
      : lang === "de"
        ? "1110 0101 = Buchstabe"
        : "1110 0101 = Letter";

  const sub =
    lang === "pl"
      ? "Każdy film, gra wideo i wiadomość w telefonie powstają z prostych bitów binarnych"
      : lang === "de"
        ? "Jedes Video, Computerspiel und jede Nachricht wird aus einfachen Bits erzeugt"
        : "Every movie, video game, and message is painted using simple binary bits";

  return (
    <svg
      viewBox="0 0 400 240"
      className="diagram-svg"
      aria-label="Digital Pictures and Music from Binary"
    >
      <rect
        x="30"
        y="30"
        width="340"
        height="180"
        rx="12"
        fill="#faf5ff"
        stroke="#e9d5ff"
        strokeWidth="2"
      />
      <text x="200" y="55" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#6b21a8">
        {title}
      </text>

      {/* Pixel heart icon in 6x6 grid */}
      <g transform="translate(100, 80)">
        {[
          [0, 1, 1, 0, 1, 1],
          [1, 1, 1, 1, 1, 1],
          [1, 1, 1, 1, 1, 1],
          [0, 1, 1, 1, 1, 0],
          [0, 0, 1, 1, 0, 0],
          [0, 0, 0, 0, 0, 0],
        ].map((row, r) =>
          row.map((val, c) => (
            <rect
              key={`${r}-${c}`}
              x={c * 12}
              y={r * 12}
              width="10"
              height="10"
              rx="1"
              fill={val ? "#a855f7" : "#e9d5ff"}
            />
          )),
        )}
      </g>

      {/* Binary numbers text */}
      <text x="250" y="95" fontSize="11" fontFamily="monospace" fill="#7e22ce">
        {screenLabel}
      </text>
      <text x="250" y="115" fontSize="11" fontFamily="monospace" fill="#7e22ce">
        {soundLabel}
      </text>
      <text x="250" y="135" fontSize="11" fontFamily="monospace" fill="#7e22ce">
        {letterLabel}
      </text>

      {step >= 2 && (
        <text x="200" y="195" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#581c87">
          {sub}
        </text>
      )}
    </svg>
  );
}
