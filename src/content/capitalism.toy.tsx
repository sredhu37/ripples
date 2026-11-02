import { useState } from "react";
import type { Lang } from "../progress";
import { CheckButton } from "../lesson/toolkit";

interface CapitalismToyProps {
  lang: Lang;
  mode?: "toy" | "quiz";
  onDone?: () => void;
}

export function CapitalismToy({ lang, mode = "toy", onDone }: CapitalismToyProps) {
  const [innovationLevel, setInnovationLevel] = useState(70);
  const [fairRulesEnabled, setFairRulesEnabled] = useState(true);
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<string | null>(null);
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [quizCorrect, setQuizCorrect] = useState(false);

  const getMetrics = () => {
    const variety = Math.min(100, innovationLevel);
    const workerFairness = fairRulesEnabled ? 85 : 30;
    const cleanRiver = fairRulesEnabled ? 90 : 25;
    return { variety, workerFairness, cleanRiver };
  };

  const metrics = getMetrics();
  const isHealthyEconomy = innovationLevel >= 50 && fairRulesEnabled;

  const handleCheck = () => {
    if (mode === "quiz") {
      const isCorrect = selectedQuizAnswer === "ownership";
      setQuizCorrect(isCorrect);
      setShowQuizResult(true);
      if (isCorrect && onDone) {
        onDone();
      }
    } else {
      if (isHealthyEconomy && onDone) {
        onDone();
      }
    }
  };

  return (
    <div className="capitalism-toy p-4 bg-slate-50 rounded-xl max-w-md mx-auto">
      <div className="text-center mb-3">
        <h4 className="font-bold text-slate-800">
          {lang === "en" ? "Market Square & Ground Rules" : "Marktplatz & Spielregeln"}
        </h4>
        <p className="text-xs text-slate-500">
          {lang === "en"
            ? "Balance private initiative with fair rules for workers & nature"
            : "Verbinde private Initiative mit fairen Regeln für Arbeiter & Natur"}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        {/* Baker Bea */}
        <div className="bg-amber-50 border border-amber-200 p-2.5 rounded-lg text-center">
          <div className="text-2xl mb-1">🥖✨</div>
          <div className="font-bold text-xs text-amber-900">
            {lang === "en" ? "Bea's Bakery" : "Beas Bäckerei"}
          </div>
          <div className="text-[10px] text-amber-700">
            {lang === "en" ? "Owns brick oven & sesame recipe" : "Eigener Ofen & Sesam-Rezept"}
          </div>
        </div>

        {/* Baker Leo */}
        <div className="bg-orange-50 border border-orange-200 p-2.5 rounded-lg text-center">
          <div className="text-2xl mb-1">🍞🌾</div>
          <div className="font-bold text-xs text-orange-900">
            {lang === "en" ? "Leo's Bakery" : "Leos Bäckerei"}
          </div>
          <div className="text-[10px] text-orange-700">
            {lang === "en" ? "Competes with fresh seeded loaves" : "Konkurriert mit Körnerbrot"}
          </div>
        </div>
      </div>

      {mode === "toy" && (
        <div className="space-y-3 mb-4 bg-white p-3 rounded-lg border border-slate-200">
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
              <span>{lang === "en" ? "Baker Innovation & Investment:" : "Bäcker-Innovation & Investition:"}</span>
              <span className="font-bold text-blue-600">{innovationLevel}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={innovationLevel}
              onChange={(e) => setInnovationLevel(parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-slate-100">
            <span className="text-xs font-semibold text-slate-700">
              {lang === "en" ? "Fair Ground Rules (Wages & River):" : "Faire Spielregeln (Löhne & Fluss):"}
            </span>
            <button
              onClick={() => setFairRulesEnabled(!fairRulesEnabled)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition ${
                fairRulesEnabled
                  ? "bg-emerald-600 text-white"
                  : "bg-slate-300 text-slate-700"
              }`}
            >
              {fairRulesEnabled ? (lang === "en" ? "Active" : "Aktiv") : (lang === "en" ? "Off" : "Aus")}
            </button>
          </div>
        </div>
      )}

      {/* Market Indicators */}
      <div className="bg-white p-3 rounded-lg border border-slate-200 mb-4 shadow-sm space-y-2">
        <div className="flex justify-between items-center text-xs">
          <span className="text-slate-600">{lang === "en" ? "Bread Variety & Quality:" : "Brotvielfalt & Qualität:"}</span>
          <span className="font-bold text-amber-600">{metrics.variety}%</span>
        </div>
        <div className="flex justify-between items-center text-xs">
          <span className="text-slate-600">{lang === "en" ? "Worker Fairness:" : "Faire Löhne:"}</span>
          <span className={`font-bold ${metrics.workerFairness > 50 ? "text-green-600" : "text-red-500"}`}>
            {metrics.workerFairness}%
          </span>
        </div>
        <div className="flex justify-between items-center text-xs">
          <span className="text-slate-600">{lang === "en" ? "River Cleanliness:" : "Sauberer Fluss:"}</span>
          <span className={`font-bold ${metrics.cleanRiver > 50 ? "text-green-600" : "text-red-500"}`}>
            {metrics.cleanRiver}%
          </span>
        </div>
      </div>

      {mode === "quiz" && (
        <div className="mb-4">
          <div className="text-xs font-semibold text-slate-700 mb-2">
            {lang === "en"
              ? "In a market economy, what motivates Bea to wake up early and bake delicious bread?"
              : "Was motiviert Bea in einer Marktwirtschaft, früh aufzustehen und leckeres Brot zu backen?"}
          </div>
          <div className="space-y-2">
            <button
              onClick={() => setSelectedQuizAnswer("ownership")}
              className={`w-full p-2 rounded border text-xs text-left ${
                selectedQuizAnswer === "ownership"
                  ? "bg-amber-600 text-white border-amber-700"
                  : "bg-white text-slate-700 border-slate-300"
              }`}
            >
              {lang === "en"
                ? "A) She owns her bakery, invents recipes, and earns income from satisfied customers"
                : "A) Sie besitzt ihre Bäckerei, erfindet Rezepte und verdient Geld durch zufriedene Kunden"}
            </button>
            <button
              onClick={() => setSelectedQuizAnswer("force")}
              className={`w-full p-2 rounded border text-xs text-left ${
                selectedQuizAnswer === "force"
                  ? "bg-slate-700 text-white border-slate-800"
                  : "bg-white text-slate-700 border-slate-300"
              }`}
            >
              {lang === "en" ? "B) The town leader threatened to arrest her" : "B) Der Dorfanführer drohte ihr mit Verhaftung"}
            </button>
            <button
              onClick={() => setSelectedQuizAnswer("none")}
              className={`w-full p-2 rounded border text-xs text-left ${
                selectedQuizAnswer === "none"
                  ? "bg-slate-700 text-white border-slate-800"
                  : "bg-white text-slate-700 border-slate-300"
              }`}
            >
              {lang === "en" ? "C) Nobody in the village ever eats food" : "C) Niemand im Dorf isst jemals etwas"}
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col items-center">
        <CheckButton lang={lang} onClick={handleCheck} />
        {showQuizResult && (
          <div className={`mt-2 text-xs font-bold ${quizCorrect ? "text-green-600" : "text-amber-600"}`}>
            {quizCorrect
              ? (lang === "en" ? "✓ Exactly right! Private ownership and market incentives encourage innovation." : "✓ Genau richtig! Privateigentum und Markt-Anreize fördern Innovation.")
              : (lang === "en" ? "Hint: Private ownership allows producers to benefit from their effort." : "Hinweis: Privateigentum belohnt Produzenten für Fleiß und Ideen.")}
          </div>
        )}
      </div>
    </div>
  );
}
