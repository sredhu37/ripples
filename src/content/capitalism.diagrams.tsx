import type { DiagramProps } from "../lesson/types";

export function PrivateOwnershipDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="#f8fafc" rx="8" />
      <g transform="translate(60, 40)">
        <rect x="0" y="0" width="120" height="110" fill="#fef3c7" stroke="#f59e0b" rx="6" />
        <text x="60" y="30" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#b45309">Bea's Bakery</text>
        <text x="60" y="60" textAnchor="middle" fontSize="24">🥖🍞</text>
        <text x="60" y="85" textAnchor="middle" fontSize="9" fill="#92400e">Owns brick oven</text>
        <text x="60" y="100" textAnchor="middle" fontSize="9" fill="#92400e">Keeps profits</text>
      </g>
      {step >= 2 && (
        <g transform="translate(220, 40)">
          <rect x="0" y="0" width="120" height="110" fill="#e0f2fe" stroke="#0284c7" rx="6" />
          <text x="60" y="30" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0369a1">Finn's Boat</text>
          <text x="60" y="60" textAnchor="middle" fontSize="24">⛵🐟</text>
          <text x="60" y="85" textAnchor="middle" fontSize="9" fill="#075985">Owns fishing net</text>
          <text x="60" y="100" textAnchor="middle" fontSize="9" fill="#075985">Invents faster tools</text>
        </g>
      )}
    </svg>
  );
}

export function CompetitionDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="#f8fafc" rx="8" />
      <g transform="translate(40, 30)">
        <rect x="0" y="10" width="140" height="110" fill="#fef9c3" stroke="#eab308" rx="6" />
        <text x="70" y="35" textAnchor="middle" fontSize="11" fontWeight="bold">Bea: Sesame Rolls</text>
        <text x="70" y="65" textAnchor="middle" fontSize="20">🥐</text>
        <text x="70" y="90" textAnchor="middle" fontSize="9" fill="#854d0e">Fresh & crunchy</text>
        <text x="70" y="105" textAnchor="middle" fontSize="9" fill="#854d0e">Price: 2 coins</text>

        <rect x="180" y="10" width="140" height="110" fill="#fed7aa" stroke="#f97316" rx="6" />
        <text x="70" y="35" textAnchor="middle" fontSize="11" fontWeight="bold">Leo: Seeded Bread</text>
        <text x="70" y="65" textAnchor="middle" fontSize="20">🍞</text>
        <text x="70" y="90" textAnchor="middle" fontSize="9" fill="#9a3412">Warm & tasty</text>
        <text x="70" y="105" textAnchor="middle" fontSize="9" fill="#9a3412">Price: 2 coins</text>
      </g>
      {step >= 2 && (
        <text x="200" y="170" textAnchor="middle" fontSize="12" fill="#15803d" fontWeight="bold">
          Competition gives customers variety, quality, and fair prices!
        </text>
      )}
    </svg>
  );
}

export function RulesBalanceDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="#f8fafc" rx="8" />
      <g transform="translate(50, 30)">
        <text x="150" y="20" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#334155">
          Social Market Economy (Soziale Marktwirtschaft)
        </text>
        <g transform="translate(0, 40)">
          <rect x="0" y="0" width="135" height="90" fill="#e0f2fe" rx="4" />
          <text x="67" y="25" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0369a1">Market Freedom</text>
          <text x="67" y="45" textAnchor="middle" fontSize="9" fill="#0284c7">• Private initiative</text>
          <text x="67" y="60" textAnchor="middle" fontSize="9" fill="#0284c7">• Innovation & trade</text>
          <text x="67" y="75" textAnchor="middle" fontSize="9" fill="#0284c7">• Customer choice</text>
        </g>
        <g transform="translate(165, 40)">
          <rect x="0" y="0" width="135" height="90" fill="#dcfce7" rx="4" />
          <text x="67" y="25" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#15803d">Social Ground Rules</text>
          <text x="67" y="45" textAnchor="middle" fontSize="9" fill="#166534">• Fair wages & safety</text>
          <text x="67" y="60" textAnchor="middle" fontSize="9" fill="#166534">• Clean environment</text>
          <text x="67" y="75" textAnchor="middle" fontSize="9" fill="#166534">• Anti-monopoly laws</text>
        </g>
      </g>
      {step >= 2 && (
        <text x="200" y="175" textAnchor="middle" fontSize="11" fill="#475569">
          Freedom creates prosperity, and fair rules protect workers and public goods
        </text>
      )}
    </svg>
  );
}

export function SummaryDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="#f8fafc" rx="8" />
      <g transform="translate(60, 30)">
        <circle cx="50" cy="50" r="35" fill="#fef08a" />
        <text x="50" y="45" textAnchor="middle" fontSize="20">💡</text>
        <text x="50" y="70" textAnchor="middle" fontSize="10" fontWeight="bold">Innovation</text>
        
        <circle cx="140" cy="50" r="35" fill="#bae6fd" />
        <text x="140" y="45" textAnchor="middle" fontSize="20">🤝</text>
        <text x="140" y="70" textAnchor="middle" fontSize="10" fontWeight="bold">Fair Trade</text>

        <circle cx="230" cy="50" r="35" fill="#bbf7d0" />
        <text x="230" y="45" textAnchor="middle" fontSize="20">⚖️</text>
        <text x="230" y="70" textAnchor="middle" fontSize="10" fontWeight="bold">Protection</text>
      </g>
      {step >= 2 && (
        <text x="200" y="150" textAnchor="middle" fontSize="13" fill="#15803d" fontWeight="bold">
          Free enterprise works best with strong and fair community rules!
        </text>
      )}
    </svg>
  );
}

export function ProsperityDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="#f8fafc" rx="8" />
      <g transform="translate(50, 40)">
        <circle cx="60" cy="50" r="35" fill="#fef08a" />
        <text x="60" y="55" textAnchor="middle" fontSize="24">🌾🍞</text>
        <text x="60" y="105" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#854d0e">Abundance</text>
      </g>
      {step >= 2 && (
        <g transform="translate(210, 40)">
          <rect x="0" y="15" width="140" height="70" fill="#dcfce7" rx="6" />
          <text x="70" y="45" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#166534">Shared Prosperity</text>
          <text x="70" y="65" textAnchor="middle" fontSize="9" fill="#15803d">Fair rules lift everyone</text>
        </g>
      )}
    </svg>
  );
}
