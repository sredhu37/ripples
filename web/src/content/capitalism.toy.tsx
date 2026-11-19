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

  const title =
    lang === "pl"
      ? "Rynek i reguły gry"
      : lang === "de"
        ? "Marktplatz & Spielregeln"
        : "Market Square & Ground Rules";

  const subtitle =
    lang === "pl"
      ? "Połącz prywatną inicjatywę ze sprawiedliwymi zasadami dla pracowników i środowiska"
      : lang === "de"
        ? "Verbinde private Initiative mit fairen Regeln für Arbeiter & Natur"
        : "Balance private initiative with fair rules for workers & nature";

  const beaTitle =
    lang === "pl" ? "Piekarnia Bei" : lang === "de" ? "Beas Bäckerei" : "Bea's Bakery";
  const beaDesc =
    lang === "pl"
      ? "Własny piec i przepis na bułki sezamowe"
      : lang === "de"
        ? "Eigener Ofen & Sesam-Rezept"
        : "Owns brick oven & sesame recipe";

  const leoTitle =
    lang === "pl" ? "Piekarnia Leo" : lang === "de" ? "Leos Bäckerei" : "Leo's Bakery";
  const leoDesc =
    lang === "pl"
      ? "Konkuruje świeżym chlebem ziarnistym"
      : lang === "de"
        ? "Konkurriert mit Körnerbrot"
        : "Competes with fresh seeded loaves";

  const sliderLabel =
    lang === "pl"
      ? "Innowacje i inwestycje piekarzy:"
      : lang === "de"
        ? "Bäcker-Innovation & Investition:"
        : "Baker Innovation & Investment:";

  const rulesLabel =
    lang === "pl"
      ? "Sprawiedliwe reguły (Płace i rzeka):"
      : lang === "de"
        ? "Faire Spielregeln (Löhne & Fluss):"
        : "Fair Ground Rules (Wages & River):";

  const activeLabel = lang === "pl" ? "Aktywne" : lang === "de" ? "Aktiv" : "Active";
  const offLabel = lang === "pl" ? "Wyłączone" : lang === "de" ? "Aus" : "Off";

  const varietyLabel =
    lang === "pl"
      ? "Różnorodność i jakość pieczywa:"
      : lang === "de"
        ? "Brotvielfalt & Qualität:"
        : "Bread Variety & Quality:";
  const fairnessLabel =
    lang === "pl"
      ? "Godne warunki pracowników:"
      : lang === "de"
        ? "Faire Löhne:"
        : "Worker Fairness:";
  const riverLabel =
    lang === "pl" ? "Czystość rzeki:" : lang === "de" ? "Sauberer Fluss:" : "River Cleanliness:";

  const quizPrompt =
    lang === "pl"
      ? "Co w gospodarce rynkowej motywuje Beę do wczesnego wstawania i pieczenia pysznego chleba?"
      : lang === "de"
        ? "Was motiviert Bea in einer Marktwirtschaft, früh aufzustehen und leckeres Brot zu backen?"
        : "In a market economy, what motivates Bea to wake up early and bake delicious bread?";

  const optA =
    lang === "pl"
      ? "A) Jest właścicielką piekarni, tworzy nowe przepisy i zarabia dzięki zadowolonym klientom"
      : lang === "de"
        ? "A) Sie besitzt ihre Bäckerei, erfindet Rezepte und verdient Geld durch zufriedene Kunden"
        : "A) She owns her bakery, invents recipes, and earns income from satisfied customers";

  const optB =
    lang === "pl"
      ? "B) Przywódca miasteczka groził jej aresztowaniem"
      : lang === "de"
        ? "B) Der Dorfanführer drohte ihr mit Verhaftung"
        : "B) The town leader threatened to arrest her";

  const optC =
    lang === "pl"
      ? "C) Nikt w miasteczku nigdy niczego nie je"
      : lang === "de"
        ? "C) Niemand im Dorf isst jemals etwas"
        : "C) Nobody in the village ever eats food";

  const quizSuccess =
    lang === "pl"
      ? "✓ Dokładnie tak! Własność prywatna i zachęty rynkowe wspierają innowacje i zaangażowanie."
      : lang === "de"
        ? "✓ Genau richtig! Privateigentum und Markt-Anreize fördern Innovation."
        : "✓ Exactly right! Private ownership and market incentives encourage innovation.";

  const quizHint =
    lang === "pl"
      ? "Wskazówka: Własność prywatna pozwala twórcom czerpać korzyści z własnego wysiłku i talentu."
      : lang === "de"
        ? "Hinweis: Privateigentum belohnt Produzenten für Fleiß und Ideen."
        : "Hint: Private ownership allows producers to benefit from their effort.";

  return (
    <div className="capitalism-toy p-4 bg-slate-50 rounded-xl max-w-md mx-auto">
      <div className="text-center mb-3">
        <h4 className="font-bold text-slate-800">{title}</h4>
        <p className="text-xs text-slate-500">{subtitle}</p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        {/* Baker Bea */}
        <div className="bg-amber-50 border border-amber-200 p-2.5 rounded-lg text-center">
          <div className="text-2xl mb-1">🥖✨</div>
          <div className="font-bold text-xs text-amber-900">{beaTitle}</div>
          <div className="text-[10px] text-amber-700">{beaDesc}</div>
        </div>

        {/* Baker Leo */}
        <div className="bg-orange-50 border border-orange-200 p-2.5 rounded-lg text-center">
          <div className="text-2xl mb-1">🍞🌾</div>
          <div className="font-bold text-xs text-orange-900">{leoTitle}</div>
          <div className="text-[10px] text-orange-700">{leoDesc}</div>
        </div>
      </div>

      {mode === "toy" && (
        <div className="space-y-3 mb-4 bg-white p-3 rounded-lg border border-slate-200">
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
              <span>{sliderLabel}</span>
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
            <span className="text-xs font-semibold text-slate-700">{rulesLabel}</span>
            <button
              type="button"
              onClick={() => setFairRulesEnabled(!fairRulesEnabled)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition ${
                fairRulesEnabled ? "bg-emerald-600 text-white" : "bg-slate-300 text-slate-700"
              }`}
            >
              {fairRulesEnabled ? activeLabel : offLabel}
            </button>
          </div>
        </div>
      )}

      {/* Market Indicators */}
      <div className="bg-white p-3 rounded-lg border border-slate-200 mb-4 shadow-sm space-y-2">
        <div className="flex justify-between items-center text-xs">
          <span className="text-slate-600">{varietyLabel}</span>
          <span className="font-bold text-amber-600">{metrics.variety}%</span>
        </div>
        <div className="flex justify-between items-center text-xs">
          <span className="text-slate-600">{fairnessLabel}</span>
          <span
            className={`font-bold ${metrics.workerFairness > 50 ? "text-green-600" : "text-red-500"}`}
          >
            {metrics.workerFairness}
          </span>
        </div>
        <div className="flex justify-between items-center text-xs">
          <span className="text-slate-600">{riverLabel}</span>
          <span
            className={`font-bold ${metrics.cleanRiver > 50 ? "text-green-600" : "text-red-500"}`}
          >
            {metrics.cleanRiver}%
          </span>
        </div>
      </div>

      {mode === "quiz" && (
        <div className="mb-4">
          <div className="text-xs font-semibold text-slate-700 mb-2">{quizPrompt}</div>
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => setSelectedQuizAnswer("ownership")}
              className={`w-full p-2 rounded border text-xs text-left ${
                selectedQuizAnswer === "ownership"
                  ? "bg-amber-600 text-white border-amber-700"
                  : "bg-white text-slate-700 border-slate-300"
              }`}
            >
              {optA}
            </button>
            <button
              type="button"
              onClick={() => setSelectedQuizAnswer("force")}
              className={`w-full p-2 rounded border text-xs text-left ${
                selectedQuizAnswer === "force"
                  ? "bg-slate-700 text-white border-slate-800"
                  : "bg-white text-slate-700 border-slate-300"
              }`}
            >
              {optB}
            </button>
            <button
              type="button"
              onClick={() => setSelectedQuizAnswer("none")}
              className={`w-full p-2 rounded border text-xs text-left ${
                selectedQuizAnswer === "none"
                  ? "bg-slate-700 text-white border-slate-800"
                  : "bg-white text-slate-700 border-slate-300"
              }`}
            >
              {optC}
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col items-center">
        <CheckButton lang={lang} onClick={handleCheck} />
        {showQuizResult && (
          <div
            className={`mt-2 text-xs font-bold ${quizCorrect ? "text-green-600" : "text-amber-600"}`}
          >
            {quizCorrect ? quizSuccess : quizHint}
          </div>
        )}
      </div>
    </div>
  );
}
