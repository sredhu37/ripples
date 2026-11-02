import type { DiagramProps } from "../lesson/types";

export function CastleDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="#f8fafc" rx="8" />
      <g transform="translate(60, 30)">
        <rect x="20" y="30" width="100" height="100" fill="#e2e8f0" stroke="#64748b" rx="4" />
        <polygon points="10,30 70,-10 130,30" fill="#cbd5e1" stroke="#64748b" />
        <text x="70" y="80" textAnchor="middle" fontSize="30">👑</text>
        <text x="70" y="115" textAnchor="middle" fontSize="11" fontWeight="bold">Castle Island</text>
      </g>
      {step >= 2 && (
        <g transform="translate(200, 50)">
          <rect x="0" y="10" width="140" height="90" fill="#fef08a" stroke="#ca8a04" rx="4" />
          <text x="70" y="35" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#713f12">Hereditary Rule</text>
          <text x="70" y="60" textAnchor="middle" fontSize="10" fill="#854d0e">Leadership passes</text>
          <text x="70" y="75" textAnchor="middle" fontSize="10" fill="#854d0e">within royal family</text>
        </g>
      )}
    </svg>
  );
}

export function TwoKingsDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="#f8fafc" rx="8" />
      <g transform="translate(50, 40)">
        <rect x="0" y="0" width="130" height="120" fill="#f0fdf4" stroke="#86efac" rx="6" />
        <text x="65" y="30" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#166534">King Jasper (Father)</text>
        <text x="65" y="65" textAnchor="middle" fontSize="24">👑</text>
        <text x="65" y="90" textAnchor="middle" fontSize="10" fill="#15803d">Wise and caring</text>
        <text x="65" y="105" textAnchor="middle" fontSize="9" fill="#166534">Built town bridge</text>
      </g>
      {step >= 2 && (
        <g transform="translate(220, 40)">
          <rect x="0" y="0" width="130" height="120" fill="#fef2f2" stroke="#fca5a5" rx="6" />
          <text x="65" y="30" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#991b1b">Prince Leo (Son)</text>
          <text x="65" y="65" textAnchor="middle" fontSize="24">🦚</text>
          <text x="65" y="90" textAnchor="middle" fontSize="10" fill="#b91c1c">Careless ruler</text>
          <text x="65" y="105" textAnchor="middle" fontSize="9" fill="#991b1b">Hunts peacocks only</text>
        </g>
      )}
    </svg>
  );
}

export function ComparisonDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="#f8fafc" rx="8" />
      <g transform="translate(30, 20)">
        <text x="170" y="20" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#334155">
          Two Types of Monarchy
        </text>
        <g transform="translate(10, 40)">
          <rect x="0" y="0" width="150" height="100" fill="#fee2e2" rx="4" />
          <text x="75" y="25" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#991b1b">Absolute Monarchy</text>
          <text x="75" y="50" textAnchor="middle" fontSize="9" fill="#7f1d1d">• King holds total power</text>
          <text x="75" y="70" textAnchor="middle" fontSize="9" fill="#7f1d1d">• No elections or parliament</text>
          <text x="75" y="90" textAnchor="middle" fontSize="9" fill="#7f1d1d">• Depends on birth luck</text>
        </g>
        <g transform="translate(180, 40)">
          <rect x="0" y="0" width="150" height="100" fill="#e0f2fe" rx="4" />
          <text x="75" y="25" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0369a1">Constitutional Monarchy</text>
          <text x="75" y="50" textAnchor="middle" fontSize="9" fill="#0c4a6e">• Monarch is figurehead</text>
          <text x="75" y="70" textAnchor="middle" fontSize="9" fill="#0c4a6e">• Elected parliament rules</text>
          <text x="75" y="90" textAnchor="middle" fontSize="9" fill="#0c4a6e">• Laws protect citizens</text>
        </g>
      </g>
      {step >= 2 && (
        <text x="200" y="175" textAnchor="middle" fontSize="11" fill="#475569">
          Most modern monarchies place real lawmaking power in elected parliaments
        </text>
      )}
    </svg>
  );
}

export function ModernRoleDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="#f8fafc" rx="8" />
      <g transform="translate(50, 40)">
        <circle cx="50" cy="50" r="35" fill="#fef08a" />
        <text x="50" y="45" textAnchor="middle" fontSize="20">👑</text>
        <text x="50" y="70" textAnchor="middle" fontSize="10" fontWeight="bold">Monarch</text>
        <text x="50" y="105" textAnchor="middle" fontSize="9" fill="#713f12">Symbol of Unity</text>
      </g>
      {step >= 2 && (
        <g transform="translate(200, 40)">
          <rect x="0" y="15" width="140" height="70" fill="#bbf7d0" rx="4" />
          <text x="70" y="40" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#166534">Elected Parliament</text>
          <text x="70" y="65" textAnchor="middle" fontSize="9" fill="#14532d">Makes laws, taxes, budget</text>
        </g>
      )}
      {step >= 3 && (
        <text x="200" y="170" textAnchor="middle" fontSize="12" fill="#15803d" fontWeight="bold">
          High Stability: Tradition combined with democratic votes!
        </text>
      )}
    </svg>
  );
}

export function TraditionDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="#f8fafc" rx="8" />
      <g transform="translate(60, 40)">
        <circle cx="50" cy="50" r="35" fill="#e0e7ff" />
        <text x="50" y="55" textAnchor="middle" fontSize="24">🏰</text>
        <text x="50" y="105" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#3730a3">Tradition</text>
      </g>
      {step >= 2 && (
        <g transform="translate(210, 40)">
          <circle cx="50" cy="50" r="35" fill="#dcfce7" />
          <text x="50" y="55" textAnchor="middle" fontSize="24">🗳️</text>
          <text x="50" y="105" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#166534">Elected Voice</text>
        </g>
      )}
    </svg>
  );
}
