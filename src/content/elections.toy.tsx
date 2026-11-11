import { useState } from "react";
import type { Lang } from "../progress";
import { CheckButton } from "../lesson/toolkit";

interface ElectionsToyProps {
  lang: Lang;
  mode?: "toy" | "quiz";
  onDone?: () => void;
}

export function ElectionsToy({ lang, mode = "toy", onDone }: ElectionsToyProps) {
  const [votes] = useState<Record<string, "pier" | "pavilion">>({
    Finn: "pier",
    Bea: "pavilion",
    Luca: "pier",
    Maya: "pier",
    Sam: "pavilion",
  });
  const [castVotes, setCastVotes] = useState<string[]>([]);
  const [counted, setCounted] = useState(false);
  const [selectedWinner, setSelectedWinner] = useState<string | null>(null);
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [quizCorrect, setQuizCorrect] = useState(false);

  const villagers = ["Finn", "Bea", "Luca", "Maya", "Sam"];

  const handleCastVote = (villager: string) => {
    if (!castVotes.includes(villager)) {
      const nextCast = [...castVotes, villager];
      setCastVotes(nextCast);
      if (nextCast.length === villagers.length) {
        setCounted(true);
        if (mode === "toy" && onDone) {
          setTimeout(onDone, 1200);
        }
      }
    }
  };

  const pierCount = Object.values(votes).filter((v) => v === "pier").length;
  const pavilionCount = Object.values(votes).filter((v) => v === "pavilion").length;

  const handleCheck = () => {
    if (mode === "quiz") {
      const isCorrect = selectedWinner === "pier";
      setQuizCorrect(isCorrect);
      setShowQuizResult(true);
      if (isCorrect && onDone) {
        onDone();
      }
    }
  };

  const titleText =
    lang === "pl"
      ? "Lokal wyborczy w Ripple Town"
      : lang === "de"
        ? "Wahllokal Ripple Town"
        : "Ripple Town Voting Hall";
  const subtitleText =
    lang === "pl"
      ? "Wrzuć karty do tajnej urny i policz głosy mieszkańców"
      : lang === "de"
        ? "Wirf die Stimmzettel in die geheime Wahlurne und zähle die Stimmen"
        : "Cast ballots into the secret box and count results";

  const pierTitle =
    lang === "pl"
      ? "Pomost rybacki (Moss)"
      : lang === "de"
        ? "Hafenanleger (Moss)"
        : "Harbor Pier (Moss)";
  const pavilionTitle =
    lang === "pl"
      ? "Pawilon targowy (Pip)"
      : lang === "de"
        ? "Marktpavillon (Pip)"
        : "Market Pavilion (Pip)";

  const votesUnit = lang === "pl" ? "głosy" : lang === "de" ? "Stimmen" : "votes";

  const lineTitle =
    lang === "pl"
      ? "Mieszkańcy w kolejce (Kliknij, aby zagłosować):"
      : lang === "de"
        ? "Wartende Bürger (Tippe zum Wählen):"
        : "Villagers in Line (Tap to vote):";

  const quizInstruction =
    lang === "pl"
      ? "Wybierz zwycięski projekt na tablicę ogłoszeń:"
      : lang === "de"
        ? "Wähle das Gewinnerprojekt für die Dorftafel:"
        : "Select the winning project to put on the town board:";

  const pierOptionText =
    lang === "pl"
      ? "Pomost rybacki (3 głosy)"
      : lang === "de"
        ? "Hafenanleger (3 Stimmen)"
        : "Harbor Pier (3 votes)";

  const pavilionOptionText =
    lang === "pl"
      ? "Pawilon targowy (2 głosy)"
      : lang === "de"
        ? "Marktpavillon (2 Stimmen)"
        : "Market Pavilion (2 votes)";

  const ballotsStatus =
    castVotes.length < 5
      ? lang === "pl"
        ? `${castVotes.length}/5 kart wrzuconych do urny`
        : lang === "de"
          ? `${castVotes.length}/5 Stimmzettel in der Wahlurne`
          : `${castVotes.length}/5 ballots cast into secret box`
      : lang === "pl"
        ? "Wybory zakończone: Pomost wygrywa 3 do 2!"
        : lang === "de"
          ? "Wahl beendet: Anleger gewinnt 3 zu 2!"
          : "Election Complete: Pier wins 3 to 2!";

  const quizSuccess =
    lang === "pl"
      ? "✓ Brawo! Pomost zdobył większość głosów."
      : lang === "de"
        ? "✓ Richtig! Der Hafenanleger hat die Mehrheit."
        : "✓ Correct! The Pier won the majority.";

  const quizRetry =
    lang === "pl"
      ? "Sprawdź wynik: 3 osoby głosowały na Pomost, 2 na Pawilon."
      : lang === "de"
        ? "Prüfe die Stimmen: 3 für den Anleger, 2 für den Pavillon."
        : "Review the vote counts: 3 voted for Pier, 2 for Pavilion.";

  return (
    <div className="elections-toy p-4 bg-slate-50 rounded-xl max-w-md mx-auto">
      <div className="text-center mb-4">
        <h4 className="font-bold text-slate-800">{titleText}</h4>
        <p className="text-xs text-slate-500">{subtitleText}</p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="border border-blue-200 bg-blue-50 p-2 rounded-lg text-center">
          <div className="text-2xl mb-1">⚓</div>
          <div className="font-semibold text-xs text-blue-900">{pierTitle}</div>
          {counted && (
            <div className="text-lg font-bold text-blue-700 mt-1">
              {pierCount} {votesUnit}
            </div>
          )}
        </div>
        <div className="border border-orange-200 bg-orange-50 p-2 rounded-lg text-center">
          <div className="text-2xl mb-1">🎪</div>
          <div className="font-semibold text-xs text-orange-900">{pavilionTitle}</div>
          {counted && (
            <div className="text-lg font-bold text-orange-700 mt-1">
              {pavilionCount} {votesUnit}
            </div>
          )}
        </div>
      </div>

      {mode === "toy" && (
        <div className="mb-4">
          <div className="text-xs font-semibold text-slate-700 mb-2">{lineTitle}</div>
          <div className="flex flex-wrap gap-2">
            {villagers.map((v) => {
              const isCast = castVotes.includes(v);
              return (
                <button
                  key={v}
                  type="button"
                  disabled={isCast}
                  onClick={() => handleCastVote(v)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                    isCast
                      ? "bg-slate-200 text-slate-400 border-slate-300"
                      : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100 shadow-sm"
                  }`}
                >
                  {isCast ? "✓ " : "👤 "}
                  {v}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {mode === "quiz" && (
        <div className="mb-4">
          <div className="text-xs font-semibold text-slate-700 mb-2">{quizInstruction}</div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setSelectedWinner("pier")}
              className={`flex-1 p-2 rounded border text-xs font-bold ${
                selectedWinner === "pier"
                  ? "bg-blue-600 text-white border-blue-700"
                  : "bg-white text-slate-700 border-slate-300"
              }`}
            >
              ⚓ {pierOptionText}
            </button>
            <button
              type="button"
              onClick={() => setSelectedWinner("pavilion")}
              className={`flex-1 p-2 rounded border text-xs font-bold ${
                selectedWinner === "pavilion"
                  ? "bg-orange-600 text-white border-orange-700"
                  : "bg-white text-slate-700 border-slate-300"
              }`}
            >
              🎪 {pavilionOptionText}
            </button>
          </div>
        </div>
      )}

      <div className="bg-white p-3 rounded border border-slate-200 text-center mb-3">
        <div className="text-xs text-slate-600">{ballotsStatus}</div>
      </div>

      {mode === "quiz" && (
        <div className="flex flex-col items-center">
          <CheckButton lang={lang} onClick={handleCheck} />
          {showQuizResult && (
            <div
              className={`mt-2 text-xs font-bold ${quizCorrect ? "text-green-600" : "text-amber-600"}`}
            >
              {quizCorrect ? quizSuccess : quizRetry}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
