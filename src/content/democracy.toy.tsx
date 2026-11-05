import { useState } from "react";
import type { Lang } from "../progress";
import { CheckButton } from "../lesson/toolkit";

interface DemocracyToyProps {
  lang: Lang;
  mode?: "toy" | "quiz";
  onDone?: () => void;
}

export function DemocracyToy({ lang, mode = "toy", onDone }: DemocracyToyProps) {
  const [lighthouseTokens, setLighthouseTokens] = useState(4);
  const [grainTokens, setGrainTokens] = useState(3);
  const [parkTokens, setParkTokens] = useState(3);
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [quizCorrect, setQuizCorrect] = useState(false);

  const totalTokens = lighthouseTokens + grainTokens + parkTokens;
  const isBalanced =
    totalTokens === 10 &&
    lighthouseTokens >= 2 &&
    grainTokens >= 2 &&
    parkTokens >= 2;

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

  const chamberTitle =
    lang === "pl" ? "Sala obrad rady: sztuka kompromisu" : lang === "de" ? "Gemeinderat Kompromiss-Kammer" : "Town Council Compromise Chamber";
  const chamberSub =
    lang === "pl"
      ? "Podziel 10 żetonów budżetu sprawiedliwie, by wszystkie 3 grupy doszły do zgody!"
      : lang === "de"
      ? "Teile 10 Budget-Münzen fair auf, damit alle 3 Gruppen zustimmen!"
      : "Divide 10 budget tokens fairly so all 3 groups agree!";

  const budgetUsedLabel =
    lang === "pl" ? "Wykorzystany budżet:" : lang === "de" ? "Verwendetes Budget:" : "Total Budget Used:";

  const sailorsTitle =
    lang === "pl" ? "Żeglarze (Latarnia morska)" : lang === "de" ? "Seeleute (Leuchtturm)" : "Sailors (Lighthouse)";
  const bakersTitle =
    lang === "pl" ? "Piekarze (Spichlerz zbożowy)" : lang === "de" ? "Bäcker (Kornspeicher)" : "Bakers (Grain Store)";
  const familiesTitle =
    lang === "pl" ? "Rodziny (Park miejski)" : lang === "de" ? "Familien (Dorf-Park)" : "Families (Town Park)";

  const satisfiedLabel =
    lang === "pl" ? "✓ Zadowoleni" : lang === "de" ? "✓ Zufrieden" : "✓ Satisfied";
  const needTokensLabel =
    lang === "pl" ? "✗ Potrzeba ≥2 żetonów" : lang === "de" ? "✗ Braucht ≥2" : "✗ Need ≥2 tokens";

  const quizSuccess =
    lang === "pl"
      ? "✓ Demokratyczny kompromis osiągnięty! Podstawowe potrzeby wszystkich zostały spełnione."
      : lang === "de"
      ? "✓ Demokratischer Kompromiss erzielt! Alle wichtigen Bedürfnisse erfüllt."
      : "✓ Democratic compromise achieved! Everyone's core needs are met.";

  const quizRetry =
    lang === "pl"
      ? "Upewnij się, że suma wynosi dokładnie 10 i każda grupa ma co najmniej 2 żetony."
      : lang === "de"
      ? "Stelle sicher, dass die Gesamtsumme 10 ist und jede Gruppe mindestens 2 erhält."
      : "Ensure total budget is 10 and each group gets at least 2 tokens.";

  return (
    <div className="democracy-toy p-4 bg-slate-50 rounded-xl max-w-md mx-auto">
      <div className="text-center mb-3">
        <h4 className="font-bold text-slate-800">{chamberTitle}</h4>
        <p className="text-xs text-slate-500">{chamberSub}</p>
      </div>

      <div className="bg-white p-3 rounded-lg border border-slate-200 mb-4 shadow-sm">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs font-semibold text-slate-600">{budgetUsedLabel}</span>
          <span className={`text-sm font-bold ${totalTokens === 10 ? "text-green-600" : "text-amber-600"}`}>
            {totalTokens} / 10
          </span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2">
          <div
            className={`h-2 rounded-full ${totalTokens === 10 ? "bg-green-500" : "bg-amber-400"}`}
            style={{ width: `${Math.min(100, (totalTokens / 10) * 100)}%` }}
          />
        </div>
      </div>

      <div className="space-y-3 mb-4">
        {/* Lighthouse Group */}
        <div className="bg-blue-50 border border-blue-200 p-2.5 rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">⛵</span>
            <div>
              <div className="text-xs font-bold text-blue-900">{sailorsTitle}</div>
              <div className="text-[10px] text-blue-600">
                {lighthouseTokens >= 2 ? satisfiedLabel : needTokensLabel}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setLighthouseTokens(Math.max(0, lighthouseTokens - 1))}
              className="w-6 h-6 rounded bg-white border border-blue-300 font-bold text-blue-800"
            >
              -
            </button>
            <span className="w-4 text-center text-sm font-bold text-blue-900">{lighthouseTokens}</span>
            <button
              type="button"
              onClick={() => setLighthouseTokens(Math.min(10, lighthouseTokens + 1))}
              className="w-6 h-6 rounded bg-white border border-blue-300 font-bold text-blue-800"
            >
              +
            </button>
          </div>
        </div>

        {/* Grain Storage Group */}
        <div className="bg-amber-50 border border-amber-200 p-2.5 rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🌾</span>
            <div>
              <div className="text-xs font-bold text-amber-900">{bakersTitle}</div>
              <div className="text-[10px] text-amber-600">
                {grainTokens >= 2 ? satisfiedLabel : needTokensLabel}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setGrainTokens(Math.max(0, grainTokens - 1))}
              className="w-6 h-6 rounded bg-white border border-amber-300 font-bold text-amber-800"
            >
              -
            </button>
            <span className="w-4 text-center text-sm font-bold text-amber-900">{grainTokens}</span>
            <button
              type="button"
              onClick={() => setGrainTokens(Math.min(10, grainTokens + 1))}
              className="w-6 h-6 rounded bg-white border border-amber-300 font-bold text-amber-800"
            >
              +
            </button>
          </div>
        </div>

        {/* Park Group */}
        <div className="bg-emerald-50 border border-emerald-200 p-2.5 rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🌳</span>
            <div>
              <div className="text-xs font-bold text-emerald-900">{familiesTitle}</div>
              <div className="text-[10px] text-emerald-600">
                {parkTokens >= 2 ? satisfiedLabel : needTokensLabel}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setParkTokens(Math.max(0, parkTokens - 1))}
              className="w-6 h-6 rounded bg-white border border-emerald-300 font-bold text-emerald-800"
            >
              -
            </button>
            <span className="w-4 text-center text-sm font-bold text-emerald-900">{parkTokens}</span>
            <button
              type="button"
              onClick={() => setParkTokens(Math.min(10, parkTokens + 1))}
              className="w-6 h-6 rounded bg-white border border-emerald-300 font-bold text-emerald-800"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <CheckButton lang={lang} onClick={handleCheck} />
        {showQuizResult && (
          <div className={`mt-2 text-xs font-bold ${quizCorrect ? "text-green-600" : "text-amber-600"}`}>
            {quizCorrect ? quizSuccess : quizRetry}
          </div>
        )}
      </div>
    </div>
  );
}
