import { useState } from "react";
import type { Lang } from "../progress";
import { CheckButton } from "../lesson/toolkit";

interface MonarchyToyProps {
  lang: Lang;
  mode?: "toy" | "quiz";
  onDone?: () => void;
}

export function MonarchyToy({ lang, mode = "toy", onDone }: MonarchyToyProps) {
  const [monarchyType, setMonarchyType] = useState<"absolute" | "constitutional">("absolute");
  const [rulerTrait, setRulerTrait] = useState<"wise" | "careless">("wise");
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [quizCorrect, setQuizCorrect] = useState(false);

  const rollSuccession = () => {
    const nextTrait = rulerTrait === "wise" ? "careless" : "wise";
    setRulerTrait(nextTrait);
  };

  const handleCheck = () => {
    if (mode === "quiz") {
      const isCorrect = selectedAnswer === "parliament";
      setQuizCorrect(isCorrect);
      setShowQuizResult(true);
      if (isCorrect && onDone) {
        onDone();
      }
    } else {
      if (onDone) {
        onDone();
      }
    }
  };

  return (
    <div className="monarchy-toy p-4 bg-slate-50 rounded-xl max-w-md mx-auto">
      <div className="text-center mb-3">
        <h4 className="font-bold text-slate-800">
          {lang === "en" ? "Castle Island Governance Simulator" : "Schlossinsel Regierungs-Simulator"}
        </h4>
        <p className="text-xs text-slate-500">
          {lang === "en"
            ? "Compare Absolute vs Constitutional Monarchy"
            : "Vergleiche absolute und konstitutionelle Monarchie"}
        </p>
      </div>

      {mode === "toy" && (
        <div className="flex justify-center gap-2 mb-4">
          <button
            onClick={() => setMonarchyType("absolute")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${
              monarchyType === "absolute"
                ? "bg-purple-600 text-white border-purple-700"
                : "bg-white text-slate-700 border-slate-300"
            }`}
          >
            {lang === "en" ? "Absolute Monarchy" : "Absolute Monarchie"}
          </button>
          <button
            onClick={() => setMonarchyType("constitutional")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${
              monarchyType === "constitutional"
                ? "bg-blue-600 text-white border-blue-700"
                : "bg-white text-slate-700 border-slate-300"
            }`}
          >
            {lang === "en" ? "Constitutional Monarchy" : "Konstitutionelle Monarchie"}
          </button>
        </div>
      )}

      {mode === "toy" && monarchyType === "absolute" && (
        <div className="bg-purple-50 border border-purple-200 p-3 rounded-lg mb-4 text-center">
          <div className="text-3xl mb-1">{rulerTrait === "wise" ? "👑📜" : "🦚💤"}</div>
          <div className="font-bold text-xs text-purple-900 mb-1">
            {rulerTrait === "wise"
              ? (lang === "en" ? "King Jasper: Wise and Careful" : "König Jasper: Weise und fürsorglich")
              : (lang === "en" ? "Prince Leo: Careless Peacock Hunter" : "Prinz Leo: Nachlässiger Pfauenjäger")}
          </div>
          <div className="text-xs text-slate-600 mb-2">
            {rulerTrait === "wise"
              ? (lang === "en" ? "Bridges built, fair taxes, flourishing town" : "Brücken gebaut, faire Steuern, blühende Stadt")
              : (lang === "en" ? "High taxes, crumbling roads, cannot be voted out!" : "Hohe Steuern, kaputte Straßen, kann nicht abgewählt werden!")}
          </div>
          <button
            onClick={rollSuccession}
            className="px-3 py-1 bg-purple-600 text-white text-xs font-semibold rounded hover:bg-purple-700"
          >
            🎲 {lang === "en" ? "Next Hereditary Ruler (Spin)" : "Nächster Thronfolger (Würfeln)"}
          </button>
        </div>
      )}

      {mode === "toy" && monarchyType === "constitutional" && (
        <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg mb-4 text-center">
          <div className="flex justify-center items-center gap-4 text-2xl mb-1">
            <span>👑</span>
            <span>🏛️</span>
          </div>
          <div className="font-bold text-xs text-blue-900 mb-1">
            {lang === "en" ? "Queen Rosa (Symbol) + Elected Town Council" : "Königin Rosa (Symbol) + Gewählter Stadtrat"}
          </div>
          <div className="text-xs text-slate-600">
            {lang === "en"
              ? "Laws and taxes are decided by parliament. Stability remains high regardless of royal personality!"
              : "Gesetze und Steuern beschließt das Parlament. Hohe Stabilität unabhängig von der Laune des Monarchen!"}
          </div>
        </div>
      )}

      {mode === "quiz" && (
        <div className="mb-4">
          <div className="text-xs font-semibold text-slate-700 mb-2">
            {lang === "en"
              ? "In a constitutional monarchy, who makes the laws and taxes?"
              : "Wer beschließt in einer konstitutionellen Monarchie Gesetze und Steuern?"}
          </div>
          <div className="space-y-2">
            <button
              onClick={() => setSelectedAnswer("peacock")}
              className={`w-full p-2 rounded border text-xs text-left ${
                selectedAnswer === "peacock"
                  ? "bg-slate-700 text-white border-slate-800"
                  : "bg-white text-slate-700 border-slate-300"
              }`}
            >
              {lang === "en" ? "A) The royal pet peacock" : "A) Der königliche Haustier-Pfau"}
            </button>
            <button
              onClick={() => setSelectedAnswer("parliament")}
              className={`w-full p-2 rounded border text-xs text-left ${
                selectedAnswer === "parliament"
                  ? "bg-blue-600 text-white border-blue-700"
                  : "bg-white text-slate-700 border-slate-300"
              }`}
            >
              {lang === "en" ? "B) The freely elected parliament" : "B) Das frei gewählte Parlament"}
            </button>
            <button
              onClick={() => setSelectedAnswer("nobody")}
              className={`w-full p-2 rounded border text-xs text-left ${
                selectedAnswer === "nobody"
                  ? "bg-slate-700 text-white border-slate-800"
                  : "bg-white text-slate-700 border-slate-300"
              }`}
            >
              {lang === "en" ? "C) Nobody at all" : "C) Überhaupt niemand"}
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col items-center">
        <CheckButton lang={lang} onClick={handleCheck} />
        {showQuizResult && (
          <div className={`mt-2 text-xs font-bold ${quizCorrect ? "text-green-600" : "text-amber-600"}`}>
            {quizCorrect
              ? (lang === "en" ? "✓ Exactly right! In a constitutional monarchy, the elected parliament governs." : "✓ Genau richtig! In einer konstitutionellen Monarchie regiert das gewählte Parlament.")
              : (lang === "en" ? "Hint: In a constitutional monarchy, governing power belongs to the elected parliament." : "Hinweis: In einer konstitutionellen Monarchie liegt die Macht beim gewählten Parlament.")}
          </div>
        )}
      </div>
    </div>
  );
}
