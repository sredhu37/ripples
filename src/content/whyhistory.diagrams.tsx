import type { DiagramProps } from "../lesson/types";

export function MagnifyingGlassArchiveDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="Magnifying Glass and Ancient Archive">
      <defs>
        <radialGradient id="lensGlass" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#e0f2fe" />
          <stop offset="100%" stopColor="#bae6fd" />
        </radialGradient>
      </defs>
      <rect x="30" y="30" width="340" height="180" rx="12" fill="#fffbeb" stroke="#fde68a" strokeWidth="2" />
      <text x="200" y="60" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#92400e">
        The Historian's Archive
      </text>
      {/* Ancient Book */}
      <rect x="90" y="85" width="130" height="85" rx="6" fill="#78350f" stroke="#451a03" strokeWidth="2" />
      <rect x="100" y="95" width="110" height="65" fill="#fef3c7" />
      <line x1="110" y1="110" x2="195" y2="110" stroke="#b45309" strokeWidth="2" />
      <line x1="110" y1="125" x2="195" y2="125" stroke="#b45309" strokeWidth="2" />
      <line x1="110" y1="140" x2="175" y2="140" stroke="#b45309" strokeWidth="2" />
      {/* Magnifying Glass */}
      <circle cx="250" cy="120" r="32" fill="url(#lensGlass)" stroke="#0284c7" strokeWidth="4" />
      <line x1="275" y1="145" x2="310" y2="180" stroke="#0369a1" strokeWidth="6" strokeLinecap="round" />
      {step >= 2 && (
        <text x="200" y="195" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#78350f">
          Examining genuine letters, treaties, and diaries from the past
        </text>
      )}
    </svg>
  );
}

export function PrimarySourcesTapestryDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="Primary Evidence Clues">
      <rect x="40" y="30" width="320" height="180" rx="12" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
      <text x="200" y="55" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0f172a">
        Primary Evidence: Voices from History
      </text>
      <g transform="translate(60, 75)">
        <rect x="0" y="0" width="85" height="50" rx="6" fill="#ffffff" stroke="#94a3b8" />
        <text x="42" y="24" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e293b">Letters</text>
        <text x="42" y="40" textAnchor="middle" fontSize="10" fill="#64748b">Handwritten</text>

        <rect x="100" y="0" width="85" height="50" rx="6" fill="#ffffff" stroke="#94a3b8" />
        <text x="142" y="24" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e293b">Treaties</text>
        <text x="142" y="40" textAnchor="middle" fontSize="10" fill="#64748b">Signed Seals</text>

        <rect x="200" y="0" width="85" height="50" rx="6" fill="#ffffff" stroke="#94a3b8" />
        <text x="242" y="24" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e293b">Tools</text>
        <text x="242" y="40" textAnchor="middle" fontSize="10" fill="#64748b">Real Objects</text>
      </g>
      {step >= 2 && (
        <text x="200" y="185" textAnchor="middle" fontSize="11" fill="#334155">
          History relies on verifiable evidence rather than hearsay
        </text>
      )}
    </svg>
  );
}

export function MemorialStolpersteineDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="Memorial Culture and Commemoration">
      <rect x="30" y="30" width="340" height="180" rx="12" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="2" />
      <text x="200" y="60" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#1e293b">
        Memorial Culture (Erinnerungskultur)
      </text>
      {/* Brass Commemorative Plate */}
      <rect x="140" y="80" width="120" height="75" rx="6" fill="#fef08a" stroke="#ca8a04" strokeWidth="2" />
      <text x="200" y="105" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#713f12">HIER WOHNTE</text>
      <text x="200" y="125" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#854d0e">NAME & DATUM</text>
      <text x="200" y="142" textAnchor="middle" fontSize="10" fill="#a16207">NIE WIEDER</text>
      {step >= 2 && (
        <text x="200" y="195" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0f172a">
          Facing the past honestly makes democratic values resilient
        </text>
      )}
    </svg>
  );
}

export function CompassFutureCompassDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="The Compass for the Future">
      <rect x="40" y="30" width="320" height="180" rx="12" fill="#ecfdf5" stroke="#a7f3d0" strokeWidth="2" />
      <text x="200" y="60" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#065f46">
        History is a Compass for the Future
      </text>
      {/* Compass Dial */}
      <circle cx="200" cy="120" r="40" fill="#ffffff" stroke="#059669" strokeWidth="3" />
      <polygon points="200,90 207,120 193,120" fill="#ef4444" />
      <polygon points="200,150 207,120 193,120" fill="#64748b" />
      <circle cx="200" cy="120" r="4" fill="#0f172a" />
      {step >= 2 && (
        <text x="200" y="195" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#047857">
          Knowing where we came from helps us choose wise paths forward
        </text>
      )}
    </svg>
  );
}

export function InterlockingGenerationsDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="Interlocking Generations in Harmony">
      <rect x="30" y="30" width="340" height="180" rx="12" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="2" />
      <text x="200" y="60" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#1e40af">
        Generations Building a Shared Tomorrow
      </text>
      {/* Handshake of generations */}
      <circle cx="150" cy="115" r="26" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
      <text x="150" y="122" textAnchor="middle" fontSize="16">👴</text>
      <circle cx="250" cy="115" r="26" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
      <text x="250" y="122" textAnchor="middle" fontSize="16">👧</text>
      <path d="M176 115 L224 115" stroke="#2563eb" strokeWidth="4" />
      {step >= 2 && (
        <text x="200" y="195" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1d4ed8">
          The future belongs to curious, compassionate minds!
        </text>
      )}
    </svg>
  );
}
