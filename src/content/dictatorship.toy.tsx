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

  const title =
    lang === "pl"
      ? "Obieg informacji i naprawianie błędów"
      : lang === "de"
      ? "Dorf-Rückmeldung & Fehlerkorrektur"
      : "Town Feedback & Error Correction";

  const subtitle =
    lang === "pl"
      ? "Zobacz, co się dzieje, gdy ucisza się mieszkańców, a co, gdy panuje wolność słowa"
      : lang === "de"
      ? "Sieh, was passiert wenn Bürger zum Schweigen gebracht werden vs frei sprechen"
      : "See what happens when citizens are silenced vs free to speak";

  const closedTitle =
    lang === "pl" ? "Dyktatura (Uciszona)" : lang === "de" ? "Diktatur (Stumm)" : "Dictatorship (Silenced)";
  const closedDesc =
    lang === "pl"
      ? "Głośnik zablokowany! Robotnicy boją się zgłaszać wycieki wody."
      : lang === "de"
      ? "Megafon gesperrt! Arbeiter fürchten Strafen."
      : "Megaphone locked! Workers fear reporting leaks.";

  const openTitle =
    lang === "pl" ? "Wolne państwo (Otwarte)" : lang === "de" ? "Freie Gesellschaft (Offen)" : "Free Society (Open)";
  const openDesc =
    lang === "pl"
      ? "Wolność słowa! Ekipy dostają sygnał i szybko usuwają awarię."
      : lang === "de"
      ? "Freie Rede! Teams werden gewarnt und reparieren schnell."
      : "Free speech! Crews are alerted and fix leaks fast.";

  const floodRiskLabel =
    lang === "pl" ? "Ryzyko zalania ulicy Głównej:" : lang === "de" ? "Überflutungsrisiko Hauptstraße:" : "Main Street Flood Risk:";

  const dangerLabel =
    lang === "pl" ? "ZAGROŻENIE (80%)" : lang === "de" ? "GEFAHR (80%)" : "DANGER (80%)";
  const safeLabel =
    lang === "pl" ? "BEZPIECZNIE (10%)" : lang === "de" ? "SICHER (10%)" : "SAFE (10%)";

  const pipePatchedText =
    lang === "pl" ? "Rura naprawiona! Piwnice bezpieczne." : lang === "de" ? "Rohr repariert! Keller sicher." : "Pipe Patched! Cellars Safe.";
  const pipeLeakingText =
    lang === "pl" ? "Podziemny wyciek wody!" : lang === "de" ? "Wasser tritt unterirdisch aus!" : "Water Leaking Underground!";

  const unlockBtn =
    lang === "pl"
      ? "🔓 Odblokuj wolność słowa i wezwij ekipę naprawczą"
      : lang === "de"
      ? "🔓 Freie Rede freischalten & Reparaturteam rufen"
      : "🔓 Unlock Free Speech & Alert Repair Crews";

  const quizPrompt =
    lang === "pl"
      ? "Dlaczego otwarte społeczeństwo rozwiązuje problemy szybciej niż dyktatura?"
      : lang === "de"
      ? "Warum löst eine offene Gesellschaft Probleme schneller als eine Diktatur?"
      : "Why does an open society fix problems faster than a dictatorship?";

  const optTruth =
    lang === "pl"
      ? "A) Ludzie mogą mówić prawdę, zgłaszać usterki i rozliczać rządzących"
      : lang === "de"
      ? "A) Menschen können die Wahrheit sagen, Fehler melden und Anführer zur Rechenschaft ziehen"
      : "A) People can speak the truth, report errors, and hold leaders accountable";

  const optWater =
    lang === "pl"
      ? "B) W demokracjach woda płynie pod górę"
      : lang === "de"
      ? "B) Wasser fließt in Demokratien bergauf"
      : "B) Water flows backwards uphill in democracies";

  const optMagic =
    lang === "pl"
      ? "C) Dyktatorzy posiadają magiczne młotki naprawcze"
      : lang === "de"
      ? "C) Diktatoren besitzen magische Reparaturhämmer"
      : "C) Dictators possess magical repair hammers";

  const quizSuccess =
    lang === "pl"
      ? "✓ Dokładnie! Wolność słowa umożliwia szybkie wykrywanie i naprawianie błędów."
      : lang === "de"
      ? "✓ Genau! Freie Rede ermöglicht schnelle Fehlererkennung und -behebung."
      : "✓ Exactly! Free speech allows fast error detection and correction.";

  const quizHint =
    lang === "pl"
      ? "Wskazówka: Wolność słowa pozwala obywatelom mówić prawdę bez strachu przed karą."
      : lang === "de"
      ? "Hinweis: Meinungsfreiheit erlaubt Bürgern, sich ohne Angst zu äußern."
      : "Hint: Freedom of speech enables citizens to speak up without fear.";

  return (
    <div className="dictatorship-toy p-4 bg-slate-50 rounded-xl max-w-md mx-auto">
      <div className="text-center mb-3">
        <h4 className="font-bold text-slate-800">{title}</h4>
        <p className="text-xs text-slate-500">{subtitle}</p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        {/* Closed/Silenced Mode */}
        <div className={`p-3 rounded-lg border text-center ${!speechUnlocked ? "bg-red-50 border-red-300" : "bg-slate-100 border-slate-200 opacity-60"}`}>
          <div className="text-2xl mb-1">🤐🔒</div>
          <div className="font-bold text-xs text-red-900 mb-1">{closedTitle}</div>
          <div className="text-[10px] text-red-700">{closedDesc}</div>
        </div>

        {/* Open/Free Mode */}
        <div className={`p-3 rounded-lg border text-center ${speechUnlocked ? "bg-green-50 border-green-300" : "bg-slate-100 border-slate-200"}`}>
          <div className="text-2xl mb-1">📢🛠️</div>
          <div className="font-bold text-xs text-green-900 mb-1">{openTitle}</div>
          <div className="text-[10px] text-green-700">{openDesc}</div>
        </div>
      </div>

      {/* Main Street Pipe Status */}
      <div className="bg-white p-3 rounded-lg border border-slate-200 mb-4 shadow-sm">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs font-semibold text-slate-600">{floodRiskLabel}</span>
          <span className={`text-xs font-bold ${floodLevel > 50 ? "text-red-600" : "text-green-600"}`}>
            {floodLevel > 50 ? dangerLabel : safeLabel}
          </span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2 mb-2">
          <div
            className={`h-2 rounded-full ${floodLevel > 50 ? "bg-red-500" : "bg-green-500"}`}
            style={{ width: `${floodLevel}%` }}
          />
        </div>
        <div className="text-center text-sm">
          {pipeRepaired ? `💧✨ ${pipePatchedText}` : `🌊⚠️ ${pipeLeakingText}`}
        </div>
      </div>

      {mode === "toy" && !speechUnlocked && (
        <div className="text-center mb-4">
          <button
            type="button"
            onClick={handleUnlockSpeech}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow transition"
          >
            {unlockBtn}
          </button>
        </div>
      )}

      {mode === "quiz" && (
        <div className="mb-4">
          <div className="text-xs font-semibold text-slate-700 mb-2">{quizPrompt}</div>
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => setSelectedQuizAnswer("truth")}
              className={`w-full p-2 rounded border text-xs text-left ${
                selectedQuizAnswer === "truth"
                  ? "bg-emerald-600 text-white border-emerald-700"
                  : "bg-white text-slate-700 border-slate-300"
              }`}
            >
              {optTruth}
            </button>
            <button
              type="button"
              onClick={() => setSelectedQuizAnswer("water")}
              className={`w-full p-2 rounded border text-xs text-left ${
                selectedQuizAnswer === "water"
                  ? "bg-slate-700 text-white border-slate-800"
                  : "bg-white text-slate-700 border-slate-300"
              }`}
            >
              {optWater}
            </button>
            <button
              type="button"
              onClick={() => setSelectedQuizAnswer("magic")}
              className={`w-full p-2 rounded border text-xs text-left ${
                selectedQuizAnswer === "magic"
                  ? "bg-slate-700 text-white border-slate-800"
                  : "bg-white text-slate-700 border-slate-300"
              }`}
            >
              {optMagic}
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col items-center">
        <CheckButton lang={lang} onClick={handleCheck} />
        {showQuizResult && (
          <div className={`mt-2 text-xs font-bold ${quizCorrect ? "text-green-600" : "text-amber-600"}`}>
            {quizCorrect ? quizSuccess : quizHint}
          </div>
        )}
      </div>
    </div>
  );
}
