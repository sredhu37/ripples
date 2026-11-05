import { useState } from "react";
import type { Lang } from "../progress";
import { CheckButton } from "../lesson/toolkit";

interface CommunismToyProps {
  lang: Lang;
  mode?: "toy" | "quiz";
  onDone?: () => void;
}

export function CommunismToy({ lang, mode = "toy", onDone }: CommunismToyProps) {
  const [allocatedMountain] = useState(33);
  const [allocatedHarbor] = useState(33);
  const [allocatedValley] = useState(34);
  const [revealed, setRevealed] = useState(false);
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<string | null>(null);
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [quizCorrect, setQuizCorrect] = useState(false);

  const neededMountain = 60; // Needs warm coats
  const neededHarbor = 10;   // Sunny harbor

  const mountainDeficit = neededMountain - allocatedMountain;
  const harborSurplus = allocatedHarbor - neededHarbor;

  const handleReveal = () => {
    setRevealed(true);
    if (mode === "toy" && onDone) {
      setTimeout(onDone, 1200);
    }
  };

  const handleCheck = () => {
    if (mode === "quiz") {
      const isCorrect = selectedQuizAnswer === "knowledge";
      setQuizCorrect(isCorrect);
      setShowQuizResult(true);
      if (isCorrect && onDone) {
        onDone();
      }
    } else {
      if (revealed && onDone) {
        onDone();
      }
    }
  };

  const titleText =
    lang === "pl"
      ? "Symulator Państwowej Komisji Planowania"
      : lang === "de"
      ? "Staatliche Plankommission Simulator"
      : "Central Planning Desk Simulator";

  const subText =
    lang === "pl"
      ? "Spróbuj rozdzielić 100 płaszczy z odległego biura bez rynkowych sygnałów cenowych"
      : lang === "de"
      ? "Teile 100 Mäntel aus der Ferne ohne Markt-Preissignale ein"
      : "Try dividing 100 coats from a distant central office without local price signals";

  const coatsWord =
    lang === "pl" ? "płaszczy" : lang === "de" ? "Mäntel" : "coats";

  return (
    <div className="communism-toy p-4 bg-slate-50 rounded-xl max-w-md mx-auto">
      <div className="text-center mb-3">
        <h4 className="font-bold text-slate-800">
          {titleText}
        </h4>
        <p className="text-xs text-slate-500">
          {subText}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4">
        {/* Mountain */}
        <div className="bg-blue-50 border border-blue-200 p-2 rounded text-center">
          <div className="text-xl mb-1">🏔️❄️</div>
          <div className="font-bold text-[11px] text-blue-900">
            {lang === "pl" ? "Góry" : lang === "de" ? "Gebirge" : "Mountain"}
          </div>
          <div className="text-xs font-semibold text-blue-700 mt-1">
            {allocatedMountain} {coatsWord}
          </div>
          {revealed && (
            <div className="text-[10px] text-red-600 font-bold mt-1">
              {mountainDeficit > 0
                ? `-${mountainDeficit} ` + (lang === "pl" ? "Niedobór!" : lang === "de" ? "Mangel!" : "Shortage!")
                : "OK"}
            </div>
          )}
        </div>

        {/* Harbor */}
        <div className="bg-amber-50 border border-amber-200 p-2 rounded text-center">
          <div className="text-xl mb-1">⛵☀️</div>
          <div className="font-bold text-[11px] text-amber-900">
            {lang === "pl" ? "Przystań" : lang === "de" ? "Hafen" : "Harbor"}
          </div>
          <div className="text-xs font-semibold text-amber-700 mt-1">
            {allocatedHarbor} {coatsWord}
          </div>
          {revealed && (
            <div className="text-[10px] text-blue-600 font-bold mt-1">
              {harborSurplus > 0
                ? `+${harborSurplus} ` + (lang === "pl" ? "Nadwyżka!" : lang === "de" ? "Überschuss!" : "Surplus!")
                : "OK"}
            </div>
          )}
        </div>

        {/* Valley */}
        <div className="bg-emerald-50 border border-emerald-200 p-2 rounded text-center">
          <div className="text-xl mb-1">🌾🚜</div>
          <div className="font-bold text-[11px] text-emerald-900">
            {lang === "pl" ? "Dolina" : lang === "de" ? "Tal" : "Valley"}
          </div>
          <div className="text-xs font-semibold text-emerald-700 mt-1">
            {allocatedValley} {coatsWord}
          </div>
          {revealed && (
            <div className="text-[10px] text-slate-600 mt-1">
              {lang === "pl" ? "Kolejka w sklepie" : lang === "de" ? "Warteschlange" : "Waiting line"}
            </div>
          )}
        </div>
      </div>

      {mode === "toy" && !revealed && (
        <div className="bg-white p-3 rounded-lg border border-slate-200 mb-4 text-center">
          <p className="text-xs text-slate-600 mb-2">
            {lang === "pl"
              ? "Rozdzielono 100 płaszczy po równo (33-33-34). Kliknij poniżej, aby poznać prawdziwe potrzeby i pogodę!"
              : lang === "de"
              ? "Du hast 100 Mäntel gleichmäßig aufgeteilt (33-33-34). Tippe, um den echten Bedarf zu sehen!"
              : "You divided 100 coats equally (33-33-34). Tap below to see what the districts actually needed!"}
          </p>
          <button
            onClick={handleReveal}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded shadow transition"
          >
            📋 {lang === "pl" ? "Odkryj prawdziwe potrzeby regionów" : lang === "de" ? "Echten regionalen Bedarf aufdecken" : "Reveal District Actual Weather & Needs"}
          </button>
        </div>
      )}

      {mode === "toy" && revealed && (
        <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg mb-4 text-xs text-amber-900">
          {lang === "pl"
            ? "Błąd informacyjny: Mieszkańcy gór marzną, bo potrzebowali 60 płaszczy, a w słonecznej przystani leży 23 niepotrzebnych płaszczy!"
            : lang === "de"
            ? "Informationsversagen: Die Bergbewohner frieren bei 60 nötigen Mänteln, während der sonnige Hafen 23 ungenutzte Mäntel hat!"
            : "Information Failure: Mountain villagers freeze because they needed 60 coats, while Harbor sailors got 23 coats they didn't need!"}
        </div>
      )}

      {mode === "quiz" && (
        <div className="mb-4">
          <div className="text-xs font-semibold text-slate-700 mb-2">
            {lang === "pl"
              ? "Dlaczego centralne biuro wyprodukowało niewłaściwe ilości butów i płaszczy?"
              : lang === "de"
              ? "Warum plante das zentrale Planungsbüro die falschen Mengen an Schuhen und Mänteln?"
              : "Why did the central planning desk produce the wrong sizes of shoes and coats?"}
          </div>
          <div className="space-y-2">
            <button
              onClick={() => setSelectedQuizAnswer("knowledge")}
              className={`w-full p-2 rounded border text-xs text-left ${
                selectedQuizAnswer === "knowledge"
                  ? "bg-blue-600 text-white border-blue-700"
                  : "bg-white text-slate-700 border-slate-300"
              }`}
            >
              {lang === "pl"
                ? "A) Odległe biuro nie jest w stanie odgadnąć codziennych lokalnych potrzeb tysięcy ludzi"
                : lang === "de"
                ? "A) Ein fernes Büro kann den täglichen Bedarf tausender Menschen unmöglich erraten"
                : "A) A distant central office cannot guess the daily local needs of thousands of people"}
            </button>
            <button
              onClick={() => setSelectedQuizAnswer("cheese")}
              className={`w-full p-2 rounded border text-xs text-left ${
                selectedQuizAnswer === "cheese"
                  ? "bg-slate-700 text-white border-slate-800"
                  : "bg-white text-slate-700 border-slate-300"
              }`}
            >
              {lang === "pl"
                ? "B) Ciepłe wełniane płaszcze zamieniły się w kozi ser"
                : lang === "de"
                ? "B) Die warmen Wollmäntel verwandelten sich in Ziegenkäse"
                : "B) The warm wool coats transformed into goat cheese"}
            </button>
            <button
              onClick={() => setSelectedQuizAnswer("feet")}
              className={`w-full p-2 rounded border text-xs text-left ${
                selectedQuizAnswer === "feet"
                  ? "bg-slate-700 text-white border-slate-800"
                  : "bg-white text-slate-700 border-slate-300"
              }`}
            >
              {lang === "pl"
                ? "C) Nikt w miasteczku nie miał stóp ani rąk"
                : lang === "de"
                ? "C) Niemand im Dorf hatte Füße oder Hände"
                : "C) Nobody in the village had feet or hands"}
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col items-center">
        <CheckButton lang={lang} onClick={handleCheck} />
        {showQuizResult && (
          <div className={`mt-2 text-xs font-bold ${quizCorrect ? "text-green-600" : "text-amber-600"}`}>
            {quizCorrect
              ? (lang === "pl"
                  ? "✓ Prawidłowo! To zjawisko w ekonomii nazywa się problemem wiedzy lokalnej."
                  : lang === "de"
                  ? "✓ Richtig! Dies nennt man das Wissensproblem."
                  : "✓ Correct! This is known as the local knowledge problem.")
              : (lang === "pl"
                  ? "Wskazówka: Zastanów się, dlaczego centralnemu planiście brakuje informacji o lokalnych potrzebach."
                  : lang === "de"
                  ? "Hinweis: Überlege, warum fernen Planern lokale Details fehlen."
                  : "Hint: Think about why central planners lack local on-the-ground details.")}
          </div>
        )}
      </div>
    </div>
  );
}
