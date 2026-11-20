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

  const title =
    lang === "pl"
      ? "Symulator ustroju Wyspy Zamkowej"
      : lang === "de"
        ? "Schlossinsel Regierungs-Simulator"
        : "Castle Island Governance Simulator";

  const subtitle =
    lang === "pl"
      ? "Porównaj monarchię absolutną z konstytucyjną"
      : lang === "de"
        ? "Vergleiche absolute und konstitutionelle Monarchie"
        : "Compare Absolute vs Constitutional Monarchy";

  const btnAbsolute =
    lang === "pl"
      ? "Monarchia absolutna"
      : lang === "de"
        ? "Absolute Monarchie"
        : "Absolute Monarchy";
  const btnConstitutional =
    lang === "pl"
      ? "Monarchia konstytucyjna"
      : lang === "de"
        ? "Konstitutionelle Monarchie"
        : "Constitutional Monarchy";

  const jasperName =
    lang === "pl"
      ? "Król Jasper: Mądry i odpowiedzialny"
      : lang === "de"
        ? "König Jasper: Weise und fürsorglich"
        : "King Jasper: Wise and Careful";

  const leoName =
    lang === "pl"
      ? "Książę Leo: Beztroski myśliwy pawi"
      : lang === "de"
        ? "Prinz Leo: Nachlässiger Pfauenjäger"
        : "Prince Leo: Careless Peacock Hunter";

  const jasperDesc =
    lang === "pl"
      ? "Mosty zbudowane, uczciwe podatki, miasto rozkwita"
      : lang === "de"
        ? "Brücken gebaut, faire Steuern, blühende Stadt"
        : "Bridges built, fair taxes, flourishing town";

  const leoDesc =
    lang === "pl"
      ? "Wysokie podatki, zrujnowane drogi, nie można go odwołać w wyborach!"
      : lang === "de"
        ? "Hohe Steuern, kaputte Straßen, kann nicht abgewählt werden!"
        : "High taxes, crumbling roads, cannot be voted out!";

  const spinBtn =
    lang === "pl"
      ? "🎲 Następca tronu (Losuj)"
      : lang === "de"
        ? "🎲 Nächster Thronfolger (Würfeln)"
        : "🎲 Next Hereditary Ruler (Spin)";

  const rosaTitle =
    lang === "pl"
      ? "Królowa Rosa (Symbol) + Wybrana rada miasta"
      : lang === "de"
        ? "Königin Rosa (Symbol) + Gewählter Stadtrat"
        : "Queen Rosa (Symbol) + Elected Town Council";

  const rosaDesc =
    lang === "pl"
      ? "Ustawy i podatki uchwala parlament. Wysoka stabilność bez względu na kaprysy władcy!"
      : lang === "de"
        ? "Gesetze und Steuern beschließt das Parlament. Hohe Stabilität unabhängig von der Laune des Monarchen!"
        : "Laws and taxes are decided by parliament. Stability remains high regardless of royal personality!";

  const quizPrompt =
    lang === "pl"
      ? "Kto uchwala ustawy i podatki w monarchii konstytucyjnej?"
      : lang === "de"
        ? "Wer beschließt in einer konstitutionellen Monarchie Gesetze und Steuern?"
        : "In a constitutional monarchy, who makes the laws and taxes?";

  const optA =
    lang === "pl"
      ? "A) Królewski paw domowy"
      : lang === "de"
        ? "A) Der königliche Haustier-Pfau"
        : "A) The royal pet peacock";
  const optB =
    lang === "pl"
      ? "B) Wolno wybrany parlament"
      : lang === "de"
        ? "B) Das frei gewählte Parlament"
        : "B) The freely elected parliament";
  const optC =
    lang === "pl"
      ? "C) Nikt w państwie"
      : lang === "de"
        ? "C) Überhaupt niemand"
        : "C) Nobody at all";

  const quizSuccess =
    lang === "pl"
      ? "✓ Dokładnie tak! W monarchii konstytucyjnej państwem rządzi wybrany parlament."
      : lang === "de"
        ? "✓ Genau richtig! In einer konstitutionellen Monarchie regiert das gewählte Parlament."
        : "✓ Exactly right! In a constitutional monarchy, the elected parliament governs.";

  const quizHint =
    lang === "pl"
      ? "Wskazówka: W monarchii konstytucyjnej władza rządzenia należy do wybranego parlamentu."
      : lang === "de"
        ? "Hinweis: In einer konstitutionellen Monarchie liegt die Macht beim gewählten Parlament."
        : "Hint: In a constitutional monarchy, governing power belongs to the elected parliament.";

  return (
    <div className="monarchy-toy p-4 bg-slate-50 rounded-xl max-w-md mx-auto">
      <div className="text-center mb-3">
        <h4 className="font-bold text-slate-800">{title}</h4>
        <p className="text-xs text-slate-500">{subtitle}</p>
      </div>

      {mode === "toy" && (
        <div className="flex justify-center gap-2 mb-4">
          <button
            type="button"
            onClick={() => setMonarchyType("absolute")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${
              monarchyType === "absolute"
                ? "bg-purple-600 text-white border-purple-700"
                : "bg-white text-slate-700 border-slate-300"
            }`}
          >
            {btnAbsolute}
          </button>
          <button
            type="button"
            onClick={() => setMonarchyType("constitutional")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${
              monarchyType === "constitutional"
                ? "bg-blue-600 text-white border-blue-700"
                : "bg-white text-slate-700 border-slate-300"
            }`}
          >
            {btnConstitutional}
          </button>
        </div>
      )}

      {mode === "toy" && monarchyType === "absolute" && (
        <div className="bg-purple-50 border border-purple-200 p-3 rounded-lg mb-4 text-center">
          <div className="text-3xl mb-1">{rulerTrait === "wise" ? "👑📜" : "🦚💤"}</div>
          <div className="font-bold text-xs text-purple-900 mb-1">
            {rulerTrait === "wise" ? jasperName : leoName}
          </div>
          <div className="text-xs text-slate-600 mb-2">
            {rulerTrait === "wise" ? jasperDesc : leoDesc}
          </div>
          <button
            type="button"
            onClick={rollSuccession}
            className="px-3 py-1 bg-purple-600 text-white text-xs font-semibold rounded hover:bg-purple-700"
          >
            {spinBtn}
          </button>
        </div>
      )}

      {mode === "toy" && monarchyType === "constitutional" && (
        <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg mb-4 text-center">
          <div className="flex justify-center items-center gap-4 text-2xl mb-1">
            <span>👑</span>
            <span>🏛️</span>
          </div>
          <div className="font-bold text-xs text-blue-900 mb-1">{rosaTitle}</div>
          <div className="text-xs text-slate-600">{rosaDesc}</div>
        </div>
      )}

      {mode === "quiz" && (
        <div className="mb-4">
          <div className="text-xs font-semibold text-slate-700 mb-2">{quizPrompt}</div>
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => setSelectedAnswer("peacock")}
              className={`w-full p-2 rounded border text-xs text-left ${
                selectedAnswer === "peacock"
                  ? "bg-slate-700 text-white border-slate-800"
                  : "bg-white text-slate-700 border-slate-300"
              }`}
            >
              {optA}
            </button>
            <button
              type="button"
              onClick={() => setSelectedAnswer("parliament")}
              className={`w-full p-2 rounded border text-xs text-left ${
                selectedAnswer === "parliament"
                  ? "bg-blue-600 text-white border-blue-700"
                  : "bg-white text-slate-700 border-slate-300"
              }`}
            >
              {optB}
            </button>
            <button
              type="button"
              onClick={() => setSelectedAnswer("nobody")}
              className={`w-full p-2 rounded border text-xs text-left ${
                selectedAnswer === "nobody"
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
