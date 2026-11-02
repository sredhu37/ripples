import type { DiagramProps } from "../lesson/types";

export function CentralDeskDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="#f8fafc" rx="8" />
      <g transform="translate(60, 30)">
        <rect x="0" y="10" width="130" height="120" fill="#fee2e2" stroke="#ef4444" rx="6" />
        <text x="65" y="35" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#991b1b">Central Planning Desk</text>
        <text x="65" y="70" textAnchor="middle" fontSize="24">📋🏢</text>
        <text x="65" y="95" textAnchor="middle" fontSize="9" fill="#7f1d1d">Decides quotas</text>
        <text x="65" y="110" textAnchor="middle" fontSize="9" fill="#7f1d1d">Owns all tools & shops</text>
      </g>
      {step >= 2 && (
        <g transform="translate(220, 30)">
          <rect x="0" y="10" width="130" height="120" fill="#f1f5f9" stroke="#cbd5e1" rx="6" />
          <text x="65" y="35" textAnchor="middle" fontSize="11" fontWeight="bold">The Stated Ideal</text>
          <text x="65" y="70" textAnchor="middle" fontSize="24">⚖️🤝</text>
          <text x="65" y="95" textAnchor="middle" fontSize="9" fill="#475569">Equal distribution</text>
          <text x="65" y="110" textAnchor="middle" fontSize="9" fill="#475569">No rich or poor</text>
        </g>
      )}
    </svg>
  );
}

export function KnowledgeProblemDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="#f8fafc" rx="8" />
      <g transform="translate(40, 20)">
        <text x="160" y="20" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#334155">
          The Local Knowledge Problem
        </text>
        <g transform="translate(0, 40)">
          <rect x="0" y="0" width="100" height="90" fill="#e0f2fe" rx="4" />
          <text x="50" y="25" textAnchor="middle" fontSize="10" fontWeight="bold">Mountain</text>
          <text x="50" y="50" textAnchor="middle" fontSize="18">❄️🧥</text>
          <text x="50" y="75" textAnchor="middle" fontSize="9" fill="#0369a1">Needs 60 coats</text>
        </g>
        <g transform="translate(110, 40)">
          <rect x="0" y="0" width="100" height="90" fill="#fef9c3" rx="4" />
          <text x="50" y="25" textAnchor="middle" fontSize="10" fontWeight="bold">Harbor</text>
          <text x="50" y="50" textAnchor="middle" fontSize="18">☀️🧢</text>
          <text x="50" y="75" textAnchor="middle" fontSize="9" fill="#854d0e">Needs sun hats</text>
        </g>
        <g transform="translate(220, 40)">
          <rect x="0" y="0" width="100" height="90" fill="#fee2e2" rx="4" />
          <text x="50" y="25" textAnchor="middle" fontSize="10" fontWeight="bold">Central Order</text>
          <text x="50" y="50" textAnchor="middle" fontSize="18">📦📦</text>
          <text x="50" y="75" textAnchor="middle" fontSize="9" fill="#991b1b">Equal 33 to each</text>
        </g>
      </g>
      {step >= 2 && (
        <text x="200" y="170" textAnchor="middle" fontSize="11" fill="#dc2626" fontWeight="bold">
          Result: Mountain freezes, Harbor has unneeded coats!
        </text>
      )}
    </svg>
  );
}

export function ShortagesQueuesDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="#f8fafc" rx="8" />
      <g transform="translate(50, 30)">
        <rect x="0" y="10" width="130" height="100" fill="#f8fafc" stroke="#94a3b8" strokeDasharray="4" rx="4" />
        <text x="65" y="35" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#64748b">Store Shelf</text>
        <text x="65" y="65" textAnchor="middle" fontSize="20">📭</text>
        <text x="65" y="90" textAnchor="middle" fontSize="9" fill="#64748b">Shortages & Out of Stock</text>
      </g>
      {step >= 2 && (
        <g transform="translate(210, 30)">
          <rect x="0" y="10" width="140" height="100" fill="#fef2f2" stroke="#fca5a5" rx="4" />
          <text x="70" y="35" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#991b1b">Long Waiting Queues</text>
          <text x="70" y="65" textAnchor="middle" fontSize="20">🚶🚶🚶🚶</text>
          <text x="70" y="90" textAnchor="middle" fontSize="9" fill="#7f1d1d">Hours spent waiting in line</text>
        </g>
      )}
      {step >= 3 && (
        <text x="200" y="165" textAnchor="middle" fontSize="11" fill="#475569">
          Without price signals and customer feedback, planners cannot match supply to real needs
        </text>
      )}
    </svg>
  );
}

export function CoreDifferenceDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="#f8fafc" rx="8" />
      <g transform="translate(30, 20)">
        <text x="170" y="20" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#334155">
          Economic Coordination Mechanisms
        </text>
        <g transform="translate(10, 40)">
          <rect x="0" y="0" width="150" height="95" fill="#f0fdf4" rx="4" />
          <text x="75" y="25" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#166534">Market Coordination</text>
          <text x="75" y="45" textAnchor="middle" fontSize="8" fill="#14532d">• Prices reflect real scarcity</text>
          <text x="75" y="60" textAnchor="middle" fontSize="8" fill="#14532d">• Decentralized decisions</text>
          <text x="75" y="75" textAnchor="middle" fontSize="8" fill="#14532d">• High variety & flexibility</text>
        </g>
        <g transform="translate(180, 40)">
          <rect x="0" y="0" width="150" height="95" fill="#fee2e2" rx="4" />
          <text x="75" y="25" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#991b1b">Central Planning</text>
          <text x="75" y="45" textAnchor="middle" fontSize="8" fill="#7f1d1d">• Central desk sets quotas</text>
          <text x="75" y="60" textAnchor="middle" fontSize="8" fill="#7f1d1d">• Lacks local daily details</text>
          <text x="75" y="75" textAnchor="middle" fontSize="8" fill="#7f1d1d">• Frequent shortages & lines</text>
        </g>
      </g>
      {step >= 2 && (
        <text x="200" y="175" textAnchor="middle" fontSize="11" fill="#475569">
          Information is scattered among millions of people, not held in one office
        </text>
      )}
    </svg>
  );
}

export function PlanningOutcomeDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="#f8fafc" rx="8" />
      <g transform="translate(60, 40)">
        <rect x="0" y="0" width="120" height="90" fill="#fee2e2" stroke="#ef4444" rx="6" />
        <text x="60" y="28" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#991b1b">Central Monopoly</text>
        <text x="60" y="55" textAnchor="middle" fontSize="20">🔒</text>
        <text x="60" y="75" textAnchor="middle" fontSize="9" fill="#7f1d1d">No alternatives</text>
      </g>
      {step >= 2 && (
        <g transform="translate(220, 40)">
          <rect x="0" y="0" width="120" height="90" fill="#f1f5f9" stroke="#64748b" rx="6" />
          <text x="60" y="28" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#334155">Lost Signals</text>
          <text x="60" y="55" textAnchor="middle" fontSize="20">📉</text>
          <text x="60" y="75" textAnchor="middle" fontSize="9" fill="#475569">No price guidance</text>
        </g>
      )}
    </svg>
  );
}
