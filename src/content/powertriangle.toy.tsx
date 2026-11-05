import { useState } from "react";
import type { Lang } from "../progress";
import { CheckButton } from "../lesson/toolkit";

interface PowerTriangleToyProps {
  lang: Lang;
  mode?: "toy" | "quiz";
  onDone?: () => void;
}

export function PowerTriangleToy({ lang, mode = "toy", onDone }: PowerTriangleToyProps) {
  const [govPower, setGovPower] = useState(50);
  const [businessPower, setBusinessPower] = useState(50);
  const [citizenPower, setCitizenPower] = useState(50);
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [quizCorrect, setQuizCorrect] = useState(false);

  const isBalanced =
    govPower >= 35 && govPower <= 65 &&
    businessPower >= 35 && businessPower <= 65 &&
    citizenPower >= 35 && citizenPower <= 65;

  const getSystemStatus = () => {
    if (govPower > 80) {
      return {
        label:
          lang === "pl"
            ? "Autorytaryzm: Wolności obywatelskie stłumione"
            : lang === "de"
            ? "Autoritär: Freiheiten unterdrückt"
            : "Authoritarian: Liberties Suppressed",
        color: "text-red-600",
        bg: "bg-red-50 border-red-200",
      };
    }
    if (businessPower > 80) {
      return {
        label:
          lang === "pl"
            ? "Władza monopoli: Zatrucie środowiska, brak ochrony"
            : lang === "de"
            ? "Monopolherrschaft: Hohe Umweltbelastung, schwaches Netz"
            : "Monopoly Rule: High Pollution, Weak Safety Net",
        color: "text-amber-600",
        bg: "bg-amber-50 border-amber-200",
      };
    }
    if (citizenPower > 80 && govPower < 30) {
      return {
        label:
          lang === "pl"
            ? "Zapaść infrastruktury: Drogi i studnie niszczeją"
            : lang === "de"
            ? "Infrastrukturzerfall: Straßen & Brunnen verfallen"
            : "Infrastructure Collapse: Roads & Wells Crumble",
        color: "text-orange-600",
        bg: "bg-orange-50 border-orange-200",
      };
    }
    if (isBalanced) {
      return {
        label:
          lang === "pl"
            ? "Kwitnące społeczeństwo: Równowaga i wolność"
            : lang === "de"
            ? "Blühende Gesellschaft: Gleichgewicht & Freiheit"
            : "Thriving Society: Equilibrium & Freedom",
        color: "text-emerald-700",
        bg: "bg-emerald-50 border-emerald-300",
      };
    }
    return {
      label:
        lang === "pl"
          ? "Brak równowagi: Przesuń suwaki w stronę środka"
          : lang === "de"
          ? "Ungleichgewicht: Regler zur Mitte anpassen"
          : "Uneven Balance: Adjust knobs toward middle",
      color: "text-slate-600",
      bg: "bg-slate-50 border-slate-200",
    };
  };

  const status = getSystemStatus();

  const handleCheck = () => {
    if (mode === "quiz") {
      const isCorrect = isBalanced;
      setQuizCorrect(isCorrect);
      setShowQuizResult(true);
      if (isCorrect && onDone) {
        onDone();
      }
    } else {
      if (isBalanced && onDone) {
        onDone();
      }
    }
  };

  const titleText =
    lang === "pl"
      ? "Symulator Trójkąta Władzy"
      : lang === "de"
      ? "Das Macht-Dreieck Simulator"
      : "The Power Triangle Simulator";

  const subText =
    lang === "pl"
      ? "Zadbaj o harmonijną równowagę między Państwem, Przedsiębiorcami i Obywatelami"
      : lang === "de"
      ? "Bringe Regierung, Wirtschaft und Bürger ins Gleichgewicht"
      : "Balance Government, Businesses, and Citizens in harmony";

  return (
    <div className="powertriangle-toy p-4 bg-slate-50 rounded-xl max-w-md mx-auto">
      <div className="text-center mb-3">
        <h4 className="font-bold text-slate-800">
          {titleText}
        </h4>
        <p className="text-xs text-slate-500">
          {subText}
        </p>
      </div>

      <div className={`p-3 rounded-lg border text-center mb-4 transition-colors ${status.bg}`}>
        <div className={`text-xs font-bold ${status.color}`}>
          {status.label}
        </div>
      </div>

      {/* Triangle Visualization Canvas */}
      <div className="relative h-44 bg-white rounded-lg border border-slate-200 mb-4 flex items-center justify-center">
        <svg viewBox="0 0 300 160" className="w-full h-full">
          <polygon
            points="150,25 50,135 250,135"
            fill={isBalanced ? "#dcfce7" : "#f8fafc"}
            stroke={isBalanced ? "#22c55e" : "#cbd5e1"}
            strokeWidth="3"
            className="transition-colors duration-300"
          />

          {/* Government Node */}
          <circle cx="150" cy="25" r={10 + (govPower / 10)} fill="#6366f1" />
          <text x="150" y="29" textAnchor="middle" fontSize="10" fill="#ffffff" fontWeight="bold">
            {lang === "pl" ? "P" : "G"}
          </text>
          <text x="150" y="10" textAnchor="middle" fontSize="9" fill="#4338ca" fontWeight="bold">
            {lang === "pl" ? "Państwo" : lang === "de" ? "Staat" : "Gov"} ({govPower})
          </text>

          {/* Citizens Node */}
          <circle cx="50" cy="135" r={10 + (citizenPower / 10)} fill="#16a34a" />
          <text x="50" y="139" textAnchor="middle" fontSize="10" fill="#ffffff" fontWeight="bold">
            {lang === "pl" ? "O" : "C"}
          </text>
          <text x="50" y="153" textAnchor="middle" fontSize="9" fill="#15803d" fontWeight="bold">
            {lang === "pl" ? "Obywatele" : lang === "de" ? "Bürger" : "Citizens"} ({citizenPower})
          </text>

          {/* Businesses Node */}
          <circle cx="250" cy="135" r={10 + (businessPower / 10)} fill="#d97706" />
          <text x="250" y="139" textAnchor="middle" fontSize="10" fill="#ffffff" fontWeight="bold">
            {lang === "pl" ? "B" : "B"}
          </text>
          <text x="250" y="153" textAnchor="middle" fontSize="9" fill="#b45309" fontWeight="bold">
            {lang === "pl" ? "Biznes" : lang === "de" ? "Wirtschaft" : "Business"} ({businessPower})
          </text>
        </svg>
      </div>

      {/* Sliders */}
      <div className="space-y-2 mb-4 bg-white p-3 rounded-lg border border-slate-200">
        <div>
          <div className="flex justify-between text-[11px] font-semibold text-indigo-900 mb-0.5">
            <span>🏛️ {lang === "pl" ? "Władza państwa:" : lang === "de" ? "Staatliche Macht:" : "Government Power:"}</span>
            <span>{govPower}%</span>
          </div>
          <input
            type="range"
            min="10"
            max="100"
            value={govPower}
            onChange={(e) => setGovPower(parseInt(e.target.value))}
            className="w-full accent-indigo-600"
          />
        </div>

        <div>
          <div className="flex justify-between text-[11px] font-semibold text-emerald-900 mb-0.5">
            <span>👥 {lang === "pl" ? "Prawa i roszczenia obywateli:" : lang === "de" ? "Bürgerrechte & Forderungen:" : "Citizen Rights & Demands:"}</span>
            <span>{citizenPower}%</span>
          </div>
          <input
            type="range"
            min="10"
            max="100"
            value={citizenPower}
            onChange={(e) => setCitizenPower(parseInt(e.target.value))}
            className="w-full accent-emerald-600"
          />
        </div>

        <div>
          <div className="flex justify-between text-[11px] font-semibold text-amber-900 mb-0.5">
            <span>🏪 {lang === "pl" ? "Swoboda przedsiębiorców:" : lang === "de" ? "Wirtschaftliche Freiheit:" : "Business Freedom:"}</span>
            <span>{businessPower}%</span>
          </div>
          <input
            type="range"
            min="10"
            max="100"
            value={businessPower}
            onChange={(e) => setBusinessPower(parseInt(e.target.value))}
            className="w-full accent-amber-600"
          />
        </div>
      </div>

      <div className="flex flex-col items-center">
        <CheckButton lang={lang} onClick={handleCheck} />
        {showQuizResult && (
          <div className={`mt-2 text-xs font-bold ${quizCorrect ? "text-green-600" : "text-amber-600"}`}>
            {quizCorrect
              ? (lang === "pl"
                  ? "✓ Idealna harmonia! Wszystkie trzy bieguny są zrównoważone."
                  : lang === "de"
                  ? "✓ Perfekte Harmonie! Alle drei Ecken sind ausgewogen."
                  : "✓ Perfect harmony! All three corners are balanced.")
              : (lang === "pl"
                  ? "Wskazówka: Ustaw wszystkie trzy suwaki w strefie środkowej (około 50 każdy)."
                  : lang === "de"
                  ? "Hinweis: Stelle alle drei Schieberegler in die ausgewogene Mitte (ca. 50 jeweils)."
                  : "Adjust the three sliders to the balanced middle zone (approx 50 each).")}
          </div>
        )}
      </div>
    </div>
  );
}
