import type { DiagramProps } from "../lesson/types";

export function TimelineStoneToAiDiagram({ lang, step }: DiagramProps) {
  const title =
    lang === "pl"
      ? "Wielki łuk ludzkich narzędzi"
      : lang === "de"
        ? "Der grosse Bogen menschlicher Werkzeuge"
        : "The Great Arc of Human Tools";

  const axeLabel = lang === "pl" ? "Kamienny topór" : lang === "de" ? "Faustkeil" : "Stone Axe";

  const steamLabel = lang === "pl" ? "Koło parowe" : lang === "de" ? "Dampfrad" : "Steam Gear";

  const chipLabel = lang === "pl" ? "Mikroprocesor" : lang === "de" ? "Mikrochip" : "Microchip";

  const aiLabel =
    lang === "pl" ? "Sieć neuronowa" : lang === "de" ? "KI-Netzwerk" : "AI Neural Net";

  const sub =
    lang === "pl"
      ? "Przez tysiące lat ludzie nieustannie tworzyli narzędzia, by poszerzać swoje możliwości"
      : lang === "de"
        ? "Seit Jahrtausenden erfinden Menschen Werkzeuge, um ihre Faehigkeiten zu erweitern"
        : "Across thousands of years, humans have continually invented tools to expand capability";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="Timeline from Stone to AI">
      <rect
        x="30"
        y="30"
        width="340"
        height="180"
        rx="12"
        fill="#f8fafc"
        stroke="#cbd5e1"
        strokeWidth="2"
      />
      <text x="200" y="55" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0f172a">
        {title}
      </text>

      {/* Evolution timeline line */}
      <line x1="60" y1="120" x2="340" y2="120" stroke="#94a3b8" strokeWidth="3" />

      {/* 4 milestones */}
      <circle cx="90" cy="120" r="14" fill="#d97706" />
      <text x="90" y="150" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#78350f">
        {axeLabel}
      </text>

      <circle cx="160" cy="120" r="14" fill="#0284c7" />
      <text x="160" y="150" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#0369a1">
        {steamLabel}
      </text>

      <circle cx="240" cy="120" r="14" fill="#10b981" />
      <text x="240" y="150" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#065f46">
        {chipLabel}
      </text>

      <circle cx="310" cy="120" r="14" fill="#8b5cf6" />
      <text x="310" y="150" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#5b21b6">
        {aiLabel}
      </text>

      {step >= 2 && (
        <text x="200" y="198" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e293b">
          {sub}
        </text>
      )}
    </svg>
  );
}

export function MachineSpeedComparisonDiagram({ lang, step }: DiagramProps) {
  const title =
    lang === "pl"
      ? "Szybkość kontra refleksja i mądrość"
      : lang === "de"
        ? "Geschwindigkeit vs Nachdenken"
        : "Speed vs Thoughtful Reflection";

  const computerTitle = lang === "pl" ? "Komputer" : lang === "de" ? "Computer" : "Computer";

  const computerOps =
    lang === "pl" ? "1 000 000 000" : lang === "de" ? "1.000.000.000" : "1,000,000,000";

  const computerSub =
    lang === "pl" ? "Obliczeń / sek." : lang === "de" ? "Rechnungen / Sek." : "Calculations / Sec";

  const humanTitle = lang === "pl" ? "Ludzki umysł" : lang === "de" ? "Mensch" : "Human Mind";

  const humanWisdom =
    lang === "pl" ? "Mądrość i etyka" : lang === "de" ? "Weisheit & Ethik" : "Wisdom & Ethics";

  const humanSub =
    lang === "pl"
      ? "Dlaczego to ważne?"
      : lang === "de"
        ? "Warum ist das wichtig?"
        : "Why Does It Matter?";

  const sub =
    lang === "pl"
      ? "Komputery dają czystą szybkość, lecz to ludzie wnoszą sumienie, osąd i poczucie sensu"
      : lang === "de"
        ? "Computer bieten Rechenkraft, doch Menschen schenken Gewissen, Urteilskraft und Sinn"
        : "Computers provide raw speed, but humans supply conscience, judgment, and purpose";

  return (
    <svg
      viewBox="0 0 400 240"
      className="diagram-svg"
      aria-label="Machine Speed vs Human Reflection"
    >
      <rect
        x="30"
        y="30"
        width="340"
        height="180"
        rx="12"
        fill="#f0f9ff"
        stroke="#bae6fd"
        strokeWidth="2"
      />
      <text x="200" y="55" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0369a1">
        {title}
      </text>

      {/* Left box: Machine speed */}
      <rect
        x="60"
        y="80"
        width="125"
        height="75"
        rx="8"
        fill="#e0f2fe"
        stroke="#0284c7"
        strokeWidth="2"
      />
      <text x="122" y="105" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0369a1">
        {computerTitle}
      </text>
      <text x="122" y="125" textAnchor="middle" fontSize="10" fill="#0284c7">
        {computerOps}
      </text>
      <text x="122" y="140" textAnchor="middle" fontSize="8" fill="#64748b">
        {computerSub}
      </text>

      {/* Right box: Human pondering */}
      <rect
        x="215"
        y="80"
        width="125"
        height="75"
        rx="8"
        fill="#fef3c7"
        stroke="#d97706"
        strokeWidth="2"
      />
      <text x="277" y="105" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#92400e">
        {humanTitle}
      </text>
      <text x="277" y="125" textAnchor="middle" fontSize="10" fill="#b45309">
        {humanWisdom}
      </text>
      <text x="277" y="140" textAnchor="middle" fontSize="8" fill="#64748b">
        {humanSub}
      </text>

      {step >= 2 && (
        <text x="200" y="198" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0c4a6e">
          {sub}
        </text>
      )}
    </svg>
  );
}

