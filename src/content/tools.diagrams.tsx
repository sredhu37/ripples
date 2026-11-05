import type { DiagramProps } from "../lesson/types";

export function MusclePlowDiagram({ lang, step }: DiagramProps) {
  const title =
    lang === "pl"
      ? "Dawna siła mięśni ludzi i zwierząt"
      : lang === "de"
      ? "Fruehe Muskelkraft von Mensch und Tier"
      : "Early Human and Animal Muscle Power";

  const sub =
    lang === "pl"
      ? "Każde zaorane pole zależało wyłącznie od siły fizycznej mięśni"
      : lang === "de"
      ? "Jeder Acker hing vollstaendig von koerperlicher Muskelkraft ab"
      : "Every field plowed depended entirely on physical muscle strength";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="Muscle and Animal Power">
      <rect x="30" y="30" width="340" height="180" rx="12" fill="#fefce8" stroke="#fef08a" strokeWidth="2" />
      <text x="200" y="60" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#854d0e">
        {title}
      </text>

      {/* Field soil lines */}
      <line x1="60" y1="165" x2="340" y2="165" stroke="#a16207" strokeWidth="4" strokeDasharray="6 4" />
      <line x1="60" y1="180" x2="340" y2="180" stroke="#713f12" strokeWidth="3" />

      {/* Wooden plow */}
      <path d="M120 150 L190 150 L230 115" stroke="#78350f" strokeWidth="6" strokeLinecap="round" />
      <line x1="190" y1="150" x2="210" y2="175" stroke="#451a03" strokeWidth="4" />
      <circle cx="120" cy="150" r="14" fill="#d97706" />

      {/* Draft animal harness frame */}
      <rect x="230" y="110" width="60" height="35" rx="6" fill="#b45309" />
      <circle cx="280" cy="100" r="12" fill="#92400e" />

      {step >= 2 && (
        <text x="200" y="200" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#713f12">
          {sub}
        </text>
      )}
    </svg>
  );
}

export function WindWaterMillDiagram({ lang, step }: DiagramProps) {
  const title =
    lang === "pl"
      ? "Wykorzystanie wiatru i wody"
      : lang === "de"
      ? "Wind und Wasser nutzen"
      : "Harnessing Wind and Water";

  const waterLabel = lang === "pl" ? "Koło wodne" : lang === "de" ? "Wasserrad" : "Waterwheel";
  const windLabel = lang === "pl" ? "Wiatrak" : lang === "de" ? "Windmuehle" : "Windmill";

  const sub =
    lang === "pl"
      ? "Czysta energia, lecz rzeki zamarzały zimą, a wiatr cichł latem"
      : lang === "de"
      ? "Saubere Kraft, doch Wasser fror im Winter und Wind schlief im Sommer ein"
      : "Clean power, but water froze in winter and winds ceased in summer";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="Windmill and Waterwheel">
      <rect x="40" y="30" width="320" height="180" rx="12" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="2" />
      <text x="200" y="60" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#1e40af">
        {title}
      </text>

      {/* Water stream and wheel */}
      <path d="M70 160 Q130 145 190 160" stroke="#38bdf8" strokeWidth="8" fill="none" />
      <circle cx="130" cy="120" r="32" fill="#e0f2fe" stroke="#0284c7" strokeWidth="3" />
      <line x1="130" y1="88" x2="130" y2="152" stroke="#0369a1" strokeWidth="2" />
      <line x1="98" y1="120" x2="162" y2="120" stroke="#0369a1" strokeWidth="2" />
      <line x1="107" y1="97" x2="153" y2="143" stroke="#0369a1" strokeWidth="2" />
      <line x1="107" y1="143" x2="153" y2="97" stroke="#0369a1" strokeWidth="2" />
      <text x="130" y="175" textAnchor="middle" fontSize="10" fill="#0369a1">{waterLabel}</text>

      {/* Windmill tower and blades */}
      <polygon points="255,160 285,160 278,110 262,110" fill="#94a3b8" />
      <circle cx="270" cy="110" r="5" fill="#334155" />
      <line x1="270" y1="82" x2="270" y2="138" stroke="#334155" strokeWidth="3" />
      <line x1="242" y1="110" x2="298" y2="110" stroke="#334155" strokeWidth="3" />
      <text x="270" y="175" textAnchor="middle" fontSize="10" fill="#334155">{windLabel}</text>

      {step >= 2 && (
        <text x="200" y="200" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e3a8a">
          {sub}
        </text>
      )}
    </svg>
  );
}

