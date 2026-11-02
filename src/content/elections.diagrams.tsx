import type { DiagramProps } from "../lesson/types";

export function TimberDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="#f8fafc" rx="8" />
      <g transform="translate(50, 40)">
        <text x="0" y="20" fontSize="16" fontWeight="bold" fill="#334155">
          Ripple Town Projects
        </text>
        <rect x="0" y="40" width="120" height="80" rx="6" fill="#e2e8f0" stroke="#94a3b8" />
        <text x="60" y="85" textAnchor="middle" fontSize="14" fill="#1e293b">
          Harbor Pier
        </text>
        <text x="60" y="105" textAnchor="middle" fontSize="12" fill="#64748b">
          (Moss)
        </text>
        
        <rect x="160" y="40" width="120" height="80" rx="6" fill="#e2e8f0" stroke="#94a3b8" />
        <text x="220" y="85" textAnchor="middle" fontSize="14" fill="#1e293b">
          Market Pavilion
        </text>
        <text x="220" y="105" textAnchor="middle" fontSize="12" fill="#64748b">
          (Pip)
        </text>
      </g>
      {step >= 2 && (
        <g transform="translate(140, 150)">
          <text x="50" y="20" textAnchor="middle" fontSize="14" fill="#0284c7" fontWeight="bold">
            Limited Timber: Choose One!
          </text>
        </g>
      )}
    </svg>
  );
}

export function DebateDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="#f8fafc" rx="8" />
      <g transform="translate(60, 50)">
        <circle cx="40" cy="50" r="30" fill="#bae6fd" />
        <text x="40" y="55" textAnchor="middle" fontSize="14">Moss</text>
        <text x="40" y="100" textAnchor="middle" fontSize="12" fill="#0369a1">"Fishing boats need a safe pier!"</text>
      </g>
      {step >= 2 && (
        <g transform="translate(220, 50)">
          <circle cx="40" cy="50" r="30" fill="#fed7aa" />
          <text x="40" y="55" textAnchor="middle" fontSize="14">Pip</text>
          <text x="40" y="100" textAnchor="middle" fontSize="12" fill="#c2410c">"Families need shaded market stalls!"</text>
        </g>
      )}
    </svg>
  );
}

export function BoothDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="#f8fafc" rx="8" />
      <g transform="translate(50, 30)">
        <rect x="0" y="20" width="100" height="120" fill="#cbd5e1" rx="4" />
        <rect x="10" y="30" width="80" height="100" fill="#f1f5f9" />
        <text x="50" y="70" textAnchor="middle" fontSize="12" fill="#475569">Private</text>
        <text x="50" y="90" textAnchor="middle" fontSize="12" fill="#475569">Voting Booth</text>
      </g>
      {step >= 2 && (
        <g transform="translate(180, 50)">
          <rect x="0" y="20" width="80" height="80" fill="#fef08a" stroke="#ca8a04" strokeWidth="2" rx="4" />
          <text x="40" y="55" textAnchor="middle" fontSize="12" fontWeight="bold">Paper Ballot</text>
          <text x="40" y="75" textAnchor="middle" fontSize="10" fill="#854d0e">Secret Choice</text>
        </g>
      )}
      {step >= 3 && (
        <g transform="translate(290, 50)">
          <rect x="0" y="20" width="70" height="90" fill="#bbf7d0" stroke="#16a34a" rx="4" />
          <rect x="25" y="15" width="20" height="5" fill="#15803d" />
          <text x="35" y="65" textAnchor="middle" fontSize="12" fontWeight="bold">Ballot Box</text>
        </g>
      )}
    </svg>
  );
}

export function CountDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="#f8fafc" rx="8" />
      <g transform="translate(50, 40)">
        <text x="150" y="20" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#334155">
          Public Vote Count
        </text>
        <rect x="20" y="50" width="110" height="60" fill="#e0f2fe" rx="4" />
        <text x="75" y="75" textAnchor="middle" fontSize="12" fill="#0369a1">Pier Votes</text>
        <text x="75" y="95" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#0284c7">3</text>

        <rect x="170" y="50" width="110" height="60" fill="#ffedd5" rx="4" />
        <text x="225" y="75" textAnchor="middle" fontSize="12" fill="#c2410c">Pavilion Votes</text>
        <text x="225" y="95" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#ea580c">2</text>
      </g>
      {step >= 2 && (
        <text x="200" y="170" textAnchor="middle" fontSize="14" fill="#16a34a" fontWeight="bold">
          Harbor Pier Wins: Decision Respected!
        </text>
      )}
    </svg>
  );
}

export function PrinciplesDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="#f8fafc" rx="8" />
      <g transform="translate(30, 30)">
        <text x="170" y="20" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#334155">
          Democratic Election Principles
        </text>
        <circle cx="50" cy="80" r="35" fill="#e0f2fe" />
        <text x="50" y="80" textAnchor="middle" fontSize="10" fontWeight="bold">Equal</text>
        <text x="50" y="95" textAnchor="middle" fontSize="9" fill="#0369a1">1 person, 1 vote</text>

        <circle cx="170" cy="80" r="35" fill="#fef9c3" />
        <text x="170" y="80" textAnchor="middle" fontSize="10" fontWeight="bold">Secret</text>
        <text x="170" y="95" textAnchor="middle" fontSize="9" fill="#854d0e">Private booth</text>

        <circle cx="290" cy="80" r="35" fill="#dcfce7" />
        <text x="290" y="80" textAnchor="middle" fontSize="10" fontWeight="bold">Free</text>
        <text x="290" y="95" textAnchor="middle" fontSize="9" fill="#15803d">No pressure</text>
      </g>
      {step >= 2 && (
        <text x="200" y="170" textAnchor="middle" fontSize="13" fill="#475569">
          Peaceful error correction and shared respect
        </text>
      )}
    </svg>
  );
}
