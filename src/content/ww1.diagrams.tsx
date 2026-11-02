import type { DiagramProps } from "../lesson/types";

export function CompetingFleetsDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="Competing Fleets and Armies">
      <rect x="30" y="30" width="340" height="180" rx="12" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
      <text x="200" y="60" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0f172a">
        Europe in 1914: The Arms Race
      </text>
      {/* Ships */}
      <rect x="70" y="90" width="100" height="40" rx="4" fill="#64748b" />
      <line x1="120" y1="65" x2="120" y2="90" stroke="#334155" strokeWidth="3" />
      <text x="120" y="150" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#475569">Battleships</text>

      <rect x="230" y="90" width="100" height="40" rx="4" fill="#64748b" />
      <line x1="280" y1="65" x2="280" y2="90" stroke="#334155" strokeWidth="3" />
      <text x="280" y="150" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#475569">Artillery</text>
      {step >= 2 && (
        <text x="200" y="195" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0f172a">
          Nations built massive weapons, believing strength meant safety
        </text>
      )}
    </svg>
  );
}

export function AllianceBlocksDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="Two Rigid Alliance Blocs">
      <rect x="40" y="30" width="320" height="180" rx="12" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="2" />
      <text x="200" y="55" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1e3a8a">
        The Two Alliance Blocs
      </text>
      {/* Central Powers */}
      <rect x="60" y="80" width="115" height="70" rx="8" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" />
      <text x="117" y="105" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#b91c1c">Central Powers</text>
      <text x="117" y="125" textAnchor="middle" fontSize="10" fill="#7f1d1d">Germany & Austria</text>
      {/* Allied Powers */}
      <rect x="225" y="80" width="115" height="70" rx="8" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
      <text x="282" y="105" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e40af">Allied Powers</text>
      <text x="282" y="125" textAnchor="middle" fontSize="10" fill="#1e3a8a">France, UK, Russia</text>
      {/* Tripwire */}
      <line x1="175" y1="115" x2="225" y2="115" stroke="#ef4444" strokeWidth="3" strokeDasharray="4 4" />
      {step >= 2 && (
        <text x="200" y="185" textAnchor="middle" fontSize="11" fill="#475569">
          Secret mutual defense treaties formed an interconnected trap
        </text>
      )}
    </svg>
  );
}

export function DominoTumbleDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="Domino Chain Reaction">
      <rect x="30" y="30" width="340" height="180" rx="12" fill="#fff7ed" stroke="#fed7aa" strokeWidth="2" />
      <text x="200" y="60" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#c2410c">
        The Domino Cascade (August 1914)
      </text>
      {/* Tilted dominoes */}
      <rect x="60" y="90" width="18" height="65" rx="3" fill="#ea580c" transform="rotate(20 60 90)" />
      <rect x="110" y="95" width="18" height="65" rx="3" fill="#ea580c" transform="rotate(25 110 95)" />
      <rect x="160" y="100" width="18" height="65" rx="3" fill="#ea580c" transform="rotate(30 160 100)" />
      <rect x="210" y="105" width="18" height="65" rx="3" fill="#ea580c" transform="rotate(35 210 105)" />
      <rect x="260" y="110" width="18" height="65" rx="3" fill="#ea580c" transform="rotate(40 260 110)" />
      <rect x="310" y="115" width="18" height="65" rx="3" fill="#ea580c" transform="rotate(45 310 115)" />
      {step >= 2 && (
        <text x="200" y="195" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#9a3412">
          One spark caused railway mobilization orders across Europe
        </text>
      )}
    </svg>
  );
}

export function RuinedBridgeArmisticeDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="11 November 1918 Armistice">
      <rect x="40" y="30" width="320" height="180" rx="12" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="2" />
      <text x="200" y="60" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#334155">
        The Armistice: November 1918
      </text>
      {/* Broken bridge */}
      <rect x="70" y="120" width="90" height="20" rx="4" fill="#64748b" />
      <rect x="240" y="120" width="90" height="20" rx="4" fill="#64748b" />
      {/* River below */}
      <rect x="50" y="150" width="300" height="30" fill="#38bdf8" opacity="0.4" />
      {step >= 2 && (
        <text x="200" y="195" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0f172a">
          The guns fell silent, leaving empty fields and a yearning for peace
        </text>
      )}
    </svg>
  );
}

export function LeagueOfNationsGenevaDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="League of Nations in Geneva">
      <rect x="30" y="30" width="340" height="180" rx="12" fill="#f0fdf4" stroke="#86efac" strokeWidth="2" />
      <text x="200" y="60" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#166534">
        The League of Nations (Voelkerbund)
      </text>
      {/* Round council table */}
      <circle cx="200" cy="120" r="45" fill="#dcfce7" stroke="#15803d" strokeWidth="2" />
      <text x="200" y="125" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#14532d">Geneva</text>
      {/* Diplomat chairs */}
      {[0, 60, 120, 180, 240, 300].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        const cx = 200 + 60 * Math.cos(rad);
        const cy = 120 + 60 * Math.sin(rad);
        return <circle key={deg} cx={cx} cy={cy} r="10" fill="#3b82f6" />;
      })}
      {step >= 2 && (
        <text x="200" y="200" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#166534">
          Replacing secret military traps with open dialogue
        </text>
      )}
    </svg>
  );
}
