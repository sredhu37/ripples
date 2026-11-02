import type { DiagramProps } from "../lesson/types";

export function CharterDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="#f8fafc" rx="8" />
      <g transform="translate(60, 30)">
        <rect x="0" y="10" width="120" height="150" fill="#fef08a" stroke="#ca8a04" strokeWidth="2" rx="6" />
        <text x="60" y="40" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#713f12">
          Town Charter
        </text>
        <line x1="20" y1="55" x2="100" y2="55" stroke="#a16207" strokeWidth="1" />
        <text x="20" y="75" fontSize="10" fill="#854d0e">• Equal Rights</text>
        <text x="20" y="95" fontSize="10" fill="#854d0e">• Free Speech</text>
        <text x="20" y="115" fontSize="10" fill="#854d0e">• Open Council</text>
        <text x="20" y="135" fontSize="10" fill="#854d0e">• Fair Courts</text>
      </g>
      {step >= 2 && (
        <g transform="translate(210, 50)">
          <circle cx="40" cy="40" r="30" fill="#bfdbfe" />
          <text x="40" y="45" textAnchor="middle" fontSize="12" fontWeight="bold">Leader</text>
          <text x="40" y="90" textAnchor="middle" fontSize="11" fill="#1e40af">Bound by Laws</text>
          
          <circle cx="120" cy="40" r="30" fill="#bbf7d0" />
          <text x="120" y="45" textAnchor="middle" fontSize="12" fontWeight="bold">Citizen</text>
          <text x="120" y="90" textAnchor="middle" fontSize="11" fill="#166534">Protected by Laws</text>
        </g>
      )}
    </svg>
  );
}

export function DebateProposalDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="#f8fafc" rx="8" />
      <g transform="translate(50, 40)">
        <rect x="0" y="10" width="130" height="120" fill="#f1f5f9" stroke="#cbd5e1" rx="6" />
        <text x="65" y="35" textAnchor="middle" fontSize="12" fontWeight="bold">Leader's Idea</text>
        <text x="65" y="70" textAnchor="middle" fontSize="24">🏛️</text>
        <text x="65" y="105" textAnchor="middle" fontSize="10" fill="#475569">Giant Clock Tower</text>
      </g>
      {step >= 2 && (
        <g transform="translate(210, 40)">
          <rect x="0" y="10" width="140" height="120" fill="#f0fdf4" stroke="#86efac" rx="6" />
          <text x="70" y="35" textAnchor="middle" fontSize="12" fontWeight="bold">Citizen Response</text>
          <text x="70" y="65" textAnchor="middle" fontSize="10" fill="#15803d">"The school roof leaks!"</text>
          <text x="70" y="90" textAnchor="middle" fontSize="10" fill="#15803d">"We need fair priorities!"</text>
          <text x="70" y="115" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#166534">Open Town Hall</text>
        </g>
      )}
    </svg>
  );
}

export function CompromiseDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="#f8fafc" rx="8" />
      <g transform="translate(50, 30)">
        <text x="150" y="20" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#334155">
          Finding the Balanced Compromise
        </text>
        <g transform="translate(10, 40)">
          <rect x="0" y="10" width="80" height="70" fill="#e0f2fe" rx="4" />
          <text x="40" y="45" textAnchor="middle" fontSize="11" fontWeight="bold">Lighthouse</text>
          <text x="40" y="65" textAnchor="middle" fontSize="10" fill="#0369a1">4 tokens</text>
        </g>
        <g transform="translate(100, 40)">
          <rect x="0" y="10" width="80" height="70" fill="#fef9c3" rx="4" />
          <text x="40" y="45" textAnchor="middle" fontSize="11" fontWeight="bold">Grain Store</text>
          <text x="40" y="65" textAnchor="middle" fontSize="10" fill="#854d0e">3 tokens</text>
        </g>
        <g transform="translate(190, 40)">
          <rect x="0" y="10" width="80" height="70" fill="#dcfce7" rx="4" />
          <text x="40" y="45" textAnchor="middle" fontSize="11" fontWeight="bold">Town Park</text>
          <text x="40" y="65" textAnchor="middle" fontSize="10" fill="#166534">3 tokens</text>
        </g>
      </g>
      {step >= 2 && (
        <g transform="translate(100, 150)">
          <rect x="0" y="0" width="200" height="30" fill="#22c55e" rx="4" />
          <text x="100" y="20" textAnchor="middle" fontSize="12" fill="#ffffff" fontWeight="bold">
            All Groups Agree: Compromise!
          </text>
        </g>
      )}
    </svg>
  );
}

export function PillarsDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="#f8fafc" rx="8" />
      <g transform="translate(30, 20)">
        <text x="170" y="25" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#334155">
          Pillars of Democratic Governance
        </text>
        <g transform="translate(10, 50)">
          <rect x="0" y="0" width="90" height="80" fill="#e0e7ff" rx="4" />
          <text x="45" y="30" textAnchor="middle" fontSize="11" fontWeight="bold">1. Free Speech</text>
          <text x="45" y="55" textAnchor="middle" fontSize="9" fill="#3730a3">Open debate</text>
        </g>
        <g transform="translate(115, 50)">
          <rect x="0" y="0" width="90" height="80" fill="#e0e7ff" rx="4" />
          <text x="45" y="30" textAnchor="middle" fontSize="11" fontWeight="bold">2. Rule of Law</text>
          <text x="45" y="55" textAnchor="middle" fontSize="9" fill="#3730a3">Same rules for all</text>
        </g>
        <g transform="translate(220, 50)">
          <rect x="0" y="0" width="110" height="80" fill="#e0e7ff" rx="4" />
          <text x="55" y="30" textAnchor="middle" fontSize="11" fontWeight="bold">3. Error Correction</text>
          <text x="55" y="55" textAnchor="middle" fontSize="9" fill="#3730a3">Vote out bad ideas</text>
        </g>
      </g>
      {step >= 2 && (
        <text x="200" y="165" textAnchor="middle" fontSize="12" fill="#64748b">
          Power stays with the citizens through institutions and regular elections
        </text>
      )}
    </svg>
  );
}

export function TrustDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="#f8fafc" rx="8" />
      <g transform="translate(50, 40)">
        <circle cx="60" cy="50" r="35" fill="#dcfce7" />
        <text x="60" y="55" textAnchor="middle" fontSize="24">🤝</text>
        <text x="60" y="105" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#166534">Peaceful Trust</text>
      </g>
      {step >= 2 && (
        <g transform="translate(210, 40)">
          <rect x="0" y="15" width="140" height="70" fill="#e0f2fe" rx="6" />
          <text x="70" y="45" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0369a1">Shared Progress</text>
          <text x="70" y="65" textAnchor="middle" fontSize="9" fill="#0284c7">Working together peacefully</text>
        </g>
      )}
    </svg>
  );
}
