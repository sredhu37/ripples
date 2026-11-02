import type { DiagramProps } from "../lesson/types";

export function SpringWorriesDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="Spring Planning Worries">
      <rect x="40" y="40" width="320" height="160" rx="12" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
      <text x="200" y="65" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0f172a">
        Spring Planting: Two Big Worries
      </text>
      {/* Farmer Maya */}
      <rect x="60" y="85" width="125" height="80" rx="6" fill="#fffbeb" stroke="#f59e0b" strokeWidth="2" />
      <text x="122" y="110" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#b45309">Farmer Maya</text>
      <text x="122" y="130" textAnchor="middle" fontSize="10" fill="#78350f">Cost: 3c per sack</text>
      <text x="122" y="148" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#b91c1c">Fears Flood (Price = 1c)</text>
      {/* Baker Bea */}
      <rect x="215" y="85" width="125" height="80" rx="6" fill="#fff7ed" stroke="#ea580c" strokeWidth="2" />
      <text x="277" y="110" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#c2410c">Baker Bea</text>
      <text x="277" y="130" textAnchor="middle" fontSize="10" fill="#9a3412">Needs 50 sacks</text>
      <text x="277" y="148" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#b91c1c">Fears Drought (Price = 8c)</text>
      {step >= 2 && (
        <text x="200" y="185" textAnchor="middle" fontSize="11" fill="#475569">
          Both want certainty before autumn arrives
        </text>
      )}
    </svg>
  );
}

export function HandshakeContractDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="The Forward Contract">
      <rect x="40" y="30" width="320" height="175" rx="12" fill="#f0fdf4" stroke="#86efac" strokeWidth="2" />
      <text x="200" y="60" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#166534">
        The Price Lock Agreement (Derivative)
      </text>
      <rect x="80" y="75" width="240" height="80" rx="6" fill="#ffffff" stroke="#15803d" strokeWidth="2" />
      <text x="200" y="100" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#15803d">
        AUTUMN WHEAT DELIVERY CONTRACT
      </text>
      <text x="200" y="122" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0f172a">
        50 Sacks locked at 4 Coins each
      </text>
      <text x="200" y="142" textAnchor="middle" fontSize="10" fill="#166534">
        Signed in Spring by Maya & Bea
      </text>
      {step >= 2 && (
        <text x="200" y="185" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#15803d">
          Value derived from wheat: both sleep peacefully through storms!
        </text>
      )}
    </svg>
  );
}

export function DroughtWithContractDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="Drought With Protection">
      <rect x="40" y="40" width="320" height="160" rx="12" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="2" />
      <text x="200" y="65" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1e3a8a">
        Autumn Drought: Open Market Spikes to 8 Coins!
      </text>
      {/* Protected Shield */}
      <circle cx="200" cy="115" r="30" fill="#3b82f6" />
      <text x="200" y="122" textAnchor="middle" fontSize="22" fill="#ffffff">🛡️</text>
      <text x="200" y="160" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1d4ed8">
        Contract Honors 4 Coins
      </text>
      {step >= 2 && (
        <text x="200" y="185" textAnchor="middle" fontSize="11" fill="#1e40af">
          Bea buys affordable flour and children get school lunches!
        </text>
      )}
    </svg>
  );
}

export function FloodWithContractDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="Flood With Protection">
      <rect x="40" y="40" width="320" height="160" rx="12" fill="#f0fdf4" stroke="#86efac" strokeWidth="2" />
      <text x="200" y="65" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#166534">
        Autumn Flood: Open Market Crashes to 1 Coin!
      </text>
      {/* Maya safe */}
      <circle cx="200" cy="115" r="30" fill="#22c55e" />
      <text x="200" y="122" textAnchor="middle" fontSize="22" fill="#ffffff">🌾</text>
      <text x="200" y="160" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#15803d">
        Contract Guarantees 4 Coins
      </text>
      {step >= 2 && (
        <text x="200" y="185" textAnchor="middle" fontSize="11" fill="#166534">
          Maya covers her 3-coin cost and earns 1 coin profit safely!
        </text>
      )}
    </svg>
  );
}

export function EurexExchangeDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="Global Derivatives Exchange">
      <rect x="30" y="30" width="340" height="180" rx="12" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
      <text x="200" y="65" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#1e293b">
        Regulated Exchanges (Eurex & EEX)
      </text>
      <text x="200" y="90" textAnchor="middle" fontSize="12" fill="#475569">
        Airlines lock jet fuel; bakeries lock grain; power grids lock energy
      </text>
      <circle cx="200" cy="130" r="26" fill="#0284c7" />
      <text x="200" y="137" textAnchor="middle" fontSize="18" fill="#ffffff">✈️</text>
      {step >= 2 && (
        <text x="200" y="185" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155">
          Hedging removes price shocks so our economy stays stable
        </text>
      )}
    </svg>
  );
}
