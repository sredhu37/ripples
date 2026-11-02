import type { DiagramProps } from "../lesson/types";

export function TakeoverDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="#f8fafc" rx="8" />
      <g transform="translate(60, 30)">
        <rect x="0" y="20" width="120" height="120" fill="#fee2e2" stroke="#ef4444" rx="6" />
        <text x="60" y="55" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#991b1b">
          Far Harbor
        </text>
        <text x="60" y="90" textAnchor="middle" fontSize="30">🛑</text>
        <text x="60" y="125" textAnchor="middle" fontSize="10" fill="#b91c1c">Barnaby takes control</text>
      </g>
      {step >= 2 && (
        <g transform="translate(210, 40)">
          <rect x="0" y="10" width="140" height="100" fill="#fef2f2" stroke="#fca5a5" rx="4" />
          <text x="70" y="35" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#991b1b">Unchecked Power</text>
          <text x="70" y="60" textAnchor="middle" fontSize="9" fill="#7f1d1d">• Bans public meetings</text>
          <text x="70" y="75" textAnchor="middle" fontSize="9" fill="#7f1d1d">• Shuts town newspaper</text>
          <text x="70" y="90" textAnchor="middle" fontSize="9" fill="#7f1d1d">• No elections allowed</text>
        </g>
      )}
    </svg>
  );
}

export function SilencedFeedbackDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="#f8fafc" rx="8" />
      <g transform="translate(50, 40)">
        <rect x="0" y="0" width="130" height="120" fill="#fef2f2" stroke="#f87171" rx="6" />
        <text x="65" y="30" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#991b1b">Water Pipe Leaks!</text>
        <text x="65" y="65" textAnchor="middle" fontSize="24">🌊💦</text>
        <text x="65" y="95" textAnchor="middle" fontSize="10" fill="#b91c1c">Flooding Main Street</text>
      </g>
      {step >= 2 && (
        <g transform="translate(220, 40)">
          <rect x="0" y="0" width="130" height="120" fill="#f1f5f9" stroke="#94a3b8" rx="6" />
          <text x="65" y="30" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#475569">Silenced Citizens</text>
          <text x="65" y="65" textAnchor="middle" fontSize="24">🤐🔒</text>
          <text x="65" y="90" textAnchor="middle" fontSize="9" fill="#64748b">Afraid to speak bad news</text>
          <text x="65" y="105" textAnchor="middle" fontSize="9" fill="#64748b">No free feedback loop</text>
        </g>
      )}
    </svg>
  );
}

export function ContrastDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="#f8fafc" rx="8" />
      <g transform="translate(30, 20)">
        <text x="170" y="20" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#334155">
          Feedback and Problem Solving
        </text>
        <g transform="translate(10, 40)">
          <rect x="0" y="0" width="150" height="100" fill="#fee2e2" rx="4" />
          <text x="75" y="25" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#991b1b">Dictatorship (Closed)</text>
          <text x="75" y="50" textAnchor="middle" fontSize="9" fill="#7f1d1d">• Mistakes are hidden</text>
          <text x="75" y="70" textAnchor="middle" fontSize="9" fill="#7f1d1d">• Bad news is punished</text>
          <text x="75" y="90" textAnchor="middle" fontSize="9" fill="#7f1d1d">• Damage keeps growing</text>
        </g>
        <g transform="translate(180, 40)">
          <rect x="0" y="0" width="150" height="100" fill="#f0fdf4" rx="4" />
          <text x="75" y="25" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#166534">Open Society (Free)</text>
          <text x="75" y="50" textAnchor="middle" fontSize="9" fill="#14532d">• People report problems</text>
          <text x="75" y="70" textAnchor="middle" fontSize="9" fill="#14532d">• Free press flags errors</text>
          <text x="75" y="90" textAnchor="middle" fontSize="9" fill="#14532d">• Fixes happen quickly</text>
        </g>
      </g>
      {step >= 2 && (
        <text x="200" y="175" textAnchor="middle" fontSize="11" fill="#475569">
          Freedom of speech is a practical error-correction tool, not just an ideal
        </text>
      )}
    </svg>
  );
}

export function SafeguardsDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="#f8fafc" rx="8" />
      <g transform="translate(40, 30)">
        <text x="160" y="20" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#334155">
          Constitutional Safeguards Against Dictatorship
        </text>
        <g transform="translate(10, 45)">
          <rect x="0" y="0" width="90" height="70" fill="#e0e7ff" rx="4" />
          <text x="45" y="30" textAnchor="middle" fontSize="10" fontWeight="bold">Free Press</text>
          <text x="45" y="50" textAnchor="middle" fontSize="8" fill="#3730a3">Independent news</text>
        </g>
        <g transform="translate(115, 45)">
          <rect x="0" y="0" width="90" height="70" fill="#e0e7ff" rx="4" />
          <text x="45" y="30" textAnchor="middle" fontSize="10" fontWeight="bold">Independent Courts</text>
          <text x="45" y="50" textAnchor="middle" fontSize="8" fill="#3730a3">Judges check power</text>
        </g>
        <g transform="translate(220, 45)">
          <rect x="0" y="0" width="90" height="70" fill="#e0e7ff" rx="4" />
          <text x="45" y="30" textAnchor="middle" fontSize="10" fontWeight="bold">Free Elections</text>
          <text x="45" y="50" textAnchor="middle" fontSize="8" fill="#3730a3">Peaceful change</text>
        </g>
      </g>
      {step >= 2 && (
        <text x="200" y="165" textAnchor="middle" fontSize="12" fill="#15803d" fontWeight="bold">
          Rules must protect human dignity and basic rights forever!
        </text>
      )}
    </svg>
  );
}

export function VigilanceDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="#f8fafc" rx="8" />
      <g transform="translate(50, 40)">
        <circle cx="50" cy="50" r="35" fill="#fef08a" />
        <text x="50" y="55" textAnchor="middle" fontSize="24">🛡️</text>
        <text x="50" y="105" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#854d0e">Citizen Vigilance</text>
      </g>
      {step >= 2 && (
        <g transform="translate(210, 40)">
          <rect x="0" y="15" width="140" height="70" fill="#dcfce7" rx="6" />
          <text x="70" y="45" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#166534">Protecting Freedom</text>
          <text x="70" y="65" textAnchor="middle" fontSize="9" fill="#15803d">Every generation defends rights</text>
        </g>
      )}
    </svg>
  );
}