export function BoilingKettlePistonDiagram({ lang, step }: DiagramProps) {
  const title =
    lang === "pl"
      ? "Rozprężająca siła pary"
      : lang === "de"
      ? "Die Dehnkraft des Wasserdampfs"
      : "The Expanding Force of Steam";

  const boilLabel = lang === "pl" ? "Wrząca woda" : lang === "de" ? "Kochendes Wasser" : "Boiling Water";

  const sub =
    lang === "pl"
      ? "Rozprężająca się para unosi tłok z potężną siłą mechaniczną"
      : lang === "de"
      ? "Aufsteigender Dampf drueckt den Kolben mit grosser Kraft empor"
      : "Expanding steam pushes the piston upwards with mighty mechanical pressure";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="Steam Pressure and Piston">
      <rect x="30" y="30" width="340" height="180" rx="12" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
      <text x="200" y="58" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0f172a">
        {title}
      </text>

      {/* Boiler pot */}
      <rect x="90" y="110" width="80" height="60" rx="8" fill="#475569" stroke="#1e293b" strokeWidth="2" />
      <path d="M100 170 Q130 185 160 170" stroke="#ea580c" strokeWidth="4" fill="none" />
      <text x="130" y="145" textAnchor="middle" fontSize="11" fill="#f8fafc">{boilLabel}</text>

      {/* Steam pipe */}
      <path d="M150 110 L150 90 L220 90 L220 110" stroke="#64748b" strokeWidth="8" fill="none" />

      {/* Piston cylinder */}
      <rect x="200" y="110" width="60" height="60" fill="#e2e8f0" stroke="#475569" strokeWidth="2" />
      <rect x="210" y="125" width="40" height="15" fill="#3b82f6" />
      <line x1="230" y1="125" x2="230" y2="80" stroke="#1d4ed8" strokeWidth="4" />

      {step >= 2 && (
        <text x="200" y="200" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#334155">
          {sub}
        </text>
      )}
    </svg>
  );
}

export function JamesWattEngineDiagram({ lang, step }: DiagramProps) {
  const title =
    lang === "pl"
      ? "Maszyna parowa Jamesa Watta"
      : lang === "de"
      ? "James Watts Dampfmaschine mit Rotationskraft"
      : "James Watt Rotary Steam Engine";

  const sub =
    lang === "pl"
      ? "Zamiana posuwistego ruchu tłoka w ciągły ruch obrotowy"
      : lang === "de"
      ? "Umwandlung von Hubbewegungen in dauerhafte Drehkraft"
      : "Converting reciprocal up and down motion into continuous rotation";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="James Watt Steam Engine">
      <rect x="30" y="30" width="340" height="180" rx="12" fill="#fff7ed" stroke="#fed7aa" strokeWidth="2" />
      <text x="200" y="55" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#9a3412">
        {title}
      </text>

      {/* Walking beam */}
      <line x1="120" y1="95" x2="280" y2="95" stroke="#78350f" strokeWidth="6" strokeLinecap="round" />
      <circle cx="200" cy="95" r="5" fill="#451a03" />

      {/* Flywheel */}
      <circle cx="280" cy="140" r="30" fill="none" stroke="#ea580c" strokeWidth="4" />
      <line x1="280" y1="95" x2="280" y2="140" stroke="#9a3412" strokeWidth="3" />

      {/* Piston */}
      <rect x="105" y="115" width="30" height="45" fill="#cbd5e1" stroke="#475569" strokeWidth="2" />
      <line x1="120" y1="95" x2="120" y2="125" stroke="#334155" strokeWidth="3" />

      {step >= 2 && (
        <text x="200" y="195" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#7c2d12">
          {sub}
        </text>
      )}
    </svg>
  );
}

export function SteamLocomotiveTrainDiagram({ lang, step }: DiagramProps) {
  const title =
    lang === "pl"
      ? "Żelazny koń: Parowozy"
      : lang === "de"
      ? "Das Dampfross: Eisenbahnlokomotiven"
      : "The Iron Horse: Steam Locomotives";

  const sub =
    lang === "pl"
      ? "Przewożenie ton towarów i pasażerów przez kontynenty w kilka godzin"
      : lang === "de"
      ? "Transport von Fracht und Passagieren quer ueber Kontinente"
      : "Carrying tons of cargo and passengers across mountain ranges and continents";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="Steam Locomotive">
      <rect x="30" y="30" width="340" height="180" rx="12" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="2" />
      <text x="200" y="55" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#1e293b">
        {title}
      </text>
      {/* Locomotive body */}
      <rect x="90" y="100" width="140" height="50" rx="4" fill="#334155" />
      <rect x="200" y="80" width="45" height="70" rx="4" fill="#1e293b" />
      {/* Chimney and steam puff */}
      <rect x="110" y="75" width="18" height="25" fill="#0f172a" />
      <circle cx="119" cy="60" r="10" fill="#e2e8f0" opacity="0.8" />
      <circle cx="132" cy="48" r="14" fill="#cbd5e1" opacity="0.6" />
      {/* Wheels */}
      <circle cx="115" cy="155" r="16" fill="#475569" stroke="#0f172a" strokeWidth="3" />
      <circle cx="155" cy="155" r="16" fill="#475569" stroke="#0f172a" strokeWidth="3" />
      <circle cx="195" cy="155" r="16" fill="#475569" stroke="#0f172a" strokeWidth="3" />
      {/* Rail */}
      <line x1="60" y1="172" x2="340" y2="172" stroke="#64748b" strokeWidth="4" />
      {step >= 2 && (
        <text x="200" y="200" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0f172a">
          {sub}
        </text>
      )}
    </svg>
  );
}
