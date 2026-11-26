import { useState } from "react";

interface AppleStallScenarioProps {
  prompt?: string;
  onAnswer?: (correct: boolean) => void;
  lang?: "en" | "de" | "pl";
}

export function AppleStallScenario({ prompt, onAnswer, lang = "en" }: AppleStallScenarioProps) {
  const [selected, setSelected] = useState<number | null>(null);

  const t = {
    en: {
      title: "The apple stall",
      before: "Before the storm",
      after: "After the storm",
      storm: "Storm hits!",
      apples10: "10 apples for sale",
      apples3: "Only 3 apples left!",
      otters4: "4 otters want apples",
      otters10: "10 otters want apples",
      price2: "2 shells each",
      priceUnknown: "? shells each",
      question: prompt || "What happens to the price of an apple?",
      up: "It goes up",
      down: "It goes down",
      same: "It stays the same",
      next: "Next →",
    },
    de: {
      title: "Der Apfelstand",
      before: "Vor dem Sturm",
      after: "Nach dem Sturm",
      storm: "Sturm zieht auf!",
      apples10: "10 Äpfel im Verkauf",
      apples3: "Nur noch 3 Äpfel übrig!",
      otters4: "4 Otter wollen Äpfel",
      otters10: "10 Otter wollen Äpfel",
      price2: "2 Muscheln pro Apfel",
      priceUnknown: "? Muscheln pro Apfel",
      question: prompt || "Was passiert mit dem Preis für einen Apfel?",
      up: "Er steigt",
      down: "Er sinkt",
      same: "Er bleibt gleich",
      next: "Weiter →",
    },
    pl: {
      title: "Stragan z jabłkami",
      before: "Przed burzą",
      after: "Po burzy",
      storm: "Nadchodzi burza!",
      apples10: "10 jabłek na sprzedaż",
      apples3: "Zostały tylko 3 jabłka!",
      otters4: "4 wydry chcą jabłka",
      otters10: "10 wyder chce jabłka",
      price2: "2 muszle za sztukę",
      priceUnknown: "? muszli za sztukę",
      question: prompt || "Co dzieje się z ceną jednego jabłka?",
      up: "Rośnie",
      down: "Spada",
      same: "Pozostaje bez zmian",
      next: "Dalej →",
    },
  }[lang];

  const handleSelect = (index: number) => {
    setSelected(index);
    if (onAnswer) {
      // index 0 is "It goes up" (correct)
      onAnswer(index === 0);
    }
  };

  return (
    <div className="apple-stall-scenario">
      <div className="scenario-card">
        {/* Scenario Header */}
        <div className="scenario-header">
          <div className="scenario-title-badge">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M12 4C10.5 2 8 2.5 8 2.5C8 2.5 8.5 5 10 6"
                stroke="#4A7C59"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M12 6C8.5 6 5 8.5 5 13C5 17.5 8.5 21 12 21C15.5 21 19 17.5 19 13C19 8.5 15.5 6 12 6Z"
                fill="#C44525"
                stroke="#8A2714"
                strokeWidth="2"
              />
              <circle cx="9" cy="11" r="1.5" fill="#FFA585" opacity="0.6" />
            </svg>
            <span>{t.title}</span>
          </div>
        </div>

        {/* Comparative Columns */}
        <div className="scenario-comparison">
          {/* Before the storm */}
          <div className="scenario-col before-col">
            <div className="col-heading">{t.before}</div>

            {/* 10 apples grid */}
            <div className="apples-grid" aria-label={t.apples10}>
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="apple-item" title="Apple">
                  <svg width="34" height="34" viewBox="0 0 32 32" fill="none">
                    <path
                      d="M16 6C14.5 3.5 11 4 11 4C11 4 11.5 7 13.5 8"
                      stroke="#3E7B54"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M16 7.5C11.5 7.5 7 10.5 7 16C7 21.5 11.5 26 16 26C20.5 26 25 21.5 25 16C25 10.5 20.5 7.5 16 7.5Z"
                      fill="#D94324"
                      stroke="#8E2310"
                      strokeWidth="2"
                    />
                    <ellipse cx="12" cy="13" rx="2.5" ry="1.5" fill="#FF8D73" opacity="0.8" />
                  </svg>
                </div>
              ))}
            </div>

            {/* Otter buyers */}
            <div className="buyers-section">
              <div className="otters-row" aria-label={t.otters4}>
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="otter-badge" title="Otter buyer">
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                      <circle
                        cx="14"
                        cy="14"
                        r="13"
                        fill="#D2B48C"
                        stroke="#8B5A2B"
                        strokeWidth="1.5"
                      />
                      <circle cx="10" cy="12" r="2" fill="#2E231C" />
                      <circle cx="18" cy="12" r="2" fill="#2E231C" />
                      <ellipse cx="14" cy="16" rx="4" ry="2.5" fill="#FFF8DC" />
                      <circle cx="14" cy="15.5" r="1.5" fill="#2E231C" />
                    </svg>
                  </div>
                ))}
              </div>
              <span className="buyers-label">{t.otters4}</span>
            </div>

            {/* Price badge */}
            <div className="scenario-price-badge price-shells">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path
                  d="M10 2C6 2 3 6 3 11C3 15 6 18 10 18C14 18 17 15 17 11C17 6 14 2 10 2Z"
                  fill="#F2A838"
                  stroke="#C87A1E"
                  strokeWidth="1.5"
                />
                <line x1="10" y1="2" x2="10" y2="18" stroke="#C87A1E" strokeWidth="1" />
                <line x1="7" y1="4" x2="8" y2="17" stroke="#C87A1E" strokeWidth="1" />
                <line x1="13" y1="4" x2="12" y2="17" stroke="#C87A1E" strokeWidth="1" />
              </svg>
              <span>{t.price2}</span>
            </div>
          </div>

          {/* Storm divider */}
          <div className="storm-divider">
            <div className="storm-icon-wrap">
              <svg width="56" height="56" viewBox="0 0 64 64" fill="none">
                {/* Cloud */}
                <path
                  d="M18 42H46C51.5 42 56 37.5 56 32C56 26.8 52 22.5 47 22.1C45.8 14.8 39.5 9 32 9C25.5 9 19.8 13.5 17.8 19.8C12.3 20.8 8 25.5 8 31.5C8 37.3 12.5 42 18 42Z"
                  fill="#7A8B99"
                  stroke="#4E5D6A"
                  strokeWidth="2.5"
                />
                {/* Rain drops */}
                <line
                  x1="18"
                  y1="46"
                  x2="16"
                  y2="52"
                  stroke="#74C7E6"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <line
                  x1="28"
                  y1="46"
                  x2="26"
                  y2="52"
                  stroke="#74C7E6"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <line
                  x1="46"
                  y1="46"
                  x2="44"
                  y2="52"
                  stroke="#74C7E6"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                {/* Lightning bolt */}
                <path
                  d="M36 34L30 46H37L33 58L44 43H37L40 34H36Z"
                  fill="#F9D423"
                  stroke="#D49E00"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="storm-tag">
              <span>{t.storm}</span>
              <svg width="24" height="12" viewBox="0 0 24 12" fill="none">
                <path
                  d="M2 6H20M20 6L15 1M20 6L15 11"
                  stroke="#C44525"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* After the storm */}
          <div className="scenario-col after-col">
            <div className="col-heading">{t.after}</div>

            {/* 3 apples + 7 dashed outline placeholders */}
            <div className="apples-grid" aria-label={t.apples3}>
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={`apple-${i}`} className="apple-item" title="Apple remaining">
                  <svg width="34" height="34" viewBox="0 0 32 32" fill="none">
                    <path
                      d="M16 6C14.5 3.5 11 4 11 4C11 4 11.5 7 13.5 8"
                      stroke="#3E7B54"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M16 7.5C11.5 7.5 7 10.5 7 16C7 21.5 11.5 26 16 26C20.5 26 25 21.5 25 16C25 10.5 20.5 7.5 16 7.5Z"
                      fill="#D94324"
                      stroke="#8E2310"
                      strokeWidth="2"
                    />
                    <ellipse cx="12" cy="13" rx="2.5" ry="1.5" fill="#FF8D73" opacity="0.8" />
                  </svg>
                </div>
              ))}
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={`empty-${i}`} className="apple-item empty-slot" title="Blown away">
                  <svg width="34" height="34" viewBox="0 0 32 32" fill="none">
                    <circle
                      cx="16"
                      cy="16"
                      r="10"
                      stroke="#C3B9A5"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                      fill="rgba(195, 185, 165, 0.15)"
                    />
                  </svg>
                </div>
              ))}
            </div>

            {/* Otter buyers: 10 otters */}
            <div className="buyers-section">
              <div className="otters-grid" aria-label={t.otters10}>
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="otter-badge" title="Otter buyer">
                    <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
                      <circle
                        cx="14"
                        cy="14"
                        r="13"
                        fill="#D2B48C"
                        stroke="#8B5A2B"
                        strokeWidth="1.5"
                      />
                      <circle cx="10" cy="12" r="2" fill="#2E231C" />
                      <circle cx="18" cy="12" r="2" fill="#2E231C" />
                      <ellipse cx="14" cy="16" rx="4" ry="2.5" fill="#FFF8DC" />
                      <circle cx="14" cy="15.5" r="1.5" fill="#2E231C" />
                    </svg>
                  </div>
                ))}
              </div>
              <span className="buyers-label">{t.otters10}</span>
            </div>

            {/* Price badge */}
            <div className="scenario-price-badge price-unknown">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <circle cx="10" cy="10" r="8" fill="#C44525" stroke="#8A2714" strokeWidth="1.5" />
                <text
                  x="10"
                  y="14"
                  textAnchor="middle"
                  fill="#FFFFFF"
                  fontSize="11"
                  fontWeight="bold"
                >
                  ?
                </text>
              </svg>
              <span>{t.priceUnknown}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Question and 3 Tactile Choices */}
      <div className="scenario-question-section">
        <h3 className="scenario-question-text">{t.question}</h3>

        <div className="tactile-choices-grid" role="radiogroup" aria-label={t.question}>
          {/* Option 0: It goes up (correct) */}
          <button
            type="button"
            className={`tactile-choice-card choice-up ${selected === 0 ? "selected" : ""}`}
            onClick={() => handleSelect(0)}
            role="radio"
            aria-checked={selected === 0}
          >
            <div className="choice-icon-badge badge-amber">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 4L4 12H9V20H15V12H20L12 4Z"
                  fill="#F2A838"
                  stroke="#C87A1E"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="choice-label">{t.up}</span>
          </button>

          {/* Option 1: It goes down */}
          <button
            type="button"
            className={`tactile-choice-card choice-down ${selected === 1 ? "selected" : ""}`}
            onClick={() => handleSelect(1)}
            role="radio"
            aria-checked={selected === 1}
          >
            <div className="choice-icon-badge badge-cyan">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 20L20 12H15V4H9V12H4L12 20Z"
                  fill="#74C7E6"
                  stroke="#2E8FA5"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="choice-label">{t.down}</span>
          </button>

          {/* Option 2: It stays the same */}
          <button
            type="button"
            className={`tactile-choice-card choice-same ${selected === 2 ? "selected" : ""}`}
            onClick={() => handleSelect(2)}
            role="radio"
            aria-checked={selected === 2}
          >
            <div className="choice-icon-badge badge-greige">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect x="5" y="7" width="14" height="3" rx="1.5" fill="#A89E92" />
                <rect x="5" y="14" width="14" height="3" rx="1.5" fill="#A89E92" />
              </svg>
            </div>
            <span className="choice-label">{t.same}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