export function HeartEmpathyCompassionDiagram({ lang, step }: DiagramProps) {
  const title =
    lang === "pl"
      ? "Empatia: Wyjątkowy ludzki dar"
      : lang === "de"
        ? "Mitgefuehl: Die einzigartige menschliche Gabe"
        : "Empathy: The Uniquely Human Gift";

  const sub =
    lang === "pl"
      ? "Żaden algorytm nie potrafi szczerze pocieszyć płaczącego przyjaciela ani poczuć czułości"
      : lang === "de"
        ? "Kein Algorithmus kann weinende Freunde troesten oder echte Zuneigung empfinden"
        : "No algorithm can genuinely comfort a crying friend or feel real human tenderness";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="Empathy and Human Care">
      <rect
        x="30"
        y="30"
        width="340"
        height="180"
        rx="12"
        fill="#fff1f2"
        stroke="#fecdd3"
        strokeWidth="2"
      />
      <text x="200" y="55" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#9f1239">
        {title}
      </text>

      {/* Glowing heart */}
      <path
        d="M200 135 C170 100 145 120 170 150 L200 175 L230 150 C255 120 230 100 200 135 Z"
        fill="#e11d48"
        stroke="#be123c"
        strokeWidth="2"
      />
      <circle cx="170" cy="115" r="16" fill="#fb7185" opacity="0.6" />
      <circle cx="230" cy="115" r="16" fill="#fb7185" opacity="0.6" />

      {/* Compassion rays */}
      <line x1="150" y1="95" x2="135" y2="85" stroke="#f43f5e" strokeWidth="2" />
      <line x1="250" y1="95" x2="265" y2="85" stroke="#f43f5e" strokeWidth="2" />
      <line x1="200" y1="85" x2="200" y2="72" stroke="#f43f5e" strokeWidth="2" />

      {step >= 2 && (
        <text x="200" y="198" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#881337">
          {sub}
        </text>
      )}
    </svg>
  );
}

export function CreativeTeamCollaborationDiagram({ lang, step }: DiagramProps) {
  const title =
    lang === "pl"
      ? "Kreatywność i praca zespołowa"
      : lang === "de"
        ? "Kreativitaet und Teamgeist"
        : "Creativity and Teamwork";

  const sub =
    lang === "pl"
      ? "Wspólna praca z przyjaciółmi nad pomysłowymi rozwiązaniami to unikalna ludzka supermoc"
      : lang === "de"
        ? "Gemeinsam mit Freunden fantasievolle Loesungen zu bauen, ist unsere Superkraft"
        : "Collaborating with friends to build imaginative solutions is a uniquely human superpower";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="Creative Human Collaboration">
      <rect
        x="30"
        y="30"
        width="340"
        height="180"
        rx="12"
        fill="#faf5ff"
        stroke="#e9d5ff"
        strokeWidth="2"
      />
      <text x="200" y="55" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#6b21a8">
        {title}
      </text>

      {/* 3 friends collaborating around a table */}
      <circle cx="130" cy="105" r="14" fill="#a855f7" />
      <circle cx="200" cy="95" r="14" fill="#3b82f6" />
      <circle cx="270" cy="105" r="14" fill="#ec4899" />

      {/* Shared blueprint desk */}
      <ellipse cx="200" cy="140" rx="75" ry="18" fill="#f3e8ff" stroke="#9333ea" strokeWidth="2" />
      <polygon points="190,135 210,135 200,122" fill="#f59e0b" />

      {step >= 2 && (
        <text x="200" y="198" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#581c87">
          {sub}
        </text>
      )}
    </svg>
  );
}

export function AmplifiedHumanValuesFutureDiagram({ lang, step }: DiagramProps) {
  const title =
    lang === "pl"
      ? "Technologia wzmacnia ludzkie wartości"
      : lang === "de"
        ? "Technik verstaerkt menschliche Werte"
        : "Technology Amplifies Human Purpose";

  const sub =
    lang === "pl"
      ? "Gdy kierujemy się empatią i etyką, nasze narzędzia budują sprawiedliwszy i zdrowszy świat"
      : lang === "de"
        ? "Wenn wir von Mitgefuehl und Ethik geleitet werden, schaffen unsere Werkzeuge eine bessere Welt"
        : "When guided by kindness and ethics, our tools can build a fairer, healthier world";

  return (
    <svg
      viewBox="0 0 400 240"
      className="diagram-svg"
      aria-label="Human Values Guiding Future Technology"
    >
      <rect
        x="30"
        y="30"
        width="340"
        height="180"
        rx="12"
        fill="#ecfdf5"
        stroke="#a7f3d0"
        strokeWidth="2"
      />
      <text x="200" y="55" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#065f46">
        {title}
      </text>

      {/* Radiant earth in gentle hands */}
      <circle cx="200" cy="115" r="28" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
      <path d="M190 100 Q205 110 200 130 Q185 125 190 100 Z" fill="#22c55e" />
      <path d="M210 105 Q220 120 215 130 Q205 120 210 105 Z" fill="#22c55e" />

      {/* Supporting rays */}
      <circle
        cx="200"
        cy="115"
        r="42"
        fill="none"
        stroke="#10b981"
        strokeWidth="1.5"
        strokeDasharray="4 4"
      />

      {step >= 2 && (
        <text x="200" y="198" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#064e3b">
          {sub}
        </text>
      )}
    </svg>
  );
}
