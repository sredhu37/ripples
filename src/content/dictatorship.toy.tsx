import { useState } from "react";
import type { Lang } from "../progress";
import { CheckButton } from "../lesson/toolkit";

interface DictatorshipToyProps {
  lang: Lang;
  mode?: "toy" | "quiz";
  onDone?: () => void;
}

export function DictatorshipToy({ lang, mode = "toy", onDone }: DictatorshipToyProps) {
  const [speechUnlocked, setSpeechUnlocked] = useState(false);
  const [pipeRepaired, setPipeRepaired] = useState(false);
  const [floodLevel, setFloodLevel] = useState(80);
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<string | null>(null);
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [quizCorrect, setQuizCorrect] = useState(false);

  const handleUnlockSpeech = () => {
    setSpeechUnlocked(true);
    setFloodLevel(10);
    setPipeRepaired(true);
    if (mode === "toy" && onDone) {
      setTimeout(onDone, 1200);
    }
  };

  const handleCheck = () => {
    if (mode === "quiz") {
      const isCorrect = selectedQuizAnswer === "truth";
      setQuizCorrect(isCorrect);
      setShowQuizResult(true);
      if (isCorrect && onDone) {
        onDone();
      }
    } else {
      if (speechUnlocked && onDone) {
        onDone();
      }
    }
  };

  return (
    <div className="dictatorship-toy p-4 bg-slate-50 rounded-xl max-w-md mx-auto">
      <div className="text-center mb-3">
        <h4 className="font-bold text-slate-800">
          {lang === "en" ? "Town Feedback & Error Correction" : "Dorf-Rückmeldung & Fehlerkorrektur"}
        </h4>
        <p className="text-xs text-slate-500">
          {lang === "en"
            ? "See what happens when citizens are silenced vs free to speak"
            : "Sieh, was passiert wenn Bürger zum Schweigen gebracht werden vs frei sprechen"}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        {/* Closed/Silenced Mode */}
        <div className={`p-3 rounded-lg border text-center ${!speechUnlocked ? "bg-red-50 border-red-300" : "bg-slate-100 border-slate-200 opacity-60"}`}>
          <div className="text-2xl mb-1">🤐🔒</div>
          <div className="font-bold text-xs text-red-900 mb-1">
            {lang === "en" ? "Dictatorship (Silenced)" : "Diktatur (Stumm)"}
          </div>
          <div className="text-[10px] text-red-700">
            {lang === "en" ? "Megaphone locked! Workers fear reporting leaks." : "Megafon gesperrt! Arbeiter fürchten Strafen."}
          </div>
        </div>

        {/* Open/Free Mode */}
        <div className={`p-3 rounded-lg border text-center ${speechUnlocked ? "bg-green-50 border-green-300" : "bg-slate-100 border-slate-200"}`}>
          <div className="text-2xl mb-1">📢🛠️</div>
          <div className="font-bold text-xs text-green-900 mb-1">
            {lang === "en" ? "Free Society (Open)" : "Freie Gesellschaft (Offen)"}
          </div>
          <div className="text-[10px] text-green-700">
            {lang === "en" ? "Free speech! Crews are alerted and fix leaks fast." : "Freie Rede! Teams werden gewarnt und reparieren schnell."}
          </div>
        </div>
      </div>

      {/* Main Street Pipe Status */}
      <div className="bg-white p-3 rounded-lg border border-slate-200 mb-4 shadow-sm">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs font-semibold text-slate-600">
            {lang === "en" ? "Main Street Flood Risk:" : "Überflutungsrisiko Hauptstraße:"}
          </span>
          <span className={`text-xs font-bold ${floodLevel > 50 ? "text-red-600" : "text-green-600"}`}>
            {floodLevel > 50 ? (lang === "en" ? "DANGER (80%)" : "GEFAHR (80%)") : (lang === "en" ? "SAFE (10%)" : "SICHER (10%)")}
          </span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2 mb-2">
          <div
            className={`h-2 rounded-full ${floodLevel > 50 ? "bg-red-500" : "bg-green-500"}`}
            style={{ width: `${floodLevel}%` }}
          />
        </div>
        <div className="text-center text-sm">
          {pipeRepaired ? "💧✨ " + (lang === "en" ? "Pipe Patched! Cellars Safe." : "Rohr repariert! Keller sicher.") : "🌊⚠️ " + (lang === "en" ? "Water Leaking Underground!" : "Wasser tritt unterirdisch aus!")}
        </div>
      </div>

      {mode === "toy" && !speechUnlocked && (
        <div className="text-center mb-4">
          <button
            onClick={handleUnlockSpeech}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow transition"
          >
            🔓 {lang === "en" ? "Unlock Free Speech & Alert Repair Crews" : "Freie Rede freischalten & Reparaturteam rufen"}
          </button>
        </div>
      )}

      {mode === "quiz" && (
        <div className="mb-4">
          <div className="text-xs font-semibold text-slate-700 mb-2">
            {lang === "en"
              ? "Why does an open society fix problems faster than a dictatorship?"
              : "Warum löst eine offene Gesellschaft Probleme schneller als eine Diktatur?"}
          </div>
          <div className="space-y-2">
            <button
              onClick={() => setSelectedQuizAnswer("truth")}
              className={`w-full p-2 rounded border text-xs text-left ${
                selectedQuizAnswer === "truth"
                  ? "bg-emerald-600 text-white border-emerald-700"
                  : "bg-white text-slate-700 border-slate-300"
              }`}
            >
              {lang === "en"
                ? "A) People can speak the truth, report errors, and hold leaders accountable"
                : "A) Menschen können die Wahrheit sagen, Fehler melden und Anführer zur Rechenschaft ziehen"}
            </button>
            <button
              onClick={() => setSelectedQuizAnswer("water")}
              className={`w-full p-2 rounded border text-xs text-left ${
                selectedQuizAnswer === "water"
                  ? "bg-slate-700 text-white border-slate-800"
                  : "bg-white text-slate-700 border-slate-300"
              }`}
            >
              {lang === "en" ? "B) Water flows backwards uphill in democracies" : "B) Wasser fließt in Demokratien bergauf"}
            </button>
            <button
              onClick={() => setSelectedQuizAnswer("magic")}
              className={`w-full p-2 rounded border text-xs text-left ${
                selectedQuizAnswer === "magic"
                  ? "bg-slate-700 text-white border-slate-800"
                  : "bg-white text-slate-700 border-slate-300"
              }`}
            >
              {lang === "en" ? "C) Dictators possess magical repair hammers" : "C) Diktatoren besitzen magische Reparaturhämmer"}
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col items-center">
        <CheckButton lang={lang} onClick={handleCheck} />
        {showQuizResult && (
          <div className={`mt-2 text-xs font-bold ${quizCorrect ? "text-green-600" : "text-amber-600"}`}>
            {quizCorrect
              ? (lang === "en" ? "✓ Exactly! Free speech allows fast error detection and correction." : "✓ Genau! Freie Rede ermöglicht schnelle Fehlererkennung und -behebung.")
              : (lang === "en" ? "Hint: Freedom of speech enables citizens to speak up without fear." : "Hinweis: Meinungsfreiheit erlaubt Bürgern, sich ohne Angst zu äußern.")}
          </div>
        )}
      </div>
    </div>
  );
}
